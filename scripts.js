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
