export default class gridManager {
    constructor(gridWidth, gridHeight, gridCellWidth, gridCellHeight, dataSrc) {
        this.config = {
            gridWidth: gridWidth || 10,
            gridHeight: gridHeight || 10,
            gridCellWidth: gridCellWidth || 10,
            gridCellHeight: gridCellHeight || 10,
            dataSrc: dataSrc || []
        }
    }

    _createGridSrc() {
        const height = this.config.gridHeight,
            width = this.config.gridWidth,
            output = [];
        for (let i = 0; i < height; i++) {
            output[i] = [];
            for (let j = 0; j < width; j++) {
                if (this.config.dataSrc) {
                    const dataSrc = this.config.dataSrc;
                    output[i][j] = dataSrc[i * width + j % dataSrc.length];
                }
            }
        }
        return output;
    };

    _roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === 'undefined') stroke = true;
        if (typeof radius === 'undefined') radius = 5;
        if (typeof radius === 'number') {
          radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
          const defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
          for (let side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
          }
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
          ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    }

    createGrid(ctx) {
        const cellWidth = this.config.gridCellWidth;
        const cellHeight = this.config.gridCellHeight;
        const gridWidth = this.config.gridWidth;
        const gridHeight = this.config.gridHeight;
        const radius = 6;
        const cellOffset = 1.3;
        
        // ctx.fillStyle = '#fff';
        // ctx.fillRect(0, 0, 500, 500);

        //create grid
        const data = this._createGridSrc();
        const gridMap = [];
        for (let i = data.length - 1; i >= 0; i--) {
            for (let j = data[i].length - 1; j >= 0; j--) {
                const y = gridHeight - (cellHeight * i) * cellOffset;
                const x = gridWidth - (cellWidth * j) * cellOffset;
                
                const template = data[i][j];
                if (template[0] > 10 ) {
                    // ctx.fillStyle = '#ff0000';
                    // this._roundRect(ctx, x, y, cellWidth, cellHeight, radius, true, false);

                    gridMap.push({x: Math.floor(x), y: Math.floor(y)});
                }
            }
        }
        return gridMap;
    };
    
}