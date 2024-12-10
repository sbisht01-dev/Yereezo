import { app } from '../../firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/signin.css';
import { useRef, useState } from 'react';
function SignIn() {
    const auth = getAuth(app)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [uid, setUID] = useState(null)
    const circle = useRef(document.getElementById("border"))
    const logo = useRef(document.getElementById("logo"))

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        console.log(email)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        console.log(password)
    }

    const handleSignIn = () => {
        circle.style.animationName = "circular-motion"
        circle.style.animationDuration = "1s"
        circle.style.animationDirection = "alternate"
        circle.style.animationIterationCount = "infinite"
        circle.style.animationTimingFunction = "ease-in-out"
        setTimeout(() => {

            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    console.log("Signed In")
                    circle.style.boxShadow = "0 0 50px #21301E"

                    // console.log(user.user.uid)
                    setUID(user.user.uid)
                }).catch(() => {
                    circle.style.animationName = "none"
                    logo.style.boxShadow = "0 0 50px #E02020"
                    //    alert("wrong password")

                })
        }, 1000);
    }
    console.log(uid)
    return (
        <>
            <div className='sign-in-div'>
                <div id='logo'>
                    <div id='border'></div>
                    <img src="src/image/logo.png" alt="" />
                </div>
                <div id='wlc'>
                    <h3 style={{ color: '#ffffff' }}> Welcome Back </h3>
                    <div>
                        <p>Don&#39;t have an account yet? <span> </span>
                            <a className='links' href="Sign up">Sign up</a>
                        </p>
                    </div>
                </div>
                <div className='details'>
                    <div className='credentials'>
                        <input className='input-box' placeholder='Email' type="text" onChange={handleEmailChange} />
                    </div>
                    <div className='credentials'>
                        <input className='input-box' placeholder='Password' type="password" onChange={handlePasswordChange} />
                    </div>
                </div>
                <div>
                    <a href="" className='links'>Forgot Password?</a>
                </div>
                <button onClick={handleSignIn}>Sign In</button>
            </div>
        </>
    )
}

export default SignIn;