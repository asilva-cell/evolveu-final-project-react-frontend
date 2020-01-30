const url = "http://127.0.0.1:5000/";

const fetchFunctions = {
	async postData(url = "", data = {}) {
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json"
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrer: "no-referrer", // no-referrer, *client
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		});

		const json = await response.json(); // parses JSON response into native JavaScript objects
		json.status = response.status;
		json.statusText = response.statusText;
		return json;
	},

	async clearData() {
		return await this.postData(url + "clear");
	},

	async getData() {
		let data = await this.postData(url + "all");
		return data;
	},

	async addData(cityData) {
		let data = await this.postData(url + "add", cityData);
		return data;
	},

	async deleteData(key) {
		let data = await this.postData(url + "delete", { key: Number(key) });
		return data;
	},

	async updateData(cityObj) {
		let data = await this.postData(url + "update", cityObj);
		return data;
	}
};

export default fetchFunctions;
