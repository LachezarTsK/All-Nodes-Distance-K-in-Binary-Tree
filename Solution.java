
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Solution {

    private final Map<Integer, List<Integer>> graph = new HashMap<>();
    private static final int[] VALUE_RANGE_FOR_NODES = {0, 500};

    public List<Integer> distanceK(TreeNode root, TreeNode target, int distanceFromTarget) {
        createUndirectedGraph(root);
        return findNodesAtGivenDistanceFromTarget(target.val, distanceFromTarget);
    }

    private List<Integer> findNodesAtGivenDistanceFromTarget(int targetNodeValue, int distanceFromTargetNode) {

        Queue<Integer> queue = new LinkedList<>();
        queue.add(targetNodeValue);
        boolean[] visited = new boolean[VALUE_RANGE_FOR_NODES[1] + 1];
        visited[targetNodeValue] = true;

        while (!queue.isEmpty() && distanceFromTargetNode > 0) {
            int stepsInCurrentLevel = queue.size();

            while (stepsInCurrentLevel-- > 0) {
                int current = queue.poll();

                for (int n : graph.get(current)) {
                    if (!visited[n]) {
                        visited[n] = true;
                        queue.add(n);
                    }
                }
            }
            --distanceFromTargetNode;
        }

        return new ArrayList<>(queue);
    }

    private void createUndirectedGraph(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        graph.put(root.val, new ArrayList<>());

        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();

            if (current.left != null) {
                graph.get(current.val).add(current.left.val);
                graph.put(current.left.val, new ArrayList<>());
                graph.get(current.left.val).add(current.val);
                queue.add(current.left);
            }
            if (current.right != null) {
                graph.get(current.val).add(current.right.val);
                graph.put(current.right.val, new ArrayList<>());
                graph.get(current.right.val).add(current.val);
                queue.add(current.right);
            }
        }
    }
}

/*
Class TreeNode is in-built in the solution file on leetcode.com. 
When running the code on the website, do not include this class.
 */
class TreeNode {

    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}
