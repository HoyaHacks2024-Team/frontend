// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar"; // Import the Header component
import Welcome from "./Welcome";
import SelectCollege from "./SelectCollege";
import Chatbot from "./Chatbot";
import "./App.css";

function App() {
	return (
		<Router>
			<Navbar /> {/* Add the Header component */}
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/select-college" element={<SelectCollege />} />
				<Route path="/chatbot/:collegeId" element={<Chatbot />} />
				{/* Add more routes if needed */}
			</Routes>
		</Router>
	);
}

export default App;
