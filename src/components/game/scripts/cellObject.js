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

        this.frame = 0;
        this.currentAnim = null;
        this.animations = ['changeColor'];
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

    _animation() {
        const find = this.animations.find(anim => anim === this.currentAnim);
        let frame = this.frame;
        switch (find) {
            case 'changeColor':
                if(frame >= 0 && frame <= 20) {
                    if (this.size.w >= 17) break;
                    this.color = '#DA5151';
                    this.x -= 0.005;
                    this.y -= 0.005;
                    this.size.w += 0.010;
                    this.size.h += 0.010;
                } else if(frame >= 20 && frame <= 40){
                    if (this.size.w <= 15) break;
                    this.x += 0.005;
                    this.y += 0.005;
                    this.size.w -= 0.010;
                    this.size.h -= 0.010;
                } else {
                    this.frame = 0;
                    this.currentAnim = null;
                }
                
                break;
            default:
                break;
        }
    }

    cellDeath() {
        const grdBg = this.ctx.createLinearGradient(0, 0, this.size.w, this.size.h);
        grdBg.addColorStop(0, "#C9C9C9");
        grdBg.addColorStop(1, "#B9B9B9");
        this.color = grdBg;
    }
    render() {
        const ctx = this.ctx,
        color = this.color,
        x = this.x,
        y = this.y,
        size = this.size,
        borderRadius = this.borderRadius;
        
        ctx.clearRect(x, y, size.w, size.h);
        if (!color) {
            const grdBg = ctx.createLinearGradient(0, 0, size.w, size.h);
            grdBg.addColorStop(0, "#C9C9C9");
            grdBg.addColorStop(1, "#B9B9B9");
            ctx.fillStyle = grdBg;
        } else {
            ctx.fillStyle = color;
        }
        this._roundRect(ctx, this.x, this.y, size.w, size.h, borderRadius, true, false);
    }

    update() {
        this.frame++;
        this._animation();
        this.render();
    }
}


export {cellObject};