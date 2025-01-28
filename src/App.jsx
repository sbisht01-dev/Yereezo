import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import useAuthStore from "./authstore";
import { app } from "../firebase.js";
import { onAuthStateChanged,getAuth } from "firebase/auth";

function App() {
  const auth = getAuth(app);
	onAuthStateChanged(auth, (user) => {
		const setUser = useAuthStore.getState().setUser;
		const clearUser = useAuthStore.getState().clearUser;

		if (user) {
			// User is signed in, set user in the global state
			setUser({
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL,
			});
			
		} else {
			// User is signed out, clear the global state
			clearUser();
		}
	});
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="signin" element={<SignIn />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
