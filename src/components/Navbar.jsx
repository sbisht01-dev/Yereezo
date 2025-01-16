import '../styles/home.css'
import { app } from '../../firebase.js';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';

function Navbar() {
    const navigate = useNavigate();
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log(user)
            } else {
                setUser(null);
            }
        })
        return () => unsubscribe();
    }, [auth])

    const handleLogin = () => {
        let login = document.getElementById("login")

        login.addEventListener('click', () => {
            navigate('/signin')
        })
    }

    return (
        <>
            <nav className="navbar">
                <div className='logo'><p>Doro</p></div>
                {(user === null)
                    ?
                    <div id='sign'>
                        <div id='signup' className='sign'>Sign up</div>
                        <div id='login' className='sign' onClick={handleLogin}>Log in</div>
                    </div>
                    :
                    (
                        <>
                        <div id="sign">
                            <div className="user-profile">{user.email}</div>
                            <div className="sign" id='login' onClick={() => auth.signOut()}>Logout</div>
                        </div>
                        </>

                    )

                }
            </nav>
        </>
    )
}

export default Navbar;