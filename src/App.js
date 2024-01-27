// src/App.js
import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import Navbar from "./Navbar"; // Import the Navbar component
import Welcome from "./Welcome";
import SelectCollege from "./SelectCollege";
import Chatbot from "./Chatbot";
import PageTransitionWrapper from "./PageTransitionWrapper"; // Import the transition wrapper
import "./App.css";

const App = () => {
	return (
		<Router>
			<Navbar /> {/* Add the Navbar component */}
			<AnimatedRoutes />
		</Router>
	);
};

const AnimatedRoutes = () => {
	const location = useLocation(); // Get the current location object

	return (
		<PageTransitionWrapper locationKey={location.pathname}>
			<Routes location={location}>
				<Route path="/" element={<Welcome />} />
				<Route path="/select-college" element={<SelectCollege />} />
				<Route path="/chatbot/:collegeId" element={<Chatbot />} />
				{/* Add more routes if needed */}
			</Routes>
		</PageTransitionWrapper>
	);
};

export default App;
