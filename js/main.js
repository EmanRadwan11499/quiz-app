"use strict";
import { Quiz } from "./quiz.js";
import Question from "./question.js";

// ^ form inputs
const countInput = document.querySelector(".qesCount");
const CategInput = document.querySelector(".category");
const diffInput = document.querySelector(".difficulty");

export let quizData;
export let quiz;
export let question;
export let nextQues;

// ^ take instance from Quiz class when submit quiz form
document.getElementById("QuizForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (validateInputs() === true) {
    // & display quiz timer
    setQuizTime();

    // & get input values
    const questionCount = countInput.value;
    const quizCategory = CategInput.value;
    const quizDiff = diffInput.value;

    // & take instance to create quiz object
    quiz = new Quiz(questionCount, quizCategory, quizDiff);
    quizData = await quiz.getQuestionsData();
    console.log(quizData);
    clearForm();

    // & take instance from question class to display a question
    question = new Question(0);
    question.displayQuestion();
    console.log(question);

    // & hide the form, and display the questions
    document.querySelector(".FormContainer").classList.add("d-none");
    document.querySelector(".QuestionDetails").classList.remove("d-none");
  } else {
    displayWarningMsg();
  }
});

// ^ validate inputs
function validateInputs() {
  if (
    countInput.value !== "" &&
    CategInput.value !== "Select Category" &&
    diffInput.value !== "Choose The Difficulty"
  ) {
    hideWarningMsg(countInput);
    hideWarningMsg(CategInput);
    hideWarningMsg(diffInput);
    return true;
  }
}

// ^ display warning msg
function displayWarningMsg() {
  if (countInput.value === "") {
    showWarningMsg(countInput);
  } else {
    hideWarningMsg(countInput);
  }
  if (CategInput.value === "Select Category") {
    showWarningMsg(CategInput);
  } else {
    hideWarningMsg(CategInput);
  }
  if (diffInput.value === "Choose The Difficulty") {
    showWarningMsg(diffInput);
  } else {
    hideWarningMsg(diffInput);
  }
}

// ^hide warning msg
function hideWarningMsg(element) {
  element.nextElementSibling.classList.add("d-none");
}
// ^show warning msg
function showWarningMsg(element) {
  element.nextElementSibling.classList.remove("d-none");
}

// ^clear form inputs
function clearForm() {
  countInput.value = "";
  CategInput.value = "Select Category";
  diffInput.value = "Choose The Difficulty";
}

// ^ try the quiz again when user clicks on try again Btn
export function tryAgain() {
  document.querySelector(".tryBtn").addEventListener("click", (e) => {
    document.querySelector(".FormContainer").classList.remove("d-none");
    document.querySelector(".QuestionDetails").classList.add("d-none");
  });
}

// ^ set quiz time to be only one hour
export let intervalSec;
export let intervalMin;
export function setQuizTime() {
  let minCounter = 59;
  let secCounter = 60;
  document.querySelector(
    ".timer span"
  ).innerHTML = `${minCounter} min : ${secCounter} sec`;
  intervalSec = setInterval((e) => {
    secCounter--;
    document.querySelector(
      ".timer span"
    ).innerHTML = `${minCounter} min : ${secCounter} sec`;

    if (secCounter <= 0 && !minCounter <= 0) {
      secCounter = 60;
    }

    if (secCounter <= 0 && minCounter <= 0) {
      clearInterval(intervalMin);
      clearInterval(intervalSec);
      secCounter = 0;
      minCounter = 0;
      document.querySelector(".timer span").innerHTML = `Time is out`;
      quiz.getFinalScore();
    }
  }, 1000);

  intervalMin = setInterval((e) => {
    minCounter--;
  }, 60000);
}
