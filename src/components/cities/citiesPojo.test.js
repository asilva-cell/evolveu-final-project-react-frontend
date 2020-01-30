import { City, Community } from "./citiesPojo";

// CLASS CITY TESTING longitude, latitude
let key = 1;
test("check show", () => {
	let newCity = new City(key, "Calgary", 51.0447, -114.0719, 1267344);
	const showStr = newCity.show();
	expect(showStr).toBe(
		"name:Calgary, latitude:51.0447, longitude:-114.0719, population:1267344"
	);
});
test("check movedIn and movedOut", () => {
	let newCity = new City(key, "Calgary", 51.0447, -114.0719, 1267344);
	expect(newCity.population).toBe(1267344);
	newCity.movedIn(1000000);
	expect(newCity.population).toBe(2267344);
	newCity.movedOut(1000000);
	expect(newCity.population).toBe(1267344);
});
test("check how big a city is", () => {
	let newCity = new City(key, "Red Deer", 52.269, -113.8116, 100418);
	let largeTown = new City(key++, "Medicine Hat", 50.0421, -110.7197, 63260);
	let town = new City(key++, "Strathmore", 51.0378, -113.4004, 13528);
	let village = new City(key++, "Flagstaff County", 52.6531, -111.8823, 639);
	let hamlet = new City(key++, "Tilt Cove", 49.88499646, -55.622830842, 6);

	expect(newCity.howBig()).toBe("City");
	expect(largeTown.howBig()).toBe("Large town");
	expect(town.howBig()).toBe("Town");
	expect(village.howBig()).toBe("Village");
	expect(hamlet.howBig()).toBe("Hamlet");
});
test("check whichSphere", () => {
	let northernCity = new City(key++, "Calgary", 51.0447, -114.0719, 1267344);
	northernCity.whichSphere();
	expect(northernCity.hemisphere).toBe("northern hemisphere");

	let southernCity = new City(
		key++,
		"Sydney",
		-33.870453,
		151.208755,
		4741874
	);
	southernCity.whichSphere();
	expect(southernCity.hemisphere).toBe("southern hemisphere");
});

//  CLASS COMMUNITY - CONTROLLER.
test("check createCity, if it exists", () => {
	let a = new Community();
	expect(a.checkCityExists(52.269, -113.8116)).toBe(false);
	a.createCity(key++, "Red Deer", 52.269, -113.8116, 100418);
	expect(a.checkCityExists(52.269, -113.8116)).toBe(true);
});
test("check totalPopulation, ", () => {
	let a = new Community();
	a.createCity(key++, "Medicine Hat", 50.0421, -110.7197, 60000);
	a.createCity(key++, "Yellowknife", 62.453972, -114.371788, 10000);
	a.createCity(key++, "Red Deer", 52.269, -113.8116, 100000);
	a.createCity(key++, "Sydney", -33.870453, 151.208755, 5000000);
	expect(a.totalPopulation()).toBe(5170000);

	// CHECK DELETE CITY

	let cityMap = a.cities.map(city => {
		return city.cityName;
	});
	expect(cityMap).toEqual([
		"Medicine Hat",
		"Yellowknife",
		"Red Deer",
		"Sydney"
	]);
	a.deleteCity(2);
	cityMap = a.cities.map(city => {
		return city.cityName;
	});
	expect(cityMap).toEqual(["Medicine Hat", "Yellowknife", "Sydney"]);

	// CHECK NORTHERN AND SOUTHERN CITIES
	expect(a.getMostNorthern()).toBe("Yellowknife");
	expect(a.getMostSouthern()).toBe("Sydney");

	// CHECK POPULATION CONTROL, MOVE IN AND OUT
	let city = a.cities[0];
	expect(city.cityName).toBe("Sydney");
	expect(city.population).toBe(5000000);
	a.populationControl(city, "moveOut", 1000000);
	expect(city.population).toBe(4000000);
	a.populationControl(city, "moveIn", 500000);
	expect(city.population).toBe(4500000);
});
test("check card are loaded given an array", () => {
	let a = new Community();
	let serverData = [
		{
			key: 1,
			cityName: "Sydney",
			latitude: 50.0421,
			longitude: -110.7197,
			population: 60000
		},
		{
			key: 2,
			cityName: "Regina",
			latitude: 62.453972,
			longitude: -114.371788,
			population: 20000
		},
		{
			key: 5,
			cityName: "Brooks",
			latitude: 52.269,
			longitude: -113.8116,
			population: 1000
		}
	];
	let cityMap = a.cities.map(city => {
		return city.cityName;
	});
	expect(cityMap).toEqual([]);

	a.loadCitiesServer(serverData);
	cityMap = a.cities.map(city => {
		return city.cityName;
	});
	expect(cityMap).toEqual(["Sydney", "Regina", "Brooks"]);
});

// // 130E PRACITCING REFERENCE

test("check referece", () => {
	let myCity = new City(key++, "Calgary", 51.0447, -114.0719, 1267344);
	let myFav = myCity;

	expect(myCity.population).toBe(1267344);
	expect(myFav.population).toBe(1267344);

	expect(myCity.population).toBe(1267344);
	myCity.movedIn(1000000);
	expect(myCity.population).toBe(2267344);
	expect(myFav.population).toBe(2267344);

	expect(myFav.population).toBe(2267344);
	myFav.movedIn(1000000);
	expect(myFav.population).toBe(3267344);
	expect(myCity.population).toBe(3267344);
});
