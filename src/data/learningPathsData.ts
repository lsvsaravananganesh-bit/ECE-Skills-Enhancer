import { LearningPath } from '../types';

export const initialLearningPaths: LearningPath[] = [
  {
    id: 'path_sde_product',
    roleTitle: 'SDE-1 @ Product Companies',
    iconName: 'Code2',
    description: 'A battle-tested 10-week roadmap for cracking Tier-1 product roles at Amazon, Google, Microsoft, and top high-growth startups.',
    category: 'Software Engineering',
    targetCompanyTypes: ['Amazon', 'Google', 'Microsoft', 'Flipkart', 'Uber'],
    recommendedLevel: 'Intermediate',
    totalDurationWeeks: 10,
    estimatedHoursPerWeek: 12,
    prerequisites: ['Basic C++ / Java / Python syntax', 'Basic Data Structures concepts'],
    skillsGained: [
      'Advanced Big-O Analysis',
      'Dynamic Programming & Greedy Algorithms',
      'Graph Algorithms (BFS/DFS, Dijkstra)',
      'System Design Fundamentals',
      'Low-Level Object Oriented Design (LLD)'
    ],
    milestones: [
      {
        id: 'm1_sde',
        phaseNumber: 1,
        title: 'Phase 1: DSA Foundations & Speed Mastery',
        description: 'Solidify core data structures, time complexity analysis, two-pointer techniques, and sliding window patterns.',
        estimatedWeeks: 'Weeks 1 - 3',
        tasks: [
          {
            id: 'task_sde_1',
            title: 'Complete Course: Data Structures & Algorithms Masterclass',
            type: 'course',
            targetId: 'crs_dsa_101',
            duration: '15 Hours',
            difficulty: 'Intermediate',
            description: 'Master time/space complexity analysis and array manipulation patterns.',
            isCompleted: true
          },
          {
            id: 'task_sde_2',
            title: 'Solve Coding Problem: Two Sum II & Array Partitioning',
            type: 'coding',
            targetId: 'p_01',
            duration: '45 mins',
            difficulty: 'Easy',
            description: 'Practice 2-pointer approach to solve two-sum in O(N) time and O(1) space.',
            isCompleted: true
          },
          {
            id: 'task_sde_3',
            title: 'Solve Coding Problem: Longest Substring Without Repeating Characters',
            type: 'coding',
            targetId: 'p_02',
            duration: '60 mins',
            difficulty: 'Medium',
            description: 'Implement sliding window with HashSet/HashMap tracking.',
            isCompleted: false
          }
        ]
      },
      {
        id: 'm2_sde',
        phaseNumber: 2,
        title: 'Phase 2: Trees, Graphs & Dynamic Programming',
        description: 'Tackle high-frequency interview patterns: Tree Traversals, BFS/DFS, Top-Down Memoization, and Bottom-Up DP.',
        estimatedWeeks: 'Weeks 4 - 6',
        tasks: [
          {
            id: 'task_sde_4',
            title: 'Solve Coding Problem: Lowest Common Ancestor in Binary Tree',
            type: 'coding',
            targetId: 'p_03',
            duration: '60 mins',
            difficulty: 'Medium',
            description: 'Recursive bottom-up tree traversal to find LCA.',
            isCompleted: false
          },
          {
            id: 'task_sde_5',
            title: 'Solve Coding Problem: Coin Change & 0/1 Knapsack Pattern',
            type: 'coding',
            targetId: 'p_05',
            duration: '90 mins',
            difficulty: 'Hard',
            description: 'Build DP state-transition table and space optimization.',
            isCompleted: false
          },
          {
            id: 'task_sde_6',
            title: 'Assessment: Technical CS & DSA Speed Mock',
            type: 'test',
            targetId: 'test_tech_301',
            duration: '45 mins',
            difficulty: 'Intermediate',
            description: 'Test your accuracy under timed exam pressure.',
            isCompleted: false
          }
        ]
      },
      {
        id: 'm3_sde',
        phaseNumber: 3,
        title: 'Phase 3: Core CS Engineering & System Architecture',
        description: 'Master OS Process Scheduling, DBMS Normalization, SQL Joins, and System Design basics.',
        estimatedWeeks: 'Weeks 7 - 8',
        tasks: [
          {
            id: 'task_sde_7',
            title: 'Complete Course: Core CS Foundations (OS, DBMS, SQL, Networks)',
            type: 'course',
            targetId: 'crs_core_301',
            duration: '18 Hours',
            difficulty: 'Intermediate',
            description: 'Comprehensive review of top 100 core CS interview concepts.',
            isCompleted: false
          },
          {
            id: 'task_sde_8',
            title: 'Capstone Project: Design an In-Memory Caching & Task Scheduler',
            type: 'project',
            duration: '6 Hours',
            difficulty: 'Advanced',
            description: 'Implement an LRU cache with Hashmap + Doubly LinkedList in Java/C++/Python.',
            isCompleted: false
          }
        ]
      },
      {
        id: 'm4_sde',
        phaseNumber: 4,
        title: 'Phase 4: Full Placement Mock & Behavioral Readiness',
        description: 'Final prep sprint: STAR method behavioral responses, resume ATS audit, and company-pattern mock drives.',
        estimatedWeeks: 'Weeks 9 - 10',
        tasks: [
          {
            id: 'task_sde_9',
            title: 'Complete Course: Interview Bootcamp & Behavioral Prep',
            type: 'course',
            targetId: 'crs_interview_501',
            duration: '10 Hours',
            difficulty: 'Beginner',
            description: 'Refine behavioral stories, project explanation, and HR questions.',
            isCompleted: false
          },
          {
            id: 'task_sde_10',
            title: 'Mock Drive: Amazon / SDE-1 Full Placement Simulation',
            type: 'test',
            targetId: 'test_full_101',
            duration: '90 mins',
            difficulty: 'Hard',
            description: 'Simulate end-to-end online assessment round with coding & MCQs.',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'path_fullstack',
    roleTitle: 'Full Stack Web Developer',
    iconName: 'Layout',
    description: 'Master modern frontend (React, TypeScript, Tailwind) and scalable backend APIs (Node.js, Express, Databases, Cloud Deployment).',
    category: 'Software Engineering',
    targetCompanyTypes: ['SaaS Startups', 'Fintechs', 'Product Engineering Firms'],
    recommendedLevel: 'Beginner',
    totalDurationWeeks: 8,
    estimatedHoursPerWeek: 10,
    prerequisites: ['HTML, CSS & JavaScript Fundamentals'],
    skillsGained: [
      'React 18 Component Architecture & Hooks',
      'RESTful & GraphQL API Design',
      'Database Modeling (PostgreSQL / MongoDB)',
      'Authentication & Authorization (JWT, OAuth)',
      'Server-Side Rendering & Next.js Basics'
    ],
    milestones: [
      {
        id: 'm1_fs',
        phaseNumber: 1,
        title: 'Phase 1: Advanced Frontend & React Architecture',
        description: 'Build responsive, accessible user interfaces with modern React, custom hooks, and state management.',
        estimatedWeeks: 'Weeks 1 - 2',
        tasks: [
          {
            id: 'task_fs_1',
            title: 'Complete Course: Data Structures & Web Logic Basics',
            type: 'course',
            targetId: 'crs_dsa_101',
            duration: '12 Hours',
            difficulty: 'Beginner',
            description: 'Learn efficient algorithmic thinking for web data structures.',
            isCompleted: true
          },
          {
            id: 'task_fs_2',
            title: 'Coding Task: Implement Debounced Search & Memoized List',
            type: 'coding',
            targetId: 'p_02',
            duration: '45 mins',
            difficulty: 'Medium',
            description: 'Optimize frontend UI performance with custom debounce logic.',
            isCompleted: false
          }
        ]
      },
      {
        id: 'm2_fs',
        phaseNumber: 2,
        title: 'Phase 2: Backend APIs & Database Engineering',
        description: 'Design RESTful Express microservices, schema relationships, SQL queries, and secure user auth.',
        estimatedWeeks: 'Weeks 3 - 5',
        tasks: [
          {
            id: 'task_fs_3',
            title: 'Complete Course: Core CS Foundations (OS, DBMS & SQL)',
            type: 'course',
            targetId: 'crs_core_301',
            duration: '18 Hours',
            difficulty: 'Intermediate',
            description: 'Deep dive into database design, normalization, and ACID transactions.',
            isCompleted: false
          },
          {
            id: 'task_fs_4',
            title: 'Practice: Write Complex SQL Queries & Joins',
            type: 'practice',
            targetId: 'p_04',
            duration: '60 mins',
            difficulty: 'Medium',
            description: 'Practice inner, outer, left joins and aggregate grouping.',
            isCompleted: false
          }
        ]
      },
      {
        id: 'm3_fs',
        phaseNumber: 3,
        title: 'Phase 3: AI Integration & Full Stack Deployment',
        description: 'Connect LLM APIs (Gemini), build vector search features, and deploy to Cloud Run / Vercel.',
        estimatedWeeks: 'Weeks 6 - 8',
        tasks: [
          {
            id: 'task_fs_5',
            title: 'Complete Course: Generative AI & LLM Engineering',
            type: 'course',
            targetId: 'crs_ai_401',
            duration: '20 Hours',
            difficulty: 'Advanced',
            description: 'Learn full-stack Gemini API integration and agent building.',
            isCompleted: false
          },
          {
            id: 'task_fs_6',
            title: 'Capstone Project: Build a SaaS Web App with Gemini AI Integration',
            type: 'project',
            duration: '10 Hours',
            difficulty: 'Advanced',
            description: 'Develop a complete web app with authentication, database, and AI assistant.',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'path_data_ai',
    roleTitle: 'Data Scientist & AI Specialist',
    iconName: 'Brain',
    description: 'Transform raw data into intelligence. Master Python, Machine Learning models, Deep Learning, Prompt Engineering, and Gemini API.',
    category: 'Data & AI',
    targetCompanyTypes: ['AI Research Labs', 'Analytics Firms', 'Big Tech AI Teams'],
    recommendedLevel: 'Intermediate',
    totalDurationWeeks: 12,
    estimatedHoursPerWeek: 10,
    prerequisites: ['Python basics', 'Basic linear algebra & statistics'],
    skillsGained: [
      'Data Wrangling (Pandas, NumPy)',
      'Supervised & Unsupervised Machine Learning',
      'Deep Learning & Neural Networks',
      'Generative AI & Prompt Engineering',
      'RAG & Vector Database Systems'
    ],
    milestones: [
      {
        id: 'm1_ai',
        phaseNumber: 1,
        title: 'Phase 1: Python Data Analysis & Quantitative Methods',
        description: 'Master numerical computation, exploratory data analysis, statistics, and probability.',
        estimatedWeeks: 'Weeks 1 - 3',
        tasks: [
          {
            id: 'task_ai_1',
            title: 'Complete Course: Quantitative Aptitude & Data Interpretation',
            type: 'course',
            targetId: 'crs_aptitude_201',
            duration: '15 Hours',
            difficulty: 'Beginner',
            description: 'Master statistical charts, probability, and quantitative reasoning.',
            isCompleted: true
          }
        ]
      },
      {
        id: 'm2_ai',
        phaseNumber: 2,
        title: 'Phase 2: LLMs, Gemini API & Agentic Workflows',
        description: 'Build intelligent applications using Gemini 2.5/1.5 models, function calling, embeddings, and autonomous agent loops.',
        estimatedWeeks: 'Weeks 4 - 8',
        tasks: [
          {
            id: 'task_ai_2',
            title: 'Complete Course: Applied Generative AI & LLM Engineering',
            type: 'course',
            targetId: 'crs_ai_401',
            duration: '30 Hours',
            difficulty: 'Advanced',
            description: 'Build RAG systems, AI agents, and custom prompt templates.',
            isCompleted: false
          },
          {
            id: 'task_ai_3',
            title: 'Capstone Project: Build an AI-Powered Document Analyst with RAG',
            type: 'project',
            duration: '8 Hours',
            difficulty: 'Advanced',
            description: 'Combine vector search with Gemini API to answer queries over custom PDFs.',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'path_placement_service',
    roleTitle: 'Mass Recruiters Placement Crack',
    iconName: 'GraduationCap',
    description: 'Targeted fast-track program designed specifically to guarantee clearing TCS NQT, Infosys, Wipro, Accenture, and Cognizant campus drives.',
    category: 'Placement Crack',
    targetCompanyTypes: ['TCS NQT', 'Infosys Ninja/Digital', 'Wipro NLTH', 'Accenture', 'Cognizant'],
    recommendedLevel: 'Beginner',
    totalDurationWeeks: 4,
    estimatedHoursPerWeek: 15,
    prerequisites: ['Basic high school mathematics', 'Basic programming awareness'],
    skillsGained: [
      'Speed Quantitative Aptitude Tricks',
      'Logical Reasoning Puzzles & Syllogisms',
      'Verbal English & Grammar Accuracy',
      'Basic C/Python/Java Coding Questions',
      'Company Specific Pattern Strategies'
    ],
    milestones: [
      {
        id: 'm1_serv',
        phaseNumber: 1,
        title: 'Phase 1: Speed Aptitude & Logical Reasoning Crack',
        description: 'Vedic math calculation shortcuts, Data Interpretation, Syllogisms, and Blood Relations.',
        estimatedWeeks: 'Weeks 1 - 2',
        tasks: [
          {
            id: 'task_serv_1',
            title: 'Complete Course: Quantitative Aptitude & Logical Reasoning',
            type: 'course',
            targetId: 'crs_aptitude_201',
            duration: '25 Hours',
            difficulty: 'Beginner',
            description: 'Shortcut tricks to solve aptitude questions under 45 seconds.',
            isCompleted: true
          },
          {
            id: 'task_serv_2',
            title: 'Assessment: TCS NQT Pattern Aptitude Speed Test',
            type: 'test',
            targetId: 'test_aptitude_201',
            duration: '30 mins',
            difficulty: 'Easy',
            description: 'Practice high-frequency TCS and Infosys aptitude test questions.',
            isCompleted: true
          }
        ]
      },
      {
        id: 'm2_serv',
        phaseNumber: 2,
        title: 'Phase 2: Technical MCQs & Coding Foundation',
        description: 'Master pseudocode output questions, C/Java syntax, basic arrays/strings, and HR behavioral interview.',
        estimatedWeeks: 'Weeks 3 - 4',
        tasks: [
          {
            id: 'task_serv_3',
            title: 'Complete Course: Interview Bootcamp & Behavioral Prep',
            type: 'course',
            targetId: 'crs_interview_501',
            duration: '10 Hours',
            difficulty: 'Beginner',
            description: 'Crack HR interview, group discussion, and resume presentation.',
            isCompleted: false
          },
          {
            id: 'task_serv_4',
            title: 'Full Mock Drive: Mass Recruiter Pattern Complete Assessment',
            type: 'test',
            targetId: 'test_company_401',
            duration: '60 mins',
            difficulty: 'Intermediate',
            description: 'Full simulation of TCS NQT Ninja & Digital online assessment.',
            isCompleted: false
          }
        ]
      }
    ]
  }
];
