const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random"
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerDisplay = docuemtn.getElementById("timer")
const timerElement = document.getElementById('timer')
const blockedKey = [91,20, 18, 17, 16, 13, 9]
let current = 0
let correct =0
let flag = false
let startTime;
function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

function startTimer(){
    setInterval(()=>{
        let current = new Date()
        timerDisplay.innerText= Math.floor((current-startTime)/1000)
    },1000)
}

document.addEventListener('keydown', function (event) {
    if(!flag){
        startTime = new Date()
        startTimer()
        flag=true
    }
    
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