"use strict";
let width = Math.round(window.innerWidth / 100);
let height = Math.round(window.innerHeight / 100);
const grid = document.getElementsByClassName('grid')[0];
const grid2D = arrayTo2D(new Array(width * height).fill(null), width, height);
addNewButtons(grid, width, height);
let wave = setInterval(() => { }, 1000);
window.addEventListener('resize', () => {
    width = Math.round(window.innerWidth / 100);
    height = Math.round(window.innerHeight / 100);
    addNewButtons(grid, width, height);
});
function addNewButtons(grid, width, height) {
    grid.style.gridTemplateColumns = `repeat(${width}, auto)`;
    grid.style.gridTemplateRows = `repeat(${height}, auto)`;
    removeAllChildren(grid);
    for (let i = 0; i < width * height; i++) {
        const button = createButton();
        const pinkOrCream = (i + (width % 2 === 0 ? Math.floor(i / width) : 0)) % 2 === 0;
        button.childNodes.forEach((element) => {
            const htmlelement = element;
            htmlelement.classList.add(pinkOrCream ? 'pink' : 'cream');
        });
        button.classList.add(pinkOrCream ? 'pink' : 'cream');
        button.id = i.toString();
        grid.appendChild(button);
    }
}
function removeAllChildren(element) {
    while (element.firstChild) {
        if (element.lastChild) {
            element.removeChild(element.lastChild);
        }
    }
}
function createButton() {
    const button = document.createElement('button');
    button.addEventListener('click', changeColor);
    return button;
}
function changeColor() {
}
function sendWave(x, y, direction) {
    const elementGrid2D = arrayTo2D(Array.from(grid.childNodes), width, height);
    switch (direction) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
    }
}
function arrayTo2D(gridArray, width, height) {
    const result = [];
    for (let y = 0; y < height; y++) {
        result.push([]);
        for (let x = 0; x < width; x++) {
            result[y].push(gridArray[x + width * y]);
        }
    }
    return result;
}
