import { useNavigate } from "react-router-dom";
import {
  QuizContainer,
  QuestionCard,
  CategoryBadge,
  QuestionText,
  BackButton,
  ExplanationBox,
  ExplanationTitle,
  ExplanationText,
  ActionButton,
  OptionsContainer,
} from "./styles";

import { ArrowRight } from "lucide-react";

import { useQuizLogic } from "./useQuizLogic";
import { questions } from "../../data/questions";
import { ProgressBarComponent } from "../../components/ProgressBarComponent";
import { OptionButtonComponent } from "../../components/OptionButtonComponent";
import { QuizComplete } from "../../components/QuizComplete";

export const Quiz = () => {
  const {
    quizState,
    currentQuestion,
    isQuizComplete,
    progressPercentage,
    handleButtonClick,
    getButtonText,
    handleRestartQuiz,
    handleAnswerSelect,
  } = useQuizLogic();

  const navigate = useNavigate();

  if (isQuizComplete) {
    const percentage = Math.round((quizState.score / questions.length) * 100);

    return (
      <QuizContainer>
        <QuizComplete
          percentage={percentage}
          score={quizState.score}
          handleRestartQuiz={handleRestartQuiz}
        />
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <BackButton onClick={() => navigate("/")}>← Back to Dashboard</BackButton>

      <ProgressBarComponent
        currentQuestion={quizState.currentQuestion}
        progressPercentage={progressPercentage}
      />

      <QuestionCard>
        <CategoryBadge $category={currentQuestion.category}>
          {currentQuestion.category}
        </CategoryBadge>

        <QuestionText>{currentQuestion.question}</QuestionText>
        <OptionsContainer>
          {currentQuestion.options.map((option) => (
            <OptionButtonComponent
              key={option.id}
              option={option}
              quizState={quizState}
              correctAnswer={currentQuestion.correctAnswer}
              handleAnswerSelect={handleAnswerSelect}
            />
          ))}
        </OptionsContainer>
        {quizState.showFeedback && (
          <ExplanationBox>
            <ExplanationTitle>Explanation:</ExplanationTitle>
            <ExplanationText>{currentQuestion.explanation}</ExplanationText>
          </ExplanationBox>
        )}
      </QuestionCard>
      <ActionButton
        onClick={handleButtonClick}
        $disabled={!quizState.selectedAnswer && !quizState.showFeedback}
      >
        {getButtonText()}
        {quizState.showFeedback && <ArrowRight size={20} />}
      </ActionButton>
    </QuizContainer>
  );
};
