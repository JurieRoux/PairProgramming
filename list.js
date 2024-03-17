let lastCombination = [];

document.getElementById('randomizeButton').addEventListener('click', function() {
    const input = document.getElementById('listInput').value.trim();
    if (input === '') {
        alert('Please enter some items in the list.');
        return;
    }
    document.getElementById('clearListButton').addEventListener('click', function() {
        // Clear the textarea
        document.getElementById('listInput').value = '';

        // Clear the displayed randomized list
        document.getElementById('randomizedList').innerHTML = '';
        
        // Optionally, clear the lastCombination to allow for repeating the previous combination
        lastCombination = [];
    });
    
    let items = input.split('\n').filter(item => item.trim() !== '');
    let tries = 0;

    do {
        shuffleArray(items);
        tries++;
    } while (arraysEqual(lastCombination, items.slice(0, lastCombination.length)) && tries < 100 && items.length > 1);

    lastCombination = items.slice();

    const listElement = document.getElementById('randomizedList');
    listElement.innerHTML = '';

    for (let i = 0; i < items.length; i += 2) {
        const teamMember1 = items[i];
        const teamMember2 = i + 1 < items.length ? items[i + 1] : "No partner";
        let listItem = document.createElement('li');

        if (teamMember2 === "No partner") {
            listItem.textContent = `Team ${Math.floor(i / 2) + 1}: ${teamMember1} has no partner`;
            listItem.classList.add('no-partner');
        } else {
            listItem.textContent = `Team ${Math.floor(i / 2) + 1}: ${teamMember1} and ${teamMember2}`;
        }

        listElement.appendChild(listItem);
    }
});

document.getElementById('addSelectedButton').addEventListener('click', function() {
    const predefinedList = document.getElementById('predefinedList');
    const listInput = document.getElementById('listInput');
    
    const selectedPeople = Array.from(predefinedList.options)
                                .filter(option => option.selected)
                                .map(option => option.value);
    
    selectedPeople.forEach(person => {
        if (!listInput.value.includes(person)) {
            listInput.value += (listInput.value ? '\n' : '') + person;
        }
    });
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
