// src/SelectCollege.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Uni from "./uni.png";
import "./SelectCollege.css"; // Make sure you have this for styling

const SelectCollege = () => {
	const [focusedIndex, setFocusedIndex] = useState(-1); // New state for focused item index
	const [query, setQuery] = useState("");
	const [colleges, setColleges] = useState([]);
	const [selectedCollege, setSelectedCollege] = useState("");
	const [isValidCollege, setIsValidCollege] = useState(false); // Track if the input is a valid college
	const suggestionsRef = useRef(null); // Add this line

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

		setFocusedIndex(-1); // Reset focus when input changes
	};

	const handleSelectCollege = (collegeName) => {
		setSelectedCollege(collegeName);
		setQuery(collegeName); // Update the input field with the college name
		setColleges([]); // Clear the suggestions
		setIsValidCollege(true); // Set true as the college is selected from the suggestions
	};

	const handleKeyDown = (e) => {
		if (e.key === "ArrowDown") {
			// Move focus down in the list
			setFocusedIndex((focusedIndex) =>
				Math.min(focusedIndex + 1, colleges.length - 1)
			);
		} else if (e.key === "ArrowUp") {
			// Move focus up in the list
			setFocusedIndex((focusedIndex) => Math.max(focusedIndex - 1, 0));
		} else if (
			e.key === "Enter" &&
			focusedIndex >= 0 &&
			focusedIndex < colleges.length
		) {
			// Select the focused item
			handleSelectCollege(colleges[focusedIndex].name);
		}

		if (focusedIndex >= 0 && focusedIndex < colleges.length) {
			const focusedElement = suggestionsRef.current?.children[focusedIndex];
			if (focusedElement) {
				// Calculate the position of the focused element
				const scrollTop = suggestionsRef.current.scrollTop;
				const scrollBottom = scrollTop + suggestionsRef.current.clientHeight;
				const elementTop = focusedElement.offsetTop;
				const elementBottom = elementTop + focusedElement.clientHeight;

				// Check if the focused element is outside the current view
				if (elementTop < scrollTop || elementBottom > scrollBottom) {
					// Scroll the list to make the focused item centered
					focusedElement.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				}
			}
		}
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
					onKeyDown={handleKeyDown} // Attach the event handler
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
					<ul ref={suggestionsRef}>
						{colleges.map((college, index) => (
							<li
								key={index}
								onClick={() => handleSelectCollege(college.name)}
								className={focusedIndex === index ? "focused" : ""} // Highlight the focused item
							>
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
