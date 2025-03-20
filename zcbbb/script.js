

window.retryMathJax = async () => {
    MathJax.startup.document.clear();
    MathJax.typesetClear();
    await MathJax.typesetPromise();
    console.log('公式强制重渲染完成');
};








// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 状态管理对象
    const quizState = {
        currentIndex: 0,
        progress: {
            answers: [],      // 保存每题的答题状态（true=正确，false=错误）
            currentCorrect: 0,
            currentWrong: 0
        },
        initialized: false
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

    // 初始化系统
    function initialize() {
        loadSavedProgress();
        setupEventListeners();
        renderCurrentQuestion();
        updateProgressDisplay();
        quizState.initialized = true;
    }

    // 事件监听设置
    function setupEventListeners() {
        DOM.optionsList.addEventListener('click', handleOptionClick);
        DOM.prevBtn.addEventListener('click', showPreviousQuestion);
        DOM.nextBtn.addEventListener('click', showNextQuestion);
        DOM.resetBtn.addEventListener('click', handleResetProgress);
    }

    // 加载本地进度
    function loadSavedProgress() {
        const saved = localStorage.getItem('quizProgress');
        if (saved) {
            const parsed = JSON.parse(saved);
            quizState.currentIndex = parsed.currentIndex;
            quizState.progress = parsed.progress;
        }
    }

    // 保存进度到本地存储
    function saveProgress() {
        localStorage.setItem('quizProgress', JSON.stringify({
            currentIndex: quizState.currentIndex,
            progress: quizState.progress
        }));
    }

    // 核心渲染方法
    function renderCurrentQuestion() {
        const question = questions[quizState.currentIndex];
        
        // 渲染题目
        DOM.questionTitle.textContent = `第${quizState.currentIndex + 1}题：${question.question}`;
        
        // 渲染选项
        DOM.optionsList.innerHTML = question.options
            .map((opt, index) => `
                <li data-index="${index}" class="${getOptionClass(index, question)}">
                    ${String.fromCharCode(65 + index)}. ${opt}
                </li>
            `).join('');

        // 显示/隐藏解析
        DOM.explanation.classList.toggle('hidden', !isQuestionAnswered());
        if (isQuestionAnswered()) {
            showQuestionExplanation(question);
        }
    }

    // 获取选项样式类
    function getOptionClass(index, question) {
        const isAnswered = typeof quizState.progress.answers[quizState.currentIndex] !== 'undefined';
        const isCorrectAnswer = index === question.answer;
        const userAnswer = quizState.progress.answers[quizState.currentIndex];
        
        if (!isAnswered) return '';
        if (isCorrectAnswer) return 'correct';
        if (index === userAnswer) return 'wrong';
        return 'disabled';
    }

    // 处理选项点击
    function handleOptionClick(e) {
        if (!e.target.matches('li') || isQuestionAnswered()) return;

        const selectedIndex = parseInt(e.target.dataset.index);
        const question = questions[quizState.currentIndex];
        
        checkAnswer(question, selectedIndex);
        saveProgress();
        renderCurrentQuestion();
        updateProgressDisplay();
    }

    // 答案验证逻辑
    function checkAnswer(question, selectedIndex) {
        const isCorrect = selectedIndex === question.answer;
        quizState.progress.answers[quizState.currentIndex] = isCorrect;
        
        // 更新正确/错误计数
        quizState.progress.currentCorrect = quizState.progress.answers.filter(Boolean).length;
        quizState.progress.currentWrong = quizState.progress.answers.filter(a => a === false).length;
    }

    // 显示题目解析
    function showQuestionExplanation(question) {
        const isCorrect = quizState.progress.answers[quizState.currentIndex];
        DOM.explanation.innerHTML = `
            <strong>${isCorrect ? '✅ 回答正确!' : '❌ 回答错误'}</strong>
            <p>${question.explanation}</p>
        `;
    }

    // 更新顶部进度条
    function updateProgressDisplay() {
        const total = questions.length;
        const answeredCount = quizState.progress.answers.filter(a => typeof a !== 'undefined').length;
        const accuracy = answeredCount > 0 
            ? Math.round((quizState.progress.currentCorrect / answeredCount) * 100)
            : 0;
        
        DOM.progress.innerHTML = `
            进度：<span class="progress-bar" style="width: ${(answeredCount / total) * 100}%"></span>
            ${answeredCount}/${total} 题（正确率 ${accuracy}%）
        `;
    }

    // 题目导航控制
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

    // 重置进度处理
    function handleResetProgress() {
        if (confirm('确定要清除所有进度吗？此操作不可恢复！')) {
            localStorage.removeItem('quizProgress');
            quizState.currentIndex = 0;
            quizState.progress = { answers: [], currentCorrect: 0, currentWrong: 0 };
            renderCurrentQuestion();
            updateProgressDisplay();
        }
    }

    // 辅助方法
    function isQuestionAnswered() {
        return typeof quizState.progress.answers[quizState.currentIndex] !== 'undefined';
    }

    // 启动系统
    initialize();
});


function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question-title").innerHTML = questionData.question;

    const optionsList = document.getElementById("options");
    optionsList.innerHTML = ""; // 清空选项

    questionData.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerHTML = option;
        li.onclick = () => checkAnswer(index);
        optionsList.appendChild(li);
    });

    // 重新渲染数学公式
    MathJax.typesetPromise();
}



function loadQuestion(index) {
    const questionData = questions[index];

    document.getElementById("question-title").innerHTML = questionData.question;
    
    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";
    
    questionData.options.forEach((option, i) => {
        const li = document.createElement("li");
        li.innerHTML = option;
        li.addEventListener("click", () => checkAnswer(i, questionData.answer));
        optionsElement.appendChild(li);
    });

    // 重新渲染 MathJax
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}






// 在 script.js 的 showQuestion 函数末尾添加
function showQuestion() {
    // ...原有代码...
    
    // 添加数学公式渲染
    if (window.MathJax) {
        MathJax.typesetPromise().catch(err => {
            console.log('公式渲染错误:', err);
        });
    }
}

// 在显示答案解析时同样需要触发
function showExplanation(explanation) {
    const explanationDiv = document.getElementById('explanation');
    explanationDiv.innerHTML = explanation;
    explanationDiv.classList.remove('hidden');
    
    // 触发公式渲染
    if (window.MathJax) {
        MathJax.typesetPromise([explanationDiv]).catch(err => {
            console.log('公式渲染错误:', err);
        });
    }
}



// 修改后的showQuestion函数
async function showQuestion() {
    // ...原有题目渲染逻辑...
    
    // 使用异步渲染
    await new Promise(resolve => setTimeout(resolve, 50)); // 等待DOM更新
    try {
        await MathJax.typesetPromise();
    } catch (err) {
        console.log('公式渲染重试中...', err);
        MathJax.startup.document.clear();
        MathJax.typesetClear();
        await MathJax.typesetPromise();
    }
}

// 修改题目切换事件监听
['prev', 'next'].forEach(btnId => {
    document.getElementById(btnId).addEventListener('click', async () => {
        // ...切换题目逻辑...
        await showQuestion(); // 等待渲染完成
    });
});





// 创建MutationObserver监听DOM变化
const observer = new MutationObserver(mutations => {
    mutations.forEach(async mutation => {
        if (mutation.addedNodes.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
            window.retryMathJax();
        }
    });
});

// 开始观察主要内容区域
observer.observe(document.querySelector('.question-container'), {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
});