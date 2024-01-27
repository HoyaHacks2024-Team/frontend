// src/PageTransitionWrapper.js
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./PageTransitionWrapper.css"; // You will create this file for the animation styles

const PageTransitionWrapper = ({ children, location }) => {
	return (
		<TransitionGroup>
			<CSSTransition
				key={location.key}
				timeout={10000} // Duration of the animation
				classNames="fade" // Prefix for the CSS class names
			>
				<section className="page-transition">{children}</section>
			</CSSTransition>
		</TransitionGroup>
	);
};

export default PageTransitionWrapper;
