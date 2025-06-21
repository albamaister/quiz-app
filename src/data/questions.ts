import type { Question } from "../types/quiz";

export const questions: Question[] = [
  {
    id: 1,
    category: 'React',
    question: 'What is the purpose of the useEffect hook in React?',
    options: [
      { id: 'A', text: 'To manage component state' },
      { id: 'B', text: 'To perform side effects in functional components' },
      { id: 'C', text: 'To create context providers' },
      { id: 'D', text: 'To handle form submissions' }
    ],
    correctAnswer: 'B',
    explanation: 'useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.'
  },
  {
    id: 2,
    category: 'JavaScript',
    question: 'What does the spread operator (...) do in JavaScript?',
    options: [
      { id: 'A', text: 'Creates a new array from existing elements' },
      { id: 'B', text: 'Spreads elements of an iterable into individual elements' },
      { id: 'C', text: 'Concatenates two strings' },
      { id: 'D', text: 'Performs mathematical operations' }
    ],
    correctAnswer: 'B',
    explanation: 'The spread operator (...) spreads elements of an iterable (like arrays or objects) into individual elements, useful for copying, merging, or passing arguments.'
  },
  {
    id: 3,
    category: 'CSS',
    question: 'Which CSS property is used to create a flexible layout?',
    options: [
      { id: 'A', text: 'display: block' },
      { id: 'B', text: 'display: inline' },
      { id: 'C', text: 'display: flex' },
      { id: 'D', text: 'display: table' }
    ],
    correctAnswer: 'C',
    explanation: 'display: flex creates a flexible layout where items can grow, shrink, and align within their container using flexbox properties.'
  },
  {
    id: 4,
    category: 'HTML',
    question: 'What is the purpose of the semantic HTML5 <section> element?',
    options: [
      { id: 'A', text: 'To create a navigation menu' },
      { id: 'B', text: 'To define a thematic grouping of content' },
      { id: 'C', text: 'To display images' },
      { id: 'D', text: 'To create form inputs' }
    ],
    correctAnswer: 'B',
    explanation: 'The <section> element represents a thematic grouping of content, typically with a heading, helping to structure documents semantically.'
  },
  {
    id: 5,
    category: 'React',
    question: 'What is the difference between props and state in React?',
    options: [
      { id: 'A', text: 'Props are mutable, state is immutable' },
      { id: 'B', text: 'Props are passed from parent, state is internal to component' },
      { id: 'C', text: 'There is no difference' },
      { id: 'D', text: 'Props are for styling, state is for data' }
    ],
    correctAnswer: 'B',
    explanation: 'Props are data passed from parent components and are immutable within the receiving component, while state is internal data that can be modified within the component.'
  },
  {
    id: 6,
    category: 'JavaScript',
    question: 'What is the result of typeof null in JavaScript?',
    options: [
      { id: 'A', text: '"null"' },
      { id: 'B', text: '"undefined"' },
      { id: 'C', text: '"object"' },
      { id: 'D', text: '"boolean"' }
    ],
    correctAnswer: 'C',
    explanation: 'typeof null returns "object" due to a legacy bug in JavaScript. This is a well-known quirk that has been preserved for backward compatibility.'
  },
  {
    id: 7,
    category: 'CSS',
    question: 'What is the CSS box model?',
    options: [
      { id: 'A', text: 'A method for creating responsive designs' },
      { id: 'B', text: 'The rectangular area around elements including content, padding, border, and margin' },
      { id: 'C', text: 'A way to center elements' },
      { id: 'D', text: 'A grid system for layouts' }
    ],
    correctAnswer: 'B',
    explanation: 'The CSS box model describes the rectangular boxes generated for elements, consisting of content, padding, border, and margin areas.'
  },
  {
    id: 8,
    category: 'HTML',
    question: 'Which attribute is used to make an HTML form field required?',
    options: [
      { id: 'A', text: 'mandatory' },
      { id: 'B', text: 'validate' },
      { id: 'C', text: 'required' },
      { id: 'D', text: 'necessary' }
    ],
    correctAnswer: 'C',
    explanation: 'The "required" attribute is a boolean attribute that, when present, specifies that an input field must be filled out before submitting the form.'
  },
  {
    id: 9,
    category: 'React',
    question: 'What is JSX in React?',
    options: [
      { id: 'A', text: 'A JavaScript library' },
      { id: 'B', text: 'A syntax extension for JavaScript' },
      { id: 'C', text: 'A CSS framework' },
      { id: 'D', text: 'A database query language' }
    ],
    correctAnswer: 'B',
    explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files, making it easier to create React components.'
  },
  {
    id: 10,
    category: 'JavaScript',
    question: 'What is the difference between let and var in JavaScript?',
    options: [
      { id: 'A', text: 'No difference' },
      { id: 'B', text: 'let has block scope, var has function scope' },
      { id: 'C', text: 'var is newer than let' },
      { id: 'D', text: 'let is only for numbers' }
    ],
    correctAnswer: 'B',
    explanation: 'let has block scope and cannot be redeclared in the same scope, while var has function scope and can be redeclared.'
  }
];