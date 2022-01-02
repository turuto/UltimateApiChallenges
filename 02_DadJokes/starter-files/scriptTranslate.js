/**
 * 1. Initialize an XMLHttpRequest constructor
 * 2. Open a GET request, set the headers and response type
 * 3. Output successful response
 * 4. Output error state
 * 5. Combine with an event listener (button)
 * 6. Adjust UI states accordingly
 * 7. Bonus: change button CTA to indicate if it's the first joke or a "next" one
 */

const APIS = {};
APIS.JOKES = {
    endpoint: 'https://icanhazdadjoke.com/',
};
APIS.TRANSLATOR = {
    endpoint: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
    key: 'trnsl.1.1.20191228T061040Z.d9342f8fd96a868f.a4178c94ae861cd1c08d050fafe2bca154b713d2',
};



const SELECTORS = {};
SELECTORS.BUTTON = document.querySelector('#button');
SELECTORS.JOKE = document.querySelector('#joke');

let isFirstRequest = true;
let isRequestInProgress = false;

const askForJoke = function () {
    isFirstRequest ? removeFirstFlag() : '';
    fetchJoke();
}

const fetchJoke = function () {
    fetch(APIS.JOKES.endpoint, {
        headers: {
            "Accept": "text/plain"
        }
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            const translation = fetchTranslation(data);
            console.log(translation)
        })
        .catch(error => console.log('error: ', error));
}

const fetchTranslation = function (text) {
    const url = `${APIS.TRANSLATOR.endpoint}?key=${APIS.TRANSLATOR.key}&text=${text}&lang=en-es`;
    console.log(text, url);
    debugger;
    fetch(url)
        .then(response => response.text())
        .catch(err => console.error(err));
}

const displayJoke = function (joke) {
    SELECTORS.JOKE.textContent = joke;
}

const removeFirstFlag = function () {
    isFirstRequest = false;
    SELECTORS.BUTTON.textContent = 'Get Another one';
}


SELECTORS.BUTTON.addEventListener('click', askForJoke);
