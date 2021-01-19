"use strict";
import { levitatingBalls, heroMove, fadeIn, knight, castle } from './animation.js';
const mainBonusContainer = document.querySelector('.main_bonus_container');
const containerChildArray = Array.prototype.slice.call(mainBonusContainer.children);
const ballsArray = Array.prototype.slice.call(document.querySelectorAll('.levitating_balls'));
document.addEventListener("DOMContentLoaded", () => {
    fadeIn(containerChildArray);
    if (ballsArray.length > 0) {
        ballsArray.forEach(ball => {
            let ballSpeed = parseInt(ball.dataset.speed);
            levitatingBalls(ball, ballSpeed);
        })
    }
    window.innerWidth > 900 ? document.addEventListener('mousemove', heroMove) : false ;
});
window.addEventListener('resize', () => {
    knight.removeAttribute('style');
    castle.removeAttribute('style');
    window.innerWidth > 900 
    ? document.addEventListener('mousemove', heroMove)  
    : document.removeEventListener('mousemove', heroMove);
});