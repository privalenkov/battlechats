import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import LeaderBoardItem from './leaderBoardItem';
import { CSSTransition } from 'react-transition-group';

const StyledLeaderBoardContainer = styled.div`
    position: absolute;
    top: 2rem;
    right: 1rem;
    width: 45vw;
    max-width: 420px;
    height: 410px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    &.mobile {
        height: 0;
    }
    .leaderBoard {
        overflow: hidden;
        border-radius: 24px;
        width: 100%;
        height: 100%;
        margin: 1rem;
        background: #d9d9d9;
        .leaderBoard__body {
            position: relative;
            overflow-y: scroll;
            height: 100%;
            ::-webkit-scrollbar {
                height: 5px;
                width: 5px;
            }
            ::-webkit-scrollbar-thumb {
                background-color: #969696;
                border-radius: 50px;
                margin: 0 1rem;
            }

        }
    }
    @media (max-width: 628px) {
        width: 100%;
        right: initial;
        max-width: 100%;
        top: initial;
        bottom: 1rem;
    }

    &.leaderBoardWrapper-enter {
        opacity: 0;
        transform: scale(0.9);
    }
    &.leaderBoardWrapper-enter-active {
        opacity: 1;
        height: 410px;
        transform: translateX(0);
        transition: all 0.2s, transform 0.2s;
    }
    &.leaderBoardWrapper-exit-active {
        opacity: 0;
        height: 0;
        transform: translateX(0);
        transition: all 0.2s, transform 0.2s;
    }
    &.leaderBoardWrapper-exit {
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.2s, transform 0.2s;
    }
    &.leaderBoardWrapper-enter-done {
        height: 410px;
        opacity: 1;
    }
    &.leaderBoardWrapper-exit-done {
        height: 0;
        opacity: 0;
    }
`;

const LeaderBoardButtonShowContainer = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    overflow: hidden;
    width: 55px;
    height: 55px;
    z-index: 9999;
    position: absolute;
    background: #D0D0D0;
    border-radius: 50%;
    cursor: pointer;
`;

const LeaderBoardBackground = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 1;
`;

export default function LeaderBoard() {
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const items = [
        {color: '#DA5151', name: 'jesusAVGN', score: '20000'},
        {color: '#5153da', name: 'bratishkinoff', score: '20000'},
        {color: '#c5da51', name: 't2x2', score: '20000'},
        {color: '#5dda51', name: 'jesusAVGN', score: '20000'},
        {color: '#da5191', name: 'jesusAVGN', score: '20000'},
        {color: '#5dda51', name: 'jesusAVGN', score: '20000'},
        {color: '#da5191', name: 'jesusAVGN', score: '20000'},
        {color: '#5dda51', name: 'jesusAVGN', score: '20000'},
        {color: '#da5191', name: 'jesusAVGN', score: '20000'},
        {color: '#5dda51', name: 'jesusAVGN', score: '20000'},
        {color: '#da5191', name: 'jesusAVGN', score: '20000'},
        {color: '#5dda51', name: 'jesusAVGN', score: '20000'},
        {color: '#da5191', name: 'jesusAVGN', score: '20000'},
        {color: '#5dda51', name: 'jesusAVGN', score: '20000'},
        {color: '#da5191', name: 'jesusAVGN', score: '20000'},
        {color: '#5dda51', name: 'jesusAVGN', score: '20000'},
        {color: '#da5191', name: 'jesusAVGN', score: '20000'},
    ]

    const isMobileFunc = (type) => {
        var reg = [];
        var any = {
            blackberry: 'BlackBerry',
            android: 'Android',
            windows: 'IEMobile',
            opera: 'Opera Mini',
            ios: 'iPhone|iPad|iPod'
        };
        type = 'undefined' == typeof(type) ? '*' : type.toLowerCase();
        if ('*' === type) reg = Object.values(any);
        else if (type in any) reg.push(any[type]);

        const iPad = !!( reg.find((str) => str === 'iPhone|iPad|iPod') && (navigator.userAgent.match(/(iPad)/) || (navigator.platform === "MacIntel" && typeof navigator.standalone !== "undefined")));
        if (iPad) return iPad;
        
        return !!(reg.length && navigator.userAgent.match(new RegExp(reg.join('|'), 'i')));
    };

    useEffect(() => {
        if(isMobileFunc()) {
            setIsMobile(true)
            ref.current.classList.add('mobile');
        }
    }, []);

    return (
        <>
            {isMobile && !isShow && <LeaderBoardButtonShowContainer onClick={() => setIsShow(true)}></LeaderBoardButtonShowContainer>}
            <CSSTransition
                in={isShow}
                timeout={5000}
                classNames="leaderBoardWrapper"
            >
                {<StyledLeaderBoardContainer ref={ref} className={isMobile && 'mobile'}>
                    <div className='leaderBoard'>
                        <div className='leaderBoard__body'>
                            {items.map((item, index) => <LeaderBoardItem key={index} {...item} bgColor={index % 2 && '#D0D0D0'} />)}
                        </div>
                    </div>
                </StyledLeaderBoardContainer>}
            </CSSTransition>
            {isMobile && <LeaderBoardBackground onClick={() => setIsShow(false)}></LeaderBoardBackground>}
        </>
    );
}