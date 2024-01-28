// src/Chatbot.js
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Up from "./up.svg";
import User from "./user.svg";

const Chatbot = () => {
	const { collegeId } = useParams();
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const textareaRef = useRef(null);
	const maxHeight = 100; // Maximum height for the textarea

	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			const newHeight = Math.min(textarea.scrollHeight, maxHeight);
			textarea.style.height = `${newHeight}px`; // Set new height
		}
	}, [input]);

	const handleInputChange = (event) => {
		setInput(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (input.trim()) {
			setMessages([...messages, input]);
			setInput("");
		}
	};

	return (
		<div className="bot">
			<h1>Chatbot for {collegeId}</h1>
			<div className="msg">
				{messages.map((message, index) => (
					<div className="user-msg" key={index}>
						<img src={User} alt="User" />
						<div className="user-text">
							<p className="you">You</p>
							<p className="subtext">{message}</p>
						</div>
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit}>
				<div className="block">
					<div className="bot-input">
						<textarea
							className="textarea-class"
							ref={textareaRef}
							placeholder={`Ask me anything about ${collegeId}!`}
							value={input}
							onChange={handleInputChange}
							rows={1}
							style={{
								minHeight: "16px",
								maxHeight: `${maxHeight}px`, // Set maxHeight for the textarea
								resize: "none",
								overflowY: "auto", // Show scrollbar when content exceeds maxHeight
								padding: "10px",
								fontSize: "16px",
								width: "calc(100% - 60px)", // Adjust the width depending on your button size
							}}
						/>
						<button type="submit">
							<img src={Up} alt="Send" />
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Chatbot;
