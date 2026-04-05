import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Cache for LeetCode problems
  const defaultProblems = [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      starterCode: "function twoSum(nums, target) {\n  // Write your code here\n}",
      testCases: [{ input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }]
    },
    {
      id: "2",
      title: "Reverse Linked List",
      difficulty: "Easy",
      category: "Linked List",
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      starterCode: "function reverseList(head) {\n  // Write your code here\n}",
      testCases: [{ input: { head: [1, 2, 3, 4, 5] }, expected: [5, 4, 3, 2, 1] }]
    }
  ];

  let leetCodeCache: any[] = defaultProblems;
  let lastFetchTime = 0;
  const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  const categoryToTag: Record<string, string> = {
    "Array": "array",
    "Linked List": "linked-list",
    "Stack": "stack",
    "Queue": "queue",
    "Tree": "tree",
    "Graph": "graph",
    "Complexity": "recursion"
  };

  async function fetchFromLeetCode(tag: string) {
    const query = `
      query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
        problemsetQuestionList: questionList(
          categorySlug: $categorySlug
          limit: $limit
          skip: $skip
          filters: $filters
        ) {
          questions: data {
            difficulty
            title
            titleSlug
          }
        }
      }
    `;

    const variables = {
      categorySlug: "",
      limit: 20,
      skip: 0,
      filters: { tags: [tag] }
    };

    try {
      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables })
      });
      const data: any = await response.json();
      return data.data?.problemsetQuestionList?.questions || [];
    } catch (error) {
      console.error(`Error fetching problems for tag ${tag}:`, error);
      return [];
    }
  }

  async function fetchQuestionDetails(titleSlug: string) {
    const query = `
      query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          title
          content
          difficulty
          exampleTestcases
          codeSnippets {
            langSlug
            code
          }
        }
      }
    `;

    const variables = { titleSlug };

    try {
      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables })
      });
      const data: any = await response.json();
      return data.data?.question;
    } catch (error) {
      console.error(`Error fetching details for ${titleSlug}:`, error);
      return null;
    }
  }

  async function refreshLeetCodeCache() {
    console.log("Refreshing LeetCode cache...");
    const allProblems: any[] = [];
    const categories = Object.keys(categoryToTag);

    for (const category of categories) {
      const tag = categoryToTag[category];
      const questions = await fetchFromLeetCode(tag);
      
      for (const q of questions) {
        const details = await fetchQuestionDetails(q.titleSlug);
        if (details) {
          const testCases = (details.exampleTestcases || "").split("\n").filter(Boolean).map((line: string) => ({
            input: line,
            expected: "See description"
          }));

          const jsSnippet = details.codeSnippets?.find((s: any) => s.langSlug === "javascript");

          allProblems.push({
            id: details.questionId,
            title: details.title,
            difficulty: details.difficulty,
            category: category,
            description: (details.content || "").replace(/<[^>]*>?/gm, ""),
            starterCode: jsSnippet ? jsSnippet.code : "function solution() {\n  // Write your code here\n}",
            codeSnippets: details.codeSnippets || [],
            testCases: testCases.length > 0 ? testCases.slice(0, 2) : [{ input: "Example input", expected: "Check description" }]
          });
        }
      }
    }

    if (allProblems.length > 0) {
      leetCodeCache = allProblems;
      lastFetchTime = Date.now();
      console.log(`Successfully cached ${allProblems.length} real LeetCode problems.`);
    } else {
      console.log("Failed to fetch LeetCode problems, using defaults.");
    }
  }

  // Initial fetch
  refreshLeetCodeCache();

  app.get("/api/problems", async (req, res) => {
    if (Date.now() - lastFetchTime > CACHE_DURATION || leetCodeCache.length === 0) {
      await refreshLeetCodeCache();
    }
    res.json(leetCodeCache);
  });

  app.post("/api/run", (req, res) => {
    const { code, input } = req.body;
    // In a real app, we'd use a sandboxed runner. 
    // For this visualizer, we'll return mock execution steps.
    res.json({ status: "success", message: "Code executed successfully" });
  });

  app.post("/api/submit", (req, res) => {
    res.json({ status: "success", message: "Problem solved!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    refreshLeetCodeCache(); // Pre-populate cache
  });
}

startServer();
