import React, { Component } from "react";

export default class SelectComp extends Component {
	render() {
		const { key, cityName, id } = this.props.city;
		return (
			<option key={key} id={id}>
				{cityName}
			</option>
		);
	}
}
