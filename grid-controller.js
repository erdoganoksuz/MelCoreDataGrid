GridController = function ($area, data, name,config) {

    var instance = this;
    var $wrapper = null;
    var $scope = null;
    var gridData = data || dummy; //File:dummy.json
    var $popup = null;
    var sortTriggerStatus = false;

    //Set events handler
    var setEvents = function () {
        $scope.find(".btn.edit").off("click").on("click", function () { instance.Edit($(this)) });
        $scope.find(".btn.delete").off("click").on("click", function () { instance.Delete($(this)) });
        $scope.find(".btn.new").off("click").on("click", function () { instance.Add($(this)) });
        $scope.find(".btn.refresh").off("click").on("click", instance.Refresh);
        $scope.find(".grid-heads").off("click").on("click", function () { instance.Sort($(this)) });
    }

    //Sort Grid Row
    this.Sort = function ($this) {
        var key = $this.text().trim();
        if (sortTriggerStatus) {
            gridData.sort(function (b, a) {
                if (a[key] < b[key])
                    return -1;
                if (a[key] > b[key])
                    return 1;
                return 0;
            });
            sortTriggerStatus = false;
        } else {
            gridData.sort(function (a, b) {
                if (a[key] < b[key])
                    return -1;
                if (a[key] > b[key])
                    return 1;
                return 0;
            });
            sortTriggerStatus = true;
        }


        instance.Refresh();
    }

    //Edit Row
    this.Edit = function ($this) {
        var editableId = $this.parent().attr("data-grid-id").trim();
        instance.Add(null, gridData[editableId], editableId)
    }

    //Add Grid Row
    this.Add = function (e, editableObj, editableId) {
        if ($popup) {
            return false;
        }

        var closePopup = function () {
            $popup.find(".fTable").empty();
            $popup.hide();
            $popup = null;
        }

        var preparePopup = function () {
            var elements = [];
            var elementObj = editableObj ? editableObj : gridData[0];
            for (var key in elementObj) {
                let html = [
                  '<div class="fRow">',
                  '<div class="fCell">',
                  '<span>', key, ':</span>',
                  '</div>',
                  '<div class="fCell">',
                  '<input type="text" class="popup-input" value="', editableObj ? elementObj[key] : "", '" data-grid-tag="', key, '" />',
                  '</div>',
                  '</div>'].join(" ");
                elements.push(html);
            }
            let html = [
              '<span class="btn addnew">Save</span>',
              '<span class="btn close-popup">Close</span>'
            ].join(" ");
            $scope.find(".popup-cell").find(".widget-body").find(".fTable").append(elements);
            $scope.find(".popup-cell").find(".widget-footer").html(html);
        }

        preparePopup();
        $scope = $area.find(".grid-controller");
        $popup = $scope.find(".popup");
        $popup.find(".widget-header").find("span").text(editableObj ? "Edit" : "New");
        $popup.show();

        $popup.find(".addnew").off("click").on("click", function () {
            var appendObject = {};
            $popup.find(".popup-input").each(function (index) {
                appendObject[$(this).attr("data-grid-tag").trim()] = $(this).val();
            });
            if (editableObj) {
                gridData[editableId] = appendObject;
            }
            else {
                gridData.push(appendObject);
            }
            closePopup();
            instance.Refresh();
        });

        $popup.find(".close-popup").off("click").on("click", closePopup);


    }

    //Delete Row
    this.Delete = function ($this) {
        gridData.splice($this.parent().attr("data-grid-id").trim(), Number($this.parent().attr("data-grid-id").trim()) + 1);
        instance.Refresh();
    }

    //Refresh Grid
    this.Refresh = function (e, refreshData) {
        gridData = refreshData || data;
        instance.Render();
    }

    //Create Grid Area
    this.Create = function () {
        let html = [
          '<div class="grid-controller">',
              '<div class="popup">',
                  '<div class="popup-table">',
                      '<div class="popup-cell">',
                          '<div class="cell-widget">',
                             '<div class="widget-header">',
                                '<span></span>',
                             '</div>',
                             '<div class="widget-body">',
                                '<div class="fTable"></div>',
                             '</div>',
                             '<div class="widget-footer"></div>',
                         '</div>',
                      '</div>',
                  '</div>',
              '</div>',
              '<div class="box-head">',
              '<span class="box-head-left">',
                '<span class="head-name">', name || 'Grid', '</span>',
              '</span>',
              '<span class="box-head-right">',
              '<span class="btn refresh">Refresh</span>',
              '<span class="btn new">New +</span>',
              '</span>',
              '</div>',
              '<div class="box">',
                  '<div class="grid-area">',
                      '<div class="fTable">',
                      '</div>',
                  '</div>',
              '</div>',
          '</div>'
        ].join(" ");

        $area.append(html);
        $scope = $area.find(".grid-controller");
        $wrapper = $area.find(".grid-area").find(".fTable");
        instance.Render();
    }

    //Render Grid Row and Cell
    this.Render = function () {
        $wrapper.empty();

        var append = function () {

            var head = function () {
                var elements = [];
                $wrapper.append('<div class="fRow head"></div>');
                gridData = data ? data : dummy;
                gridData[0].Actions = null;

                for (var key in gridData[0]) {
                    let html = [
                      '<div class="fCell">',
                      '<span class="grid-heads">', key, '</span>',
                      '</div>'
                    ].join(" ");
                    elements.push(html);
                }
                $wrapper.find(".fRow.head").append(elements);
                return true;
            }

            var cell = function () {
                if (head()) {
                    var elements = [];
                    delete gridData[0].Actions
                    for (var i = 0; i < gridData.length; i++) {
                        $wrapper.append('<div class="fRow"></div>');
                        for (var key in gridData[0]) {
                            let html = [
                              '<div data-grid-key="', key, '"class="fCell">',
                              '<span>', gridData[i][key], '</span>',
                              '</div>'
                            ].join(" ");

                            elements.push(html);
                        }
                        let html = [
                          '<div class="fCell">',
                          '<span data-grid-id="', i, '" class="text">',
                          '<span class="btn edit">Edit</span>',
                          '<span class="btn delete">Delete</span>',
                          '</span>',
                          '</div>'
                        ].join(" ")
                        elements.push(html);
                        $($wrapper.find(".fRow")[i + 1]).append(elements);
                        elements = [];
                    }
                    setEvents();
                }
            }

            cell();
        }

        append();

    }

}
