import { questions } from 'assets/data/trivia/questions';
import { get } from './helper';

const all = questions;
const easy = questions.filter((e) => e.difficulty === 'EASY');
const mediumEasy = questions.filter((e) => e.difficulty === 'MEDIUM_EASY');
const medium = questions.filter((e) => e.difficulty === 'MEDIUM');
const hard = questions.filter((e) => e.difficulty === 'HARD');
const veryHard = questions.filter((e) => e.difficulty === 'VERY_HARD');

export const QUESTIONS = [
  {
    id: 1,
    index: 0,
    type: 'trivia',
    title: `Todas (${all.length})`,
    slides: [],
    shuffle() {
      this.slides = get(all);
    },
  },
  {
    id: 2,
    index: 1,
    type: 'trivia',
    title: `Fáciles (${easy.length})`,
    slides: [],
    shuffle() {
      this.slides = get(easy);
    },
  },
  {
    id: 3,
    index: 2,
    type: 'trivia',
    title: `Media-Fáciles (${mediumEasy.length})`,
    slides: [],
    shuffle() {
      this.slides = get(mediumEasy);
    },
  },
  {
    id: 4,
    index: 3,
    type: 'trivia',
    title: `Media (${medium.length})`,
    slides: [],
    shuffle() {
      this.slides = get(medium);
    },
  },
  {
    id: 5,
    index: 4,
    type: 'trivia',
    title: `Difíciles (${hard.length})`,
    slides: [],
    shuffle() {
      this.slides = get(hard);
    },
  },
  {
    id: 6,
    index: 5,
    type: 'trivia',
    title: `Muy Difíciles (${veryHard.length})`,
    slides: [],
    shuffle() {
      this.slides = get(veryHard);
    },
  },
];
