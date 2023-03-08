//const references
const gridContainer = document.querySelector('#gridcontainer');
const colorpicker = document.querySelector('#colorcontrol'); 
const btnBorder = document.querySelector('#bordercontrol');
const btnReset = document.querySelector('#clearcanvas');
const btnBrush = document.querySelector('#paintcontrol');
const btnErase = document.querySelector('#erasercontrol');
const gridSlider = document.querySelector('#gridslider');
const gridDisplay = document.querySelector('#gridsizedisplay');
const colorDisplay = document.querySelector('#colordisplay');

//variables
const defaultGridBoxes = 12;
const gridValues = [12, 24, 32, 64];
let paintmode = true;

function loadGrid(grid) {
    let gridSize = (480 / grid) - 2;  //determines div size depending on grid and container size; -2 is border;
    let boxNum = grid * grid; //amount of divs to create;

    for (let i = 0; i < boxNum; i++) {
        let box = document.createElement('div');
        box.setAttribute('class', 'gridbox');
        box.setAttribute('id', "box" + i);
        box.style.cssText = 'background-color: rgb(255, 255, 255); height: ' + gridSize + 'px; width: ' + gridSize + 'px;';
        gridContainer.appendChild(box);
    }

    const gridBoxes = document.querySelectorAll('.gridbox');

    gridBoxes.forEach((boxes) => {
        boxes.addEventListener('mousedown', changeColor);
        boxes.addEventListener('mouseup', changeColor);
    });

    function removeGrid() {
        let boxes = document.querySelectorAll('.gridbox');
        boxes.forEach((grid) => {
            grid.classList.toggle('noborder');
        });

        if (boxes[1].classList.value == 'gridbox noborder') {
            btnBorder.textContent = "";
        } else {
            btnBorder.textContent = "";
        }
    }

    function changeGrid() {
        let boxes = document.querySelectorAll('.gridbox');
        boxes.forEach((boxes) => {
            boxes.remove();
        });

        gridDisplay.textContent = "Canvas Size: " + gridValues[gridSlider.value] + "x" + gridValues[gridSlider.value];

        gridSlider.removeEventListener('change', changeGrid);
        colorpicker.removeEventListener('click', changeColor);
        btnBorder.removeEventListener('click', removeGrid);
        btnReset.removeEventListener('click', resetCanvas);

        loadGrid(gridValues[gridSlider.value]);
    }

    function resetCanvas() {
        let boxes = document.querySelectorAll('.gridbox');
        boxes.forEach((grid) => {
            grid.style.backgroundColor = 'rgb(255, 255, 255)';
        });
    }

    gridSlider.addEventListener('change', changeGrid);
    colorpicker.addEventListener('click', changeColor);
    colorpicker.addEventListener('change', updateColor);
    btnBorder.addEventListener('click', removeGrid);
    btnReset.addEventListener('click', resetCanvas);
    btnBrush.addEventListener('click', () => {
        paintmode = true;
        highlightBtn();
    });
    btnErase.addEventListener('click', () => {
        paintmode = false;
        highlightBtn();
    });


}

window.addEventListener('DOMContentLoaded', () => {
    loadGrid(defaultGridBoxes); //load default number of boxes
});

function changeColor(event) {

    const id = "#" + event.target.id;
    const targetBox = document.querySelector(id).style;
    const targetColor = document.getElementById(event.target.id).style.backgroundColor;

    if (paintmode == true) {
        if (event.type == 'mousedown') {
            if (event.altKey && !event.ctrlKey) {
                const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);
                let newcolor = toRGBArray(targetColor);

                let newR = newcolor[0] + (0.25 * (255-newcolor[0]));
                let newG = newcolor[1] + (0.25 * (255-newcolor[1]));
                let newB = newcolor[2] + (0.25 * (255-newcolor[2]));

                targetBox.backgroundColor = "rgb("+newR+", "+newG+", "+newB+")";


            } else if (event.shiftKey && !event.ctrlKey) {
                const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);
                let newcolor = toRGBArray(targetColor);

                let newR = newcolor[0] * 0.65;
                let newG = newcolor[1] * 0.65;
                let newB = newcolor[2] * 0.65;
                
                targetBox.backgroundColor = "rgb("+newR+", "+newG+", "+newB+")";
            }
            else {
                targetBox.backgroundColor = document.getElementById("colorcontrol").value;
            }
        } 
    } else {
        if (event.type == 'mousedown' || event.ctrlKey) {
            targetBox.backgroundColor = 'rgb(255, 255, 255)';
        }
    }
}

function updateColor() {
    colorDisplay.textContent = "Color Picker: " + document.getElementById("colorcontrol").value;
}

function highlightBtn() {

    if (paintmode == true) {
        btnBrush.style.cssText = "border: 2px solid rgb(224, 159, 37); border-radius: 10%; background-size: 47px;";
        btnErase.style.cssText = "border: none; border-radius: 10%;";
    } else {
        btnErase.style.cssText = "border: 2px solid rgb(224, 159, 37); border-radius: 10%; background-size: 47px;";
        btnBrush.style.cssText = "border: none; border-radius: 10%;";
    }
}