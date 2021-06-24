const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

// Constants
const WIDTH = 600;
const HEIGHT = 600;
const SQUARE_SZ = 10;
const ROWS = WIDTH / SQUARE_SZ;
const MAX_FPS = 2; 

//Globals
let frameTime = 0;
const GRID2D = [];
// Store de cada cell en el grid
// [{x, y, visited(bool)}]


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

const checkNeighbors = (grid, index) => {

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
        return grid[index].alive = false;
    }

    if(!grid[index].alive && neighbors === 3){
        return grid[index].alive = true;
    }
    
}

const shouldCellLive = (grid, index) => {
    if(checkNeighbors(grid, index)){
        // Muere
    }
    // Vive
    // Recibe coordenadas de la cell en cuestion
    // devuelve un booleano segun si la celula
    // debe continuar viviendo o no 
    // Reglas
    // 1. Una celula muerta con exactamente
    //    3 celulas vecinas vivas "nace"
    // 2. Una celula viva con 2 || 3 celulas vecinas
    //    vivas sigue viva
    return false;
}

const init = () => {
    drawGrid(WIDTH, HEIGHT, SQUARE_SZ, GRID2D);
}

const tick = (timestamp) => {
    if (timestamp < frameTime + (1000 / MAX_FPS)) {
        requestAnimationFrame(tick);
        return;
    }
    frameTime = timestamp;

    init();
    // drawCell();
    
    requestAnimationFrame(tick);
}

tick();
