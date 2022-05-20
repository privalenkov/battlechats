import React, { useState, useRef, useEffect } from 'react';
import useDebounced from "../hooks/useDebounced";
import Logo from './logoAnim';
import styled from 'styled-components';
import MessageDialog from './messageDialog';
import { CSSTransition } from 'react-transition-group';

const MainFormStyle = styled.div`
    background-color: #DA5151;
    width: 100vw;
    height: 100vh;
    display: flex; 
    justify-content: center;
    align-items: center;
    .form-container {
        margin: 1rem;
        display: grid;
        justify-items: center;
        width: 370px;
    }
    .just-see-link {
        color: #173038;
        text-decoration: underline;
        font-size: 1rem;
        font-weight: 700;
        margin-top: 1rem;
        text-align: left;
        transition: all 0.1s ease-in-out;
        width: fit-content;
    }
    .form {
        width: 100%;
        display: grid;
    }
    .form-enter {
        opacity: 0;
        height: 0;
        transform: scale(0.9);
    }
    .form-enter-active {
        opacity: 1;
        height: 111px;
        transform: translateX(0);
        transition: all 0.5s, transform 0.5s;
    }
    .form-exit {
        height: 111px;
        opacity: 1;
    }
    .form-exit-active {
        opacity: 0;
        height: 111px;
        transform: scale(0.9);
        transition: all 0.5s, transform 0.5s;
    }

    .message-enter {
        opacity: 0;
        transform: scale(0.9);
    }
    .message {
        opacity: 0;
    }
    .message-enter-active {
        opacity: 1;
        transform: translateX(0);
        transition: all 0.2s, transform 0.5s;
    }
    .message-exit-done {
        transition: all 0.2s, transform 0.5s;
        transform: scale(0.9);
        opacity: 0;
    }
    .message-exit-active {
        transition: all 0.2s, transform 0.5s;
        opacity: 1;
    }
`;

const InputStyle = styled.input`
    height: 50px;
    border: none;
    border-radius: 50px;
    color: #173038;
    background-color: #fff;
    padding: 0 20px;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
    margin-top: 30px;
    transform: scale(1);
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;   
    min-width: 80px;
    &:focus {
        outline: none;
        transform: scale(1.1);
    }
    :hover {
        transform: scale(1.1);
    }
    ::placeholder {
        color:    #d6d5d5;
    }
    &.bounceIn {
        animation: bounceIn 0.2s ease-in-out;
    } 
    @keyframes bounceIn {
        0% {
            transform: scale(1.1);
        }
        20% {
            transform: scale(1.2);
        }
        60% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.1);
        }
    } 
`;

const Footer = styled.footer`
    position: absolute;
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
`

export default function MainForm({setIsFound}) {
    const [isLoad, setIsLoad] = useState(false);
    const [value, setValue] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [text, setText] = useState('');

    const isLoadCb = () => setIsLoad(true);
    const inputRef = useRef(null);

    const debouncedValue = useDebounced((newValue) => {
        console.log(newValue)
        if (newValue.toUpperCase() === foundPattern.toUpperCase()) {
            setIsFound(true)
        } else {
            setText('DASASfdddddddddddddddddddddddddddddddddddddddODOAOA')
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 1000);
        }
    }, 1000);

    const foundPattern = 'jesusAVGN';


    const handlInputChange = (e) => {
        setValue(e.target.value);
        debouncedValue(e.target.value)
        inputRef.current.classList.remove('bounceIn');
        setTimeout(() => {
            if(inputRef.current) inputRef.current.classList.add('bounceIn');
        }, 100);
        // setIsFound(true);
    }

    return (
        <MainFormStyle className="mainForm">
            <div className='form-container'>
                <CSSTransition
                    in={showMessage}
                    timeout={5000}
                    classNames="message"
                >
                    <MessageDialog text={text}/>
                </CSSTransition>
                <Logo isLoad={isLoadCb}/>
                <CSSTransition
                    in={isLoad}
                    timeout={300}
                    classNames="form"
                    unmountOnExit
                >
                    <div className='form'>
                        <InputStyle ref={inputRef} value={value} onChange={handlInputChange} type='text' placeholder='ARE YOU A STREAMER?'></InputStyle>
                        <a className='just-see-link' href='#'>NO, I JUST NEED TO SEE</a>
                    </div>
                </CSSTransition>
            </div>
            <Footer>
                <ul>
                    <a href="#">PRIVATE POLICY</a>
                    <a href="#">CONTACT</a>          
                </ul>
            </Footer>
        </MainFormStyle>
    );
}