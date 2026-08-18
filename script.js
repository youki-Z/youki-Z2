// ==========================
// おみくじのデータ
// ==========================

const fortunes = [

    {
        name: "大吉",
        color: "赤",
        item: "新しい靴",
        comment: "今日は何をしてもうまくいきそう！積極的に行動してみましょう。",

        videoId: "ic9wJZGjO3k",
        videoTitle: "心地よい癒しの音楽・リラックスBGM"
    },

    {
        name: "中吉",
        color: "青",
        item: "イヤホン",
        comment: "落ち着いて行動すると良い一日になりそうです。",

        videoId: "jqHTchIhZCE",
        videoTitle: "癒しBGM・作業用BGM・ストレス解消"
    },

    {
        name: "小吉",
        color: "黄色",
        item: "時計",
        comment: "小さな幸運が見つかるかもしれません。周りをよく見てみましょう。",

        videoId: "GPElJPLBAkw",
        videoTitle: "リラックス・集中・瞑想向けBGM"
    },

    {
        name: "吉",
        color: "緑",
        item: "飲み物",
        comment: "焦らず自分のペースで過ごすと良いでしょう。",

        videoId: "jqHTchIhZCE",
        videoTitle: "癒しBGM・作業用BGM・ストレス解消"
    },

    {
        name: "末吉",
        color: "紫",
        item: "本",
        comment: "今日は準備の日。無理をせず、明日に備えましょう。",

        videoId: "K8qSRnVVpks",
        videoTitle: "リラックス・瞑想向けBGM"
    },

    {
        name: "凶",
        color: "白",
        item: "ハンカチ",
        comment: "少し慎重に行動しましょう。気分転換をするのもおすすめです。",

        videoId: "K8qSRnVVpks",
        videoTitle: "リラックス・瞑想向けBGM"
    }

];


// ==========================
// HTML要素を取得
// ==========================

const fortuneButton =
    document.getElementById("fortuneButton");

const fortuneBox =
    document.getElementById("fortuneBox");

const fortuneText =
    document.getElementById("fortuneText");

const fortuneName =
    document.getElementById("fortuneName");

const luckyColor =
    document.getElementById("luckyColor");

const luckyItem =
    document.getElementById("luckyItem");

const fortuneComment =
    document.getElementById("fortuneComment");

const videoSection =
    document.getElementById("videoSection");

const youtubeVideo =
    document.getElementById("youtubeVideo");

const videoTitle =
    document.getElementById("videoTitle");


// ==========================
// おみくじボタン
// ==========================

fortuneButton.addEventListener(
    "click",
    drawFortune
);


// ==========================
// おみくじ
// ==========================

function drawFortune() {

    // ボタンを無効化
    fortuneButton.disabled = true;

    fortuneButton.style.opacity = "0.5";


    // おみくじを揺らす
    fortuneBox.classList.remove(
        "result-animation"
    );

    fortuneBox.classList.add(
        "shaking"
    );


    // 結果を一旦隠す
    fortuneText.textContent = "？？？";

    fortuneName.textContent = "---";

    luckyColor.textContent = "---";

    luckyItem.textContent = "---";

    fortuneComment.textContent =
        "運勢を占っています……";


    // 動画も一旦隠す
    videoSection.classList.add(
        "hidden"
    );


    // 結果を高速で切り替える
    let count = 0;

    const animation =
        setInterval(() => {

            const randomIndex =
                Math.floor(
                    Math.random()
                    * fortunes.length
                );

            fortuneText.textContent =
                fortunes[randomIndex].name;

            count++;


            // 1.5秒程度で終了
            if (count >= 15) {

                clearInterval(
                    animation
                );

                finishFortune();
            }

        }, 100);

}


// ==========================
// 結果を表示
// ==========================

function finishFortune() {

    // 最終結果をランダムに決める
    const randomIndex =
        Math.floor(
            Math.random()
            * fortunes.length
        );

    const result =
        fortunes[randomIndex];


    // アニメーション変更
    fortuneBox.classList.remove(
        "shaking"
    );

    fortuneBox.classList.add(
        "result-animation"
    );


    // おみくじ結果
    fortuneText.textContent =
        result.name;

    fortuneName.textContent =
        result.name;

    luckyColor.textContent =
        result.color;

    luckyItem.textContent =
        result.item;

    fortuneComment.textContent =
        result.comment;


    // 動画を設定
    youtubeVideo.src =
        `https://www.youtube.com/embed/${result.videoId}`;


    videoTitle.textContent =
        result.videoTitle;


    // 動画を表示
    videoSection.classList.remove(
        "hidden"
    );


    // ボタンを再び有効化
    fortuneButton.disabled = false;

    fortuneButton.style.opacity = "1";
}
