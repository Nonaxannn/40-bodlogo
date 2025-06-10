
import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

public class AbsolutePermutation {
    public static List<Integer> absolutePermutation(int n, int k) {
        List<Integer> result = new ArrayList<Integer>();
        if (k == 0) {
            for (int i = 1; i <= n; i++) result.add(i);
            return result;
        }
        if (n % (2 * k) != 0) {
            result.add(-1);
            return result;
        }
        boolean add = true;
        for (int i = 1; i <= n; i++) {
            if (add) result.add(i + k);
            else result.add(i - k);
            if (i % k == 0) add = !add;
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        for (int test = 0; test < t; test++) {
            int n = sc.nextInt();
            int k = sc.nextInt();
            List<Integer> res = absolutePermutation(n, k);
            if (res.size() == 1 && res.get(0) == -1) {
                System.out.println(-1);
            } else {
                for (int i = 0; i < res.size(); i++) {
                    System.out.print(res.get(i));
                    if (i < res.size() - 1) System.out.print(" ");
                }
                System.out.println();
            }
        }
        sc.close();
    }
}