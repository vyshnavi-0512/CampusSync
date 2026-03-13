import { useState, useEffect, useCallback } from "react";

// ─── THEME ──────────────────────────────────────────────────────────────────
const LIGHT = {
  bg: "#FAF8F5", surface: "#FFFFFF", card: "#FFFFFF", cardAlt: "#F7F4F0",
  border: "#E8E0D8", borderStrong: "#D4C9BF",
  coral: "#E07A5F", lavender: "#8E7DBE", sand: "#F2E9E4",
  coralLight: "#F9EDE9", lavenderLight: "#EEE9F8",
  text: "#2C2825", textMid: "#6B6560", textMute: "#9E9690",
  success: "#4A9B7F", warning: "#D4874A", danger: "#C0574A",
  shadow: "rgba(60,40,30,0.08)", shadowMd: "rgba(60,40,30,0.14)",
  navBg: "rgba(250,248,245,0.92)",
};
const DARK = {
  bg: "#1A1714", surface: "#231F1C", card: "#2A2521", cardAlt: "#322D29",
  border: "#3D3530", borderStrong: "#4F4740",
  coral: "#E07A5F", lavender: "#A48FD4", sand: "#3D342C",
  coralLight: "#2E1F1A", lavenderLight: "#231E30",
  text: "#F0EBE6", textMid: "#B8AFA8", textMute: "#7A736C",
  success: "#5ABF96", warning: "#D4874A", danger: "#D06A5C",
  shadow: "rgba(0,0,0,0.3)", shadowMd: "rgba(0,0,0,0.5)",
  navBg: "rgba(26,23,20,0.92)",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const BADGES = [
  { id: "pioneer",   icon: "🌱", name: "Pioneer",        desc: "Published your first post",       xp: 50,  color: "#4A9B7F" },
  { id: "connector", icon: "🔗", name: "Connector",      desc: "Joined 3+ groups",                xp: 100, color: "#8E7DBE" },
  { id: "builder",   icon: "🏗️", name: "Builder",        desc: "Completed a project",             xp: 150, color: "#E07A5F" },
  { id: "mentor",    icon: "🎓", name: "Mentor",         desc: "Helped 5+ teammates",             xp: 200, color: "#D4874A" },
  { id: "hacker",    icon: "⚡", name: "Hackathon Hero", desc: "Won a hackathon",                  xp: 300, color: "#8E7DBE" },
  { id: "networker", icon: "🌐", name: "Networker",      desc: "Connected with 20 people",        xp: 120, color: "#4A9B7F" },
  { id: "innovator", icon: "💡", name: "Innovator",      desc: "Posted an idea with 50+ upvotes", xp: 180, color: "#E07A5F" },
];

const SKILL_TAGS_TECH = ["React","Python","ML/AI","Node.js","Flutter","Figma","Go","Rust","SQL","DevOps","Blockchain","AR/VR"];
const SKILL_TAGS_SOFT = ["Leadership","Design","Marketing","Finance","Writing","Public Speaking","Research","Photography","Dance","Music"];
const LIFECYCLE_STAGES = ["Ideation","Building","Testing","Presenting","Completed"];

const STUDENTS = [
  { id:1, name:"Arjun Mehta",  avatar:"AM", dept:"Computer Science",      year:"3rd Year", xp:2450, level:12, skills:[{name:"React",level:90},{name:"Python",level:75},{name:"ML/AI",level:60}],  softSkills:["Leadership"], badges:["pioneer","hacker"],           score:94, online:true,  bio:"Building AI tools for social good. Open to collaborations in EdTech & HealthTech.", github:"arjunmehta",  linkedin:"arjun-mehta-dev",    verified:true,  hackathons:6, domains:["EdTech","HealthTech","AI"],           collab:8,  lookingForTeam:true  },
  { id:2, name:"Priya Sharma", avatar:"PS", dept:"Design Studies",         year:"2nd Year", xp:1800, level:9,  skills:[{name:"Figma",level:95},{name:"Research",level:80}],                       softSkills:["Design","Marketing"], badges:["connector","networker"],  score:87, online:true,  bio:"UX researcher passionate about accessibility and inclusive design.",               github:"priya-ux",    linkedin:"priya-sharma-design", verified:true,  hackathons:3, domains:["UX","Accessibility","Social Impact"], collab:12, lookingForTeam:false },
  { id:3, name:"Rayan Khan",   avatar:"RK", dept:"Electronics & Comm.",    year:"4th Year", xp:3100, level:15, skills:[{name:"Flutter",level:88},{name:"Go",level:72},{name:"DevOps",level:65}],  softSkills:["Leadership"], badges:["builder","mentor","pioneer"],    score:98, online:false, bio:"Full-stack dev & open source contributor. Final year, open to startup co-founder roles.", github:"rayankhan", linkedin:"rayan-khan",         verified:true,  hackathons:9, domains:["Mobile","Open Source","Startups"],    collab:21, lookingForTeam:true  },
  { id:4, name:"Sneha Patel",  avatar:"SP", dept:"Business Administration", year:"1st Year", xp:900,  level:5,  skills:[{name:"Finance",level:70},{name:"Marketing",level:65}],                  softSkills:["Leadership","Public Speaking"], badges:["pioneer"],      score:72, online:true,  bio:"Startup enthusiast & pitch competition winner. Looking to join a tech team as business co-founder.", github:"", linkedin:"sneha-patel-biz", verified:false, hackathons:1, domains:["FinTech","Startups","Marketing"],    collab:4,  lookingForTeam:true  },
  { id:5, name:"Dev Joshi",    avatar:"DJ", dept:"Computer Science",        year:"3rd Year", xp:2100, level:11, skills:[{name:"Rust",level:80},{name:"SQL",level:85},{name:"Node.js",level:78}], softSkills:["Research"], badges:["builder","hacker"],              score:89, online:false, bio:"Backend architect obsessed with performance. Systems programming & databases.",      github:"devjoshi-dev", linkedin:"dev-joshi",         verified:true,  hackathons:4, domains:["Systems","Databases","Security"],     collab:9,  lookingForTeam:false },
  { id:6, name:"Aisha Nair",   avatar:"AN", dept:"Biotechnology",           year:"2nd Year", xp:1400, level:7,  skills:[{name:"Python",level:70},{name:"Research",level:90},{name:"Writing",level:85}], softSkills:["Research","Writing"], badges:["connector"],  score:81, online:true,  bio:"Bioinformatics meets ML. Passionate about leveraging data for healthcare innovation.", github:"aisha-bio", linkedin:"aisha-nair",        verified:true,  hackathons:2, domains:["BioTech","Healthcare","Data Science"], collab:6,  lookingForTeam:true  },
];

const POSTS_DATA = [
  { id:1, author:"Arjun Mehta",  avatar:"AM", time:"2m ago",  type:"project", title:"AI Resume Screener for Bias Detection",           desc:"Building an ML model that screens resumes for unconscious bias before they reach recruiters. Need a backend dev and a UX designer.", skills:["ML/AI","Python","Figma"],     comments:8,  members:2, needed:4, stage:"Building",  bookmarked:false, deadline:"Mar 28, 2025" },
  { id:2, author:"Priya Sharma", avatar:"PS", time:"15m ago", type:"event",   title:"Design Thinking Workshop — Social Impact Sprint",  desc:"A hands-on design sprint this Friday focused on social impact products. All backgrounds welcome!",                                    skills:["Design","Research"],         comments:13, members:0, needed:30, stage:null,       bookmarked:true,  deadline:"Feb 28, 2025" },
  { id:3, author:"Rayan Khan",   avatar:"RK", time:"1h ago",  type:"project", title:"Campus EV Charging Station Tracker",               desc:"Real-time EV charging station tracker for our campus. Flutter frontend with Go backend. One slot left for a DevOps engineer!",        skills:["Flutter","Go","DevOps"],     comments:19, members:3, needed:4, stage:"Testing",   bookmarked:false, deadline:"Mar 15, 2025" },
  { id:4, author:"Dev Joshi",    avatar:"DJ", time:"3h ago",  type:"bounty",  title:"Fix OAuth Flow in Student Portal — 500 XP",        desc:"The student portal's OAuth 2.0 implementation has a token refresh bug. Fix it and earn 500 XP + a certificate of appreciation.",     skills:["Node.js","SQL"],             comments:4,  members:0, needed:1, stage:null,       bookmarked:false, deadline:"Mar 5, 2025"  },
  { id:5, author:"Anonymous",    avatar:"?",  time:"5h ago",  type:"idea",    title:"Peer-to-Peer Micro-Finance Club for Students",     desc:"A platform for students to lend small amounts to peers for tools, courses, and resources — with reputation-based trust scores.",      skills:["Finance","Leadership","React"], comments:27, members:1, needed:5, stage:null,    bookmarked:true,  deadline:null           },
];

const EVENTS_DATA = [
  { id:1, title:"Smart India Hackathon 2025",       date:"Mar 15–17", type:"Hackathon",  category:"technical",     prize:"₹1,00,000",    registered:234, capacity:500, desc:"National-level hackathon solving real government challenges.",                    recommended:true,  reason:"Matches your ML/AI profile" },
  { id:2, title:"Campus VC Pitch Night",            date:"Feb 28",    type:"Startup",    category:"non-technical", prize:"₹50,000",      registered:67,  capacity:100, desc:"Pitch your startup idea to 8 active campus VCs and angel investors.",             recommended:false, reason:"" },
  { id:3, title:"ML Bootcamp — NLP Track",          date:"Mar 5–7",   type:"Workshop",   category:"technical",     prize:"Certificate",  registered:189, capacity:200, desc:"3-day intensive on NLP, transformers, and fine-tuning LLMs.",                     recommended:true,  reason:"You're building in ML/AI — this is relevant" },
  { id:4, title:"TEDx Campus 2025",                 date:"Apr 10",    type:"Conference", category:"non-technical", prize:"—",            registered:412, capacity:600, desc:"Annual student-led TEDx exploring ideas worth spreading from campus.",             recommended:false, reason:"" },
  { id:5, title:"Photography & Storytelling Sprint",date:"Mar 8",     type:"Cultural",   category:"non-technical", prize:"Exhibition",   registered:45,  capacity:80,  desc:"Capture your campus story in 48 hours. Winner gets a gallery exhibition.",       recommended:false, reason:"" },
  { id:6, title:"Open Source Sprint — GSSoC",       date:"Mar 22–23", type:"Hackathon",  category:"technical",     prize:"Swag + XP",   registered:98,  capacity:150, desc:"Contribute to real open-source projects and earn GSSoC points.",                 recommended:false, reason:"" },
  { id:7, title:"Dance for Social Change",          date:"Mar 14",    type:"Cultural",   category:"non-technical", prize:"Trophy",       registered:32,  capacity:60,  desc:"Choreograph a piece addressing a social issue. All dance forms welcome.",         recommended:false, reason:"" },
  { id:8, title:"Financial APIs Workshop",          date:"Mar 7",     type:"Workshop",   category:"technical",     prize:"Certificate",  registered:67,  capacity:100, desc:"Learn to integrate payment gateways, UPI, and financial data APIs.",              recommended:true,  reason:"Building a FinTech? This is essential" },
];

const BOUNTIES = [
  { id:1, title:"Design a Campus Navigation App UI",  reward:"300 XP + Certificate",   dept:"Student Tech Cell", skills:["Figma","Design"],      deadline:"Mar 10", difficulty:"Medium", solo:true  },
  { id:2, title:"Build Timetable Conflict Detector",  reward:"500 XP + Academic Credit",dept:"Academic Office",   skills:["Python","SQL"],         deadline:"Mar 20", difficulty:"Hard",   solo:false },
  { id:3, title:"Write Accessibility Audit Report",   reward:"200 XP + Recognition",    dept:"NSS Chapter",       skills:["Research","Writing"],   deadline:"Feb 25", difficulty:"Easy",   solo:true  },
];

const NOTIFICATIONS_DATA = [
  { id:1, type:"join",   msg:"Priya Sharma requested to join your project 'AI Resume Screener'",             time:"5m ago", read:false },
  { id:2, type:"ai",     msg:"AI Match: Aisha Nair's Python + Research skills complement your team gap",     time:"1h ago", read:false },
  { id:3, type:"event",  msg:"Reminder: ML Bootcamp starts in 3 days. You're registered!",                  time:"2h ago", read:true  },
  { id:4, type:"expire", msg:"Your join request to 'EV Tracker' team expires in 2 days",                    time:"5h ago", read:true  },
  { id:5, type:"skill",  msg:"Skill Gap Alert: Your team is missing a DevOps engineer. Rayan Khan is available.", time:"1d ago", read:true },
];

const ACTIVITY_FEED = [
  "🌱 Arjun unlocked Pioneer badge","📅 Design Workshop has 12 new registrations",
  "🔗 Priya joined EV Tracker team","💡 Anonymous idea reached 50 upvotes",
  "🎓 Rayan reached Level 15","⚡ New bounty: 500 XP for OAuth fix",
  "🏆 Team Nexus won Smart India Hackathon","🌐 Prof. Iyer joined as AI/ML mentor",
];

// Team workspace initial data
const INITIAL_TASKS = [
  { id:1, title:"Set up ML model pipeline",      assignee:"Arjun Mehta",  due:"Mar 5",  priority:"High",   done:true,  checklist:[{text:"Collect dataset",done:true},{text:"Clean & label data",done:true},{text:"Train baseline model",done:false}] },
  { id:2, title:"Design screening UI wireframes", assignee:"Priya Sharma", due:"Mar 8",  priority:"High",   done:false, checklist:[{text:"Low-fi sketches",done:true},{text:"High-fi Figma screens",done:false},{text:"User testing",done:false}] },
  { id:3, title:"Build REST API endpoints",       assignee:"Dev Joshi",    due:"Mar 10", priority:"Medium", done:false, checklist:[{text:"Auth routes",done:true},{text:"Resume upload endpoint",done:false},{text:"Score endpoint",done:false}] },
  { id:4, title:"Write project documentation",    assignee:"Aisha Nair",   due:"Mar 18", priority:"Low",    done:false, checklist:[{text:"API docs",done:false},{text:"README",done:false}] },
];

const CALENDAR_EVENTS = [
  { id:1, date:"2025-03-05", title:"ML Model Review",       type:"meeting",   time:"10:00 AM", members:["AM","PS","DJ"] },
  { id:2, date:"2025-03-08", title:"UI Feedback Session",   type:"review",    time:"2:00 PM",  members:["AM","PS"] },
  { id:3, date:"2025-03-10", title:"API Integration Sprint",type:"sprint",    time:"All Day",  members:["AM","DJ","AN"] },
  { id:4, date:"2025-03-15", title:"Project Demo Day",      type:"milestone", time:"3:00 PM",  members:["AM","PS","DJ","AN"] },
  { id:5, date:"2025-03-20", title:"Final Testing",         type:"sprint",    time:"All Day",  members:["AM","PS","DJ","AN"] },
  { id:6, date:"2025-03-28", title:"Submission Deadline",   type:"deadline",  time:"11:59 PM", members:["AM","PS","DJ","AN"] },
];

const TEAM_MESSAGES = [
  { id:1, from:"AM", name:"Arjun",  text:"Hey team! I've pushed the initial model to GitHub. Please review when you get a chance 🚀", time:"10:02 AM" },
  { id:2, from:"PS", name:"Priya",  text:"Looks great Arjun! I finished the wireframes for the screening UI. Sharing the Figma link now.", time:"10:15 AM" },
  { id:3, from:"DJ", name:"Dev",    text:"API routes are almost ready. Should be done by EOD. @Arjun can you check the auth flow?", time:"11:30 AM" },
  { id:4, from:"AN", name:"Aisha",  text:"Started on docs. Also found a great dataset we can augment with — sharing in Files.", time:"12:45 PM" },
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
const getStyles = (t) => `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: ${t.bg}; color: ${t.text}; line-height: 1.6; transition: background 0.3s, color 0.3s; }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${t.borderStrong}; border-radius: 4px; }

  @keyframes fadeUp    { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideIn   { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
  @keyframes badgePop  { 0%{transform:scale(0) rotate(-12deg);opacity:0;} 70%{transform:scale(1.12);} 100%{transform:scale(1) rotate(0);opacity:1;} }
  @keyframes ticker    { from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes progressIn{ from{width:0;} to{width:var(--w);} }
  @keyframes spin      { to{transform:rotate(360deg);} }
  @keyframes float     { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-4px);} }
  @keyframes pulse     { 0%,100%{opacity:1;} 50%{opacity:0.5;} }

  .fade-up   { animation: fadeUp  0.45s ease forwards; }
  .slide-in  { animation: slideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .badge-pop { animation: badgePop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .float     { animation: float 3s ease-in-out infinite; }

  input, textarea, select {
    font-family: 'DM Sans', sans-serif; font-size:14px;
    background:${t.cardAlt}; border:1.5px solid ${t.border}; color:${t.text};
    border-radius:10px; padding:10px 14px; width:100%; outline:none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  input:focus, textarea:focus, select:focus { border-color:${t.coral}; box-shadow:0 0 0 3px ${t.coralLight}; }
  input::placeholder, textarea::placeholder { color:${t.textMute}; }
  select option { background:${t.surface}; color:${t.text}; }

  .card { background:${t.card}; border:1px solid ${t.border}; border-radius:16px; transition:transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
  .card:hover { box-shadow:0 8px 32px ${t.shadow}; }
  .card.hoverable:hover { transform:translateY(-3px); border-color:${t.coral}55; }

  .btn { font-family:'DM Sans',sans-serif; cursor:pointer; border:none; border-radius:10px; font-weight:500; font-size:14px; transition:all 0.2s ease; display:inline-flex; align-items:center; gap:6px; white-space:nowrap; }
  .btn-coral   { background:${t.coral}; color:white; padding:9px 18px; }
  .btn-coral:hover { background:#D06B50; transform:translateY(-1px); box-shadow:0 4px 14px ${t.coral}44; }
  .btn-lavender{ background:${t.lavenderLight}; color:${t.lavender}; border:1px solid ${t.lavender}44; padding:9px 18px; }
  .btn-lavender:hover { background:${t.lavender}22; }
  .btn-ghost   { background:transparent; color:${t.textMid}; border:1.5px solid ${t.border}; padding:8px 16px; }
  .btn-ghost:hover { border-color:${t.coral}; color:${t.coral}; }
  .btn-sm { padding:6px 12px; font-size:12px; }
  .btn-icon { background:${t.cardAlt}; border:1px solid ${t.border}; border-radius:10px; padding:8px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; color:${t.textMid}; }
  .btn-icon:hover { border-color:${t.coral}; color:${t.coral}; }

  .chip { display:inline-flex; align-items:center; gap:4px; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:500; font-family:'DM Mono',monospace; }
  .chip-tech  { background:${t.coralLight};    color:${t.coral};    border:1px solid ${t.coral}33;    }
  .chip-soft  { background:${t.lavenderLight}; color:${t.lavender}; border:1px solid ${t.lavender}33; }

  .tab-btn { background:none; border:none; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; cursor:pointer; padding:10px 16px; color:${t.textMid}; border-radius:10px; transition:all 0.2s; display:flex; align-items:center; gap:6px; }
  .tab-btn:hover { color:${t.text}; background:${t.cardAlt}; }
  .tab-btn.active { color:${t.coral}; background:${t.coralLight}; }

  .xp-bar  { height:6px; background:${t.border}; border-radius:3px; overflow:hidden; }
  .xp-fill { height:100%; background:linear-gradient(90deg,${t.coral},${t.lavender}); border-radius:3px; animation:progressIn 1.2s ease forwards; }

  .prof-bar  { height:4px; background:${t.border}; border-radius:2px; overflow:hidden; }
  .prof-fill { height:100%; background:${t.coral}; border-radius:2px; animation:progressIn 1s ease forwards; }

  .modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.45); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; z-index:1000; padding:16px; }
  .modal    { background:${t.surface}; border:1px solid ${t.border}; border-radius:20px; padding:32px; max-width:500px; width:100%; box-shadow:0 24px 60px ${t.shadowMd}; animation:fadeUp 0.3s ease; max-height:85vh; overflow-y:auto; }

  .toast { position:fixed; bottom:24px; right:24px; z-index:3000; min-width:280px; background:${t.surface}; border:1px solid ${t.border}; border-radius:14px; padding:14px 18px; box-shadow:0 8px 32px ${t.shadowMd}; display:flex; align-items:center; gap:12px; animation:slideIn 0.4s ease; font-size:14px; }
  .toast.success { border-left:3px solid ${t.success}; }
  .toast.info    { border-left:3px solid ${t.lavender}; }
  .toast.warning { border-left:3px solid ${t.warning}; }

  .badge-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.8); backdrop-filter:blur(10px); display:flex; align-items:center; justify-content:center; z-index:5000; flex-direction:column; gap:12px; }

  .ticker-wrap { overflow:hidden; }
  .ticker { display:inline-block; white-space:nowrap; animation:ticker 28s linear infinite; }

  .online-dot  { width:9px; height:9px; border-radius:50%; background:${t.success}; border:2px solid ${t.surface}; }
  .offline-dot { width:9px; height:9px; border-radius:50%; background:${t.textMute}; border:2px solid ${t.surface}; }
  .notif-pip   { width:8px; height:8px; background:${t.coral}; border-radius:50%; border:2px solid ${t.surface}; }

  .tag-filter { background:${t.cardAlt}; border:1.5px solid ${t.border}; color:${t.textMid}; border-radius:20px; padding:5px 14px; font-size:12px; font-family:'DM Mono',monospace; cursor:pointer; transition:all 0.2s; }
  .tag-filter:hover, .tag-filter.active { border-color:${t.coral}; color:${t.coral}; background:${t.coralLight}; }

  .search-results { position:absolute; top:calc(100% + 6px); left:0; right:0; background:${t.surface}; border:1px solid ${t.border}; border-radius:14px; box-shadow:0 12px 40px ${t.shadowMd}; z-index:200; overflow:hidden; max-height:360px; overflow-y:auto; }

  .section-title { font-family:'Lora',serif; font-size:22px; font-weight:600; color:${t.text}; margin-bottom:4px; }
  .section-sub   { font-size:14px; color:${t.textMid}; margin-bottom:20px; }

  .lifecycle-track { display:flex; align-items:center; margin:16px 0; }
  .lifecycle-step  { flex:1; text-align:center; position:relative; }
  .lifecycle-step::after { content:''; position:absolute; top:14px; left:50%; width:100%; height:2px; background:var(--lc-after,${t.border}); z-index:0; }
  .lifecycle-step:last-child::after { display:none; }
  .lifecycle-dot { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; position:relative; z-index:1; margin:0 auto 6px; font-weight:700; }

  /* Workspace tabs */
  .ws-tab { background:none; border:none; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; cursor:pointer; padding:8px 14px; color:${t.textMid}; border-bottom:2px solid transparent; transition:all 0.2s; }
  .ws-tab:hover { color:${t.text}; }
  .ws-tab.active { color:${t.coral}; border-bottom-color:${t.coral}; }

  /* Task card */
  .task-row { display:flex; align-items:flex-start; gap:10px; padding:12px 0; border-bottom:1px solid ${t.border}; transition:background 0.15s; }
  .task-row:last-child { border-bottom:none; }
  .task-check { width:18px; height:18px; border-radius:5px; border:1.5px solid ${t.border}; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; transition:all 0.2s; }
  .task-check.done { background:${t.success}; border-color:${t.success}; }

  /* Calendar grid */
  .cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }
  .cal-cell { min-height:64px; border-radius:10px; border:1px solid ${t.border}; padding:6px; font-size:11px; background:${t.cardAlt}; }
  .cal-cell.today { border-color:${t.coral}; background:${t.coralLight}; }
  .cal-cell.has-event { cursor:pointer; }
  .cal-event-dot { background:${t.coral}; color:white; border-radius:6px; padding:2px 6px; font-size:10px; margin-top:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .cal-event-dot.meeting  { background:${t.lavender}; }
  .cal-event-dot.deadline { background:${t.danger}; }
  .cal-event-dot.milestone{ background:${t.warning}; }
  .cal-event-dot.sprint   { background:${t.success}; }

  /* Video call overlay */
  .call-overlay { position:fixed; inset:0; background:rgba(10,8,6,0.95); z-index:4000; display:flex; flex-direction:column; }

  /* Chat bubble */
  .msg-bubble { max-width:70%; padding:10px 14px; border-radius:16px; font-size:14px; line-height:1.5; }
  .msg-me   { background:${t.coralLight}; border:1px solid ${t.coral}33; border-radius:16px 16px 4px 16px; align-self:flex-end; }
  .msg-them { background:${t.cardAlt};    border:1px solid ${t.border};   border-radius:16px 16px 16px 4px; align-self:flex-start; }

  @media (max-width:768px) { .hide-mobile{display:none!important;} .grid-sidebar{grid-template-columns:1fr!important;} }
`;

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Avatar({ initials, size=40, online, level, verified }) {
  const palette = ["#E07A5F","#8E7DBE","#4A9B7F","#D4874A","#C0574A","#5A8DBE"];
  const bg = palette[(initials||"?").charCodeAt(0) % palette.length];
  return (
    <div style={{ position:"relative", display:"inline-block", flexShrink:0 }}>
      <div style={{ width:size, height:size, borderRadius:"50%", background:`${bg}22`, border:`2px solid ${bg}55`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Lora',serif", fontWeight:600, fontSize:size*0.33, color:bg, userSelect:"none" }}>
        {initials}
      </div>
      {online !== undefined && <div className={online?"online-dot":"offline-dot"} style={{position:"absolute",bottom:1,right:1}} />}
      {level && <div style={{position:"absolute",top:-4,right:-6,background:"#E07A5F",borderRadius:8,padding:"1px 5px",fontSize:9,fontWeight:700,color:"white",fontFamily:"'DM Mono'"}}> L{level}</div>}
      {verified && <div style={{position:"absolute",bottom:-2,right:-2,background:"#4A9B7F",borderRadius:"50%",width:size*0.28,height:size*0.28,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.14,border:"2px solid white"}}>✓</div>}
    </div>
  );
}

function Chip({ skill }) {
  const isTech = SKILL_TAGS_TECH.includes(skill);
  return <span className={isTech?"chip chip-tech":"chip chip-soft"}>{skill}</span>;
}

function XPBar({ current, max }) {
  return <div className="xp-bar"><div className="xp-fill" style={{"--w":`${Math.min((current/max)*100,100)}%`}} /></div>;
}

function ProfBar({ level }) {
  return <div className="prof-bar" style={{flex:1}}><div className="prof-fill" style={{"--w":`${level}%`,width:`${level}%`}} /></div>;
}

function LifecycleTracker({ currentStage, t }) {
  const idx = LIFECYCLE_STAGES.indexOf(currentStage);
  const icons = ["💡","🏗️","🧪","🎤","✅"];
  return (
    <div className="lifecycle-track">
      {LIFECYCLE_STAGES.map((stage, i) => (
        <div key={stage} className="lifecycle-step" style={{"--lc-after": i < idx ? t.coral : t.border}}>
          <div className="lifecycle-dot" style={{ background: i<idx?t.coral:i===idx?t.coralLight:t.cardAlt, border:`2px solid ${i<=idx?t.coral:t.border}`, color: i<idx?"white":i===idx?t.coral:t.textMute }}>
            {i<idx?"✓":icons[i]}
          </div>
          <div style={{fontSize:10, color: i===idx?t.coral:i<idx?t.textMid:t.textMute, fontWeight:i===idx?600:400}}>{stage}</div>
        </div>
      ))}
    </div>
  );
}

function BadgeIcon({ badge, size=36, unlocked=true, t }) {
  const b = BADGES.find(x => x.id === badge);
  if (!b) return null;
  return (
    <div title={`${b.name}: ${b.desc}`} style={{ width:size, height:size, borderRadius:"10px", background: unlocked?`${b.color}18`:t.cardAlt, border:`1px solid ${unlocked?b.color+"44":t.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.44, filter:unlocked?"none":"grayscale(1) opacity(0.4)" }}>
      {b.icon}
    </div>
  );
}

function Toast({ msg, type="success", onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3800); return () => clearTimeout(t); }, []);
  return (
    <div className={`toast ${type}`}>
      <span style={{fontSize:18}}>{type==="success"?"✅":type==="info"?"💡":"⚠️"}</span>
      <span style={{flex:1}}>{msg}</span>
      <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,color:"inherit",opacity:0.5}}>✕</button>
    </div>
  );
}

function BadgeUnlockOverlay({ badge, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, []);
  const b = BADGES.find(x => x.id === badge);
  if (!b) return null;
  return (
    <div className="badge-overlay" onClick={onClose}>
      <div style={{fontSize:11,letterSpacing:3,color:"#94A3B8",textTransform:"uppercase"}}>Badge Unlocked</div>
      <div className="badge-pop" style={{fontSize:80}}>{b.icon}</div>
      <div style={{fontFamily:"'Lora',serif",fontSize:32,fontWeight:700,color:"white",marginTop:8}}>{b.name}</div>
      <div style={{color:"#94A3B8",fontSize:15}}>{b.desc}</div>
      <div style={{marginTop:16,padding:"8px 24px",background:`${b.color}22`,border:`1px solid ${b.color}44`,borderRadius:20,color:b.color,fontWeight:600}}>+{b.xp} XP earned</div>
      <div style={{marginTop:16,color:"#64748B",fontSize:12}}>Tap to continue</div>
    </div>
  );
}

// ─── TEAM WORKSPACE ───────────────────────────────────────────────────────────
function TeamWorkspace({ t, addToast }) {
  const [wsTab, setWsTab] = useState("chat");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [msgs, setMsgs] = useState(TEAM_MESSAGES);
  const [msgInput, setMsgInput] = useState("");
  const [expandedTask, setExpandedTask] = useState(null);
  const [newTask, setNewTask] = useState({ title:"", assignee:"Arjun Mehta", due:"", priority:"Medium" });
  const [showAddTask, setShowAddTask] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [callType, setCallType] = useState("video");
  const [calMonth] = useState({ label:"March 2025", days: Array.from({length:31},(_,i)=>i+1), startDay:6 });
  const msgEndRef = useCallbackRef();

  function useCallbackRef() {
    const ref = { current: null };
    return ref;
  }

  const sendMsg = () => {
    if (!msgInput.trim()) return;
    setMsgs(m => [...m, { id:Date.now(), from:"YOU", name:"You", text:msgInput, time:"Now" }]);
    setMsgInput("");
  };

  const toggleTask = (taskId) => {
    setTasks(t => t.map(task => task.id === taskId ? {...task, done: !task.done} : task));
    addToast("Task updated!", "info");
  };

  const toggleChecklist = (taskId, itemIdx) => {
    setTasks(t => t.map(task => {
      if (task.id !== taskId) return task;
      const newCl = task.checklist.map((item, i) => i===itemIdx ? {...item, done:!item.done} : item);
      return {...task, checklist: newCl};
    }));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks(prev => [...prev, { id:Date.now(), ...newTask, done:false, checklist:[] }]);
    setNewTask({ title:"", assignee:"Arjun Mehta", due:"", priority:"Medium" });
    setShowAddTask(false);
    addToast("Task added! ✅");
  };

  const calEventsForDay = (day) => CALENDAR_EVENTS.filter(e => {
    const d = parseInt(e.date.split("-")[2]);
    return d === day;
  });

  const priorityColor = { High: t.danger, Medium: t.warning, Low: t.success };
  const typeColors    = { project: t.coral, event: t.success, bounty: t.warning, idea: t.lavender };
  const wsTabs = [
    { id:"chat",     label:"💬 Team Chat" },
    { id:"tasks",    label:"✅ Tasks" },
    { id:"calendar", label:"📅 Calendar" },
  ];

  const teamMembers = [
    {avatar:"AM", name:"Arjun Mehta",  role:"ML Lead"},
    {avatar:"PS", name:"Priya Sharma", role:"UX Designer"},
    {avatar:"DJ", name:"Dev Joshi",    role:"Backend Dev"},
    {avatar:"AN", name:"Aisha Nair",   role:"Researcher"},
  ];

  const completedTasks = tasks.filter(t => t.done).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  // ── Video/Audio Call Overlay ──
  if (callActive) {
    return (
      <div className="call-overlay">
        {/* Header */}
        <div style={{ padding:"20px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, color:"white" }}>AI Resume Screener — Team {callType === "video" ? "Video" : "Audio"} Call</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginTop:2 }}>4 participants · 00:12:34</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#4A9B7F", animation:"pulse 1.5s infinite" }} />
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>Live</span>
          </div>
        </div>

        {/* Video grid */}
        <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"1fr 1fr", gap:8, padding:16 }}>
          {teamMembers.map((m, i) => {
            const palette = ["#E07A5F","#8E7DBE","#4A9B7F","#D4874A"];
            return (
              <div key={m.avatar} style={{ borderRadius:16, background:`${palette[i]}18`, border:`1px solid ${palette[i]}33`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, position:"relative" }}>
                {callType === "video" ? (
                  <div style={{ width:72, height:72, borderRadius:"50%", background:`${palette[i]}33`, border:`3px solid ${palette[i]}66`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Lora',serif", fontWeight:700, fontSize:26, color:palette[i] }}>{m.avatar}</div>
                ) : (
                  <div style={{ fontSize:48 }}>🎙️</div>
                )}
                <div style={{ color:"rgba(255,255,255,0.9)", fontSize:14, fontWeight:500 }}>{m.name}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{m.role}</div>
                {i === 0 && <div style={{ position:"absolute", bottom:12, left:12, width:8, height:8, borderRadius:"50%", background:"#4A9B7F", boxShadow:"0 0 0 3px rgba(74,155,127,0.3)" }} />}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ padding:"20px 28px", borderTop:"1px solid rgba(255,255,255,0.08)", display:"flex", justifyContent:"center", alignItems:"center", gap:16 }}>
          {[
            { icon:"🎙️", label:"Mute", active:true },
            { icon:"📹", label:"Camera", active:callType==="video" },
            { icon:"🖥️", label:"Screen Share", active:false },
            { icon:"💬", label:"Chat", active:false },
          ].map(ctrl => (
            <button key={ctrl.label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:ctrl.active?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:"12px 18px", cursor:"pointer", color:"rgba(255,255,255,0.8)", fontSize:20 }}>
              {ctrl.icon}
              <span style={{ fontSize:10 }}>{ctrl.label}</span>
            </button>
          ))}
          <button onClick={() => setCallActive(false)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"#C0574A", border:"none", borderRadius:14, padding:"12px 24px", cursor:"pointer", color:"white", fontSize:20 }}>
            📵
            <span style={{ fontSize:10 }}>End Call</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth:1100, margin:"0 auto" }}>
      {/* Project Header */}
      <div className="card" style={{ padding:24, marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:16 }}>
          <div>
            <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:600, marginBottom:4 }}>AI Resume Screener for Bias Detection</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["ML/AI","Python","Figma"].map(s => <Chip key={s} skill={s} />)}
              <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, background:t.coralLight, color:t.coral, border:`1px solid ${t.coral}33` }}>🏗️ Building</span>
              <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, background:t.cardAlt, color:t.textMute, border:`1px solid ${t.border}` }}>⏰ Due Mar 28, 2025</span>
            </div>
          </div>
          {/* Call buttons */}
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => { setCallType("audio"); setCallActive(true); }} style={{ gap:6 }}>
              📞 Audio Call
            </button>
            <button className="btn btn-coral btn-sm" onClick={() => { setCallType("video"); setCallActive(true); }} style={{ gap:6 }}>
              📹 Video Call
            </button>
          </div>
        </div>

        {/* Team row */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:18, flexWrap:"wrap" }}>
          <span style={{ fontSize:13, color:t.textMid }}>Team:</span>
          {teamMembers.map(m => (
            <div key={m.avatar} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <Avatar initials={m.avatar} size={30} />
              <div>
                <div style={{ fontSize:12, fontWeight:500 }}>{m.name.split(" ")[0]}</div>
                <div style={{ fontSize:10, color:t.textMute }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ marginTop:18 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:t.textMid, marginBottom:6 }}>
            <span>Project Progress</span>
            <span style={{ color:t.coral, fontWeight:600 }}>{progress}% complete · {completedTasks}/{tasks.length} tasks done</span>
          </div>
          <div className="xp-bar"><div style={{ height:"100%", width:`${progress}%`, background:`linear-gradient(90deg,${t.coral},${t.lavender})`, borderRadius:3, transition:"width 0.5s" }} /></div>
        </div>
      </div>

      {/* Workspace Tabs */}
      <div style={{ borderBottom:`1px solid ${t.border}`, marginBottom:20, display:"flex", gap:0 }}>
        {wsTabs.map(tab => (
          <button key={tab.id} className={`ws-tab ${wsTab===tab.id?"active":""}`} onClick={() => setWsTab(tab.id)}>{tab.label}</button>
        ))}
      </div>

      {/* ── CHAT ── */}
      {wsTab === "chat" && (
        <div className="card" style={{ overflow:"hidden", display:"flex", flexDirection:"column", height:520 }}>
          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:20, display:"flex", flexDirection:"column", gap:14 }}>
            {msgs.map(m => {
              const isMe = m.from === "YOU";
              return (
                <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems: isMe?"flex-end":"flex-start", gap:4 }}>
                  {!isMe && <div style={{ fontSize:11, color:t.textMute, paddingLeft:4 }}>{m.name} · {m.time}</div>}
                  <div style={{ display:"flex", gap:8, alignItems:"flex-end", flexDirection: isMe?"row-reverse":"row" }}>
                    {!isMe && <Avatar initials={m.from} size={28} />}
                    <div className={`msg-bubble ${isMe?"msg-me":"msg-them"}`} style={{ color:t.text }}>{m.text}</div>
                  </div>
                  {isMe && <div style={{ fontSize:11, color:t.textMute, paddingRight:4 }}>You · {m.time}</div>}
                </div>
              );
            })}
          </div>
          {/* Input */}
          <div style={{ padding:16, borderTop:`1px solid ${t.border}`, display:"flex", gap:8, alignItems:"center" }}>
            <input placeholder="Send a message to the team..." value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendMsg()} style={{ flex:1 }} />
            <button className="btn-icon" title="Attach file">📎</button>
            <button className="btn btn-coral btn-sm" onClick={sendMsg}>Send →</button>
          </div>
        </div>
      )}

      {/* ── TASKS ── */}
      {wsTab === "tasks" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }} className="grid-sidebar">
          {/* Task list */}
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div style={{ fontWeight:600, fontSize:15 }}>Task Assignments</div>
              <button className="btn btn-coral btn-sm" onClick={() => setShowAddTask(s => !s)}>+ Add Task</button>
            </div>

            {/* Add task form */}
            {showAddTask && (
              <div className="card" style={{ padding:16, marginBottom:16, border:`1px solid ${t.coral}33` }}>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:10, color:t.coral }}>New Task</div>
                <input placeholder="Task title..." value={newTask.title} onChange={e => setNewTask(p => ({...p, title:e.target.value}))} style={{ marginBottom:8 }} />
                <div style={{ display:"flex", gap:8, marginBottom:8 }}>
                  <select value={newTask.assignee} onChange={e => setNewTask(p => ({...p, assignee:e.target.value}))}>
                    {teamMembers.map(m => <option key={m.avatar}>{m.name}</option>)}
                  </select>
                  <select value={newTask.priority} onChange={e => setNewTask(p => ({...p, priority:e.target.value}))}>
                    <option>High</option><option>Medium</option><option>Low</option>
                  </select>
                </div>
                <input placeholder="Due date (e.g. Mar 25)" value={newTask.due} onChange={e => setNewTask(p => ({...p, due:e.target.value}))} style={{ marginBottom:10 }} />
                <div style={{ display:"flex", gap:8 }}>
                  <button className="btn btn-coral btn-sm" onClick={addTask}>Add Task</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowAddTask(false)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="card" style={{ padding:"8px 20px" }}>
              {tasks.map(task => (
                <div key={task.id}>
                  <div className="task-row">
                    <div className={`task-check ${task.done?"done":""}`} onClick={() => toggleTask(task.id)} style={{ borderColor: task.done ? t.success : t.border }}>
                      {task.done && <span style={{ fontSize:11, color:"white", fontWeight:700 }}>✓</span>}
                    </div>
                    <div style={{ flex:1, cursor:"pointer" }} onClick={() => setExpandedTask(expandedTask===task.id?null:task.id)}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                        <div style={{ fontSize:14, fontWeight:500, textDecoration:task.done?"line-through":"none", color:task.done?t.textMute:t.text }}>
                          {task.title}
                        </div>
                        <span style={{ fontSize:10, fontWeight:600, padding:"2px 7px", borderRadius:20, background:`${priorityColor[task.priority]}18`, color:priorityColor[task.priority], border:`1px solid ${priorityColor[task.priority]}33`, flexShrink:0 }}>{task.priority}</span>
                      </div>
                      <div style={{ display:"flex", gap:12, marginTop:4 }}>
                        <span style={{ fontSize:12, color:t.textMute }}>👤 {task.assignee.split(" ")[0]}</span>
                        {task.due && <span style={{ fontSize:12, color:t.textMute }}>📅 {task.due}</span>}
                        {task.checklist.length > 0 && (
                          <span style={{ fontSize:12, color:t.textMute }}>
                            ☑ {task.checklist.filter(c=>c.done).length}/{task.checklist.length}
                          </span>
                        )}
                        <span style={{ fontSize:12, color:t.lavender }}>{expandedTask===task.id?"▲":"▼"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checklist expanded */}
                  {expandedTask === task.id && task.checklist.length > 0 && (
                    <div style={{ marginLeft:28, marginBottom:10, background:t.cardAlt, borderRadius:10, padding:"8px 12px" }}>
                      {task.checklist.map((item, idx) => (
                        <div key={idx} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", borderBottom: idx<task.checklist.length-1?`1px solid ${t.border}`:"none", cursor:"pointer" }} onClick={() => toggleChecklist(task.id, idx)}>
                          <div style={{ width:14, height:14, borderRadius:3, border:`1.5px solid ${item.done?t.success:t.border}`, background:item.done?t.success:"none", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            {item.done && <span style={{ fontSize:9, color:"white", fontWeight:700 }}>✓</span>}
                          </div>
                          <span style={{ fontSize:13, color: item.done?t.textMute:t.text, textDecoration:item.done?"line-through":"none" }}>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: team load */}
          <div>
            <div className="card" style={{ padding:20, marginBottom:16 }}>
              <div style={{ fontWeight:600, fontSize:14, marginBottom:14 }}>Team Workload</div>
              {teamMembers.map(m => {
                const memberTasks = tasks.filter(t => t.assignee === m.name);
                const done = memberTasks.filter(t => t.done).length;
                return (
                  <div key={m.avatar} style={{ marginBottom:14 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                      <Avatar initials={m.avatar} size={26} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:500 }}>{m.name.split(" ")[0]}</div>
                        <div style={{ fontSize:10, color:t.textMute }}>{m.role}</div>
                      </div>
                      <span style={{ fontSize:11, color:t.textMid }}>{done}/{memberTasks.length}</span>
                    </div>
                    <div className="xp-bar">
                      <div style={{ height:"100%", width: memberTasks.length?`${(done/memberTasks.length)*100}%`:"0%", background:`linear-gradient(90deg,${t.success},${t.coral})`, borderRadius:3 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="card" style={{ padding:20 }}>
              <div style={{ fontWeight:600, fontSize:14, marginBottom:12 }}>Priority Breakdown</div>
              {["High","Medium","Low"].map(p => {
                const count = tasks.filter(t => t.priority === p).length;
                return (
                  <div key={p} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <span style={{ fontSize:13, color:t.textMid }}>{p}</span>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:60, height:5, borderRadius:3, background:t.border, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${(count/tasks.length)*100}%`, background:priorityColor[p], borderRadius:3 }} />
                      </div>
                      <span style={{ fontSize:12, fontWeight:600, color:priorityColor[p] }}>{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── CALENDAR ── */}
      {wsTab === "calendar" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <div style={{ fontFamily:"'Lora',serif", fontSize:20, fontWeight:600 }}>{calMonth.label}</div>
            <div style={{ display:"flex", gap:10 }}>
              {[
                {type:"meeting",  label:"Meeting",   color:t.lavender},
                {type:"sprint",   label:"Sprint",    color:t.success},
                {type:"milestone",label:"Milestone", color:t.warning},
                {type:"deadline", label:"Deadline",  color:t.danger},
              ].map(l => (
                <div key={l.type} style={{ display:"flex", alignItems:"center", gap:4, fontSize:11 }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:l.color }} />
                  <span style={{ color:t.textMid }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day headers */}
          <div className="cal-grid" style={{ marginBottom:4 }}>
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} style={{ textAlign:"center", fontSize:11, fontWeight:600, color:t.textMute, padding:"4px 0" }}>{d}</div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="cal-grid">
            {/* Empty cells for start day (Saturday = 6) */}
            {Array.from({length:calMonth.startDay}).map((_, i) => (
              <div key={`empty-${i}`} style={{ minHeight:64, borderRadius:10, border:`1px solid transparent` }} />
            ))}
            {calMonth.days.map(day => {
              const events = calEventsForDay(day);
              const isToday = day === 10;
              return (
                <div key={day} className={`cal-cell ${isToday?"today":""} ${events.length?"has-event":""}`}>
                  <div style={{ fontWeight: isToday?700:400, fontSize:12, color: isToday?t.coral:t.textMid }}>{day}</div>
                  {events.map(ev => (
                    <div key={ev.id} className={`cal-event-dot ${ev.type}`} title={`${ev.time} — ${ev.title}`}>
                      {ev.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Upcoming events */}
          <div style={{ marginTop:24 }}>
            <div style={{ fontWeight:600, fontSize:14, marginBottom:14 }}>Upcoming Events</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:12 }}>
              {CALENDAR_EVENTS.sort((a,b) => a.date.localeCompare(b.date)).map(ev => {
                const typeColor = { meeting:t.lavender, sprint:t.success, milestone:t.warning, deadline:t.danger, review:t.coral };
                const c = typeColor[ev.type] || t.coral;
                return (
                  <div key={ev.id} className="card" style={{ padding:16, borderLeft:`3px solid ${c}` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ fontSize:11, fontWeight:600, color:c, textTransform:"capitalize" }}>{ev.type}</span>
                      <span style={{ fontSize:11, color:t.textMute }}>{ev.date.split("-").slice(1).join(" Mar ").replace("-"," ")}</span>
                    </div>
                    <div style={{ fontWeight:600, fontSize:14, marginBottom:4 }}>{ev.title}</div>
                    <div style={{ fontSize:12, color:t.textMute, marginBottom:8 }}>🕐 {ev.time}</div>
                    <div style={{ display:"flex", gap:4 }}>
                      {ev.members.map(m => <Avatar key={m} initials={m} size={22} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function CampusSyncV3() {
  const [dark, setDark] = useState(false);
  const t = dark ? DARK : LIGHT;

  const [activeTab, setActiveTab]         = useState("feed");
  const [posts, setPosts]                 = useState(POSTS_DATA);
  const [toasts, setToasts]               = useState([]);
  const [badgeUnlock, setBadgeUnlock]     = useState(null);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [showPostModal, setShowPostModal]   = useState(false);
  const [showJoinModal, setShowJoinModal]   = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(null);
  const [showAIFinder, setShowAIFinder]     = useState(false);
  const [showSkillGap, setShowSkillGap]     = useState(false);
  const [showPortfolio, setShowPortfolio]   = useState(false);

  const [feedFilter, setFeedFilter]   = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const [bookmarks, setBookmarks]               = useState(new Set([2,5]));
  const [joinedEvents, setJoinedEvents]         = useState(new Set());
  const [connectedStudents, setConnectedStudents] = useState(new Set());
  const [lookingForTeam, setLookingForTeam]     = useState(true);

  const [myXP, setMyXP]       = useState(1250);
  const [myLevel, setMyLevel] = useState(7);
  const [myBadges, setMyBadges] = useState(["pioneer"]);
  const [myScore, setMyScore]   = useState(74);

  const [aiFinderInput, setAiFinderInput] = useState("");
  const [aiResults, setAiResults]         = useState(null);
  const [aiLoading, setAiLoading]         = useState(false);
  const [gapResults, setGapResults]       = useState(null);
  const [gapTeam, setGapTeam]             = useState([]);

  const [newPost, setNewPost] = useState({ title:"", desc:"", type:"project", skills:[], deadline:"" });
  const [liveCount, setLiveCount] = useState(847);

  const unread = notifications.filter(n => !n.read).length;

  const addToast = useCallback((msg, type="success") => {
    const id = Date.now();
    setToasts(prev => [...prev, {id, msg, type}]);
  }, []);

  const gainXP = useCallback((amt) => {
    setMyXP(prev => {
      const next = prev + amt;
      if (Math.floor(prev/500) < Math.floor(next/500)) {
        setMyLevel(l => l+1);
        setMyScore(s => Math.min(s+2, 100));
        addToast("🎉 Level Up! Keep innovating.", "info");
      }
      return next;
    });
  }, [addToast]);

  const unlockBadge = useCallback((badgeId) => {
    setMyBadges(prev => {
      if (prev.includes(badgeId)) return prev;
      setBadgeUnlock(badgeId);
      const b = BADGES.find(x => x.id===badgeId);
      if (b) gainXP(b.xp);
      return [...prev, badgeId];
    });
  }, [gainXP]);

  useEffect(() => {
    const iv = setInterval(() => setLiveCount(c => c + Math.floor(Math.random()*3-1)), 4000);
    return () => clearInterval(iv);
  }, []);

  const handleBookmark = (id) => {
    setBookmarks(s => {
      const n = new Set(s);
      if (n.has(id)) { n.delete(id); addToast("Removed from bookmarks"); }
      else { n.add(id); addToast("Bookmarked! ✨"); gainXP(2); }
      return n;
    });
  };

  const handleJoinConfirm = () => {
    if (!showJoinModal) return;
    const post = posts.find(x => x.id===showJoinModal);
    setPosts(p => p.map(x => x.id===showJoinModal ? {...x, members:x.members+1} : x));
    setShowJoinModal(null);
    gainXP(30);
    addToast(`Request sent to "${post?.title}"!`);
    if (myBadges.length >= 2 && !myBadges.includes("connector")) setTimeout(() => unlockBadge("connector"), 600);
  };

  const handleJoinEvent = (id) => {
    if (joinedEvents.has(id)) return;
    setJoinedEvents(s => new Set([...s, id]));
    gainXP(20);
    addToast("Registered for event! +20 XP","info");
  };

  const handleConnect = (id) => {
    if (connectedStudents.has(id)) return;
    setConnectedStudents(s => new Set([...s, id]));
    const s = STUDENTS.find(x => x.id===id);
    gainXP(10);
    addToast(`Connection request sent to ${s?.name}!`);
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim()) return;
    const post = { id:Date.now(), author:"You", avatar:"YO", time:"Just now", type:newPost.type, title:newPost.title, desc:newPost.desc, skills:newPost.skills, comments:0, members:1, needed:4, stage:newPost.type==="project"?"Ideation":null, bookmarked:false, deadline:newPost.deadline };
    setPosts(p => [post,...p]);
    setShowPostModal(false);
    setNewPost({ title:"", desc:"", type:"project", skills:[], deadline:"" });
    gainXP(50);
    addToast("Post published! +50 XP 🌱");
    if (!myBadges.includes("pioneer")) setTimeout(() => unlockBadge("pioneer"), 700);
  };

  const runAIFinder = () => {
    if (!aiFinderInput.trim()) return;
    setAiLoading(true); setAiResults(null);
    setTimeout(() => {
      setAiResults(STUDENTS.slice(0,3).map(s => ({...s, matchScore:Math.floor(Math.random()*20+78), reason:`Complementary: ${s.skills[0].name}`})).sort((a,b)=>b.matchScore-a.matchScore));
      setAiLoading(false); gainXP(10);
    }, 1800);
  };

  const runSkillGap = () => {
    const allSkills = gapTeam.flatMap(id => { const s = STUDENTS.find(x=>x.id===id); return s?s.skills.map(sk=>sk.name):[]; });
    const missing = SKILL_TAGS_TECH.filter(s => !allSkills.includes(s)).slice(0,3);
    const suggestions = STUDENTS.filter(s => !gapTeam.includes(s.id) && s.skills.some(sk=>missing.includes(sk.name)));
    setGapResults({ missing, suggestions:suggestions.slice(0,3) });
  };

  const searchResults = searchQuery.length > 1 ? [
    ...STUDENTS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.skills.some(sk=>sk.name.toLowerCase().includes(searchQuery.toLowerCase()))).slice(0,3).map(s=>({type:"student",item:s})),
    ...posts.filter(p=>p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0,2).map(p=>({type:"post",item:p})),
    ...EVENTS_DATA.filter(e=>e.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0,2).map(e=>({type:"event",item:e})),
  ] : [];

  const filteredPosts    = posts.filter(p => feedFilter==="all" || p.type===feedFilter);
  const filteredEvents   = EVENTS_DATA.filter(e => eventFilter==="all" || e.category===eventFilter);
  const filteredStudents = skillFilter==="All" ? STUDENTS : STUDENTS.filter(s=>s.skills.some(sk=>sk.name===skillFilter));

  const typeColors = { project:t.coral, event:t.success, bounty:t.warning, idea:t.lavender };
  const typeIcons  = { project:"🚀", event:"📅", bounty:"💰", idea:"💡" };
  const typeLabels = { project:"Project", event:"Event", bounty:"Bounty", idea:"Idea" };

  const TABS = [
    { id:"feed",      label:"Feed",        icon:"📡" },
    { id:"discover",  label:"Discover",    icon:"🧭" },
    { id:"workspace", label:"Workspace",   icon:"🛠️" },
    { id:"events",    label:"Events",      icon:"📅" },
    { id:"bounties",  label:"Bounties",    icon:"💰" },
    { id:"ideas",     label:"Idea Vault",  icon:"💡" },
    { id:"leaderboard",label:"Leaderboard",icon:"🏆" },
    { id:"profile",   label:"My Profile",  icon:"👤" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:t.bg }}>
      <style>{getStyles(t)}</style>

      {/* Badge unlock */}
      {badgeUnlock && <BadgeUnlockOverlay badge={badgeUnlock} onClose={() => setBadgeUnlock(null)} />}

      {/* Toasts */}
      <div style={{ position:"fixed", bottom:24, right:24, zIndex:3000, display:"flex", flexDirection:"column", gap:8 }}>
        {toasts.map(toast => <Toast key={toast.id} msg={toast.msg} type={toast.type} onClose={() => setToasts(p=>p.filter(x=>x.id!==toast.id))} />)}
      </div>

      {/* ── JOIN MODAL ── */}
      {showJoinModal && (
        <div className="modal-bg" onClick={() => setShowJoinModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:600, marginBottom:6 }}>Request to Join 🤝</div>
            <div style={{ color:t.textMid, fontSize:14, marginBottom:20 }}>Introduce yourself and explain why you're a great fit for this team.</div>
            <textarea placeholder="Hi! I'm excited to collaborate because..." rows={4} style={{ marginBottom:8, resize:"none" }} />
            <div style={{ fontSize:12, color:t.textMute, marginBottom:20 }}>⏰ Requests expire automatically after 15 days if no response.</div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-coral" style={{ flex:1 }} onClick={handleJoinConfirm}>Send Request</button>
              <button className="btn btn-ghost" onClick={() => setShowJoinModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE POST MODAL ── */}
      {showPostModal && (
        <div className="modal-bg" onClick={() => setShowPostModal(false)}>
          <div className="modal" style={{ maxWidth:520 }} onClick={e=>e.stopPropagation()}>
            <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:600, marginBottom:20 }}>Create Post ✍️</div>
            <div style={{ fontSize:12, color:t.textMid, marginBottom:6, fontWeight:500 }}>Post Type</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
              {["project","event","bounty","idea"].map(type => (
                <button key={type} onClick={() => setNewPost(p=>({...p,type}))} className="btn btn-sm" style={{ background:newPost.type===type?typeColors[type]+"22":t.cardAlt, border:`1.5px solid ${newPost.type===type?typeColors[type]:t.border}`, color:newPost.type===type?typeColors[type]:t.textMid, borderRadius:20 }}>
                  {typeIcons[type]} {typeLabels[type]}
                </button>
              ))}
            </div>
            <input placeholder="Title..." value={newPost.title} onChange={e=>setNewPost(p=>({...p,title:e.target.value}))} style={{ marginBottom:10 }} />
            <textarea placeholder="Describe your project, what you need, who should join..." rows={3} value={newPost.desc} onChange={e=>setNewPost(p=>({...p,desc:e.target.value}))} style={{ marginBottom:10, resize:"none" }} />
            {newPost.type==="project" && <input placeholder="Deadline (e.g. Mar 28, 2025)" value={newPost.deadline} onChange={e=>setNewPost(p=>({...p,deadline:e.target.value}))} style={{ marginBottom:10 }} />}
            <div style={{ fontSize:12, color:t.textMid, marginBottom:8, fontWeight:500 }}>Required Skills</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
              {[...SKILL_TAGS_TECH.slice(0,8),...SKILL_TAGS_SOFT.slice(0,5)].map(s => (
                <button key={s} onClick={() => setNewPost(p=>({...p, skills:p.skills.includes(s)?p.skills.filter(x=>x!==s):[...p.skills,s]}))}
                  style={{ padding:"4px 11px", borderRadius:20, fontSize:11, fontFamily:"'DM Mono',monospace", cursor:"pointer", transition:"all 0.2s", background:newPost.skills.includes(s)?t.coralLight:t.cardAlt, border:`1.5px solid ${newPost.skills.includes(s)?t.coral:t.border}`, color:newPost.skills.includes(s)?t.coral:t.textMute }}>
                  {s}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-coral" style={{ flex:1 }} onClick={handleCreatePost}>Publish Post</button>
              <button className="btn btn-ghost" onClick={() => setShowPostModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── AI FINDER MODAL ── */}
      {showAIFinder && (
        <div className="modal-bg" onClick={() => setShowAIFinder(false)}>
          <div className="modal" style={{ maxWidth:560 }} onClick={e=>e.stopPropagation()}>
            <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:600, marginBottom:6 }}>🤖 AI Teammate Finder</div>
            <div style={{ color:t.textMid, fontSize:14, marginBottom:20 }}>Describe your project idea and AI will recommend the best-matched teammates from campus.</div>
            <textarea placeholder="e.g. I'm building a mental health tracking app using React Native and need teammates skilled in ML/AI and UI/UX..." rows={4} value={aiFinderInput} onChange={e=>setAiFinderInput(e.target.value)} style={{ marginBottom:14, resize:"none" }} />
            <button className="btn btn-coral" style={{ width:"100%", justifyContent:"center", marginBottom:20 }} onClick={runAIFinder}>
              {aiLoading ? "⟳ Analyzing skills & compatibility..." : "✨ Find My Teammates"}
            </button>
            {aiLoading && <div style={{ textAlign:"center", padding:24 }}><div style={{ fontSize:32, animation:"spin 1s linear infinite", display:"inline-block" }}>⚙️</div><div style={{ color:t.textMid, fontSize:14, marginTop:12 }}>Matching skills, availability, collaboration history...</div></div>}
            {aiResults && (
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:t.textMid, marginBottom:14 }}>Top Matches:</div>
                {aiResults.map((s,i) => (
                  <div key={s.id} className="card" style={{ padding:16, marginBottom:10, display:"flex", gap:12, alignItems:"center" }}>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:20, fontWeight:700, color:t.coral, width:28 }}>#{i+1}</div>
                    <Avatar initials={s.avatar} size={44} online={s.online} verified={s.verified} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:15 }}>{s.name}</div>
                      <div style={{ fontSize:12, color:t.textMid }}>{s.dept}</div>
                      <div style={{ fontSize:12, color:t.textMute, marginTop:2 }}>{s.reason}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:700, color:s.matchScore>=90?t.success:t.coral }}>{s.matchScore}%</div>
                      <div style={{ fontSize:10, color:t.textMute }}>match</div>
                    </div>
                    <button className="btn btn-sm btn-coral" onClick={() => { handleConnect(s.id); addToast(`Invite sent to ${s.name}!`); }}>Invite</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── SKILL GAP MODAL ── */}
      {showSkillGap && (
        <div className="modal-bg" onClick={() => setShowSkillGap(false)}>
          <div className="modal" style={{ maxWidth:540 }} onClick={e=>e.stopPropagation()}>
            <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:600, marginBottom:6 }}>🎯 Skill Gap Detector</div>
            <div style={{ color:t.textMid, fontSize:14, marginBottom:20 }}>Select current team members to identify missing skills.</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
              {STUDENTS.map(s => (
                <button key={s.id} onClick={() => setGapTeam(prev => prev.includes(s.id)?prev.filter(x=>x!==s.id):[...prev,s.id])}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 12px", borderRadius:20, cursor:"pointer", background:gapTeam.includes(s.id)?t.coralLight:t.cardAlt, border:`1.5px solid ${gapTeam.includes(s.id)?t.coral:t.border}`, color:gapTeam.includes(s.id)?t.coral:t.textMid, fontSize:13, transition:"all 0.2s" }}>
                  <Avatar initials={s.avatar} size={22} />
                  {s.name.split(" ")[0]}
                </button>
              ))}
            </div>
            <button className="btn btn-coral" style={{ width:"100%", justifyContent:"center", marginBottom:20 }} onClick={runSkillGap} disabled={gapTeam.length===0}>Analyze Team Skills</button>
            {gapResults && (
              <div>
                <div style={{ background:t.coralLight, border:`1px solid ${t.coral}33`, borderRadius:12, padding:16, marginBottom:16 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:t.coral, marginBottom:8 }}>Missing Skills:</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{gapResults.missing.map(skill => <Chip key={skill} skill={skill} />)}</div>
                </div>
                {gapResults.suggestions.length > 0 && (
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:t.textMid, marginBottom:10 }}>Suggested Additions:</div>
                    {gapResults.suggestions.map(s => (
                      <div key={s.id} className="card" style={{ padding:14, marginBottom:8, display:"flex", gap:12, alignItems:"center" }}>
                        <Avatar initials={s.avatar} size={40} online={s.online} />
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:600 }}>{s.name}</div>
                          <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:4 }}>{s.skills.filter(sk=>gapResults.missing.includes(sk.name)).map(sk=><Chip key={sk.name} skill={sk.name} />)}</div>
                        </div>
                        <button className="btn btn-sm btn-lavender" onClick={() => { handleConnect(s.id); addToast(`Invite sent to ${s.name}!`); }}>Invite</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PROFILE MODAL ── */}
      {showProfileModal && (
        <div className="modal-bg" onClick={() => setShowProfileModal(null)}>
          <div className="modal" style={{ maxWidth:480 }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:20 }}>
              <Avatar initials={showProfileModal.avatar} size={64} online={showProfileModal.online} level={showProfileModal.level} verified={showProfileModal.verified} />
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                  <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:600 }}>{showProfileModal.name}</div>
                  {showProfileModal.verified && <span style={{ fontSize:12, background:t.success+"22", border:`1px solid ${t.success}44`, color:t.success, padding:"2px 8px", borderRadius:20 }}>✓ Verified</span>}
                </div>
                <div style={{ color:t.textMid, fontSize:14 }}>{showProfileModal.dept} · {showProfileModal.year}</div>
                <div style={{ display:"flex", gap:12, marginTop:6 }}>
                  {showProfileModal.github && <span style={{ color:t.textMid, fontSize:13 }}>⬡ {showProfileModal.github}</span>}
                  {showProfileModal.linkedin && <span style={{ color:t.lavender, fontSize:13 }}>in {showProfileModal.linkedin}</span>}
                </div>
              </div>
            </div>
            <p style={{ color:t.textMid, fontSize:14, lineHeight:1.6, marginBottom:16 }}>{showProfileModal.bio}</p>
            <div style={{ display:"flex", gap:16, marginBottom:16 }}>
              {[["Hackathons",showProfileModal.hackathons,t.coral],["Collabs",showProfileModal.collab,t.lavender],["Score",showProfileModal.score,t.success],["Level",showProfileModal.level,t.warning]].map(([label,val,color]) => (
                <div key={label} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:700, color }}>{val}</div>
                  <div style={{ fontSize:11, color:t.textMute }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:16 }}>
              {showProfileModal.skills.map(sk => (
                <div key={sk.name} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <div style={{ width:80, fontSize:12, color:t.textMid }}>{sk.name}</div>
                  <ProfBar level={sk.level} />
                  <div style={{ fontSize:11, color:t.textMute, width:28, textAlign:"right" }}>{sk.level}%</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
              {showProfileModal.domains.map(d => <span key={d} style={{ padding:"3px 10px", borderRadius:20, fontSize:12, background:t.lavenderLight, color:t.lavender, border:`1px solid ${t.lavender}33` }}>{d}</span>)}
            </div>
            <div style={{ display:"flex", gap:6, marginBottom:20 }}>
              {showProfileModal.badges.map(b => <BadgeIcon key={b} badge={b} t={t} />)}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn btn-coral" style={{ flex:1, justifyContent:"center" }} onClick={() => { handleConnect(showProfileModal.id); setShowProfileModal(null); }}>
                {connectedStudents.has(showProfileModal.id)?"✓ Requested":"🔗 Connect"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PORTFOLIO MODAL ── */}
      {showPortfolio && (
        <div className="modal-bg" onClick={() => setShowPortfolio(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:600, marginBottom:4 }}>📄 Portfolio Export</div>
            <div style={{ color:t.textMid, fontSize:14, marginBottom:20 }}>Export your completed projects as a professional PDF portfolio for placements & internships.</div>
            <div style={{ background:t.cardAlt, borderRadius:12, padding:16, marginBottom:20 }}>
              {["AI Resume Screener","Campus EV Tracker","Gene-ML Analysis Tool"].map((proj,i) => (
                <div key={proj} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:i<2?`1px solid ${t.border}`:"none" }}>
                  <span>✅</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:500 }}>{proj}</div>
                    <div style={{ fontSize:11, color:t.textMute }}>Role, skills used, impact & outcomes included</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn btn-coral" style={{ flex:1, justifyContent:"center" }} onClick={() => { setShowPortfolio(false); addToast("Portfolio PDF generated! Check your downloads.","info"); gainXP(20); }}>📥 Export as PDF</button>
              <button className="btn btn-ghost" onClick={() => setShowPortfolio(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── NOTIFICATION PANEL ── */}
      {showNotifPanel && (
        <div style={{ position:"fixed", top:64, right:16, width:360, background:t.surface, border:`1px solid ${t.border}`, borderRadius:16, boxShadow:`0 16px 48px ${t.shadowMd}`, zIndex:500, padding:20, animation:"fadeUp 0.2s ease" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600 }}>Notifications</div>
            <button className="btn btn-sm btn-ghost" onClick={() => { setNotifications(p=>p.map(n=>({...n,read:true}))); setShowNotifPanel(false); }}>Mark all read</button>
          </div>
          {notifications.map(n => (
            <div key={n.id} style={{ display:"flex", gap:12, padding:"10px 0", borderBottom:`1px solid ${t.border}`, opacity:n.read?0.6:1 }}>
              <div style={{ fontSize:18, flexShrink:0, marginTop:2 }}>{n.type==="join"?"🤝":n.type==="ai"?"🤖":n.type==="event"?"📅":n.type==="expire"?"⏰":"🎯"}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, lineHeight:1.5 }}>{n.msg}</div>
                <div style={{ fontSize:11, color:t.textMute, marginTop:4 }}>{n.time}</div>
              </div>
              {!n.read && <div className="notif-pip" style={{ marginTop:6, flexShrink:0 }} />}
            </div>
          ))}
        </div>
      )}

      {/* ══ HEADER ══════════════════════════════════════ */}
      <header style={{ position:"sticky", top:0, zIndex:100, background:t.navBg, backdropFilter:"blur(16px)", borderBottom:`1px solid ${t.border}`, padding:"0 24px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto", display:"flex", alignItems:"center", gap:16, height:60 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            <div style={{ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg,${t.coral},${t.lavender})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>🌱</div>
            <span style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, color:t.text }}>CampusSync</span>
          </div>

          <div className="ticker-wrap hide-mobile" style={{ flex:1, fontSize:12, color:t.textMute }}>
            <div className="ticker">{[...ACTIVITY_FEED,...ACTIVITY_FEED].map((a,i) => <span key={i} style={{ marginRight:48 }}>• {a}</span>)}</div>
          </div>

          <div style={{ position:"relative", width:220, flexShrink:0 }}>
            <input placeholder="🔍 Search skills, people, events..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} onFocus={()=>setSearchActive(true)} onBlur={()=>setTimeout(()=>setSearchActive(false),200)} style={{ fontSize:13, padding:"7px 12px" }} />
            {searchActive && searchResults.length>0 && (
              <div className="search-results">
                {searchResults.map((r,i) => (
                  <div key={i} style={{ padding:"10px 14px", borderBottom:`1px solid ${t.border}`, display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}
                    onMouseEnter={e=>e.currentTarget.style.background=t.cardAlt} onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                    onClick={() => { if(r.type==="student") setShowProfileModal(r.item); setSearchQuery(""); setSearchActive(false); }}>
                    <span style={{ fontSize:14 }}>{r.type==="student"?"👤":r.type==="post"?"📝":"📅"}</span>
                    <div>
                      <div style={{ fontSize:13, fontWeight:500 }}>{r.type==="student"?r.item.name:r.item.title}</div>
                      <div style={{ fontSize:11, color:t.textMute }}>{r.type==="student"?r.item.dept:r.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:lookingForTeam?t.success:t.textMute, background:lookingForTeam?t.success+"18":t.cardAlt, border:`1px solid ${lookingForTeam?t.success+"44":t.border}`, borderRadius:20, padding:"4px 10px", cursor:"pointer", transition:"all 0.2s" }} onClick={() => { setLookingForTeam(l=>!l); addToast(lookingForTeam?"Status hidden":"Now showing as 'Looking for Team'!","info"); }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:lookingForTeam?t.success:t.textMute }} />
              <span className="hide-mobile">Looking for Team</span>
            </div>
            <div style={{ position:"relative" }}>
              <button className="btn-icon" onClick={() => setShowNotifPanel(p=>!p)}>🔔</button>
              {unread>0 && <div style={{ position:"absolute", top:-4, right:-4, width:17, height:17, background:t.coral, borderRadius:"50%", fontSize:10, fontWeight:700, color:"white", display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${t.surface}` }}>{unread}</div>}
            </div>
            <button className="btn-icon" onClick={() => setDark(d=>!d)}>{dark?"☀️":"🌙"}</button>
            <div style={{ background:t.coralLight, border:`1px solid ${t.coral}33`, borderRadius:20, padding:"4px 12px", fontSize:12, fontWeight:600, color:t.coral }}>
              L{myLevel} · {myXP.toLocaleString()} XP
            </div>
          </div>
        </div>
      </header>

      {/* ══ NAV TABS ════════════════════════════════════ */}
      <nav style={{ background:t.surface, borderBottom:`1px solid ${t.border}`, overflowX:"auto" }}>
        <div style={{ maxWidth:1180, margin:"0 auto", padding:"4px 16px", display:"flex", gap:2 }}>
          {TABS.map(tab => (
            <button key={tab.id} className={`tab-btn ${activeTab===tab.id?"active":""}`} onClick={()=>setActiveTab(tab.id)}>
              <span>{tab.icon}</span> {tab.label}
              {tab.id==="workspace" && <span style={{ background:t.coral, color:"white", borderRadius:10, fontSize:9, padding:"1px 5px", fontWeight:700 }}>NEW</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* ══ CONTENT ═════════════════════════════════════ */}
      <main style={{ maxWidth:1180, margin:"0 auto", padding:"28px 24px" }}>

        {/* ─── FEED ─── */}
        {activeTab==="feed" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 296px", gap:24 }} className="grid-sidebar">
            <div>
              <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
                <div style={{ display:"flex", gap:6, flex:1, flexWrap:"wrap" }}>
                  {["all","project","event","bounty","idea"].map(f => (
                    <button key={f} className={`tag-filter ${feedFilter===f?"active":""}`} onClick={()=>setFeedFilter(f)} style={{ display:"flex", alignItems:"center", gap:4 }}>
                      {f!=="all"&&typeIcons[f]} {f==="all"?"All Posts":typeLabels[f]+"s"}
                    </button>
                  ))}
                </div>
                <button className="btn btn-coral btn-sm" onClick={()=>setShowPostModal(true)}>+ Create Post</button>
              </div>

              <div style={{ display:"flex", gap:10, marginBottom:20 }}>
                <button className="btn btn-lavender btn-sm" style={{ flex:1, justifyContent:"center" }} onClick={()=>setShowAIFinder(true)}>🤖 AI Teammate Finder</button>
                <button className="btn btn-ghost btn-sm" style={{ flex:1, justifyContent:"center" }} onClick={()=>setShowSkillGap(true)}>🎯 Skill Gap Detector</button>
              </div>

              {filteredPosts.map((post, idx) => (
                <div key={post.id} className="card hoverable" style={{ padding:22, marginBottom:14, animation:`fadeUp 0.4s ease ${idx*0.04}s both` }}>
                  <div style={{ display:"flex", gap:12, marginBottom:12 }}>
                    <Avatar initials={post.avatar} size={42} />
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                        <span style={{ fontWeight:600, fontSize:14 }}>{post.author}</span>
                        <span style={{ fontSize:12, color:t.textMute }}>· {post.time}</span>
                        <span style={{ padding:"2px 8px", borderRadius:20, fontSize:11, fontWeight:500, background:typeColors[post.type]+"18", color:typeColors[post.type], border:`1px solid ${typeColors[post.type]}33` }}>{typeIcons[post.type]} {typeLabels[post.type]}</span>
                        {post.deadline && <span style={{ fontSize:11, color:t.warning, background:t.warning+"18", border:`1px solid ${t.warning}33`, padding:"2px 8px", borderRadius:20 }}>⏰ {post.deadline}</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontFamily:"'Lora',serif", fontSize:17, fontWeight:600, marginBottom:8, lineHeight:1.4 }}>{post.title}</div>
                  <p style={{ color:t.textMid, fontSize:14, lineHeight:1.6, marginBottom:12 }}>{post.desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>{post.skills.map(s=><Chip key={s} skill={s} />)}</div>

                  {post.type==="project" && post.stage && (
                    <div style={{ marginBottom:12 }}>
                      <div style={{ fontSize:12, fontWeight:500, color:t.textMid, marginBottom:4 }}>Project Stage</div>
                      <LifecycleTracker currentStage={post.stage} t={t} />
                    </div>
                  )}
                  {post.type==="project" && (
                    <div style={{ marginBottom:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5 }}>
                        <span style={{ color:t.textMute }}>Team capacity</span>
                        <span style={{ color:t.textMid, fontWeight:500 }}>{post.members}/{post.needed} members</span>
                      </div>
                      <div className="xp-bar"><div style={{ height:"100%", width:`${(post.members/post.needed)*100}%`, background:`linear-gradient(90deg,${t.coral},${t.lavender})`, borderRadius:3, transition:"width 0.5s" }} /></div>
                    </div>
                  )}

                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <button style={{ display:"flex", alignItems:"center", gap:5, background:t.cardAlt, border:`1px solid ${t.border}`, borderRadius:8, padding:"6px 12px", cursor:"pointer", color:t.textMid, fontSize:13 }}>
                      💬 {post.comments}
                    </button>
                    <button onClick={()=>handleBookmark(post.id)} style={{ background:bookmarks.has(post.id)?t.lavenderLight:t.cardAlt, border:`1px solid ${bookmarks.has(post.id)?t.lavender+"44":t.border}`, borderRadius:8, padding:"6px 10px", cursor:"pointer", color:bookmarks.has(post.id)?t.lavender:t.textMute, fontSize:14, transition:"all 0.2s" }}>
                      {bookmarks.has(post.id)?"🔖":"☆"}
                    </button>
                    <div style={{ marginLeft:"auto" }}>
                      {post.type==="project" && post.members<post.needed && <button className="btn btn-coral btn-sm" onClick={()=>setShowJoinModal(post.id)}>Request to Join</button>}
                      {post.type==="event"   && <button className="btn btn-sm btn-lavender" onClick={()=>handleJoinEvent(post.id)}>{joinedEvents.has(post.id)?"✓ Registered":"Register"}</button>}
                      {post.type==="bounty"  && <button className="btn btn-sm" style={{ background:t.warning+"18", color:t.warning, border:`1px solid ${t.warning}33` }}>🏆 Claim Bounty</button>}
                      {post.type==="idea"    && <button className="btn btn-sm btn-lavender" onClick={()=>setShowJoinModal(post.id)}>💡 Co-Build</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div>
              {/* My Progress */}
              <div className="card" style={{ padding:20, marginBottom:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                  <div className="float" style={{ width:48, height:48, borderRadius:"50%", background:t.coralLight, border:`2px solid ${t.coral}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🧑‍💻</div>
                  <div>
                    <div style={{ fontWeight:600 }}>Your Profile</div>
                    <div style={{ fontSize:12, color:t.textMute }}>Innovation Score: <span style={{ color:t.warning, fontWeight:600 }}>{myScore}/100</span></div>
                  </div>
                </div>
                <div style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5, color:t.textMid }}>
                    <span>Level {myLevel}</span>
                    <span style={{ fontFamily:"'DM Mono'", fontSize:11 }}>{myXP} XP · {500-(myXP%500)} to next</span>
                  </div>
                  <XPBar current={myXP%500} max={500} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
                  {[["Posts",posts.filter(p=>p.author==="You").length,"📝"],["Connects",connectedStudents.size,"🔗"],["Badges",myBadges.length,"🏅"]].map(([label,val,icon])=>(
                    <div key={label} style={{ textAlign:"center", background:t.cardAlt, borderRadius:10, padding:"10px 4px" }}>
                      <div style={{ fontSize:16 }}>{icon}</div>
                      <div style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:18, color:t.coral }}>{val}</div>
                      <div style={{ fontSize:10, color:t.textMute }}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{myBadges.map(b=><BadgeIcon key={b} badge={b} size={32} t={t} />)}</div>
              </div>

              {/* Smart Recommendations */}
              <div className="card" style={{ padding:18, marginBottom:16 }}>
                <div style={{ fontWeight:600, fontSize:14, marginBottom:12 }}>✨ Recommended for You</div>
                {EVENTS_DATA.filter(e=>e.recommended).slice(0,2).map(e=>(
                  <div key={e.id} style={{ background:t.lavenderLight, border:`1px solid ${t.lavender}22`, borderRadius:10, padding:12, marginBottom:8 }}>
                    <div style={{ fontSize:13, fontWeight:500, marginBottom:3 }}>{e.title}</div>
                    <div style={{ fontSize:11, color:t.lavender }}>💡 {e.reason}</div>
                    <div style={{ fontSize:11, color:t.textMute, marginTop:4 }}>📅 {e.date}</div>
                  </div>
                ))}
              </div>

              {/* Campus Pulse */}
              <div className="card" style={{ padding:18 }}>
                <div style={{ fontWeight:600, fontSize:14, marginBottom:12 }}>📊 Campus Pulse</div>
                {[["Active Projects","47",t.coral],["Events This Week","12",t.success],["Open Bounties","8",t.warning],["New Members Today","23",t.lavender]].map(([label,val,color])=>(
                  <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <span style={{ fontSize:13, color:t.textMid }}>{label}</span>
                    <span style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:18, color }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── WORKSPACE (NEW) ─── */}
        {activeTab==="workspace" && <TeamWorkspace t={t} addToast={addToast} />}

        {/* ─── DISCOVER ─── */}
        {activeTab==="discover" && (
          <div>
            <div style={{ marginBottom:24, display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
              <div>
                <div className="section-title">🧭 Discover Talent</div>
                <div className="section-sub">Find collaborators matched to your project's needs</div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button className="btn btn-lavender btn-sm" onClick={()=>setShowAIFinder(true)}>🤖 AI Finder</button>
                <button className="btn btn-ghost btn-sm" onClick={()=>setShowSkillGap(true)}>🎯 Gap Detector</button>
              </div>
            </div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:24 }}>
              {["All",...SKILL_TAGS_TECH.slice(0,8),...SKILL_TAGS_SOFT.slice(0,4)].map(s=>(
                <button key={s} className={`tag-filter ${skillFilter===s?"active":""}`} onClick={()=>setSkillFilter(s)}>{s}</button>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:16 }}>
              {filteredStudents.map((student,i)=>(
                <div key={student.id} className="card hoverable" style={{ padding:22, animation:`fadeUp 0.4s ease ${i*0.06}s both`, cursor:"pointer" }} onClick={()=>setShowProfileModal(student)}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
                    <Avatar initials={student.avatar} size={52} online={student.online} level={student.level} verified={student.verified} />
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:11, color:t.textMute }}>Innovation Score</div>
                      <div style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:26, color:student.score>=90?t.warning:student.score>=80?t.success:t.coral, lineHeight:1.1 }}>{student.score}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight:600, fontSize:15, marginBottom:2 }}>{student.name}</div>
                  <div style={{ fontSize:12, color:t.textMid, marginBottom:10 }}>{student.dept} · {student.year}</div>
                  <p style={{ fontSize:13, color:t.textMid, lineHeight:1.5, marginBottom:12 }}>{student.bio}</p>
                  {student.skills.slice(0,2).map(sk=>(
                    <div key={sk.name} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                      <div style={{ width:56, fontSize:11, color:t.textMid, fontFamily:"'DM Mono'", flexShrink:0 }}>{sk.name}</div>
                      <ProfBar level={sk.level} />
                      <div style={{ fontSize:11, color:t.textMute, width:24, textAlign:"right", flexShrink:0 }}>{sk.level}%</div>
                    </div>
                  ))}
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:14, marginTop:6 }}>
                    <span style={{ color:t.textMute }}>⚡ {student.hackathons} hackathons</span>
                    <span style={{ color:t.textMute }}>🔗 {student.collab} collabs</span>
                    {student.lookingForTeam && <span style={{ color:t.success, fontWeight:500 }}>● Open</span>}
                  </div>
                  <div style={{ display:"flex", gap:8 }} onClick={e=>e.stopPropagation()}>
                    <button className="btn btn-coral btn-sm" style={{ flex:1, justifyContent:"center" }} onClick={()=>handleConnect(student.id)}>
                      {connectedStudents.has(student.id)?"✓ Requested":"🔗 Connect"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── EVENTS ─── */}
        {activeTab==="events" && (
          <div>
            <div className="section-title">📅 Campus Events</div>
            <div className="section-sub">Technical & non-technical events — personalized recommendations included</div>
            <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
              {["all","technical","non-technical"].map(f=>(
                <button key={f} className={`tag-filter ${eventFilter===f?"active":""}`} onClick={()=>setEventFilter(f)}>
                  {f==="all"?"All Events":f==="technical"?"⚙️ Technical":"🎨 Non-Technical"}
                </button>
              ))}
            </div>
            {EVENTS_DATA.filter(e=>e.recommended&&(eventFilter==="all"||e.category===eventFilter)).length>0 && (
              <div style={{ background:t.lavenderLight, border:`1px solid ${t.lavender}33`, borderRadius:14, padding:16, marginBottom:20 }}>
                <div style={{ fontSize:13, fontWeight:600, color:t.lavender, marginBottom:10 }}>✨ Recommended for you</div>
                <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                  {EVENTS_DATA.filter(e=>e.recommended&&(eventFilter==="all"||e.category===eventFilter)).map(e=>(
                    <div key={e.id} style={{ background:t.surface, borderRadius:10, padding:"8px 14px", fontSize:12 }}>
                      <span style={{ fontWeight:500 }}>{e.title}</span>
                      <span style={{ color:t.textMute }}> · {e.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))", gap:16 }}>
              {filteredEvents.map((event,i)=>{
                const pct=(event.registered/event.capacity)*100;
                const isReg=joinedEvents.has(event.id+10);
                return (
                  <div key={event.id} className="card hoverable" style={{ padding:22, animation:`fadeUp 0.4s ease ${i*0.06}s both` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                      <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, background:event.category==="technical"?t.coralLight:t.lavenderLight, color:event.category==="technical"?t.coral:t.lavender, border:`1px solid ${event.category==="technical"?t.coral+"33":t.lavender+"33"}` }}>
                        {event.category==="technical"?"⚙️":"🎨"} {event.type}
                      </span>
                      {event.prize!=="—" && <span style={{ fontSize:13, color:t.warning, fontWeight:600 }}>🏆 {event.prize}</span>}
                    </div>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:17, fontWeight:600, marginBottom:6 }}>{event.title}</div>
                    <p style={{ fontSize:13, color:t.textMid, marginBottom:12, lineHeight:1.5 }}>{event.desc}</p>
                    <div style={{ fontSize:12, color:t.textMute, marginBottom:14 }}>📅 {event.date}</div>
                    <div style={{ marginBottom:16 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:5 }}>
                        <span style={{ color:t.textMute }}>Registrations</span>
                        <span style={{ color:pct>85?t.danger:t.success, fontWeight:500 }}>{event.registered}/{event.capacity}</span>
                      </div>
                      <div className="xp-bar"><div style={{ height:"100%", width:`${pct}%`, background:pct>85?`linear-gradient(90deg,${t.danger},${t.warning})`:`linear-gradient(90deg,${t.success},${t.coral})`, borderRadius:3 }} /></div>
                      {pct>85 && <div style={{ fontSize:11, color:t.danger, marginTop:4 }}>⚠️ Almost full!</div>}
                    </div>
                    <button className={isReg?"btn btn-ghost":"btn btn-coral"} style={{ width:"100%", justifyContent:"center" }}
                      onClick={()=>{ setJoinedEvents(s=>new Set([...s,event.id+10])); gainXP(20); addToast("Registered! +20 XP","info"); }}>
                      {isReg?"✓ Registered":"Register Now"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── BOUNTIES ─── */}
        {activeTab==="bounties" && (
          <div style={{ maxWidth:800 }}>
            <div className="section-title">💰 Open Bounties Board</div>
            <div className="section-sub">Solve real campus challenges — earn XP, credits, and recognition</div>
            {BOUNTIES.map((b,i)=>(
              <div key={b.id} className="card hoverable" style={{ padding:22, marginBottom:14, animation:`fadeUp 0.4s ease ${i*0.07}s both` }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, flexWrap:"wrap", gap:8 }}>
                  <div style={{ display:"flex", gap:8 }}>
                    <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, background:{Easy:t.success+"18",Medium:t.warning+"18",Hard:t.coral+"18"}[b.difficulty], color:{Easy:t.success,Medium:t.warning,Hard:t.coral}[b.difficulty], border:`1px solid ${{Easy:t.success,Medium:t.warning,Hard:t.coral}[b.difficulty]}33` }}>{b.difficulty}</span>
                    <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, background:t.cardAlt, color:t.textMid, border:`1px solid ${t.border}` }}>{b.solo?"Solo":"Team"}</span>
                  </div>
                  <span style={{ fontSize:12, color:t.warning, fontWeight:600 }}>🏆 {b.reward}</span>
                </div>
                <div style={{ fontFamily:"'Lora',serif", fontSize:17, fontWeight:600, marginBottom:4 }}>{b.title}</div>
                <div style={{ fontSize:12, color:t.textMute, marginBottom:10 }}>Posted by: {b.dept} · Deadline: {b.deadline}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>{b.skills.map(s=><Chip key={s} skill={s} />)}</div>
                <button className="btn btn-coral btn-sm" onClick={()=>{ gainXP(15); addToast("Applied for bounty! +15 XP"); }}>Claim This Bounty</button>
              </div>
            ))}
          </div>
        )}

        {/* ─── IDEAS ─── */}
        {activeTab==="ideas" && (
          <div style={{ maxWidth:800 }}>
            <div className="section-title">💡 Anonymous Idea Vault</div>
            <div className="section-sub">Share ideas anonymously. Top ideas rise to the surface and attract collaborators.</div>
            {posts.filter(p=>p.type==="idea").map((idea,i)=>(
              <div key={idea.id} className="card hoverable" style={{ padding:22, marginBottom:14, animation:`fadeUp 0.4s ease ${i*0.06}s both` }}>
                <div style={{ display:"flex", gap:12, marginBottom:12 }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:t.lavenderLight, border:`2px solid ${t.lavender}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>💡</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600 }}>Anonymous</div>
                    <div style={{ fontSize:12, color:t.textMute }}>{idea.time}</div>
                  </div>
                </div>
                <div style={{ fontFamily:"'Lora',serif", fontSize:17, fontWeight:600, marginBottom:8 }}>{idea.title}</div>
                <p style={{ color:t.textMid, fontSize:14, lineHeight:1.6, marginBottom:12 }}>{idea.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>{idea.skills.map(s=><Chip key={s} skill={s} />)}</div>
                <div style={{ display:"flex", gap:8 }}>
                  <button className="btn btn-sm" style={{ background:t.coralLight, color:t.coral, border:`1px solid ${t.coral}33` }}>💬 {idea.comments} comments</button>
                  <button className="btn btn-sm btn-lavender" onClick={()=>setShowJoinModal(idea.id)}>💡 Co-Build This</button>
                  <button className="btn btn-sm btn-ghost" onClick={()=>handleBookmark(idea.id)}>{bookmarks.has(idea.id)?"🔖 Saved":"☆ Save"}</button>
                </div>
              </div>
            ))}
            <button className="btn btn-lavender" style={{ width:"100%", justifyContent:"center", marginTop:4 }} onClick={()=>{ setNewPost(p=>({...p,type:"idea"})); setShowPostModal(true); }}>
              + Share an Anonymous Idea
            </button>
          </div>
        )}

        {/* ─── LEADERBOARD ─── */}
        {activeTab==="leaderboard" && (
          <div style={{ maxWidth:740, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:32 }}>
              <div className="section-title" style={{ fontSize:28, textAlign:"center" }}>🏆 Campus Leaderboard</div>
              <div className="section-sub" style={{ textAlign:"center" }}>Top innovators ranked by Campus Score & collaboration impact</div>
            </div>
            <div style={{ display:"flex", gap:16, justifyContent:"center", alignItems:"flex-end", marginBottom:32 }}>
              {[STUDENTS[1],STUDENTS[0],STUDENTS[2]].map((s,i)=>{
                const heights=[140,175,120]; const medals=["🥈","🥇","🥉"]; const colors=[t.textMid,t.warning,t.coral];
                return (
                  <div key={s.id} style={{ textAlign:"center", flex:1, cursor:"pointer" }} onClick={()=>setShowProfileModal(s)}>
                    <div className={i===1?"float":""}><Avatar initials={s.avatar} size={i===1?56:44} verified={s.verified} /></div>
                    <div style={{ fontSize:13, fontWeight:600, margin:"8px 0 4px" }}>{s.name.split(" ")[0]}</div>
                    <div style={{ fontSize:20, marginBottom:8 }}>{medals[i]}</div>
                    <div style={{ height:heights[i], background:t.cardAlt, border:`1px solid ${t.border}`, borderRadius:"12px 12px 0 0", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
                      <div style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:26, color:colors[i] }}>{s.score}</div>
                      <div style={{ fontSize:10, color:t.textMute }}>score</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {[...STUDENTS].sort((a,b)=>b.score-a.score).map((s,i)=>(
              <div key={s.id} className="card hoverable" style={{ padding:"14px 20px", marginBottom:10, display:"flex", alignItems:"center", gap:14, animation:`fadeUp 0.3s ease ${i*0.05}s both`, borderColor:i===0?t.warning+"44":t.border }} onClick={()=>setShowProfileModal(s)}>
                <div style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:20, color:[t.warning,t.textMid,t.coral][i]||t.textMute, width:28, textAlign:"center" }}>{i+1}</div>
                <Avatar initials={s.avatar} size={42} online={s.online} verified={s.verified} />
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600 }}>{s.name}</div>
                  <div style={{ fontSize:12, color:t.textMute }}>{s.dept} · {s.xp.toLocaleString()} XP · {s.collab} collabs</div>
                </div>
                <div style={{ display:"flex", gap:4 }}>{s.badges.slice(0,3).map(b=><BadgeIcon key={b} badge={b} size={26} t={t} />)}</div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:22, color:t.coral }}>{s.score}</div>
                  <div style={{ fontSize:10, color:t.textMute }}>score</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── PROFILE ─── */}
        {activeTab==="profile" && (
          <div style={{ maxWidth:740, margin:"0 auto" }}>
            <div className="card" style={{ padding:32, marginBottom:20 }}>
              <div style={{ display:"flex", gap:20, alignItems:"flex-start", marginBottom:24, flexWrap:"wrap" }}>
                <div className="float" style={{ width:80, height:80, borderRadius:"50%", background:t.coralLight, border:`3px solid ${t.coral}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>🧑‍💻</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:4 }}>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:26, fontWeight:700 }}>Your Profile</div>
                    <span style={{ fontSize:12, background:t.success+"18", border:`1px solid ${t.success}44`, color:t.success, padding:"2px 8px", borderRadius:20 }}>✓ Verified</span>
                    {lookingForTeam && <span style={{ fontSize:12, background:t.coralLight, border:`1px solid ${t.coral}33`, color:t.coral, padding:"2px 8px", borderRadius:20 }}>● Looking for Team</span>}
                  </div>
                  <div style={{ color:t.textMid, fontSize:14, marginBottom:12 }}>Computer Science · 3rd Year · Campus ID: CS2021042</div>
                  <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                    {["React","Python","Leadership"].map(s=><Chip key={s} skill={s} />)}
                    <button style={{ padding:"3px 11px", borderRadius:20, fontSize:11, background:"none", border:`1.5px dashed ${t.border}`, color:t.textMute, cursor:"pointer" }}>+ Add Skill</button>
                  </div>
                </div>
                <button className="btn btn-lavender btn-sm" onClick={()=>setShowPortfolio(true)}>📄 Export Portfolio</button>
              </div>
              <div style={{ background:t.coralLight, border:`1px solid ${t.coral}22`, borderRadius:14, padding:20, marginBottom:20 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, flexWrap:"wrap", gap:8 }}>
                  <div>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:34, fontWeight:700, color:t.coral, lineHeight:1 }}>Level {myLevel}</div>
                    <div style={{ color:t.textMid, fontSize:12, marginTop:4 }}>Campus Innovator</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:30, fontWeight:700, color:t.warning }}>{myXP.toLocaleString()}</div>
                    <div style={{ color:t.textMute, fontSize:12 }}>Total XP</div>
                  </div>
                </div>
                <XPBar current={myXP%500} max={500} />
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginTop:6 }}>
                  <span style={{ color:t.textMid }}>Progress to Level {myLevel+1}</span>
                  <span style={{ color:t.coral }}>{500-(myXP%500)} XP remaining</span>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
                {[["📝","Posts",posts.filter(p=>p.author==="You").length],["🔗","Connects",connectedStudents.size],["🎟️","Events",joinedEvents.size+1],["⭐","Score",myScore]].map(([icon,label,val])=>(
                  <div key={label} style={{ textAlign:"center", background:t.cardAlt, borderRadius:12, padding:"14px 8px" }}>
                    <div style={{ fontSize:22 }}>{icon}</div>
                    <div style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:22, color:t.coral }}>{val}</div>
                    <div style={{ fontSize:11, color:t.textMute }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding:24, marginBottom:16 }}>
              <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, marginBottom:16 }}>Skills & Proficiency</div>
              {[{name:"React",level:78},{name:"Python",level:65},{name:"Leadership",level:72}].map(sk=>(
                <div key={sk.name} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                  <div style={{ width:80, fontSize:13, fontFamily:"'DM Mono'", color:t.textMid }}>{sk.name}</div>
                  <ProfBar level={sk.level} />
                  <div style={{ fontSize:12, color:t.textMute, width:32, textAlign:"right" }}>{sk.level}%</div>
                </div>
              ))}
              <button className="btn btn-ghost btn-sm" style={{ marginTop:4 }}>+ Add more skills</button>
            </div>
            <div className="card" style={{ padding:24, marginBottom:16 }}>
              <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, marginBottom:16 }}>🏅 Achievement Badges</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:10 }}>
                {BADGES.map(badge=>{
                  const unlocked=myBadges.includes(badge.id);
                  return (
                    <div key={badge.id} style={{ display:"flex", alignItems:"center", gap:10, background:unlocked?`${badge.color}0D`:t.cardAlt, border:`1px solid ${unlocked?badge.color+"33":t.border}`, borderRadius:12, padding:"12px 14px", opacity:unlocked?1:0.5, transition:"all 0.3s" }}>
                      <div style={{ fontSize:26, filter:unlocked?"none":"grayscale(1)" }}>{badge.icon}</div>
                      <div>
                        <div style={{ fontWeight:600, fontSize:13, color:unlocked?badge.color:t.textMute }}>{badge.name}</div>
                        <div style={{ fontSize:10, color:t.textMute }}>{badge.desc}</div>
                        <div style={{ fontSize:10, color:t.warning, marginTop:2 }}>+{badge.xp} XP {unlocked?"✓":""}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="card" style={{ padding:24 }}>
              <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, marginBottom:16 }}>📋 Exit & Impact Log</div>
              <div style={{ background:t.cardAlt, borderRadius:12, padding:16 }}>
                <div style={{ fontWeight:600, fontSize:14, marginBottom:4 }}>Campus Accessibility Audit</div>
                <div style={{ fontSize:12, color:t.textMid, marginBottom:6 }}>Role: Lead Researcher</div>
                <div style={{ fontSize:13, color:t.textMid, marginBottom:8, lineHeight:1.5 }}>Impact: Identified 23 accessibility gaps, 14 resolved by campus facilities team</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}><Chip skill="Research" /><Chip skill="Writing" /></div>
                <div style={{ fontSize:12, color:t.success }}>✅ Published campus report</div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ marginTop:12 }}>+ Log a Completed Project</button>
            </div>
          </div>
        )}
      </main>
      <footer style={{ borderTop:`1px solid ${t.border}`, padding:"16px 24px", marginTop:48, display:"flex", justifyContent:"center", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:16 }}>🌱</span>
        <span style={{ fontSize:13, color:t.textMute }}>CampusSync · Build Together, Grow Together · Hackathon 2025</span>
      </footer>
    </div>
  );
}
