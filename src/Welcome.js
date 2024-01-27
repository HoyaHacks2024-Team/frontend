// src/Welcome.js
import React from "react";
import { Link } from "react-router-dom";
import picture from "./student.png";

const Welcome = () => (
	<div className="welcomeDiv">
		<h1>Welcome to the College Chatbot</h1>
		<img src={picture} alt="Logo" />
		<Link to="/select-college">
			<button>Explore Colleges</button>
		</Link>
	</div>
);

export default Welcome;
