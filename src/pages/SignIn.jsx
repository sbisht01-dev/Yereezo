import { app } from '../../firebase.js';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import '../styles/signin.css';
import { useState, useRef, useEffect } from 'react';
import logo from '../assets/image/logo.png'

function SignIn() {
    // todo: sign up left 

    const auth = getAuth(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Creating references for elements for visual feedback
    const circleRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);

    // get email value reset visual feedback 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Signed In");
            } else {
                console.log("NO user Signed in");
            }
        })
        return () => unsubscribe();
    }, [auth])


    const handleEmailChange = (event) => {
        if (titleRef.current) {
            titleRef.current.innerText = "Welcome Back"
        }
        if (circleRef.current) {
            circleRef.current.style.animationName = "none";
        }
        setEmail(event.target.value);
    };

    // get password value reset visual feedback 
    const handlePasswordChange = (event) => {
        if (titleRef.current) {
            titleRef.current.innerText = "Welcome Back"
        }
        if (circleRef.current) {
            circleRef.current.style.animationName = "none";
        }
        setPassword(event.target.value);
    };

    const handleSignIn = () => {
        // animation for signin
        if (circleRef.current) {
            circleRef.current.style.animationName = "circular-motion";
            circleRef.current.style.animationDuration = "1s";
            circleRef.current.style.animationDirection = "forwards";
            circleRef.current.style.animationIterationCount = "infinite";
            circleRef.current.style.animationTimingFunction = "ease-in-out";
        }

        // email & password field validation
        if (email === "" || password === "") {
            if (titleRef.current) {
                titleRef.current.innerText = "Please enter all details"
            }
            if (logoRef.current) {
                logoRef.current.style.boxShadow = "0 0 50px #E02020";
            }
            if (circleRef.current) {
                circleRef.current.style.animationName = "none";
            }
        } else {
            // saving uid of user after successful singin
            window.localStorage.clear();
            setTimeout(() => {
                signInWithEmailAndPassword(auth, email, password)
                    .then((user) => {
                        window.localStorage.setItem("uid", user.user.uid)
                        if (logoRef.current) {
                            logoRef.current.style.boxShadow = "0 0 50px #486e41";
                        }
                    })
                    .catch(() => {
                        // visual feedback on unsuccessful signin attempt
                        if (circleRef.current) {
                            circleRef.current.style.animationName = "none";
                        }
                        if (logoRef.current) {
                            logoRef.current.style.boxShadow = "0 0 50px #E02020";
                        }
                        if (titleRef.current) {
                            titleRef.current.innerText = "Wrong Email or Password"
                        }
                    });
            }, 10);
        }
    };

    // password reset 
    const handlePasswordReset = () => {
        console.log("Reset Mail function")
        sendPasswordResetEmail(auth, email)
            .then(() => {
                if (titleRef.current) {
                    titleRef.current.innerText = "Reset Email Sent"
                }
            })
            .catch(() => {
                // validation for empty email field
                if (email === "") {
                    if (titleRef.current) {
                        titleRef.current.innerText = "Enter your Email First"
                    }
                } else {
                    // validation for correct mail
                    if (titleRef.current) {
                        titleRef.current.innerText = "Enter correct Email"
                    }
                }

            });

    }

    return (
        <>
            <div className='sign-in-div'>
                <div id='logo' ref={logoRef}>
                    <div id='border' ref={circleRef}></div>
                    <img src={logo} alt="logo" />
                </div>
                <div id='wlc'>
                    <h3 id="title" style={{ color: '#ffffff' }} ref={titleRef}>Welcome Back</h3>
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
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSignIn()
                                }
                            }}
                        />
                    </div>
                </div>
                <div>
                    <a className='links' onClick={handlePasswordReset}>Forgot Password?</a>
                </div>
                <button onClick={handleSignIn}>Sign In</button>
            </div>
        </>
    );
}

export default SignIn;
