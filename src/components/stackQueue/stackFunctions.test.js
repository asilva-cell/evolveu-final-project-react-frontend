import functions from "./stackFunctions.js";

test("fifo", () => {
	let list = [1, 2, 3, 4];
	functions.fifo(list);
	expect(list).toEqual([2, 3, 4]);
});

test("lifo", () => {
	let list = [1, 2, 3, 4];
	functions.lifo(list);
	expect(list).toEqual([1, 2, 3]);
});
