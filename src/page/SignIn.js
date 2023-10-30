import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { styled } from 'styled-components';

const LogInScreen = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 20px;

  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  background-color: lightblue;

  opacity: 0.9;
  width: 80%;
  height: 100%;
  box-shadow: 5px 5px 10px black;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  z-index: 2;
  opacity: 1;
`;
const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const SignIn = ({ setUser }) => {
  const [displayErrorMessage, setDisplayErrorMessage] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        setUser(userCredential.user.email);
        navigate('/main-list');
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/user-not-found') {
        setDisplayErrorMessage('Email not a user');
      }
    }
  }

  return (
    <>
      <StyledMain>
        <StyledSection>
          <LogInScreen>
            <h2>Log In</h2>
            <StyledForm onSubmit={onSubmit}>
              <div>
                <label htmlFor="email">Email address</label>
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
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  min="6"
                  placeholder="Password"
                  onChange={onChange}
                />
              </div>

              <div>
                <button type="submit">Sign In</button>
              </div>
            </StyledForm>
            <p>{displayErrorMessage}</p>
            <p className="text-sm text-white text-center">
              No account yet? <Link to="/sign-up">Sign up</Link>
            </p>
          </LogInScreen>
        </StyledSection>
      </StyledMain>
    </>
  );
};

export default SignIn;
