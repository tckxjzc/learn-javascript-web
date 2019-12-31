//try catch对性能的影响
!function () {
    document.getElementById('tryCatch').onclick = function () {
        var size = 10000 * 10000;
        var timeLabel1 = '正常外联';
        var timeLabel2 = '正常内联';
        var timeLabel3 = 'try正常外联';
        var timeLabel4 = 'try正常内联';
        var timeLabel5 = 'catch正常外联';
        var timeLabel6 = 'catch正常内联';
        function run() {
            for (var i = 0; i < size; i++) {
                var p = i % 2;
            }
        }

        console.time(timeLabel1);
        run();
        console.timeEnd(timeLabel1);

        console.time(timeLabel2);
        for (var i = 0; i < size; i++) {
            var p = i % 2;
        }
        console.timeEnd(timeLabel2);

        console.time(timeLabel3);
        try {
            run();
            throw new Error(timeLabel4)
        }catch (e) {

        }
        console.timeEnd(timeLabel3);

        console.time(timeLabel4);
            try {
                for (var i = 0; i < size; i++) {
                    var p = i % 2;
                }
                throw new Error(timeLabel4)
            }catch (e) {

        }
        console.timeEnd(timeLabel4);

        console.time(timeLabel5);
        try {
            for (var i = 0; i < size; i++) {
                var p = i % 2;
            }
            throw new Error(timeLabel5)
        }catch (e) {

        }
        console.timeEnd(timeLabel5);
        console.time(timeLabel6);
        try {
            for (var i = 0; i < size; i++) {
                var p = i % 2;
            }
            throw new Error(timeLabel6)
        }catch (e) {

        }
        console.timeEnd(timeLabel6);
    };

}();
