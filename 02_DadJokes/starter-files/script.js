/**
 * 1. Initialize an XMLHttpRequest constructor
 * 2. Open a GET request, set the headers and response type
 * 3. Output successful response
 * 4. Output error state
 * 5. Combine with an event listener (button)
 * 6. Adjust UI states accordingly
 * 7. Bonus: change button CTA to indicate if it's the first joke or a "next" one
 */

const API_ENDPOINT = 'https://icanhazdadjoke.cosm/';
const SELECTORS = {};
SELECTORS.BUTTON = document.querySelector('#button');
SELECTORS.JOKE = document.querySelector('#joke');

let isFirstRequest = true;
let isRequestInProgress = false;

const getAnswer = function () {
    isFirstRequest ? removeFirstFlag() : '';
    fetchAnswer();
}

const fetchAnswer = function () {
    fetch(API_ENDPOINT, {
        headers: {
            "Accept": "text/plain"
        }
    })
        .then(response => {
            response.text()
        })
        .then(data => {
            displayJoke(data);
        })
        .catch(error => console.log('error: ', error));
}

const displayJoke = function (joke) {
    SELECTORS.JOKE.textContent = joke;
}

const removeFirstFlag = function () {
    isFirstRequest = false;
    SELECTORS.BUTTON.textContent = 'Get Another one';
}


SELECTORS.BUTTON.addEventListener('click', getAnswer);
