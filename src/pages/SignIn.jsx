import { app } from '../../firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/signin.css';
import { useState, useRef } from 'react';

function SignIn() {
    const auth = getAuth(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUID] = useState(null);

    // Create references for elements
    const circleRef = useRef(null);
    const logoRef = useRef(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log(email);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        console.log(password);
    };

    const handleSignIn = () => {
        if (circleRef.current) {
            circleRef.current.style.animationName = "circular-motion";
            circleRef.current.style.animationDuration = "1s";
            circleRef.current.style.animationDirection = "alternate";
            circleRef.current.style.animationIterationCount = "infinite";
            circleRef.current.style.animationTimingFunction = "ease-in-out";
        }

        setTimeout(() => {
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    console.log("Signed In");
                    if (circleRef.current) {
                        circleRef.current.style.boxShadow = "0 0 50px #21301E";
                    }
                    setUID(user.user.uid);
                })
                .catch(() => {
                    if (circleRef.current) {
                        circleRef.current.style.animationName = "none";
                    }
                    if (logoRef.current) {
                        logoRef.current.style.boxShadow = "0 0 50px #E02020";
                    }
                });
        }, 1000);
    };

    console.log(uid);
    return (
        <>
            <div className='sign-in-div'>
                <div id='logo' ref={logoRef}>
                    <div id='border' ref={circleRef}></div>
                    <img src="src/image/logo.png" alt="logo" />
                </div>
                <div id='wlc'>
                    <h3 style={{ color: '#ffffff' }}>Welcome Back</h3>
                    <div>
                        <p>Don&#39;t have an account yet? 
                            <a className='links' href="Sign up">Sign up</a>
                        </p>
                    </div>
                </div>
                <div className='details'>
                    <div className='credentials'>
                        <input 
                            className='input-box' 
                            placeholder='Email' 
                            type="text" 
                            onChange={handleEmailChange} 
                        />
                    </div>
                    <div className='credentials'>
                        <input 
                            className='input-box' 
                            placeholder='Password' 
                            type="password" 
                            onChange={handlePasswordChange} 
                        />
                    </div>
                </div>
                <div>
                    <a href="" className='links'>Forgot Password?</a>
                </div>
                <button onClick={handleSignIn}>Sign In</button>
            </div>
        </>
    );
}

export default SignIn;
