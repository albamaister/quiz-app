import { useNavigate } from "react-router-dom";
import {
  QuizContainer,
  ProgressSection,
  ProgressInfo,
  ProgressText,
  ProgressBar,
  ProgressFill,
  QuestionCard,
  CategoryBadge,
  QuestionText,
  BackButton,
  OptionsContainer,
  OptionButton,
  OptionContent,
  OptionLetter,
  OptionText,
  FeedbackIcon,
  ExplanationBox,
  ExplanationTitle,
  ExplanationText,
  ActionButton,
  CompletionCard,
  CompletionTitle,
  CompletionIcon,
  ScoreDisplay,
  ScoreText,
} from "./styles";

import { ArrowRight, Check, RotateCcw, X } from "lucide-react";

import { useQuizLogic } from "./useQuizLogic";
import { questions } from "../../data/questions";

export const Quiz = () => {
  const {
    quizState,
    currentQuestion,
    isQuizComplete,
    progressPercentage,
    handleAnswerSelect,
    handleButtonClick,
    getButtonText,
    handleRestartQuiz,
  } = useQuizLogic();

  const navigate = useNavigate();


  if (isQuizComplete) {

    const percentage = Math.round((quizState.score / questions.length) * 100);

    return (
      <QuizContainer>
        <CompletionCard>
          <CompletionIcon>
            <Check size={64} />
          </CompletionIcon>

          <CompletionTitle>Quiz Complete!</CompletionTitle>

          <ScoreDisplay>
            {quizState.score}/{questions.length}
          </ScoreDisplay>
          <ScoreText>{percentage}% Correct</ScoreText>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <ActionButton onClick={handleRestartQuiz}>
              <RotateCcw size={20} />
              Try Again
            </ActionButton>
            <ActionButton onClick={() => console.log("View Progress")}>
              View Progress
            </ActionButton>
          </div>
        </CompletionCard>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <BackButton onClick={() => navigate("/")}>← Back to Dashboard</BackButton>
      <ProgressSection>
        <ProgressInfo>
          <ProgressText>
            Question {quizState.currentQuestion + 1} of {10 /* update */}
          </ProgressText>
          <ProgressText>{progressPercentage}%</ProgressText>
        </ProgressInfo>
        <ProgressBar>
          <ProgressFill $percentage={progressPercentage} />
        </ProgressBar>
      </ProgressSection>

      <QuestionCard>
        <CategoryBadge $category={currentQuestion.category}>
          {currentQuestion.category}
        </CategoryBadge>

        <QuestionText>{currentQuestion.question}</QuestionText>
        <OptionsContainer>
          {currentQuestion.options.map((option) => (
            <OptionButton
              key={option.id}
              $isSelected={quizState.selectedAnswer === option.id}
              $isCorrect={
                quizState.showFeedback &&
                option.id === currentQuestion.correctAnswer
              }
              $showFeedback={quizState.showFeedback}
              onClick={() => handleAnswerSelect(option.id)}
            >
              <OptionContent>
                <OptionLetter
                  $isSelected={quizState.selectedAnswer === option.id}
                  $isCorrect={
                    quizState.showFeedback &&
                    option.id === currentQuestion.correctAnswer
                  }
                  $showFeedback={quizState.showFeedback}
                >
                  {option.id}
                </OptionLetter>

                <OptionText>{option.text}</OptionText>
              </OptionContent>

              {quizState.showFeedback &&
                (option.id === currentQuestion.correctAnswer ||
                  (quizState.selectedAnswer === option.id &&
                    option.id !== currentQuestion.correctAnswer)) && (
                  <FeedbackIcon
                    $isCorrect={option.id === currentQuestion.correctAnswer}
                  >
                    {option.id === currentQuestion.correctAnswer ? (
                      <Check size={20} />
                    ) : (
                      <X size={20} />
                    )}
                  </FeedbackIcon>
                )}
            </OptionButton>
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
