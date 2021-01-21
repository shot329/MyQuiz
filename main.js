'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');//

  //c[0]が正解の答えになるように設定。
  const quizSet = shuffle([//shuffle()は配列の順番をシャッフルする。
    {q: '次の内、サーバーサイド言語は？', c: ['PHP', 'jQuery', 'css']},
    {q: 'キャメルケースとしてふさわしいものはどれ？', c: ['setData', 'set_data', 'set-data']},
    {q: '次のうち、最初にリリースされた言語は？', c: ['Python', 'Javascript', 'HTML']},
    {q: 'PHPのフレームワークではないものを選べ。', c: ['React', 'Laravel', 'Zendframework']},
    {q: '次の内、人気No.1のプログラミング言語は？', c: ['Javascript', 'HTML&CSS', 'Ruby']},
    {q: '次の内、エンジニアをアラビア語で発音した単語は？', c: ['muhandis', 'engineer', 'Ingenieur']},
  ]);

  let currentNum = 0;//quizSetの配列の番号。
  let isAnswered;//解答したかどうかの変数。
  let score = 0;//スコアの変数。

  
  //配列の順番をシャッフルするメソッド。
  function shuffle(arr) {
    for ( let i = arr.length - 1; i > 0; i--) {//配列の一番最後の数から繰り返し処理を始める。//
      const j = Math.floor(Math.random() * (i + 1));//0以上3未満の整数をランダムに生成。//
      [arr[j], arr[i]] = [arr[i], arr[j]];//分割代入。//
    }
    return arr;
  }

  //クリックした選択肢が正解かどうかの判定。
  function checkanswer(li) {
    if (isAnswered === true) {//「=== true」は省略できる。//
      return;  //isAnsweredが既にtrueだったらここで処理を終わらせる。//
    }
    isAnswered = true;

    //クリックしたli要素が、配列のcの最初の要素と一致したら正解。//
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;//正解したらscoreに１加える。
    } else {
      li.classList.add('wrong');
    }

    //disabledクラスを外し、ボタンを青くする。
    btn.classList.remove('disabled');
  }


  function setQuiz() {
    isAnswered = false;//クイズがセットされる度に、isAnsweredをfalseにする。//

    question.textContent = quizSet[currentNum].q;

    //choicesの最初の要素がある限り、choicesの最初の子要素を全部消す。choices.firstChildがnullになるまでループが回り、結果的にchoicesの子要素が全て消えてくれる。//
    //このwhile文がないと、前の問題の選択肢が残されたまま次の問題に移行してしまう。//
    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
  
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);//スプレッド演算子を使う。そうすると、新しい配列のコピーが生成される。//
    console.log(quizSet[currentNum].c);
  
    //li要素を生成する。//
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkanswer(li);
      });
      choices.appendChild(li);
    });

    //最後の問題まできたら、ボタンを「Next」ではなく、「Show Score」に変更する。//
    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();//setQuizを呼び出す。

  //「Next」ボタンを押した時の処理。
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {//disabledクラスがついていたら、次に進めないようにする。
      return;
    }
    btn.classList.add('disabled');//次の問題に移行する際に、disabledクラスをつけ、ボタンを灰色にする。

    //最後の問題まできたら、スコアを表示する。
    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');//hiddenクラスを取り除くことによって、スコア表示タブを表示させる。
    } else {
      currentNum++;//次の配列を使うための準備。
      setQuiz();
    }
  });
}
