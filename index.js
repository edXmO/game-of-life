const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

// Constants
const WIDTH = 600;
const HEIGHT = 600;
const SQUARE_SZ = 10;


// Store de cada cell en el grid
// [{x, y, visited(bool)}]
const GRID2D = [];

const drawGrid = (width, height, side) => {
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
            GRID2D.push({ x: i, y: j, visited: false });
        }
    }
}

const drawCell = () => {
    let index = Math.floor(Math.random() * GRID2D.length);
    // while(GRID2D[index].visited){
    //     console.log("index is visited generating again");
    //     index = Math.floor(Math.random() & GRID2D.length);
    // }
    const { x, y } = GRID2D[index];
    // GRID2D[index].visited = true;
    ctx.moveTo(x, y);
    ctx.fillRect(x, y, 10, 10);
}

const checkNeighbors = (grid, index) => {
    // Una célula muerta con exactamente 3 células vecinas vivas "nace" 
    // (es decir, al turno siguiente estará viva).
    // Una célula viva con 2 o 3 células vecinas vivas sigue viva,
    // en otro caso muere (por "soledad" o "superpoblación").

    // const { x, y, visited } = grid[index];
        // Arriba

        // ctx.moveTo(GRID2D[index - 1].x, GRID2D[index - 1].y);
        // ctx.fillRect(GRID2D[index - 1].x, GRID2D[index - 1].y, 10, 10);

        // Abajo

        // ctx.moveTo(GRID2D[index + 1].x, GRID2D[index + 1].y);
        // ctx.fillRect(GRID2D[index + 1].x, GRID2D[index + 1].y, 10, 10);

        // Derecha

        // ctx.moveTo(GRID2D[index + 60].x, GRID2D[index + 60].y);
        // ctx.fillRect(GRID2D[index + 60].x, GRID2D[index + 60].y, 10, 10);

        // Izquierda

        // ctx.moveTo(GRID2D[index - 60].x, GRID2D[index - 60].y);
        // ctx.fillRect(GRID2D[index - 60].x, GRID2D[index - 60].y, 10, 10);
    
    // Recibe coordenadas de la celula
    // Hay que chequear las 8 celdas a su alrededor
    // 
    // |  |  |  |
    // ----------
    // |  | x |  |
    // ----------
    // |  |  |  |
    //
    // Hay que tener en cuenta los bordes 
    // de alguna manera
    //
    // Estos son :
    // [i - 10][j]
    // [i + 10][j]
    // [i][j + 10]
    // [i][j - 10]
    // [i - 10][j - 10]
    // [i + 10][j + 10]
    // [i + 10][j - 10]
    // [i - 10][j + 10]
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
    drawGrid(WIDTH, HEIGHT, SQUARE_SZ);
}

const MAX_FPS = 2; 
let frameTime = 0;

const tick = (timestamp) => {
    if (timestamp < frameTime + (1000 / MAX_FPS)) {
        requestAnimationFrame(tick);
        return;
    }
    frameTime = timestamp;

    init();
    drawCell();
    
    requestAnimationFrame(tick);
}

tick();



