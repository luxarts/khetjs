class Shield {
    constructor(config) {
        this.options = {
            element: document.getElementById('board'),
            cellSize: 75,
            spacing: null,
            colorP1: '#E6E6E6',
            colorP2: '#0000E6'
        }
        if (config.player === undefined || config.rotation === undefined || config.position === undefined) {
            return null;
        }
        this.player = config.player;
        this.rotation = config.rotation; // Clockwise starting with the hypotenuse to top-right
        this.position = config.position; // [col, row] counting from top-left corner

        if (config) Object.assign(this.options, this.options, config);
        this.options.spacing = parseFloat((this.options.cellSize / 10).toFixed(1));

        this.draw();
    }
    draw() {
        const el = this.options.element;
        let ctx = el.getContext('2d');
        const posX = this.position[0] * this.options.cellSize;
        const posY = this.position[1] * this.options.cellSize;
        const cell = this.options.cellSize;
        const space = this.options.spacing;
        
        ctx.save();
        ctx.beginPath();
        switch (this.rotation) {
            case 0:
                break;
            case 1:
                // Move center
                ctx.translate(posX+cell/2, posY+cell/2);
                // Rotate
                ctx.rotate(90*Math.PI/180);
                // Move origin back
                ctx.translate(-posX-cell/2, -posY-cell/2);
                break;
            case 2:
                // Move center
                ctx.translate(posX+cell/2, posY+cell/2);
                // Rotate
                ctx.rotate(180*Math.PI/180);
                // Move origin back
                ctx.translate(-posX-cell/2, -posY-cell/2);
                break;
            case 3:
                // Move center
                ctx.translate(posX+cell/2, posY+cell/2);
                // Rotate
                ctx.rotate(270*Math.PI/180);
                // Move origin back
                ctx.translate(-posX-cell/2, -posY-cell/2);
                break;
        }
        // Arc top
        ctx.arc(posX + cell / 2, posY + cell / 2, cell / 2 - space, Math.PI, 0);
        // Center-center/left
        ctx.moveTo(posX + cell / 2 - (cell / 8), posY + cell / 2);
        // Bottom-center/left
        ctx.lineTo(posX + cell / 2 - (cell / 8), posY + cell - space);
        // Bottom-center/right
        ctx.lineTo(posX + cell / 2 + (cell / 8), posY + cell - space);
        // Center-center/right
        ctx.lineTo(posX + cell / 2 + (cell / 8), posY + cell / 2);
        // Complete
        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        ctx.fillStyle = this.player ? this.options.colorP2 : this.options.colorP1;
        ctx.fill();
        ctx.restore();
    }
}