import React, { useState } from "react";
import "../main.css";
import { LinkedList } from "./linkedListLogic";
import CardComp from "./linkCardComp";
import IconComp from "./iconComp";
import arrowDouble from "../icons/arrowDouble.svg";
import arrowSingle from "../icons/arrowSingle.svg";

const list = new LinkedList();
const icons = [
	{ key: "leftDouble", src: arrowDouble, name: "First" },
	{ key: "leftSingle", src: arrowSingle, name: "Previous" },
	{ key: "rightSingle", src: arrowSingle, name: "Next" },
	{ key: "rightDouble", src: arrowDouble, name: "Last" }
];

const ListDisplay = () => {
	let [subject, setSubject] = useState("");
	let [amount, setAmount] = useState("");
	let [counter, setCounter] = useState(0);
	let [card, setCard] = useState("");
	let [message, setMessage] = useState("List is empty");

	const capName = () => {
		let firstCap = subject
			.toLowerCase()
			.split(" ")
			.map(words => words.charAt(0).toUpperCase() + words.substring(1))
			.join(" ");
		setSubject((subject = firstCap));
	};

	const createCard = e => {
		if (subject === "" || amount === "") {
			console.log("from if");
			setMessage("Please enter a valid name/amount");
			return;
		}
		capName();
		list.insert(subject, amount);
		setCounter(counter++);
		setCard(
			(card = (
				<CardComp
					key={counter}
					node={list.current}
					onClick={deleteCard}
				/>
			))
		);
		setMessage(list.message);
		setSubject("");
		setAmount("");
	};
	const deleteCard = e => {
		list.delete();
		if (!list.current) {
			setCard("");
			return;
		}
		setCard(
			(card = (
				<CardComp
					key={counter}
					node={list.current}
					onClick={deleteCard}
				/>
			))
		);
		setMessage(list.message);
	};
	const cardController = e => {
		console.log(list.current);
		if (!list.current) return;
		if (e.target.alt === "First") {
			list.first();
		}
		if (e.target.alt === "Previous") {
			list.previous();
		}
		if (e.target.alt === "Next") {
			list.next();
		}
		if (e.target.alt === "Last") {
			list.last();
		}
		setCard(
			(card = (
				<CardComp
					key={counter}
					node={list.current}
					onClick={deleteCard}
				/>
			))
		);
	};

	return (
		<div>
			<div className="container">
				<div className="icon-group">
					<IconComp icon={icons[0]} onClick={cardController} />
					<label>First</label>
				</div>
				<div className="icon-group">
					<IconComp icon={icons[1]} onClick={cardController} />
					<label>Previous</label>
				</div>
				<div>{card}</div>
				<div className="icon-group">
					<IconComp icon={icons[2]} onClick={cardController} />
					<label>Next</label>
				</div>
				<div className="icon-group">
					<IconComp icon={icons[3]} onClick={cardController} />
					<label>Last</label>
				</div>
			</div>
			<h5>{message}</h5>

			<div className="container">
				<div className="panel">
					<h3>Your List</h3>
					<div className="form">
						<div>
							To Buy:{" "}
							<input
								className="input"
								name="subject"
								type="text"
								placeholder="Example: Apples"
								value={subject}
								onChange={e => setSubject(e.target.value)}
								required
							/>
							Amount:{" "}
							<input
								className="input"
								name="amount"
								type="number"
								min="0"
								placeholder="0.00"
								value={amount}
								onChange={e => setAmount(e.target.value)}
								required
							/>
						</div>
						<button
							type="button"
							className="btn btn-primary btn-sm"
							onClick={createCard}
						>
							Add Item
						</button>
						<p>{`Your total amount of items is ${list.total()}`}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ListDisplay;
