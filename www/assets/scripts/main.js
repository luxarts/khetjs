// Game rules https://www.boardspace.net/khet/rules_english.pdf

let BOARD_COLS=10;
let BOARD_ROWS=8;

let board;

function startGame(){
    board = new Board({
        element: document.getElementById('board'),
        cellSize: 75,
        rows: BOARD_ROWS,
        cols: BOARD_COLS
    });
    board.setPieces("CLASSIC");
}