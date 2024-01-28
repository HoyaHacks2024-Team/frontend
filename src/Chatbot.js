// src/Chatbot.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Up from "./up.svg";
import User from "./user.svg";

const Chatbot = () => {
	const { collegeId } = useParams();
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");

	const handleInputChange = (event) => {
		setInput(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setMessages([...messages, input]);
		setInput("");
		// Add more complex chatbot interaction logic here
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
						<input
							type="text"
							placeholder={`Ask me anything about ${collegeId}!`}
							value={input}
							onChange={handleInputChange}
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
