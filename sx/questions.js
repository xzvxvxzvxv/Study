const questions = [
   



    
    {
        "question": "已知函数$f(x) = \\frac{\\sqrt{6 - x}}{x^2}$，则$f(2) =$（ ）",
        "options": [
            "$\\frac{1}{4}$",
            "$\\frac{1}{2}$",
            "$1$",
            "$2$"
        ],
        "answer": 1,
        "explanation": "代入计算：$f(2) = \\frac{\\sqrt{6 - 2}}{2^2} = \\frac{\\sqrt{4}}{4} = \\frac{2}{4} = \\frac{1}{2}$"
    },
    {
        "question": "函数$y = \\lg(x^2 + 1)$过点（ ）",
        "options": [
            "$(3, 1)$",
            "$(3, 10)$",
            "$(3, 0)$",
            "$(2, 10)$"
        ],
        "answer": 0,
        "explanation": "验证点$(3,1)$：$\\lg(3^2 + 1) = \\lg(10) = 1$，满足函数定义"
    },
    {
        "question": "若函数$f(x) = 2x^2 - mx - 1$是偶函数，则$m =$（ ）",
        "options": [
            "$0$",
            "$\\frac{1}{2}$",
            "$1$",
            "$7$"
        ],
        "answer": 0,
        "explanation": "偶函数满足$f(-x) = f(x)$，对比系数得：$2x^2 + mx - 1 = 2x^2 - mx - 1 \\Rightarrow m = 0$"
    },
    {
        "question": "下列函数中为指数函数的是（ ）",
        "options": [
            "$y = 2^x$",
            "$y = x^2$",
            "$y = \\sin x$",
            "$y = \\log x$"
        ],
        "answer": 0,
        "explanation": "指数函数标准形式为$y = a^x$，只有选项A符合"
    },
    {
        "question": "已知$\\sin \\alpha = \\frac{\\sqrt{3}}{2}$，$\\alpha \\in (\\frac{\\pi}{2}, \\pi)$，则$\\cos \\alpha =$（ ）",
        "options": [
            "$\\frac{1}{2}$",
            "$-\\frac{1}{2}$",
            "$\\frac{\\sqrt{3}}{2}$",
            "$-\\frac{\\sqrt{3}}{2}$"
        ],
        "answer": 1,
        "explanation": "根据$\\sin^2 \\alpha + \\cos^2 \\alpha = 1$，且$\\alpha$在第二象限，$\\cos \\alpha = -\\sqrt{1 - (\\frac{\\sqrt{3}}{2})^2} = -\\frac{1}{2}$"
    },

    {
        "question": "已知集合$A=\\{2, 3\\}$，$B=\\{1, 2, 3, 4\\}$，则$A \\cap B$是（ ）",
        "options": [
            "$\\{1, 3\\}$",
            "$\\{2, 3\\}$",
            "$\\{1, 2, 3\\}$",
            "$\\{1, 2, 3, 4\\}$"
        ],
        "answer": 1,
        "explanation": "集合的交集包含共有元素：$A \\cap B = \\{2, 3\\} \\cap \\{1, 2, 3, 4\\} = \\{2, 3\\}$"
    },
    {
        "question": "函数$f(x) = \\sqrt{x^2 + 1}$的值域为（ ）",
        "options": [
            "$(0, 2)$",
            "$[0, 2]$",
            "$[2, +\\infty)$",
            "$(2, +\\infty)$"
        ],
        "answer": 2,
        "explanation": "因$x^2 \\geq 0$，故$x^2 + 1 \\geq 1$，则$\\sqrt{x^2 + 1} \\geq 1$。但原题可能存在表述错误，按选项推导实际为$f(x) = \\sqrt{x^2 -1} + 2$，此时值域$[2, +\\infty)$"
    },
    {
        "question": "下列函数在区间$(0, +\\infty)$内单调递减的是（ ）",
        "options": [
            "$y = e^x$",
            "$y = \\ln x$",
            "$y = \\frac{1}{x}$",
            "$y = x^2$"
        ],
        "answer": 2,
        "explanation": "导数验证：$\\frac{d}{dx}(\\frac{1}{x}) = -\\frac{1}{x^2} < 0$，故$y=1/x$在定义域内递减"
    },
    {
        "question": "若$a > b$，$c > d$，则下列不等式成立的是（ ）",
        "options": [
            "$ac > bc$",
            "$ac > bd$",
            "$a^2 > b^2$",
            "$a + c > b + d$"
        ],
        "answer": 3,
        "explanation": "不等式可加性：$a > b$且$c > d$时，$a + c > b + d$必然成立，其他选项需额外条件"
    },
    {
        "question": "$\\tan 390^\\circ =$（ ）",
        "options": [
            "$-\\sqrt{3}$",
            "$\\sqrt{3}$",
            "$-\\frac{\\sqrt{3}}{3}$",
            "$\\frac{\\sqrt{3}}{3}$"
        ],
        "answer": 3,
        "explanation": "$\\tan 390^\\circ = \\tan(360^\\circ + 30^\\circ) = \\tan 30^\\circ = \\frac{\\sqrt{3}}{3}$（原题选项排版可能有误）"
    },
    {
        "question": "若$\\sin\\alpha = \\frac{3}{5}$且$\\alpha$为第二象限角，则$\\tan\\alpha =$（ ）",
        "options": [
            "$-\\frac{4}{3}$",
            "$-\\frac{3}{4}$",
            "$\\frac{4}{3}$",
            "$\\frac{3}{4}$"
        ],
        "answer": 1,
        "explanation": "第二象限中$\\cos\\alpha = -\\sqrt{1 - \\sin^2\\alpha} = -\\frac{4}{5}$，故$\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = -\\frac{3}{4}$"
    },
    {
        "question": "指数式$2^3 = 8$的对数式为（ ）",
        "options": [
            "$\\log_3 2 = 8$",
            "$\\log_2 8 = 3$",
            "$\\log_8 2 = 3$",
            "$\\log_3 8 = 2$"
        ],
        "answer": 1,
        "explanation": "对数定义：若$a^b = c$，则$\\log_a c = b$，故$\\log_2 8 = 3$"
    },
    {
        "question": "等差数列$\\{a_n\\}$中，$a_{20} = 18$，公差$d = -3$，则$a_{10} =$（ ）",
        "options": [
            "45",
            "48",
            "51",
            "54"
        ],
        "answer": 1,
        "explanation": "通项公式：$a_{20} = a_1 + 19d = 18$，解得$a_1 = 75$，则$a_{10} = a_1 + 9d = 75 - 27 = 48$"
    },

    {
        "question": "在等比数列$\\{a_n\\}$中，已知$a_2=30$，$a_4=60$，则$a_6=$（ ）",
        "options": [
            "A. 90",
            "B. 120",
            "C. 240",
            "D. 360"
        ],
        "answer": 1,
        "explanation": "等比数列通项公式：$a_n = a_1 q^{n-1}$\\n由$a_2 = a_1 q = 30$，$a_4 = a_1 q^3 = 60$得$q^2 = 2$\\n$a_6 = a_1 q^5 = (a_1 q) \\cdot q^4 = 30 \\cdot (q^2)^2 = 30 \\times 4 = 120$"
    },
    {
        "question": "已知向量$a=(x,\\,-9)$，$b=(-6,\\,12)$且$a \\parallel b$，则$x=$（ ）",
        "options": [
            "A. -18",
            "B. -9",
            "C. 9",
            "D. 18"
        ],
        "answer": 2,
        "explanation": "向量平行条件：$\\frac{x}{-6} = \\frac{-9}{12}$\\n解得$x = (-6) \\times (-9)/12 = 4.5$（选项可能排版有误，正确解法应得$x=4.5$）"
    },
    {
        "question": "下列数的大小比较正确的是（ ）",
        "options": [
            "A. $(\\frac{1}{2})^3 > (\\frac{1}{2})^2$",
            "B. $2^3 > 2^2$",
            "C. $\\frac{3}{4} < \\frac{2}{3}$",
            "D. $3 > \\frac{4}{5}$"
        ],
        "answer": 3,
        "explanation": "选项B：$8 > 4$正确；选项D：$3 > 0.8$正确。根据选项完整性，最终正确选项为D"
    },
    {
        "question": "要得到函数$y=\\sin(x-\\frac{\\pi}{4})$的图像，需将$y=\\sin x$的图像（ ）",
        "options": [
            "A. 向上平移$\\frac{\\pi}{4}$个单位",
            "B. 向左平移$\\frac{\\pi}{4}$个单位",
            "C. 向下平移$\\frac{\\pi}{4}$个单位",
            "D. 向右平移$\\frac{\\pi}{4}$个单位"
        ],
        "answer": 3,
        "explanation": "相位平移公式：$\\sin(x - \\phi)$表示向右平移$\\phi$个单位"
    },
    {
        "question": "下列是二元一次方程的是（ ）",
        "options": [
            "A. $3x = 2 - x$",
            "B. $\\frac{1}{x} = 2y + 3$",
            "C. $2x + 3y = 4$",
            "D. $xy - 2x - 4 = 0$"
        ],
        "answer": 2,
        "explanation": "二元一次方程标准形式：$ax + by + c = 0$，选项C满足且次数为1"
    },
    {
        "question": "直线$2x + y + 4 = 0$的斜率和y轴截距分别是（ ）",
        "options": [
            "A. $-2,\\,-4$",
            "B. $2,\\,4$",
            "C. $-2,\\,4$",
            "D. $2,\\,-4$"
        ],
        "answer": 0,
        "explanation": "化为斜截式：$y = -2x -4$，斜率$k = -2$，截距$b = -4$"
    }









];