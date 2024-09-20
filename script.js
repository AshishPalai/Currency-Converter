const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdown) {
    for (currencyCode in countryList) {
        // console.log(CurrencyCode, countryList[CurrencyCode]);
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}
const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = 'https://flagsapi.com/${countryCode}/flat/64.png';
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    //console.log(amtVal);
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    //console.log(fromCurr.value, toCurr.value)
    const URL = `${url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    //console.log(rate);
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`
});