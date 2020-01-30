//  this file contain the classes to create and manade the accounts
export class Account {
	constructor(key, accountName, balance) {
		this.key = Number(key);
		this.accountName = accountName;
		this.balance = Number(balance);
	}

	deposit(amount) {
		this.balance = this.balance + amount;
		return this.balance;
	}

	withdraw(amount) {
		let withdraw = this.balance - amount;
		if (withdraw >= 0) {
			this.balance = withdraw;
			return withdraw;
		} else {
			return false;
		}
	}
}

export class AccountController {
	constructor() {
		this.message = "Please create a new account";
		this.userAccounts = [];
		this.key = 0;
	}

	capName(nameToCap) {
		return nameToCap
			.toLowerCase()
			.split(" ")
			.map(words => words.charAt(0).toUpperCase() + words.substring(1))
			.join(" ");
	}

	addAccount(accountName, balance) {
		this.key++;
		let capAccName = this.capName(accountName);
		const newAccount = new Account(this.key, capAccName, balance);
		this.userAccounts.push(newAccount);
		this.message = `${newAccount.accountName} account has been created`;
	}

	checkAccountExists(accountNameToCheck) {
		for (let accountObj of this.userAccounts) {
			if (accountObj.accountName === accountNameToCheck) {
				this.message = `${accountNameToCheck} account already exists`;
				return true;
			}
		}
		return false;
	}

	removeAccount(accountKey) {
		let accountToRemove;
		this.userAccounts.forEach(account => {
			if (account.key === accountKey) {
				accountToRemove = account;
			}
		});
		this.message = `${accountToRemove.accountName} account was deleted`;
		this.userAccounts.splice(this.userAccounts.indexOf(accountToRemove), 1);
	}

	getAccountIndex(accountName) {
		let accounObject;
		this.userAccounts.forEach(key => {
			if (key.accountName === accountName) {
				accounObject = key;
			}
		});
		return this.userAccounts.indexOf(accounObject);
	}

	operationControl(transaction, amount, accountIndex) {
		let accountName = this.userAccounts[accountIndex].accountName;
		if (transaction === "deposit") {
			this.userAccounts[accountIndex].deposit(amount);
			this.message = `$${amount} have been deposited to your ${accountName} account`;
			return this.userAccounts[accountIndex].balance;
		} else {
			let withdraw = this.userAccounts[accountIndex].withdraw(amount);
			if (withdraw === false) {
				this.message =
					"There is not enough funds in the selected account";
				return;
			} else {
				this.balance = withdraw;
				this.message = `$${amount} have been withdrawed from your ${accountName} account`;
				return this.userAccounts[accountIndex].balance;
			}
		}
	}

	totalBalance() {
		let totalBalance = this.userAccounts.reduce(
			(accumulator, user) => accumulator + user.balance,
			0
		);
		return `$${totalBalance}`;
	}

	maxBalance() {
		if (this.userAccounts.length !== 0) {
			this.userAccounts.sort(
				(account1, account2) => account2.balance - account1.balance
			);
			let maxAccount = this.userAccounts[0];
			return `$${maxAccount.balance} in ${maxAccount.accountName} account`;
		}
		return "N/A";
	}

	minBalance() {
		if (this.userAccounts.length !== 0) {
			this.userAccounts.sort(
				(account1, account2) => account1.balance - account2.balance
			);
			let minAccount = this.userAccounts[0];
			return `$${minAccount.balance} in ${minAccount.accountName} account`;
		}
		return "N/A";
	}
}


