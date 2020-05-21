if( 'serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').then(function (registration) {
        var serviceWorker;
        console.log(registration);
        if (registration.installing) {
            serviceWorker = registration.installing;
            document.querySelector('#kind').textContent = 'installing';
        } else if (registration.waiting) {
            serviceWorker = registration.waiting;
            document.querySelector('#kind').textContent = 'waiting';
        } else if (registration.active) {
            serviceWorker = registration.active;
            document.querySelector('#kind').textContent = 'active';
        }

        registration.onupdatefound=function (e) {
           var state=(registration.waiting||registration.active||registration.installing).state;
           console.log(state);
           console.log('onupdatefound %o',e);
        }

    });
    navigator.serviceWorker.oncontrollerchange=function (e) {
        console.log('oncontrollerchange__');
        if(confirm('页面有更新是否刷新页面')){
            location.reload();
        }
    }
}