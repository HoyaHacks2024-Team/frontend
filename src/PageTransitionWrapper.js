// src/PageTransitionWrapper.js
import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./PageTransitionWrapper.css"; // Create this CSS file for transition styles

const PageTransitionWrapper = ({ children, locationKey }) => {
	return (
		<SwitchTransition mode="out-in">
			<CSSTransition
				key={locationKey}
				timeout={300} // Duration of the animation
				classNames="fade" // Prefix for the CSS class names
				unmountOnExit // Unmount the component after exit
			>
				<div className="page">{children}</div>
			</CSSTransition>
		</SwitchTransition>
	);
};

export default PageTransitionWrapper;
