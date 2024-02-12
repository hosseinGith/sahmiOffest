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
let trueAnswer = false;
let xOffsets = {
  xAfermative: x.slice((x.length + 1) / 2),
  xMinus: x.slice(0, x.length / 2),
  centerXs: x[(x.length - 1) / 2],
};
let yOffsets = {
  yAfermative: y.slice(0, y.length / 2),
  yMinus: y.slice((y.length + 1) / 2),
  centerYs: y[(y.length - 1) / 2],
};

const setXYValues = async () => {
  answers = await (await fetch("./scripts/aswers.json")).json();
  console.log(yOffsets.yAfermative);
  xOffsets.xAfermative.forEach((item, index) => {
    item.id = index + 1;
  });
  xOffsets.xMinus.forEach((item, index) => {
    item.id = -(xOffsets.xMinus.length - index);
  });
  xOffsets.centerXs.id = 0;

  yOffsets.yAfermative.forEach((item, index) => {
    item.id = yOffsets.yMinus.length - index;
  });
  yOffsets.yMinus.forEach((item, index) => {
    item.id = -(index + 1);
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
    if (item.id == Math.round(Number(xVal))) {
      item.classList.add("active");
    }
    if (y[index].id == Math.round(Number(yVal))) {
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
  if (
    xyInputs.children[0].children[0].children[0].value &&
    xyInputs.children[0].children[1].children[0].value
  )
    anserOffests.push(
      `${xyInputs.children[0].children[0].children[0].value},${xyInputs.children[0].children[1].children[0].value}`
    );
  else anserOffests = [];
  if (anserOffests.toString() == answers[questionIndex].toString()) {
    trueAnswer = true;
    anserOffests = [];
    questionIndex++;
    setUestionValue(questionIndex);
  }
  setClassActive(
    xyInputs.children[0].children[0].children[0].value,
    xyInputs.children[0].children[1].children[0].value
  );

  xyInputs.children[0].children[0].children[0].value = "";
  xyInputs.children[0].children[1].children[0].value = "";
  xyInputs.classList.remove("active");
  if (trueAnswer) {
    trueAnswer = false;
    setTimeout(() => {
      setClassActive();
    }, 1000);
  }
  console.log(anserOffests);
});

parseFloat();
const setUestionValue = async (index) => {
  questions = await (await fetch("./scripts/sahmiQuestions.json")).json();
  xInputCont.children[0].innerHTML = questions[index];
};

setUestionValue(questionIndex);
