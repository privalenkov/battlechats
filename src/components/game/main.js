import Canvas from './canvas';
import React from 'react';
import LeaderBoard from './leaderBoard/leaderBoard';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    .logo {
        z-index: 9999;
        cursor: pointer;
        border-radius: 50%;
        position: absolute;
        top: 2rem;
        left: 2rem;
        width: 64px;
        height: 64px;
        transition: all 0.3s ease;
        background: url('/logo.png') no-repeat center;
        background-size: contain;
        :hover {
            transition: all 0.3s ease;
            transform: scale(0.95);
        }
        @media (max-width: 628px) {
            left: 1rem;
            top: 1rem;
        }
    }
`;

const Footer = styled.footer`
    position: absolute;
    z-index: 9999;
    right: 2rem;
    bottom: 0;
    ul {
        list-style: none;
        display: flex;
        gap: 12px;
        padding: 0;
        flex-wrap: wrap;
        justify-content: center;
        a {
            font-size: 12px;
            font-weight: 700;
            color: #173038;
            text-decoration: none;
            transition: all 0.1s ease-in-out;
        }
    }
    @media (max-width: 628px) {
        display: none;
    }
`;


export default function Main() {
    return (
        <CanvasWrapper>
            <div className='logo' onClick={() => document.location.reload()}></div>
            <LeaderBoard />
            <Footer>
                <ul>
                    <a href="#">PRIVATE POLICY</a>
                    <a href="#">CONTACT</a>          
                </ul>
            </Footer>
            <Canvas />
        </CanvasWrapper>
    );
}