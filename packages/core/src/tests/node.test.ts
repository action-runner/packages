import { Node } from "../core/node";

describe("Given a node client", () => {
  let node: Node;
  let node2: Node;
  let node3: Node;
  let node4: Node;

  beforeEach(() => {
    node = new Node("1");
    node2 = new Node("2");
    node3 = new Node("3");
    node4 = new Node("4");
  });

  describe("When adding or removing nodes", () => {
    test("Should return no error and nodes are added", () => {
      node.addChildren([node2, node3]);
      expect(node.children.length).toBe(2);
      expect(node2.parent).toBe(node);
      expect(node3.parent).toBe(node);
    });

    test("Should return an error", () => {
      expect(() => node.addChildren([node2, node2])).toThrowError();
    });

    test("Should return no error and nodes are removed", () => {
      node.addChildren([node2, node3]);
      node.removeChildren([node2, node3]);
      expect(node.children).toHaveLength(0);
      expect(node2.parent).toBeUndefined();
      expect(node3.parent).toBeUndefined();
    });

    test("Should return an error and nodes are not removed", () => {
      node.addChildren([node2, node3]);
      expect(() => node.removeChildren([node4])).toThrowError();
      expect(node.children).toHaveLength(2);
    });
  });

  describe("When calling is tail", () => {
    test("Should return true for tails", () => {
      node.addChildren([node2, node3]);
      expect(node.isTail()).toBeFalsy();
      expect(node2.isTail()).toBeTruthy();
      expect(node3.isTail()).toBeTruthy();
    });
  });

  describe("When calling is head", () => {
    test("Should return true for head", () => {
      node.addChildren([node2, node3]);
      expect(node.isHead()).toBeTruthy();
      expect(node2.isHead()).toBeFalsy();
      expect(node3.isHead()).toBeFalsy();
    });
  });

  describe("When calling is parent", () => {
    test("Should return true", () => {
      node.addChildren([node2, node3]);
      expect(node.isParent(node2)).toBeTruthy();
      expect(node2.isParent(node)).toBeFalsy();
    });
  });

  describe("When calling is child", () => {
    test("Should return true", () => {
      node.addChildren([node2, node3]);
      expect(node2.isChild(node)).toBeTruthy();
      expect(node3.isChild(node)).toBeTruthy();
      expect(node3.isChild(node2)).toBeFalsy();
      expect(node.isChild(node)).toBeFalsy();
    });
  });
});
