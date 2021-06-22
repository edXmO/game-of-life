let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');

let WIDTH = 600;
let HEIGHT = 600;
let SQUARE_SZ = 10;

// Store de cada cell en el grid
// [[x, y, visited(bool)]]
const GRID2D = [];

const drawGrid = (width, height, side) => {

    for (let i = side; i <= width; i += 10) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
        for (let j = side; j <= height; j += 10) {
            ctx.beginPath();
            ctx.moveTo(j, 0);
            ctx.lineTo(j, height);
            ctx.stroke();

            GRID2D.push([i, j, false]);
        }
    }
}

const drawCell = () => {
    const x = Math.floor(Math.random() * (WIDTH - 1 + 1) + 1);
    const y = Math.floor(Math.random() * (HEIGHT - 1 + 1) + 1);
    ctx.moveTo(x, y);
    ctx.fillRect(x, y, SQUARE_SZ, SQUARE_SZ);
}


const shouldCellLive = (x, y) => {
    // Recibe coordenadas de la cell en cuestion
    // devuelve un booleano segun si la celula
    // debe continuar viviendo o no 
}

const init = () => {
    drawGrid(WIDTH, HEIGHT, SQUARE_SZ);
}

init();

