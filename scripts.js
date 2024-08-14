const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const tabList = document.getElementById('tabList');
const editor = document.getElementById('editor');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const themeSelect = document.getElementById('themeSelect');
const fontSizeInput = document.getElementById('fontSize');

let openFiles = {};

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const li = document.createElement('li');
        li.textContent = files[i].name;
        li.dataset.fileIndex = i;
        li.addEventListener('click', () => openFile(files[i]));
        fileList.appendChild(li);
    }
});

function openFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const li = document.createElement('li');
        li.textContent = file.name;
        li.classList.add('active');
        li.addEventListener('click', () => switchTab(file.name));
        li.addEventListener('dblclick', () => closeTab(file.name));
        tabList.appendChild(li);
        openFiles[file.name] = e.target.result;
        editor.value = e.target.result;
    };
    reader.readAsText(file);
}

function switchTab(fileName) {
    const tabs = tabList.querySelectorAll('li');
    tabs.forEach(tab => tab.classList.remove('active'));
    const activeTab = Array.from(tabs).find(tab => tab.textContent === fileName);
    if (activeTab) {
        activeTab.classList.add('active');
        editor.value = openFiles[fileName];
    }
}

function closeTab(fileName) {
    const tabs = tabList.querySelectorAll('li');
    const tabToClose = Array.from(tabs).find(tab => tab.textContent === fileName);
    if (tabToClose) {
        tabList.removeChild(tabToClose);
        delete openFiles[fileName];
        if (tabToClose.classList.contains('active') && tabs.length > 1) {
            switchTab(tabs[0].textContent);
        } else {
            editor.value = '';
        }
    }
}

terminalInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const command = terminalInput.value.trim();
        executeCommand(command);
        terminalInput.value = '';
    }
});

function executeCommand(command) {
    if (command === 'clear') {
        terminalOutput.innerHTML = '';
    } else if (command.startsWith('echo ')) {
        terminalOutput.innerHTML += command.slice(5) + '<br>';
    } else {
        terminalOutput.innerHTML += '> ' + command + '<br>';
    }
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

themeSelect.addEventListener('change', function() {
    document.body.className = themeSelect.value;
});

fontSizeInput.addEventListener('input', function() {
    editor.style.fontSize = fontSizeInput.value + 'px';
});