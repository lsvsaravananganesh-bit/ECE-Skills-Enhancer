# ECEPath — ECE Career & Skills Platform

ECEPath is a practical career intelligence platform built specifically for Electronics & Communication Engineering students.

## What is included

- Career explorer covering VLSI, Embedded, FPGA, IoT, Hardware/PCB, Telecom/DSP, Automotive, AI/Software and Defence/Space/PSU paths.
- Company directory with preparation skills, relevant roles and official careers links.
- 14 structured courses including VLSI, Verilog, SystemVerilog, Physical Design, Embedded/STM32, IoT, FPGA, PCB, DSP, Communication, Python, Embedded Linux, AI/ML and Java/DSA.
- Practice Arena with HDLBits, EDA Playground, Wokwi, LeetCode, HackerRank, CodeChef, Kaggle, Colab, MATLAB Onramp, OpenLane and GitHub.
- Career roadmaps for RTL/VLSI, Embedded, FPGA, IoT, Software and Telecom/DSP.
- AI Career Finder with a no-API-key fallback recommendation engine.
- Student Dashboard with saved courses and completion progress stored in browser localStorage.
- Responsive dark/light UI and hash-based navigation that works on static hosting.
- Existing Gemini server integration remains available for AI features when `GEMINI_API_KEY` is configured.

## Tech stack

React 19 + TypeScript + Vite + Tailwind CSS v4 + Lucide React + Express + Google Gemini SDK.

## Run locally

```bash
npm install
npm run dev
```

Open the local development URL shown by Vite/Express.

For a production build:

```bash
npm run build
npm start
```

Type checking:

```bash
npm run lint
```

## Optional Gemini configuration

Copy `.env.example` to `.env` and configure `GEMINI_API_KEY` if you want the server-side Gemini endpoints enabled. The main career explorer does not require an API key.

## Project structure

```text
src/
  App.tsx
  index.css
  main.tsx
  data/
    eceCatalog.ts
  components/       # existing reusable components
  views/            # existing feature views retained for future expansion
server.ts           # Express + Gemini API server
vite.config.ts
```

## Important

Company information is intended for preparation and discovery. Always check the official company careers page for current job openings, eligibility, skills and application deadlines.

## Repository

https://github.com/lsvsaravananganesh-bit/ECE-Skills-Enhancer
