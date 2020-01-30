import React, { Component } from "react";

class AccountCardComp extends Component {
	render() {
		let { key, accountName, balance } = this.props.account;
		return (
			<div className="card">
				<h3 className="card-header text-dark">{accountName}</h3>
				<div className="card-body">
					<p className="card-text text-dark">${balance}</p>
				</div>
				<div className="card-footer">
					<button
						className="btn btn-primary btn-sm"
						onClick={this.props.delete.bind(this, key)}
					>
						Delete
					</button>
				</div>
			</div>
		);
	}
}

export default AccountCardComp;
