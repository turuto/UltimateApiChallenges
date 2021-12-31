// SELECTORS
const SELECTORS = {}
SELECTORS.ANSWER = document.querySelector('#answer');
SELECTORS.BUTTON = document.querySelector('#button');
SELECTORS.INPUT = document.querySelector('#input');
SELECTORS.BALL = document.querySelector('#ball');
SELECTORS.ERROR = document.querySelector('#error');

// API
const API_ENDPOINT = 'https://yesno.wtf/api';

let isRequestInProgress = false;

/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API ✅
 * 2. Output the API's response ✅
 * 3. Attach fetchAnswer to an event listener ✅
 * 4. Clear output after 3 seconds  ✅
 * 5. Optional: add loading/error states
 *
 */

const setRequestInProgress = function (status) {
    isRequestInProgress = status;
};

const getNewAnswer = function () {
    if (isFormFilled()) {
        fetchAnswer();
        SELECTORS.BALL.classList.add('shake__ball');
        toggleButtonState('disabled');
        const waitingToClearOut = setTimeout(() => { clearOutput(waitingToClearOut) }, 3000);
    } else {
        showError();
    }
}

const fetchAnswer = function () {
    console.log('fetching');
    setRequestInProgress(true);
    fetch(API_ENDPOINT)
        .then(response => {
            if (response.ok) {
                setRequestInProgress(false);
                return response.json();
            }
        })
        .then(data => writeAnswer(data.answer));
}

const writeAnswer = function (msg) {

    SELECTORS.ANSWER.textContent = msg;

}
const clearOutput = function (timeout) {
    console.log('clearing');
    SELECTORS.ANSWER.textContent = '';
    SELECTORS.ERROR.textContent = '';
    SELECTORS.INPUT.value = '';
    SELECTORS.BALL.classList.remove('shake__ball');
    clearTimeout(timeout);
}

const handleKeyEnter = function (e) {
    console.log('txt: ', isFormFilled(), e.keyCode);
    if (isFormFilled()) {
        toggleButtonState('enabled');
        if (e.keyCode === 13) {
            getNewAnswer();
        }
    } else {
        toggleButtonState('disabled');
        if (e.keyCode === 13) {
            showError();
        }
    }
}
const isFormFilled = function () {
    return SELECTORS.INPUT.value ? true : false;
}
const toggleButtonState = function (status) {
    if (status === 'disabled') {
        SELECTORS.BUTTON.setAttribute(status, '');
    } else {
        SELECTORS.BUTTON.removeAttribute('disabled');
    }
}

const showError = function () {
    SELECTORS.ERROR.textContent = 'PLEASE WRITE A QUESTION';

    setTimeout(() => {
        SELECTORS.ERROR.textContent = '';
    }, 1000);
}

SELECTORS.BUTTON.addEventListener('click', getNewAnswer);