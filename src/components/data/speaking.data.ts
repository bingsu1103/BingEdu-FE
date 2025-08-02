export interface SpeakingTip {
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

export const speakingTipsData: SpeakingTip[] = [
  {
    id: 1,
    title: "Overcome Speaking Anxiety: Build Confidence Step by Step",
    excerpt:
      "Learn practical techniques to manage nervousness and speak with confidence in any situation, from casual conversations to presentations.",
    content: `
      <h3>Understanding Speaking Anxiety</h3>
      <p>Speaking anxiety is completely normal and affects even experienced speakers. The key is learning to manage it rather than eliminate it completely. Many successful speakers, including famous actors and politicians, still experience nervousness before important presentations.</p>
      
      <h3>Physical Preparation Techniques</h3>
      <p>Your body and mind are connected. When you're nervous, your body responds with increased heart rate, shallow breathing, and muscle tension. Combat these physical symptoms with proven techniques:</p>
      <ul>
        <li><strong>Deep Breathing:</strong> Practice the 4-7-8 technique - inhale for 4 counts, hold for 7, exhale for 8</li>
        <li><strong>Progressive Muscle Relaxation:</strong> Tense and release muscle groups to reduce physical tension</li>
        <li><strong>Positive Visualization:</strong> Imagine yourself speaking confidently and receiving positive feedback</li>
      </ul>
      
      <h3>Mental Preparation Strategies</h3>
      <p>Mental preparation is just as important as physical preparation. Your mindset can make or break your speaking performance:</p>
      <ul>
        <li>Prepare thoroughly - know your material inside and out</li>
        <li>Practice your opening lines until they're automatic</li>
        <li>Remember that your audience wants you to succeed</li>
        <li>Focus on your message rather than your performance</li>
        <li>Reframe nervousness as excitement and energy</li>
      </ul>
      
      <h3>Gradual Exposure Therapy</h3>
      <p>The best way to overcome speaking anxiety is through gradual, positive exposure. Start small and build up:</p>
      <ol>
        <li>Practice speaking to yourself in the mirror</li>
        <li>Record yourself speaking on familiar topics</li>
        <li>Speak in small, supportive groups</li>
        <li>Gradually increase audience size and formality</li>
        <li>Seek feedback and celebrate improvements</li>
      </ol>
      
      <h3>Emergency Techniques for High-Stress Moments</h3>
      <p>When anxiety strikes during speaking, use these quick techniques:</p>
      <ul>
        <li>Pause and take a deep breath - your audience will wait</li>
        <li>Ground yourself by feeling your feet on the floor</li>
        <li>Make eye contact with friendly faces in the audience</li>
        <li>Remember that small mistakes are rarely noticed or remembered</li>
        <li>Use humor appropriately to lighten the mood</li>
      </ul>
    `,
    readTime: "6 min read",
    author: "Dr. Lisa Thompson",
    date: "Dec 16, 2024",
    image:
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Confidence",
    difficulty: "Beginner",
    keyPoints: [
      "Practice deep breathing before speaking",
      "Start with low-pressure conversations",
      "Record yourself to identify improvement areas",
      "Focus on your message, not perfection",
      "Use positive self-talk and visualization",
    ],
    practiceExercises: [
      "Practice 4-7-8 breathing technique daily for one week",
      "Record yourself speaking for 2 minutes on a familiar topic",
      "Join a conversation group or speaking club in your area",
      "Practice speaking to yourself in the mirror for 5 minutes daily",
    ],
    tags: ["anxiety", "confidence", "beginner", "mental-preparation"],
  },
  {
    id: 2,
    title: "Pronunciation Practice: Sound Like a Native Speaker",
    excerpt:
      "Master the sounds, rhythm, and intonation patterns that will make your English more natural and easier to understand.",
    content: `
      <h3>The Foundation of Clear Speech</h3>
      <p>Good pronunciation isn't about sounding exactly like a native speaker—it's about being clearly understood. Focus on the sounds that matter most for communication and don't worry about achieving a perfect accent.</p>
      
      <h3>Mastering Individual Sounds</h3>
      <p>English has sounds that might not exist in your native language. The key is to understand how these sounds are produced:</p>
      <ul>
        <li><strong>Vowel Sounds:</strong> English has more vowel sounds than most languages. Practice distinguishing between similar sounds like /i/ and /ɪ/ (sheep vs ship)</li>
        <li><strong>Consonant Clusters:</strong> Practice combinations like 'str', 'spr', and 'thr' that can be challenging</li>
        <li><strong>Silent Letters:</strong> Learn common patterns of silent letters in English words</li>
        <li><strong>R-sounds:</strong> Master the American 'r' sound which is different from most other languages</li>
      </ul>
      
      <h3>Word Stress and Sentence Rhythm</h3>
      <p>English is a stress-timed language, meaning stressed syllables occur at regular intervals:</p>
      <ul>
        <li>Learn common word stress patterns (first syllable for nouns, second for verbs)</li>
        <li>Practice sentence stress - emphasize content words, reduce function words</li>
        <li>Use a metronome to practice maintaining steady rhythm</li>
        <li>Listen to poetry and songs to internalize English rhythm</li>
      </ul>
      
      <h3>Intonation Patterns</h3>
      <p>The melody of English conveys meaning and emotion:</p>
      <ul>
        <li><strong>Rising Intonation:</strong> Used for yes/no questions and showing uncertainty</li>
        <li><strong>Falling Intonation:</strong> Used for statements and wh-questions</li>
        <li><strong>Rising-Falling:</strong> Used for surprise or emphasis</li>
        <li><strong>Flat Intonation:</strong> Can sound bored or rude - avoid this pattern</li>
      </ul>
      
      <h3>Technology Tools for Pronunciation</h3>
      <p>Use modern technology to improve your pronunciation:</p>
      <ul>
        <li>Speech recognition apps that provide instant feedback</li>
        <li>IPA (International Phonetic Alphabet) dictionaries</li>
        <li>Slow-motion video analysis of mouth movements</li>
        <li>Recording apps to compare your speech with native speakers</li>
      </ul>
    `,
    readTime: "8 min read",
    author: "Prof. James Wilson",
    date: "Dec 14, 2024",
    image:
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Pronunciation",
    difficulty: "Intermediate",
    keyPoints: [
      "Use phonetic transcription tools",
      "Practice minimal pairs (ship vs sheep)",
      "Listen and repeat with native speakers",
      "Focus on word stress and sentence rhythm",
      "Record and compare your pronunciation",
    ],
    practiceExercises: [
      "Practice minimal pairs for 10 minutes daily",
      "Shadow native speakers (repeat immediately after hearing)",
      "Use pronunciation apps with speech recognition",
      "Record yourself reading news articles and analyze your pronunciation",
    ],
    tags: ["pronunciation", "phonetics", "accent", "clarity"],
  },
  {
    id: 3,
    title: "Fluency Building: Speak Smoothly and Naturally",
    excerpt:
      "Develop techniques to speak more fluently, reduce hesitation, and express your ideas clearly without frequent pauses.",
    content: `
      <h3>What is Fluency?</h3>
      <p>Fluency is the ability to speak smoothly and continuously. It's not about speaking fast—it's about speaking at a natural pace without unnecessary hesitation. Fluent speakers can express their thoughts clearly and maintain the flow of conversation.</p>
      
      <h3>Thinking in English</h3>
      <p>The biggest barrier to fluency is translating from your native language. Here's how to think directly in English:</p>
      <ul>
        <li>Start with simple internal monologue throughout your day</li>
        <li>Describe what you see, feel, and do in English</li>
        <li>Practice making decisions and solving problems in English</li>
        <li>Read extensively to internalize English sentence patterns</li>
        <li>Immerse yourself in English media and conversations</li>
      </ul>
      
      <h3>Building Automatic Responses</h3>
      <p>Develop a repertoire of phrases and expressions that you can use automatically:</p>
      <ul>
        <li><strong>Conversation starters:</strong> "How's it going?", "What do you think about...?"</li>
        <li><strong>Transition phrases:</strong> "Speaking of which...", "That reminds me..."</li>
        <li><strong>Opinion expressions:</strong> "In my opinion...", "I tend to think..."</li>
        <li><strong>Agreement/disagreement:</strong> "I couldn't agree more", "I see your point, but..."</li>
      </ul>
      
      <h3>Managing Hesitation</h3>
      <p>Learn to use appropriate filler words and phrases while you think:</p>
      <ul>
        <li><strong>Appropriate fillers:</strong> "Well...", "You know...", "Let me think..."</li>
        <li><strong>Buying time phrases:</strong> "That's a good question...", "How should I put this..."</li>
        <li><strong>Reformulation:</strong> "What I mean is...", "In other words..."</li>
        <li><strong>Avoid:</strong> Excessive "um", "uh", long silences</li>
      </ul>
      
      <h3>Fluency Building Exercises</h3>
      <p>Regular practice with specific exercises will improve your fluency:</p>
      <ol>
        <li><strong>Timed Speaking:</strong> Speak for 2-3 minutes without stopping on random topics</li>
        <li><strong>Shadowing:</strong> Repeat after native speakers immediately</li>
        <li><strong>Storytelling:</strong> Practice telling the same story multiple times, improving each time</li>
        <li><strong>Improvisation:</strong> Practice responding to unexpected questions or topics</li>
        <li><strong>Recording Analysis:</strong> Record yourself and identify areas for improvement</li>
      </ol>
      
      <h3>Common Fluency Mistakes to Avoid</h3>
      <ul>
        <li>Stopping to correct every small mistake</li>
        <li>Speaking too slowly in an attempt to be perfect</li>
        <li>Over-relying on translation from your native language</li>
        <li>Avoiding difficult topics or vocabulary</li>
        <li>Not practicing regularly or consistently</li>
      </ul>
    `,
    readTime: "7 min read",
    author: "Dr. Maria Garcia",
    date: "Dec 11, 2024",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Fluency",
    difficulty: "Intermediate",
    keyPoints: [
      "Practice thinking in English",
      "Use filler words appropriately",
      "Build a repertoire of common phrases",
      "Focus on communication over accuracy",
      "Practice speaking without stopping to correct mistakes",
    ],
    practiceExercises: [
      "Speak for 2 minutes without stopping on any topic",
      "Practice describing your daily routine in English",
      "Use English for internal monologue throughout the day",
      "Join conversation exchange programs online",
    ],
    tags: ["fluency", "natural-speech", "conversation", "thinking-in-english"],
  },
  {
    id: 4,
    title: "Conversation Skills: Engage Naturally in Discussions",
    excerpt:
      "Learn how to start conversations, keep them flowing, ask engaging questions, and become a more confident conversationalist.",
    content: `
      <h3>The Art of Small Talk</h3>
      <p>Small talk isn't meaningless chatter—it's the foundation of relationship building. It helps establish rapport, shows social awareness, and creates opportunities for deeper connections.</p>
      
      <h3>Universal Small Talk Topics</h3>
      <ul>
        <li><strong>Weather:</strong> Always appropriate and relatable</li>
        <li><strong>Current location:</strong> Events, restaurants, local attractions</li>
        <li><strong>Shared experiences:</strong> The event you're both attending</li>
        <li><strong>Positive current events:</strong> Avoid controversial topics initially</li>
        <li><strong>Hobbies and interests:</strong> Safe and engaging topics</li>
      </ul>
      
      <h3>Active Listening Skills</h3>
      <p>Good conversation is as much about listening as speaking:</p>
      <ul>
        <li><strong>Give full attention:</strong> Put away distractions, make eye contact</li>
        <li><strong>Show engagement:</strong> Nod, use verbal confirmations like "I see", "Really?"</li>
        <li><strong>Ask follow-up questions:</strong> Show genuine interest in their responses</li>
        <li><strong>Reflect and summarize:</strong> "So what you're saying is..."</li>
        <li><strong>Remember details:</strong> Reference earlier parts of the conversation</li>
      </ul>
      
      <h3>Asking the Right Questions</h3>
      <p>Questions are the fuel of good conversation:</p>
      <ul>
        <li><strong>Open-ended questions:</strong> "What do you think about...?" instead of "Do you like...?"</li>
        <li><strong>Follow-up questions:</strong> "How did that make you feel?" "What happened next?"</li>
        <li><strong>Opinion questions:</strong> "What's your take on...?" "How do you see...?"</li>
        <li><strong>Experience questions:</strong> "Have you ever...?" "What was it like when...?"</li>
      </ul>
      
      <h3>Sharing Your Own Experiences</h3>
      <p>Balance asking questions with sharing your own thoughts:</p>
      <ul>
        <li>Share relevant personal experiences</li>
        <li>Express your opinions respectfully</li>
        <li>Use storytelling to make your points memorable</li>
        <li>Be vulnerable appropriately to build connection</li>
        <li>Match the energy and tone of the conversation</li>
      </ul>
      
      <h3>Managing Difficult Conversation Moments</h3>
      <ul>
        <li><strong>Awkward silences:</strong> Have backup topics ready, or comment on the environment</li>
        <li><strong>Disagreements:</strong> "I see your point, though I think..." or "That's interesting, I hadn't considered that"</li>
        <li><strong>Controversial topics:</strong> Acknowledge different perspectives, redirect if necessary</li>
        <li><strong>Ending conversations:</strong> "It was great talking with you" or "I should let you get back to..."</li>
      </ul>
      
      <h3>Cultural Considerations</h3>
      <p>Understanding cultural norms helps you navigate conversations more effectively:</p>
      <ul>
        <li>Personal space and physical contact norms</li>
        <li>Appropriate topics for different relationships</li>
        <li>Turn-taking patterns in conversation</li>
        <li>Direct vs. indirect communication styles</li>
        <li>Humor and its cultural boundaries</li>
      </ul>
    `,
    readTime: "9 min read",
    author: "Prof. Robert Kim",
    date: "Dec 9, 2024",
    image:
      "https://images.pexels.com/photos/5428829/pexels-photo-5428829.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Conversation",
    difficulty: "Intermediate",
    keyPoints: [
      "Master small talk and ice breakers",
      "Ask open-ended questions",
      "Practice active listening skills",
      "Learn to express opinions diplomatically",
      "Understand cultural conversation norms",
    ],
    practiceExercises: [
      "Practice 5 different conversation starters daily",
      "Join online conversation groups or language exchanges",
      "Record conversations (with permission) and analyze your participation",
      "Practice active listening with friends and family",
    ],
    tags: ["conversation", "social-skills", "communication", "networking"],
  },
];

export const speakingCategories = [
  { id: "all", name: "All Tips", count: speakingTipsData.length },
  {
    id: "confidence",
    name: "Confidence",
    count: speakingTipsData.filter((tip) => tip.category === "Confidence")
      .length,
  },
  {
    id: "pronunciation",
    name: "Pronunciation",
    count: speakingTipsData.filter((tip) => tip.category === "Pronunciation")
      .length,
  },
  {
    id: "fluency",
    name: "Fluency",
    count: speakingTipsData.filter((tip) => tip.category === "Fluency").length,
  },
  {
    id: "conversation",
    name: "Conversation",
    count: speakingTipsData.filter((tip) => tip.category === "Conversation")
      .length,
  },
];
