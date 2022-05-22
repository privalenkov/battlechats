class cellObject {
    constructor(ctx, id, x, y, size, borderRadius, color, team) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.borderRadius = borderRadius;
        this.color = color;
        this.team = team;
        this.id = id;
        this.isAnim = true;
        this.animState = 'start';
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

    animation() {
        if(this.isAnim) {
            switch (this.animState) {
                case 'start':
                    if (this.size.w >= 18 && this.size.h >= 18) {
                        this.color = '#DA5151';
                        this.animState = 'end'
                    };
                    this.x -= 0.1;
                    this.y -= 0.1;
                    this.size.w += 0.15;
                    this.size.h += 0.15;
                    
                    break;
                case 'end':
                    if (this.size.w <= 16 && this.size.h <= 16) {
                        
                        this.isAnim = false
                    
                    }
                    this.x += 0.1;
                    this.y += 0.1;
                    this.size.w -= 0.15;
                    this.size.h -= 0.15;
                    
                    break;
                default:
                    break;
            }
        }
    }

    cellDeath() {
        const grdBg = this.ctx.createLinearGradient(0, 0, this.size.w, this.size.h);
        grdBg.addColorStop(0, "#C9C9C9");
        grdBg.addColorStop(1, "#B9B9B9");
        this.color = grdBg;
    }
    render() {
        const grdBg = this.ctx.createLinearGradient(0, 0, this.size.w, this.size.h);
        grdBg.addColorStop(0, "#C9C9C9");
        grdBg.addColorStop(1, "#B9B9B9");

        this.ctx.fillStyle = this.color ? this.color : grdBg;
        this._roundRect(this.ctx, this.x, this.y, this.size.w, this.size.h, this.borderRadius, true, false);
    }

    update() {
        this.render();
    }
}


export {cellObject};