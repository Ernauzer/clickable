"use strict";
import {
  levitatingBalls,
  heroMove,
  fadeIn,
  knight,
  castle,
} from "./animation.js";
const containerChildArray = Array.prototype.slice.call(
    document.querySelector(".main_bonus_container").children
  ),
  ballsArray = Array.prototype.slice.call(
    document.querySelectorAll(".levitating_balls")
  ),
  heartContainer = document.getElementById("heart"),
  mainBtn = document.getElementById("main_btn"),
  timer = parseInt(heartContainer.dataset.timer) * 1000;

const wrapper = document.querySelector(".pop-up_animation_end");
const heartImgNumber = parseInt(heartContainer.dataset.number);
let value = 4;
const createImgLike = (imgContainer) => {
  for (let i = 0; i < heartImgNumber; i++) {
    let animDelay = value * 100;
    value++;
    let imgWidth = Math.floor(Math.random() * 55) + 15;
    let randomPosition = Math.floor(Math.random() * window.innerWidth) + 1;
    let img = document.createElement("img");
    img.classList.add("heart_img");
    img.src = "img/decorate/like.svg";
    img.width = imgWidth;
    img.style.left = `${randomPosition}px`;
    img.style.animationDelay = animDelay + "ms";
    img.style.animationDuration = timer + "ms";
    imgContainer.appendChild(img);
  }
};
const animationHeart = () => {
  document.querySelector("body").setAttribute("style", "");
  heartContainer.classList.remove("_active");
};
const popUp = () => {
  wrapper.innerHTML = `
        <div class="pop-up_wrapper">
            <div class="pop-up_container">
                <form class="pop-up_content">
                    <a class="pop-up_clouse" href="#">×</a>
                    <p class="title pop-up_title">сколько лайков насчитали?</p>
                    <input class="pop-up_input" type="number" name="how many likes?" min="1" max="${heartImgNumber}" value="1">
                    <button class="pop-up_btn">Ответить</button>
                </form>
            </div>
        </div>    
    `;
};
document.addEventListener("DOMContentLoaded", () => {
  fadeIn(containerChildArray);
  if (ballsArray.length > 0) {
    ballsArray.forEach((ball) => {
      let ballSpeed = parseInt(ball.dataset.speed);
      levitatingBalls(ball, ballSpeed);
    });
  }
  window.innerWidth > 900
    ? document.addEventListener("mousemove", heroMove)
    : false;
});
window.addEventListener("resize", () => {
  knight.removeAttribute("style");
  castle.removeAttribute("style");
  window.innerWidth > 900
    ? document.addEventListener("mousemove", heroMove)
    : document.removeEventListener("mousemove", heroMove);
});
mainBtn.addEventListener("click", () => {
  if (!wrapper.children.length > 0) {
    createImgLike(heartContainer);
    heartContainer.classList.add("_active");
    document.querySelector("body").setAttribute("style", "overflow: hidden");
    mainBtn.disabled = true;
    setTimeout(() => {
      animationHeart();

      setTimeout(() => {
        popUp();
        if (wrapper.querySelector(".pop-up_clouse")) {
            wrapper.querySelector(".pop-up_clouse").addEventListener("click", (e) => {
                e.preventDefault();
                const popUpWrapper = document.querySelector(".pop-up_wrapper");
                popUpWrapper.remove();
                mainBtn.disabled = false;
            });
        }
        if (wrapper.children.length > 0) {
          wrapper.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            let value = parseInt(document.querySelector(".pop-up_input").value);
            document.querySelector(".pop-up_content").remove();
            let container = document.querySelector(".pop-up_container");
            if (value === heartImgNumber) {
              container.innerHTML = `
                <div class="pop-up_content pop-up_result">
                    <a class="pop-up_clouse" href="#">×</a>
                    <p class="pop-up_result">Ответ верный!!</p>
                    <p class="pop-up_result">Урааа!!!!!</p>
                </div>
                
                `;
            } else {
              container.innerHTML = `
                <div class="pop-up_content pop-up_result">
                    <a class="pop-up_clouse" href="#">×</a>
                    <p class="pop-up_result error_result">Ответ неверный!!</p>
                    <p class="pop-up_result error_result">Старайся лучше!!!!!</p>
                </div>
                
                `;
            }
            if (wrapper.querySelector(".pop-up_clouse")) {
                wrapper.querySelector(".pop-up_clouse").addEventListener("click", (e) => {
                    e.preventDefault();
                    const popUpWrapper = document.querySelector(".pop-up_wrapper");
                    popUpWrapper.remove();
                    mainBtn.disabled = false;
                });
            }
          });
        }
      }, 500);
    }, timer + value * 100);
  } else {
    console.log("открыто уже окно");
  }
});
