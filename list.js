// Utility functions for shuffling and comparing arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

// Sorts options within a select element alphabetically.
function sortSelectOptionsById(selectId) {
    const selectElement = document.getElementById(selectId);
    const options = Array.from(selectElement.options);
    options.sort((a, b) => a.text.localeCompare(b.text));
    selectElement.innerHTML = '';
    options.forEach(option => selectElement.add(option));
}

// Exports the options of a select element to a text file.
function exportSelectOptionsById(selectId) {
    const selectElement = document.getElementById(selectId);
    const optionsText = Array.from(selectElement.options)
                             .map(option => `${option.value} - ${option.text}`)
                             .join('\n');
    const blob = new Blob([optionsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'selectOptions.txt';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}

// Main functionality setup
document.addEventListener('DOMContentLoaded', () => {
    sortSelectOptionsById('predefinedList');
    
    document.getElementById('exportButton').addEventListener('click', () => exportSelectOptionsById('predefinedList'));

    let lastCombination = [];

    document.getElementById('randomizeButton').addEventListener('click', () => {
        const input = document.getElementById('listInput').value.trim();
        if (input === '') {
            alert('Please enter some items in the list.');
            return;
        }
        let items = input.split('\n').filter(item => item.trim() !== '');
        let tries = 0;

        do {
            shuffleArray(items);
            tries++;
        } while (arraysEqual(lastCombination, items) && tries < 100);

        lastCombination = [...items];

        const listElement = document.getElementById('randomizedList');
        listElement.innerHTML = '';

        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Team ${Math.floor(index / 2) + 1}: ${item}${index % 2 === 1 ? ' and ' + items[index - 1] : ' has no partner'}`;
            listElement.appendChild(listItem);
        });
    });

    document.getElementById('clearListButton').addEventListener('click', () => {
        document.getElementById('listInput').value = '';
        document.getElementById('randomizedList').innerHTML = '';
        lastCombination = [];
    });

    document.getElementById('addSelectedButton').addEventListener('click', () => {
        const predefinedList = document.getElementById('predefinedList');
        const listInput = document.getElementById('listInput');
        const selectedOptions = Array.from(predefinedList.selectedOptions).map(option => option.text);

        listInput.value += (listInput.value ? '\n' : '') + selectedOptions.join('\n');
    });
});
