// src/Chatbot.js
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Up from "./up.svg";
import User from "./user.svg";
import Comp from "./comp.svg";

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

	const addBotResponse = (userMessage) => {
		// Simulate a bot response
		const newBotMessage = {
			text: "I'm a bot and I'm still learning. Could you repeat that?",
			sender: "bot",
		};
		// Update the messages state with both the user's message and the bot's response
		setMessages((prevMessages) => [
			...prevMessages,
			userMessage,
			newBotMessage,
		]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (input.trim()) {
			const newUserMessage = { text: input, sender: "user" };
			addBotResponse(newUserMessage);
			setInput("");
		}
	};

	return (
		<div className="bot">
			<h1>Chatbot for {collegeId}</h1>
			<div className="msg">
				{messages.map((message, index) => (
					<div
						className={message.sender === "user" ? "user-msg" : "comp-msg"}
						key={index}
					>
						<img
							src={message.sender === "user" ? User : Comp}
							alt={message.sender}
						/>
						<div className="user-text">
							<p className={message.sender}>
								{message.sender === "user" ? "You" : "Bot"}
							</p>
							<p className="subtext">{message.text}</p>
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
