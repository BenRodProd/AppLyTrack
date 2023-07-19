import React, { useEffect } from 'react';
import Signup from './page/Signup';
import SignIn from './page/SignIn';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import MainList from './components/Mainlist';
import Intro from './components/Intro';
import styled from 'styled-components';
import Stats from './components/Stats';
const StyledMain = styled.main`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  
  overflow-x: hidden;
  z-index: -2;

  
  `
 

function App() {
 const [user, setUser] = React.useState(null);
const [introOn, setIntroOn] = React.useState(true);
useEffect(() => {
  setTimeout(() => {
    setIntroOn(false);
  }, 4000);
},[])

  return (
    <Router>
      <StyledMain>
        {introOn && <Intro/>}
        <section>                              
            <Routes>                                                                        
              <Route path="/" element={<SignIn setUser={setUser}/>}/>
               <Route path="/sign-up" element={<Signup setUser={setUser}/>}/>
               <Route path="/sign-in" element={<SignIn setUser={setUser}/>}/>
                <Route path="/main-list" element={<MainList  user={user}/> }/>
               
            </Routes>                    
        </section>
      </StyledMain>
    </Router>
  );
}
 

export default App;