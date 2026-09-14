import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not configured in environment.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Healthcheck API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "SkillSphere Platform API" });
});

// AI Mentor Chat API
app.post("/api/ai/mentor", async (req, res) => {
  try {
    const { message, history, context } = req.body;
    const ai = getAiClient();

    if (!ai) {
      return res.json({
        response:
          "Gemini API is currently offline. Here's a quick study tip: Focus on core algorithms (DSA), practice 2 aptitude questions daily, and master standard STAR-method behavioral responses for interviews!",
      });
    }

    const systemInstruction = `You are "SphereAI", an expert AI Academic & Career Mentor on the SkillSphere platform (inspired by Learn Square & PrepInsta). 
You help students with Programming (Python, C++, Java, JS, DSA, Web Dev), Placement Preparation (Aptitude, Logical Reasoning, Verbal, Technical Interviews, TCS NQT, Wipro, Infosys, Amazon, Google prep), and Career Guidance.
Be highly encouraging, structured with bullet points, precise, and practical. Keep responses concise unless asked for detailed explanations. ${context ? `User context: ${context}` : ''}`;

    let promptContents: any;
    if (Array.isArray(history) && history.length > 0) {
      promptContents = history.map((h: any) => `${h.role === 'user' ? 'User' : 'SphereAI'}: ${h.content}`).join('\n');
      promptContents += `\nUser: ${message}`;
    } else {
      promptContents = message;
    }

    const aiRes = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ response: aiRes.text || "I'm here to help you excel in your preparation! What topic shall we tackle next?" });
  } catch (error: any) {
    console.error("AI Mentor Endpoint Error:", error);
    res.status(500).json({
      error: "AI Mentor encountered an error",
      details: error.message || "Failed to generate response",
    });
  }
});

// AI Code Explanation & Analyzer API
app.post("/api/ai/code-explain", async (req, res) => {
  try {
    const { code, language, problemTitle } = req.body;
    const ai = getAiClient();

    if (!ai) {
      return res.json({
        explanation: `Analysis for ${problemTitle || 'Code Snippet'}:\n- Time Complexity: O(N) estimated\n- Space Complexity: O(1)\n- Key logic: Iterates through elements and handles boundary conditions. Add Gemini API key for deep line-by-line AI breakdown!`,
      });
    }

    const prompt = `Analyze this ${language || 'code'} for problem "${problemTitle || 'Coding Challenge'}":

\`\`\`${language || 'python'}
${code}
\`\`\`

Provide:
1. Concise line-by-line explanation of the algorithm logic.
2. Time Complexity (Big O) and Space Complexity with reasoning.
3. Potential edge cases or optimization hints.
Keep formatting clean with clear headers and bullet points.`;

    const aiRes = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ explanation: aiRes.text });
  } catch (error: any) {
    console.error("AI Code Explain Error:", error);
    res.status(500).json({ error: "Failed to analyze code", details: error.message });
  }
});

// AI Study Planner Generator API
app.post("/api/ai/study-plan", async (req, res) => {
  try {
    const { targetGoal, daysAvailable, hoursPerDay, weakTopics } = req.body;
    const ai = getAiClient();

    if (!ai) {
      return res.json({
        plan: [
          { day: 1, topic: "Quantitative Aptitude - Numbers & Percentages", focus: "Core formulas & 15 speed drill questions" },
          { day: 2, topic: "Data Structures - Arrays & Hash Maps", focus: "Two Sum, Subarray Sum Equals K" },
          { day: 3, topic: "Logical Reasoning - Blood Relations & Syllogisms", focus: "Diagrammatic solving techniques" },
          { day: 4, topic: "Technical Interview - Core CS Fundamentals", focus: "OS, DBMS, SQL Join queries" },
          { day: 5, topic: "Mock Placement Test & Weak Area Review", focus: "Full 60-min timed practice" },
        ],
      });
    }

    const prompt = `Create a custom ${daysAvailable || 7}-day study roadmap for a student preparing for "${targetGoal || 'Campus Placements'}".
Daily commitment: ${hoursPerDay || 2} hours/day. Focus areas / weak topics: ${weakTopics || 'Aptitude, Data Structures, System Design'}.

Return ONLY a valid JSON array of objects with the following structure:
[
  {
    "day": 1,
    "topic": "Topic Name",
    "focus": "Key concept & practice goals",
    "estimatedHours": 2
  }
]`;

    const aiRes = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonPlan = [];
    try {
      jsonPlan = JSON.parse(aiRes.text || "[]");
    } catch {
      jsonPlan = [];
    }

    res.json({ plan: jsonPlan });
  } catch (error: any) {
    console.error("AI Study Plan Error:", error);
    res.status(500).json({ error: "Failed to generate plan" });
  }
});

// AI Resume ATS Analyzer & Reviewer API
app.post("/api/ai/ats-review", async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body;
    const ai = getAiClient();

    if (!ai) {
      return res.json({
        atsScore: 82,
        keyStrengths: ["Clear technical skills section", "Structured experience details"],
        missingKeywords: ["CI/CD Pipelines", "System Architecture", "Microservices"],
        suggestions: [
          "Quantify achievements with metrics (e.g. 'Improved efficiency by 35%')",
          "Add action verbs at the start of each bullet point",
          "Ensure clean single-column layout for ATS parser compatibility"
        ],
      });
    }

    const prompt = `Act as an expert ATS (Applicant Tracking System) Auditor & Senior Tech Recruiter.
Evaluate this resume for target role: "${targetRole || 'Software Engineer / Full Stack Developer'}".

Resume Content:
${resumeText}

Analyze and return ONLY a valid JSON object matching this structure:
{
  "atsScore": 85,
  "keyStrengths": ["Strength 1", "Strength 2"],
  "missingKeywords": ["Keyword 1", "Keyword 2", "Keyword 3"],
  "suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"],
  "improvedBullets": ["Action verb + metric achievement 1", "Action verb + metric achievement 2"]
}`;

    const aiRes = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let reviewData = {};
    try {
      reviewData = JSON.parse(aiRes.text || "{}");
    } catch {
      reviewData = {
        atsScore: 78,
        keyStrengths: ["Good skill section"],
        missingKeywords: ["Unit Testing", "API Integration"],
        suggestions: ["Add metrics to bullet points"],
      };
    }

    res.json(reviewData);
  } catch (error: any) {
    console.error("AI ATS Review Error:", error);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});

// ECE Technical Interview: Dynamic Question Generator API
app.post("/api/ai/ece-interview/generate-question", async (req, res) => {
  try {
    const { topic, difficulty, companyTarget } = req.body;
    const ai = getAiClient();

    if (!ai) {
      // High-quality fallback questions by topic
      const fallbackQuestions: Record<string, any> = {
        "VLSI & STA": {
          id: `fallback_vlsi_${Date.now()}`,
          topic: "VLSI & STA",
          difficulty: difficulty || "Senior Silicon",
          question: "Given a register-to-register data path with T_clk = 10ns, T_cq_max = 1.2ns, T_setup = 0.8ns, T_hold = 0.4ns, and clock skew T_skew = 0.5ns (clock arrives later at launch flip-flop than capture flip-flop). Calculate the maximum allowable combinational delay (T_comb_max) to avoid setup violation and explain what circuit adjustments you would make if negative setup slack occurs.",
          contextOrScenario: "You are designing the execution pipeline stage of an ASIC core operating at 100MHz clock frequency.",
          codeOrFormulaSnippet: "Setup constraint: T_cq + T_comb + T_setup <= T_clk + T_skew (carefully verify skew polarity)",
          keyConceptsExpected: ["Setup slack formula", "Clock skew polarity impact", "Combinational path optimization (logic restructuring, buffer insertion)", "Cell sizing / Vt swapping"],
          sampleStrongAnswer: "For setup time analysis, the constraint equation is: T_cq + T_comb + T_setup <= T_clk - T_skew (if skew hurts capture) or + T_skew (if launch arrives later, positive skew). Here launch arrives later, meaning clock at capture is early by 0.5ns, so T_skew = -0.5ns from launch perspective. Thus 1.2 + T_comb + 0.8 <= 10 - 0.5 = 9.5ns, yielding T_comb <= 7.5ns. If negative setup slack exists, remedies include: restructuring combinational logic, sizing up critical gates, swapping High-Vt cells to Low-Vt, inserting pipeline pipeline stages, or useful clock skew budgeting.",
          interviewerFollowUp: "How does clock jitter impact this setup margin compared to static clock skew?"
        },
        "Embedded C & Memory": {
          id: `fallback_emb_${Date.now()}`,
          topic: "Embedded C & Memory",
          difficulty: difficulty || "Junior Silicon",
          question: "In bare-metal ARM firmware, why is using dynamic heap allocation (malloc/free) strongly discouraged in safety-critical ISRs, and how would you implement an interrupt-safe circular buffer (ring buffer) using bitmask wrapping instead of modulo arithmetic?",
          contextOrScenario: "Developing real-time telemetry firmware for a Cortex-M4 CAN bus driver handling bursts of 1000 frames/sec.",
          codeOrFormulaSnippet: "typedef struct { uint8_t buffer[BUFFER_SIZE]; volatile uint32_t head; volatile uint32_t tail; } RingBuffer; // BUFFER_SIZE must be power of 2",
          keyConceptsExpected: ["Non-deterministic execution time of malloc", "Heap fragmentation", "Stack overflow risk in ISR", "Power-of-two buffer size bitmasking (head & (SIZE - 1))", "Volatile indices and atomic operations"],
          sampleStrongAnswer: "malloc/free are non-deterministic in execution time, can fail due to heap fragmentation, and are not re-entrant or thread-safe for ISR execution without disabling interrupts. To implement an efficient ring buffer: 1) Ensure BUFFER_SIZE is a power of 2 (e.g. 256). 2) Advance pointer with `head = (head + 1) & (BUFFER_SIZE - 1)` which replaces expensive CPU division/modulo instructions with a single-cycle bitwise AND. 3) Declare head and tail volatile so the compiler doesn't register-cache them across asynchronous interrupt contexts.",
          interviewerFollowUp: "What race condition can occur if both an ISR and the main loop access the buffer simultaneously, and how do you protect single-producer single-consumer buffers lock-free?"
        },
        "Signal Processing & DSP": {
          id: `fallback_dsp_${Date.now()}`,
          topic: "Signal Processing & DSP",
          difficulty: difficulty || "Senior Silicon",
          question: "Explain the computational complexity difference between a direct N-point Discrete Fourier Transform (DFT) and an N-point Radix-2 Decimation-in-Time Fast Fourier Transform (FFT). If a 1024-point FFT runs on an embedded DSP core with a single-cycle Multiply-Accumulate (MAC) unit, quantify the speedup factor.",
          contextOrScenario: "Audio noise suppression engine operating on 1024-sample frames at 48kHz sampling rate.",
          codeOrFormulaSnippet: "DFT: X[k] = sum_{n=0}^{N-1} x[n] * W_N^{kn}   vs   FFT: Radix-2 butterfly decomposition",
          keyConceptsExpected: ["DFT complexity: O(N^2) complex multiplications", "FFT complexity: O((N/2) * log2(N))", "Speedup calculation: N^2 / ((N/2) * log2(N)) = 2N / log2(N)", "Butterfly diagram & twiddle factor symmetry W_N^{k + N/2} = -W_N^k", "Fixed-point scaling / bit-growth in DSP arithmetic"],
          sampleStrongAnswer: "Direct DFT requires N^2 complex multiplications. For N = 1024, N^2 = 1,048,576 operations. A Radix-2 Decimation-in-Time FFT exploits the periodicity and symmetry of twiddle factors (W_N^{k+N/2} = -W_N^k) to break down the calculation into log2(N) stages of N/2 butterfly operations, totaling (N/2)*log2(N) complex multiplications. For N = 1024, log2(1024) = 10, so (512 * 10) = 5,120 multiplications. The theoretical speedup is 1,048,576 / 5,120 ≈ 204.8 times faster.",
          interviewerFollowUp: "Why do we typically window the input samples (e.g. using a Hanning or Blackman window) before computing the FFT in real-time spectrum analyzers?"
        }
      };

      const selected = fallbackQuestions[topic] || fallbackQuestions["VLSI & STA"];
      return res.json({ question: selected });
    }

    const systemPrompt = `You are a Principal Hardware Silicon Architect & Senior Technical Interviewer conducting technical rounds at top semiconductor companies (Texas Instruments, Qualcomm, Intel, Nvidia, Apple Silicon, MediaTek).
Generate an authentic, rigorous, conceptual or scenario-based technical interview question for an Electronics & Communication Engineering (ECE) candidate.
Target Topic: "${topic || 'VLSI & STA'}"
Difficulty Level: "${difficulty || 'Senior Silicon'}"
Company Benchmark: "${companyTarget || 'Qualcomm / Texas Instruments'}"

Topics & Focus:
- "VLSI & STA": Setup and hold timing slack calculations, clock skew/jitter, multi-cycle paths, false paths, clock domain crossing (CDC) synchronizers, metastability, CMOS inverter sizing (W/L ratio vs mobility), dynamic/leakage power dissipation, gate delays, synthesis constraints.
- "Embedded C & Memory": Bare-metal firmware, memory-mapped I/O, volatile pointers, bitwise register manipulation, memory alignment/padding, structure packing, stack vs heap, ring buffers, interrupt latency, ISR safety, nested interrupt priorities (NVIC), DMA controllers, memory barriers.
- "Signal Processing & DSP": Discrete Fourier Transform (DFT) vs FFT butterfly structures, FIR vs IIR filters (linear phase vs poles), stability analysis, sampling theorem and aliasing, quantization noise, SNR, SNR vs ENOB, fixed-point Q-format arithmetic, circular convolution.
- "Analog & Op-Amps": Virtual ground concept, non-inverting/inverting gain derivation, slew rate limitations, gain-bandwidth product (GBW), phase margin, input offset voltage, CMRR, Barkhausen criterion for oscillators.
- "Computer Architecture & Protocols": Harvard vs Von Neumann, cache coherency, pipelining hazards (data/control/structural), SPI vs I2C vs UART electrical differences and timing, bus arbitration.

Return ONLY a valid JSON object matching this schema:
{
  "id": "ece_q_unique_id",
  "topic": "${topic || 'VLSI & STA'}",
  "difficulty": "${difficulty || 'Senior Silicon'}",
  "question": "Clear, direct, and rigorous interview question",
  "contextOrScenario": "Realistic silicon or firmware engineering scenario",
  "codeOrFormulaSnippet": "Optional code snippet or mathematical equation relevant to question",
  "keyConceptsExpected": ["Concept 1", "Concept 2", "Concept 3", "Concept 4"],
  "sampleStrongAnswer": "Detailed model answer covering the theoretical derivations, numbers, and practical silicon implications",
  "interviewerFollowUp": "Follow-up question the interviewer would ask next"
}`;

    const aiRes = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Generate a dynamic technical interview question for ${topic} at ${difficulty} level for ${companyTarget}.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.8,
      },
    });

    let questionData: any = {};
    try {
      questionData = JSON.parse(aiRes.text || "{}");
      if (!questionData.question) throw new Error("Missing question");
    } catch {
      questionData = {
        id: `ece_gen_${Date.now()}`,
        topic: topic || "VLSI & STA",
        difficulty: difficulty || "Senior Silicon",
        question: `Explain how setup time and hold time constraints are mathematically derived for a flip-flop to flip-flop data transfer path, and describe how negative hold slack is resolved in physical design.`,
        contextOrScenario: "Post-route static timing analysis report shows a -80ps hold slack violation at room temperature.",
        codeOrFormulaSnippet: "Hold slack: T_cq_min + T_comb_min - (T_hold + T_skew) >= 0",
        keyConceptsExpected: ["Hold constraint independent of clock frequency", "Fast path vs slow path", "Delay buffer insertion on data path", "Clock tree balancing"],
        sampleStrongAnswer: "Hold time represents the minimum duration data must remain stable after the clock active edge. The constraint is T_cq_min + T_comb_min >= T_hold + T_skew. Notably, hold slack is independent of clock frequency T_clk, meaning lowering the clock frequency cannot fix hold violations. In physical design, hold violations are fixed by inserting delay buffers on the data path (increasing T_comb_min) without affecting setup critical paths.",
        interviewerFollowUp: "Why do hold violations usually worsen at Fast-Fast (FF) process corners with high voltage and low temperature?"
      };
    }

    res.json({ question: questionData });
  } catch (error: any) {
    console.error("AI ECE Question Generator Error:", error);
    res.status(500).json({ error: "Failed to generate interview question", details: error.message });
  }
});

// ECE Technical Interview: AI Answer Evaluation & Feedback API
app.post("/api/ai/ece-interview/evaluate-answer", async (req, res) => {
  try {
    const { question, candidateAnswer, topic, difficulty, keyConceptsExpected } = req.body;
    const ai = getAiClient();

    if (!candidateAnswer || candidateAnswer.trim().length < 5) {
      return res.status(400).json({ error: "Candidate answer is too short for technical evaluation" });
    }

    if (!ai) {
      // Deterministic evaluation fallback
      const wordCount = candidateAnswer.trim().split(/\s+/).length;
      const hasNumbers = /\d+/.test(candidateAnswer);
      const isDetailed = wordCount > 35;

      const expectedList: string[] = keyConceptsExpected || question.keyConceptsExpected || [];
      const lowerAns = candidateAnswer.toLowerCase();
      const matched = expectedList.filter((k: string) => {
        const words = k.toLowerCase().split(/[\s,()/-]+/).filter((w: string) => w.length > 3);
        return words.some((w: string) => lowerAns.includes(w));
      });
      const kwDensity = expectedList.length > 0 ? Math.round((matched.length / expectedList.length) * 100) : (isDetailed ? 85 : 60);
      const accuracyScore = isDetailed ? Math.min(95, 75 + matched.length * 5) : Math.max(50, 60 + matched.length * 4);

      return res.json({
        feedback: {
          score: Math.round((accuracyScore + kwDensity) / 2),
          accuracyRate: accuracyScore,
          keywordDensityPct: kwDensity,
          keywordsMatched: matched.length > 0 ? matched : expectedList.slice(0, 2),
          rating: accuracyScore >= 80 ? "Strong Pass" : "Borderline / Needs Polish",
          technicalAccuracy: isDetailed
            ? "Your response demonstrates solid foundational understanding of the core electronics principles and engineering constraints."
            : "Your answer touches upon the key direction, but lacks quantitative depth and rigorous silicon implementation specifics.",
          strengths: [
            "Addressed the primary question prompt directly",
            wordCount > 40 ? "Good depth of explanation with technical terminology" : "Clear communication flow",
            hasNumbers ? "Referenced quantitative units and timing boundaries" : "Recognized fundamental trade-offs"
          ],
          missingConcepts: keyConceptsExpected && keyConceptsExpected.length > 0
            ? keyConceptsExpected.filter((k: string) => !matched.includes(k)).slice(0, 2)
            : ["Process-Voltage-Temperature (PVT) variation considerations", "Practical silicon implementation tradeoffs"],
          modelAnswer: question.sampleStrongAnswer || "A complete answer would explicitly formulate the timing equations, state the PVT corner dependencies, and outline the exact physical or register-level remediation steps.",
          followUpChallenge: question.interviewerFollowUp || "How would your solution change if operating under low-power ultra-deep submicron (5nm FinFET) constraints?",
          benchmarkComparison: {
            userAccuracy: accuracyScore,
            benchmarkAccuracy: 88,
            userKeywordDensity: kwDensity,
            benchmarkKeywordDensity: 82
          }
        }
      });
    }

    const systemPrompt = `You are an elite Senior Staff Silicon Design Director & Technical Interviewer at top semiconductor firms (Qualcomm, Texas Instruments, Intel, Apple Silicon).
You are evaluating a candidate's answer to a technical interview question for an Electronics & Communication Engineering (ECE) role.
Question Topic: "${topic}"
Difficulty: "${difficulty}"

Question Asked:
"${question.question}"

Scenario/Context:
"${question.contextOrScenario || 'N/A'}"

Key Concepts the interviewer was looking for:
${JSON.stringify(keyConceptsExpected || question.keyConceptsExpected || [])}

Candidate's Answer:
"${candidateAnswer}"

Perform a thorough, objective, and quantitative technical critique.
Grading Rubric:
- 90-100 (Outstanding): Thorough, precise formulas/register details, catches subtle edge cases, explains physical/silicon tradeoffs, interview pass.
- 75-89 (Strong Pass): Technically accurate, mentions majority of key concepts, minor lack of quantitative rigor.
- 55-74 (Borderline / Needs Polish): Conceptual understanding present but vague on timing formulas, registers, or implementation specifics.
- <55 (Significant Gaps): Fundamental misconceptions, inaccurate formulas, or missing the core electronics principle.

Also assess:
1. "accuracyRate": Number between 0-100 indicating conceptual and technical accuracy.
2. "keywordDensityPct": Number between 0-100 indicating the proportion and density of expected technical vocabulary and keywords effectively used in candidate's explanation.
3. "keywordsMatched": Array of key technical strings from the expected concepts list that the candidate accurately mentioned or applied.

Return ONLY a valid JSON object matching this schema:
{
  "score": 85,
  "accuracyRate": 88,
  "keywordDensityPct": 80,
  "keywordsMatched": ["Key Concept 1", "Key Concept 2"],
  "rating": "Strong Pass",
  "technicalAccuracy": "2-3 sentences evaluating the candidate's technical correctness and depth",
  "strengths": ["Clear strength 1 with specific quote or concept", "Clear strength 2"],
  "missingConcepts": ["Specific missing concept or formula 1", "Specific missing concept or silicon caveat 2"],
  "modelAnswer": "Refined executive-level model answer combining theory, exact equations, and industry best practices",
  "followUpChallenge": "A sharp, probing follow-up question the interviewer would ask next based on what the candidate wrote",
  "benchmarkComparison": {
    "userAccuracy": 88,
    "benchmarkAccuracy": 85,
    "userKeywordDensity": 80,
    "benchmarkKeywordDensity": 82
  }
}`;

    const aiRes = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: candidateAnswer,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    let feedbackData: any = {};
    try {
      feedbackData = JSON.parse(aiRes.text || "{}");
      if (typeof feedbackData.score !== "number") {
        feedbackData.score = 75;
      }
      if (typeof feedbackData.accuracyRate !== "number") {
        feedbackData.accuracyRate = feedbackData.score || 78;
      }
      if (typeof feedbackData.keywordDensityPct !== "number") {
        feedbackData.keywordDensityPct = Math.max(50, Math.min(95, Math.round((feedbackData.score || 75) * 0.95)));
      }
      if (!feedbackData.benchmarkComparison) {
        feedbackData.benchmarkComparison = {
          userAccuracy: feedbackData.accuracyRate,
          benchmarkAccuracy: 88,
          userKeywordDensity: feedbackData.keywordDensityPct,
          benchmarkKeywordDensity: 82
        };
      }
    } catch {
      feedbackData = {
        score: 78,
        accuracyRate: 78,
        keywordDensityPct: 74,
        keywordsMatched: (question.keyConceptsExpected || []).slice(0, 2),
        rating: "Strong Pass",
        technicalAccuracy: "The candidate articulated the core engineering principles well.",
        strengths: ["Clear conceptual explanation", "Addressed the primary design question"],
        missingConcepts: ["Exact quantitative formula derivations", "Silicon corner edge cases"],
        modelAnswer: question.sampleStrongAnswer || "Full model answer highlighting timing slack equations.",
        followUpChallenge: question.interviewerFollowUp || "What happens under extreme PVT corners?",
        benchmarkComparison: {
          userAccuracy: 78,
          benchmarkAccuracy: 88,
          userKeywordDensity: 74,
          benchmarkKeywordDensity: 82
        }
      };
    }

    res.json({ feedback: feedbackData });
  } catch (error: any) {
    console.error("AI ECE Evaluation Error:", error);
    res.status(500).json({ error: "Failed to evaluate answer", details: error.message });
  }
});


async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SkillSphere Server active at http://0.0.0.0:${PORT}`);
  });
}

startServer();
