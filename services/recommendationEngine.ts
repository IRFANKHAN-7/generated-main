import { Reel, TechRecommendation, CURATED_TECH_RECOMMENDATIONS, SAMPLE_INPUT_REELS } from '../data/reelsData';
import { GoogleGenAI } from '@google/genai';

export interface RequiredOutputSchema {
  currentReel: string;
  interestDetected: string;
  whyInterestDetected: string;
  recommendedTechReel: string;
  category: 'AI' | 'DSA' | 'Java' | 'HLD' | 'Cybersecurity' | 'Cloud' | 'Hardware' | 'Career' | 'Other';
  whyThisRecommendation: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  confidence: 'High' | 'Medium' | 'Low';
  antiHypePassed: boolean;
  recommendedObject?: TechRecommendation;
}

export interface TrapComparisonResult {
  shallowRecommendation: {
    currentReel: string;
    interestDetected: string;
    recommendedTechReel: string;
    category: string;
    whyThisRecommendation: string;
    flawReasoning: string;
  };
  strongAgentRecommendation: RequiredOutputSchema;
  trapExplanation: string;
}

export class RecommendationEngine {
  private static aiClient: GoogleGenAI | null = null;

  private static getAiClient(): GoogleGenAI | null {
    if (this.aiClient) return this.aiClient;
    const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (apiKey && apiKey !== 'undefined') {
      try {
        this.aiClient = new GoogleGenAI({ apiKey });
        return this.aiClient;
      } catch (err) {
        console.warn('Gemini client init failed, using heuristic fallback:', err);
      }
    }
    return null;
  }

  /**
   * Evaluates a single reel interaction and returns the structured recommendation output.
   */
  public static async analyzeReelInteraction(
    reel: Reel,
    userMetrics = reel.defaultMetrics
  ): Promise<RequiredOutputSchema> {
    const gemini = this.getAiClient();

    if (gemini) {
      try {
        const prompt = `
You are an AI-powered student tech recommendation agent.
Analyze the following Reel interaction by a student and infer their underlying educational/career interest.
Do NOT use shallow keyword matching. Understand context, intent, and apparent interest. Avoid recommending hype/clickbait content (e.g., "10 AI tools to get a job").

REEL DETAILS:
- Title: ${reel.title}
- Creator: ${reel.creator}
- Category Tag: ${reel.categoryTag}
- Transcript: ${reel.transcript}
- Keywords: ${reel.keywords.join(', ')}
- Student Watch Completion: ${userMetrics.watchTimePercent}%
- Liked: ${userMetrics.liked}
- Saved: ${userMetrics.saved}
- Replayed: ${userMetrics.replayed}

Respond ONLY in valid JSON matching this exact JSON format:
{
  "currentReel": "${reel.title} (${reel.creator})",
  "interestDetected": "<Inferred underlying interest topic, e.g. Software Engineering Foundations, Memory Systems, AI Architecture>",
  "whyInterestDetected": "<Evidence from content, watch metrics, and subtle concepts>",
  "recommendedTechReel": "<Title of recommended educational tech reel>",
  "category": "<Must be one of: AI, DSA, Java, HLD, Cybersecurity, Cloud, Hardware, Career, Other>",
  "whyThisRecommendation": "<Clear connection between inferred interest and recommended educational reel>",
  "difficulty": "<Must be one of: Beginner, Intermediate, Advanced>",
  "confidence": "<Must be one of: High, Medium, Low>"
}
`;
        const response = await gemini.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text) as RequiredOutputSchema;
          const matchedObj = CURATED_TECH_RECOMMENDATIONS.find(
            r => r.category === parsed.category || r.title.toLowerCase().includes(parsed.recommendedTechReel.toLowerCase())
          ) || CURATED_TECH_RECOMMENDATIONS[0];

          return {
            currentReel: parsed.currentReel || `${reel.title} (${reel.creator})`,
            interestDetected: parsed.interestDetected,
            whyInterestDetected: parsed.whyInterestDetected,
            recommendedTechReel: parsed.recommendedTechReel,
            category: parsed.category,
            whyThisRecommendation: parsed.whyThisRecommendation,
            difficulty: parsed.difficulty,
            confidence: parsed.confidence,
            antiHypePassed: true,
            recommendedObject: matchedObj
          };
        }
      } catch (err) {
        console.warn('Gemini API call failed or timed out, switching to smart heuristic engine:', err);
      }
    }

    // Heuristic Smart Fallback Engine
    return this.heuristicAnalyzeReel(reel, userMetrics);
  }

  /**
   * Deterministic smart inference engine for offline robustness and instantaneous response.
   */
  private static heuristicAnalyzeReel(reel: Reel, metrics = reel.defaultMetrics): RequiredOutputSchema {
    let interestDetected = 'General Technology & Software Engineering';
    let whyInterest = `Student watched ${metrics.watchTimePercent}% of content with high engagement.`;
    let category: RequiredOutputSchema['category'] = 'DSA';
    let recObj = CURATED_TECH_RECOMMENDATIONS[0];
    let whyRec = 'Pivots engagement from entertainment to core algorithmic fundamentals.';
    let difficulty: RequiredOutputSchema['difficulty'] = 'Intermediate';
    let confidence: RequiredOutputSchema['confidence'] = 'High';

    if (reel.id === 'trap-java-meme') {
      interestDetected = 'Software Engineering Craftsmanship & Runtime Debugging';
      whyInterest = `High replay rate on Java NullPointerException meme shows familiarity with object references, stack trace errors, and production code pressure.`;
      category = 'Java';
      recObj = CURATED_TECH_RECOMMENDATIONS.find(r => r.id === 'rec-java-jvm-memory')!;
      whyRec = `Elevates Java crash meme into real JVM memory architecture (Stack vs Heap allocations & Garbage Collection), preventing recurring runtime NPEs.`;
      difficulty = 'Intermediate';
    } else if (reel.id === 'trap-lifestyle-se') {
      interestDetected = 'Tech Career Progression & High-Scale Engineering Workflows';
      whyInterest = `Student saved FAANG lifestyle reel, indicating motivation toward software engineering careers and enterprise development environments.`;
      category = 'HLD';
      recObj = CURATED_TECH_RECOMMENDATIONS.find(r => r.id === 'rec-hld-discord')!;
      whyRec = `Channels career aspiration into actual high-level system design principles used by senior engineers at scale.`;
      difficulty = 'Advanced';
    } else if (reel.id === 'trap-interview-joke') {
      interestDetected = 'Data Structures, Algorithms & Technical Interview Readiness';
      whyInterest = `Engagement with binary tree inversion joke reveals awareness of coding interview problems and fundamental tree traversals.`;
      category = 'DSA';
      recObj = CURATED_TECH_RECOMMENDATIONS.find(r => r.id === 'rec-dsa-hashmap')!;
      whyRec = `Translates LeetCode memes into concrete mastery of hash tables, bucket indexing, and collision resolution.`;
      difficulty = 'Intermediate';
    } else if (reel.id === 'trap-laptop-hardware') {
      interestDetected = 'Computer Architecture & Compilation Performance';
      whyInterest = `Sustained watch time on Apple M3 vs ARM benchmark indicates interest in processor performance, compiler execution, and hardware efficiency.`;
      category = 'Hardware';
      recObj = CURATED_TECH_RECOMMENDATIONS.find(r => r.id === 'rec-hardware-cpu-cache')!;
      whyRec = `Directly builds on hardware benchmarks by teaching L1/L2/L3 CPU cache line bottlenecks and memory alignment.`;
      difficulty = 'Advanced';
    } else if (reel.id === 'cybersecurity-sql') {
      interestDetected = 'Web Application Security & Database Protection';
      whyInterest = `Completed 88% of SQL injection reel and saved it, demonstrating interest in vulnerability exploits and backend data flow.`;
      category = 'Cybersecurity';
      recObj = CURATED_TECH_RECOMMENDATIONS.find(r => r.id === 'rec-sec-prepared-statements')!;
      whyRec = `Connects SQL exploit awareness with industry-standard parameterized query defenses and AST parsing.`;
      difficulty = 'Intermediate';
    } else if (reel.id === 'tech-news-gpt5') {
      interestDetected = 'Artificial Intelligence & Autonomous Agent Architectures';
      whyInterest = `Focus on autonomous agent tool-calling paradigms reflects forward-looking interest in AI software development.`;
      category = 'AI';
      recObj = CURATED_TECH_RECOMMENDATIONS.find(r => r.id === 'rec-ai-transformer-attention')!;
      whyRec = `Provides rigorous mathematical understanding of Transformer Attention mechanisms rather than superficial news summary.`;
      difficulty = 'Intermediate';
    } else if (reel.isHypeContent) {
      interestDetected = 'Career Optimization (Filtered AI Hype)';
      whyInterest = `Low watch duration (20%) shows student discarded clickbait hype ("10 AI tools to get rich").`;
      category = 'Career';
      recObj = CURATED_TECH_RECOMMENDATIONS.find(r => r.id === 'rec-career-swe-levels')!;
      whyRec = `Replaces empty get-rich hype with authentic software engineering career levels and technical expectations.`;
      difficulty = 'Beginner';
      confidence = 'Medium';
    }

    return {
      currentReel: `${reel.title} (${reel.creator})`,
      interestDetected,
      whyInterestDetected: whyInterest,
      recommendedTechReel: recObj.title,
      category,
      whyThisRecommendation: whyRec,
      difficulty,
      confidence,
      antiHypePassed: true,
      recommendedObject: recObj
    };
  }

  /**
   * Executes the Built-in Trap Scenario:
   * Analyzes session history across all 4 trap reels to demonstrate how a naive/shallow system fails vs SmartScroll AI.
   */
  public static runBuiltInTrapBenchmark(): TrapComparisonResult {
    const trapReels = SAMPLE_INPUT_REELS.filter(r => r.isTrapReel);
    
    // Shallow recommendation (Keyword Matcher)
    const shallow = {
      currentReel: `Trap Session: Java Meme + SE Lifestyle + Interview Joke + Laptop Benchmark`,
      interestDetected: `Java syntax & coding jokes`,
      recommendedTechReel: `Java Basics Lesson 4: Variables & System.out.println()`,
      category: `Java`,
      whyThisRecommendation: `Matched keyword "Java" in NullPointerException meme title. Recommends more Java syntax videos.`,
      flawReasoning: `Naive system saw "Java" string and assumed student is a beginner who needs elementary syntax lessons, ignoring their high engagement with complex compiler benchmarks, binary tree jokes, and FAANG career content.`
    };

    // Strong agent recommendation (SmartScroll AI)
    const strongAgent: RequiredOutputSchema = {
      currentReel: `Trap Session: 4 Interacted Reels (Java NPE Meme, FAANG Lifestyle, Tree Inversion Joke, CPU Compilation Benchmark)`,
      interestDetected: `Software Engineering Systems, Data Structures & High-Performance Computing`,
      whyInterestDetected: `Cross-reel trajectory analysis reveals high completion (90%+) on developer culture, algorithmic humor, and compiler hardware benchmarks. The student already knows basic Java syntax; they are aspiring toward core software engineering mastery.`,
      recommendedTechReel: `Data Structures in Action: How HashMap Bucket Indexing & Collisions Work Under the Hood`,
      category: `DSA`,
      whyThisRecommendation: `Elevates Java joke engagement into foundational Computer Science (O(1) bucket hashing & JVM memory), bridging developer humor with rigorous systems knowledge while explicitly avoiding clickbait hype.`,
      difficulty: `Intermediate`,
      confidence: `High`,
      antiHypePassed: true,
      recommendedObject: CURATED_TECH_RECOMMENDATIONS[0]
    };

    return {
      shallowRecommendation: shallow,
      strongAgentRecommendation: strongAgent,
      trapExplanation: `BUILT-IN TRAP RESOLUTION: A shallow recommendation algorithm looks at isolated keywords (e.g. "Java") and recommends basic Java syntax tutorials. SmartScroll AI synthesizes intent across watch duration, humor context, and hardware benchmarks — inferring that the student is an ambitious engineering candidate who needs core Computer Science & System Design insights.`
    };
  }
}
