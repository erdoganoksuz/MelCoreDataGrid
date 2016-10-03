(function () {
    var init = function () {
        var data = [
            {
                Name: "Yaşar Üst",
                School: "Çanakkale Onsekiz Mart Üniversitesi",
                Age: "22"
            },
            {
                Name: "Ahmet Yurt",
                School: "İstanbul Universitesi",
                Age: "21"
            },
            {
                Name: "Erdal Kurt",
                School: "Balıkesir Üniversitesi",
                Age: "28"
            },
            {
                Name: "Mahmut Özcan",
                School: "Gaziantep Universitesi",
                Age: "25"
            },
            {
                Name: "Jale Öztürk",
                School: "Yıldız Teknik Üniversitesi",
                Age: "20"
            }, {
                Name: "Ayşe Yurdakul",
                School: "-",
                Age: "22"
            }, {
                Name: "Caner Canbaz",
                School: "Anadolu Universitesi",
                Age: "22"
            }, {
                Name: "Barış Erdem",
                School: "Nişantaşı Universitesi",
                Age: "32"
            }, {
                Name: "Alpay Elma",
                School: "Şişli Endüstri Meslek",
                Age: "22"
            }, {
                Name: "Orhan Tarık",
                School: "Atılım Universitesi",
                Age: "42"
            }, {
                Name: "Ecem Gencebay",
                School: "Beykent Universitesi",
                Age: "27"
            }, {
                Name: "Aleyna Tunc",
                School: "Bilkent Universitesi",
                Age: "42"
            }
        ]

        var gridController = new GridController($(".cell"), data, "Öğrenciler");
        gridController.Create();

    }

    init();

} ());