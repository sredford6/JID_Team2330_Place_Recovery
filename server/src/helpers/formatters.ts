import { IAnswers } from "models/answer.model";

export function formatIAnswers(answer: IAnswers) {
  const answers = answer.answers;
  const ansObj: any = {};
  ansObj.datetime = answer.datetime;
  ansObj.questionnaire = answer.questionnaire;
  ansObj.location = answer.location;
  for (let i = 0; i < answers.length; i++) {
    ansObj[`questionId${i}`] = answers[i].questionId;
    ansObj[`answer${i}`] = answers[i].answer.toString();
  }

  return ansObj;
}
