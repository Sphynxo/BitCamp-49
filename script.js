"use strict";

let namesArr = [];
let removeInterval;
let winnerName = document.querySelector(".winner-name");

const addBtn = document.querySelector(".add");
const pickWinnerBtn = document.querySelector(".pick-winner");
const startAgain = document.querySelector(".start-again");
const nameInput = document.querySelector(".name-input");
const namesSpace = document.querySelector(".names-space");
const winner = document.querySelector(".winner");
const blur = document.querySelector(".blur");

addBtn.addEventListener("click", function () {
  addValue();
});

nameInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter" && nameInput.value.trim() !== "") {
    addValue();
  }
});

function addValue() {
  let nameValue = nameInput.value;
  if (nameValue.length > 0) {
    if (nameValue.trim() !== "") {
      let capitalizedName =
        nameValue.charAt(0).toUpperCase() + nameValue.slice(1);
      namesArr.push(capitalizedName);
      nameInput.value = "";
      let nameDiv = document.createElement("div");
      nameDiv.setAttribute("class", "name");
      nameDiv.dataset.name = capitalizedName;
      let nameParagraph = document.createElement("p");
      let nameTxt = document.createTextNode(capitalizedName);
      nameParagraph.appendChild(nameTxt);
      nameDiv.appendChild(nameParagraph);
      namesSpace.appendChild(nameDiv);
    }
  } else {
    nameInput.classList.add("shake", "shake-border");

    setTimeout(() => {
      nameInput.classList.remove("shake", "shake-border");
    }, 500);
  }
}

function removeValue() {
  const randomNumber = Math.floor(Math.random() * namesArr.length);
  let randomName = namesArr[randomNumber];
  namesArr = namesArr.filter((element) => element !== randomName);

  let nameToRemove = document.querySelector(`.name[data-name="${randomName}"]`);

  if (nameToRemove) {
    namesSpace.removeChild(nameToRemove);
  }
}

pickWinnerBtn.addEventListener("click", function () {
  if (namesArr.length > 1) {
    removeInterval = setInterval(function () {
      removeValue();
      if (namesArr.length === 1) {
        clearInterval(removeInterval);
        winner.classList.remove("hide");
        blur.classList.remove("hide");
        winnerName.textContent = `${namesArr[0].toUpperCase()}`;
      }
    }, 500);
  }
});

startAgain.addEventListener("click", function () {
  winner.classList.add("hide");
  blur.classList.add("hide");
  const nameDivs = document.querySelectorAll(".name");
  nameDivs.forEach(function (div) {
    namesSpace.removeChild(div);
  });
  namesArr = [];
});
