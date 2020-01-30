import React from "react";
import "../main.css";
import { AccountController } from "./accountsLogic";
import AccountCardComp from "./accountsCards";
import SelectComp from "../selectComp";

let newAccController = new AccountController();
class AccountControllerComp extends React.Component {
	constructor(props) {
		super();
		this.state = {
			accountController: newAccController,
			totalBal: 0,
			maxBal: "N/A",
			minBal: "N/A"
		};
	}

	addAccount = e => {
		let a = this.state.accountController;
		if (this.accountName.value === "") {
			a.message = "Please enter a valid account name";
			this.setState({ accountController: a });
			return;
		}
		let checkAccount = a.checkAccountExists(this.accountName.value);
		if (checkAccount === false) {
			a.addAccount(this.accountName.value, this.accountBal.value);
		}
		this.accountName.value = "";
		this.accountBal.value = "";
		this.setState({ accountController: a });
		this.updateDisplays();
	};
	deleteAccount = key => {
		let a = this.state.accountController;
		a.removeAccount(key);
		if (a.userAccounts.length === 1) {
			this.setState({ totalBal: "", maxBal: "", minBal: "" });
			return;
		}
		this.setState({ accountController: a });
		this.updateDisplays();
	};
	operationControl = e => {
		let a = this.state.accountController;
		if (this.selectedAccount.value === "default") {
			a.message = "Please select a valid account name";
			this.setState({ accountController: a });
			return;
		}
		a.operationControl(
			this.transaction.value,
			Number(this.balanceInp.value),
			a.getAccountIndex(this.selectedAccount.value)
		);
		this.selectedAccount.value = "default";
		this.balanceInp.value = "";

		this.setState({ accountController: a });
		this.updateDisplays();
	};
	updateDisplays = e => {
		let a = this.state.accountController;
		const totalBal = a.totalBalance();
		const maxBal = a.maxBalance();
		const minBal = a.minBalance();
		this.setState({ accountController: a });
		this.setState({
			totalBal: totalBal,
			maxBal: maxBal,
			minBal: minBal
		});

		return;
	};

	render() {
		let a = this.state.accountController;
		let allCards = a.userAccounts.map(account => {
			return (
				<AccountCardComp
					key={account.key}
					account={account}
					delete={this.deleteAccount}
				/>
			);
		});

		return (
			<div className="accountControllerComp">
				<div className="card-deck">{allCards}</div>
				<h5>{this.state.accountController.message}</h5>
				<div className="container">
					{/* REPORT PANEL */}
					<div className="panel-group">
						<div className="panel report">
							<p name="total">
								Total Balance: {this.state.totalBal}
							</p>
							<p name="maxBalance">
								Maximum Balance: {this.state.maxBal}
							</p>
							<p name="minBalance">
								Minimum Balance: {this.state.minBal}
							</p>
						</div>

						{/* ACCOUNT PANEL */}
						<div className="panel">
							<h3>Your Accounts</h3>
							<div>
								<div className="form">
									Account Name:{" "}
									<input
										className="input"
										name="accountName"
										type="text"
										placeholder="Example: Checking"
										value={this.state.accountName}
										ref={input => {
											this.accountName = input;
										}}
										required
									/>
								</div>
								<div className="form">
									Opening Balance:{" "}
									<input
										className="input"
										name="accountBal"
										type="number"
										min="0"
										placeholder="0.00"
										value={this.state.accountBal}
										ref={input => {
											this.accountBal = input;
										}}
										required
									/>
								</div>
								<div>
									<input
										className="btn btn-primary btn-sm"
										type="button"
										value="Create Account"
										onClick={e => {
											this.addAccount(e);
										}}
									/>
								</div>
							</div>
						</div>
						{/* TRANSACTION PANEL */}
						<div className="panel">
							<div>
								<h3>Quick Transactions</h3>
								Select Account:
								<select
									name="selectedAccount"
									value={this.state.selectedAccount}
									ref={input => {
										this.selectedAccount = input;
									}}
									required
								>
									<option value="default">
										Select Account
									</option>
									{a.userAccounts.map(account => (
										<SelectComp
											key={account.key}
											account={account}
										/>
									))}
								</select>
								<br />
								Transactions:
								<select
									required
									name="transaction"
									ref={input => {
										this.transaction = input;
									}}
									required
								>
									<option value="deposit">Deposit</option>
									<option value="withdraw">Withdraw</option>
								</select>
								<br />
								$:
								<input
									className="input"
									name="balanceInp"
									type="number"
									min="0"
									placeholder="0.00"
									value={this.state.balanceInp}
									ref={input => {
										this.balanceInp = input;
									}}
									required
								/>
								<br />
								<input
									className="btn btn-primary btn-sm"
									type="button"
									value="Submit"
									onClick={this.operationControl}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default AccountControllerComp;
