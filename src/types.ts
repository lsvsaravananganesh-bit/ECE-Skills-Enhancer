export type ViewMode =
  | 'home'
  | 'dashboard'
  | 'courses'
  | 'placement'
  | 'coding'
  | 'ai-mentor'
  | 'tests'
  | 'resume'
  | 'profile'
  | 'pathways'
  | 'store';

export type ThemeMode = 'light' | 'dark';

export interface PathTask {
  id: string;
  title: string;
  type: 'course' | 'practice' | 'coding' | 'test' | 'project';
  targetId?: string; // ID of course, problem, or test
  duration: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Easy' | 'Medium' | 'Hard';
  description: string;
  isCompleted?: boolean;
}

export interface PathMilestone {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  estimatedWeeks: string;
  tasks: PathTask[];
}

export interface LearningPath {
  id: string;
  roleTitle: string;
  iconName: string;
  description: string;
  category: 'Software Engineering' | 'Data & AI' | 'Cloud & DevOps' | 'Placement Crack';
  targetCompanyTypes: string[];
  recommendedLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDurationWeeks: number;
  estimatedHoursPerWeek: number;
  prerequisites: string[];
  skillsGained: string[];
  milestones: PathMilestone[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'xp' | 'course' | 'streak' | 'test' | 'code';
  requiredXp?: number;
  requiredCourseId?: string;
  requiredCourseTitle?: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  currentProgress?: number;
  maxProgress?: number;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  college: string;
  targetRole: string;
  targetCompany: string;
  streakDays: number;
  xpPoints: number;
  level: number;
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  completedTestIds: string[];
  savedProblemIds: string[];
  achievements: Achievement[];
  badges?: Badge[];
  isPublicProfile?: boolean;
  publicHandle?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  category: 'streak' | 'coding' | 'tests' | 'courses';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  summaryNote?: string;
  isCompleted?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
  quiz?: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  category: 'VLSI & Digital Design' | 'Embedded Systems' | 'Analog & PCB' | 'Signals & DSP' | 'Core Placements' | 'Programming' | 'Aptitude' | 'Core Subjects' | 'AI' | 'Interview Prep';
  instructor: string;
  instructorTitle: string;
  instructorAvatar: string;
  rating: number;
  reviewsCount: number;
  studentsEnrolled: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  description: string;
  learningOutcomes: string[];
  modules: CourseModule[];
  pdfNotesUrl?: string;
  pdfNotesTitle?: string;
}

export interface PracticeQuestion {
  id: string;
  category: 'Aptitude' | 'Logical Reasoning' | 'Verbal' | 'Technical';
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companyTags?: string[];
}

export interface CompanyPrepInfo {
  id: string;
  name: string;
  logo: string;
  description: string;
  avgPackage: string;
  role: string;
  difficulty: 'Moderate' | 'Hard' | 'Very Hard';
  rounds: string[];
  keyTopics: string[];
  pastQuestionsCount: number;
  cutoffInfo: string;
  sampleQuestions: PracticeQuestion[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  category: 'Embedded C' | 'Verilog & VLSI' | 'Digital Logic' | 'Bitwise & Registers' | 'Arrays' | 'Strings' | 'Linked Lists' | 'Trees' | 'Dynamic Programming' | 'Graphs' | 'Sorting';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptanceRate: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  starterCode: {
    python: string;
    javascript: string;
    cpp: string;
    java: string;
  };
  sampleCases: TestCase[];
  solutionExplanation: string;
}

export interface TestQuestion {
  id: string;
  section: 'Quantitative' | 'Logical' | 'Verbal' | 'Technical CS' | 'Digital Logic' | 'Analog & Circuits' | 'Microprocessors' | 'Signals & Systems' | 'VLSI & Verilog' | 'Embedded C';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  marks: number;
}

export interface MockTest {
  id: string;
  title: string;
  category: 'Full Placement Mock' | 'Aptitude Speed Test' | 'Technical CS Mock' | 'Company Pattern Test';
  companyTag?: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  questions: TestQuestion[];
}

export interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  completedAt: string;
  score: number;
  totalMarks: number;
  accuracyPercentage: number;
  percentile: number;
  timeSpentSeconds: number;
  answersMap: Record<string, number>; // questionId -> selectedIndex
}

export interface StudyPlanDay {
  day: number;
  topic: string;
  focus: string;
  estimatedHours: number;
  completed?: boolean;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  summary: string;
  targetRole: string;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
    grade: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }>;
  projects: Array<{
    id: string;
    title: string;
    technologies: string;
    description: string;
    bullets: string[];
  }>;
  skills: {
    languages: string;
    frameworks: string;
    tools: string;
    coreConcepts: string;
  };
  certifications: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
  }>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isCode?: boolean;
}

export type StoreCategory =
  | 'All'
  | 'Dev Boards & Microcontrollers'
  | 'Test & Measurement'
  | 'Lab Kits & Components'
  | 'Soldering & Tools'
  | 'FPGA & VLSI'
  | 'Robotics & Sensors';

export interface StoreReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedStudent: boolean;
  college?: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  tagline: string;
  category: Exclude<StoreCategory, 'All'>;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  badge?: 'Best Seller' | 'Student Choice' | 'New Launch' | 'Staff Pick' | 'Hot Deal';
  inStock: boolean;
  stockCount: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  colors?: string[];
  sizes?: string[];
  coinsRedeemableMax?: number; // max SkillSphere XP / Coins discount available
  reviews?: StoreReview[];
}

export interface CartItem {
  product: StoreProduct;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface StoreOrder {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: {
    fullName: string;
    collegeOrHostel: string;
    roomOrStreet: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking';
  trackingNumber: string;
}

export type EceInterviewTopic = 'VLSI & STA' | 'Embedded C & Memory' | 'Signal Processing & DSP' | 'Analog & Op-Amps' | 'Computer Architecture & Protocols';

export interface EceInterviewQuestion {
  id: string;
  topic: EceInterviewTopic;
  difficulty: 'Junior Silicon' | 'Senior Silicon' | 'Principal Specialist';
  question: string;
  contextOrScenario?: string;
  codeOrFormulaSnippet?: string;
  keyConceptsExpected: string[];
  sampleStrongAnswer: string;
  interviewerFollowUp?: string;
}

export interface EceInterviewFeedback {
  score: number; // 0 - 100
  rating: 'Outstanding' | 'Strong Pass' | 'Borderline / Needs Polish' | 'Significant Gaps';
  technicalAccuracy: string;
  strengths: string[];
  missingConcepts: string[];
  modelAnswer: string;
  followUpChallenge: string;
  accuracyRate?: number; // 0 - 100% technical correctness
  keywordDensityPct?: number; // % of expected key technical terms used
  keywordsMatched?: string[];
  benchmarkComparison?: {
    userAccuracy: number;
    benchmarkAccuracy: number;
    userKeywordDensity: number;
    benchmarkKeywordDensity: number;
  };
}

export interface InterviewSessionRecord {
  id: string;
  timestamp: string;
  topic: EceInterviewTopic;
  difficulty: 'Junior Silicon' | 'Senior Silicon' | 'Principal Specialist';
  score: number;
  accuracy: number;
  keywordDensity: number;
  benchmarkAccuracy: number;
  benchmarkKeywordDensity: number;
  matchedKeywords: string[];
  totalExpectedKeywords: number;
  rating: string;
}
