import {makeAutoObservable, runInAction} from "mobx";

const baseUrl = process.env.NODE_ENV === 'development' ?
    "http://localhost:8080/":""; //Check if dev environment

class QuizStore {
    quiz = ["Loading quizzes"];

    constructor() {
        makeAutoObservable(this,{},{autoBind:true});//For non-arrow-functions bind
        this.fetchQuizzes();
    }

    addQuiz = (quiz) => {
        this.quiz.push(quiz);
    }

    fetchQuizzes() {
        fetch(baseUrl + "api/quizzes").then(
            (response) => response.json().then(
                (json) => runInAction(() => this.quiz = json)
            )
        )
    }
}


export const quizStore = new QuizStore();