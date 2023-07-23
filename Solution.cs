
using System;
using System.Collections.Generic;

public class Solution
{
    private readonly Dictionary<int, List<int>> graph = new Dictionary<int, List<int>>();
    private readonly int[] VALUE_RANGE_FOR_NODES = new int[] { 0, 500 };

    public IList<int> DistanceK(TreeNode root, TreeNode target, int distanceFromTarget)
    {
        createUndirectedGraph(root);
        return findNodesAtGivenDistanceFromTarget(target.val, distanceFromTarget);
    }

    private List<int> findNodesAtGivenDistanceFromTarget(int targetNodeValue, int distanceFromTargetNode)
    {

        Queue<int> queue = new Queue<int>();
        queue.Enqueue(targetNodeValue);
        bool[] visited = new bool[VALUE_RANGE_FOR_NODES[1] + 1];
        visited[targetNodeValue] = true;

        while (queue.Count > 0 && distanceFromTargetNode > 0)
        {
            int stepsInCurrentLevel = queue.Count;

            while (stepsInCurrentLevel-- > 0)
            {
                int current = queue.Dequeue();

                foreach (int n in graph[current])
                {
                    if (!visited[n])
                    {
                        visited[n] = true;
                        queue.Enqueue(n);
                    }
                }
            }
            --distanceFromTargetNode;
        }

        return queue.ToList();
    }

    private void createUndirectedGraph(TreeNode root)
    {
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        graph.Add(root.val, new List<int>());

        while (queue.Count > 0)
        {
            TreeNode current = queue.Dequeue();

            if (current.left != null)
            {
                graph[current.val].Add(current.left.val);
                graph.Add(current.left.val, new List<int>());
                graph[current.left.val].Add(current.val);
                queue.Enqueue(current.left);
            }
            if (current.right != null)
            {
                graph[current.val].Add(current.right.val);
                graph.Add(current.right.val, new List<int>());
                graph[current.right.val].Add(current.val);
                queue.Enqueue(current.right);
            }
        }
    }
}

/*
Class TreeNode is in-built in the solution file on leetcode.com. 
When running the code on the website, do not include this class.
 */
public class TreeNode
{
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int x) { val = x; }
}
