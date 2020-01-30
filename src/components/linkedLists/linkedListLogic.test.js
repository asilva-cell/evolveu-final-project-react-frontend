import { ListNode, LinkedList } from "./linkedListLogic.js";

test("show", () => {
	const listNode = new ListNode("Travel", 20, null);
	expect(listNode.show()).toBe("Travel, 20");
});

test("insert, first, last, next, previous", () => {
	const linkedList = new LinkedList();
	//only one none => first=last
	linkedList.insert("A", 1);
	expect(linkedList.current.subject).toBe("A");
	expect(linkedList.head.subject).toBe("A");
	expect(linkedList.first().subject).toBe("A");
	expect(linkedList.last().subject).toBe("A");
	expect(linkedList.next().subject).toBe("A");

	//Testing adding a node (D) between 2 nodes (B and C)
	expect(linkedList.previous().subject).toBe("A");

	linkedList.insert("B", 2);
	linkedList.insert("C", 3);
	expect(linkedList.current.subject).toBe("C");
	expect(linkedList.previous().subject).toBe("B");

	linkedList.insert("D", 4);
	expect(linkedList.current.subject).toBe("D");
	expect(linkedList.current.forwardNode.subject).toBe("C");
	expect(linkedList.last().subject).toBe("C");
});
test("delete", () => {
	const linkedList = new LinkedList();
	linkedList.insert("A", 1);
	linkedList.insert("B", 2);
	linkedList.insert("C", 3);
	linkedList.insert("D", 4);

	//delete last node (D)
	expect(linkedList.current.subject).toBe("D");
	expect(linkedList.last().subject).toBe("D");
	linkedList.delete();
	expect(linkedList.current.subject).toBe("C");
	expect(linkedList.last().subject).toBe("C");

	//delete a node (B) between 2 nodes (A and C)
	expect(linkedList.previous().subject).toBe("B");
	linkedList.delete();
	expect(linkedList.current.subject).toBe("A");
	expect(linkedList.current.forwardNode.subject).toBe("C");

	//delete first node of list (A)
	expect(linkedList.first().subject).toBe("A");
	linkedList.delete();
	expect(linkedList.current.subject).toBe("C");

	//delete last node of list (C)
	linkedList.delete();
	expect(linkedList.current).toBeNull();
});
test("total", () => {
	const linkedList = new LinkedList();
	expect(linkedList.total()).toBe(0);

	linkedList.insert("A", 1);
	linkedList.insert("B", 2);
	linkedList.insert("C", 3);
	linkedList.insert("D", 4);
	expect(linkedList.total()).toBe(10);
});
