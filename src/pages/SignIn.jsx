import { app } from '../../firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/home.css';
import { useState } from 'react';
function SignIn() {
    const auth = getAuth(app)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [uid,setUID] = useState(null)

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        console.log(email)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        console.log(password)
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log("Signed In")
                // console.log(user.user.uid)
                setUID(user.user.uid)
            }).catch((error) => {
                console.log(error)
            })
    }
    console.log(uid)
    return (
        <>
            <label >Email</label>
            <input type="text" onChange={handleEmailChange} />

            <label >Password</label>
            <input type="text" onChange={handlePasswordChange} />

            <button onClick={handleSignIn}> Sign In</button>
        </>
    )
}

export default SignIn;