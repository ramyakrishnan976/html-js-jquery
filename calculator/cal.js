const display = document.getElementById('display');
const historyList = document.getElementById('history-list');

// Load history from localStorage on startup
document.addEventListener('DOMContentLoaded', loadHistory);

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const expression = display.value;
        const result = eval(expression);
        
        if (expression && result !== undefined) {
            display.value = result;
            addHistoryEntry(expression, result);
        }
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

// History Logic
function addHistoryEntry(expression, result) {
    const entry = { expression, result };
    
    // Save to LocalStorage
    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    history.unshift(entry); // Add to beginning
    localStorage.setItem('calcHistory', JSON.stringify(history));

    renderHistory();
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    historyList.innerHTML = history.map(item => `
        <li class="history-item" onclick="useHistoryValue('${item.result}')">
            ${item.expression} = 
            <span>${item.result}</span>
        </li>
    `).join('');
}

function loadHistory() {
    renderHistory();
}

function clearHistory() {
    localStorage.removeItem('calcHistory');
    renderHistory();
}

// Clicking a history item puts the result back in the display
function useHistoryValue(value) {
    display.value = value;
}