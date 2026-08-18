// ==========================
// おみくじ
// ==========================

const fortunes = [
    {
        name: "大吉",
        color: "赤",
        item: "新しい靴"
    },
    {
        name: "中吉",
        color: "青",
        item: "お気に入りの音楽"
    },
    {
        name: "小吉",
        color: "黄色",
        item: "時計"
    },
    {
        name: "吉",
        color: "緑",
        item: "飲み物"
    },
    {
        name: "末吉",
        color: "紫",
        item: "本"
    },
    {
        name: "凶",
        color: "白",
        item: "ハンカチ"
    }
];

const fortuneButton = document.getElementById("fortuneButton");
const fortuneBox = document.getElementById("fortuneBox");
const fortuneText = document.getElementById("fortuneText");
const fortuneInfo = document.getElementById("fortuneInfo");

fortuneButton.addEventListener("click", drawFortune);

function drawFortune() {

    fortuneButton.disabled = true;
    fortuneButton.style.opacity = "0.5";

    fortuneBox.classList.remove("result-animation");
    fortuneBox.classList.add("shaking");

    fortuneText.textContent = "？？？";

    fortuneInfo.innerHTML = `
        <p>ラッキーカラー：---</p>
        <p>ラッキーアイテム：---</p>
    `;

    // 数回表示を変えて演出
    let count = 0;

    const animation = setInterval(() => {

        const randomIndex =
            Math.floor(Math.random() * fortunes.length);

        fortuneText.textContent =
            fortunes[randomIndex].name;

        count++;

        if (count >= 12) {
            clearInterval(animation);
            finishFortune();
        }

    }, 100);

    function finishFortune() {

        const randomIndex =
            Math.floor(Math.random() * fortunes.length);

        const result = fortunes[randomIndex];

        fortuneBox.classList.remove("shaking");
        fortuneBox.classList.add("result-animation");

        fortuneText.textContent = result.name;

        fortuneInfo.innerHTML = `
            <p>ラッキーカラー：${result.color}</p>
            <p>ラッキーアイテム：${result.item}</p>
        `;

        fortuneButton.disabled = false;
        fortuneButton.style.opacity = "1";
    }
}


// ==========================
// じゃんけん
// ==========================

const handButtons =
    document.querySelectorAll(".hand-button");

const playerHand =
    document.getElementById("playerHand");

const cpuHand =
    document.getElementById("cpuHand");

const resultText =
    document.getElementById("result");

const jankenMessage =
    document.getElementById("jankenMessage");

const winCount =
    document.getElementById("winCount");

const loseCount =
    document.getElementById("loseCount");

const drawCount =
    document.getElementById("drawCount");

const winRate =
    document.getElementById("winRate");

const resetButton =
    document.getElementById("resetButton");


// 成績
let wins = 0;
let loses = 0;
let draws = 0;


// 手の絵文字
const handIcons = {
    "グー": "✊",
    "チョキ": "✌️",
    "パー": "✋"
};


// ボタンイベント
handButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedHand =
            button.dataset.hand;

        playJanken(selectedHand);
    });
});


// じゃんけん本体
function playJanken(selectedHand) {

    // 連打防止
    setButtonsDisabled(true);

    // 初期化
    resultText.textContent = "じゃんけん……";
    resultText.className = "result";

    playerHand.textContent =
        handIcons[selectedHand];

    cpuHand.textContent = "❓";

    jankenMessage.textContent =
        "CPUが手を考えています……";


    // プレイヤー側のアニメーション
    playerHand.classList.remove("active");

    void playerHand.offsetWidth;

    playerHand.classList.add("active");


    // CPUの手を遅れて表示
    setTimeout(() => {

        cpuHand.textContent = "✊";

        setTimeout(() => {

            cpuHand.textContent = "✌️";

            setTimeout(() => {

                cpuHand.textContent = "✋";

                setTimeout(() => {

                    finishJanken(selectedHand);

                }, 400);

            }, 400);

        }, 400);

    }, 400);
}


// 勝敗判定
function finishJanken(player) {

    const hands = [
        "グー",
        "チョキ",
        "パー"
    ];

    const cpu =
        hands[Math.floor(Math.random() * hands.length)];

    cpuHand.textContent =
        handIcons[cpu];

    cpuHand.classList.remove("active");

    void cpuHand.offsetWidth;

    cpuHand.classList.add("active");


    let result;

    if (player === cpu) {

        result = "draws";
        draws++;

    } else if (
        (player === "グー" && cpu === "チョキ") ||
        (player === "チョキ" && cpu === "パー") ||
        (player === "パー" && cpu === "グー")
    ) {

        result = "wins";
        wins++;

    } else {

        result = "loses";
        loses++;
    }


    // 結果表示
    if (result === "wins") {

        resultText.textContent =
            "あなたの勝ち！";

        resultText.classList.add("win");

        jankenMessage.textContent =
            "おめでとうございます！";

    } else if (result === "loses") {

        resultText.textContent =
            "あなたの負け……";

        resultText.classList.add("lose");

        jankenMessage.textContent =
            "次は勝てるかも！";

    } else {

        resultText.textContent =
            "あいこ！";

        resultText.classList.add("draw");

        jankenMessage.textContent =
            "もう一度挑戦しましょう！";
    }


    updateStats();

    setButtonsDisabled(false);
}


// 成績更新
function updateStats() {

    winCount.textContent = wins;
    loseCount.textContent = loses;
    drawCount.textContent = draws;

    const totalGames =
        wins + loses + draws;

    if (totalGames === 0) {

        winRate.textContent = "0%";

    } else {

        const rate =
            (wins / totalGames) * 100;

        winRate.textContent =
            `${rate.toFixed(1)}%`;
    }
}


// ボタンの有効・無効
function setButtonsDisabled(disabled) {

    handButtons.forEach(button => {
        button.disabled = disabled;
        button.style.opacity =
            disabled ? "0.5" : "1";
    });
}


// 成績リセット
resetButton.addEventListener("click", () => {

    wins = 0;
    loses = 0;
    draws = 0;

    updateStats();

    playerHand.textContent = "？";
    cpuHand.textContent = "？";

    resultText.textContent =
        "結果がここに表示されます";

    resultText.className = "result";

    jankenMessage.textContent =
        "好きな手を選んでください";
});
