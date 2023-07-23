
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} distanceFromTarget
 * @return {number[]}
 */
var distanceK = function (root, target, distanceFromTarget) {
    //Map<number, number[]>
    this.graph = new Map();
    this.VALUE_RANGE_FOR_NODES = [0, 500];

    createUndirectedGraph(root);
    return findNodesAtGivenDistanceFromTarget(target.val, distanceFromTarget);
};

/**
 * @param {number} targetNodeValue
 * @param {number} distanceFromTargetNode
 * @return {number[]}
 */
function findNodesAtGivenDistanceFromTarget(targetNodeValue, distanceFromTargetNode) {

    //const {Queue} = require('@datastructures-js/queue');
    //Queue<number>
    const queue = new Queue();
    queue.enqueue(targetNodeValue);
    const visited = new Array(this.VALUE_RANGE_FOR_NODES[1] + 1).fill(false);
    visited[targetNodeValue] = true;

    while (!queue.isEmpty() && distanceFromTargetNode > 0) {
        let stepsInCurrentLevel = queue.size();

        while (stepsInCurrentLevel-- > 0) {
            const current = queue.dequeue();

            for (let n of this.graph.get(current)) {
                if (!visited[n]) {
                    visited[n] = true;
                    queue.enqueue(n);
                }
            }
        }
        --distanceFromTargetNode;
    }

    return queue.toArray();
}

/**
 * @param {TreeNode} root
 * @return {void}
 */
function createUndirectedGraph(root) {
    //const {Queue} = require('@datastructures-js/queue');
    //Queue<TreeNode>
    const queue = new Queue();
    queue.enqueue(root);
    this.graph.set(root.val, new Array());

    while (!queue.isEmpty()) {
        const current = queue.dequeue();

        if (current.left !== null) {
            this.graph.get(current.val).push(current.left.val);
            this.graph.set(current.left.val, new Array());
            this.graph.get(current.left.val).push(current.val);
            queue.enqueue(current.left);
        }
        if (current.right !== null) {
            this.graph.get(current.val).push(current.right.val);
            this.graph.set(current.right.val, new Array());
            this.graph.get(current.right.val).push(current.val);
            queue.enqueue(current.right);
        }
    }
}

/*
 Function TreeNode is in-built in the solution file on leetcode.com. 
 When running the code on the website, do not include this function.
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
