// import logo from "./logo.png";
import { Link } from "react-router-dom";
import logo from "./logo.svg";

const Navbar = () => {
	return (
		<div className="nav">
			<div>
				<Link to="/">
					<img src={logo} alt="Logo" />
					<h1>College Chatbot</h1>
				</Link>{" "}
			</div>
		</div>
	);
};

export default Navbar;
