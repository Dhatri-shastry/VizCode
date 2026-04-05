export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
  input: any;
  expected: any;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: 'Array' | 'Linked List' | 'Stack' | 'Queue' | 'Tree' | 'Graph';
  description: string;
  starterCode: string;
  codeSnippets?: { langSlug: string; code: string }[];
  solution: string;
  testCases?: TestCase[];
}

export interface Step {
  line: number;
  state: any;
  description: string;
}

export interface UserProgress {
  userId: string;
  solvedProblems: string[];
  lastActive: number;
}
