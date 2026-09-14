import {
  Course,
  PracticeQuestion,
  CompanyPrepInfo,
  CodingProblem,
  MockTest,
  Achievement,
  UserProfile,
  ResumeData
} from '../types';

export const initialUser: UserProfile = {
  id: 'usr_101',
  name: 'Karthik Rao',
  email: 'karthik.rao@student.nit.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Electronics & Communication Engineering (ECE) 3rd Year',
  college: 'National Institute of Technology (NIT)',
  targetRole: 'VLSI RTL Design Engineer / Embedded Systems Firmware Engineer',
  targetCompany: 'Texas Instruments / Qualcomm / Intel',
  streakDays: 14,
  xpPoints: 3450,
  level: 4,
  enrolledCourseIds: ['crs_vlsi_101', 'crs_embedded_201'],
  completedCourseIds: ['crs_analog_301'],
  completedTestIds: [],
  savedProblemIds: ['p_01', 'p_03'],
  achievements: [
    {
      id: 'ach_1',
      title: 'Verilog RTL Pioneer',
      description: 'Wrote and simulated 10+ hardware modules in Verilog HDL.',
      iconName: 'Cpu',
      unlockedAt: '2026-07-20',
      category: 'coding',
    },
    {
      id: 'ach_2',
      title: 'Firmware Register Master',
      description: 'Configured ARM Cortex-M timer ISRs & UART register drivers.',
      iconName: 'Zap',
      unlockedAt: '2026-07-22',
      category: 'courses',
    },
    {
      id: 'ach_3',
      title: 'Op-Amp Circuit Wizard',
      description: 'Designed 2nd order Butterworth active filter with SPICE simulation.',
      iconName: 'Radio',
      unlockedAt: '2026-07-18',
      category: 'tests',
    },
    {
      id: 'ach_4',
      title: 'Core Placement Ready',
      description: 'Scored 90%+ in Texas Instruments & Qualcomm mock screening rounds.',
      iconName: 'Award',
      unlockedAt: '2026-07-21',
      category: 'streak',
    }
  ]
};

export const coursesData: Course[] = [
  {
    id: 'crs_vlsi_101',
    title: 'Digital VLSI Design & Verilog HDL for ASIC/FPGA',
    category: 'VLSI & Digital Design',
    instructor: 'Dr. C. P. Ravikumar',
    instructorTitle: 'Former Director of University Relations at Texas Instruments & IEEE Fellow',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4.95,
    reviewsCount: 1840,
    studentsEnrolled: 22400,
    duration: '38 Hours • 10 Modules',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    description: 'Master Register-Transfer Level (RTL) design in Verilog HDL, Finite State Machines (Mealy & Moore), Static Timing Analysis (Setup/Hold violations), and Synthesis on Xilinx Artix-7 FPGAs.',
    pdfNotesTitle: 'Verilog HDL Synthesizable Coding & STA CheatSheet (PDF)',
    pdfNotesUrl: '#',
    learningOutcomes: [
      'Write synthesizable Verilog HDL code avoiding inferred latches and race conditions',
      'Design complex Finite State Machines (Mealy & Moore) with binary and one-hot encoding',
      'Calculate Setup Time, Hold Time, Clock Skew, and Maximum Operating Frequency (Fmax)',
      'Synthesize, place, and route RTL designs on Xilinx Vivado for Artix-7 FPGA boards',
      'Crack core digital design interview rounds at Intel, Qualcomm, AMD, and Texas Instruments'
    ],
    modules: [
      {
        id: 'm1_vlsi',
        title: 'Module 1: Combinational & Sequential RTL in Verilog',
        lessons: [
          {
            id: 'l1_v1',
            title: '1.1 Blocking (=) vs Non-Blocking (<=) Procedural Assignments',
            duration: '24 min',
            summaryNote: 'Golden rule: Use blocking assignments (=) for combinational logic inside always @(*), and non-blocking assignments (<=) for sequential clocked registers inside always @(posedge clk). Never mix them in the same always block.',
            isCompleted: true
          },
          {
            id: 'l1_v2',
            title: '1.2 Eliminating Unintended Inferred Latches in Combinational Code',
            duration: '28 min',
            summaryNote: 'Latches consume excessive silicon area and cause timing hazards. Always assign default values to outputs at the start of combinational always blocks or ensure every branch of if-else and case statements is fully specified with a default clause.',
            isCompleted: true
          }
        ],
        quiz: [
          {
            id: 'q1_vlsi1',
            question: 'What happens when a combinational `always @(*)` block contains an incomplete `if-else` statement without an `else` branch?',
            options: [
              'Synthesis tool generates a logic error and aborts',
              'The synthesizer infers a transparent D-latch to hold the previous value',
              'It automatically synthesizes an edge-triggered D flip-flop',
              'The output signal permanently floats at high-impedance (Z)'
            ],
            correctOptionIndex: 1,
            explanation: 'In hardware, if an output is not assigned a value in all possible evaluation paths of a combinational block, hardware must preserve its prior state, which forces the synthesis tool to infer an unwanted level-sensitive latch.'
          },
          {
            id: 'q1_vlsi2',
            question: 'Given T_clk-to-q = 2ns, T_comb = 4ns, T_setup = 1.5ns, and T_skew = 0.5ns, what is the minimum clock period (T_min)?',
            options: ['6.0 ns', '7.0 ns', '7.5 ns', '8.0 ns'],
            correctOptionIndex: 1,
            explanation: 'Minimum clock period T_min = T_clk-to-q + T_comb + T_setup - T_skew. Here: 2 + 4 + 1.5 - 0.5 = 7.0 ns (corresponding to a maximum frequency of ~142.8 MHz).'
          }
        ]
      },
      {
        id: 'm2_vlsi',
        title: 'Module 2: Static Timing Analysis & Clock Domain Crossing (CDC)',
        lessons: [
          {
            id: 'l2_v1',
            title: '2.1 Setup & Hold Time Violations and How to Fix Them',
            duration: '35 min',
            summaryNote: 'Setup violations occur when data arrives too late (fix by reducing combinational delay or decreasing clock frequency). Hold violations occur when data arrives too fast (independent of clock frequency! Fix by inserting buffer delays along data path).',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'crs_embedded_201',
    title: 'Embedded Systems & Bare-Metal Firmware with ARM Cortex-M',
    category: 'Embedded Systems',
    instructor: 'Kiran S. Nayak',
    instructorTitle: 'Principal Embedded Firmware Architect at Qualcomm',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 4.92,
    reviewsCount: 2150,
    studentsEnrolled: 28500,
    duration: '45 Hours • 12 Modules',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&auto=format&fit=crop&q=80',
    description: 'Learn register-level firmware development from scratch on STM32 / ARM Cortex-M4. Master GPIO, Timer PWM, Interrupt Controllers (NVIC), UART, SPI, I2C bus protocols, and FreeRTOS preemptive multitasking.',
    pdfNotesTitle: 'ARM Cortex-M4 Architecture & Embedded C Register Guide (PDF)',
    learningOutcomes: [
      'Write bare-metal Embedded C drivers without relying on bloated HAL abstraction libraries',
      'Configure Nested Vectored Interrupt Controller (NVIC) priorities and write robust ISR handlers',
      'Implement SPI and I2C master/slave serial communication with digital sensors',
      'Understand the `volatile` keyword, memory-mapped I/O, and hardware bit-banding',
      'Build real-time multi-threaded firmware using FreeRTOS tasks, semaphores, and message queues'
    ],
    modules: [
      {
        id: 'm1_emb',
        title: 'Module 1: ARM Cortex-M Core & Memory-Mapped Registers',
        lessons: [
          {
            id: 'l1_e1',
            title: '1.1 Memory-Mapped I/O and Peripheral Register Addressing',
            duration: '30 min',
            summaryNote: 'In ARM architecture, peripheral registers are mapped to 32-bit memory addresses. We access control registers via volatile pointers: `#define GPIOA_MODER (*((volatile uint32_t*)0x40020000))`.',
            isCompleted: true
          }
        ],
        quiz: [
          {
            id: 'q1_emb1',
            question: 'Why is the `volatile` qualifier strictly required when declaring a pointer to a hardware peripheral register in Embedded C?',
            options: [
              'To allocate the variable in fast CPU cache memory',
              'To prevent the compiler optimizer from caching the register in a CPU register or omitting read/write accesses',
              'To make the memory location thread-safe without mutex locks',
              'To restrict the variable to 8-bit byte width operations'
            ],
            correctOptionIndex: 1,
            explanation: 'Hardware registers can change value asynchronously (e.g. status flags or external inputs). Declaring them volatile forces the compiler to re-fetch the value directly from physical memory every time, rather than reusing a cached CPU register value.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_analog_301',
    title: 'Analog CMOS IC Design & OP-AMP Circuit Engineering',
    category: 'Analog & PCB',
    instructor: 'Prof. Behzad Razavi Series',
    instructorTitle: 'Analog IC Design Authority & IEEE Pioneer',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rating: 4.96,
    reviewsCount: 1420,
    studentsEnrolled: 15300,
    duration: '32 Hours • 8 Modules',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
    description: 'The definitive course for Analog Electronics and Texas Instruments / Analog Devices / Broadcom hardware interviews. Small-signal modeling of BJTs & MOSFETs, Differential Pairs, Active Loads, Op-Amp feedback stability, and Bode plot phase margins.',
    pdfNotesTitle: 'Analog Circuits & Op-Amp Derivations Formula Handbook',
    learningOutcomes: [
      'Derive small-signal voltage gain, input impedance, and output impedance of Common Source/Emitter amps',
      'Analyze MOS differential pairs, Common-Mode Rejection Ratio (CMRR), and current mirrors',
      'Calculate Op-Amp pole-zero locations, Gain-Bandwidth Product (GBW), and Phase Margin for stability',
      'Design active low-pass, high-pass, and bandpass Butterworth filters',
      'Simulate circuits using SPICE to verify transient and AC frequency response'
    ],
    modules: []
  },
  {
    id: 'crs_dsp_401',
    title: 'Digital Signal Processing (DSP) & 5G Wireless Communications',
    category: 'Signals & DSP',
    instructor: 'Dr. Ananya Sridhar',
    instructorTitle: 'Wireless Communications Specialist & Ex-Intel Labs',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 4.88,
    reviewsCount: 980,
    studentsEnrolled: 11200,
    duration: '28 Hours • 7 Modules',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    description: 'From Fourier Transform foundations to modern wireless physical layer architectures. Master DFT/FFT algorithms, FIR/IIR digital filter synthesis, QAM/OFDM digital modulation schemes, and 5G NR massive MIMO beamforming.',
    pdfNotesTitle: 'DSP Algorithms & Wireless Communications Formula Booklet',
    learningOutcomes: [
      'Compute Discrete Fourier Transform (DFT) and 8-point Fast Fourier Transform (FFT) butterfly diagrams',
      'Design FIR filters using Windowing methods (Hamming, Hanning, Blackman)',
      'Synthesize IIR filters via Bilinear Transformation with frequency pre-warping',
      'Understand QPSK, 16-QAM, and Orthogonal Frequency Division Multiplexing (OFDM)',
      'Crack Qualcomm, MediaTek, and Ericsson wireless communications technical rounds'
    ],
    modules: []
  },
  {
    id: 'crs_pcb_501',
    title: 'High-Speed PCB Design & Hardware Layout with KiCad',
    category: 'Analog & PCB',
    instructor: 'Manoj Kumar',
    instructorTitle: 'Senior Hardware & PCB Design Lead at Bosch Engineering',
    instructorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    rating: 4.91,
    reviewsCount: 1100,
    studentsEnrolled: 14800,
    duration: '25 Hours • 6 Modules',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    description: 'Transform breadboard prototypes into production-grade multi-layer printed circuit boards. Learn KiCad schematic capture, PCB stackup planning, differential pair length tuning for USB/Ethernet, return current ground planes, and Gerber file generation.',
    pdfNotesTitle: 'High-Speed PCB Design Rules & EMI/EMC Checklist (PDF)',
    learningOutcomes: [
      'Design complete schematics and PCB layouts from component selection to routing in KiCad',
      'Plan 4-layer and 6-layer stackups with continuous ground reference return paths',
      'Route controlled-impedance differential pairs (90Ω USB, 100Ω Ethernet)',
      'Mitigate EMI/EMC noise, ground bounce, and crosstalk using decoupling capacitors',
      'Generate professional Gerber, Drill, and Bill of Materials (BOM) files for manufacturing'
    ],
    modules: []
  },
  {
    id: 'crs_semi_prep_601',
    title: 'Semiconductor Placement Masterclass: Texas Instruments, Qualcomm & Intel',
    category: 'Core Placements',
    instructor: 'Venkatesh Iyer',
    instructorTitle: 'Core Electronics Placement Lead & Ex-Cadence Design Systems',
    instructorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    rating: 4.97,
    reviewsCount: 2450,
    studentsEnrolled: 31000,
    duration: '30 Hours • 9 Modules',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    description: 'The ultimate placement cracking blueprint for ECE core companies. Step-by-step solutions to past technical screening papers from Texas Instruments, Qualcomm, Intel, AMD, Nvidia, and NXP, plus mock interview coaching.',
    pdfNotesTitle: 'Top 250 Semiconductor Interview Questions & Circuit Solutions',
    learningOutcomes: [
      'Solve RLC transient circuits, op-amp configurations, and diode clippers in under 60 seconds',
      'Master digital design puzzles: clock dividers, gray code counters, sequence detectors',
      'Ace Embedded C bit manipulation questions (swap nibbles, count set bits, circular queues)',
      'Explain your final year hardware / FPGA capstone project with conviction to hiring managers',
      'Negotiate base pay and joining bonuses for premier core engineering offers'
    ],
    modules: []
  }
];

export const practiceQuestionsData: PracticeQuestion[] = [
  {
    id: 'ece_q1',
    category: 'Technical',
    topic: 'Digital Logic & Static Timing Analysis',
    question: 'A D flip-flop has a setup time of 3 ns, a hold time of 2 ns, and a clock-to-Q delay of 4 ns. It feeds another D flip-flop via combinational logic having a delay of 5 ns. What is the maximum clock frequency (Fmax) at which this circuit can operate reliably without setup violations (assume zero clock skew)?',
    options: ['83.3 MHz', '100 MHz', '125 MHz', '142.8 MHz'],
    correctIndex: 0,
    explanation: 'Minimum clock period T_min = T_clk-to-q + T_comb + T_setup = 4ns + 5ns + 3ns = 12ns. Fmax = 1 / T_min = 1 / (12 * 10^-9) = 83.33 MHz. (Note: Hold time does not limit maximum clock frequency; hold violations are verified for minimum combinational delay).',
    difficulty: 'Medium',
    companyTags: ['Texas Instruments', 'Qualcomm', 'Intel', 'AMD']
  },
  {
    id: 'ece_q2',
    category: 'Technical',
    topic: 'Analog Circuits & Operational Amplifiers',
    question: 'In an ideal Op-Amp inverting amplifier configuration with input resistor R1 = 10 kΩ and feedback resistor Rf = 100 kΩ, a 0.5 V DC voltage is applied to the input terminal. If the op-amp power rails are ±15 V, what is the output voltage Vout and the voltage at the inverting node (V-)?',
    options: [
      'Vout = -5.0 V, V- = 0.0 V (Virtual Ground)',
      'Vout = +5.0 V, V- = 0.5 V',
      'Vout = -5.0 V, V- = 0.5 V',
      'Vout = -15.0 V (Saturated), V- = 0.0 V'
    ],
    correctIndex: 0,
    explanation: 'For an ideal op-amp with negative feedback, the non-inverting terminal is connected to ground (0V), so virtual ground forces V- = 0V. Voltage gain Av = -Rf / R1 = -100k / 10k = -10. Therefore, Vout = Av * Vin = -10 * 0.5V = -5.0 V (well within ±15V rails).',
    difficulty: 'Easy',
    companyTags: ['Texas Instruments', 'Analog Devices', 'Bosch']
  },
  {
    id: 'ece_q3',
    category: 'Technical',
    topic: 'Embedded Systems & C Programming',
    question: 'In Embedded C for a 32-bit microcontroller, which C expression correctly sets bit 5 and clears bit 2 of a 32-bit register `REG` in an atomic bitwise manner without modifying any other bits?',
    options: [
      'REG = (REG | (1 << 5)) & ~(1 << 2);',
      'REG = (REG & (1 << 5)) | ~(1 << 2);',
      'REG |= (1 << 5) ^ (1 << 2);',
      'REG = REG + (1 << 5) - (1 << 2);'
    ],
    correctIndex: 0,
    explanation: 'To set bit 5: Bitwise OR with `(1 << 5)`. To clear bit 2: Bitwise AND with the bitwise NOT of mask `~(1 << 2)`. Combining them gives `REG = (REG | (1 << 5)) & ~(1 << 2);`.',
    difficulty: 'Easy',
    companyTags: ['Qualcomm', 'Bosch', 'NXP', 'STM32']
  },
  {
    id: 'ece_q4',
    category: 'Technical',
    topic: 'Signals & Systems',
    question: 'A continuous-time signal x(t) = 5 cos(200πt) + 3 sin(600πt) is to be sampled without any aliasing distortion. What is the theoretical minimum Nyquist sampling rate (Fs)?',
    options: ['300 Hz', '600 Hz', '1200 Hz', '200 Hz'],
    correctIndex: 1,
    explanation: 'Angular frequency ω1 = 200π rad/s => f1 = 100 Hz. Angular frequency ω2 = 600π rad/s => f2 = 300 Hz. The highest frequency component is f_max = 300 Hz. According to the Nyquist-Shannon sampling theorem, minimum sampling frequency Fs >= 2 * f_max = 2 * 300 = 600 Hz.',
    difficulty: 'Medium',
    companyTags: ['Qualcomm', 'Intel', 'MediaTek', 'Broadcom']
  },
  {
    id: 'ece_q5',
    category: 'Technical',
    topic: 'VLSI & Verilog HDL',
    question: 'How many 2-to-1 multiplexers are required to construct a full 1-bit binary adder (Sum and Carry outputs)?',
    options: ['2', '3', '4', '5'],
    correctIndex: 1,
    explanation: 'A 2-input XOR gate can be implemented using one 2-to-1 MUX. A 1-bit full adder requires two XOR gates (for Sum = A ⊕ B ⊕ Cin, needing two 2-to-1 MUXes) and logic for Carry = AB + Cin(A ⊕ B), which can be selected via a third 2-to-1 MUX. Total = 3 multiplexers.',
    difficulty: 'Hard',
    companyTags: ['Nvidia', 'Texas Instruments', 'Intel', 'AMD']
  },
  {
    id: 'ece_q6',
    category: 'Technical',
    topic: 'Microprocessors & Computer Architecture',
    question: 'What is the primary difference between Von Neumann and Harvard computer architectures?',
    options: [
      'Von Neumann uses 32-bit registers while Harvard uses 64-bit registers',
      'Harvard architecture has physically separate memory and buses for instructions and data, enabling simultaneous access',
      'Von Neumann architecture does not support interrupt handling',
      'Harvard architecture requires an external Math coprocessor'
    ],
    correctIndex: 1,
    explanation: 'Harvard architecture utilizes separate physical memory spaces and separate address/data buses for code (instruction) and data, allowing the processor to fetch instructions and read/write data simultaneously. Most modern DSPs and ARM Cortex-M cores use modified Harvard architectures.',
    difficulty: 'Easy',
    companyTags: ['Intel', 'ARM', 'Qualcomm', 'Texas Instruments']
  }
];

export const companiesData: CompanyPrepInfo[] = [
  {
    id: 'cmp_ti',
    name: 'Texas Instruments',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop&q=80',
    description: 'Premier global semiconductor designer and manufacturer specializing in Analog Chips, Embedded Processing (MSP430/C2000), and Power Management.',
    avgPackage: '₹24.0 - ₹38.0 LPA (Base + Benefits + RSU)',
    role: 'Analog Design Engineer / Embedded Systems Engineer / Application Engineer',
    difficulty: 'Very Hard',
    rounds: [
      'Technical Screening Test (Analog Circuits, RLC Transients, Digital Logic, C)',
      'Technical Interview Round 1 (Circuit Analysis, Op-Amps, KCL/KVL on Whiteboard)',
      'Technical Interview Round 2 (Embedded C, Peripherals, Final Year Capstone Project)',
      'HR & Leadership Values Round'
    ],
    keyTopics: [
      'Operational Amplifier Non-Idealities (Slew Rate, Input Offset Voltage, CMRR)',
      'RLC First-Order & Second-Order Transient Step Response',
      'MOSFET / BJT Small-Signal Gain & Bias Circuits',
      'Embedded C Bit Manipulation, Volatile Pointers, and ISRs',
      'ADC/DAC Sampling and Nyquist Criteria'
    ],
    pastQuestionsCount: 145,
    cutoffInfo: 'Requires 70%+ in core technical screening test with zero penalty on circuit derivations.',
    sampleQuestions: [practiceQuestionsData[0], practiceQuestionsData[1], practiceQuestionsData[2]]
  },
  {
    id: 'cmp_qualcomm',
    name: 'Qualcomm',
    logo: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=100&auto=format&fit=crop&q=80',
    description: 'World leader in 5G wireless technology, Snapdragon mobile processors, wireless modems, and edge AI semiconductor platforms.',
    avgPackage: '₹22.5 - ₹35.0 LPA',
    role: 'Hardware Engineer (RTL/VLSI) / Modem Firmware Engineer / DSP Engineer',
    difficulty: 'Very Hard',
    rounds: [
      'Qualcomm Online Assessment (Verilog RTL, C Data Structures, Aptitude, Telecom)',
      'Technical Round 1 (Verilog FSM, Setup/Hold Timing Analysis, CDC)',
      'Technical Round 2 (C Pointers, Linked Lists, Memory Architecture, OS)',
      'Managerial & Fitment Round'
    ],
    keyTopics: [
      'Verilog RTL Coding: Sequence Detectors, Clock Dividers, Synchronizers',
      'Static Timing Analysis (STA): Setup Time, Hold Time, Clock Skew, Jitter',
      'Wireless Communications: OFDM, Modulation Schemes (QPSK, QAM), 5G NR',
      'Embedded C: Memory Alignment, Endianness, Bit Fields, Volatile Keyword',
      'Computer Architecture: Cache Coherency, Pipelining Hazards'
    ],
    pastQuestionsCount: 160,
    cutoffInfo: 'Requires passing all hidden testcases in C/Verilog coding and 75%+ score in hardware MCQ section.',
    sampleQuestions: [practiceQuestionsData[0], practiceQuestionsData[3], practiceQuestionsData[4]]
  },
  {
    id: 'cmp_intel_amd',
    name: 'Intel & AMD',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
    description: 'Leading global x86 and ARM processor innovators, graphics processing units (Radeon), and semiconductor fabrication leaders.',
    avgPackage: '₹21.0 - ₹34.0 LPA',
    role: 'Silicon Design Engineer / Pre-Silicon Verification Engineer / Firmware Engineer',
    difficulty: 'Hard',
    rounds: [
      'Cognitive & Technical Assessment (Digital Electronics, Architecture, C++)',
      'Technical Interview 1 (Digital Logic Synthesis, K-Maps, FSM Design)',
      'Technical Interview 2 (SystemVerilog / UVM Verification concepts, Python Scripting)',
      'Director Round'
    ],
    keyTopics: [
      'Microprocessor Architecture: Superscalar execution, Branch Prediction, Out-of-Order',
      'Digital Logic: Multiplexers, Decoders, Carry-Lookahead Adders, Multipliers',
      'Memory Hierarchy: L1/L2/L3 Cache, Virtual Memory, Translation Lookaside Buffer (TLB)',
      'SystemVerilog OOP: Classes, Randomization, Assertions (SVA)',
      'Linux Shell Scripting, Makefiles, and Python Automation'
    ],
    pastQuestionsCount: 130,
    cutoffInfo: 'Top 5% percentile in digital logic and computer architecture sections.',
    sampleQuestions: [practiceQuestionsData[4], practiceQuestionsData[5]]
  },
  {
    id: 'cmp_nvidia',
    name: 'Nvidia',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    description: 'The AI computing pioneer powering global datacenter GPUs, high-speed NVLink interconnects, and automotive autonomous drive chips.',
    avgPackage: '₹30.0 - ₹48.0 LPA (Highest campus semiconductor package)',
    role: 'ASIC Design Engineer / GPU Architecture Verification Engineer',
    difficulty: 'Very Hard',
    rounds: [
      'Nvidia Technical Challenge (Hardware Architecture, C++, Verilog, Logic Puzzles)',
      'Deep Technical Interview 1 (Complex FSMs, FIFO Buffers, High-Speed Clocking)',
      'Deep Technical Interview 2 (Memory Subsystems, Bus Protocols PCIe/AXI, Low-Power Design)',
      'Architecture Bar Raiser Round'
    ],
    keyTopics: [
      'Asynchronous FIFO Design using Gray Codes across Clock Domains',
      'Low-Power VLSI: Clock Gating, Power Gating, Dynamic Voltage & Frequency Scaling (DVFS)',
      'High-Speed Bus Protocols: AMBA AXI, APB, PCIe Gen 5',
      'C++ Data Structures, Algorithms, and CUDA Basics'
    ],
    pastQuestionsCount: 175,
    cutoffInfo: 'Flawless hardware design whiteboard interview and clean RTL coding.',
    sampleQuestions: [practiceQuestionsData[0], practiceQuestionsData[4]]
  },
  {
    id: 'cmp_bosch',
    name: 'Bosch & NXP Semiconductors',
    logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=100&auto=format&fit=crop&q=80',
    description: 'Automotive electronics leaders creating Electronic Control Units (ECUs), CAN/LIN networks, automotive sensors, and radar safety systems.',
    avgPackage: '₹12.0 - ₹19.5 LPA',
    role: 'Embedded Software Engineer / Automotive Electronics Hardware Specialist',
    difficulty: 'Moderate',
    rounds: [
      'Online Aptitude & Technical Test (C Programming, Microcontrollers, Circuits)',
      'Technical Interview 1 (ARM Cortex-M, CAN Bus Protocol, Sensor Interfacing)',
      'Technical Interview 2 (Debugging firmware bugs, Circuit schematics)',
      'HR Round'
    ],
    keyTopics: [
      'Controller Area Network (CAN) Protocol: Frame format, Arbitration, Differential signaling',
      'Microcontroller Peripherals: ADC sampling, PWM motor control, Watchdog timers',
      'AUTOSAR Architecture Basics & ISO 26262 Functional Safety',
      'Schematic reading and circuit board troubleshooting with Oscilloscopes'
    ],
    pastQuestionsCount: 110,
    cutoffInfo: 'Requires strong understanding of Embedded C and hands-on microcontroller project experience.',
    sampleQuestions: [practiceQuestionsData[2], practiceQuestionsData[5]]
  }
];

export const codingProblemsData: CodingProblem[] = [
  {
    id: 'p_01',
    title: 'Embedded C: Bitwise Register Manipulation (Set, Clear, Toggle)',
    category: 'Embedded C',
    difficulty: 'Easy',
    acceptanceRate: '68.4%',
    description: `In embedded microcontroller firmware development, hardware peripherals are controlled by manipulating individual bits of memory-mapped control registers.

Given a 32-bit unsigned integer \`reg\`, a bit position \`k\` (0 to 31), and an operation code \`op\` (1 = Set bit, 2 = Clear bit, 3 = Toggle bit):
Return the resulting 32-bit unsigned integer value in hexadecimal format (prefixed with "0x").`,
    inputFormat: 'Single line containing three space-separated integers: reg k op',
    outputFormat: 'Hexadecimal string representation of the modified register (e.g. 0x24)',
    constraints: '0 <= reg <= 2^32 - 1\n0 <= k <= 31\nop in {1, 2, 3}',
    starterCode: {
      python: `def manipulate_register(reg: int, k: int, op: int) -> str:
    if op == 1:
        # Set bit k
        reg |= (1 << k)
    elif op == 2:
        # Clear bit k
        reg &= ~(1 << k)
    elif op == 3:
        # Toggle bit k
        reg ^= (1 << k)
    return hex(reg)

import sys
input_data = sys.stdin.read().split()
if input_data:
    reg = int(input_data[0])
    k = int(input_data[1])
    op = int(input_data[2])
    print(manipulate_register(reg, k, op))
`,
      javascript: `function manipulateRegister(reg, k, op) {
    if (op === 1) {
        reg = reg | (1 << k);
    } else if (op === 2) {
        reg = reg & ~(1 << k);
    } else if (op === 3) {
        reg = reg ^ (1 << k);
    }
    return "0x" + (reg >>> 0).toString(16);
}

const input = require('fs').readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);
if (input.length >= 3) {
    console.log(manipulateRegister(parseInt(input[0]), parseInt(input[1]), parseInt(input[2])));
}
`,
      cpp: `#include <iostream>
#include <iomanip>
using namespace std;

uint32_t manipulateRegister(uint32_t reg, int k, int op) {
    if (op == 1) {
        reg |= (1U << k);
    } else if (op == 2) {
        reg &= ~(1U << k);
    } else if (op == 3) {
        reg ^= (1U << k);
    }
    return reg;
}

int main() {
    uint32_t reg;
    int k, op;
    if (cin >> reg >> k >> op) {
        uint32_t res = manipulateRegister(reg, k, op);
        cout << "0x" << hex << res << endl;
    }
    return 0;
}
`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long reg = sc.nextLong();
            int k = sc.nextInt();
            int op = sc.nextInt();
            if (op == 1) {
                reg |= (1L << k);
            } else if (op == 2) {
                reg &= ~(1L << k);
            } else if (op == 3) {
                reg ^= (1L << k);
            }
            System.out.println("0x" + Long.toHexString(reg));
        }
    }
}
`
    },
    sampleCases: [
      {
        input: '0 5 1',
        expectedOutput: '0x20',
        explanation: 'Initial reg=0. Setting bit 5 yields 2^5 = 32 = 0x20.'
      },
      {
        input: '36 2 2',
        expectedOutput: '0x20',
        explanation: 'Initial reg=36 (0b100100). Clearing bit 2 yields 0b100000 = 32 = 0x20.'
      }
    ],
    solutionExplanation: 'Bitwise operations are fundamental in microcontroller firmware. Setting a bit uses `OR (1 << k)`, clearing uses `AND ~(1 << k)`, and toggling uses `XOR (1 << k)`.'
  },
  {
    id: 'p_02',
    title: 'Embedded C: Circular Ring Buffer for UART Driver',
    category: 'Embedded C',
    difficulty: 'Medium',
    acceptanceRate: '52.1%',
    description: `A circular ring buffer (FIFO) is standard in serial UART drivers to prevent dropped bytes between interrupt service routines (ISR) and the main processing loop.

Given a buffer capacity \`CAP\` (always a power of 2, e.g. 8, 16), write a simulation that processes a sequence of \`ENQUEUE <byte>\` and \`DEQUEUE\` operations.
When \`DEQUEUE\` is called, print the removed byte, or "-1" if the buffer is empty. If an \`ENQUEUE\` occurs when the buffer is full, drop the byte and print "OVERFLOW".`,
    inputFormat: 'Line 1: Capacity CAP\nLine 2: Number of operations Q\nNext Q lines: ENQUEUE <val> OR DEQUEUE',
    outputFormat: 'Print the output of each DEQUEUE or OVERFLOW event separated by space',
    constraints: 'CAP in {4, 8, 16, 32}\n1 <= Q <= 100\n0 <= byte <= 255',
    starterCode: {
      python: `class RingBuffer:
    def __init__(self, capacity):
        self.capacity = capacity
        self.buf = [0] * capacity
        self.head = 0
        self.tail = 0
        self.count = 0

    def enqueue(self, val):
        if self.count == self.capacity:
            return "OVERFLOW"
        self.buf[self.tail] = val
        self.tail = (self.tail + 1) % self.capacity
        self.count += 1
        return None

    def dequeue(self):
        if self.count == 0:
            return -1
        val = self.buf[self.head]
        self.head = (self.head + 1) % self.capacity
        self.count -= 1
        return val

# Simulation loop
import sys
lines = sys.stdin.read().splitlines()
if lines:
    cap = int(lines[0])
    q = int(lines[1])
    rb = RingBuffer(cap)
    out = []
    for i in range(2, 2 + q):
        parts = lines[i].split()
        if parts[0] == 'ENQUEUE':
            res = rb.enqueue(int(parts[1]))
            if res: out.append(res)
        elif parts[0] == 'DEQUEUE':
            out.append(str(rb.dequeue()))
    print(" ".join(out))
`,
      javascript: `// Circular Buffer implementation in JS
const fs = require('fs');
const lines = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
    const cap = parseInt(lines[0]);
    const q = parseInt(lines[1]);
    const buf = new Array(cap);
    let head = 0, tail = 0, count = 0;
    const out = [];

    for (let i = 2; i < 2 + q; i++) {
        const parts = lines[i].trim().split(/\\s+/);
        if (parts[0] === 'ENQUEUE') {
            if (count === cap) {
                out.push("OVERFLOW");
            } else {
                buf[tail] = parseInt(parts[1]);
                tail = (tail + 1) % cap;
                count++;
            }
        } else if (parts[0] === 'DEQUEUE') {
            if (count === 0) {
                out.push("-1");
            } else {
                const val = buf[head];
                head = (head + 1) % cap;
                count--;
                out.push(val.toString());
            }
        }
    }
    console.log(out.join(" "));
}
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    int cap, q;
    if (cin >> cap >> q) {
        vector<int> buf(cap);
        int head = 0, tail = 0, count = 0;
        vector<string> out;

        for (int i = 0; i < q; i++) {
            string cmd;
            cin >> cmd;
            if (cmd == "ENQUEUE") {
                int val;
                cin >> val;
                if (count == cap) {
                    out.push_back("OVERFLOW");
                } else {
                    buf[tail] = val;
                    tail = (tail + 1) % cap;
                    count++;
                }
            } else if (cmd == "DEQUEUE") {
                if (count == 0) {
                    out.push_back("-1");
                } else {
                    int val = buf[head];
                    head = (head + 1) % cap;
                    count--;
                    out.push_back(to_string(val));
                }
            }
        }

        for (size_t i = 0; i < out.size(); i++) {
            cout << out[i] << (i + 1 == out.size() ? "" : " ");
        }
        cout << endl;
    }
    return 0;
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int cap = sc.nextInt();
            int q = sc.nextInt();
            int[] buf = new int[cap];
            int head = 0, tail = 0, count = 0;
            List<String> out = new ArrayList<>();

            for (int i = 0; i < q; i++) {
                String cmd = sc.next();
                if (cmd.equals("ENQUEUE")) {
                    int val = sc.nextInt();
                    if (count == cap) {
                        out.add("OVERFLOW");
                    } else {
                        buf[tail] = val;
                        tail = (tail + 1) % cap;
                        count++;
                    }
                } else if (cmd.equals("DEQUEUE")) {
                    if (count == 0) {
                        out.add("-1");
                    } else {
                        int val = buf[head];
                        head = (head + 1) % cap;
                        count--;
                        out.add(String.valueOf(val));
                    }
                }
            }
            System.out.println(String.join(" ", out));
        }
    }
}
`
    },
    sampleCases: [
      {
        input: '4\n5\nENQUEUE 10\nENQUEUE 20\nDEQUEUE\nENQUEUE 30\nDEQUEUE',
        expectedOutput: '10 20',
        explanation: 'Enqueued 10, 20. First dequeue returns 10. Enqueued 30. Second dequeue returns 20.'
      }
    ],
    solutionExplanation: 'Circular buffers allow O(1) push and pop using head and tail pointers with modulo arithmetic, perfect for fixed-RAM embedded systems.'
  },
  {
    id: 'p_03',
    title: 'Verilog HDL: 4-to-1 Multiplexer Behavioral & RTL Model',
    category: 'Verilog & VLSI',
    difficulty: 'Easy',
    acceptanceRate: '74.5%',
    description: `In digital VLSI design, a 4-to-1 multiplexer selects one of four 8-bit input data lines (in0, in1, in2, in3) based on a 2-bit select line (sel[1:0]) and routes it to the output \`out\`.

Given the 4 data values and the select value, determine the output value.`,
    inputFormat: 'Line 1: Four space-separated integers in0 in1 in2 in3\nLine 2: An integer sel (0 to 3)',
    outputFormat: 'The selected integer output',
    constraints: '0 <= in0, in1, in2, in3 <= 255\n0 <= sel <= 3',
    starterCode: {
      python: `def mux4to1(in0: int, in1: int, in2: int, in3: int, sel: int) -> int:
    inputs = [in0, in1, in2, in3]
    return inputs[sel]

import sys
lines = sys.stdin.read().split()
if len(lines) >= 5:
    inputs = [int(x) for x in lines[:4]]
    sel = int(lines[4])
    print(mux4to1(inputs[0], inputs[1], inputs[2], inputs[3], sel))
`,
      javascript: `function mux4to1(in0, in1, in2, in3, sel) {
    const arr = [in0, in1, in2, in3];
    return arr[sel];
}
const fs = require('fs');
const parts = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);
if (parts.length >= 5) {
    console.log(mux4to1(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]), parseInt(parts[3]), parseInt(parts[4])));
}
`,
      cpp: `#include <iostream>
using namespace std;

int mux4to1(int in0, int in1, int in2, int in3, int sel) {
    switch (sel) {
        case 0: return in0;
        case 1: return in1;
        case 2: return in2;
        case 3: return in3;
        default: return 0;
    }
}

int main() {
    int in0, in1, in2, in3, sel;
    if (cin >> in0 >> in1 >> in2 >> in3 >> sel) {
        cout << mux4to1(in0, in1, in2, in3, sel) << endl;
    }
    return 0;
}
`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int in0 = sc.nextInt();
            int in1 = sc.nextInt();
            int in2 = sc.nextInt();
            int in3 = sc.nextInt();
            int sel = sc.nextInt();
            int[] arr = {in0, in1, in2, in3};
            System.out.println(arr[sel]);
        }
    }
}
`
    },
    sampleCases: [
      {
        input: '12 45 78 99\n2',
        expectedOutput: '78',
        explanation: 'sel=2 selects in2, which is 78.'
      }
    ],
    solutionExplanation: 'In Verilog HDL, this is implemented cleanly via `assign out = (sel == 2\'b00) ? in0 : (sel == 2\'b01) ? in1 : (sel == 2\'b10) ? in2 : in3;` or a `case (sel)` construct.'
  }
];

export const mockTestsData: MockTest[] = [
  {
    id: 't_01',
    title: 'Texas Instruments Analog & Embedded Grand Assessment',
    category: 'Full Placement Mock',
    companyTag: 'Texas Instruments',
    durationMinutes: 45,
    totalQuestions: 15,
    totalMarks: 30,
    questions: [
      {
        id: 't1_q1',
        section: 'Analog & Circuits',
        question: 'In an op-amp integrator circuit with input resistor R and feedback capacitor C, a constant DC step voltage Vin is applied at t = 0. The output voltage Vout(t) will be:',
        options: [
          'An exponentially rising voltage',
          'A linearly decreasing ramp with slope -Vin / (R*C)',
          'A constant DC voltage of magnitude -Vin',
          'A sinusoidal oscillation at frequency 1 / (2πRC)'
        ],
        correctIndex: 1,
        explanation: 'For an ideal inverting integrator, Vout(t) = -(1/RC) * ∫ Vin dt. For a constant DC input Vin, Vout(t) = -(Vin / RC) * t, which is a linear negative slope ramp until the op-amp saturates at the negative supply rail.',
        marks: 2
      },
      {
        id: 't1_q2',
        section: 'Digital Logic',
        question: 'In a Master-Slave J-K Flip-Flop, race-around condition is prevented because:',
        options: [
          'The propagation delay is greater than the clock pulse width',
          'The master is enabled when clock is high and slave is enabled when clock is low (separate clock phases)',
          'Feedback is completely removed',
          'It uses an internal RC delay filter'
        ],
        correctIndex: 1,
        explanation: 'Master-Slave configuration isolates input and output changes across complementary clock levels: Master catches data on CLK=1 while Slave is disconnected, and Slave updates output on CLK=0 while Master is isolated, completely breaking the race loop.',
        marks: 2
      },
      {
        id: 't1_q3',
        section: 'Embedded C',
        question: 'What is the value of `x` after executing `uint8_t x = 0x5A; x = ((x & 0x0F) << 4) | ((x & 0xF0) >> 4);` in C?',
        options: ['0xA5', '0x5A', '0xAA', '0x55'],
        correctIndex: 0,
        explanation: 'This code swaps the upper and lower 4-bit nibbles of a byte. Lower nibble 0xA becomes 0xA0, and upper nibble 0x5 becomes 0x05. Bitwise ORing them results in 0xA5.',
        marks: 2
      },
      {
        id: 't1_q4',
        section: 'Signals & Systems',
        question: 'What is the region of convergence (ROC) of the Z-transform for a stable causal discrete-time LTI system?',
        options: [
          'Inside a circle of radius less than 1',
          'Outside the circle containing the outermost pole, and including the unit circle |z| = 1',
          'Only along the imaginary axis',
          'Any region not containing zeros'
        ],
        correctIndex: 1,
        explanation: 'For a causal system, the ROC is exterior to the circle of radius equal to the largest pole magnitude (|z| > r_max). For stability, the ROC must include the unit circle (|z| = 1).',
        marks: 2
      }
    ]
  },
  {
    id: 't_02',
    title: 'Qualcomm VLSI, RTL & Static Timing Assessment',
    category: 'Technical CS Mock',
    companyTag: 'Qualcomm',
    durationMinutes: 30,
    totalQuestions: 10,
    totalMarks: 20,
    questions: [
      {
        id: 't2_q1',
        section: 'VLSI & Verilog',
        question: 'In Static Timing Analysis (STA), how does an increase in clock operating frequency affect Hold Time violations?',
        options: [
          'It increases the risk of hold violations',
          'It decreases the risk of hold violations',
          'Hold time is completely independent of the clock period / frequency',
          'It turns hold violations into setup violations'
        ],
        correctIndex: 2,
        explanation: 'Hold condition requires: T_clk-to-q + T_comb >= T_hold + T_skew. Notice that the clock period T_clk is completely absent from this equation! Therefore, changing clock frequency has zero effect on fixing or causing hold violations.',
        marks: 2
      }
    ]
  }
];

export const sampleResumeData: ResumeData = {
  fullName: 'Karthik Rao',
  email: 'karthik.rao@student.nit.edu',
  phone: '+91 98765 43210',
  location: 'Bengaluru / Hyderabad, India • Open to Relocation',
  githubUrl: 'github.com/karthikrao-vlsi',
  linkedinUrl: 'linkedin.com/in/karthik-rao-ece',
  targetRole: 'VLSI RTL Design Engineer / Embedded Systems Firmware Engineer',
  summary: 'Electronics and Communication Engineering (ECE) senior with hands-on expertise in Verilog HDL, ARM Cortex-M bare-metal firmware, KiCad multi-layer PCB design, and Static Timing Analysis. Proven track record synthesizing softcores on Xilinx Artix-7 FPGAs and designing low-noise analog signal conditioning circuits.',
  education: [
    {
      id: 'edu_1',
      institution: 'National Institute of Technology (NIT)',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Electronics and Communication Engineering (ECE)',
      startYear: '2022',
      endYear: '2026',
      grade: '8.92 / 10.0 CGPA'
    }
  ],
  experience: [
    {
      id: 'exp_1',
      company: 'Semiconductor Innovations Lab (TI Student Chapter)',
      role: 'Embedded Firmware & Hardware Intern',
      startDate: 'May 2025',
      endDate: 'Aug 2025',
      bullets: [
        'Developed bare-metal register-level device drivers (I2C, SPI, UART) for STM32F4 Cortex-M4 microcontroller.',
        'Synthesized a 5-stage pipelined RISC-V RV32I integer core in Verilog HDL on Xilinx Artix-7 FPGA at 100 MHz.',
        'Designed a 4-layer impedance-matched PCB in KiCad with ground plane return paths, passing EMI laboratory pre-scans.'
      ]
    }
  ],
  projects: [
    {
      id: 'prj_1',
      title: 'FPGA 32-bit RISC-V Softcore Processor & Peripheral Subsystem',
      technologies: 'Verilog HDL, Xilinx Vivado, Artix-7 FPGA, ModelSim, Static Timing Analysis',
      description: 'Synthesizable 32-bit RV32I softcore with hazard detection, branch prediction unit, and UART peripheral memory-mapped controller.',
      bullets: [
        'Achieved zero setup and hold violations at 100MHz clock constraint across 5,200 FPGA logic slices.',
        'Verified RTL functionality with a self-checking testbench achieving 100% statement and branch coverage.'
      ]
    },
    {
      id: 'prj_2',
      title: 'Real-Time ECG Biomedical Telemetry Monitor with STM32',
      technologies: 'Embedded C, STM32F446RE, FreeRTOS, Analog AD8232, SPI OLED, KiCad',
      description: 'Battery-powered bio-potential amplifier with 2nd order active bandpass filter and FreeRTOS multi-threading for real-time heart rate estimation.',
      bullets: [
        'Wrote DMA-driven 12-bit ADC driver sampling at 500 Hz with digital moving average filtering.',
        'Designed low-noise analog front-end with 80dB CMRR suppressing 50Hz AC mains power interference.'
      ]
    }
  ],
  skills: {
    languages: 'Verilog HDL, SystemVerilog (Basics), Embedded C, C++, Python, MATLAB',
    frameworks: 'FreeRTOS, CMSIS Core, STM32Cube, TinyML, MicroPython',
    tools: 'Xilinx Vivado, KiCad PCB, Keil uVision, STM32CubeIDE, Logic Analyzers, Oscilloscopes, Git',
    coreConcepts: 'Digital VLSI Design, Static Timing Analysis (STA), FSM RTL, Analog Circuits, ARM Cortex-M Architecture, Signal Processing (DSP)'
  },
  certifications: [
    {
      id: 'cert_1',
      title: 'SkillSphere Certified VLSI RTL & FPGA Engineer',
      issuer: 'SkillSphere ECE Academy',
      date: 'July 2026'
    },
    {
      id: 'cert_2',
      title: 'ARM Accredited MCU Engineer (AAME)',
      issuer: 'ARM University Program',
      date: 'Feb 2026'
    }
  ]
};

export const faqsData = [
  {
    q: 'How is SkillSphere specially tailored for Electronics & Communication Engineering (ECE) students?',
    a: 'SkillSphere ECE focuses strictly on core electronics, semiconductor, and embedded careers. Instead of generic web dev or IT service training, our curriculum, coding sandboxes, mock tests, and AI mentors are designed for VLSI RTL design, Embedded C firmware, Analog circuits, and placements at giants like Texas Instruments, Qualcomm, Intel, AMD, and Nvidia.'
  },
  {
    q: 'Can I practice both Embedded C and Verilog HDL in the coding sandbox?',
    a: 'Yes! The hardware coding sandbox lets you write register manipulation code, circular buffers, and synthesizable Verilog modules with real-time testbenches and timing verification.'
  },
  {
    q: 'How does SphereAI ECE Mentor assist in circuit and hardware doubts?',
    a: 'SphereAI is trained on circuit theory, op-amp derivation, Static Timing Analysis (setup/hold calculations), K-maps, and Embedded C register configurations. You can ask it to debug schematics, verify KCL/KVL steps, or prepare for semiconductor interviews.'
  },
  {
    q: 'What hardware is available in the Lumixora ECE Campus Store?',
    a: 'The store provides student-subsidized lab essentials: STM32 Nucleo boards, USB Digital Storage Oscilloscopes, 8-channel Logic Analyzers, ESP32-S3 IoT boards, soldering stations, and complete 850+ piece electronic component lab kits delivered straight to your campus hostel.'
  }
];

export const testimonialsData = [
  {
    id: 't_1',
    name: 'Rohan Deshmukh',
    role: 'Placed at Texas Instruments (Analog Design Engineer)',
    companyLogo: 'Texas Instruments',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    content: 'The Texas Instruments company track on SkillSphere ECE covered the exact op-amp virtual ground and RLC transient questions asked in my technical interview. The circuit simulations were invaluable!'
  },
  {
    id: 't_2',
    name: 'Ananya Varma',
    role: 'Placed at Qualcomm (Modem Firmware Engineer)',
    companyLogo: 'Qualcomm',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    content: 'As an ECE student, most platforms only teach LeetCode. SkillSphere ECE taught me actual Embedded C, volatile register pointers, and ARM Cortex interrupts that got me through Qualcomm!'
  },
  {
    id: 't_3',
    name: 'Pranav Joshi',
    role: 'Placed at Intel (Pre-Silicon Verification Engineer)',
    companyLogo: 'Intel',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    content: 'The Verilog RTL practice problems and Setup/Hold timing analysis modules helped me crack Intel on my first attempt. The ATS resume template specifically highlighted my FPGA projects.'
  }
];
