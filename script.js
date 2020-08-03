const RANDOM_QUOTE_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.querySelector("#quoteDisplay");
const quoteInputElement = document.querySelector("#quoteInput");

quoteInputElement.addEventListener("input", () => {
  const quoteSpanArray = quoteDisplayElement.querySelectorAll("span");
  const inputValueArray = quoteInputElement.value.split("");

  let correct = true;
  quoteSpanArray.forEach((characterSpan, index) => {
    const character = inputValueArray[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) renderNewQuote();
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
  quoteInputElement.value = null;
}

renderNewQuote();
