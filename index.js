(function () {
    var init = function () {
        var gridController = new GridController($(".cell"), null, "Customers");
        gridController.Create();

    }

    init();

} ());
