// Game rules https://www.boardspace.net/khet/rules_english.pdf

let board;

function startGame(){
    board = new Board({
        element: document.getElementById('board')
    });
    //board.setPieces("CLASSIC");
    board.setPiece(new Tower({
        position: [9, 7],
        rotation: 3,
        player: 1
    }));
    board.setPiece(new Triangle({
        position: [1, 7],
        rotation: 0,
        player: 1
    }));
    
    let towerP1 = board.findTower(1);
    let impacts = getImpacts(towerP1);
    console.log("----------------\nImpacted pieces:");
    console.log(impacts);
    // let towerP2 = board.findTower(1);
    // checkImpacts(towerP2);
}

function getImpacts(tower){
    if(tower === undefined)return;

    let impactPieces = [tower];
    let impactRow;
    let impactCol;
    let shotLength = 0;

    // Shot direction
    do{
        let lastPiece = impactPieces[impactPieces.length-1];

        switch(lastPiece.rotation){
            case 0:
                impactRow = lastPiece.position[1]-1;
                impactCol = lastPiece.position[0];
                while(impactRow>=0 && board.getPieceAt(lastPiece.position[0], impactRow) === null)
                    impactRow--;
                shotLength = lastPiece.position[1]-impactRow-1;
                break;
            case 1:
                impactRow = lastPiece.position[1];
                impactCol = lastPiece.position[0]+1;
                while(impactCol<=board.options.cols && board.getPieceAt(impactCol, lastPiece.position[1]) === null)
                    impactCol++;
                shotLength = impactCol-lastPiece.position[0]-1;
                break;
            case 2:
                impactRow = lastPiece.position[1]+1;
                impactCol = lastPiece.position[0];
                while(impactRow<=board.options.rows && board.getPieceAt(lastPiece.position[0], impactRow) === null)
                    impactRow++;
                shotLength = impactRow-lastPiece.position[1]-1;
                break;
            case 3:
                impactRow = lastPiece.position[1];
                impactCol = lastPiece.position[0]-1;
                while(impactCol>=0 && board.getPieceAt(impactCol, lastPiece.position[1]) === null)
                    impactCol--;
                shotLength = lastPiece.position[0]-impactCol-1;
                break;    
        }
        // Draw shot
        lastPiece.shot(shotLength);

        // Impact inside the board
        if(impactCol >= 0 && impactCol < board.options.cols && impactRow >= 0 && impactRow < board.options.rows){
            impactPieces.push(board.getPieceAt(impactCol, impactRow));
        }else{
            impactPieces.push(null);
        }

        console.log("Impact Nº: "+impactPieces.length);
        console.log("Piece: "+impactPieces[impactPieces.length-1].constructor.name);
        console.log("Position: ["+impactCol+", "+impactRow+"]");
        console.log("Direction of the shot: "+lastPiece.rotation);
        console.log("Shot length: "+shotLength);

    }while(impactPieces[impactPieces.length-1] !== null && false);

    return impactPieces;
}