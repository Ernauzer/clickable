const knight = document.querySelector('.main_img');
const castle = document.querySelector('.castle');
const randomX = (num) => Math.floor(Math.random() * window.innerWidth / num);
const randomY = (num) => Math.floor(Math.random() * window.innerHeight / num);
export const levitatingBalls = (item, speed) => {
    setInterval(() => {
        item.style.transform = `translate(
            ${Math.floor(randomX(speed))}px, 
            ${Math.floor(randomY(speed))}px)`;
    }, 1000)
};
export const heroMove = event => {
    const x = event.clientX;
    if (knight !== null && knight.dataset.speed !== undefined) {
        const knightSpeed = parseInt(knight.dataset.speed);
        knight.style.transform = `translateX(${Math.floor(x / knightSpeed)}px)`;
    }
    if (castle !== null && castle.dataset.speed !== undefined) {
        const castleSpeed = parseInt(castle.dataset.speed);
        castle.style.transform = `translateX(${Math.floor(x / castleSpeed)}px)`;
    }
};
