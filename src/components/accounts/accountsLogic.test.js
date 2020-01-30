import { Account, AccountController } from "./accountsLogic.js";

const account1 = new Account(1, "checking", 5000);
const account2 = new Account(2, "savings", 25000);
test("check starting balance", () => {
	expect(account1.balance).toBe(5000);
	expect(account2.balance).toBe(25000);
});

test("check added balance", () => {
	expect(account1.deposit(10000)).toBe(15000);
	expect(account2.deposit(0)).toBe(25000);
});

test("check if withdraw is possible", () => {
	expect(account1.withdraw(5000)).toBe(10000);
	expect(account2.withdraw(5000)).toBe(20000);
	expect(account2.withdraw(20001)).toBe(false);
	expect(account2.balance).toBe(20000);
});

//  EXERCISE 130.C
const controller1 = new AccountController();

test("check create account ", () => {
	controller1.addAccount("checking", 50);
	expect(controller1.userAccounts[0].accountName).toBe("Checking");
	expect(controller1.userAccounts[0].balance).toBe(50);

	controller1.addAccount("saving", 100);
	expect(controller1.userAccounts[1].accountName).toBe("Saving");
	expect(controller1.userAccounts[1].balance).toBe(100);
});

test("check if account exits does not create it", () => {
	expect(controller1.checkAccountExists("Saving")).toBe(true);
	expect(controller1.checkAccountExists("Line Of Credict")).toBe(false);

	controller1.addAccount("line of credict", 150);
	expect(controller1.checkAccountExists("Line Of Credict")).toBe(true);
});

test("check remove account", () => {
	expect(controller1.userAccounts).toEqual([
		{ key: 1, accountName: "Checking", balance: 50 },
		{ key: 2, accountName: "Saving", balance: 100 },
		{ key: 3, accountName: "Line Of Credict", balance: 150 }
	]);
	controller1.removeAccount(1);
	expect(controller1.userAccounts).toEqual([
		{ key: 2, accountName: "Saving", balance: 100 },
		{ key: 3, accountName: "Line Of Credict", balance: 150 }
	]);
});

test("check getting account index with name", () => {
	expect(controller1.getAccountIndex("Saving")).toEqual(0);
	expect(controller1.getAccountIndex("Line Of Credict")).toEqual(1);
});

test("check control of deposit and withdraw", () => {
	controller1.operationControl("deposit", 50, 0);
	expect(controller1.userAccounts[0].balance).toEqual(150);

	controller1.operationControl("withdraw", 50, 1);
	expect(controller1.userAccounts[1].balance).toEqual(100);

	controller1.operationControl("withdraw", 101, 1);
	expect(controller1.userAccounts[1].balance).toEqual(100);
	expect(controller1.message).toBe(
		"There is not enough fund in the selected account"
	);
});

test("check total balance", () => {
	expect(controller1.userAccounts).toEqual([
		{ key: 2, accountName: "Saving", balance: 150 },
		{ key: 3, accountName: "Line Of Credict", balance: 100 }
	]);
	expect(controller1.totalBalance()).toEqual("$250");
	expect(controller1.maxBalance()).toEqual("$150 in Saving account");
	expect(controller1.minBalance()).toEqual("$100 in Line Of Credict account");
});
