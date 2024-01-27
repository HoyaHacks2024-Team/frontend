// src/AnimatedRoutes.js
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Welcome from "./Welcome";
import SelectCollege from "./SelectCollege";
import Chatbot from "./Chatbot";
import PageTransitionWrapper from "./PageTransitionWrapper";

const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<PageTransitionWrapper location={location}>
			<Routes location={location}>
				<Route path="/" element={<Welcome />} />
				<Route path="/select-college" element={<SelectCollege />} />
				<Route path="/chatbot/:collegeId" element={<Chatbot />} />
			</Routes>
		</PageTransitionWrapper>
	);
};

export default AnimatedRoutes;
