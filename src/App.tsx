// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { animated, useSpring } from 'react-spring';
import imgUrl from './assets/tiling20.png'
import imgUrl2 from './assets/tiling20b.png'
import './App.css'
import {Game} from "./Game.tsx";
import {useEffect} from "react";

function App() {
    // // set the background image on the body tag via useEffect
    // useEffect(() => {
    //     document.body.style.backgroundImage = `url(${imgUrl})`
    // });

    const styles = useSpring({
        loop: { reverse: true },
        from: {
            backgroundPositionX: "0%",
            transform: 'scale(1)',
        },
        to: {
            backgroundPositionX: "0.5%",
            transform: 'scale(1.03)',
        },
        config: {
            tension: 210,
            friction: 20,
            duration: 10000,
        },
    });

    const fadeIn = useSpring({
        from: {
            backgroundPositionX: "0%",
            transform: 'scale(1)',
            opacity: 0.98
        },
        to: {
            backgroundPositionX: "0.5%",
            transform: 'scale(1.03)',
            opacity: 0.02
        },
        loop: { reverse: true },
        config: {
            tension: 210,
            friction: 20,
            duration: 10000
        },
    });

    const fadeOut = useSpring({
        from: {
            backgroundPositionX: "0%",
            transform: 'scale(1)',
            opacity: 0.02
        },
        to: {
            backgroundPositionX: "0.5%",
            transform: 'scale(1.06)',
            opacity: 0.98
        },
        loop: { reverse: true },
        config: {
            tension: 210,
            friction: 20,
            duration: 10000
        }
    });

    return (
        <>
            <animated.div
                style={{
                    ...fadeIn,
                    zIndex: -1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundImage: `url(${imgUrl}`,
                    backgroundRepeat: 'repeat',
                    // backgroundSize: 'cover',
                    width: '100%',
                    minWidth: '100vw',
                    height: '100vh',
              }}
            ></animated.div>
            <animated.div
                style={{
                    ...fadeOut,
                    zIndex: -1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundImage: `url(${imgUrl2}`,
                    backgroundRepeat: 'repeat',
                    // backgroundSize: 'cover',
                    width: '100%',
                    minWidth: '100vw',
                    height: '100vh',
                }}
            >
            </animated.div>

          <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }}>
              <Game />
          </div>
        </>
    )
}

export default App
