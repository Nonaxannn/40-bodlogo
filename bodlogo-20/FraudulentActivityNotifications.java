
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

public class FraudulentActivityNotifications {
    public static int activityNotifications(int[] expenditure, int d) {
        int n = expenditure.length;
        int[] count = new int[201];
        int notifications = 0;

        // Initialize counting array
        for (int i = 0; i < d; i++) {
            count[expenditure[i]]++;
        }

        for (int i = d; i < n; i++) {
            double median = getMedian(count, d);
            if (expenditure[i] >= 2 * median) {
                notifications++;
            }
            // Slide window
            count[expenditure[i - d]]--;
            count[expenditure[i]]++;
        }
        return notifications;
    }

    private static double getMedian(int[] count, int d) {
        int sum = 0;
        if (d % 2 == 1) {
            int m = d / 2 + 1;
            for (int i = 0; i < count.length; i++) {
                sum += count[i];
                if (sum >= m) return i;
            }
        } else {
            int m1 = d / 2, m2 = m1 + 1;
            int first = -1, second = -1;
            for (int i = 0; i < count.length; i++) {
                sum += count[i];
                if (first == -1 && sum >= m1) first = i;
                if (sum >= m2) {
                    second = i;
                    break;
                }
            }
            return (first + second) / 2.0;
        }
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int d = sc.nextInt();
        int[] expenditure = new int[n];
        for (int i = 0; i < n; i++) expenditure[i] = sc.nextInt();
        System.out.println(activityNotifications(expenditure, d));
        sc.close();
    }
}