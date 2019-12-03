class Board{
    constructor(config){
        this.options = {
            element: document.getElementById('board'),
            cellSize: 50,
            rows: 8,
            cols: 10,
            cellP1: '#666666',
            cellNormal: '#333333',
            cellP2: '#000066'
        };
        this.pieces = [];
        if(config)Object.assign(this.options, this.options, config);
        this.draw();
    }
    draw(){
        let el = this.options.element;
        let ctx = el.getContext('2d');
        
        el.width = this.options.cellSize * this.options.cols;
        el.height = this.options.cellSize * this.options.rows;

        for(let col=0 ; col<this.options.cols ; col++){
            for(let row = 0; row<this.options.rows ; row++){
                ctx.beginPath();
                ctx.rect(col*this.options.cellSize, row*this.options.cellSize, this.options.cellSize, this.options.cellSize);
                if(col === 0 || col === this.options.cols-2 && row === 0 || col === this.options.cols-2 && row === this.options.rows-1){
                    ctx.fillStyle = this.options.cellP1;
                } else if(col === this.options.cols-1 || col === 1 && row === 0 || col === 1 && row === this.options.rows-1){
                    ctx.fillStyle = this.options.cellP2;
                } else {
                    ctx.fillStyle = this.options.cellNormal;
                }
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#000000";
                ctx.stroke();
            }
        }
    }
    // Fill the board with empty pieces
    cleanPieces(){
        this.pieces = [];
        for(let r=0 ; r<this.options.rows ; r++){
            this.pieces.push([]);
            for(let c=0 ; c<this.options.cols ; c++){
                this.pieces[r].push(null);
            }
        }
    }
    //Set pieces for a starting game
    setPieces(difficulty){
        this.cleanPieces();
        if(difficulty === "CLASSIC"){
            // Towers
            this.pieces[0][0] = {type: "TOWER", rotation: 2, player: 0};
            this.pieces[7][9] = {type: "TOWER", rotation: 0, player: 1};
            // Triangles
            this.pieces[0][7] = {type: "TRIANGLE", rotation: 1, player: 0};
            this.pieces[1][2] = {type: "TRIANGLE", rotation: 2, player: 0};
            this.pieces[2][3] = {type: "TRIANGLE", rotation: 3, player: 1};
            this.pieces[3][0] = {type: "TRIANGLE", rotation: 0, player: 0};
            this.pieces[3][2] = {type: "TRIANGLE", rotation: 2, player: 1};
            this.pieces[3][7] = {type: "TRIANGLE", rotation: 1, player: 0};
            this.pieces[3][9] = {type: "TRIANGLE", rotation: 3, player: 1};
            this.pieces[4][0] = {type: "TRIANGLE", rotation: 1, player: 0};
            this.pieces[4][2] = {type: "TRIANGLE", rotation: 3, player: 1};
            this.pieces[4][7] = {type: "TRIANGLE", rotation: 0, player: 0};
            this.pieces[4][9] = {type: "TRIANGLE", rotation: 2, player: 1};
            this.pieces[5][6] = {type: "TRIANGLE", rotation: 1, player: 0};
            this.pieces[6][7] = {type: "TRIANGLE", rotation: 0, player: 1};
            this.pieces[7][2] = {type: "TRIANGLE", rotation: 3, player: 1};
            // Diagonals
            this.pieces[3][4] = {type: "DIAGONAL", rotation: 0, player: 0};
            this.pieces[3][5] = {type: "DIAGONAL", rotation: 1, player: 0};
            this.pieces[4][4] = {type: "DIAGONAL", rotation: 3, player: 1};
            this.pieces[4][5] = {type: "DIAGONAL", rotation: 2, player: 1};
            // Shields
            this.pieces[0][4] = {type: "SHIELD", rotation: 2, player: 0};
            this.pieces[0][6] = {type: "SHIELD", rotation: 2, player: 0};
            this.pieces[7][3] = {type: "SHIELD", rotation: 0, player: 1};
            this.pieces[7][5] = {type: "SHIELD", rotation: 0, player: 1};
            // Kings
            this.pieces[0][5] = {type: "KING", rotation: 2, player: 0};
            this.pieces[7][4] = {type: "KING", rotation: 0, player: 1};
        }
        this.update();
    }
    update(){
        for(let r=0 ; r<this.options.rows ; r++){
            for(let c=0 ; c<this.options.cols ; c++){
                let piece = this.pieces[r][c];

                if(piece !== null){
                    switch(this.pieces[r][c].type){
                        case "TOWER":
                            this.pieces[r][c] = new Tower({position: [c, r], rotation: piece.rotation, player: piece.player});
                            break;
                        case "TRIANGLE":
                            this.pieces[r][c] = new Triangle({position: [c, r], rotation: piece.rotation, player: piece.player});
                            break;
                        case "DIAGONAL":
                            this.pieces[r][c] = new Diagonal({position: [c, r], rotation: piece.rotation, player: piece.player});
                            break;
                        case "SHIELD":
                            this.pieces[r][c] = new Shield({position: [c, r], rotation: piece.rotation, player: piece.player});
                            break;
                        case "KING":
                            this.pieces[r][c] = new King({position: [c, r], rotation: piece.rotation, player: piece.player});
                    }
                }
            }
        }
    }
}