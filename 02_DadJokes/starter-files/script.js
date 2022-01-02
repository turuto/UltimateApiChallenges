/**
 * 1. Initialize an XMLHttpRequest constructor
 * 2. Open a GET request, set the headers and response type
 * 3. Output successful response
 * 4. Output error state
 * 5. Combine with an event listener (button)
 * 6. Adjust UI states accordingly
 * 7. Bonus: change button CTA to indicate if it's the first joke or a "next" one
 */

const API_ENDPOINT = 'https://icanhazdadjoke.com/';
const SELECTORS = {};
SELECTORS.BUTTON = document.querySelector('#button');
SELECTORS.LOADER = document.querySelector('#loader');
SELECTORS.CTA = document.querySelector('#cta');
SELECTORS.JOKE = document.querySelector('#joke');
SELECTORS.ERROR = document.querySelector('#error-container > p');

let isFirstRequest = true;
let isRequestInProgress = false;

const askForJoke = function () {
    isFirstRequest ? removeFirstFlag() : '';
    if (!isRequestInProgress) {
        isRequestInProgress = true;
        changeButtonState('loading');
        SELECTORS.ERROR.classList.add('isHidden');
        fetchJoke();
    }
}

const fetchJoke = function () {
    fetch(API_ENDPOINT, {
        headers: {
            "Accept": "text/plain"
        }
    })
        .then(response => {
            if (response.status === 200) {
                return response.text();
            }
        })
        .then(data => {
            isRequestInProgress = false;
            displayJoke(data);
        })
        .catch(error => displayError(error));
}

const displayJoke = function (joke) {
    SELECTORS.JOKE.textContent = joke;
    changeButtonState('active');
}

const displayError = function (msg) {
    console.log('hello');
    SELECTORS.ERROR.querySelector('#error-message').textContent = msg;
    SELECTORS.ERROR.classList.remove('isHidden');
    changeButtonState('active');
}

const removeFirstFlag = function () {
    isFirstRequest = false;
    SELECTORS.CTA.textContent = 'Get Another one';
}

const changeButtonState = function (state) {
    const states = {
        loading: 'loading',
        disabled: 'disabled',
        active: 'active'
    };

    if (state === states.loading) {
        SELECTORS.LOADER.style.display = 'block'
        SELECTORS.CTA.style.display = 'none'
        return
    }

    if (state === states.active) {
        SELECTORS.LOADER.style.display = 'none'
        SELECTORS.CTA.style.display = 'block'
        return
    }
}

SELECTORS.BUTTON.addEventListener('click', askForJoke);
