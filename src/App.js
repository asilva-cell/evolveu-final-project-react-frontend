import React from "react";
import logo from "./logo.svg";
import MyIcon from "./components/icons";
import Game from "./components/ticTacToe";
import AccountControllerComp from "./components/accounts/accountsComp";
import CityComp from "./components/cities/cityComp";
import ListDisplay from "./components/linkedLists/linkedListComp";
import StackDisplay from "./components/stackQueue/stackComp";
import ThemeSetting from "./components/settings/settingComp";
import { ThemeContext } from "../src/components/settings/themeContext";
import "./App.css";

class App extends React.Component {
	static contextType = ThemeContext;
	constructor() {
		super();
		this.icon = "";
		this.pages = {
			mainPage: (
				<div>
					<header className={"App-header"}>
						<h3>Welcome to Your React App</h3>
						<h5>Explore all tabs and have fun!</h5>
						<img src={logo} className="App-logo" alt="logo" />
						<p>
							Edit <code>src/App.js</code> and save to reload.
						</p>
						<a
							className="App-link"
							href="https://reactjs.org"
							target="_blank"
							rel="noopener noreferrer"
						>
							Learn React
						</a>
					</header>
				</div>
			),
			gamePage: (
				<div>
					<Game />
				</div>
			),
			accountPage: (
				<div className="bigContainer">
					<AccountControllerComp />
				</div>
			),
			cityPage: (
				<div className="bigContainer">
					<CityComp />
				</div>
			),
			listPage: (
				<div className="bigContainer">
					<ListDisplay />
				</div>
			),
			stackQueuePage: (
				<div className="bigContainer">
					<StackDisplay />
				</div>
			),
			settingsPage: (
				<div className="bigContainer">
					<ThemeSetting />
				</div>
			)
		};
		this.state = { page: this.pages.mainPage, theme: "dark" };
	}

	pageController = e => {
		if (e.target.alt === "main") {
			this.setState({ page: this.pages.mainPage });
		}
		if (e.target.alt === "tic") {
			this.setState({ page: this.pages.gamePage });
		}
		if (e.target.alt === "accounts") {
			this.setState({ page: this.pages.accountPage });
		}
		if (e.target.alt === "cities") {
			this.setState({ page: this.pages.cityPage });
		}
		if (e.target.alt === "link") {
			this.setState({ page: this.pages.listPage });
		}
		if (e.target.alt === "stack") {
			this.setState({ page: this.pages.stackQueuePage });
		}
		if (e.target.alt === "settings") {
			this.setState({ page: this.pages.settingsPage });
		}
	};

	render() {
		return (
			<div className={` App ${this.context.backgroundColour}`}>
				<div className="All-Icons">
					<MyIcon onClick={this.pageController} />
				</div>
				<header className="App-header">{this.state.page}</header>
			</div>
		);
	}
}

export default App;
