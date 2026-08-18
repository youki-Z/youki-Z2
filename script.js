// じゃんけん
function playJanken(playerHand) {
    const hands = ["グー", "チョキ", "パー"];

    const cpuHand =
        hands[Math.floor(Math.random() * hands.length)];

    let result;

    if (playerHand === cpuHand) {
        result = "あいこ！";
    } else if (
        (playerHand === "グー" && cpuHand === "チョキ") ||
        (playerHand === "チョキ" && cpuHand === "パー") ||
        (playerHand === "パー" && cpuHand === "グー")
    ) {
        result = "あなたの勝ち！";
    } else {
        result = "あなたの負け！";
    }

    document.getElementById("jankenResult").textContent =
        `あなた：${playerHand}　CPU：${cpuHand}　→ ${result}`;
}


// おみくじ
function drawFortune() {
    const fortunes = [
        "大吉",
        "中吉",
        "小吉",
        "吉",
        "末吉",
        "凶"
    ];

    const result =
        fortunes[Math.floor(Math.random() * fortunes.length)];

    document.getElementById("fortuneResult").textContent =
        `今日の運勢は「${result}」です！`;
}
