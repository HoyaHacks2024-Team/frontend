import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Uni from "./uni.png";
import "./SelectCollege.css"; // Make sure you have this for styling

const SelectCollege = () => {
	const [focusedIndex, setFocusedIndex] = useState(-1); // New state for focused item index
	const [query, setQuery] = useState("");
	const [colleges] = useState([
		// Static list of colleges
		{ name: "Harvard University" },
		{ name: "Stanford University" },
		{ name: "Massachusetts Institute of Technology" },
		{ name: "University of California, Berkeley" },
	]);
	const [selectedCollege, setSelectedCollege] = useState("");
	const [isValidCollege, setIsValidCollege] = useState(false); // Track if the input is a valid college
	const [filteredColleges, setFilteredColleges] = useState([]); // State for dynamically filtered colleges
	const [showSuggestions, setShowSuggestions] = useState(false); // State to control the visibility of suggestions
	const suggestionsRef = useRef(null); // Add this line

	const handleInputChange = (e) => {
		const userInput = e.target.value;
		setQuery(userInput);

		if (userInput.length === 0) {
			setSelectedCollege(""); // Reset the selected college if input is cleared
			setIsValidCollege(false);
			setShowSuggestions(false); // Hide suggestions when input is cleared
			setFilteredColleges([]); // Clear the filtered colleges when input is cleared
		} else {
			// Check if the current input exactly matches any college names in the static list
			const isMatch = colleges.some(
				(college) => college.name.toLowerCase() === userInput.toLowerCase()
			);
			setIsValidCollege(isMatch);

			// Filter the colleges based on the query
			const filteredColleges = colleges.filter((college) =>
				college.name.toLowerCase().includes(userInput.toLowerCase())
			);

			// Update the suggestions list and filtered colleges
			setFilteredColleges(filteredColleges);
			setShowSuggestions(filteredColleges.length > 0);
		}

		setFocusedIndex(-1); // Reset focus when input changes
	};

	const handleSelectCollege = (collegeName) => {
		setSelectedCollege(collegeName);
		setQuery(collegeName); // Update the input field with the college name
		setIsValidCollege(true); // Set true as the college is selected from the suggestions
		setShowSuggestions(false); // Hide the suggestions list when a college is selected
		setFilteredColleges([]); // Clear the filtered colleges when a college is selected
	};

	const handleKeyDown = (e) => {
		if (e.key === "ArrowDown") {
			// Move focus down in the list
			setFocusedIndex((focusedIndex) =>
				Math.min(focusedIndex + 1, filteredColleges.length - 1)
			);
		} else if (e.key === "ArrowUp") {
			// Move focus up in the list
			setFocusedIndex((focusedIndex) => Math.max(focusedIndex - 1, 0));
		} else if (
			e.key === "Enter" &&
			focusedIndex >= 0 &&
			focusedIndex < filteredColleges.length
		) {
			// Select the focused item
			handleSelectCollege(filteredColleges[focusedIndex].name);
		}

		if (focusedIndex >= 0 && focusedIndex < filteredColleges.length) {
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

	const isButtonDisabled = () => {
		if (query.length === 0) {
			return true; // Disable the button if the input is empty
		} else {
			return !isValidCollege; // Disable the button if the input doesn't match a college
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
					showSuggestions && filteredColleges.length > 0
						? "no-rounded-bottom"
						: ""
				}`}
			>
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
						disabled={isButtonDisabled()} // Use the disabled function to determine button state
					>
						Go to Chatbot
					</button>
				</Link>
				{showSuggestions && filteredColleges.length > 0 && (
					<ul ref={suggestionsRef}>
						{filteredColleges.map((college, index) => (
							<li
								key={index}
								onClick={() => handleSelectCollege(college.name)}
								className={focusedIndex === index ? "focused" : ""}
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
