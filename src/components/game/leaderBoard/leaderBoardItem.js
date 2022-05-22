import React from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
    position: relative;
    display: grid;
    padding: 1rem 2rem;
    grid-template-columns: 15px 1fr 1fr;
    gap: 10px;
    align-items: center;
    .color {
        width: 15px;
        height: 15px;
        border-radius: 6px;
    }
    .name {
        text-align: left;
        text-transform: uppercase;
        font-size: 14px;
    }
    .score {
        text-align: right;
        font-size: 14px;
        text-transform: uppercase;
    }
`;

export default function LeaderBoardItem({color, name, score, bgColor}) {
    return (
        <StyledItem style={{background: bgColor || 'unset'}}>
            <span className='color' style={{background: color}}></span>
            <span className='name'>{name}</span>
            <span className='score'>{score}</span>
        </StyledItem>
    );
}