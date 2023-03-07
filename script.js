//variables
const defaultGridBoxes = 12;
let color = '#000000';
let go = '0';

//const references
const gridContainer = document.querySelector('#gridcontainer');
const btn = document.querySelector('button');

function loadGrid(grid) {
    let gridSize = (640 / grid) - 2;  //determines div size depending on grid and container size; -2 is border;
    let boxNum = grid * grid; //amount of divs to create;

    for (let i = 0; i < boxNum; i++) {
        let box = document.createElement('div');
        box.setAttribute('class', 'gridbox');
        box.setAttribute('id', "box" + i);
        box.style.cssText = 'height: ' + gridSize + 'px; width: ' + gridSize + 'px;';
        gridContainer.appendChild(box);
    }

    const gridBoxes = document.querySelectorAll('.gridbox');

    gridBoxes.forEach((boxes) => {
        boxes.addEventListener('mousedown', changeColor);
        boxes.addEventListener('mouseover', changeColor);
    });

    btn.addEventListener('click', removeGrid);

    function removeGrid() {
        let boxes = document.querySelectorAll('.gridbox');
        boxes.forEach((grid) => {
            grid.classList.toggle('noborder');
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadGrid(defaultGridBoxes); //load default number of boxes
});

function changeColor(event) {
    if (event.type == 'mousedown' || event.ctrlKey) {
        let id = "#" + event.target.id;
        let targetBox = document.querySelector(id).style;
        targetBox.backgroundColor = color;
    }
}