const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random"
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}


async function renderNewQuote() {
    const quote = await getRandomQuote();
   quoteDisplayElement.innerHTML = ""
   quote.split("").forEach(element => {
       const characterSpan = document.createElement("span")
       characterSpan.innerText = element
       quoteDisplayElement.appendChild(characterSpan)
   });
   
}



renderNewQuote()