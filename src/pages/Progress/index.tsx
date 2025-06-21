import {
  DashboardContainer,
  Title,
  StatsGrid,
  StatCard,
  StatHeader,
  StatIcon,
  StatTitle,
  StatValue,
  StatDescription,
  CategoryProgress,
  CategoryTitle,
  CategoryGrid,
  CategoryCard,
  CategoryName,
  ProgressBar,
  ProgressFill,
  ProgressText,
} from "./styles";

import { Trophy, Target, TrendingUp, Award } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const categoryColors = {
  React: "#61DAFB",
  JavaScript: "#F7DF1E",
  HTML: "#E34F26",
  CSS: "#1572B6",
};

export const Progress = () => {
  const { userProgress } = useAuth();

  if (!userProgress) return null;

  const overallAccuracy =
    userProgress.totalQuestions > 0
      ? Math.round(
          (userProgress.correctAnswers / userProgress.totalQuestions) * 100
        )
      : 0;

  return (
    <DashboardContainer>
      <Title>Your Progress</Title>

      <StatsGrid>
        <StatCard>
          <StatHeader>
            <StatIcon $color="#10B981">
              <Trophy size={24} />
            </StatIcon>
            <StatTitle>Quizzes Completed</StatTitle>
          </StatHeader>
          <StatValue>{userProgress.completedQuizzes}</StatValue>
          <StatDescription>Total quizzes finished</StatDescription>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon $color="#3B82F6">
              <Target size={24} />
            </StatIcon>
            <StatTitle>Questions Answered</StatTitle>
          </StatHeader>
          <StatValue>{userProgress.totalQuestions}</StatValue>
          <StatDescription>Total questions attempted</StatDescription>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon $color="#8B5CF6">
              <TrendingUp size={24} />
            </StatIcon>
            <StatTitle>Accuracy Rate</StatTitle>
          </StatHeader>
          <StatValue>{overallAccuracy}%</StatValue>
          <StatDescription>Correct answers percentage</StatDescription>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon $color="#F59E0B">
              <Award size={24} />
            </StatIcon>
            <StatTitle>Correct Answers</StatTitle>
          </StatHeader>
          <StatValue>{userProgress.correctAnswers}</StatValue>
          <StatDescription>
            Out of {userProgress.totalQuestions} total
          </StatDescription>
        </StatCard>
      </StatsGrid>
      <CategoryProgress>
        <CategoryTitle>Category Breakdown</CategoryTitle>
        <CategoryGrid>
          {Object.entries(userProgress.categoryProgress).map(
            ([category, progress]) => {
              const percentage =
                progress.total > 0
                  ? Math.round((progress.correct / progress.total) * 100)
                  : 0;
              const color =
                categoryColors[category as keyof typeof categoryColors];

              return (
                <CategoryCard key={category}>
                  <CategoryName>{category}</CategoryName>
                  <ProgressBar>
                    <ProgressFill $percentage={percentage} $color={color} />
                  </ProgressBar>
                  <ProgressText>
                    <span>
                      {progress.correct}/{progress.total} correct
                    </span>
                    <span>{percentage}%</span>
                  </ProgressText>
                </CategoryCard>
              );
            }
          )}
        </CategoryGrid>
      </CategoryProgress>
    </DashboardContainer>
  );
};
