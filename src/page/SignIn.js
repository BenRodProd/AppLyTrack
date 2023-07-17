import React from 'react';
import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
 
const SignIn = () => {

const navigate = useNavigate();

const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
 
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/main-list");
      }
    } catch (error) {
       
      const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    }
  }
   
    return(
        <>
            <main >        
                <section>
                    <div>                                            
                                        
                                                       
                        <form onSubmit={onSubmit}>                                              
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={onChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={onChange}
                                />
                            </div>
                                                
                            <div>
                                <button type="submit"                                   
                                                                        
                                >      
                                   Sign In                                                                 
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <Link to="/sign-up">
                                Sign up
                            </Link>
                        </p>
                                                   
                    </div>
                </section>
            </main>
        </>
    )
}
 
export default SignIn