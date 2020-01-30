class City {
	constructor(key, cityName, latitude, longitude, population) {
		this.key = key;
		this.id = key;
		this.cityName = cityName;
		this.latitude = latitude;
		this.longitude = longitude;
		this.population = Number(population);
		this.hemisphere = "";
		this.type = "";
	}

	show() {
		let showStr = `name:${this.cityName}, latitude:${this.latitude}, longitude:${this.longitude}, population:${this.population}`;
		return showStr;
	}
	movedIn(peopleIn) {
		this.population += peopleIn;
	}
	movedOut(peopleOut) {
		this.population -= peopleOut;
	}
	howBig() {
		let population = this.population;
		switch (true) {
			case population > 100000:
				this.type = "City";
				break;
			case population > 20000:
				this.type = "Large town";
				break;
			case population > 1000:
				this.type = "Town";
				break;
			case population > 100:
				this.type = "Village";
				break;
			case population >= 1:
				this.type = "Hamlet";
				break;
			default:
				break;
		}
		return this.type;
	}
	whichSphere() {
		let latitude = this.latitude;
		if (latitude > 0) {
			return (this.hemisphere = "northern hemisphere");
		} else {
			return (this.hemisphere = "southern hemisphere");
		}
	}
}

class Community {
	constructor() {
		this.cities = [];
		this.byName = {};
		this.keyCount = 1;
		this.message = "Please enter a city";
	}
	capName(nameToCap) {
		return nameToCap
			.toLowerCase()
			.split(" ")
			.map(words => words.charAt(0).toUpperCase() + words.substring(1))
			.join(" ");
	}
	createCity(lastKey, cityName, latitude, longitude, population) {
		this.keyCount = lastKey;
		let capName = this.capName(cityName);
		const newCity = new City(
			this.keyCount++,
			capName,
			latitude,
			longitude,
			population
		);
		this.hemisphere = newCity.whichSphere();
		this.type = newCity.howBig();
		this.cities.push(newCity);
		this.byName[cityName] = newCity;
		this.message = `${cityName} has been added`;
		return newCity;
	}
	loadCitiesServer(serverData) {
		if (serverData.length !== 0) {
			serverData.map(city => {
				return this.createCity(
					city.key,
					city.cityName,
					city.latitude,
					city.longitude,
					city.population
				);
			});
			this.message = `Current cities have been loaded from the server`;
		}
		return this.cities;
	}
	checkCityExists(latitude, longitude) {
		let checkExist = false;
		if (this.cities.length >= 1) {
			this.cities.forEach(city => {
				if (
					city.latitude === latitude &&
					city.longitude === longitude
				) {
					checkExist = true;
					this.message = `${city.cityName} already exists`;
				}
			});
		}
		return checkExist;
	}
	deleteCity(cityIndex) {
		let cityName = this.cities[cityIndex].cityName;
		this.cities.splice(cityIndex, 1);
		this.message = `${cityName} has been deteled from your list`;
	}
	getCityById(id) {
		let cityToUpdate = "";
		for (let b of this.cities) {
			if (b.id === Number(id)) {
				cityToUpdate = b;
			}
		}
		return cityToUpdate;
	}
	populationControl(cityObj, change, peopleMoving) {
		if (change === "moveOut") {
			if (cityObj.population < peopleMoving) {
				this.message =
					"Population moving out must be less than current population";
				return false;
			}
			cityObj.movedOut(peopleMoving);
		} else {
			cityObj.movedIn(peopleMoving);
		}
		this.message = `${cityObj.cityName} population has been updated`;
		return cityObj;
	}
	totalPopulation() {
		let totalPopulation = this.cities.reduce(
			(accumulator, city) => accumulator + city.population,
			0
		);
		return totalPopulation;
	}
	getMostNorthern() {
		if (this.cities.length >= 1) {
			this.cities.sort((city1, city2) => city2.latitude - city1.latitude);
			return this.cities[0].cityName;
		}
		return "N/A";
	}
	getMostSouthern() {
		if (this.cities.length >= 1) {
			this.cities.sort((city1, city2) => city1.latitude - city2.latitude);
			return this.cities[0].cityName;
		}
		return "N/A";
	}
}
export { City, Community };
