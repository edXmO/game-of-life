const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

// Constants
const WIDTH = 600;
const HEIGHT = 600;

const COLS = 10;
const ROWS = 10;

const RES_RATIO = WIDTH / ROWS;

// GLOBAL
let frameTime;
let MAX_FPS = 1;
let grid = [];

const create2DGrid = () => {
    let newGrid = new Array(RES_RATIO);
    for(let i = 0; i < newGrid.length; i++){
        newGrid[i] = new Array(RES_RATIO);
    }
    return newGrid;
}

const draw2DGrid = () => {
    for(let i = 0; i < RES_RATIO; i++){
        for(let j = 0; j < RES_RATIO; j++){
            ctx.beginPath();
            ctx.moveTo(i *  COLS, j * ROWS);
            ctx.rect(i *  COLS, j * ROWS, 10, 10);
            ctx.stroke();
            if(grid[i][j]){
                ctx.fillStyle= "black";
                grid[i][j] == 1 ? ctx.fill() : null;
            } else {
                ctx.fillStyle = "white";
                ctx.fill();
            }
        }
    }
}

const checkNeighbors = (row, col) => {
    const neighbors = [
        grid[row + 1][col],
        grid[row - 1][col],
        grid[row][col + 1],
        grid[row][col - 1],
        grid[row - 1][col - 1],
        grid[row + 1][col + 1],
        grid[row - 1][col + 1],
        grid[row + 1][col -1],
    ].filter(alive => alive).length;

    return neighbors;
}

const shouldCellLive = (row, col) => {
    if(row == 0 || row == RES_RATIO - 1 || col == 0 || col == RES_RATIO - 1){
        return grid[row][col];
    }
    if(grid[row][col] == 1  && checkNeighbors(row, col) === 3) return 1;
    if(grid[row][col] == 0  && (checkNeighbors(row, col) < 2 || checkNeighbors(row, col) > 3)) return 1;
    return 0;
}


const newGen = () => {
    let newGen = grid;
    for(let i = 0; i < RES_RATIO; i++){
        for(let j = 0; j < RES_RATIO; j++){
            grid[i][j] = shouldCellLive(i, j);
        }
    }

    return [...newGen];
}

const init = () => {
    grid = create2DGrid();
    for(let i = 0; i < RES_RATIO; i++){
        for(let j = 0; j < RES_RATIO; j++){
            grid[i][j] = Math.round(Math.random());
        }
    }
    draw2DGrid();
    let nextGen = newGen();
    grid = nextGen;
}


const tick = (timestamp) => {
    if (timestamp < frameTime + (1000 / MAX_FPS)) {
        requestAnimationFrame(tick);
        return;
    }
    frameTime = timestamp;
    init();


    requestAnimationFrame(tick);
};


tick();