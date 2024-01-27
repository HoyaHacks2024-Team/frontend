// src/Chatbot.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
		<div>
			<h1>Chatbot for {collegeId}</h1>
			<div>
				{messages.map((message, index) => (
					<p key={index}>{message}</p>
				))}
			</div>
			<form onSubmit={handleSubmit}>
				<input type="text" value={input} onChange={handleInputChange} />
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default Chatbot;
