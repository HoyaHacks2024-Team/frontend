// src/SelectCollege.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Uni from "./uni.png";
import "./SelectCollege.css"; // Make sure you have this for styling

const SelectCollege = () => {
	const [query, setQuery] = useState("");
	const [colleges, setColleges] = useState([]);
	const [selectedCollege, setSelectedCollege] = useState("");
	const [isValidCollege, setIsValidCollege] = useState(false); // Track if the input is a valid college

	// Fetch colleges from the API when the query changes
	useEffect(() => {
		const fetchColleges = async () => {
			if (query.length === 0 || query === selectedCollege) {
				setColleges([]);
				return;
			}

			try {
				const response = await fetch(
					`http://universities.hipolabs.com/search?name=${query}`
				);
				const data = await response.json();
				setColleges(data);
			} catch (error) {
				console.error("Error fetching data: ", error);
				setColleges([]);
			}
		};

		const delayDebounceFn = setTimeout(() => {
			fetchColleges();
		}, 500); // Debounce the API call by 500ms

		return () => clearTimeout(delayDebounceFn); // Cleanup the effect
	}, [query, selectedCollege]);

	const handleInputChange = (e) => {
		const userInput = e.target.value;
		setQuery(userInput);

		if (userInput.length === 0) {
			setSelectedCollege(""); // Reset the selected college if input is cleared
			setIsValidCollege(false);
		} else {
			// Check if the current input matches any fetched college names
			const isMatch = colleges.some(
				(college) => college.name.toLowerCase() === userInput.toLowerCase()
			);
			setIsValidCollege(isMatch);
		}
	};

	const handleSelectCollege = (collegeName) => {
		setSelectedCollege(collegeName);
		setQuery(collegeName); // Update the input field with the college name
		setColleges([]); // Clear the suggestions
		setIsValidCollege(true); // Set true as the college is selected from the suggestions
	};

	return (
		<div className="college-div">
			<div className="college-title">
				<img src={Uni} alt="Logo" />

				<h1>Select a College</h1>
				<img src={Uni} alt="Logo" />
			</div>
			<div
				className={`search-div ${
					colleges.length > 0 ? "no-rounded-bottom" : ""
				}`}
			>
				{" "}
				{/* Dynamic class */}
				<input
					type="text"
					value={query}
					onChange={handleInputChange}
					placeholder="Type to search colleges..."
				/>
				<Link
					to={
						isValidCollege
							? `/chatbot/${encodeURIComponent(selectedCollege)}`
							: "#"
					}
				>
					<button
						className={`button ${isValidCollege ? "active" : ""}`}
						disabled={!isValidCollege}
					>
						Go to Chatbot
					</button>
				</Link>
				{colleges.length > 0 && (
					<ul>
						{colleges.map((college, index) => (
							<li key={index} onClick={() => handleSelectCollege(college.name)}>
								{college.name}
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="info-text">
				<ul>
					<li>
						Start by selecting or searching for a college to discover a wealth
						of information tailored to your interests.
					</li>
					<li>
						Our chatbot is ready to guide you through admissions, academic
						programs, campus life, and more – all personalized to make your
						college experience seamless.
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SelectCollege;
