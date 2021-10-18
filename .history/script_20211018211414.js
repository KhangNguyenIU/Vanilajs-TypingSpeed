const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random"

const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerDisplay = document.getElementById("timer")
const modal = document.getElementById("modal")
const overlay = document.getElementById("overlay")
const wordSpeedDisplay = document.getElementById('word-speed')
const closeButton = document.getElementById("close-icon")
const blockedKey = [91, 20, 18, 17, 16, 13, 9]
let current = 0
let correct = 0
let incorrect=0;
let duration;
let wordSpeed;
let flag = false
let startTime;
var interval;
let wordLength;


closeButton.addEventListener("click",function(){
    closeModal()
})

overlay.addEventListener("click",function(){
    console.log("click")
    closeModal()
})
function openModal(){
    modal.classList.add("active")
    overlay.classList.add("active")
    updateResult()
}

function closeModal(){
    modal.classList.remove("active")
    overlay.classList.remove("active")
    renderNewQuote()
}

function updateResult(){
    const accuracyResult = document.getElementById("accuracy")
    const wpsResult = document.getElementById("wps")
    accuracyResult.innerText = Math.ceil(((wordLength- incorrect)/wordLength)*100)
    wpsResult.innerText = wordSpeed
}
function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

const startTimer = () => {
    let current = new Date()
    duration = Math.floor((current - startTime) / 1000)
    wordSpeed = (correct / duration).toFixed(2);
    wordSpeedDisplay.innerText = wordSpeed
    timerDisplay.innerText = duration
}


document.addEventListener('keydown', onTyping)

function onTyping(event) {
    if (!flag) {
        startTime = new Date()
        interval = setInterval(startTimer, 1000)
        flag = true
    }
    let arrayQuote = quoteDisplayElement.querySelectorAll("span")

    if (!blockedKey.includes(event.keyCode)) {
        if (event.key == arrayQuote[current].innerText) {
            arrayQuote[current].classList.remove("current-char")
            arrayQuote[current].classList.add("correct")
            current = current += 1;
            correct += 1
            if (current < arrayQuote.length)
                arrayQuote[current].classList.add("current-char")
            if (current >= arrayQuote.length) {
                clearInterval(interval)
                openModal()
                return;
            }
        }

        else {
            arrayQuote[current].classList.add("incorrect")
            incorrect ++;
        }
    }

}

async function renderNewQuote() {
    current =0
    duration=0;
    wordSpeed=0;
    timerDisplay.innerText = 0;
    wordSpeedDisplay.innerText = 0
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = ""
    quote.split("").forEach(element => {
        const characterSpan = document.createElement("span")
        characterSpan.innerText = element
        quoteDisplayElement.appendChild(characterSpan)
    });
    quoteDisplayElement.querySelector("span").classList.add("current-char")
    wordLength = quoteDisplayElement.querySelectorAll("span").length
}



renderNewQuote()