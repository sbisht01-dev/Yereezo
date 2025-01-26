import "../styles/home.css";
import { app } from "../../firebase.js";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import useAuthStore from "../authstore.js";

function Navbar() {
	const navigate = useNavigate();
	const auth = getAuth(app);
	// const [user, setUser] = useState(null);
	const [navSearch, setNavsearch] = useState(true);
	const [query, setQuery] = useState("");
	const user = useAuthStore((state) => state.user);
	const setUploadBox = useAuthStore.getState().setUploadBox;

	const handleQueryChange = (e) => {
		setQuery(e.target.value); //this is asynchronous
	};

	const handleLogin = () => {
		navigate("/signin");
	};

	useEffect(() => {
		const handleScroll = () => {
			const hero = document.getElementById("search");
			if (hero) {
				const heroBottom = hero.getBoundingClientRect().bottom;
				if (heroBottom <= 0) {
					console.log("Visible");
					setNavsearch(false);
				} else {
					setNavsearch(true);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleUpload = () => {
		if (user) {
			setUploadBox(true);
		} else {
			setUploadBox(false);
			navigate("/signin");
		}
	};

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
							onClick={handleUpload}
							onKeyDown={handleUpload}
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
