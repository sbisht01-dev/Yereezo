import { app } from '../../firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/signin.css';
import { useState, useRef } from 'react';

function SignIn() {
    const auth = getAuth(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUID] = useState(null);
    // const title = document.getElementById("title")

    // Creating references for elements
    const circleRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);

    const handleEmailChange = (event) => {
        if(titleRef.current){
            titleRef.current.innerText = "Welcome Back"
        }
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        if(titleRef.current){
            titleRef.current.innerText = "Welcome Back"
        }
        setPassword(event.target.value);
    };

    const handleSignIn = () => {
        if (circleRef.current) {
            circleRef.current.style.animationName = "circular-motion";
            circleRef.current.style.animationDuration = "1s";
            circleRef.current.style.animationDirection = "alternate";
            circleRef.current.style.animationIterationCount = "infinite";
            circleRef.current.style.animationTimingFunction = "ease-in-out";
        }
        if(email ==="" || password ===""){
            if(titleRef.current){
                titleRef.current.innerText = "Please enter all details"
            }
            if (logoRef.current) {
                logoRef.current.style.boxShadow = "0 0 50px #E02020";
            }
        }else{            
            setTimeout(() => {
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    logoRef.current.style.boxShadow = "0 0 50px #21301E";
                    setUID(user.user.uid);
                })
                .catch(() => {
                    if (circleRef.current) {
                        circleRef.current.style.animationName = "none";
                    }
                    if (logoRef.current) {
                        logoRef.current.style.boxShadow = "0 0 50px #E02020";
                    }
                    if(titleRef.current){
                        titleRef.current.innerText = "Please enter correct details"
                    }
                });
            }, 100);
        }
    };

    return (
        <>
            <div className='sign-in-div'>
                <div id='logo' ref={logoRef}>
                    <div id='border' ref={circleRef}></div>
                    <img src="src/image/logo.png" alt="logo" />
                </div>
                <div id='wlc'>
                    <h3  id="title" style={{ color: '#ffffff' }} ref={titleRef}>Welcome Back</h3>
                    <div>
                        <p>Don&#39;t have an account yet?  <span>  </span> <span> </span>
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
