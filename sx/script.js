document.addEventListener('DOMContentLoaded', () => {
    // 状态管理对象
    const quizState = {
        currentIndex: 0,
        progress: {
            answers: [],      // 记录每题的答题状态（true=正确，false=错误）
            currentCorrect: 0,
            currentWrong: 0
        }
    };

    // DOM元素缓存
    const DOM = {
        questionTitle: document.getElementById('question-title'),
        optionsList: document.getElementById('options'),
        explanation: document.getElementById('explanation'),
        prevBtn: document.getElementById('prev'),
        nextBtn: document.getElementById('next'),
        progress: document.getElementById('progress'),
        resetBtn: document.getElementById('reset')
    };

    // **实时渲染数学公式**
    function renderMath() {
        if (window.MathJax) {
            MathJax.typesetPromise().catch(err => console.error('MathJax 渲染错误:', err));
        }
    }

    // **初始化系统**
    function initialize() {
        loadSavedProgress();
        setupEventListeners();
        renderCurrentQuestion();
    }

    // **事件监听**
    function setupEventListeners() {
        DOM.optionsList.addEventListener('click', handleOptionClick);
        DOM.prevBtn.addEventListener('click', showPreviousQuestion);
        DOM.nextBtn.addEventListener('click', showNextQuestion);
        DOM.resetBtn.addEventListener('click', handleResetProgress);
    }

    // **加载本地存储进度**
    function loadSavedProgress() {
        const saved = localStorage.getItem('quizProgress');
        if (saved) {
            const parsed = JSON.parse(saved);
            quizState.currentIndex = parsed.currentIndex;
            quizState.progress = parsed.progress;
        }
        updateProgressDisplay(); // 确保进度条显示正确
    }

    // **保存进度到本地存储**
    function saveProgress() {
        localStorage.setItem('quizProgress', JSON.stringify({
            currentIndex: quizState.currentIndex,
            progress: quizState.progress
        }));
    }

    // **渲染当前题目**
    function renderCurrentQuestion() {
        const question = questions[quizState.currentIndex];

        // 渲染题目
        DOM.questionTitle.innerHTML = `第 ${quizState.currentIndex + 1} 题：${question.question}`;

        // 渲染选项
        DOM.optionsList.innerHTML = question.options
            .map((opt, index) => `
                <li data-index="${index}" class="${getOptionClass(index, question)}">
                    ${String.fromCharCode(65 + index)}. ${opt}
                </li>
            `).join('');

        // 显示解析
        const answered = isQuestionAnswered();
        DOM.explanation.classList.toggle('hidden', !answered);
        if (answered) showQuestionExplanation(question);

        // **实时渲染数学公式**
        renderMath();
    }

    // **获取选项样式**
    function getOptionClass(index, question) {
        const userAnswer = quizState.progress.answers[quizState.currentIndex];
        if (userAnswer === undefined) return '';
        return index === question.answer ? 'correct' : (index === userAnswer ? 'wrong' : 'disabled');
    }

    // **处理选项点击**
    function handleOptionClick(e) {
        const li = e.target.closest('li'); // 确保获取到 li 元素
        if (!li || isQuestionAnswered()) return;

        const selectedIndex = parseInt(li.dataset.index, 10);
        const question = questions[quizState.currentIndex];

        checkAnswer(question, selectedIndex);
        saveProgress();
        updateProgressDisplay();
        renderCurrentQuestion();
    }

    // **验证答案**
    function checkAnswer(question, selectedIndex) {
        const isCorrect = selectedIndex === question.answer;
        quizState.progress.answers[quizState.currentIndex] = selectedIndex;

        // 更新正确/错误计数
        quizState.progress.currentCorrect = quizState.progress.answers.filter(a => a === question.answer).length;
        quizState.progress.currentWrong = quizState.progress.answers.filter(a => a !== question.answer).length;
    }

    // **显示解析**
    function showQuestionExplanation(question) {
        const isCorrect = quizState.progress.answers[quizState.currentIndex] === question.answer;
        DOM.explanation.innerHTML = `
            <strong>${isCorrect ? '✅ 回答正确!' : '❌ 回答错误'}</strong>
            <p>${question.explanation}</p>
        `;
    }

    // **更新进度条**
    function updateProgressDisplay() {
        const total = questions.length;
        const answeredCount = quizState.progress.answers.filter(a => a !== undefined).length;
        const accuracy = answeredCount > 0 
            ? Math.round((quizState.progress.currentCorrect / answeredCount) * 100)
            : 0;

        let progressBar = DOM.progress.querySelector('.progress-bar');
        if (!progressBar) {
            DOM.progress.innerHTML = `
                进度：<span class="progress-bar"></span>
                <span id="progress-text"></span>
            `;
            progressBar = DOM.progress.querySelector('.progress-bar');
        }

        progressBar.style.width = `${(answeredCount / total) * 100}%`;
        DOM.progress.querySelector('#progress-text').textContent = `${answeredCount}/${total} 题（正确率 ${accuracy}%）`;
    }

    // **题目导航**
    function showPreviousQuestion() {
        if (quizState.currentIndex > 0) {
            quizState.currentIndex--;
            renderCurrentQuestion();
        }
    }

    function showNextQuestion() {
        if (quizState.currentIndex < questions.length - 1) {
            quizState.currentIndex++;
            renderCurrentQuestion();
        }
    }

    // **重置进度**
    function handleResetProgress() {
        if (confirm('确定要清除所有进度吗？此操作不可恢复！')) {
            localStorage.removeItem('quizProgress');
            quizState.currentIndex = 0;
            quizState.progress = { answers: [], currentCorrect: 0, currentWrong: 0 };

            updateProgressDisplay();
            renderCurrentQuestion();
        }
    }

    // **检查题目是否已回答**
    function isQuestionAnswered() {
        return quizState.progress.answers[quizState.currentIndex] !== undefined;
    }

    // **初始化**
    initialize();
});