class Diagonal{
    constructor(config){
        this.options = {
            element: document.getElementById('board'),
            cellSize: 75,
            spacing: null,
            colorP1: '#E6E6E6',
            colorP2: '#0000E6'
        }
        if(config.player === undefined || config.rotation === undefined || config.position === undefined){
            return null;
        }
        this.player = config.player;
        this.rotation = config.rotation; // Clockwise starting with the hypotenuse to top-right
        this.position = config.position; // [col, row] counting from top-left corner
        
        if(config)Object.assign(this.options, this.options, config);
        this.options.spacing = parseFloat((this.options.cellSize/10).toFixed(1));

        this.draw();
    }
    draw(){
        const el = this.options.element;
        let ctx = el.getContext('2d');
        const posX = this.position[0]*this.options.cellSize;
        const posY = this.position[1]*this.options.cellSize;
        const cell = this.options.cellSize;
        const space = this.options.spacing;

        ctx.save();
        ctx.beginPath();
        switch(this.rotation){
            case 0:
            case 2:
                break;
            case 1:
            case 3:
                // Move center
                ctx.translate(posX+cell/2, posY+cell/2);
                // Rotate
                ctx.rotate(90*Math.PI/180);
                // Move origin back
                ctx.translate(-posX-cell/2, -posY-cell/2);
                break;
        }
        // Top-left
        ctx.moveTo(posX+space, posY+space);
        // Top-quarter
        ctx.lineTo(posX+cell/4, posY+space);
        // Thirdquarter-right
        ctx.lineTo(posX+cell-space, posY+cell*3/4);
        // Bottom-right
        ctx.lineTo(posX+cell-space, posY+cell-space);
        // Bottom-thirdquarter
        ctx.lineTo(posX+cell*3/4, posY+cell-space);
        // Quarter-left
        ctx.lineTo(posX+space, posY+cell/4);
        // Complete
        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke(); 
        ctx.fillStyle = this.player? this.options.colorP2 : this.options.colorP1;
        ctx.fill();
        ctx.restore();
    }
}