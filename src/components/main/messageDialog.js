import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 320px;
    .message-container {
        border-radius: 30px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: relative;
        margin-bottom: 2rem;
        ::after {
            content: '';
            position: absolute;
            bottom: 0;
            margin-bottom: -1rem;
            border: 10px solid transparent; border-top: 10px solid #ffffff;
        }
        .message-text {
            padding: 1.5rem 1rem 1.5rem 1rem;
            color: #173038;
            text-transform: uppercase;
            font-size: 1.4rem;
            font-weight: 700;
            text-align: center;
            transition: all 0.1s ease-in-out;
            word-break: break-word;
        }
    }
`;

export default function MessageDialog({text}) {
    return (
        <MessageWrapper className='message'>
            <div className='message-container'>
                <div className='message-text'>{text}</div>
            </div>
        </MessageWrapper>
    );
}