import React from 'react';
import { auth } from './firebase';

import { useNavigate } from 'react-router-dom';
 
const MainList = () => {
    const navigate = useNavigate();
    function onLogout() {
    auth.signOut();
    navigate("/sign-in");
  }
 
       
       
   
    return(
        <>
            <nav>
                <p>
                    Welcome To your Profile page
                </p>
 
                <div>
           <button onClick={onLogout}>
                        Logout
                    </button>
          </div>
            </nav>
        </>
    )
}

export default MainList;