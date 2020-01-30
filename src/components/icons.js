import React from "react";
import contact from "./icons/contact.svg";
import accounts from "./icons/payment.svg";
import cities from "./icons/city.svg";
import tic from "./icons/tic-tac-toe.svg";
import link from "./icons/link.svg";
import stack from "./icons/stack.svg";
import setting from "./icons/setting.svg";

class MyIcon extends React.Component {
	constructor() {
		super();
		this.icons = [
			{ key: "main", src: contact, name: "main" },
			{ key: "tic", src: tic, name: "tic" },
			{ key: "accounts", src: accounts, name: "accounts" },
			{ key: "cities", src: cities, name: "cities" },
			{ key: "link", src: link, name: "link" },
			{ key: "stack", src: stack, name: "stack" },
			{ key: "settings", src: setting, name: "settings" }
		];
	}

	render() {
		return (
			<div>
				{this.icons.map(icon => (
					<img
						className="Icons"
						src={icon.src}
						alt={icon.name}
						key={icon.key}
						onClick={this.props.onClick}
					/>
				))}
			</div>
		);
	}
}

export default MyIcon;
