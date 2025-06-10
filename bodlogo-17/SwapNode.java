
import java.io.*;
import java.util.*;

class Result {

    static class Node {
        int data;
        Node left, right;
        Node(int data) { this.data = data; }
    }

    // Build the tree from the indexes list
    private static Node buildTree(List<List<Integer>> indexes) {
        Node root = new Node(1);
        Queue<Node> queue = new LinkedList<>();
        queue.add(root);
        int i = 0;
        while (!queue.isEmpty() && i < indexes.size()) {
            Node curr = queue.poll();
            int leftIdx = indexes.get(i).get(0);
            int rightIdx = indexes.get(i).get(1);
            if (leftIdx != -1) {
                curr.left = new Node(leftIdx);
                queue.add(curr.left);
            }
            if (rightIdx != -1) {
                curr.right = new Node(rightIdx);
                queue.add(curr.right);
            }
            i++;
        }
        return root;
    }

    // Swap nodes at every depth multiple of k
    private static void swapAtDepth(Node node, int k, int depth) {
        if (node == null) return;
        if (depth % k == 0) {
            Node temp = node.left;
            node.left = node.right;
            node.right = temp;
        }
        swapAtDepth(node.left, k, depth + 1);
        swapAtDepth(node.right, k, depth + 1);
    }

    // In-order traversal
    private static void inOrder(Node node, List<Integer> result) {
        if (node == null) return;
        inOrder(node.left, result);
        result.add(node.data);
        inOrder(node.right, result);
    }

    public static List<List<Integer>> swapNodes(List<List<Integer>> indexes, List<Integer> queries) {
        Node root = buildTree(indexes);
        List<List<Integer>> output = new ArrayList<>();
        for (int k : queries) {
            swapAtDepth(root, k, 1);
            List<Integer> traversal = new ArrayList<>();
            inOrder(root, traversal);
            output.add(traversal);
        }
        return output;
    }
}

public class SwapNode {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int n = Integer.parseInt(bufferedReader.readLine().trim());

        List<List<Integer>> indexes = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            String[] indexesRowTempItems = bufferedReader.readLine().replaceAll("\\s+$", "").split(" ");

            List<Integer> indexesRowItems = new ArrayList<>();

            for (int j = 0; j < 2; j++) {
                int indexesItem = Integer.parseInt(indexesRowTempItems[j]);
                indexesRowItems.add(indexesItem);
            }

            indexes.add(indexesRowItems);
        }

        int queriesCount = Integer.parseInt(bufferedReader.readLine().trim());

        List<Integer> queries = new ArrayList<>();

        for (int i = 0; i < queriesCount; i++) {
            int queriesItem = Integer.parseInt(bufferedReader.readLine().trim());
            queries.add(queriesItem);
        }

        List<List<Integer>> result = Result.swapNodes(indexes, queries);

        for (int i = 0; i < result.size(); i++) {
            for (int j = 0; j < result.get(i).size(); j++) {
                bufferedWriter.write(String.valueOf(result.get(i).get(j)));

                if (j != result.get(i).size() - 1) {
                    bufferedWriter.write(" ");
                }
            }

            if (i != result.size() - 1) {
                bufferedWriter.write("\n");
            }
        }

        bufferedWriter.newLine();

        bufferedReader.close();
        bufferedWriter.close();
    }
}