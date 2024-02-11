const xSpans = document.querySelector(".x");
const ySpans = document.querySelector(".y");
const xyInputs = document.querySelector(".xyInputs");
const xInputCont = document.querySelector(".questionsCont");

let x = Array.from(xSpans.children);
let y = Array.from(ySpans.children);
let questionIndex = 0;
let anserOffests = [];
let questions;
let answers;
let xOffsets = {
  xAfermative: x.slice(0, x.length / 2),
  xMinus: x.slice((x.length + 1) / 2),
  centerXs: x[(x.length - 1) / 2],
};
let yOffsets = {
  yAfermative: y.slice((y.length + 1) / 2),
  yMinus: y.slice(0, y.length / 2),
  centerYs: y[(y.length - 1) / 2],
};

const setXYValues = async () => {
  answers = await (await fetch("./scripts/aswers.json")).json();
  xOffsets.xAfermative.forEach((item, index) => {
    item.id = xOffsets.xAfermative.length - index;
  });
  xOffsets.xMinus.forEach((item, index) => {
    item.id = -(index + 1);
  });
  xOffsets.centerXs.id = 0;

  yOffsets.yAfermative.forEach((item, index) => {
    item.id = index + 1;
  });
  yOffsets.yMinus.forEach((item, index) => {
    item.id = -(yOffsets.yMinus.length - index);
  });
  yOffsets.centerYs.id = 0;
};
const setClassActive = (xVal, yVal) => {
  if (!xVal && !yVal)
    return x.forEach((item, index) => {
      item.classList.remove("active");
      y[index].classList.remove("active");
    });
  x.forEach((item, index) => {
    if (item.id == xVal) {
      item.classList.add("active");
    }
    if (y[index].id == yVal) {
      y[index].classList.add("active");
    }
  });
};
setXYValues();
document.body.addEventListener("dblclick", (e) => {
  xyInputs.classList.add("active");
  if (e.target === xyInputs) {
    xyInputs.classList.remove("active");
  } else {
    xyInputs.classList.add("active");
  }
});

xyInputs.children[0].addEventListener("submit", (e) => {
  e.preventDefault();
  let indexTrue = 0;
  if (anserOffests.length === 2) {
    anserOffests.forEach((item, index) => {
      console.log(item === answers[questionIndex][index]);
      if (item === answers[questionIndex][index]) indexTrue++;
    });
    console.log(indexTrue);
    anserOffests = [];
    if (indexTrue === answers[questionIndex].length) {
      questionIndex++;
      return setUestionValue(questionIndex);
    }
  }

  setClassActive(
    xyInputs.children[0].children[0].children[0].value,
    xyInputs.children[0].children[1].children[0].value
  );
  if (
    xyInputs.children[0].children[0].children[0].value &&
    xyInputs.children[0].children[1].children[0].value
  )
    anserOffests.push(
      `${xyInputs.children[0].children[0].children[0].value},${xyInputs.children[0].children[1].children[0].value}`
    );

  xyInputs.children[0].children[0].children[0].value = "";
  xyInputs.children[0].children[1].children[0].value = "";
  xyInputs.classList.remove("active");
  console.log(anserOffests);
});
const setUestionValue = async (index) => {
  questions = await (await fetch("./scripts/sahmiQuestions.json")).json();
  xInputCont.children[0].innerHTML = questions[index];
};

setUestionValue(questionIndex);
