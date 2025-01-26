import "../styles/home.css";
import { app } from "../../firebase.js";
import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router";

function Navbar(onUploadClick) {
	const navigate = useNavigate();
	const auth = getAuth(app);
	const [user, setUser] = useState(null);
	const [navSearch, setNavsearch] = useState(true);
	const [query, setQuery] = useState("");

	const handleQueryChange = (e) => {
		setQuery(e.target.value); //this is asynchronous
	};
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
		return () => unsubscribe();
	}, [auth]);

	const handleLogin = () => {
		console.log("clicked");
		navigate("/signin");
	};


	useEffect(() => {
		const handleScroll = () => {
		  const hero = document.getElementById("search");
		  if (hero) {
			const heroBottom = hero.getBoundingClientRect().bottom;
			if (heroBottom <= 0) {
				console.log("Visible")
				setNavsearch(false);
				
			} else {
				setNavsearch(true);
			}
		  }
		};
	
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	  }, []);

	  
	return (
		<>
			<nav className="navbar">
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "32px",
					}}
				>
					<ul className="nav-item">
						<li className="logo">
							<p>Doro</p>
						</li>
						<li className="item" id="explore">
							Explore
						</li>
						<li
							className="item"
							id="upload"
							onClick={onUploadClick}
							onKeyDown={onUploadClick}
						>
							Upload
						</li>
					</ul>
					{navSearch === false ? (
						<input
							type="text"
							className="nav-search"
							id="nav-search-bar"
							placeholder="Search Wallpapers"
							value={query}
							onChange={(e) => handleQueryChange(e)}
						/>
					) : null}
				</div>

				{user === null ? (
					<div id="sign">
						<div id="signup" className="sign">
							Sign up
						</div>
						<div
							id="login"
							className="sign"
							onClick={handleLogin}
							onKeyDown={handleLogin}
						>
							Log in
						</div>
					</div>
				) : (
					<>
						<div id="sign">
							<div className="user-profile">{user.email}</div>
							<div
								className="sign"
								id="login"
								onClick={() => auth.signOut()}
								onKeyDown={auth.signOut}
							>
								Logout
							</div>
						</div>
					</>
				)}
			</nav>
		</>
	);
}

export default Navbar;
