const add = document.getElementById('add');
const show = document.getElementById('show');

const proxy = new Proxy({times: 0}, {
    set(obj, prop, value) {
        console.log(prop + ':' + value);
        obj[prop] = value;
        showTimes();
    }
});

add.onclick = function () {
    proxy.times++;
};

function showTimes() {
    show.value=proxy.times;
}

