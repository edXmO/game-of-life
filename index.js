const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

// Constants
const WIDTH = 600;
const HEIGHT = 600;
const SQUARE_SZ = 10;
const ROWS = WIDTH / SQUARE_SZ;
const MAX_FPS = 2;
const GRID_LENGTH = WIDTH * HEIGHT;

//Globals
let frameTime = 0;
let GRID2D = [];
// Store de cada cell en el grid
// [{x, y, alive(bool)}]


const drawGrid = (width, height, side, arr) => {
    for (let i = side; i <= width; i += side) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
        for (let j = side; j <= height; j += side) {
            ctx.beginPath();
            ctx.moveTo(j, 0);
            ctx.lineTo(j, height);
            ctx.stroke();
            arr.push({ x: i, y: j, alive: false });
        }
    }
}

// const checkCells = (arr) => {
//     for (let i = side; i <= width; i += side) {
//         ctx.beginPath();
//         ctx.moveTo(0, i);
//         ctx.lineTo(width, i);
//         ctx.stroke();
//         for (let j = side; j <= height; j += side) {
//             ctx.beginPath();
//             ctx.moveTo(j, 0);
//             ctx.lineTo(j, height);
//             ctx.stroke();
//         }
//     }
// }

const nextGen = (arr) => {
    let newGen = arr;
    for(let i = 0; i < GRID_LENGTH - 1; i++){
        let cellStatus = shouldCellLive(arr, i);
        newGen[i].alive = cellStatus;
    }
    return [...newGen];
}

const drawCell = () => {
    let index = Math.floor(Math.random() * GRID2D.length);
    while(GRID2D[index].alive){
        index = Math.floor(Math.random() * GRID2D.length);
    }
    const { x, y } = GRID2D[index];
    GRID2D[index].alive = true;
    ctx.moveTo(x, y);
    ctx.fillRect(x, y, 10, 10);
}

const shouldCellLive = (grid, index) => {

    const neighbors = [
        GRID2D[index - 1].alive, 
        GRID2D[index + 1].alive,
        GRID2D[index + ROWS].alive,
        GRID2D[index + ROWS + 1].alive,
        GRID2D[index + ROWS - 1].alive,
        GRID2D[index - ROWS].alive,
        GRID2D[index - ROWS + 1].alive,
        GRID2D[index - ROWS - 1].alive
    ].filter(neighbor => neighbor).length;

    if(grid[index].alive && neighbors < 2){
        return false;
    }

    console.log("also got to here");

    if(!grid[index].alive && neighbors === 3){
        return true;
    }
    
}

const init = () => {
    drawGrid(WIDTH, HEIGHT, SQUARE_SZ, GRID2D);
}

init();

const tick = (timestamp) => {
    if (timestamp < frameTime + (1000 / MAX_FPS)) {
        requestAnimationFrame(tick);
        return;
    }
    frameTime = timestamp;

    GRID2D = nextGen(GRID2D);
    
    requestAnimationFrame(tick);
}

tick();
