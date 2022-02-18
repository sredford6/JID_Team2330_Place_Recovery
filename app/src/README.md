# Development Log

## Backend related
### TODO
- endpoints for feteching question
- endpoints for pushing users answers
  
### Known issues
- Expo Go in iOS doesn't support http for requests; need to use https


## Frontend related
### Note
- Use the second daily questionnaire (2/3) to enter questionnaire page.
- Code for the questionnaire is in `screens/QuizScreen.tsx` (don't know what it's quiz..)
### TODO
- currently quizscreen load data from local `sample_question.json` file, need to change that later
- revise UI designs
- answer choices should appear differently when selected
- make answer choices into bubbles?
- remove `END` button and replace it with `Submit` when users finish the last question?
- ...

### Known issues
- compoent `components/Sliders` doesn't work as intended. Multiple problems are using the same sliders. Need to find a way to render sliders for each question and record the value.
- ...
