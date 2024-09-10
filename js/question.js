"use strict";
import { quizData, quiz } from "./main.js";

export default class Question {
  constructor(index) {
    this.question = quizData[index].question;
    this.index = index;
    this.rightAns = quizData[index].correct_answer;
    this.wrongAns = quizData[index].incorrect_answers;
    this.allAnswers = this.getAllAnswers();
    this.checked = false;
  }

  getAllAnswers() {
    return this.wrongAns.concat(this.rightAns).sort();
  }

  displayQuestion() {
    document.querySelector(".QuestionContent").innerHTML = `
    <div class = "questionContainer">
    <div
      class="qusetionInfo">
        <h2>Qusetion <span class="count">${this.index + 1}</span> / ${
      quizData.length
    }</h2>
      </div>
    <p class="fs-5 fw-semibold question mt-3 mb-4">
      ${this.question}
    </p>
    <div class="answersInfo">
      <h2>Select an Answer</h2>
      <ul
        class="d-flex list-unstyled justify-content-between flex-wrap row-gap-2 column-gap-2 my-4"
        type="A"
      >
        ${this.allAnswers
          .map((ans) => {
            return `<li class = 'rounded-3'>${ans}</li>`;
          })
          .join("")}
      </ul>
    </div>
    </div>
    <div class="quizStats text-center">
      <button
        class="btn nextBtn text-light fw-medium d-block my-4 w-100 shadow-lg"
      >
        Next 
        <i class="fa-solid fa-arrow-right-long ms-3"></i>
      </button>
      <p class="score fw-semibold fs-5 mt-3 mb-0">
        Score: <span class="fw-medium">${quiz.score}</span> / ${quizData.length}
      </p>
    </div>
    `;
    this.getNextQuestion();
    this.increaseScore();
  }

  getNextQuestion() {
    document.querySelector(".nextBtn").addEventListener("click", (e) => {
      if (this.checked === true) {
        this.index += 1;
        if (this.index > quizData.length - 1) {
          // & display final score at the end
          quiz.getFinalScore();
          return;
        }

        let nextQues = new Question(this.index);
        nextQues.displayQuestion();
      }
    });
  }

  //   ^increase score when user click on right answer

  increaseScore() {
    for (let i = 0; i < this.allAnswers.length; i++) {
      document.querySelectorAll("ul li")[i].addEventListener("click", (e) => {
        if (this.checked == false) {
          // ^prevent multiple answer check
          this.checked = true;

          // ^ style checked answer & increase score
          if (
            e.target.innerHTML.toLowerCase() === this.rightAns.toLowerCase()
          ) {
            e.target.classList.add(
              "rightAns",
              "animate__animated",
              "animate__pulse"
            );
            quiz.score++;
          } else {
            e.target.classList.add(
              "wrongAns",
              "animate__animated",
              "animate__shakeX"
            );
            // ^ display correct answer when user choose incorrect one
            let answers = Array.from(document.querySelectorAll("ul li"));
            answers.map((answer) => {
              if (
                answer.innerHTML.toLocaleLowerCase() ===
                this.rightAns.toLocaleLowerCase()
              ) {
                answer.classList.add(
                  "rightAns",
                  "animate__animated",
                  "animate__pulse"
                );
              }
            });
          }
        }
      });
    }
  }
}
