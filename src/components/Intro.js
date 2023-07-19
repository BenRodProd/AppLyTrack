import { keyframes, styled } from "styled-components";

const fadeFromTop = keyframes`
    from {
        
        transform: translateY(-1000%);
    }
    to {
        transform: translateY()(0%)
    }
    `

const fadeFromBottom = keyframes`
    from {
        
        transform: translateY(1000%);
    }
    to {
        transform: translateY()(0%)
    }
    `
const fadeIn= keyframes`
from {
    filter: blur(5rem);
   opacity: 0;
}
to {
    opacity:1;
    filter: blur(0);
}
`


const LettersApp = styled.div`
font-family: 'Courier New', Courier, monospace;
font-size: 3rem;
color: green;
font-weight: bold;
animation: ${fadeFromTop} 1s;
`
const LettersLy = styled.div`
font-family: 'Courier New', Courier, monospace;
font-size: 3rem;
color: blue;
font-weight: bold;
animation: ${fadeFromBottom} 1s;
`
const LettersTrack = styled.div`
font-family: 'Courier New', Courier, monospace;
font-size: 3rem;
color: red;
font-weight: bold;
animation: ${fadeIn} 3s;
`
const MainStyled = styled.div`
display:flex;
position:absolute;
top:0;
left:0;
flex-direction: row;
align-items: center;
justify-content: center;
width:100%;
height:100%;
background-color:antiquewhite;
z-index:5;
`


export default function Intro() {
    return (
        <MainStyled>
            <LettersApp>App</LettersApp>
            <LettersLy>Ly</LettersLy>
            <LettersTrack>Track</LettersTrack>
        </MainStyled>
    );
}