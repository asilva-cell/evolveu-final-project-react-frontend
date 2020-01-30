import React, { Component } from "react";
import "../main.css";
import { Community } from "./citiesPojo";
import fetchFunctions from "./fetchFunc";
import CityCardComp from "./cityCards";
import SelectComp from "./selectComp";

let newCommunity = new Community();

class CityComp extends Component {
	constructor(props) {
		super();
		this.state = {
			community: newCommunity,
			changeMe: 0,
			transaction: "moveIn",
			selectedCity: "",
			populationInp: 0,
			totalPop: 0,
			mostNorth: "N/A",
			mostSouth: "N/A"
		};
	}
	componentDidMount = async () => {
		let onLoad = await fetchFunctions.getData();
		let a = this.state.community;
		a.loadCitiesServer(onLoad);
		this.lastKey = a.keyCount;
		this.setState({ community: a });
		this.updateDisplays();
	};

	createCity = e => {
		let a = this.state.community;
		let lastKey = a.keyCount;
		let newCity;
		if (this.cityName.value === "") {
			a.message = "Please enter a valid city name.";
			this.setState({ community: a });
			return;
		}
		if (this.latitude.value > 90 || this.latitude.value < -90) {
			a.message = "Please enter a valid latitude.";
			this.setState({ community: a });
			return;
		}
		if (this.longitude.value > 180 || this.longitude.value < -180) {
			a.message = "Please enter a valid longitude.";
			this.setState({ community: a });
			return;
		}
		let checkCityExists = a.checkCityExists(
			this.latitude.value,
			this.longitude.value
		);

		if (checkCityExists === false) {
			newCity = a.createCity(
				lastKey,
				this.cityName.value,
				this.latitude.value,
				this.longitude.value,
				this.population.value
			);
		}
		this.cityName.value = "";
		this.latitude.value = "";
		this.longitude.value = "";
		this.population.value = "";
		this.setState({ community: a });
		fetchFunctions.addData(newCity);
		this.updateDisplays();
	};
	deleteCity = index => {
		let cityId = this.state.community.cities[index].id;
		this.state.community.deleteCity(index);
		fetchFunctions.deleteData(cityId);
		this.updateDisplays();
	};
	populationControl = () => {
		let a = this.state.community;
		let selectOptions = this.selectedCity.options;

		if (selectOptions.length === 1) {
			a.message = "Please create a city";
			this.setState({ community: a });
			return;
		}
		if (selectOptions.selectedIndex === 0) {
			a.message = "Please select a city";
			this.setState({ community: a });
			return;
		}
		let cityId = Number(
			selectOptions[this.selectedCity.selectedIndex].getAttribute("id")
		);
		let updatedCity = a.populationControl(
			a.getCityById(cityId),
			this.typeOfMove.value,
			Number(this.populationInp.value)
		);
		if (updatedCity !== false) {
			fetchFunctions.updateData(updatedCity);
		}
		this.populationInp.value = "";
		this.setState({ community: a });
		this.updateDisplays();
	};
	updateDisplays = () => {
		let a = this.state.community;
		this.setState({
			totalPop: a.totalPopulation(),
			mostNorth: a.getMostNorthern(),
			mostSouth: a.getMostSouthern()
		});
	};

	render() {
		let a = this.state.community.cities;
		let allCards = a.map((city, index) => {
			return (
				<CityCardComp
					key={city.key}
					index={index}
					city={city}
					delete={this.deleteCity}
				/>
			);
		});

		return (
			<div className="Community">
				<div className="card-deck">{allCards}</div>
				<h5>{this.state.community.message}</h5>
				<div className="container">
					{/* REPORT PANEL */}
					<div className="panel report">
						<p name="total">
							Total Population: {this.state.totalPop}
						</p>
						<p name="maxBalance">
							Most Northern City: {this.state.mostNorth}
						</p>
						<p name="minBalance">
							Most Sourthern City: {this.state.mostSouth}
						</p>
					</div>

					{/* CREATE CITY PANEL */}

					<div className="panel">
						<h3>Your Cities</h3>
						<div className="form">
							<label>City Name:</label>
							<input
								className="input"
								name="cityName"
								type="text"
								placeholder="Example: Calgary"
								ref={input => {
									this.cityName = input;
								}}
								required
							/>
							<br />
							<label>Population:</label>
							<input
								className="input"
								name="population"
								type="number"
								min="0"
								placeholder="0"
								ref={input => {
									this.population = input;
								}}
								required
							/>
							<br />
							<label>Latitude:</label>
							<input
								className="input"
								name="latitude"
								type="number"
								placeholder="+/- 00.000000"
								ref={input => {
									this.latitude = input;
								}}
								required
							/>
							<br />
							<label>Longitude:</label>
							<input
								className="input"
								name="longitude"
								type="number"
								placeholder="+/- 00.000000"
								ref={input => {
									this.longitude = input;
								}}
								required
							/>
						</div>

						<button
							type="button"
							className="btn btn-primary btn-sm"
							onClick={e => {
								this.createCity(e);
							}}
						>
							Create City
						</button>
					</div>

					{/* TRASACTIONS PANEL */}
					<div className="panel">
						<h2>City Updates</h2>
						<div className="form">
							<div>
								<label>City:</label>
								<select
									className="input"
									name="selectedCity"
									ref={input => {
										this.selectedCity = input;
									}}
								>
									<option value="default">
										Select City{" "}
									</option>
									{a.map((city, index) => (
										<SelectComp
											key={city.key}
											index={index}
											city={city}
										/>
									))}
								</select>
							</div>
							<div>
								<label>Type of Move:</label>
								<select
									className="input"
									name="transaction"
									ref={input => {
										this.typeOfMove = input;
									}}
								>
									<option value="moveIn">Moving In</option>
									<option value="moveOut">Moving Out</option>
								</select>
							</div>
							<div>
								<label>People Moving:</label>
								<input
									className="input"
									name="populationInp"
									type="number"
									min="0"
									placeholder="0"
									ref={input => {
										this.populationInp = input;
									}}
								/>
							</div>
							<button
								type="button"
								className="btn btn-primary btn-sm"
								onClick={this.populationControl}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default CityComp;
