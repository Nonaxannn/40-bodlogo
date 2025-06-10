function processData(input) {
    const lines = input.trim().split('\n');
    const Q = parseInt(lines[0]);
    let sb = ''; // string buffer
    const history = []; // stack
    history.push(''); // initial state

    for (let i = 1; i <= Q; i++) {
        const parts = lines[i].split(' ');
        const type = parseInt(parts[0]);

        if (type === 1) {
            sb += parts[1];
            history.push(sb);
        } else if (type === 2) {
            const k = parseInt(parts[1]);
            sb = sb.slice(0, sb.length - k);
            history.push(sb);
        } else if (type === 3) {
            const k = parseInt(parts[1]);
            console.log(sb.charAt(k - 1));
        } else if (type === 4) {
            history.pop();
            sb = history[history.length - 1];
        }
    }
}

// Required for HackerRank-style input
process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";

process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});
