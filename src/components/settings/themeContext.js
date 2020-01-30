import React, { useState } from "react";

export function ThemeContextProvider(props) {
	// const themes = {
	// 	black: "black",
	// 	blue: "light"
	// };
	let [backgroundColour, setBackgroundColour] = useState("light");

	const contextValues = {
		backgroundColour: backgroundColour,
		handleBackgroundColour: handleBackgroundColour
	};

	function handleBackgroundColour(e) {
		// setBackgroundColour(backgroundColour === "black" ? "light" : "black");
		setBackgroundColour(e.target.value);
	}

	return (
		<ThemeContext.Provider value={contextValues}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export const ThemeContext = React.createContext("black");
