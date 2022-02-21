import { IAnswer } from "models/answer.model";
import { ChoiceQuestion, Question } from "models/question.model";

const emailRegexp =
  /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d\w][^\n ]*){6,}$/;

export function validateEmail(email: string): boolean {
  return emailRegexp.test(email);
}

export function validatePassword(password: string): boolean {
  return passwordRegexp.test(password);
}

export function validateQuestion(arg: any): arg is Question {
  if (!arg) return false;
  if (!arg.id || typeof arg.id != "string") return false;
  if (!arg.question || typeof arg.question != "string") return false;
  if (
    arg.type == undefined ||
    typeof arg.type != "number" ||
    arg.type < 0 ||
    arg.type > 3
  )
    return false;
  return true;
}

export function validateChoiceQuestion(arg: any): arg is ChoiceQuestion {
  if (!validateQuestion(arg)) return false;
  if (
    !(<ChoiceQuestion>arg).choices ||
    !Array.isArray((<ChoiceQuestion>arg).choices)
  )
    return false;
  for (let choice in (<ChoiceQuestion>arg).choices) {
    if (typeof choice != "string") {
      return false;
    }
  }
  return true;
}

export function validateQuestionArray(arg: any): arg is Question[] {
  if (!Array.isArray(arg)) {
    return false;
  }
  const question_ids = new Set<string>();
  for (let question of arg) {
    if (!validateQuestion(question)) {
      return false;
    }
    if (question.type != 1 && !validateChoiceQuestion(question)) {
      return false;
    }
    if (question_ids.has(question.id)) {
      return false;
    }
    question_ids.add(question.id);
  }

  return true;
}

export function validateAnswer(arg: any): arg is IAnswer {
  if (!arg) return false;
  if (!arg.questionId || typeof arg.questionId != "string") return false;
  if (
    !arg.answer ||
    (typeof arg.answer != "string" && typeof arg.answer != "number")
  )
    return false;
  if (arg.choice_index == undefined || typeof arg.choice_index != "number")
    return false;
  return true;
}

export function validateAnswerArray(arg: any): arg is IAnswer[] {
  if (!Array.isArray(arg)) {
    return false;
  }

  const question_ids = new Set<string>();
  for (let answer of arg) {
    if (!validateAnswer(answer)) {
      return false;
    }
    if (question_ids.has(answer.questionId)) {
      return false;
    }
    question_ids.add(answer.questionId);
  }
  return true;
}
