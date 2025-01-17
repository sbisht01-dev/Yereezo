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
                // console.log(user)
            } else {
                setUser(null);
            }
        })
        return () => unsubscribe();
    }, [auth])

    const handleLogin = () => {
        console.log('clicked')
        navigate('/signin')
    }

    const searchBar = document.getElementById('search-bar');

    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0]; // Only observing one element

            if (entry.isIntersecting) {
                console.log('Element is in view!');
            } else {
                console.log('Element is out of view.');
            }
        },
        {
            root: null,
            threshold: 0.1,
        }
    );
    try {

        observer.observe(searchBar)
    } catch (error) {
        console.log(error)
    }
    document.addEventListener('DOMContentLoaded', () => {
        const searchBar = document.getElementById('search');
        console.log(searchBar); // Should not be null
    });



    return (
        <>
            <nav className="navbar">
                <div className='nav-item'>
                    <div className='logo'><p>Doro</p></div>
                    <div className='item'>Explore</div>
                    <div className='item'>Upload</div>

                </div>
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