import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';


class Sprite {
    constructor(options) {
        this.canvas = options.canvas;
        this.ctx = options.ctx;

        this.image = options.image;

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;

        this.width = options.width;
        this.height = options.height;

        this.start();
    }

    update() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.finished();
            }
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.width / this.numberOfFrames, this.height);
        this.ctx.drawImage(
            this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            0,
            0,
            this.width / this.numberOfFrames,
            this.height
        )
    }

    loop = () => {
        this.update();
        this.render();
        if (this.willAnimate)
            window.requestAnimationFrame(this.loop);
    }

    start() {
        this.willAnimate = true;
        window.requestAnimationFrame(this.loop);
        this.canvas.dispatchEvent(new Event('start-animation'));
    }

    finished() {
        this.canvas.dispatchEvent(new Event('end-animation'));
        this.willAnimate = false;
    }
}

const ImageContainer = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Logo({isLoad}) {
    const canvasImage = useRef(null);


    useEffect(() => {
        console.log(canvasImage)
        canvasImage.current.width = 90;
        canvasImage.current.height = 90;
        let coinImage = new Image();
        coinImage.src = './spritesheetLogo.png';

        canvasImage.current.addEventListener('start-animation', () => {
            console.log('start-animation');
        })
        canvasImage.current.addEventListener('end-animation', () => {
            isLoad(true)
            console.log('end-animation');
        })

        new Sprite({
            canvas: canvasImage.current,
            ctx: canvasImage.current.getContext('2d'),
            image: coinImage,
            width: 11558,
            height: 90,
            numberOfFrames: 129,
            ticksPerFrame: 0.8,
        })

        

    }, []);

    return (
        <ImageContainer>
            <canvas ref={ canvasImage } id="logo-canvas"></canvas>
        </ImageContainer>
    );
}