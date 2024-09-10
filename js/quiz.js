"use strict";

import { quizData, tryAgain, quiz, intervalMin, intervalSec } from "./main.js";

export class Quiz {
  constructor(QuestionNum, category, difficulty) {
    this.QuestionNum = QuestionNum;
    this.category = category;
    this.difficulty = difficulty;
    this.score = 0;
  }

  // ^ get data from trivia API according to the selected quiz options
  async getQuestionsData() {
    const ApiData = await fetch(
      `https://opentdb.com/api.php?amount=${this.QuestionNum}&category=${this.category}&difficulty=${this.difficulty}`
    );
    const res = await ApiData.json();
    return res.results;
  }

  // ^ get final score
  getFinalScore() {
    clearInterval(intervalMin);
    clearInterval(intervalSec);
    if (quiz.score === quizData.length) {
      document.querySelector(".QuestionContent").innerHTML = `
            <p class="fs-5 fw-semibold question mt-3 mb-4">
          Congratulations 🎉 your score is ${quiz.score} / ${quizData.length}
        </p>
            `;
    } else {
      document.querySelector(".QuestionContent").innerHTML = `
            <p class="fs-5 fw-semibold question mt-3 mb-4">
          Your score is ${quiz.score} / ${quizData.length}
        </p>
        <button
            class="btn tryBtn text-light fw-medium d-block my-4 w-100 shadow-lg"
          >
            Try Again 
            <i class="fa-solid fa-rotate-right ms-3"></i>
          </button>
            `;
      tryAgain();
      document.querySelector(".timer").classList.remove("d-none");
    }
  }
}
