import React from 'react';
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
 
const Signup = () => {

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
      navigate("/");


    } catch (error) {
    
        const errorCode = error.code;
        const errorMessage = error.message;
    console.log(errorMessage)
    }
  }

  return (
    <main >        
        <section>
            <div>
                <div>                  
                                                                                              
                    <form onSubmit={onSubmit}>                                                                                            
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
                                                                     
                    </form>
                   
                    <p>
                        Already have an account?{' '}
                        <Link to="/sign-in" >
                            Sign in
                        </Link>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default Signup