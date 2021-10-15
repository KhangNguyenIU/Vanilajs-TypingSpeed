const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random"
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const blockedKey = [91,20, 18, 17, 16, 13, 9]
let current = 0
let correct =0
let flag = false
function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

document.addEventListener('keydown', function (event) {
    flag = true
    setInterval(()=>{
        console.log("time")
    },1000)
    let arrayQuote = quoteDisplayElement.querySelectorAll("span")
    if (current >= arrayQuote.length)
        return;

    if (!blockedKey.includes(event.keyCode)) {
        if (event.key == arrayQuote[current].innerText) {
            arrayQuote[current].classList.remove("current-char")
            arrayQuote[current].classList.add("correct")
            current = current += 1;
            correct +=1
            if (current < arrayQuote.length)
                arrayQuote[current].classList.add("current-char")
        }

        else {
            // arrayQuote[current].classList.remove("current-char")
            arrayQuote[current].classList.add("incorrect")
        }
    }

})


async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = ""
    quote.split("").forEach(element => {
        const characterSpan = document.createElement("span")
        characterSpan.innerText = element
        quoteDisplayElement.appendChild(characterSpan)
    });
    quoteDisplayElement.querySelector("span").classList.add("current-char")
}



renderNewQuote()