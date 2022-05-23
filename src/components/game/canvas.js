import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import gridManager from './scripts/gridManager';
import { cellObject } from './scripts/cellObject';
import mapCoords from './scripts/mapCoords';
import {
    SCROLL_SENSITIVITY, cameraZoom, cameraOffset,
    adjustZoom, onPointerDown, handleTouch,
    onPointerUp, onPointerMove
} from './scripts/camera';

const StyledCanvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, #F0F0F0 0%, #E7E7E7 100%);
    cursor: grab;
    &:active {
        cursor: grabbing;
    }
`;

export default function Canvas() {
    const ref = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [cells, setCells] = useState(null);

    const [fps, setFps] = useState(60);
    const [fpsInterval, setFpsInterval] = useState(1000 / fps);
    const [then, setThen] = useState(Date.now());
    const [startTime, setStartTime] = useState(then);
    // const [now, setNow] = useState(null);
    // const [elapsed, setElapsed] = useState(null);
    // let fps, fpsInterval, startTime, now, then, elapsed;

    const getPixelData = (imageData) => {
        const pixels = [];
        for (let i = imageData.length - 1; i >= 0; i=i-4) {
            pixels.push([
                imageData[i - 0],
                imageData[i - 1],
                imageData[i - 2],
                imageData[i - 3]
            ]);
        }
        return pixels;
    }
    const generateGrid = (document, imageSrc) => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = function() {
            console.log(ctx)
            ctx.drawImage(img, 0, 0, 40, 40);
            const rgbaConcat = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const pixels = getPixelData(rgbaConcat)
            const grid = new gridManager(canvas.width, canvas.height, 16, 16, pixels);
            const generateMapCoords = grid.createGrid(ctx);
            console.log(generateMapCoords)
        }
    }

    const resizeCanvas = (canvas) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    const drawStuff = () => {
        const now = Date.now();
        const elapsed = now - then;
        if (elapsed > fpsInterval) {
            setThen(now - (elapsed % fpsInterval));
            resizeCanvas(ref.current);
            ctx.translate( window.innerWidth / 2, window.innerHeight / 2 );
            ctx.scale(cameraZoom, cameraZoom);
            ctx.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y );
            // const grdBg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            // grdBg.addColorStop(0, "#F0F0F0");
            // grdBg.addColorStop(1, "#E7E7E7");
            // ctx.fillStyle = grdBg;
            // create background color
            // ctx.fillRect(0, 0, canvas.width, canvas.height);
    
            //////////////////// get map coords from image data

            for (let index = cells.length - 1; index >= 0; index--) {
                // setTimeout(() => {
                // }, 800 * index);
                cells[index].currentAnim = 'changeColor';
                cells[index].update();
            }
            // cells.map((cell, index) => {
            //     setTimeout(() => {
            //         cell.animation();
            //     }, 800 * index);
            //     cell.update();
            // })
            
            // cellObjects[0].color = '#FF0000';
            // cellObjects[0].draw(ctx);
    
        }

    }

    const animate = () => {
        requestAnimationFrame(animate);
        drawStuff();
    }

    useEffect(() => {
        const canvas = ref.current;
        resizeCanvas(canvas);
        setCtx(canvas.getContext('2d'));
    }, []);

    useEffect(() => {
        if(!ctx) return;
        // generateGrid(document, 'africa.svg');
        let cellObjects = [];
        mapCoords.map(({x, y}, idx) => {
            const cell = new cellObject(ctx, idx, x, y, {w: 16, h: 16}, 6)
            cellObjects.push(cell);
        })
        setCells(cellObjects);
    }, [ctx]);

    useEffect(() => {
        if(!cells) return;
        setFpsInterval(1000 / fps);
        setThen(Date.now());
        setStartTime(then);

        animate();
        const canvas = ref.current;
        canvas.addEventListener('mousedown', onPointerDown)
        canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
        canvas.addEventListener('mouseup', onPointerUp)
        canvas.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
        canvas.addEventListener('mousemove', onPointerMove)
        canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
        canvas.addEventListener('wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))
        return () => {
            canvas.removeEventListener('mousedown', onPointerDown)
            canvas.removeEventListener('touchstart', (e) => handleTouch)
            canvas.removeEventListener('mouseup', onPointerUp)
            canvas.removeEventListener('touchend',  (e) => handleTouch)
            canvas.removeEventListener('mousemove', onPointerMove)
            canvas.removeEventListener('touchmove', (e) => handleTouch)
            canvas.removeEventListener('wheel', (e) => adjustZoom)
        };
    }, [cells]);
    return (
        <StyledCanvas ref={ref} id='game'>Your browser does not support canvas.</StyledCanvas>
    );
}