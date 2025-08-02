export interface WritingTip {
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

export const writingTipsData: WritingTip[] = [
  {
    id: 1,
    title: "Essay Structure: Build Strong Arguments That Persuade",
    excerpt:
      "Master the art of organizing your thoughts into compelling essays. Learn how to create introductions that hook, bodies that convince, and conclusions that inspire.",
    content: `
      <h3>The Foundation of Great Essays</h3>
      <p>A well-structured essay is like a well-built house—it needs a strong foundation, solid framework, and attractive finishing touches. Every great essay follows a logical progression that guides readers from introduction to conclusion.</p>
      
      <h3>Crafting Compelling Introductions</h3>
      <p>Your introduction is your first and often only chance to capture your reader's attention:</p>
      <ul>
        <li><strong>Hook:</strong> Start with a surprising fact, thought-provoking question, or compelling anecdote</li>
        <li><strong>Context:</strong> Provide necessary background information</li>
        <li><strong>Thesis Statement:</strong> Clearly state your main argument or position</li>
        <li><strong>Preview:</strong> Briefly outline what your essay will cover</li>
      </ul>
      
      <h3>Building Strong Body Paragraphs</h3>
      <p>Each body paragraph should focus on one main idea that supports your thesis:</p>
      <ul>
        <li><strong>Topic Sentence:</strong> Clearly state the paragraph's main point</li>
        <li><strong>Evidence:</strong> Provide facts, examples, quotes, or statistics</li>
        <li><strong>Analysis:</strong> Explain how the evidence supports your argument</li>
        <li><strong>Transition:</strong> Connect to the next paragraph smoothly</li>
      </ul>
      
      <h3>Types of Evidence</h3>
      <p>Strong arguments require strong evidence:</p>
      <ul>
        <li><strong>Statistical Data:</strong> Numbers and research findings</li>
        <li><strong>Expert Opinions:</strong> Quotes from authorities in the field</li>
        <li><strong>Historical Examples:</strong> Relevant events from the past</li>
        <li><strong>Personal Anecdotes:</strong> Relevant personal experiences (use sparingly)</li>
        <li><strong>Logical Reasoning:</strong> Step-by-step logical arguments</li>
      </ul>
      
      <h3>Addressing Counterarguments</h3>
      <p>Acknowledging opposing viewpoints strengthens your argument:</p>
      <ul>
        <li>Present the strongest counterargument fairly</li>
        <li>Explain why it's insufficient or incorrect</li>
        <li>Reinforce your original position</li>
        <li>Show that you've considered multiple perspectives</li>
      </ul>
      
      <h3>Writing Powerful Conclusions</h3>
      <p>Your conclusion should leave a lasting impression:</p>
      <ul>
        <li><strong>Restate Thesis:</strong> Remind readers of your main argument (don't just copy)</li>
        <li><strong>Summarize Key Points:</strong> Briefly review your main supporting arguments</li>
        <li><strong>Broader Implications:</strong> Explain why your argument matters</li>
        <li><strong>Call to Action:</strong> Tell readers what they should do with this information</li>
      </ul>
      
      <h3>Common Essay Structure Mistakes</h3>
      <ul>
        <li>Weak or missing thesis statements</li>
        <li>Body paragraphs that don't support the thesis</li>
        <li>Insufficient evidence or analysis</li>
        <li>Poor transitions between ideas</li>
        <li>Conclusions that introduce new information</li>
      </ul>
    `,
    readTime: "10 min read",
    author: "Dr. Amanda Foster",
    date: "Dec 17, 2024",
    image:
      "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Academic",
    difficulty: "Intermediate",
    keyPoints: [
      "Create compelling thesis statements",
      "Use topic sentences effectively",
      "Support arguments with evidence",
      "Write powerful conclusions",
      "Address counterarguments",
    ],
    practiceExercises: [
      "Write 5 different hooks for the same essay topic",
      "Practice writing thesis statements for controversial topics",
      "Analyze the structure of published essays in your field",
      "Write body paragraphs using the PEEL method (Point, Evidence, Explain, Link)",
    ],
    tags: ["essay-writing", "academic", "structure", "argumentation"],
  },
  {
    id: 2,
    title: "Grammar Mastery: Write with Confidence and Clarity",
    excerpt:
      "Eliminate common grammar mistakes and write with professional precision. Focus on the rules that matter most for clear communication.",
    content: `
      <h3>Why Grammar Matters</h3>
      <p>Good grammar isn't about following arbitrary rules—it's about clear communication. When your grammar is correct, readers can focus on your ideas rather than being distracted by errors.</p>
      
      <h3>Subject-Verb Agreement</h3>
      <p>One of the most common grammar errors, but easy to fix with practice:</p>
      <ul>
        <li><strong>Singular subjects take singular verbs:</strong> "The student writes well."</li>
        <li><strong>Plural subjects take plural verbs:</strong> "The students write well."</li>
        <li><strong>Compound subjects:</strong> "John and Mary are coming." (plural verb)</li>
        <li><strong>Collective nouns:</strong> "The team is winning." (usually singular)</li>
        <li><strong>Indefinite pronouns:</strong> "Everyone is here." (singular)</li>
      </ul>
      
      <h3>Mastering Verb Tenses</h3>
      <p>Use the right tense to show when actions happen:</p>
      <ul>
        <li><strong>Present Simple:</strong> Habits, facts, general truths</li>
        <li><strong>Present Continuous:</strong> Actions happening now</li>
        <li><strong>Past Simple:</strong> Completed actions in the past</li>
        <li><strong>Present Perfect:</strong> Past actions with present relevance</li>
        <li><strong>Future:</strong> Will, going to, present continuous for plans</li>
      </ul>
      
      <h3>Punctuation That Makes a Difference</h3>
      <p>Proper punctuation guides readers through your ideas:</p>
      <ul>
        <li><strong>Commas:</strong> Separate items in lists, join independent clauses with conjunctions</li>
        <li><strong>Semicolons:</strong> Connect related independent clauses</li>
        <li><strong>Colons:</strong> Introduce lists, explanations, or quotes</li>
        <li><strong>Apostrophes:</strong> Show possession (John's book) or contractions (don't)</li>
        <li><strong>Quotation marks:</strong> Direct speech and titles of short works</li>
      </ul>
      
      <h3>Avoiding Sentence Fragments and Run-ons</h3>
      <p>Every sentence needs a subject and predicate:</p>
      <ul>
        <li><strong>Fragment:</strong> "Because I was tired." (incomplete thought)</li>
        <li><strong>Complete:</strong> "I went to bed early because I was tired."</li>
        <li><strong>Run-on:</strong> "I was tired I went to bed early."</li>
        <li><strong>Corrected:</strong> "I was tired, so I went to bed early."</li>
      </ul>
      
      <h3>Pronoun Usage and Agreement</h3>
      <p>Pronouns must agree with their antecedents:</p>
      <ul>
        <li><strong>Number agreement:</strong> "Each student brought his or her book."</li>
        <li><strong>Gender-neutral options:</strong> "Each student brought their book." (increasingly accepted)</li>
        <li><strong>Clear antecedents:</strong> Make sure it's clear what the pronoun refers to</li>
        <li><strong>Consistent point of view:</strong> Don't switch between "you" and "one"</li>
      </ul>
      
      <h3>Common Grammar Mistakes to Avoid</h3>
      <ul>
        <li><strong>Its vs. It's:</strong> "Its" is possessive, "it's" is a contraction</li>
        <li><strong>Your vs. You're:</strong> "Your" is possessive, "you're" is a contraction</li>
        <li><strong>There, Their, They're:</strong> Location, possession, contraction</li>
        <li><strong>Affect vs. Effect:</strong> "Affect" is usually a verb, "effect" is usually a noun</li>
        <li><strong>Who vs. Whom:</strong> "Who" is subject, "whom" is object</li>
      </ul>
      
      <h3>Grammar Checking Strategies</h3>
      <ul>
        <li>Read your writing aloud to catch errors</li>
        <li>Use grammar checking tools, but don't rely on them completely</li>
        <li>Learn your personal error patterns and check for them specifically</li>
        <li>Have someone else proofread important documents</li>
        <li>Keep a grammar reference book or reliable website bookmarked</li>
      </ul>
    `,
    readTime: "8 min read",
    author: "Prof. John Martinez",
    date: "Dec 15, 2024",
    image:
      "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grammar",
    difficulty: "Beginner",
    keyPoints: [
      "Master subject-verb agreement",
      "Use punctuation correctly",
      "Avoid sentence fragments and run-ons",
      "Choose the right verb tenses",
      "Ensure pronoun agreement",
    ],
    practiceExercises: [
      "Practice identifying and correcting common grammar errors",
      "Write sentences using different verb tenses correctly",
      "Proofread sample texts for grammar mistakes",
      "Create your own grammar reference sheet for common errors",
    ],
    tags: ["grammar", "punctuation", "sentence-structure", "proofreading"],
  },
  {
    id: 3,
    title: "Creative Writing: Unleash Your Storytelling Potential",
    excerpt:
      "Develop your creative voice and learn techniques for engaging storytelling. From character development to plot structure, master the craft of creative writing.",
    content: `
      <h3>Finding Your Creative Voice</h3>
      <p>Your creative voice is what makes your writing uniquely yours. It's the combination of your perspective, style, and the way you see the world. Developing this voice takes time and practice, but it's what will set your writing apart.</p>
      
      <h3>Character Development</h3>
      <p>Compelling characters are the heart of great stories:</p>
      <ul>
        <li><strong>Backstory:</strong> Create detailed histories for your characters, even if you don't use all of it</li>
        <li><strong>Motivation:</strong> What does your character want? What drives them?</li>
        <li><strong>Flaws:</strong> Perfect characters are boring—give them realistic weaknesses</li>
        <li><strong>Growth:</strong> How will your character change throughout the story?</li>
        <li><strong>Voice:</strong> Each character should have a distinct way of speaking and thinking</li>
      </ul>
      
      <h3>Plot Structure and Pacing</h3>
      <p>A well-structured plot keeps readers engaged:</p>
      <ul>
        <li><strong>Setup:</strong> Introduce characters, setting, and initial situation</li>
        <li><strong>Inciting Incident:</strong> The event that starts the main conflict</li>
        <li><strong>Rising Action:</strong> Building tension and complications</li>
        <li><strong>Climax:</strong> The turning point or moment of highest tension</li>
        <li><strong>Resolution:</strong> How conflicts are resolved and loose ends tied up</li>
      </ul>
      
      <h3>Creating Engaging Dialogue</h3>
      <p>Good dialogue serves multiple purposes:</p>
      <ul>
        <li><strong>Reveals character:</strong> How someone speaks shows who they are</li>
        <li><strong>Advances plot:</strong> Conversations should move the story forward</li>
        <li><strong>Sounds natural:</strong> Read dialogue aloud to check if it flows</li>
        <li><strong>Has subtext:</strong> Characters don't always say exactly what they mean</li>
        <li><strong>Varies by character:</strong> Each person should have a unique speaking style</li>
      </ul>
      
      <h3>Show, Don't Tell</h3>
      <p>One of the most important principles in creative writing:</p>
      <ul>
        <li><strong>Instead of:</strong> "Sarah was angry."</li>
        <li><strong>Try:</strong> "Sarah slammed the door and clenched her fists."</li>
        <li><strong>Use sensory details:</strong> What can characters see, hear, smell, taste, touch?</li>
        <li><strong>Action reveals character:</strong> Show personality through behavior</li>
        <li><strong>Let readers infer:</strong> Trust your audience to understand implications</li>
      </ul>
      
      <h3>Setting and World-Building</h3>
      <p>Create vivid, believable worlds for your stories:</p>
      <ul>
        <li><strong>Research:</strong> Even fantasy worlds need internal consistency</li>
        <li><strong>Sensory details:</strong> Help readers experience the setting</li>
        <li><strong>Mood:</strong> Use setting to reinforce the story's emotional tone</li>
        <li><strong>Symbolism:</strong> Settings can represent themes or character states</li>
        <li><strong>Relevance:</strong> Every detail should serve the story</li>
      </ul>
      
      <h3>Overcoming Writer's Block</h3>
      <p>Every writer faces creative obstacles:</p>
      <ul>
        <li><strong>Freewriting:</strong> Write continuously for 10-15 minutes without stopping</li>
        <li><strong>Change perspective:</strong> Try writing from a different character's viewpoint</li>
        <li><strong>Writing prompts:</strong> Use external inspiration to spark ideas</li>
        <li><strong>Take breaks:</strong> Sometimes stepping away helps ideas percolate</li>
        <li><strong>Lower standards:</strong> Give yourself permission to write badly first</li>
      </ul>
      
      <h3>The Revision Process</h3>
      <p>Great writing is rewriting:</p>
      <ul>
        <li><strong>First draft:</strong> Focus on getting the story down</li>
        <li><strong>Second draft:</strong> Work on structure and major plot issues</li>
        <li><strong>Third draft:</strong> Polish language, dialogue, and descriptions</li>
        <li><strong>Final draft:</strong> Proofread for grammar and typos</li>
        <li><strong>Get feedback:</strong> Fresh eyes can spot issues you've missed</li>
      </ul>
    `,
    readTime: "12 min read",
    author: "Sarah Mitchell",
    date: "Dec 13, 2024",
    image:
      "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Creative",
    difficulty: "Intermediate",
    keyPoints: [
      "Develop compelling characters",
      "Create engaging dialogue",
      "Use descriptive language effectively",
      "Build tension and conflict",
      "Master the revision process",
    ],
    practiceExercises: [
      "Write character profiles for three different personality types",
      "Practice writing dialogue between characters with conflicting goals",
      "Describe the same setting from three different characters' perspectives",
      "Write a short story using only dialogue and action (no exposition)",
    ],
    tags: [
      "creative-writing",
      "storytelling",
      "character-development",
      "dialogue",
    ],
  },
  {
    id: 4,
    title: "Business Writing: Communicate Professionally and Effectively",
    excerpt:
      "Learn to write emails, reports, and proposals that get results. Master the tone, structure, and style needed for professional success.",
    content: `
      <h3>The Importance of Professional Communication</h3>
      <p>In the business world, your writing represents you and your organization. Clear, professional communication builds credibility, saves time, and helps achieve business objectives.</p>
      
      <h3>Email Excellence</h3>
      <p>Email is the backbone of business communication:</p>
      <ul>
        <li><strong>Subject Lines:</strong> Be specific and actionable ("Meeting Request: Q4 Budget Review - Dec 20")</li>
        <li><strong>Opening:</strong> Use appropriate greetings based on relationship and culture</li>
        <li><strong>Body:</strong> Lead with the main point, then provide supporting details</li>
        <li><strong>Closing:</strong> Include clear next steps and professional sign-off</li>
        <li><strong>Tone:</strong> Professional but not overly formal; match your audience</li>
      </ul>
      
      <h3>Report Writing Structure</h3>
      <p>Effective reports follow a logical structure:</p>
      <ul>
        <li><strong>Executive Summary:</strong> Key findings and recommendations (write this last)</li>
        <li><strong>Introduction:</strong> Purpose, scope, and methodology</li>
        <li><strong>Findings:</strong> Present data and analysis objectively</li>
        <li><strong>Conclusions:</strong> What the findings mean</li>
        <li><strong>Recommendations:</strong> Specific, actionable next steps</li>
        <li><strong>Appendices:</strong> Supporting data and detailed information</li>
      </ul>
      
      <h3>Proposal Writing That Wins</h3>
      <p>Successful proposals address client needs directly:</p>
      <ul>
        <li><strong>Problem Statement:</strong> Clearly define what needs to be solved</li>
        <li><strong>Proposed Solution:</strong> How you'll address the problem</li>
        <li><strong>Benefits:</strong> What the client will gain</li>
        <li><strong>Timeline:</strong> Realistic project schedule</li>
        <li><strong>Budget:</strong> Clear, justified costs</li>
        <li><strong>Qualifications:</strong> Why you're the right choice</li>
      </ul>
      
      <h3>Choosing the Right Tone</h3>
      <p>Your tone should match your audience and purpose:</p>
      <ul>
        <li><strong>Formal:</strong> Legal documents, official reports, external communications</li>
        <li><strong>Professional:</strong> Most business communications</li>
        <li><strong>Conversational:</strong> Internal team communications, familiar colleagues</li>
        <li><strong>Persuasive:</strong> Sales materials, proposals, recommendations</li>
        <li><strong>Informative:</strong> Instructions, procedures, factual reports</li>
      </ul>
      
      <h3>Clarity and Conciseness</h3>
      <p>Business readers value their time:</p>
      <ul>
        <li><strong>Use active voice:</strong> "We completed the project" vs. "The project was completed"</li>
        <li><strong>Choose strong verbs:</strong> "Implement" instead of "put into place"</li>
        <li><strong>Eliminate redundancy:</strong> "End result" is just "result"</li>
        <li><strong>Use bullet points:</strong> Break up dense text for easier scanning</li>
        <li><strong>Front-load information:</strong> Put the most important points first</li>
      </ul>
      
      <h3>Visual Design for Business Documents</h3>
      <p>Good design enhances readability:</p>
      <ul>
        <li><strong>White space:</strong> Don't cram too much on a page</li>
        <li><strong>Headings:</strong> Use consistent formatting to organize information</li>
        <li><strong>Fonts:</strong> Stick to professional, readable fonts</li>
        <li><strong>Charts and graphs:</strong> Visualize data when appropriate</li>
        <li><strong>Consistent formatting:</strong> Maintain the same style throughout</li>
      </ul>
      
      <h3>Proofreading and Quality Control</h3>
      <p>Errors undermine credibility:</p>
      <ul>
        <li><strong>Take a break:</strong> Step away before proofreading</li>
        <li><strong>Read aloud:</strong> Catch awkward phrasing and missing words</li>
        <li><strong>Check facts:</strong> Verify names, dates, and figures</li>
        <li><strong>Use spell check:</strong> But don't rely on it completely</li>
        <li><strong>Get a second opinion:</strong> Have someone else review important documents</li>
      </ul>
      
      <h3>Digital Communication Best Practices</h3>
      <ul>
        <li>Respond to emails within 24-48 hours</li>
        <li>Use "Reply All" judiciously</li>
        <li>Keep attachments to a reasonable size</li>
        <li>Use clear file names for attachments</li>
        <li>Consider time zones when sending messages</li>
        <li>Be mindful of cultural differences in communication styles</li>
      </ul>
    `,
    readTime: "9 min read",
    author: "Kevin Brown",
    date: "Dec 11, 2024",
    image:
      "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Business",
    difficulty: "Intermediate",
    keyPoints: [
      "Write clear and concise emails",
      "Structure reports professionally",
      "Use appropriate business tone",
      "Proofread and edit effectively",
      "Design documents for readability",
    ],
    practiceExercises: [
      "Rewrite a poorly structured email to make it more professional",
      "Practice writing executive summaries for different types of reports",
      "Create templates for common business communications",
      "Analyze successful business proposals in your industry",
    ],
    tags: [
      "business-writing",
      "professional-communication",
      "emails",
      "reports",
    ],
  },
];

export const writingCategories = [
  { id: "all", name: "All Tips", count: writingTipsData.length },
  {
    id: "academic",
    name: "Academic",
    count: writingTipsData.filter((tip) => tip.category === "Academic").length,
  },
  {
    id: "grammar",
    name: "Grammar",
    count: writingTipsData.filter((tip) => tip.category === "Grammar").length,
  },
  {
    id: "creative",
    name: "Creative",
    count: writingTipsData.filter((tip) => tip.category === "Creative").length,
  },
  {
    id: "business",
    name: "Business",
    count: writingTipsData.filter((tip) => tip.category === "Business").length,
  },
];
