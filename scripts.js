const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const tabList = document.getElementById('tabList');
const editor = document.getElementById('editor');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');


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
        tabList.appendChild(li);
        editor.value = e.target.result;
    };
    reader.readAsText(file);
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
    terminalOutput.innerHTML += '> ' + command + '<br>';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}