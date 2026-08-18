export interface Reel {
  id: string;
  title: string;
  creator: string;
  videoUrl?: string;
  thumbnailGradient: string;
  categoryTag: string;
  keywords: string[];
  durationSeconds: number;
  transcript: string;
  visualSummary: string;
  isHypeContent?: boolean;
  isTrapReel?: boolean;
  defaultMetrics: {
    watchTimePercent: number; // 0 to 100
    liked: boolean;
    saved: boolean;
    replayed: boolean;
  };
}

export interface TechRecommendation {
  id: string;
  title: string;
  category: 'AI' | 'DSA' | 'Java' | 'HLD' | 'Cybersecurity' | 'Cloud' | 'Hardware' | 'Career' | 'Other';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  whyItMatters: string;
  prerequisites: string[];
  isHypeFree: boolean;
  estimatedMinutes: number;
  thumbnailGradient: string;
  codeSnippet?: string;
}

export const SAMPLE_INPUT_REELS: Reel[] = [
  {
    id: 'trap-java-meme',
    title: 'When your NullPointerException hits at 4:59 PM on Friday 😭 #java #codinghumor',
    creator: '@DevMemesDaily',
    thumbnailGradient: 'from-amber-600 to-red-700',
    categoryTag: 'Programming Memes',
    keywords: ['Java', 'NullPointerException', 'Bug', 'Friday', 'Coding Joke'],
    durationSeconds: 15,
    transcript: "Wait... why is production crashing? Checks logs: java.lang.NullPointerException at line 142. Screams into pillow as boss calls.",
    visualSummary: "Guy panicking at laptop screen, dramatics with slow-motion scream, Java logo overlay.",
    isTrapReel: true,
    defaultMetrics: { watchTimePercent: 95, liked: true, saved: false, replayed: true }
  },
  {
    id: 'trap-lifestyle-se',
    title: 'Day in the life of a FAANG Software Engineer: 4 iced lattes & 2 lines of code ☕💻',
    creator: '@TechBroVlogs',
    thumbnailGradient: 'from-blue-600 to-indigo-800',
    categoryTag: 'Career & Lifestyle',
    keywords: ['Software Engineer', 'FAANG', 'Day in the Life', 'Tech Perks', 'Coding'],
    durationSeconds: 30,
    transcript: "Wake up at 10 AM, grab matcha latte at free cafeteria, play ping pong with team, review one pull request, write system architecture doc, leave at 4 PM.",
    visualSummary: "Cinematic camera angles of modern tech campus, micro-kitchen snacks, sleek MacBook Pro setup.",
    isTrapReel: true,
    defaultMetrics: { watchTimePercent: 100, liked: true, saved: true, replayed: false }
  },
  {
    id: 'trap-interview-joke',
    title: 'Inverting a Binary Tree in 5s vs Centering a Div in CSS 💀',
    creator: '@AlgoWizard',
    thumbnailGradient: 'from-purple-600 to-pink-700',
    categoryTag: 'Coding Jokes',
    keywords: ['Binary Tree', 'DSA', 'CSS', 'Coding Interview', 'LeetCode'],
    durationSeconds: 20,
    transcript: "Interviewer: Can you invert a binary tree? Me: Easy, recursion left/right swap! Interviewer: Great, now center this div without flexbox. Me: Sweats profusely.",
    visualSummary: "Split screen comparing confident algorithm whiteboard drawing vs staring blankly at HTML/CSS.",
    isTrapReel: true,
    defaultMetrics: { watchTimePercent: 90, liked: true, saved: false, replayed: true }
  },
  {
    id: 'trap-laptop-hardware',
    title: 'M3 Max vs Snapdragon X Elite: Which laptop compiles C++ and Rust faster? 💻⚡',
    creator: '@HardwareBytes',
    thumbnailGradient: 'from-cyan-600 to-blue-900',
    categoryTag: 'Hardware',
    keywords: ['Hardware', 'M3 Max', 'Snapdragon', 'Compiler Speed', 'Laptop', 'CPU'],
    durationSeconds: 45,
    transcript: "We tested LLVM build times on Apple Silicon vs ARM Windows. Here is the compilation benchmark across multi-core workloads and thermal throttling curves.",
    visualSummary: "Side-by-side laptop stress test graphs, compilation timers running, CPU core heat maps.",
    isTrapReel: true,
    defaultMetrics: { watchTimePercent: 85, liked: true, saved: true, replayed: false }
  },
  {
    id: 'gaming-physics',
    title: 'Unreal Engine 5 Chaos Physics engine break in GTA 6 graphics leak 🎮',
    creator: '@GamerZoneHD',
    thumbnailGradient: 'from-emerald-600 to-teal-900',
    categoryTag: 'Gaming & Entertainment',
    keywords: ['Gaming', 'Unreal Engine', 'Physics Engine', 'GTA 6', 'Graphics'],
    durationSeconds: 25,
    transcript: "Look at how soft body vehicle damage deformation works in real-time ray tracing using Chaos physics sub-stepping!",
    visualSummary: "3D car collision physics mesh in slow motion with wireframe overlay.",
    defaultMetrics: { watchTimePercent: 70, liked: false, saved: false, replayed: false }
  },
  {
    id: 'ai-hype-clickbait',
    title: '10 SECRET AI Tools that will replace Software Engineers & make you $10,000/mo! 🚀💰',
    creator: '@HypeGrindAI',
    thumbnailGradient: 'from-yellow-500 to-orange-700',
    categoryTag: 'AI Hype / Clickbait',
    keywords: ['AI Tools', 'Get Rich', 'Replace Developers', 'Hype', 'No Code'],
    durationSeconds: 40,
    transcript: "Stop learning Java or Python! These 10 secret AI websites do all the coding for you while you sleep!",
    visualSummary: "Fast flashy text, money rain graphics, generic automated UI scrolling.",
    isHypeContent: true,
    defaultMetrics: { watchTimePercent: 20, liked: false, saved: false, replayed: false }
  },
  {
    id: 'cybersecurity-sql',
    title: 'How a 19-year-old hacker leaked 1 Million records using a simple SQL Injection 🔓',
    creator: '@CyberSecExplains',
    thumbnailGradient: 'from-rose-600 to-red-950',
    categoryTag: 'Cybersecurity',
    keywords: ['Cybersecurity', 'SQL Injection', 'Hacking', 'Database', 'Web Security'],
    durationSeconds: 35,
    transcript: "The login form didn't sanitize input. Entering `' OR '1'='1` bypassed authentication entirely because the query string evaluated to true.",
    visualSummary: "Terminal screen showing SQL query string manipulation and database tables dropping.",
    defaultMetrics: { watchTimePercent: 88, liked: true, saved: true, replayed: false }
  },
  {
    id: 'tech-news-gpt5',
    title: 'OpenAI Autonomous Agents: What SWEs need to know about the next paradigm shift 🤖',
    creator: '@TechPulseNews',
    thumbnailGradient: 'from-indigo-600 to-purple-900',
    categoryTag: 'Tech News & AI',
    keywords: ['AI', 'Tech News', 'Autonomous Agents', 'Software Engineering', 'Future of Work'],
    durationSeconds: 50,
    transcript: "AI models are shifting from chatbot prompts to asynchronous task-execution loops. Here is how software architecture is adapting for tool-calling agents.",
    visualSummary: "Diagram showing LLM agent loops, API tool calls, and background message queues.",
    defaultMetrics: { watchTimePercent: 80, liked: true, saved: false, replayed: false }
  }
];

export const CURATED_TECH_RECOMMENDATIONS: TechRecommendation[] = [
  {
    id: 'rec-dsa-hashmap',
    title: 'Data Structures in Action: How HashMap Bucket Indexing & Collisions Work Under the Hood',
    category: 'DSA',
    difficulty: 'Intermediate',
    summary: 'Visual breakdown of array bucket calculation via hash functions, linked-list chaining, and red-black tree conversion in modern JVMs.',
    whyItMatters: 'Moves from superficial Java syntax to deep algorithmic understanding of O(1) average lookup performance.',
    prerequisites: ['Basic Arrays', 'Hash functions'],
    isHypeFree: true,
    estimatedMinutes: 3,
    thumbnailGradient: 'from-blue-600 to-cyan-800',
    codeSnippet: `int index = (n - 1) & hash;\n// Bucket indexing calculation in java.util.HashMap`
  },
  {
    id: 'rec-hld-discord',
    title: 'High Level Design: How Discord Scaled to 11 Million Concurrent WebSockets',
    category: 'HLD',
    difficulty: 'Advanced',
    summary: 'Architecture deep dive into Elixir gateway nodes, Erlang OTP processes, and Go microservices handling real-time voice and message routing.',
    whyItMatters: 'Connects interest in software engineer lifestyle with real-world enterprise infrastructure engineering.',
    prerequisites: ['TCP/WebSockets', 'Basic Distributed Systems'],
    isHypeFree: true,
    estimatedMinutes: 4,
    thumbnailGradient: 'from-purple-700 to-indigo-900',
    codeSnippet: `// WebSocket connection pooling & distributed Erlang pub-sub`
  },
  {
    id: 'rec-java-jvm-memory',
    title: 'JVM Memory Internals: Stack vs Heap, Metaspace, and Garbage Collector Mark-Sweep',
    category: 'Java',
    difficulty: 'Intermediate',
    summary: 'Deep dive into why NullPointerExceptions happen, object memory allocation in Young/Old generation, and GC pause optimizations.',
    whyItMatters: 'Transforms Java bug memes into true systems insight into memory lifecycle and diagnostic tooling.',
    prerequisites: ['Basic Java syntax', 'Variables & References'],
    isHypeFree: true,
    estimatedMinutes: 3,
    thumbnailGradient: 'from-amber-600 to-orange-800',
    codeSnippet: `// Stack frame stores primitives & references -> Heap stores actual Object data`
  },
  {
    id: 'rec-hardware-cpu-cache',
    title: 'Why Cache Lines & L1/L2/L3 Bottlenecks Slow Down Compiler Workloads',
    category: 'Hardware',
    difficulty: 'Advanced',
    summary: 'Explains how CPU memory hierarchy (32KB L1 vs DDR5 RAM access latencies) impacts compilation performance on Apple M3 vs ARM chips.',
    whyItMatters: 'Directly addresses hardware curiosity by teaching spatial/temporal locality and cache alignment principles.',
    prerequisites: ['Basic CPU awareness', 'Compilation process'],
    isHypeFree: true,
    estimatedMinutes: 3,
    thumbnailGradient: 'from-emerald-700 to-teal-900',
    codeSnippet: `// 64-byte Cache Line alignment prevents false sharing across CPU cores`
  },
  {
    id: 'rec-ai-transformer-attention',
    title: 'How Attention Mechanisms Work Mathematically: Q, K, V Matrices Explained Simply',
    category: 'AI',
    difficulty: 'Intermediate',
    summary: 'Rigorous 3-minute explanation of Scaled Dot-Product Attention without hype or buzzwords.',
    whyItMatters: 'Provides genuine AI engineering depth rather than superficial tool roundups or get-rich clickbait.',
    prerequisites: ['Matrix multiplication', 'Basic Vectors'],
    isHypeFree: true,
    estimatedMinutes: 3,
    thumbnailGradient: 'from-violet-600 to-purple-900',
    codeSnippet: `Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V`
  },
  {
    id: 'rec-sec-prepared-statements',
    title: 'Preventing SQL Injection: Parameterized Queries & AST Parsing in Web Backend Security',
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    summary: 'Walkthrough of how SQL query parsers treat inputs as literal scalar values rather than executable syntax tree nodes.',
    whyItMatters: 'Extends cybersecurity interest into actionable defensive coding practices.',
    prerequisites: ['Basic SQL queries'],
    isHypeFree: true,
    estimatedMinutes: 2,
    thumbnailGradient: 'from-red-600 to-rose-900',
    codeSnippet: `PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE user = ?");`
  },
  {
    id: 'rec-career-swe-levels',
    title: 'Software Engineer Leveling Demystified: Junior vs Senior vs Staff Architect Responsibilities',
    category: 'Career',
    difficulty: 'Beginner',
    summary: 'Actionable career roadmap breaking down code ownership, technical debt management, and system design scope.',
    whyItMatters: 'Provides authentic career guidance grounded in engineering metrics rather than exaggerated lifestyle vlogs.',
    prerequisites: ['None'],
    isHypeFree: true,
    estimatedMinutes: 4,
    thumbnailGradient: 'from-sky-600 to-blue-800'
  },
  {
    id: 'rec-cloud-docker-cgroups',
    title: 'How Docker Containers Work Under the Hood: Linux Namespaces & Control Groups (cgroups)',
    category: 'Cloud',
    difficulty: 'Intermediate',
    summary: 'Explains why containers are not lightweight virtual machines, demonstrating process isolation via kernel syscalls.',
    whyItMatters: 'Gives fundamental cloud infrastructure knowledge essential for modern devops and deployment workflows.',
    prerequisites: ['Basic Command Line'],
    isHypeFree: true,
    estimatedMinutes: 3,
    thumbnailGradient: 'from-blue-700 to-slate-900',
    codeSnippet: `unshare --fork --pid --mount-proc chroot /my_container bash`
  }
];
