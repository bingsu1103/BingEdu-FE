export interface Tip {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  keyPoints: string[];
  practiceExercises: string[];
  tags: string[];
}

export const readingTipsData: Tip[] = [
  {
    id: 1,
    title: "Pre-Reading Strategies: Set Yourself Up for Success",
    excerpt:
      "Learn how to prepare your mind before diving into any text. These proven techniques will help you understand better and retain more information.",
    content: `
      <h3>Why Pre-Reading Matters</h3>
      <p>Pre-reading is like warming up before exercise. It prepares your brain to absorb information more effectively and helps you approach texts with purpose and strategy.</p>
      
      <h3>Essential Pre-Reading Steps</h3>
      <p>Before you start reading, take a few minutes to survey the material. Look at headings, subheadings, images, and any highlighted text. This gives you a roadmap of what's to come.</p>
      
      <h3>Setting Reading Goals</h3>
      <p>Ask yourself: What do I want to learn from this text? Are you reading for general understanding, specific information, or critical analysis? Your purpose will guide your reading strategy.</p>
      
      <h3>Activating Prior Knowledge</h3>
      <p>Think about what you already know about the topic. This creates mental hooks for new information and helps you make connections as you read.</p>
    `,
    readTime: "5 min read",
    author: "Dr. Sarah Johnson",
    date: "Dec 15, 2024",
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Strategy",
    difficulty: "Beginner",
    keyPoints: [
      "Preview the text structure and headings",
      "Set clear reading goals and purposes",
      "Activate prior knowledge about the topic",
      "Predict content based on titles and images",
      "Identify text type and adjust expectations",
    ],
    practiceExercises: [
      "Practice previewing a newspaper article in 2 minutes",
      "Write down 3 things you know about a topic before reading",
      "Predict the content of a text based on its title and first paragraph",
      "Create a reading purpose statement for different text types",
    ],
    tags: ["preparation", "strategy", "comprehension", "beginner-friendly"],
  },
  {
    id: 2,
    title: "Active Reading Techniques for Better Comprehension",
    excerpt:
      "Transform your reading from passive to active with these engagement strategies that boost understanding and memory retention.",
    content: `
      <h3>What is Active Reading?</h3>
      <p>Active reading means engaging with the text through questioning, note-taking, and making connections. It's the difference between simply looking at words and truly understanding meaning.</p>
      
      <h3>The Power of Annotation</h3>
      <p>Don't just read—interact with the text. Highlight key points, write questions in margins, and summarize paragraphs in your own words.</p>
      
      <h3>Question Everything</h3>
      <p>Good readers are curious readers. Ask questions before, during, and after reading. What does this mean? How does this connect to what I already know? What evidence supports this claim?</p>
      
      <h3>Making Connections</h3>
      <p>Connect new information to your personal experiences, other texts you've read, or current events. These connections make information more memorable and meaningful.</p>
    `,
    readTime: "7 min read",
    author: "Prof. Michael Chen",
    date: "Dec 12, 2024",
    image:
      "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Technique",
    difficulty: "Intermediate",
    keyPoints: [
      "Take notes and highlight key information",
      "Ask questions while reading",
      "Summarize paragraphs in your own words",
      "Make connections to personal experiences",
      "Use graphic organizers for complex texts",
    ],
    practiceExercises: [
      "Read an article and write 5 questions about it",
      "Practice the SQ3R method (Survey, Question, Read, Recite, Review)",
      "Create a mind map while reading a complex text",
      "Write a one-sentence summary for each paragraph you read",
    ],
    tags: ["active-reading", "comprehension", "note-taking", "engagement"],
  },
  {
    id: 3,
    title: "Building Vocabulary Through Context Clues",
    excerpt:
      "Master the art of inferring word meanings from context. This skill will dramatically expand your vocabulary and reading fluency.",
    content: `
      <h3>The Context Clue Detective</h3>
      <p>When you encounter an unfamiliar word, don't immediately reach for the dictionary. Instead, become a detective and use the surrounding text to infer meaning.</p>
      
      <h3>Types of Context Clues</h3>
      <p>Definition clues provide direct explanations. Example clues show the word in action. Contrast clues show what the word is NOT. Inference clues require you to read between the lines.</p>
      
      <h3>Word Parts Strategy</h3>
      <p>Break down unfamiliar words into prefixes, roots, and suffixes. Understanding common word parts can help you decode thousands of English words.</p>
      
      <h3>Building Your Word Bank</h3>
      <p>Keep a vocabulary journal. Write new words, their meanings, and example sentences. Review regularly to move words from recognition to active use.</p>
    `,
    readTime: "6 min read",
    author: "Dr. Emma Rodriguez",
    date: "Dec 10, 2024",
    image:
      "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Vocabulary",
    difficulty: "Intermediate",
    keyPoints: [
      "Look for definition clues in the same sentence",
      "Use surrounding sentences for context",
      "Identify word parts (prefixes, roots, suffixes)",
      "Practice with diverse reading materials",
      "Keep a vocabulary journal for new words",
    ],
    practiceExercises: [
      "Find 10 unfamiliar words and guess their meanings from context",
      "Practice identifying prefixes and suffixes in academic texts",
      "Create flashcards with new vocabulary and context sentences",
      "Read texts slightly above your level to encounter new vocabulary naturally",
    ],
    tags: ["vocabulary", "context-clues", "word-building", "fluency"],
  },
  {
    id: 4,
    title: "Speed Reading: Read Faster Without Losing Comprehension",
    excerpt:
      "Discover scientifically-backed methods to increase your reading speed while maintaining or even improving your understanding.",
    content: `
      <h3>The Science of Speed Reading</h3>
      <p>Speed reading isn't about skimming or sacrificing comprehension. It's about eliminating inefficient reading habits and training your brain to process text more effectively.</p>
      
      <h3>Eliminating Subvocalization</h3>
      <p>Most people "hear" words in their head while reading. This internal voice limits your reading speed to speaking speed. Learn techniques to reduce this habit gradually.</p>
      
      <h3>Expanding Your Visual Span</h3>
      <p>Instead of reading word by word, train your eyes to take in chunks of text. This reduces the number of eye movements needed and increases reading speed.</p>
      
      <h3>The Importance of Practice</h3>
      <p>Like any skill, speed reading requires consistent practice. Start with easier texts and gradually work up to more complex material as your skills improve.</p>
    `,
    readTime: "8 min read",
    author: "Dr. David Park",
    date: "Dec 8, 2024",
    image:
      "https://images.pexels.com/photos/2228561/pexels-photo-2228561.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Speed",
    difficulty: "Advanced",
    keyPoints: [
      "Eliminate subvocalization gradually",
      "Use your finger or pen as a pacer",
      "Practice chunking words together",
      "Avoid regression (re-reading unnecessarily)",
      "Adjust speed based on text difficulty and purpose",
    ],
    practiceExercises: [
      "Practice reading with a metronome to maintain steady pace",
      "Use a pointer to guide your eyes and prevent regression",
      "Time yourself reading different types of texts",
      "Practice peripheral vision exercises to expand visual span",
    ],
    tags: ["speed-reading", "efficiency", "advanced", "technique"],
  },
  {
    id: 5,
    title: "Critical Reading: Analyze and Evaluate What You Read",
    excerpt:
      "Develop the skills to read between the lines, question assumptions, and form your own informed opinions about complex texts.",
    content: `
      <h3>Beyond Surface Reading</h3>
      <p>Critical reading goes beyond understanding what the author says to evaluating how and why they say it. It's about becoming an active participant in the conversation.</p>
      
      <h3>Identifying Author's Purpose and Bias</h3>
      <p>Every text has a purpose and perspective. Learn to identify the author's intent, target audience, and potential biases that might influence their presentation of information.</p>
      
      <h3>Evaluating Evidence and Arguments</h3>
      <p>Not all information is created equal. Develop skills to assess the quality of evidence, identify logical fallacies, and distinguish between fact and opinion.</p>
      
      <h3>Forming Your Own Conclusions</h3>
      <p>Critical reading empowers you to form independent judgments. Compare multiple sources, consider alternative viewpoints, and develop your own informed opinions.</p>
    `,
    readTime: "9 min read",
    author: "Prof. Lisa Wang",
    date: "Dec 6, 2024",
    image:
      "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Analysis",
    difficulty: "Advanced",
    keyPoints: [
      "Question the author's assumptions and claims",
      "Identify bias and perspective in texts",
      "Evaluate the quality and relevance of evidence",
      "Compare multiple sources on the same topic",
      "Form independent conclusions based on analysis",
    ],
    practiceExercises: [
      "Read opinion articles and identify the author's main argument and supporting evidence",
      "Compare how different news sources report the same event",
      "Practice identifying logical fallacies in persuasive texts",
      "Write critical responses to articles you disagree with",
    ],
    tags: ["critical-thinking", "analysis", "evaluation", "advanced"],
  },
  {
    id: 6,
    title: "Reading Academic Texts: Strategies for Complex Material",
    excerpt:
      "Navigate dense academic writing with confidence. Learn specialized techniques for understanding research papers, textbooks, and scholarly articles.",
    content: `
      <h3>Understanding Academic Writing Style</h3>
      <p>Academic texts have unique characteristics: formal tone, specialized vocabulary, complex sentence structures, and dense information. Understanding these features helps you approach them strategically.</p>
      
      <h3>The IMRAD Structure</h3>
      <p>Many academic papers follow the IMRAD format: Introduction, Methods, Results, and Discussion. Knowing this structure helps you navigate and locate specific information quickly.</p>
      
      <h3>Dealing with Technical Vocabulary</h3>
      <p>Academic texts are rich with discipline-specific terminology. Create glossaries, use context clues, and don't hesitate to look up key terms that appear repeatedly.</p>
      
      <h3>Reading Strategies for Dense Texts</h3>
      <p>Use techniques like reading abstracts first, focusing on topic sentences, and creating concept maps to organize complex information and relationships between ideas.</p>
    `,
    readTime: "10 min read",
    author: "Dr. Robert Kim",
    date: "Dec 4, 2024",
    image:
      "https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Academic",
    difficulty: "Advanced",
    keyPoints: [
      "Understand the structure of academic papers",
      "Create glossaries for technical terms",
      "Focus on abstracts and conclusions first",
      "Use concept maps for complex relationships",
      "Read with specific questions in mind",
    ],
    practiceExercises: [
      "Practice reading research paper abstracts and predicting content",
      "Create concept maps for complex academic chapters",
      "Build discipline-specific vocabulary lists",
      "Practice summarizing academic arguments in simple language",
    ],
    tags: ["academic-reading", "research", "complex-texts", "study-skills"],
  },
];

export const readingCategories = [
  { id: "all", name: "All Tips", count: readingTipsData.length },
  {
    id: "strategy",
    name: "Strategy",
    count: readingTipsData.filter((tip) => tip.category === "Strategy").length,
  },
  {
    id: "technique",
    name: "Technique",
    count: readingTipsData.filter((tip) => tip.category === "Technique").length,
  },
  {
    id: "vocabulary",
    name: "Vocabulary",
    count: readingTipsData.filter((tip) => tip.category === "Vocabulary")
      .length,
  },
  {
    id: "speed",
    name: "Speed",
    count: readingTipsData.filter((tip) => tip.category === "Speed").length,
  },
  {
    id: "analysis",
    name: "Analysis",
    count: readingTipsData.filter((tip) => tip.category === "Analysis").length,
  },
  {
    id: "academic",
    name: "Academic",
    count: readingTipsData.filter((tip) => tip.category === "Academic").length,
  },
];
