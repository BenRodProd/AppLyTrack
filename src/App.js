import React from 'react';
import Signup from './page/Signup';
import SignIn from './page/SignIn';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import MainList from './components/Mainlist';
 
function App() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>                                                                        
              <Route path="/" element={<MainList/>}/>
               <Route path="/sign-up" element={<Signup/>}/>
               <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/main-list" element={<MainList/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;