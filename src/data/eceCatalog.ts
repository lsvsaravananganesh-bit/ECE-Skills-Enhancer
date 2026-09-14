export type CareerDomain = { id: string; name: string; icon: string; description: string; roles: string[]; skills: string[] };
export type Company = { id: string; name: string; domain: string; roles: string[]; skills: string[]; careers: string };
export type Course = { id: string; title: string; category: string; level: string; duration: string; description: string; skills: string[]; projects: string[]; practice: string[]; roadmap: string[] };
export type Practice = { id: string; name: string; focus: string; type: string; url: string; description: string };

export const domains: CareerDomain[] = [
  { id:'vlsi', name:'VLSI & Semiconductor', icon:'◈', description:'RTL design, verification, synthesis and chip implementation.', roles:['RTL Design Engineer','Design Verification Engineer','Physical Design Engineer','DFT Engineer','Analog IC Designer'], skills:['Digital Logic','Verilog','SystemVerilog','UVM','STA','Linux'] },
  { id:'embedded', name:'Embedded Systems', icon:'▣', description:'Firmware, microcontrollers, drivers and real-time systems.', roles:['Embedded Engineer','Firmware Engineer','Embedded Linux Engineer','Device Driver Engineer'], skills:['C','Embedded C','ARM','STM32','UART','SPI','I2C','CAN','RTOS'] },
  { id:'fpga', name:'FPGA & Digital Design', icon:'▦', description:'Programmable logic, RTL, timing and hardware acceleration.', roles:['FPGA Engineer','RTL Engineer','Hardware Design Engineer'], skills:['Verilog','SystemVerilog','Vivado','Quartus','Timing Constraints','AXI'] },
  { id:'iot', name:'IoT & Edge', icon:'⌁', description:'Connected devices, sensors, networking and edge computing.', roles:['IoT Engineer','Edge Engineer','IoT Solutions Engineer'], skills:['ESP32','Sensors','MQTT','Python','Cloud','Security'] },
  { id:'hardware', name:'Hardware & PCB', icon:'⌘', description:'Schematic capture, PCB design, testing and product hardware.', roles:['Hardware Design Engineer','PCB Design Engineer','Electronics Test Engineer','FAE'], skills:['Analog','Digital','KiCad','Altium','SPICE','Oscilloscope'] },
  { id:'telecom', name:'Communication & Telecom', icon:'⌁', description:'RF, wireless, optical and communication systems.', roles:['RF Engineer','Telecom Engineer','Network Engineer','DSP Engineer'], skills:['Signals & Systems','DSP','RF','5G','MATLAB','Python'] },
  { id:'auto', name:'Automotive Electronics', icon:'◉', description:'ECUs, CAN, AUTOSAR, ADAS and vehicle electronics.', roles:['Automotive Embedded Engineer','AUTOSAR Engineer','ADAS Engineer'], skills:['C','CAN','AUTOSAR','MATLAB','Simulink','RTOS'] },
  { id:'software', name:'Software / AI for ECE', icon:'⌘', description:'Software, data and AI roles where ECE fundamentals are valuable.', roles:['Software Engineer','Data/AI Engineer','Automation Engineer'], skills:['Python','Java','DSA','SQL','Git','ML'] },
  { id:'govt', name:'Defence, Space & PSU', icon:'★', description:'Engineering careers in defence, aerospace, space and public sector organisations.', roles:['Electronics Engineer','Scientist/Engineer','Technical Officer'], skills:['ECE Core','Digital','Communication','Embedded','GATE'] },
];

export const companies: Company[] = [
  ['qualcomm','Qualcomm','Semiconductor',['RTL','Verification','Embedded'],['Verilog','SystemVerilog','C','Python'],'https://www.qualcomm.com/company/careers'],
  ['intel','Intel','Semiconductor',['VLSI','Verification','FPGA'],['RTL','SystemVerilog','Python','Computer Architecture'],'https://jobs.intel.com/'],
  ['amd','AMD','Semiconductor',['RTL','Verification','FPGA'],['Verilog','SystemVerilog','C++','Architecture'],'https://www.amd.com/en/corporate/careers'],
  ['nvidia','NVIDIA','Semiconductor / AI',['RTL','Hardware','AI'],['CUDA','C++','Digital Design','Python'],'https://www.nvidia.com/en-us/about-nvidia/careers/'],
  ['ti','Texas Instruments','Analog / Embedded',['Analog','Embedded','Applications'],['C','MCU','Analog','PCB'],'https://careers.ti.com/'],
  ['nxp','NXP','Embedded / Automotive',['Embedded','Automotive','Hardware'],['C','ARM','CAN','AUTOSAR'],'https://www.nxp.com/company/about-nxp/careers:CAREERS'],
  ['st','STMicroelectronics','Semiconductor / Embedded',['Embedded','VLSI','Hardware'],['STM32','C','ARM','Digital'],'https://careers.st.com/'],
  ['infineon','Infineon','Power / Automotive',['Embedded','Power','Automotive'],['C','MCU','CAN','Power Electronics'],'https://www.infineon.com/cms/en/about-infineon/career/'],
  ['renesas','Renesas','Embedded / Automotive',['Embedded','Firmware','Automotive'],['C','MCU','RTOS','CAN'],'https://jobs.renesas.com/'],
  ['mediatek','MediaTek','SoC / Wireless',['RTL','VLSI','DSP'],['Verilog','SystemVerilog','DSP','C++'],'https://careers.mediatek.com/'],
  ['broadcom','Broadcom','Networking / Semiconductor',['RTL','Networking','ASIC'],['RTL','C','Networking','Python'],'https://www.broadcom.com/company/careers'],
  ['micron','Micron','Memory / Semiconductor',['VLSI','Verification','Process'],['Digital','Verilog','SystemVerilog','Python'],'https://www.micron.com/about/careers'],
  ['synopsys','Synopsys','EDA / Semiconductor',['Verification','EDA','RTL'],['SystemVerilog','UVM','Python','Linux'],'https://www.synopsys.com/careers.html'],
  ['cadence','Cadence','EDA / Semiconductor',['EDA','Verification','Digital'],['Verilog','SystemVerilog','Python','Linux'],'https://www.cadence.com/en_US/home/company/careers.html'],
  ['siemens-eda','Siemens EDA','EDA',['Verification','Physical Design','EDA'],['SystemVerilog','UVM','Linux','Tcl'],'https://www.sw.siemens.com/en-US/about-us/careers/'],
  ['bosch','Bosch','Automotive / Embedded',['Embedded','Automotive','ADAS'],['C','CAN','AUTOSAR','MATLAB'],'https://www.bosch.in/careers/'],
  ['continental','Continental','Automotive',['Embedded','ADAS','Hardware'],['C','CAN','AUTOSAR','Embedded Linux'],'https://www.continental.com/en/career/'],
  ['kpit','KPIT','Automotive Software',['Embedded','AUTOSAR','ADAS'],['C++','AUTOSAR','MATLAB','Python'],'https://www.kpit.com/careers/'],
  ['tata-elxsi','Tata Elxsi','Embedded / Automotive',['Embedded','ADAS','Software'],['C++','Linux','AUTOSAR','Python'],'https://www.tataelxsi.com/careers'],
  ['ltts','LTTS','Engineering Services',['Embedded','Hardware','VLSI'],['C','Embedded','PCB','VLSI'],'https://www.ltts.com/careers'],
  ['hcltech','HCLTech','IT / Engineering',['Embedded','Software','Testing'],['C','Java','Python','Testing'],'https://www.hcltech.com/careers'],
  ['tcs','TCS','IT / Engineering',['Software','AI','Embedded'],['Java','Python','DSA','SQL'],'https://www.tcs.com/careers'],
  ['infosys','Infosys','IT / Engineering',['Software','AI','Testing'],['Java','Python','SQL','DSA'],'https://www.infosys.com/careers/'],
  ['wipro','Wipro','IT / Engineering',['Software','Embedded','Testing'],['Java','Python','C','SQL'],'https://careers.wipro.com/'],
  ['ericsson','Ericsson','Telecom',['5G','DSP','Networks'],['C++','Python','Linux','Networking'],'https://www.ericsson.com/en/careers'],
  ['nokia','Nokia','Telecom',['5G','RF','Networks'],['C++','Linux','Networking','DSP'],'https://www.nokia.com/careers/'],
  ['bel','Bharat Electronics Limited','Defence / PSU',['Electronics','Embedded','RF'],['ECE Core','Embedded','Communication','Digital'],'https://bel-india.in/careers/'],
  ['hal','Hindustan Aeronautics Limited','Aerospace / PSU',['Avionics','Embedded','Electronics'],['ECE Core','Embedded','Communication','Testing'],'https://hal-india.co.in/careers'],
  ['isro','ISRO','Space / Government',['Electronics','Communication','Embedded'],['ECE Core','DSP','RF','Embedded'],'https://www.isro.gov.in/Careers.html'],
  ['drdo','DRDO','Defence / Government',['Electronics','RF','Embedded'],['ECE Core','Radar','Communication','Embedded'],'https://drdo.gov.in/careers'],
].map(([id,name,domain,roles,skills,careers])=>({id,name,domain,roles:roles as string[],skills:skills as string[],careers:careers as string}));

export const courses: Course[] = [
  {id:'digital',title:'Digital Electronics & Computer Architecture',category:'Digital Design',level:'Beginner',duration:'6 weeks',description:'Build the foundation required for RTL, FPGA, embedded and VLSI careers.',skills:['Number Systems','Boolean Algebra','Combinational Logic','Sequential Logic','FSM','Computer Architecture'],projects:['Traffic Light Controller','ALU','Sequence Detector'],practice:['HDLBits','NPTEL','GeeksforGeeks'],roadmap:['Digital basics','Combinational circuits','Sequential circuits','FSM','Computer architecture','Mini project']},
  {id:'verilog',title:'Verilog & RTL Design',category:'VLSI',level:'Intermediate',duration:'8 weeks',description:'Learn synthesizable RTL, FSMs, datapaths, memories and clean coding practices.',skills:['Verilog','RTL','FSM','FIFO','UART','Testbench'],projects:['UART','Async FIFO','APB peripheral'],practice:['HDLBits','EDA Playground'],roadmap:['Verilog syntax','Combinational RTL','Sequential RTL','FSM','Memory','Testbench','Project']},
  {id:'systemverilog',title:'SystemVerilog & Verification',category:'VLSI',level:'Intermediate',duration:'8 weeks',description:'Move from RTL to professional verification concepts and reusable testbenches.',skills:['SystemVerilog','Assertions','Interfaces','Classes','Coverage','UVM'],projects:['FIFO verification','Bus protocol checker'],practice:['EDA Playground','Verification Academy'],roadmap:['SV basics','OOP','Interfaces','Assertions','Coverage','UVM basics','Verification project']},
  {id:'physical',title:'VLSI Physical Design',category:'VLSI',level:'Advanced',duration:'10 weeks',description:'Understand synthesis, constraints, timing, floorplanning, placement and routing.',skills:['Synthesis','STA','SDC','Floorplan','CTS','PnR'],projects:['RTL-to-gates flow','Timing analysis case study'],practice:['OpenROAD','OpenLane'],roadmap:['CMOS basics','Synthesis','SDC','STA','Floorplan','Placement','CTS','Routing']},
  {id:'embedded',title:'Embedded Systems with ARM & STM32',category:'Embedded',level:'Intermediate',duration:'10 weeks',description:'Build firmware skills around ARM microcontrollers and real peripherals.',skills:['C','Embedded C','ARM','STM32','GPIO','Timers','Interrupts'],projects:['Smart parking','Digital thermometer','Motor controller'],practice:['Wokwi','STM32CubeIDE'],roadmap:['C','MCU architecture','GPIO','Timers','Interrupts','UART','SPI','I2C','CAN','RTOS']},
  {id:'iot',title:'IoT with ESP32 & MQTT',category:'IoT',level:'Beginner',duration:'6 weeks',description:'Connect sensors to dashboards using ESP32, MQTT and cloud services.',skills:['ESP32','Sensors','Wi-Fi','MQTT','REST','Security'],projects:['Smart home','Weather station','Energy monitor'],practice:['Wokwi','Arduino IDE'],roadmap:['ESP32','Sensors','Wi-Fi','MQTT','Cloud','Security','Edge']},
  {id:'fpga',title:'FPGA Design with Vivado',category:'FPGA',level:'Intermediate',duration:'8 weeks',description:'Implement RTL on FPGA and learn timing, constraints and basic IP integration.',skills:['Verilog','Vivado','FPGA Architecture','XDC','AXI'],projects:['UART FPGA','PWM controller','RISC-V core'],practice:['EDA Playground','AMD Vivado tutorials'],roadmap:['RTL','FPGA fabric','Vivado','Simulation','Constraints','Timing','AXI','Project']},
  {id:'pcb',title:'PCB Design & Hardware Prototyping',category:'PCB & Hardware',level:'Beginner',duration:'6 weeks',description:'Go from schematic to PCB layout, fabrication files and board bring-up.',skills:['Schematic','KiCad','PCB Layout','DRC','BOM','Oscilloscope'],projects:['Sensor board','ESP32 breakout','Power supply PCB'],practice:['KiCad','LTspice'],roadmap:['Schematic','Components','Layout','Routing','DRC','Gerber','Bring-up']},
  {id:'dsp',title:'Signals, Systems & DSP with Python/MATLAB',category:'DSP',level:'Intermediate',duration:'8 weeks',description:'Turn core signals knowledge into practical signal processing skills.',skills:['Signals','Fourier Transform','Filters','Sampling','Python','MATLAB'],projects:['Audio filter','Noise reduction','Spectrum analyser'],practice:['MATLAB Onramp','Python SciPy'],roadmap:['Signals','LTI systems','Fourier','Sampling','FIR/IIR','Project']},
  {id:'communication',title:'Digital Communication & 5G Foundations',category:'Communication',level:'Intermediate',duration:'8 weeks',description:'Learn modulation, coding, wireless concepts and the engineering behind modern networks.',skills:['Modulation','Coding','OFDM','MIMO','RF','5G'],projects:['Modulation simulator','OFDM demo'],practice:['MATLAB','GNU Radio'],roadmap:['Signals','Analog modulation','Digital modulation','Coding','OFDM','MIMO','5G']},
  {id:'python',title:'Python for ECE & Engineering Automation',category:'Programming for ECE',level:'Beginner',duration:'5 weeks',description:'Learn enough Python to automate analysis, testing, data work and AI experiments.',skills:['Python','NumPy','Pandas','Matplotlib','Serial','Automation'],projects:['CSV analyzer','Serial monitor','Test report generator'],practice:['HackerRank','Kaggle'],roadmap:['Python basics','NumPy','Pandas','Plots','Serial','Automation project']},
  {id:'embedded-linux',title:'Embedded Linux & Device Drivers',category:'Embedded',level:'Advanced',duration:'10 weeks',description:'Build Linux skills for production embedded products and edge devices.',skills:['Linux','Bash','C','Kernel basics','Device Trees','Drivers'],projects:['GPIO driver study','Character device','Embedded Linux dashboard'],practice:['Linux Journey','BeagleBoard docs'],roadmap:['Linux CLI','C systems','Kernel architecture','Device tree','Drivers','Build systems','Project']},
  {id:'ai-ece',title:'AI/ML for ECE Engineers',category:'AI/ML',level:'Intermediate',duration:'8 weeks',description:'Use ML for signal classification, predictive maintenance, vision and edge applications.',skills:['Python','NumPy','ML','Deep Learning','Signal Processing','Edge AI'],projects:['Signal classifier','Predictive maintenance','Edge image classifier'],practice:['Kaggle','Google Colab'],roadmap:['Python','Statistics','ML','Deep learning','ECE dataset','Deployment']},
  {id:'java',title:'Java & DSA for ECE Placements',category:'Software / Placements',level:'Beginner',duration:'10 weeks',description:'A focused software-placement track for ECE students who want IT opportunities.',skills:['Java','OOP','DSA','SQL','Problem Solving'],projects:['Placement tracker','Mini CRUD app'],practice:['LeetCode','HackerRank','CodeChef'],roadmap:['Java','OOP','Arrays','Strings','Linked lists','Trees','SQL','Mock interviews']},
];

export const practicePlatforms: Practice[] = [
  {id:'hdlbits',name:'HDLBits',focus:'Verilog / RTL',type:'Hardware Practice',url:'https://hdlbits.01xz.net/wiki/Main_Page',description:'Interactive HDL problems from basic gates to FSMs.'},
  {id:'edaplayground',name:'EDA Playground',focus:'Verilog / SystemVerilog',type:'Simulation',url:'https://www.edaplayground.com/',description:'Run HDL code online with simulators and waveforms.'},
  {id:'wokwi',name:'Wokwi',focus:'Arduino / ESP32 / IoT',type:'Simulation',url:'https://wokwi.com/',description:'Simulate microcontrollers, sensors and embedded projects in the browser.'},
  {id:'leetcode',name:'LeetCode',focus:'DSA / Java / Python',type:'Coding',url:'https://leetcode.com/',description:'Interview-oriented programming practice.'},
  {id:'hackerrank',name:'HackerRank',focus:'Programming / SQL',type:'Coding',url:'https://www.hackerrank.com/',description:'Structured coding, SQL and skills certifications.'},
  {id:'codechef',name:'CodeChef',focus:'Programming / DSA',type:'Coding',url:'https://www.codechef.com/',description:'Competitive programming and problem solving.'},
  {id:'gfg',name:'GeeksforGeeks',focus:'ECE + DSA + CS',type:'Learning',url:'https://www.geeksforgeeks.org/',description:'Tutorials, interview questions and coding practice.'},
  {id:'kaggle',name:'Kaggle',focus:'AI / ML / Data',type:'AI Practice',url:'https://www.kaggle.com/',description:'Datasets, notebooks and ML competitions.'},
  {id:'colab',name:'Google Colab',focus:'Python / AI',type:'Cloud Lab',url:'https://colab.research.google.com/',description:'Run Python and ML notebooks without local setup.'},
  {id:'matlab',name:'MATLAB Onramp',focus:'Signals / DSP / Control',type:'Engineering Practice',url:'https://matlabacademy.mathworks.com/',description:'Guided MATLAB learning for engineering workflows.'},
  {id:'openlane',name:'OpenLane',focus:'Open-source VLSI',type:'Chip Design',url:'https://github.com/The-OpenROAD-Project/OpenLane',description:'Explore an open RTL-to-GDSII flow.'},
  {id:'github',name:'GitHub',focus:'Projects / Portfolio',type:'Project Practice',url:'https://github.com/',description:'Build, version and showcase engineering projects.'},
];

export const roadmaps = [
  {name:'RTL / VLSI Design Engineer',steps:['Digital Logic','Computer Architecture','Verilog','SystemVerilog','RTL Design','Simulation','Synthesis','STA','Project Portfolio','Interview Prep']},
  {name:'Embedded Systems Engineer',steps:['C','Embedded C','MCU Architecture','ARM','GPIO','Timers','Interrupts','UART/SPI/I2C','CAN','RTOS','Project Portfolio']},
  {name:'FPGA Engineer',steps:['Digital Logic','Verilog','SystemVerilog','FPGA Architecture','Vivado/Quartus','Simulation','Timing Constraints','AXI/IP','Hardware Demo']},
  {name:'IoT Engineer',steps:['Electronics Basics','ESP32','Sensors','Embedded Programming','Wi-Fi','MQTT','Cloud APIs','Security','Edge Project']},
  {name:'ECE Software Engineer',steps:['Java/Python','OOP','DSA','SQL','Git','APIs','Projects','Aptitude','Coding Tests','Interviews']},
  {name:'Telecom / DSP Engineer',steps:['Signals & Systems','Probability','DSP','MATLAB/Python','Digital Communication','RF Basics','OFDM/MIMO','5G','Projects']},
];
