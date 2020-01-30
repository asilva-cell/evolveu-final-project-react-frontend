import React from "react";

const CardComp = props => {
	return (
		<div className="card">
			<h3 className="card-header text-dark">{`User ${props.name}`}</h3>
			<div className="card-body">
				<img
					alt="users"
					style={{ width: "8rem" }}
					src={`https://robohash.org/${props.name}?set=set5`}
				/>
			</div>
		</div>
	);
};

export default CardComp;
