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

public class BomberMan {
    public static String[] bomberMan(int n, String[] grid) {
        int R = grid.length, C = grid[0].length();
        char[][] g = new char[R][C];
        for (int i = 0; i < R; i++) g[i] = grid[i].toCharArray();

        if (n == 1) return grid;
        if (n % 2 == 0) {
            String[] full = new String[R];
            char[] row = new char[C];
            Arrays.fill(row, 'O');
            Arrays.fill(full, new String(row));
            return full;
        }

        char[][] first = detonate(g, R, C);
        if ((n - 3) % 4 == 0) {
            String[] res = new String[R];
            for (int i = 0; i < R; i++) res[i] = new String(first[i]);
            return res;
        } else {
            char[][] second = detonate(first, R, C);
            String[] res = new String[R];
            for (int i = 0; i < R; i++) res[i] = new String(second[i]);
            return res;
        }
    }

    private static char[][] detonate(char[][] grid, int R, int C) {
        char[][] result = new char[R][C];
        for (int i = 0; i < R; i++) Arrays.fill(result[i], 'O');
        int[] dr = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};
        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                if (grid[i][j] == 'O') {
                    result[i][j] = '.';
                    for (int d = 0; d < 4; d++) {
                        int ni = i + dr[d], nj = j + dc[d];
                        if (ni >= 0 && ni < R && nj >= 0 && nj < C) {
                            result[ni][nj] = '.';
                        }
                    }
                }
            }
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int R = sc.nextInt();
        int C = sc.nextInt();
        int N = sc.nextInt();
        sc.nextLine();
        String[] grid = new String[R];
        for (int i = 0; i < R; i++) grid[i] = sc.nextLine();
        String[] result = bomberMan(N, grid);
        for (String row : result) System.out.println(row);
        sc.close();
    }
}