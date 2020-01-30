import React, { useState } from "react";
import "../main.css";
import functions from "./stackFunctions";
import CardComp from "./stackCardComp";

const StackDisplay = () => {
	let [counter, setCounter] = useState(1);
	let [users, setUsers] = useState([]);
	let [cards, setCards] = useState([]);
	let [message, setMessage] = useState("Please add a new user");

	const createCard = e => {
		setCounter(counter + 1);
		users.push(counter);
		setUsers(users);
		updateCards();
	};
	const updateCards = () => {
		let allCards = users.map((user, index) => {
			return <CardComp key={index} name={user} />;
		});
		setCards(allCards);
	};
	const updateUsersArray = updatedUsers => {
		setUsers(updatedUsers);
		updateCards();
	};

	const fifo = e => {
		if (users.length === 0) return setMessage(`Please add a new user`);
		setMessage(`User ${users[0]} has been removed`);
		let updatedUsers = functions.fifo(users);
		updateUsersArray(updatedUsers);
	};
	const lifo = e => {
		if (users.length === 0) return setMessage(`Please add a new user`);
		setMessage(`User ${users[users.length - 1]} has been removed`);
		let updatedUsers = functions.lifo(users);
		updateUsersArray(updatedUsers);
	};

	return (
		<div>
			<div className="container">
				<div className="panel">
					<h3>Your Stack/Queue</h3>
					<button
						type="button"
						className="btn btn-primary btn-sm"
						onClick={createCard}
					>
						Add User
					</button>
					<button
						type="button"
						className="btn btn-primary btn-sm"
						onClick={fifo}
					>
						First In/First Out
					</button>
					<button
						type="button"
						className="btn btn-primary btn-sm"
						onClick={lifo}
					>
						Last In/First Out
					</button>
				</div>

				<div className="container">
					<h5>{message}</h5>
				</div>
				<div className="container">{cards}</div>
			</div>
		</div>
	);
};
export default StackDisplay;
