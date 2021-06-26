const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
const startBtn = document.querySelector('.controls__btn--start');
const resetBtn = document.querySelector('.controls__btn--reset');
const stopBtn = document.querySelector('.controls__btn--stop');
const generationNumber = document.querySelector('.controls__gridInfo--generation');
const aliveCellsAmount = document.querySelector('.controls__gridInfo--alive');

// Constants
const WIDTH = 600;
const HEIGHT = 600;

const COLS = 10;
const ROWS = 10;

const RES_RATIO = WIDTH / ROWS;

// GLOBALS
let aliveCells = 0;
let generation = 0;
let animationFrameID;
let frameTime;
let maxFps = 0.7;
let grid = [];


const changeCellStatus = (e) => {
    const { offsetX, offsetY } = e;
    const coordX = Math.floor(offsetX / ROWS);
    const coordY = Math.floor(offsetY / COLS);
    ctx.beginPath();
    ctx.moveTo(coordX * COLS, coordY * ROWS);
    ctx.fillStyle = "black"
    ctx.fillRect(coordX * COLS, coordY * COLS, 10, 10);
    if(!grid[coordX][coordY]){
        grid[coordX][coordY] = 1;
        aliveCells++;
        aliveCellsAmount.innerHTML = `Alive cells: ${aliveCells}`;
    }
}


const create2DGrid = () => {
    let newGrid = new Array(RES_RATIO);
    for(let i = 0; i < newGrid.length; i++){
        newGrid[i] = new Array(RES_RATIO).fill(0);
    }
    return newGrid;
}


const draw2DGrid = () => {
    for(let i = 0; i < RES_RATIO; i++){
        for(let j = 0; j < RES_RATIO; j++){
            ctx.beginPath();
            ctx.moveTo(i *  COLS, j * ROWS);
            ctx.fillStyle = grid[i][j] ? "black" : "white";
            ctx.fillRect(i *  COLS, j * ROWS, 10, 10)
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
        return 0;
    }
    if(grid[row][col] == 0  && checkNeighbors(row, col) == 3) return 1;
    if(grid[row][col] == 1  && (checkNeighbors(row, col) == 2 || checkNeighbors(row, col) == 3)) return 1;
    return 0;
}

const newGen = () => {
    let newGen = grid;
    for(let i = 0; i < RES_RATIO; i++){
        for(let j = 0; j < RES_RATIO; j++){
            newGen[i][j] = shouldCellLive(i, j);
        }
    }

    return [...newGen];
}

const init = () => {
    grid = create2DGrid();
    draw2DGrid();
}

// Game Init
init();


const tick = (timestamp) => {
    if (timestamp < frameTime + (1000 / maxFps)) {
        animationFrameID = requestAnimationFrame(tick);
        return;
    }
    frameTime = timestamp;

    newGen();
    generationNumber.innerHTML = `Generation: ${generation}`;
    generation++;

    draw2DGrid();
    // aliveCellsAmount.innerHTML = `Alive cells: ${cells}`;

    animationFrameID = requestAnimationFrame(tick);
    // console.log(`Generations: ${generation}, Alive Cells: ${aliveCells}`)
};

// Evt Listeners

canvas.addEventListener('click', (e) => {
    changeCellStatus(e);
});

startBtn.addEventListener('click', () => {
    tick();
})

stopBtn.addEventListener('click', () => {
    window.cancelAnimationFrame(animationFrameID);
})

resetBtn.addEventListener('click', () => {
    window.cancelAnimationFrame(animationFrameID);
    init();
    generation = 0;
    aliveCells = 0;
    generationNumber.innerHTML = `Generation: ${generation}`;
    // aliveCellsAmount.innerHTML = `Alive cells: ${aliveCells}`;
});







