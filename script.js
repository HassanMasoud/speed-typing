const RANDOM_QUOTE_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.querySelector("#quoteDisplay");
const quoteInputElement = document.querySelector("#quoteInput");

quoteInputElement.addEventListener("input", () => {
  const quoteSpanArray = quoteDisplayElement.querySelectorAll("span");
  const inputValueArray = quoteInputElement.value.split("");
  quoteSpanArray.forEach((characterSpan, index) => {
    const character = inputValueArray[index];
    if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
    }
  });
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.innerText = null;
}

renderNewQuote();
