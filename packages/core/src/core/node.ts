/**
 * Basic class which implements some basic function for node.
 */
export class Node {
  parent?: Node;

  children: Node[] = [];

  id: string;

  constructor(id: string) {
    this.id = id;
  }

  /**
   * Add list of nodes to the children
   * @param nodes
   */
  addChildren(nodes: Node[]) {
    for (const node of nodes) {
      if (this.containsChildren(node)) {
        throw new Error(
          `node ${node.id} already appears in the ${this.id}'s children`
        );
      }
      node.parent = this;
      this.children.push(node);
    }
  }

  /**
   * Remove list of nodes from children.
   * Will throw error if not found
   * @param nodes
   */
  removeChildren(nodes: Node[]) {
    for (const node of nodes) {
      const index = this.children.findIndex((c) => c.id === node.id);
      if (index < 0) {
        throw new Error(`Cannot find node with id ${node.id} in the children`);
      }
      this.children.splice(index, 1);
      node.parent = undefined;
    }
  }

  /**
   * Return true if there is no parent of this node
   */
  isHead(): boolean {
    return this.parent === undefined;
  }

  /**
   * Return true if there is no node in the children
   */
  isTail(): boolean {
    return this.children.length === 0;
  }

  /**
   * Whether node is in the children
   * @param node
   * @return {boolean} true if exists
   */
  containsChildren(node: Node) {
    return this.children.find((c) => c.id === node.id);
  }

  /**
   * Return whether node is the same node as the parent
   * @param node
   * @return {boolean} true if node is the parent node. Will return false if parent is empty
   */
  isParent(node: Node) {
    return node.parent?.id === this.id;
  }

  isChild(node: Node) {
    return node.containsChildren(this);
  }
}
