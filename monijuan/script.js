document.addEventListener('DOMContentLoaded', () => {
  const quizState = { currentIndex: 0, userAnswers: [] };
  let examSubmitted = false;
  let remainingTime = 120 * 60;
  
  const DOM = {
    questionTitle: document.getElementById('question-title'),
    optionsList: document.getElementById('options'),
    explanation: document.getElementById('explanation'),
    prevBtn: document.getElementById('prev'),
    nextBtn: document.getElementById('next'),
    submitBtn: document.getElementById('submit-answer'),
    countdownTimer: document.getElementById('countdown-timer'),
  };

  function renderCurrentQuestion() {
    const question = questions[quizState.currentIndex];
    DOM.questionTitle.innerHTML = `第${quizState.currentIndex + 1}题：${question.question}`;
    DOM.optionsList.innerHTML = "";
    
    const fragment = document.createDocumentFragment();
    question.options.forEach((option, index) => {
      const li = document.createElement('li');
      li.textContent = `${String.fromCharCode(65 + index)}. ${option}`;

      if (examSubmitted) {
        if (index === question.answer) li.classList.add('correct');
        else if (quizState.userAnswers[quizState.currentIndex] === index) li.classList.add('wrong');
      } else {
        if (quizState.userAnswers[quizState.currentIndex] === index) li.classList.add('selected');
        li.addEventListener('click', () => {
          quizState.userAnswers[quizState.currentIndex] = index;
          renderCurrentQuestion();
        });
      }
      fragment.appendChild(li);
    });
    DOM.optionsList.appendChild(fragment);

    if (examSubmitted) {
      showQuestionExplanation(question);
    } else {
      DOM.explanation.classList.add('hidden');
      DOM.explanation.innerHTML = "";
    }

    MathJax.typesetPromise();

    DOM.prevBtn.classList.toggle('hidden', quizState.currentIndex === 0);
    DOM.nextBtn.classList.toggle('hidden', quizState.currentIndex === questions.length - 1);
  }

  function showQuestionExplanation(question) {
    const isCorrect = quizState.userAnswers[quizState.currentIndex] === question.answer;
    DOM.explanation.classList.remove('hidden');
    DOM.explanation.innerHTML = `<strong>${isCorrect ? '✅ 回答正确!' : '❌ 回答错误'}</strong>
      <p>${question.explanation}</p>`;
    MathJax.typesetPromise();
  }

  function submitExam() {
    if (examSubmitted) return;
    const unanswered = questions.some((_, idx) => quizState.userAnswers[idx] === undefined);
    if (unanswered && !confirm("还有题目未作答，是否确认提交？")) return;

    examSubmitted = true;
    const score = questions.reduce((acc, q, idx) => acc + (quizState.userAnswers[idx] === q.answer ? 5 : 0), 0);
    alert(`考试结束，得分：${score}分，共${questions.length}题。`);
    renderCurrentQuestion();
  }

  DOM.prevBtn.addEventListener('click', () => {
    if (quizState.currentIndex > 0) {
      quizState.currentIndex--;
      renderCurrentQuestion();
    }
  });

  DOM.nextBtn.addEventListener('click', () => {
    if (quizState.currentIndex < questions.length - 1) {
      quizState.currentIndex++;
      renderCurrentQuestion();
    }
  });

  DOM.submitBtn.addEventListener('click', submitExam);

  function updateCountdown() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    DOM.countdownTimer.textContent = `倒计时：${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      alert("考试时间结束！");
      submitExam();
    }
    remainingTime--;
  }
  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  document.getElementById('simulate-test').addEventListener('click', () => {
    document.getElementById('exitModal').classList.remove('hidden');
  });

  document.getElementById('confirm-exit').addEventListener('click', () => {
    window.location.href = '';
  });

  document.getElementById('cancel-exit').addEventListener('click', () => {
    document.getElementById('exitModal').classList.add('hidden');
  });

  renderCurrentQuestion();
});