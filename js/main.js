"use strict";
import { levitatingBalls, heroMove, fadeIn, knight, castle } from './animation.js';
const containerChildArray = Array.prototype.slice.call(document.querySelector('.main_bonus_container').children),
    ballsArray = Array.prototype.slice.call(document.querySelectorAll('.levitating_balls')),
    heartContainer = document.getElementById('heart'),
    mainBtn = document.getElementById('main_btn'),
    timer = parseInt(heartContainer.dataset.timer) * 1000;
let value = 4;
const createImgLike = imgContainer => {
    const number = parseInt(imgContainer.dataset.number);
    for (let i = 0; i < number; i++) {
        let animDelay = value * 100;
        value++;
        let imgWidth = Math.floor(Math.random() * 55) + 15;
        let randomPosition = Math.floor(Math.random() * window.innerWidth) + 1;
        let img = document.createElement('img');
        img.classList.add('heart_img')
        img.src = 'img/decorate/like.svg';
        img.width = imgWidth;
        img.style.left = `${randomPosition}px`;
        img.style.animationDelay = animDelay + 'ms';
        img.style.animationDuration = timer + 'ms';
        imgContainer.appendChild(img);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    createImgLike(heartContainer);
    fadeIn(containerChildArray);
    if (ballsArray.length > 0) {
        ballsArray.forEach(ball => {
            let ballSpeed = parseInt(ball.dataset.speed);
            levitatingBalls(ball, ballSpeed);
        })
    }
    window.innerWidth > 900 ? document.addEventListener('mousemove', heroMove) : false;
});
window.addEventListener('resize', () => {
    knight.removeAttribute('style');
    castle.removeAttribute('style');
    window.innerWidth > 900
        ? document.addEventListener('mousemove', heroMove)
        : document.removeEventListener('mousemove', heroMove);
});
mainBtn.addEventListener('click', () => {
    heartContainer.classList.add('_active');
    mainBtn.disabled = true;
    document.querySelector('body').setAttribute('style', 'overflow: hidden');
    setTimeout(() => {
        document.querySelector('body').setAttribute('style', '');
        heartContainer.classList.remove('_active');
        mainBtn.disabled = !true;
    }, timer + (value * 100));
});