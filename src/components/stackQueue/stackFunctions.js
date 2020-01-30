const functions = {
	fifo: list => {
		list.shift();
		return list;
	},
	lifo: list => {
		list.pop();
		return list;
	}
};
export default functions;
