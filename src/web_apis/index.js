// function
// (function () {
//     function funA(){
//         return 'i am funA function';
//     }
//
//     console.log('funA.toString %o',funA.toString());
//     console.log('funA.prototype.toString %o',funA.prototype.toString());
// })();

//振动
document.getElementById('vibrate').onclick = function () {
    navigator.vibrate([200, 100, 200]);
};
//电量
document.getElementById('battery').onclick = function () {
    if (navigator.getBattery) {
        navigator.getBattery().then(function (e) {
            console.log(e);
            alert(e.level * 100 + '%');
        });
    } else {
        alert('not support')
    }
};
//全屏
document.getElementById('fullscreen').onclick = function () {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().then(function (e) {
            console.log(e)
        })
    } else {
        alert('not support')
    }


};
document.getElementById('exitFullscreen').onclick = function () {
    if (document.fullscreenElement) {
        document.exitFullscreen().then(function (e) {
            console.log(e)
        }).catch(function (e) {
            console.log(e)
        })
    }

};

/**
 * 权限请求
 *
 */
document.getElementById('permissions').onclick = function () {
    if (navigator.permissions) {
        navigator.permissions.query({name: 'clipboard-read'}).then(function (e) {
            console.log('clipboard-read %o', e)
        });
        navigator.permissions.query({name: 'geolocation'}).then(function (e) {
            console.log('geolocation %o', e)
        })
    }
};


//地理位置
document.getElementById('geolocation').onclick = function () {
    try {
        navigator.geolocation.getCurrentPosition(function (result) {
            console.log(result);
            alert(result.coords.latitude)
        }, function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("定位失败,用户拒绝请求地理定位");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("定位失败,位置信息是不可用");
                    break;
                case error.TIMEOUT:
                    alert("定位失败,请求获取用户位置超时");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("定位失败,定位系统失效");
                    break;
            }
        })
    } catch (e) {
        alert(e.toString())
    }

};

//复制粘贴clipboard

document.getElementById('clip').onclick = function () {
    w();

    function w() {
        try {
            navigator.clipboard.writeText('test --').then(function (result) {//限https
                console.log(result)
            }).catch(function (e) {
                alert(e.toString())
            })
        } catch (e) {
            alert(e.toString())
        }
    }

    function r() {
        try {
            navigator.clipboard.readText().then(function (result) {//限https
                console.log(result)
            }).catch(function (e) {
                alert(e.toString())
            })
        } catch (e) {
            alert(e.toString())
        }
    }

};
//credential
document.getElementById('credential').onclick = function () {
    try {
        navigator.credentials.create({
            password:{
                id: "test_abc",
                password: '81705726',
            }
        }).then(function (result) {

            console.log(result)


        });
    } catch (e) {
        alert(e.toString())
    }
};

