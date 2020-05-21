const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const center = {
    x: width / 2,
    y: height / 2
};

const sunData = {
    center,
    size: 10,
};

function angle2Radian(angle) {
    return angle / 180 * Math.PI;
}

const earthData = {
    radius: 120,
    position: {
        x: 0,
        y: 50,
    },
    size: 20,
    angle: 0,
    speed:1,
    calc() {
        this.position.x = this.radius * Math.sin(angle2Radian(this.angle))+center.x;
        this.position.y = this.radius * Math.cos(angle2Radian(this.angle))+center.y;
    },
    run() {
        this.angle+=this.speed;
        this.calc();
    }
};
earthData.calc();

const marsData = {
    radius: 250,
    position: {
        x: 0,
        y: 50,
    },
    size: 20,
    angle: 0,
    speed:1,
    calc() {
        this.position.x = this.radius * Math.sin(angle2Radian(this.angle*2.5))+center.x;
        this.position.y = this.radius * Math.cos(angle2Radian(this.angle*2.5))+center.y;
    },
    run() {
        this.angle+=this.speed;
        this.calc();
    }
};
marsData.calc();


const moonData = {
    radius: 60,
    position: {
        x: 0,
        y: 0,
    },
    size: 10,
    angle: 0,
    speed:1,
    calc() {
        this.position.x = this.radius * Math.sin(angle2Radian(2*this.angle))+earthData.position.x;
        // this.position.x = this.radius * Math.sin(angle2Radian(this.angle))
        //     +Math.sin(angle2Radian(this.angle)*3)/(3*Math.PI)
        //     +center.x;
        this.position.y = this.radius * Math.cos(angle2Radian(2*this.angle))+earthData.position.y;
        // this.position.y = this.radius * Math.cos(angle2Radian(this.angle))
        //     +Math.cos(angle2Radian(this.angle)*3)/(3*Math.PI)
        //     +center.y;

    },
    run() {
        this.angle+=this.speed;
        this.calc();
    }
};
moonData.calc();

function drawTheSun() {
    ctx.beginPath();
    ctx.fillStyle = "#f00";
    ctx.arc(sunData.center.x, sunData.center.y, sunData.size, 0, Math.PI * 2);
    ctx.fill();
}

function drawTheEarth() {
    ctx.beginPath();
    ctx.fillStyle='#1ab0ff';
    const {position,size}=earthData;
    const {x,y}=position;
    ctx.arc(x,y,size,0,Math.PI*2);
    ctx.fill();
}
function drawTheMars() {
    ctx.beginPath();
    ctx.fillStyle='#ff3b58';
    const {position,size}=marsData;
    const {x,y}=position;
    ctx.arc(x,y,size,0,Math.PI*2);
    ctx.fill();
}
function drawTheMoon() {
    ctx.beginPath();
    ctx.fillStyle='#ff9e11';
    const {position,size}=moonData;
    const {x,y}=position;
    ctx.arc(x,y,size,0,Math.PI*2);
    ctx.fill();
}


function drawAll() {
    ctx.clearRect(0,0,width,height);
    drawTheSun();
    drawTheEarth();
    drawTheMars();
    drawTheMoon();
}



function run() {
    earthData.run();
    moonData.run();
    marsData.run();
    drawAll();
    requestAnimationFrame(run);
}

run();
