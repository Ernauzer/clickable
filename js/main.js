"use strict";
import { levitatingBalls, heroMove } from './animation.js';
const ballsArray = Array.prototype.slice.call(document.querySelectorAll('.levitating_balls'));
document.addEventListener("DOMContentLoaded", () => {
    if (ballsArray.length > 0) {
        ballsArray.forEach(ball => {
            let ballSpeed = parseInt(ball.dataset.speed);
            levitatingBalls(ball, ballSpeed);
        })
    }
    window.innerWidth > 900 ? document.addEventListener('mousemove', heroMove) : false;
});