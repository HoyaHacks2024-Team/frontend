// src/SelectCollege.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SelectCollege = () => {
	const [college, setCollege] = useState("");

	const handleSelectChange = (event) => {
		setCollege(event.target.value);
	};

	return (
		<div>
			<h1>Select a College</h1>
			<select value={college} onChange={handleSelectChange}>
				<option value="">Select your college</option>
				<option value="college1">College 1</option>
				<option value="college2">College 2</option>
				{/* Add more colleges here */}
			</select>
			<Link to={`/chatbot/${college}`}>
				<button>Go to Chatbot</button>
			</Link>
		</div>
	);
};

export default SelectCollege;
