import React, { useContext } from "react";
import "../main.css";
import { ThemeContext } from "./themeContext";

const ThemeSetting = () => {
	const theme = useContext(ThemeContext);

	return (
		<div>
			<h3>Settings</h3>
			<div className="container">
				<label>Background Color:</label>
				<select
					className="input"
					name="backgroundColor"
					value={theme.backgroundColour}
					onChange={theme.handleBackgroundColour}
				>
					<option value="dark">Dark</option>
					<option value="light">Light</option>
				</select>
			</div>
		</div>
	);
};

export default ThemeSetting;
