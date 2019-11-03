// 邮箱后缀
const postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
// email-sug-wrapper
const promptBox = document.getElementById('email-sug-wrapper');
// 输入框
const input = document.getElementById('email-input');
// 增加一个变量，用于存储当前选中的提示Li的序号
let nowSelectTipIndex = 0;

input.focus();

inputDom = function(e) {
    e = e || window.event;
    let key = e.keyCode || e.which || e.charCode;
    // 如果按键不是上下及回车重置选中状态
    if (key !== 38 && key !== 40 && key !== 13) {
        resetChoice();
    }
    //清空promptBox下的所有li
    while (promptBox.hasChildNodes()) {
        promptBox.removeChild(promptBox.firstChild);
    }
    // 获取用户输入
    let userInput = getInput();
    // 生成提示框中的提示内容
    creatPrompt(userInput);
    // 控制email-sug-wrapper的显示/隐藏状态
    ctrlPromptDisplay(userInput);
    // 如果按键是上下及回车处理事件
    sKeyEvent();
};

function resetChoice() {
    nowSelectTipIndex = 0;
}

function getInput() {
    // 拿到input输入框的输入内容trim后返回
    return input.value.trim();
}

function creatPrompt(userInput) {
    // 生成的提示内容
    let splitInput = '';
    let preInput = '';
    let nextInput = '';

    if (userInput.indexOf('@') !== -1) {
        splitInput = userInput.split('@');
        preInput = splitInput[0];
        nextInput = splitInput[1];
    }
    userInput = userInput.replace(/@/g, '');

    postfixList.forEach(item => {
        if (nextInput && item.indexOf(nextInput) === 0) {
            let li = document.createElement('li');
            li.innerText = HtmlUtil.htmlEncode(preInput + '@' + item);
            promptBox.appendChild(li);
        } else if (nextInput === '') {
            let li = document.createElement('li');
            li.innerText = HtmlUtil.htmlEncode(userInput + '@' + item);
            promptBox.appendChild(li);
        }
    });
    if (promptBox.children) {
        promptBox.children[nowSelectTipIndex].classList.add('active');
    }
}

function ctrlPromptDisplay(userInput) {
    if (userInput === '') {
        hidePrompt();
    } else {
        showPrompt();
    }
}

function hidePrompt() {
    // 做具体隐藏提示框的操作
    promptBox.style.display = "none";
}

function showPrompt() {
    // 做具体显示提示框的操作
    promptBox.style.display = "block";
}

// 监听特殊3个键的键盘事件，这个事件可能就是inputDom的输入监听，也有可能是另外一个，请自己测试后判断
sKeyEvent = function(e) {
    e = e || window.event;
    let key = e.keyCode || e.which || e.charCode;
    if (key === 38) {
        if (nowSelectTipIndex !== 0) {
            nowSelectTipIndex--;
        } else {
            nowSelectTipIndex = promptBox.children.length - 1;
        }
    }
    if (key === 40) {
        if (nowSelectTipIndex === promptBox.children.length - 1) {
            nowSelectTipIndex = 0;
        } else {
            nowSelectTipIndex++;
        }
    }

    if (key === 13) {
        input.value = HtmlUtil.htmlDecode(promptBox.children[nowSelectTipIndex].innerText);
        hidePrompt();
    }

    if (key === 27) {
        input.select();
    }
};

promptBox.onclick = function (e) {
    let target = e.target || e.srcElement;
    if (target.nodeName.toLowerCase() === 'li') {
        input.value = HtmlUtil.htmlDecode(target.innerHTML);
        input.focus();
        hidePrompt();
    }
};

input.addEventListener('keyup', inputDom);
