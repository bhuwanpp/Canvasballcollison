import { ctx, canvasHeight, canvasWidth, BallsArray } from "./index.js";
export class Ball {
    constructor(x, y, vx, vy, radius, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy
        this.radius = radius
        this.color = color
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.vx
        this.y += this.vy
        // check wall collision 
        if (this.x + this.radius >= canvasWidth || this.x <= this.radius) {
            this.vx *= -1
            // change position also to not go outside of the wall 
            this.x = this.x <= this.radius ? this.radius : canvasWidth - this.radius
        }
        if (this.y + this.radius >= canvasHeight || this.y <= this.radius) {
            this.vy *= -1
            this.y = this.y <= this.radius ? this.radius : canvasHeight - this.radius
        }
    }
    collisionDetect() {
        for (let checkBall of BallsArray) {
            //check for self collision 
            if (!(this === checkBall)) {
                const dx = this.x - checkBall.x
                const dy = this.y - checkBall.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const sumOfRadius = this.radius + checkBall.radius
                const colliding = distance < sumOfRadius

                // check for overlap 
                if (colliding) {
                    const overlap = sumOfRadius - distance;
                    const changeX = (dx / distance) * overlap * 0.5;
                    const changeY = (dy / distance) * overlap * 0.5;

                    // if  overlap change the position 
                    this.x += changeX;
                    this.y += changeY;

                    checkBall.x -= changeX;
                    checkBall.y -= changeY;
                }

                // refrence ->  https://codepen.io/zhu1033527427/pen/qBWaBEe
                //https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional
                if (colliding) {

                    let angle = Math.atan2(dy, dx);
                    let sin = Math.sin(angle);
                    let cos = Math.cos(angle);

                    // The overall velocity of each body must be split into two perpendicular velocities:

                    let vx1 = (this.vx * cos + this.vy * sin);
                    let vy1 = (this.vy * cos - this.vx * sin);

                    let vx2 = (checkBall.vx * cos + checkBall.vy * sin);
                    let vy2 = (checkBall.vy * cos - checkBall.vx * sin);

                    // swapping the x velocity (y is parallel so doesn't matter)
                    // and rotating back the adjusted perpendicular velocities
                    this.vx = vx2 * cos - vy1 * sin;
                    this.vy = vy1 * cos + vx2 * sin;
                    checkBall.vx = vx1 * cos - vy2 * sin;
                    checkBall.vy = vy2 * cos + vx1 * sin;

                }

            }


        }
    }
}