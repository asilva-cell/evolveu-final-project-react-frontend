import React, { Component } from "react";
// import "./main.css";

export default class SelectComp extends Component {
	render() {
		const { key, accountName } = this.props.account;
		return (
			<option className="input" key={key}>
				{accountName}
			</option>
		);
	}
}
