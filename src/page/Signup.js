import React from 'react';
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { styled } from 'styled-components';

const LogInScreen = styled.div`
    display: flex;
    flex-direction: column;
    padding:20px;
    margin:20px;
    
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 10px;
    background-color: lightblue;
    
    opacity: 0.9;
    width:80%;
    height:100%;
    box-shadow: 5px 5px 10px black;
    `
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    z-index:2;
    opacity:1;
    
    `
const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `
const StyledMain = styled.main`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
  height:100vh;
  width:100vw;
  
  `
const Signup = ({setUser}) => {
const [displayErrorMessage, setDisplayErrorMessage] = useState("");
const navigate = useNavigate()

//creating a formData state to hold each state for email and password
 const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

//Destructuring email and password from formData
  const {email, password } = formData;

//Declaring the onChange function
 function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

//Declaring the onSubmit function
 async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      setUser(userCredential.user.email);
      navigate("/main-list");


    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use" ) {
        setDisplayErrorMessage("Email already in use");
      }
    console.log(errorMessage)
    }
  }

  return (
    <StyledMain >        
        <StyledSection>
            <div>
                <div>                  
                              <LogInScreen>
                              <h2>Sign Up</h2>       
                    <StyledForm onSubmit={onSubmit}>                                                                                            
                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                label="Email address"
                                value={email}
                                onChange={onChange}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                label="Create password"
                                value={password}
                                onChange={onChange} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                            type="submit" 
                                                 
                        >  
                            Sign up                                
                        </button>
                                                                     
                    </StyledForm>
                   <p>{displayErrorMessage}</p>
                    <p>
                        Already have an account?{' '}
                        <Link to="/sign-in" >
                            Sign in
                        </Link>
                    </p>                   
                    </LogInScreen>                                                                
                </div>
            </div>
        </StyledSection>
    </StyledMain>
  )
}
 
export default Signup