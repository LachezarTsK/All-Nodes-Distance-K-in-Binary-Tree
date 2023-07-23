
#include <deque>
#include <queue>
#include <vector>
#include <utility>
#include <unordered_map>
using namespace std;

/*
Struct TreeNode is in-built in the solution file on leetcode.com.
When running the code on the website, do not include this struct.
 */
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
    
    unordered_map<int, vector<int>> graph;
    const pair<int, int> VALUE_RANGE_FOR_NODES {0, 500};

public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int distanceFromTarget) {
        createUndirectedGraph(root);
        return findNodesAtGivenDistanceFromTarget(target->val, distanceFromTarget);
    }

private:
    vector<int> findNodesAtGivenDistanceFromTarget(int targetNodeValue, int distanceFromTargetNode) const {

        deque<int> queue;
        queue.push_back(targetNodeValue);
        vector<bool> visited(VALUE_RANGE_FOR_NODES.second + 1);
        visited[targetNodeValue] = true;

        while (!queue.empty() && distanceFromTargetNode > 0) {
            int stepsInCurrentLevel = queue.size();

            while (stepsInCurrentLevel-- > 0) {
                int current = queue.front();
                queue.pop_front();

                for (const auto& n : graph.at(current)) {
                    if (!visited[n]) {
                        visited[n] = true;
                        queue.push_back(n);
                    }
                }
            }
            --distanceFromTargetNode;
        }
        return vector<int>(queue.begin(), queue.end());
    }

    void createUndirectedGraph(TreeNode* root) {
        queue<TreeNode*> queue;
        queue.push(root);
        graph[root->val] = vector<int>();
        
        while (!queue.empty()) {
            TreeNode* current = queue.front();
            queue.pop();

            if (current->left != nullptr) {
                graph[current->val].push_back(current->left->val);
                graph[current->left->val].push_back(current->val);
                queue.push(current->left);
            }
            if (current->right != nullptr) {
                graph[current->val].push_back(current->right->val);
                graph[current->right->val].push_back(current->val);
                queue.push(current->right);
            }
        }
    }
};
