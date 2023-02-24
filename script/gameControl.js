let dpr;

const scoreDom = document.getElementById("score");
document.getElementById("game-over").style.display = 'none';

function setupCanvas(canvas) {
    dpr = (scale = window.devicePixelRatio || 1);
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px"
    canvas.style.height = rect.height + "px"

    return canvas;
}


function ellipse(context, x, y, a, b) {
    const step = (a > b) ? 1 / a : 1 / b;
    context.beginPath();
    context.moveTo(x + a, y);
    for (let i = 0; i < 2 * Math.PI; i += step) {
        context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    context.closePath();
    ctx.fillStyle = "rgba(0,0,0,.2)";
    context.fill();
}


function ellipseFull(context, x, y, a, b) {
    const step = (a > b) ? 1 / a : 1 / b;
    context.beginPath();
    context.moveTo(x + a, y);
    for (let i = 0; i < 2 * Math.PI; i += step) {
        context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    context.closePath();
    context.fillStyle = "rgba(255,255,255,1)";
    context.strokeStyle = "rgba(255,255,255,1)";

    context.fill();
    context.stroke();
}

const canvas = document.getElementById("canvas-game");

setupCanvas(canvas)


ctx = canvas.getContext('2d')


let basePositionX = canvas.width / 2 - 90;
let basePositionY = canvas.height - 110;


/*window.onresize = function () {
    setupCanvas(canvas);
    basePositionX = canvas.width / 2 - 90;
    basePositionY = canvas.height - 110;
    footerPositionStartX = basePositionX - 30;
    footerPositionStartY = basePositionY + 45;
    drawPerson();
}*/

const sphereImage = new Image();
//设置图片的路径
sphereImage.src = 'images/sphere.png';
//当图片加载完成后
sphereImage.onload = function () {
    //绘制图片
    //  ctx.drawImage(sphereImage, basePositionX - 150, basePositionY - 150, 64, 64);
    ctx.drawImage(sphereImage, spherePositionX, spherePositionY, 64, 64);

};


let isLeft = true;
let isWaving = false;


let initWavingAnimationCount = 16;
let wavingAnimationCount = initWavingAnimationCount;
let footerPositionStartX = basePositionX - 30;
let footerPositionStartY = basePositionY + 45;

let spherePaiPositionX = 0;
let spherePaiPositionY = 0;

// 绘制人物
function drawPerson() {


    ctx.strokeStyle = 'rgb(248,248,248)'
    ctx.fillStyle = 'rgb(248,248,248)'
    ctx.lineWidth = 5;


    ellipse(ctx, basePositionX - 30, basePositionY - 30, 15, 30);
    ctx.stroke()


    ctx.beginPath();

    let spritePositionX = basePositionX - 30;
    let spritePositionY = basePositionY + 55;
// 身体竖线
    ctx.moveTo(basePositionX - 30, basePositionY - 3);

    ctx.lineTo(spritePositionX, spritePositionY);


    let handLPositionX = basePositionX - 80;
    let handLPositionY = basePositionY;
    if (isWaving) {
        handLPositionX = handLPositionX + wavingAnimationCount * 5;
        handLPositionY = handLPositionY - ((wavingAnimationCount) * 5);

        wavingAnimationCount--;

        if (wavingAnimationCount === 0) {
            wavingAnimationCount = initWavingAnimationCount;
            isWaving = false;
        }
    }

// 左手
    ctx.moveTo(basePositionX - 30, basePositionY + 15);

    ctx.lineTo(handLPositionX, handLPositionY);

    ctx.lineWidth = 5;
    ctx.closePath();
    ctx.stroke();


    ctx.beginPath();
// 左脚
    ctx.moveTo(footerPositionStartX, footerPositionStartY);

    ctx.lineTo(footerPositionStartX, footerPositionStartY + 55);

    if (isLeft) {
        ctx.lineWidth = 5;
        ctx.moveTo(footerPositionStartX, footerPositionStartY);

        ctx.lineTo(footerPositionStartX, footerPositionStartY + 55);
    } else {
        ctx.lineWidth = 3;
        ctx.moveTo(footerPositionStartX + 1, footerPositionStartY);

        ctx.lineTo(footerPositionStartX + 1, footerPositionStartY + 55);
    }
    ctx.closePath();
    ctx.stroke();


    /*ctx.beginPath();

    // 右手
    ctx.moveTo(basePositionX - 30, basePositionY + 22);

    ctx.lineTo(basePositionX - 70, basePositionY + 38);

    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();*/
    ctx.beginPath();
    /*// 右手
    ctx.moveTo(basePositionX - 30, basePositionY + 22);

    ctx.lineTo(basePositionX - 70, basePositionY + 35);*/
// 右脚

    ctx.moveTo(footerPositionStartX - 0.5, footerPositionStartY);

    ctx.lineTo(footerPositionStartX - 15, footerPositionStartY + 50);

    if (isLeft)
        ctx.lineWidth = 3;
    else
        ctx.lineWidth = 5;

    ctx.closePath();
    ctx.stroke();


    ctx.fillStyle = "rgb(255,255,255)"

//ctx.strokeStyle = "purple"
    ctx.beginPath();

// 球杆
    let sphereLinePositionX = handLPositionX - 50;
    let sphereLinePositionY = handLPositionY;
    ctx.moveTo(handLPositionX + 5, handLPositionY);

    ctx.lineTo(sphereLinePositionX, sphereLinePositionY);

    ctx.closePath();
    ctx.stroke();

    spherePaiPositionX = sphereLinePositionX - 15;
    spherePaiPositionY = sphereLinePositionY - 0;
    // 球拍
    //ctx.arc(sphereLinePositionX - 7, sphereLinePositionY - 7, 30, 0, Math.PI * 2, true);
    ellipseFull(ctx, spherePaiPositionX, spherePaiPositionY, 30, 5);


}

drawPerson();


function footerLastLine() {
    // 横线
    ctx.beginPath();
    ctx.moveTo(0, basePositionY + 100);
    ctx.lineTo(canvas.width, basePositionY + 100);

    ctx.lineWidth = 20;


    ctx.closePath();
    ctx.stroke();
}

footerLastLine();


let leftAnimation = 1;
let speed = 10;


let cursorX = 0;
let cursorY = 0;


if (/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
    console.log('手机')
    let touchstartx;
    let touchstartY;

    document.getElementById("canvas-game").addEventListener('touchstart', (e) => {
        if (isStop === false) e.preventDefault();
        let touch = e.touches[0];
        touchstartx = touch.clientX * dpr;
        touchstartY = touch.clientY * dpr;

    })
    document.getElementById("canvas-game").addEventListener('touchmove', (e) => {
        if (isStop === false) e.preventDefault();
        let touch = e.touches[0];

        cursorX += touch.clientX * dpr - touchstartx;
        cursorY += touch.clientY * dpr - touchstartY;
    })


} else {
    document.getElementById("canvas-game").addEventListener("mousemove", (e) => {
        cursorX = e.clientX * dpr;
        cursorY = e.clientY * dpr;
    })
}


/**
 * 人物移动
 */
function personMove() {

    if (cursorX < (footerPositionStartX - 20)) {
        if (basePositionX < 50) return;
        basePositionX -= speed;
    } else if (cursorX > (footerPositionStartX + 20)) {
        if (basePositionX > canvas.width - 20) {
            return;
        }
        basePositionX += speed;
    } else {
        return;
    }


    leftAnimation++;
    if (leftAnimation === speed * 5) {
        isLeft = !isLeft;
        leftAnimation = 1;
    }
    footerPositionStartX = basePositionX - 30;
    footerPositionStartY = basePositionY + 45;
}

function wavingClick() {
    isWaving = true;
    wavingAnimationCount = initWavingAnimationCount;
}

let spherePositionX = basePositionX - 180;
let spherePositionY = basePositionY - 770;
let gravity = 7;

let spherePositionPaiX1 = spherePositionX - 32;
let spherePositionPaiX2 = spherePositionX + 32;
let spherePositionPaiY1 = spherePositionY - 32;
let spherePositionPaiY2 = spherePositionY + 32;
let isStop = true;
let hitSpeedX = 0;
let hitSpeedY = 0;
let hitSpeedXMultiple = 0.1;
let hitSpeedYMultiple = 1.5;

let isAsc = false;
let scoreMultiple = 1;

/**
 * 模仿球体重力
 */
function sphereGravity() {

    spherePositionY += gravity;
    spherePositionY -= hitSpeedY;


    spherePositionX += hitSpeedX;

    if (spherePositionY + 32 > basePositionY + 65) {
        cancelAnimationFrame(timer)
        isStop = true;
        isFirstStart = true;
        ctx.drawImage(sphereImage, spherePositionX, spherePositionY, 64, 64);
        document.getElementById("game-over").style.display = 'block';
        document.getElementById("game-start").style.top = "58%";
        document.getElementById("game-start").innerText = "再来一次";
        document.getElementById("game-start").style.display = "block";

        return;

    }
    ctx.drawImage(sphereImage, spherePositionX, spherePositionY, 64, 64);

    // 球离球拍最近的x轴
    spherePositionPaiX1 = spherePositionX - 32;
    spherePositionPaiX2 = spherePositionX + 32;
    spherePositionPaiY1 = spherePositionY - 32;
    spherePositionPaiY2 = spherePositionY + 32;


    if (spherePaiPositionY > spherePositionPaiY1 && spherePaiPositionY < spherePositionPaiY2) {
        // y轴达到 判断是否在x轴
        if (spherePositionPaiX2 >= (spherePaiPositionX - 15) && spherePositionPaiX1 <= (spherePaiPositionX + 15)) {
            playHitAudio();
            hitSpeedY = 15 * hitSpeedYMultiple;
            const offsetX = spherePositionX - spherePaiPositionX;
            hitSpeedX = offsetX * hitSpeedXMultiple;
            isAsc = true;
            scoreDom.innerText = parseInt(scoreDom.innerText) + scoreMultiple;

            let scoreDevice3 = Math.ceil(parseInt(scoreDom.innerText) / 3);


            scoreMultiple = scoreDevice3
            hitSpeedXMultiple = scoreDevice3 * 0.1;
            hitSpeedYMultiple = scoreDevice3 * 1.5;
            gravity += 0.3 * scoreDevice3;
            speed += 0.5 * scoreDevice3;


        }
    }

    if (spherePositionPaiX1 < 2) {
        hitSpeedX = -hitSpeedX;
    }
    if (spherePositionPaiY1 < 2) {
        hitSpeedY = 0;

        isAsc = false;

    }
    if (spherePositionPaiX2 > canvas.width - 2) {
        hitSpeedX = -hitSpeedX;
    }
}

const animFn = function fn() {
    if (!isStop) {
        footerLastLine();
        requestAnimationFrame(animFn);
    }
    ctx.clearRect(0, 0, canvas.width, basePositionY + 100 - 10);
    personMove();
    /*  ctx.clearRect(basePositionX - 200, basePositionY - 210, 300, 300);

      if (isAsc) {
          ctx.clearRect(spherePositionX - 64, spherePositionY, 120, 64);
      } else {
          ctx.clearRect(spherePositionX - 64, spherePositionY - 64, 120, 120);
      }*/

    drawPerson();
    sphereGravity();
    //footerLastLine();
};
let timer = requestAnimationFrame(animFn);


let isFirstStart = true;

function newGame() {
    isStop = false;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke()


    ctx.drawImage(sphereImage, spherePositionX, spherePositionY, 64, 64);


    basePositionX = canvas.width / 2 - 90;

    footerPositionStartX = basePositionX - 30;
    cursorX = footerPositionStartX;


    spherePositionX = basePositionX - 180;
    spherePositionY = basePositionY - 770;
    hitSpeedX = 0;
    hitSpeedY = 0;
    hitSpeedXMultiple = 0.1;
    hitSpeedYMultiple = 1.5;
    isAsc = false;
    scoreMultiple = 1;
    scoreDom.innerText = '0';
    gravity = 7;
    speed = 10;

    document.getElementById("game-over").style.display = 'none';
    document.getElementById("game-start").style.display = "none";

    if (isFirstStart)
        requestAnimationFrame(animFn);
    isFirstStart = false;
}

const hitMp3Url = "music/qiu.wav";
const hitPlayer = new Audio(hitMp3Url);
hitPlayer.loop = true;
hitPlayer.volume = 0.3;

function playHitAudio() {
    if (isAudio === false) return;
    hitPlayer.play();
    window.setTimeout(() => {
        hitPlayer.pause();
    }, 300)
}

let isAudio = false;

function playAudio() {
    if (isAudio) return;
    isAudio = true;
    var mp3Url = "music/music.mp3";
    var player = new Audio(mp3Url);
    player.loop = true;
    player.play();
}

