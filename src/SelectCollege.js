// src/SelectCollege.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SelectCollege.css"; // Make sure you have this for styling

const SelectCollege = () => {
	const [query, setQuery] = useState("");
	const [colleges, setColleges] = useState([]);
	const [selectedCollege, setSelectedCollege] = useState("");

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
		}
	};

	const handleSelectCollege = (collegeName) => {
		setSelectedCollege(collegeName);
		setQuery(collegeName); // Update the input field with the college name
		setColleges([]); // Clear the suggestions
	};

	return (
		<div className="college-div">
			<h1>Select a College</h1>
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
			{selectedCollege && (
				<Link to={`/chatbot/${encodeURIComponent(selectedCollege)}`}>
					<button>Go to Chatbot</button>
				</Link>
			)}
		</div>
	);
};

export default SelectCollege;
