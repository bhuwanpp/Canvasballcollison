
/** @type {HTMLCanvasElement} */

import { Ball } from "./BallClass.js";

const canvas = document.getElementById('canvas')
export const ctx = canvas.getContext('2d')

export let canvasWidth = canvas.width
export let canvasHeight = canvas.height


function random(min, max) {
    let num
    num = Math.floor(Math.random() * (max - min)) + min
    return num
}


const ballLength = 10;
export let BallsArray = []

function MakeBall() {
    BallsArray = []
    for (let i = 0; i < ballLength; i++) {
        const g = random(0, 255);
        const r = random(0, 255);
        const b = random(0, 255);

        const rgb = `rgb(${r},${g},${b})`;
        const newBall = new Ball(
            random(0, canvasWidth),
            random(0, canvasWidth),
            random(1, 5),
            random(1, 5),
            random(10, 30),
            rgb
        )
        BallsArray.push(newBall)
    }

}
MakeBall()

function DrawBall() {
    for (let ArrayBall of BallsArray) {
        ArrayBall.draw()
        ArrayBall.update()
        ArrayBall.collisionDetect()
    }
}

// click to add balls

let newBallLength = 1
let mousePointer = {
    x: undefined,
    y: undefined
};
let checkMouseDown = false
canvas.addEventListener('mousedown', function () {
    checkMouseDown = true;
});

// after click the mouse it need to  back to not click 
canvas.addEventListener('mouseup', function () {
    checkMouseDown = false;
});

canvas.addEventListener('mousemove', function (event) {
    mousePointer.x = event.x
    mousePointer.y = event.y - 100
});

function CreateNewBall() {
    if (checkMouseDown) {
        for (let i = 0; i < newBallLength; i++) {
            const g = random(0, 255);
            const r = random(0, 255);
            const b = random(0, 255);
            const rgb = `rgb(${r},${g},${b})`;
            const newClickBall = new Ball(
                mousePointer.x,
                mousePointer.y,
                random(1, 5),
                random(1, 5),
                random(10, 30),
                rgb
            )
            BallsArray.push(newClickBall)
        }
    }
    // put it in same array 
    for (let ballNew of BallsArray) {
        ballNew.draw()
        ballNew.update()
        ballNew.collisionDetect()
    }

}


window.addEventListener('keydown', function (key) {
    if (key.code === 'Space') {
        MakeBall()
    }
});


function updateBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(updateBall)
    DrawBall()
    CreateNewBall()
}

updateBall()

