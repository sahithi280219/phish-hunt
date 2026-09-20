// ============================================================
// PHISH HUNT — COMPLETE 25-QUESTION INVESTIGATION BANK
// ============================================================
// Built from the approved scenario descriptions.
// Each question has: scenario evidence, app context, keywords,
// scoring, and wrong-answer feedback.
// ============================================================

export interface Question {
  id: number;
  mission: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  scoreCorrect: number;
  scoreWrong: number;
  title: string;
  app: 'chat' | 'mail' | 'browser' | 'bank' | 'phone';
  scenario: ScenarioContent;
  question: string;
  acceptedKeywords: string[][];  // Array of keyword groups (any match within a group = correct)
  correctAnswer: string;
  explanation: string;
  realWorldExample: string;
  preventionTip: string;
  evidence: Evidence;
}

export interface ScenarioContent {
  // For ChatApp
  chatMessages?: ChatMessage[];
  // For Mail
  email?: EmailContent;
  // For Browser
  browserUrl?: string;
  browserContent?: string;
  // For Bank
  bankAlert?: BankAlertContent;
  // For Phone
  callLog?: CallLogContent;
}

export interface ChatMessage {
  sender: string;
  message: string;
  time: string;
  isPlayer?: boolean;
  isSuspicious?: boolean;
}

export interface EmailContent {
  from: string;
  fromEmail: string;
  replyTo?: string;
  to: string;
  subject: string;
  date: string;
  body: string;
  attachments?: string[];
  hasWarning?: boolean;
}

export interface BankAlertContent {
  bankName: string;
  alertType: string;
  message: string;
  amount?: string;
  accountEnding?: string;
  actionUrl?: string;
  timestamp: string;
}

export interface CallLogContent {
  callerName: string;
  callerNumber: string;
  duration: string;
  transcript: string[];
}

export interface Evidence {
  title: string;
  description: string;
  whyItMatters: string;
}

// ============================================================
// MISSION DEFINITIONS
// ============================================================

export interface Mission {
  id: number;
  title: string;
  subtitle: string;
  briefing: string;
  questionRange: [number, number]; // [start, end] inclusive
  narrative: string;
}

export const MISSIONS: Mission[] = [
  {
    id: 1,
    title: 'THE FIRST SIGNS',
    subtitle: 'Initial Reconnaissance',
    briefing: 'Reports of suspicious messages have been flooding in from students across campus. Your task: investigate the first wave of social engineering attacks targeting the student community. Analyze incoming communications and identify the threats before they spread.',
    questionRange: [1, 4],
    narrative: 'You\'ve been assigned to the Cyber Response Unit after multiple students reported receiving strange messages. Something doesn\'t feel right. Time to investigate.',
  },
  {
    id: 2,
    title: 'DEEPENING THREAT',
    subtitle: 'Expanding Attack Surface',
    briefing: 'The attacks are escalating. The threat actor is now using multiple channels — email, messaging, and even phone calls. Analyze the new evidence and trace the attacker\'s methods.',
    questionRange: [5, 8],
    narrative: 'The initial reports were just the beginning. New incidents are being reported every hour. The attacker is getting bolder.',
  },
  {
    id: 3,
    title: 'THE WEB OF DECEIT',
    subtitle: 'Advanced Social Engineering',
    briefing: 'The attacker has created sophisticated fake platforms and services. Students are being lured into entering credentials on convincing replicas. Investigate the digital infrastructure being used.',
    questionRange: [9, 12],
    narrative: 'Intelligence suggests the attacker has set up multiple fake websites and services. The sophistication level has increased dramatically.',
  },
  {
    id: 4,
    title: 'FINANCIAL WARFARE',
    subtitle: 'Following the Money',
    briefing: 'The attack has shifted to financial fraud. Students are receiving fake payment requests, fraudulent refunds, and banking scams. Trace the financial trail and protect the students.',
    questionRange: [13, 15],
    narrative: 'The attacker\'s true motive becomes clear — financial gain. Money is moving, accounts are being compromised.',
  },
  {
    id: 5,
    title: 'IDENTITY CRISIS',
    subtitle: 'Credential Harvesting Operation',
    briefing: 'A massive credential harvesting operation has been uncovered. The attacker is using fake login pages, password resets, and account recovery flows. Identify the collection mechanisms.',
    questionRange: [16, 19],
    narrative: 'Hundreds of credentials may already be compromised. The attacker is building a database of stolen identities.',
  },
  {
    id: 6,
    title: 'THE INSIDER',
    subtitle: 'Advanced Persistent Threat',
    briefing: 'Evidence suggests the attacker may have inside help. Sophisticated attacks involving malicious documents, OAuth exploitation, and session hijacking point to someone with deep knowledge of campus systems.',
    questionRange: [20, 23],
    narrative: 'The attacks show intimate knowledge of campus infrastructure. Is there a mole? Investigate the insider threat.',
  },
  {
    id: 7,
    title: 'FINAL STRIKE',
    subtitle: 'Stopping the Mastermind',
    briefing: 'All evidence points to one final coordinated attack. The mastermind is about to execute their endgame. Use everything you\'ve learned to identify, prevent, and stop the attack. This is it.',
    questionRange: [24, 25],
    narrative: 'This is the culmination of everything. The mastermind is making their final move. Stop them.',
  },
];

// ============================================================
// 25 INVESTIGATION QUESTIONS
// ============================================================

export const QUESTIONS: Question[] = [
  // ================================================================
  // EASY QUESTIONS (1-8) — Correct: +10, Wrong: -5
  // ================================================================

  // Q1: Fake Internship Offer
  {
    id: 1,
    mission: 1,
    difficulty: 'EASY',
    scoreCorrect: 10,
    scoreWrong: -5,
    title: 'Suspicious Internship Offer',
    app: 'mail',
    scenario: {
      email: {
        from: 'HR Department - TechCorp Global',
        fromEmail: 'hr.techcorp@gmail.com',
        to: 'student@college.edu.in',
        subject: '🎉 Congratulations! You\'ve been selected for a PAID Summer Internship at TechCorp!',
        date: 'Sep 15, 2026, 2:14 AM',
        body: `Dear Student,

We are excited to inform you that you have been SELECTED for our exclusive Summer Internship Program 2026 at TechCorp Global!

This is a PAID internship with a monthly stipend of ₹45,000 and a guaranteed Pre-Placement Offer (PPO) upon completion.

To secure your spot, you must complete the registration within 24 HOURS. Seats are limited and filling up fast!

REGISTRATION LINK: https://techcorp-careers.internship-apply.com/register

Requirements:
- Resume (PDF)
- College ID scan
- Aadhaar card copy (for verification)
- Registration fee: ₹1,999 (refundable after joining)

Don't miss this once-in-a-lifetime opportunity!

Best Regards,
Priya Sharma
Senior HR Manager
TechCorp Global Pvt. Ltd.

Note: This offer expires in 24 hours. Non-response will be considered as rejection.`,
        attachments: ['TechCorp_Internship_Brochure.pdf'],
      },
    },
    question: 'You just received this internship email. What is the PRIMARY red flag that identifies this as a phishing attempt?',
    acceptedKeywords: [
      ['fake domain', 'gmail', 'not official', 'suspicious domain', 'personal email'],
      ['registration fee', 'fee', 'payment', 'pay money'],
      ['urgency', '24 hours', 'limited time', 'expires'],
      ['aadhaar', 'personal documents', 'id scan'],
    ],
    correctAnswer: 'Fake domain / Registration fee required',
    explanation: 'Legitimate companies never use Gmail for official HR communications and never charge registration fees for internships. The sender uses "hr.techcorp@gmail.com" — a free email service, not an official corporate domain. Additionally, requesting Aadhaar copies and money upfront are classic phishing indicators.',
    realWorldExample: 'In 2023, thousands of Indian engineering students lost money to fake internship scams that collected ₹1,000-5,000 as "registration fees" through convincing emails mimicking companies like Google, Microsoft, and Amazon.',
    preventionTip: 'Always verify the sender\'s email domain matches the company\'s official website. Legitimate internships NEVER require upfront payment. Verify opportunities through the company\'s official careers page.',
    evidence: {
      title: 'EVIDENCE #1: Spoofed Corporate Email',
      description: 'The sender is using a free Gmail account disguised as TechCorp HR. Real companies use their own email domains (e.g., hr@techcorp.com).',
      whyItMatters: 'Email spoofing is the #1 method attackers use to initiate phishing campaigns. Identifying fake sender domains is the first line of defense.',
    },
  },

  // Q2: Scholarship Scam
  {
    id: 2,
    mission: 1,
    difficulty: 'EASY',
    scoreCorrect: 10,
    scoreWrong: -5,
    title: 'Scholarship Award Notification',
    app: 'chat',
    scenario: {
      chatMessages: [
        { sender: 'Unknown Number', message: 'Hey! Are you a student at Vidya College?', time: '10:32 AM' },
        { sender: 'You', message: 'Yes, who is this?', time: '10:35 AM', isPlayer: true },
        { sender: 'Unknown Number', message: 'I\'m from the National Scholarship Foundation. Your profile has been shortlisted for the PM Merit Scholarship 2026! 🎓', time: '10:36 AM', isSuspicious: true },
        { sender: 'Unknown Number', message: 'You can receive ₹75,000 directly in your bank account!', time: '10:36 AM', isSuspicious: true },
        { sender: 'Unknown Number', message: 'Just fill this form to verify your details: https://pm-scholarship-verify.web.app/apply', time: '10:37 AM', isSuspicious: true },
        { sender: 'Unknown Number', message: 'Hurry! Only 50 spots remaining. Form closes by tonight! ⏰', time: '10:37 AM', isSuspicious: true },
        { sender: 'You', message: 'How did you get my number?', time: '10:40 AM', isPlayer: true },
        { sender: 'Unknown Number', message: 'Your college shared your details with us for the scholarship program. Don\'t worry, this is 100% official. The PM himself approved this! 🇮🇳', time: '10:41 AM', isSuspicious: true },
      ],
    },
    question: 'A stranger on WhatsApp claims you\'ve won a scholarship. What makes this a social engineering attack?',
    acceptedKeywords: [
      ['unsolicited', 'unknown number', 'stranger', 'unknown sender'],
      ['urgency', 'hurry', 'limited spots', 'closes tonight'],
      ['web.app', 'suspicious link', 'fake link', 'unofficial link'],
      ['scholarship scam', 'too good to be true', 'fake scholarship'],
      ['personal details', 'bank account', 'verify details'],
    ],
    correctAnswer: 'Unsolicited contact / Urgency tactics / Suspicious link',
    explanation: 'Government scholarships are NEVER awarded via WhatsApp from unknown numbers. The urgency ("closes tonight"), the unofficial web.app domain, and the request for bank details are classic social engineering techniques designed to make you act without thinking.',
    realWorldExample: 'The "PM Scholarship Scam" has been flagged by the Indian Cyber Crime Coordination Centre (I4C). Scammers create fake scholarship portals to harvest bank account details and personal documents from students.',
    preventionTip: 'Government scholarships are only available through official portals like scholarships.gov.in. Never share bank details via messaging apps. Verify any scholarship through your college\'s official scholarship cell.',
    evidence: {
      title: 'EVIDENCE #2: Social Engineering via Messaging',
      description: 'The attacker uses urgency, authority claims, and a suspicious link to pressure the target into providing personal information.',
      whyItMatters: 'Messaging-based phishing is growing rapidly because it feels more personal and urgent than email.',
    },
  },

  // Q3: Fake IT Support OTP Request
  {
    id: 3,
    mission: 1,
    difficulty: 'EASY',
    scoreCorrect: 10,
    scoreWrong: -5,
    title: 'IT Support OTP Request',
    app: 'phone',
    scenario: {
      callLog: {
        callerName: 'College IT Support',
        callerNumber: '+91 98765 43210',
        duration: '3:42',
        transcript: [
          'Caller: Hello, this is Rajesh from the College IT Support Department.',
          'Caller: We\'ve detected unauthorized access to your college email account from a different location.',
          'Caller: For your security, we need to verify your identity immediately.',
          'Caller: I\'m going to send you an OTP on your registered mobile number.',
          'Caller: Please read it back to me so we can secure your account.',
          'You: I received the OTP. It says 847291.',
          'Caller: Thank you. Now I also need your current password to reset it to a new secure one.',
          'Caller: What is your current email password?',
          'You: Wait, should I be giving my password over the phone?',
          'Caller: Sir/Ma\'am, this is an EMERGENCY. Your account will be permanently locked in 5 minutes if we don\'t act now!',
        ],
      },
    },
    question: 'You received a call from someone claiming to be IT support asking for your OTP and password. What is the key indicator this is a phishing call?',
    acceptedKeywords: [
      ['OTP request', 'asking for OTP', 'OTP', 'sharing OTP'],
      ['password request', 'asking password', 'password over phone'],
      ['never ask', 'IT never asks', 'support never asks'],
      ['social engineering', 'vishing', 'phone scam'],
      ['urgency', 'emergency', 'locked', '5 minutes'],
    ],
    correctAnswer: 'OTP request / Legitimate IT support never asks for passwords or OTPs',
    explanation: 'No legitimate IT department will EVER ask you to share your OTP or password over the phone. OTPs are meant to verify YOUR identity to a system, not for you to share with another person. This is a classic vishing (voice phishing) attack using urgency and authority.',
    realWorldExample: 'In 2024, a vishing campaign targeted university students across India. Attackers posed as IT support and collected OTPs to take over email accounts, then used those accounts to send phishing emails to the entire student directory.',
    preventionTip: 'NEVER share OTPs or passwords with anyone over the phone, even if they claim to be IT support. Hang up and contact IT support directly through official channels. Real IT departments have internal tools to verify and fix accounts without needing your credentials.',
    evidence: {
      title: 'EVIDENCE #3: Voice Phishing (Vishing) Attack',
      description: 'The caller impersonates IT support and uses urgency to extract OTP and password credentials.',
      whyItMatters: 'Vishing attacks bypass email filters and exploit the human tendency to comply with authority figures.',
    },
  },

  // Q4: Fake Internship Website
  {
    id: 4,
    mission: 1,
    difficulty: 'EASY',
    scoreCorrect: 10,
    scoreWrong: -5,
    title: 'Fake Internship Website Investigation',
    app: 'browser',
    scenario: {
      browserUrl: 'https://techcorp-careers.internship-apply.com/register',
      browserContent: `
╔══════════════════════════════════════════════════╗
║  🔒 techcorp-careers.internship-apply.com        ║
╠══════════════════════════════════════════════════╣
║                                                    ║
║         TECHCORP GLOBAL                            ║
║    Summer Internship Registration 2026             ║
║                                                    ║
║  ┌────────────────────────────────────────┐       ║
║  │ Full Name: __________________________ │       ║
║  │ Email: ______________________________ │       ║
║  │ Phone: ______________________________ │       ║
║  │ College: ____________________________ │       ║
║  │ College ID No: ______________________ │       ║
║  │ Aadhaar No: _________________________ │       ║
║  │                                        │       ║
║  │ PAYMENT: Registration Fee ₹1,999       │       ║
║  │ UPI ID: _____________________________ │       ║
║  │ [  PAY & REGISTER  ]                  │       ║
║  └────────────────────────────────────────┘       ║
║                                                    ║
║  ⚠️ "2,847 students already registered!"           ║
║  ⚠️ "Only 153 spots left!"                        ║
║                                                    ║
║  © 2026 TechCorp Global. All rights reserved.      ║
╚══════════════════════════════════════════════════╝`,
    },
    question: 'You\'re examining the registration website from the internship email. What makes this website suspicious?',
    acceptedKeywords: [
      ['fake domain', 'not official domain', 'internship-apply.com', 'third party domain'],
      ['aadhaar', 'personal information', 'sensitive data', 'id number'],
      ['payment', 'fee', 'UPI', 'pay money', 'registration fee'],
      ['urgency', 'limited spots', 'scarcity', 'filling fast'],
      ['credential harvesting', 'data collection'],
    ],
    correctAnswer: 'Fake domain (not official TechCorp) / Asks for Aadhaar & payment',
    explanation: 'The website domain "internship-apply.com" is NOT an official TechCorp domain. Legitimate companies host their career pages on their own domain (e.g., careers.techcorp.com). The page collects sensitive PII (Aadhaar) and money — both massive red flags for a phishing site.',
    realWorldExample: 'Fake recruitment portals are one of the top 5 phishing methods in India. Attackers register domains that look similar to real companies and collect both personal data and money from job-seeking students.',
    preventionTip: 'Always check the URL domain carefully. Official company career pages are hosted on the company\'s main domain. Never enter Aadhaar numbers or make payments on third-party domains. Use WHOIS lookup to check when a domain was registered — new domains are suspicious.',
    evidence: {
      title: 'EVIDENCE #4: Phishing Website Infrastructure',
      description: 'A fake registration portal designed to harvest personal data and money from unsuspecting students.',
      whyItMatters: 'Phishing websites are becoming increasingly convincing. Learning to identify fake domains is crucial for online safety.',
    },
  },

  // Q5: Fake Bank KYC
  {
    id: 5,
    mission: 2,
    difficulty: 'EASY',
    scoreCorrect: 10,
    scoreWrong: -5,
    title: 'Urgent KYC Update Alert',
    app: 'bank',
    scenario: {
      bankAlert: {
        bankName: 'SafeBank India',
        alertType: 'KYC VERIFICATION REQUIRED',
        message: `URGENT: Your SafeBank account will be SUSPENDED within 24 hours due to incomplete KYC verification.

To avoid account suspension, please update your KYC immediately:

Click here: https://safebank-kyc-update.in/verify

Required documents:
• PAN Card photo
• Aadhaar Card (front & back)
• Selfie with ID
• Account PIN for verification

Failure to complete KYC will result in:
❌ Account freeze
❌ Blocked transactions
❌ UPI services disabled

Complete verification NOW to keep your account active.

- SafeBank Security Team`,
        amount: undefined,
        accountEnding: '4521',
        actionUrl: 'https://safebank-kyc-update.in/verify',
        timestamp: 'Sep 16, 2026, 8:45 PM',
      },
    },
    question: 'You received an SMS alert about urgent KYC verification. What indicates this is a phishing attempt?',
    acceptedKeywords: [
      ['fake domain', 'not official', 'safebank-kyc-update.in', 'unofficial URL'],
      ['account PIN', 'PIN request', 'asking PIN', 'never ask PIN'],
      ['urgency', '24 hours', 'account suspended', 'frozen'],
      ['KYC scam', 'fake KYC', 'phishing'],
      ['aadhaar', 'pan card', 'selfie', 'sensitive documents'],
    ],
    correctAnswer: 'Fake domain / Banks never ask for Account PIN for KYC',
    explanation: 'Banks NEVER ask for your Account PIN during KYC verification. The URL "safebank-kyc-update.in" is not an official bank domain. Real KYC updates happen through the official banking app or by visiting the branch. The urgency tactics are designed to bypass rational thinking.',
    realWorldExample: 'The RBI has repeatedly warned about fake KYC scams where attackers send SMS messages asking users to click links and enter banking credentials. In 2023-2024, over ₹100 crore was stolen through KYC phishing scams in India.',
    preventionTip: 'Banks will NEVER ask for your PIN, password, or OTP via SMS/email. For KYC updates, visit your bank branch or use the official banking app. Report suspicious messages to your bank and to cybercrime.gov.in.',
    evidence: {
      title: 'EVIDENCE #5: Banking Phishing Attack',
      description: 'A fake KYC alert designed to steal banking credentials and personal documents.',
      whyItMatters: 'Financial phishing causes direct monetary loss and is the most damaging form of phishing for individuals.',
    },
  },

  // Q6: Fake Placement Coordinator
  {
    id: 6,
    mission: 2,
    difficulty: 'EASY',
    scoreCorrect: 10,
    scoreWrong: -5,
    title: 'Message from Placement Coordinator',
    app: 'chat',
    scenario: {
      chatMessages: [
        { sender: 'Prof. Mehta (Placement Cell)', message: 'Dear students, this is an urgent notice from the Placement Cell.', time: '3:15 PM', isSuspicious: true },
        { sender: 'Prof. Mehta (Placement Cell)', message: 'A top MNC is conducting an off-campus drive EXCLUSIVELY for our college students.', time: '3:15 PM', isSuspicious: true },
        { sender: 'Prof. Mehta (Placement Cell)', message: 'Package: 12-18 LPA. Direct interview, no aptitude test needed!', time: '3:16 PM', isSuspicious: true },
        { sender: 'Prof. Mehta (Placement Cell)', message: 'Fill this Google Form with your details IMMEDIATELY: https://forms.google.com/d/1Bx8kL_fake/viewform', time: '3:16 PM', isSuspicious: true },
        { sender: 'Prof. Mehta (Placement Cell)', message: 'Also share your latest semester marksheet and ID card scan.', time: '3:17 PM', isSuspicious: true },
        { sender: 'Prof. Mehta (Placement Cell)', message: 'DEADLINE: Today by 5 PM only! After that, the link will be disabled.', time: '3:17 PM', isSuspicious: true },
        { sender: 'Arjun (Classmate)', message: 'Hey did you see Prof. Mehta\'s message? I\'m filling it now!', time: '3:25 PM' },
        { sender: 'You', message: 'Wait, does this look legitimate to you?', time: '3:28 PM', isPlayer: true },
      ],
    },
    question: 'Your placement coordinator sent an urgent message about an exclusive job opportunity. What should make you suspicious?',
    acceptedKeywords: [
      ['impersonation', 'fake coordinator', 'impersonating', 'pretending'],
      ['urgency', 'deadline', 'today only', 'immediately', '5 PM'],
      ['no aptitude test', 'too good to be true', 'too easy', 'high package'],
      ['google form', 'personal details', 'marksheet', 'id card'],
      ['verify identity', 'confirm with placement cell', 'call professor'],
    ],
    correctAnswer: 'Urgency / Too good to be true / Unverified identity / Requests sensitive documents',
    explanation: 'The message uses classic social engineering: extreme urgency, too-good-to-be-true offers (12-18 LPA with no test), and requests for sensitive personal documents. Even though the sender\'s name looks legitimate, you should always verify through official channels — call the placement cell directly.',
    realWorldExample: 'Attackers frequently impersonate college faculty on WhatsApp groups. In several incidents, students shared marksheets and ID cards through fake Google Forms, which were then used for identity fraud and fake loan applications.',
    preventionTip: 'Always verify placement-related messages by contacting the placement cell directly (phone call or in person). Legitimate placement drives are announced through official college portals, not urgent WhatsApp messages. Never share sensitive documents through forms shared via chat.',
    evidence: {
      title: 'EVIDENCE #6: Authority Impersonation',
      description: 'An attacker impersonates a trusted authority figure (placement coordinator) to harvest personal data from students.',
      whyItMatters: 'Authority-based social engineering is highly effective because people naturally trust figures of authority.',
    },
  },

  // Q7: Suspicious Executable Attachment
  {
    id: 7,
    mission: 2,
    difficulty: 'EASY',
    scoreCorrect: 10,
    scoreWrong: -5,
    title: 'Suspicious Email Attachment',
    app: 'mail',
    scenario: {
      email: {
        from: 'College Events Committee',
        fromEmail: 'events.committee@vidyacollege.org.in',
        to: 'student@college.edu.in',
        subject: 'Fest Registration Form & Schedule - TechFest 2026',
        date: 'Sep 16, 2026, 11:30 AM',
        body: `Hello Students!

TechFest 2026 is just around the corner! 🎉

Please download the attached registration form and event schedule. Fill in your details and submit it at the event desk.

Note: The form is in a special interactive format for a better experience. You might need to "Enable Macros" or "Enable Content" when opening it.

Looking forward to seeing you there!

Warm regards,
Events Committee
Vidya College`,
        attachments: ['TechFest_Registration_Form.docm', 'Event_Schedule_2026.exe'],
        hasWarning: true,
      },
    },
    question: 'You received an email about TechFest with attachments. One is a .docm file and the other is a .exe file. What is the threat?',
    acceptedKeywords: [
      ['executable', '.exe', 'exe file', 'malware', 'virus'],
      ['macro', '.docm', 'enable macros', 'enable content', 'malicious macro'],
      ['malicious attachment', 'dangerous file', 'infected file'],
      ['trojan', 'payload', 'malicious code'],
    ],
    correctAnswer: 'Malicious executable (.exe) and macro-enabled document (.docm)',
    explanation: 'The .exe file is a Windows executable that can install malware on your computer. The .docm file is a macro-enabled Word document — macros can contain malicious code that runs when you "Enable Content." Legitimate event forms are shared as .pdf or .docx (without macros), never as .exe files.',
    realWorldExample: 'The Emotet malware campaign used macro-enabled Word documents sent via email to infect millions of computers worldwide. Once macros were enabled, the malware downloaded additional payloads including ransomware and banking trojans.',
    preventionTip: 'Never open .exe files received via email. Be extremely cautious with .docm files that ask you to "Enable Macros." Legitimate documents don\'t need macros. Contact the sender through a different channel to verify before opening suspicious attachments.',
    evidence: {
      title: 'EVIDENCE #7: Malware Distribution via Email',
      description: 'Malicious executable and macro-enabled document disguised as legitimate college event materials.',
      whyItMatters: 'Email attachments remain the primary delivery method for malware, ransomware, and trojans.',
    },
  },

  // Q8: Student Reward QR Scam
  {
    id: 8,
    mission: 2,
    difficulty: 'EASY',
    scoreCorrect: 10,
    scoreWrong: -5,
    title: 'Student Reward QR Code',
    app: 'chat',
    scenario: {
      chatMessages: [
        { sender: 'Student Club Official', message: '📢 ATTENTION ALL STUDENTS! 📢', time: '5:00 PM', isSuspicious: true },
        { sender: 'Student Club Official', message: 'Congratulations! As part of our Student Appreciation Week, every student gets a FREE ₹500 Amazon Gift Card! 🎁', time: '5:00 PM', isSuspicious: true },
        { sender: 'Student Club Official', message: 'Simply scan this QR code to claim your reward:', time: '5:01 PM', isSuspicious: true },
        { sender: 'Student Club Official', message: '[QR CODE IMAGE - Links to: http://amaz0n-rewards.gift/claim?ref=student2026]', time: '5:01 PM', isSuspicious: true },
        { sender: 'Student Club Official', message: 'After scanning, you just need to enter your UPI PIN to receive the gift card amount directly in your account! ✅', time: '5:02 PM', isSuspicious: true },
        { sender: 'Student Club Official', message: 'Offer valid only TODAY! Already 340 students have claimed theirs! Don\'t miss out!', time: '5:02 PM', isSuspicious: true },
        { sender: 'Priya (Friend)', message: 'OMG free Amazon voucher! I\'m scanning it rn 😍', time: '5:10 PM' },
        { sender: 'You', message: 'Wait Priya, DON\'T scan that...', time: '5:12 PM', isPlayer: true },
      ],
    },
    question: 'A student club is distributing QR codes for "free gift cards" that require your UPI PIN. What is the scam here?',
    acceptedKeywords: [
      ['QR scam', 'QR code scam', 'malicious QR'],
      ['UPI PIN', 'entering PIN', 'UPI scam', 'PIN to receive'],
      ['receiving money', 'no PIN needed', 'PIN not required for receiving'],
      ['amaz0n', 'fake URL', 'typosquatting', 'fake domain'],
      ['gift card scam', 'free reward scam', 'too good to be true'],
    ],
    correctAnswer: 'UPI PIN is never needed to RECEIVE money / QR code scam',
    explanation: 'You NEVER need to enter your UPI PIN to RECEIVE money. The QR code is designed to DEBIT money from your account, not credit it. When you scan a QR code and enter your PIN, you\'re authorizing a PAYMENT, not a receipt. The URL "amaz0n-rewards.gift" uses a zero instead of \'o\' — a typosquatting technique.',
    realWorldExample: 'QR code scams have exploded in India. Scammers on OLX and social media convinced victims that scanning a QR code and entering their PIN would "receive" payment. Thousands of people lost money this way before awareness campaigns.',
    preventionTip: 'Remember: Entering UPI PIN = Making a payment, NOT receiving money. You never need to enter a PIN to receive funds. Report QR code scams to your bank and cybercrime.gov.in immediately. Be wary of any "free gift" offers that require you to scan codes.',
    evidence: {
      title: 'EVIDENCE #8: QR Code Payment Fraud',
      description: 'A QR code designed to steal money by tricking users into authorizing payments while believing they\'re receiving rewards.',
      whyItMatters: 'QR code fraud is one of the fastest-growing digital payment scams in India.',
    },
  },

  // ================================================================
  // MEDIUM QUESTIONS (9-17) — Correct: +20, Wrong: -10
  // ================================================================

  // Q9: Fake Microsoft 365 Login
  {
    id: 9,
    mission: 3,
    difficulty: 'MEDIUM',
    scoreCorrect: 20,
    scoreWrong: -10,
    title: 'Microsoft 365 Security Alert',
    app: 'browser',
    scenario: {
      browserUrl: 'https://microsoftonline-secure.com/login?redirect=outlook365',
      browserContent: `
╔══════════════════════════════════════════════════╗
║  🔒 microsoftonline-secure.com                    ║
║  ⚠️ Certificate: Let's Encrypt (Free SSL)          ║
╠══════════════════════════════════════════════════╣
║                                                    ║
║         [Microsoft Logo]                           ║
║                                                    ║
║         Sign in                                    ║
║                                                    ║
║  Your session has expired due to unusual           ║
║  activity on your account.                         ║
║                                                    ║
║  ┌────────────────────────────────────────┐       ║
║  │ Email: ______________________________ │       ║
║  │ Password: ___________________________ │       ║
║  │                                        │       ║
║  │ [  Sign In  ]                          │       ║
║  └────────────────────────────────────────┘       ║
║                                                    ║
║  ☐ Keep me signed in                               ║
║                                                    ║
║  Forgot password?  |  Sign in with a key           ║
║                                                    ║
║  ────────────────────────────────────────          ║
║  No account? Create one!                           ║
║  © 2026 Microsoft                                  ║
╚══════════════════════════════════════════════════╝`,
    },
    question: 'You were redirected to this Microsoft login page after clicking a link in an email about "unusual activity." Investigate the page and identify why this is phishing.',
    acceptedKeywords: [
      ['fake domain', 'microsoftonline-secure.com', 'not microsoft.com', 'wrong domain'],
      ['credential harvesting', 'stealing credentials', 'fake login'],
      ['free SSL', 'lets encrypt', 'certificate', 'not official certificate'],
      ['look-alike', 'lookalike', 'phishing page', 'clone'],
    ],
    correctAnswer: 'Fake domain — real Microsoft uses login.microsoftonline.com or microsoft.com',
    explanation: 'The domain "microsoftonline-secure.com" is NOT a Microsoft domain. The real Microsoft login page uses "login.microsoftonline.com" or "login.live.com". The free Let\'s Encrypt SSL certificate is another clue — while not inherently suspicious, major corporations use enterprise-grade certificates. The page is a credential harvesting clone.',
    realWorldExample: 'Microsoft 365 phishing kits are the most commonly sold tools on the dark web. In 2024, the Evilginx framework was used to create real-time phishing proxies that could steal both passwords AND session tokens, bypassing MFA.',
    preventionTip: 'Always check the exact URL domain for Microsoft logins. Bookmark login.microsoftonline.com. Use a password manager — it won\'t auto-fill credentials on fake domains. Enable multi-factor authentication for all important accounts.',
    evidence: {
      title: 'EVIDENCE #9: Credential Harvesting Page',
      description: 'A sophisticated clone of the Microsoft 365 login page hosted on a look-alike domain.',
      whyItMatters: 'Credential harvesting pages are the most common type of phishing infrastructure, responsible for millions of stolen credentials annually.',
    },
  },

  // Q10: Compromised Friend
  {
    id: 10,
    mission: 3,
    difficulty: 'MEDIUM',
    scoreCorrect: 20,
    scoreWrong: -10,
    title: 'Urgent Message from Friend',
    app: 'chat',
    scenario: {
      chatMessages: [
        { sender: 'Rahul (Best Friend)', message: 'Bro are you online? URGENT 🚨', time: '9:45 PM', isSuspicious: true },
        { sender: 'You', message: 'Yeah what happened?', time: '9:46 PM', isPlayer: true },
        { sender: 'Rahul (Best Friend)', message: 'Bro I\'m stuck in a serious situation. I accidentally got locked out of my Paytm account', time: '9:47 PM', isSuspicious: true },
        { sender: 'Rahul (Best Friend)', message: 'I need ₹3,000 urgently right now. Life or death bro. I\'ll return it tomorrow morning first thing', time: '9:47 PM', isSuspicious: true },
        { sender: 'You', message: 'What happened exactly?', time: '9:48 PM', isPlayer: true },
        { sender: 'Rahul (Best Friend)', message: 'Can\'t explain now, too complicated. Please just send to this UPI: rahul.emergency@ybl', time: '9:49 PM', isSuspicious: true },
        { sender: 'Rahul (Best Friend)', message: 'Don\'t tell anyone about this ok? It\'s embarrassing 😓', time: '9:49 PM', isSuspicious: true },
        { sender: 'You', message: 'That UPI ID doesn\'t look like yours...', time: '9:51 PM', isPlayer: true },
        { sender: 'Rahul (Best Friend)', message: 'It\'s my backup account bro trust me. Please hurry I need it NOW', time: '9:52 PM', isSuspicious: true },
      ],
    },
    question: 'Your best friend is urgently asking for money via a different UPI ID. What type of attack is this?',
    acceptedKeywords: [
      ['compromised account', 'hacked account', 'account takeover'],
      ['impersonation', 'pretending to be friend', 'fake friend'],
      ['different UPI', 'unknown UPI', 'not his UPI', 'backup account'],
      ['urgency', 'emotional manipulation', 'pressure'],
      ['don\'t tell', 'secrecy', 'isolation'],
    ],
    correctAnswer: 'Compromised/hacked friend\'s account used for impersonation & money fraud',
    explanation: 'This is a classic account takeover attack. The attacker has compromised your friend\'s messaging account and is using the trusted relationship to extract money. Key red flags: urgency, different payment account, request for secrecy, refusal to explain details, and emotional manipulation.',
    realWorldExample: 'Account takeover attacks on WhatsApp and Instagram are extremely common. Attackers gain access through SIM swaps or stolen sessions, then message the victim\'s contacts requesting money. The "don\'t tell anyone" tactic prevents the real account owner from being alerted.',
    preventionTip: 'ALWAYS verify money requests through a different channel — call your friend directly (voice/video call). If they can\'t take a call, it\'s likely a scam. Never send money to unknown UPI IDs, even if the request comes from a trusted contact.',
    evidence: {
      title: 'EVIDENCE #10: Account Takeover & Social Engineering',
      description: 'An attacker uses a compromised friend\'s account to exploit trust relationships for financial fraud.',
      whyItMatters: 'Trust-based attacks are the hardest to detect because they exploit genuine relationships.',
    },
  },

  // Q11: Fake Cloud Storage
  {
    id: 11,
    mission: 3,
    difficulty: 'MEDIUM',
    scoreCorrect: 20,
    scoreWrong: -10,
    title: 'Cloud Storage Sharing Notification',
    app: 'mail',
    scenario: {
      email: {
        from: 'Google Drive',
        fromEmail: 'drive-sharing-noreply@google.com.mailnote.cc',
        to: 'student@college.edu.in',
        subject: 'Important: Prof. Sharma shared "End Semester Question Papers 2026" with you',
        date: 'Sep 17, 2026, 10:22 AM',
        body: `Google Drive

Prof. Sharma (sharma.professor@vidyacollege.edu) has shared a folder with you:

📁 End Semester Question Papers 2026
   ├── CS301_Data_Structures_Final.pdf
   ├── CS302_Operating_Systems_Final.pdf
   ├── CS303_DBMS_Final.pdf
   └── CS304_Computer_Networks_Final.pdf

This folder contains 4 items.

[  OPEN FOLDER  ]

You received this notification because someone shared files with you from Google Drive.
If you don't want to receive these emails, you can block this sender.

Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA`,
        attachments: [],
      },
    },
    question: 'You received a Google Drive notification about shared exam papers. Examine the email carefully. What reveals this as phishing?',
    acceptedKeywords: [
      ['fake domain', 'mailnote.cc', 'not google.com', 'spoofed sender'],
      ['fake google', 'impersonating google', 'not real google'],
      ['question papers', 'leaked papers', 'bait', 'social engineering'],
      ['credential harvesting', 'steal login', 'fake login page'],
    ],
    correctAnswer: 'Spoofed sender domain — google.com.mailnote.cc is NOT Google',
    explanation: 'The sender\'s email is "drive-sharing-noreply@google.com.mailnote.cc". While it contains "google.com", the actual domain is "mailnote.cc" — this is a subdomain spoofing technique. The real Google Drive notifications come from "@google.com". The bait of "question papers" is social engineering designed to exploit students\' desire for exam prep materials.',
    realWorldExample: 'Subdomain spoofing is a common technique where attackers register domains like "google.com.fakeDomain.com" to trick users. The "shared document" lure is used in over 30% of phishing campaigns targeting educational institutions.',
    preventionTip: 'Always check the FULL sender domain — look at what comes AFTER the @ symbol and before any slashes. The real domain is the last two parts (e.g., "mailnote.cc" not "google.com"). Be suspicious of unsolicited document shares, especially ones that seem too valuable.',
    evidence: {
      title: 'EVIDENCE #11: Subdomain Spoofing Attack',
      description: 'A phishing email using subdomain spoofing to impersonate Google Drive and lure students with fake exam papers.',
      whyItMatters: 'Subdomain spoofing is a sophisticated technique that fools even technically aware users.',
    },
  },

  // Q12: Fake UPI Refund
  {
    id: 12,
    mission: 3,
    difficulty: 'MEDIUM',
    scoreCorrect: 20,
    scoreWrong: -10,
    title: 'UPI Refund Notification',
    app: 'bank',
    scenario: {
      bankAlert: {
        bankName: 'PayRight Wallet',
        alertType: 'REFUND PROCESSING',
        message: `Dear Customer,

Your refund of ₹2,499 for Order #PR-2026-8847 is ready to be processed!

Due to a technical issue, automatic refund failed. To receive your refund manually, please follow these steps:

1. Click the link below
2. Verify your UPI ID
3. Enter your UPI PIN to authenticate
4. Refund will be credited within 30 seconds

CLAIM REFUND: https://payright-refunds.in/claim/8847

⚠️ Refund will expire in 2 hours. If not claimed, the amount will be forfeited.

PayRight Customer Support
support@payright-wallet.com`,
        amount: '₹2,499',
        accountEnding: '7788',
        actionUrl: 'https://payright-refunds.in/claim/8847',
        timestamp: 'Sep 17, 2026, 3:15 PM',
      },
    },
    question: 'You received a refund notification asking you to enter your UPI PIN to "receive" the refund. Analyze this message.',
    acceptedKeywords: [
      ['UPI PIN', 'PIN not needed for refund', 'no PIN for receiving'],
      ['refund scam', 'fake refund', 'refund phishing'],
      ['fake domain', 'payright-refunds.in', 'not official'],
      ['urgency', 'expires', '2 hours', 'forfeited'],
      ['automatic refund', 'real refunds are automatic', 'no manual process'],
    ],
    correctAnswer: 'UPI PIN is never needed to receive a refund / Refund scam',
    explanation: 'Just like receiving money, you NEVER need to enter your UPI PIN to receive a refund. Entering a UPI PIN always means you\'re AUTHORIZING a payment FROM your account. Real refunds are processed automatically by the payment gateway — there\'s no "manual claim" process. The fake domain and urgency are additional red flags.',
    realWorldExample: 'Fake refund scams on platforms like Flipkart, Amazon, and Paytm are widespread in India. Scammers pose as customer support and send "refund links" that actually initiate collect requests, debiting the victim\'s account.',
    preventionTip: 'Refunds are ALWAYS automatic — you never need to "claim" them manually or enter a PIN. If you\'re expecting a refund, check the status on the original platform\'s app/website. Never click refund links from SMS or email.',
    evidence: {
      title: 'EVIDENCE #12: UPI Refund Fraud',
      description: 'A fake refund notification designed to trick users into authorizing payments while thinking they\'re receiving money.',
      whyItMatters: 'Understanding that UPI PIN = payment authorization is critical for digital payment safety.',
    },
  },

  // Q13: Suspicious Login Approval
  {
    id: 13,
    mission: 4,
    difficulty: 'MEDIUM',
    scoreCorrect: 20,
    scoreWrong: -10,
    title: 'Suspicious Login Attempt Alert',
    app: 'mail',
    scenario: {
      email: {
        from: 'Instagram Security',
        fromEmail: 'security@instagrammail.com',
        replyTo: 'instagram-security-team@outlook.com',
        to: 'student@college.edu.in',
        subject: '⚠️ ALERT: Someone tried to log into your Instagram account',
        date: 'Sep 17, 2026, 6:30 PM',
        body: `Instagram

We detected a login attempt from an unrecognized device:

📍 Location: Kyiv, Ukraine
💻 Device: Unknown Windows PC
🕐 Time: Sep 17, 2026, 6:28 PM IST

If this wasn't you, your account may be compromised!

SECURE YOUR ACCOUNT NOW:
[  Review Login Activity  ]

Click here to review and secure your account immediately. If you don't take action within 1 hour, we cannot guarantee your account's security.

If this was you, you can ignore this email.

The Instagram Security Team
Meta Platforms, Inc.`,
        attachments: [],
      },
    },
    question: 'You got an Instagram security alert about a suspicious login. The sender is security@instagrammail.com but the Reply-To is different. What\'s the attack vector?',
    acceptedKeywords: [
      ['reply-to', 'reply to different', 'reply-to mismatch', 'different reply address'],
      ['outlook.com', 'reply goes to outlook', 'attacker email'],
      ['instagrammail.com', 'fake domain', 'not instagram.com'],
      ['credential harvesting', 'fake security alert', 'phishing alert'],
    ],
    correctAnswer: 'Reply-To trap — replies go to attacker\'s Outlook address, not Instagram',
    explanation: 'The Reply-To header is set to "instagram-security-team@outlook.com" — an attacker-controlled email address. Even if you don\'t click the link but instead reply to the email for help, your response goes directly to the attacker. Additionally, "instagrammail.com" is NOT an official Instagram domain (real: instagram.com). This is a sophisticated dual-vector attack.',
    realWorldExample: 'Reply-To attacks are used in targeted phishing because they\'re harder to detect than fake links. The attacker can then engage in a conversation with the victim, building trust before requesting credentials or payments.',
    preventionTip: 'Always check both the "From" address AND the "Reply-To" address in suspicious emails. They should match and be from the official domain. For account security, go directly to the app or official website — never click links in emails.',
    evidence: {
      title: 'EVIDENCE #13: Reply-To Header Manipulation',
      description: 'A phishing email using Reply-To manipulation to redirect victim responses to an attacker-controlled inbox.',
      whyItMatters: 'Reply-To attacks often bypass security awareness because users focus on the visible sender, not the hidden Reply-To field.',
    },
  },

  // Q14: Fake College Password Reset
  {
    id: 14,
    mission: 4,
    difficulty: 'MEDIUM',
    scoreCorrect: 20,
    scoreWrong: -10,
    title: 'College Portal Password Reset',
    app: 'mail',
    scenario: {
      email: {
        from: 'Vidya College IT Services',
        fromEmail: 'it-services@vidyacollege-portal.com',
        to: 'student@college.edu.in',
        subject: 'Mandatory Password Reset Required - College Portal Access',
        date: 'Sep 18, 2026, 8:00 AM',
        body: `VIDYA COLLEGE OF ENGINEERING
IT Services Department

Dear Student,

As part of our annual security audit, ALL students are required to reset their college portal password by September 19, 2026.

Failure to reset your password will result in:
• Loss of access to the student portal
• Inability to view exam results
• Blocked library services
• Disabled Wi-Fi access

RESET YOUR PASSWORD NOW:
https://vidyacollege-portal.com/password-reset

Current Password: [Enter here]
New Password: [Enter here]
Confirm Password: [Enter here]

This is a mandatory requirement from the IT department.

Best regards,
IT Services Team
Vidya College of Engineering

---
This is an automated message. Please do not reply.`,
        attachments: [],
      },
    },
    question: 'Your college IT department sent a "mandatory password reset" email. The domain is vidyacollege-portal.com. Investigate this.',
    acceptedKeywords: [
      ['fake domain', 'vidyacollege-portal.com', 'not official college domain', 'wrong domain'],
      ['asking current password', 'current password', 'real resets don\'t ask current'],
      ['credential harvesting', 'stealing passwords', 'phishing'],
      ['mandatory reset', 'pressure', 'urgency', 'loss of access'],
    ],
    correctAnswer: 'Fake domain (not the real college domain) / Asks for current password in email',
    explanation: 'The domain "vidyacollege-portal.com" is NOT the official college domain. Legitimate password resets are done through the actual college portal, not via a link in an email. Additionally, real password reset mechanisms NEVER ask for your current password in the email itself — they send you a secure reset link. This is a credential harvesting attack targeting the entire student body.',
    realWorldExample: 'In 2023, a targeted attack against a university in Maharashtra compromised over 500 student accounts using a fake password reset campaign. The stolen credentials were used to access internal systems, exam results, and personal data.',
    preventionTip: 'Verify the domain against the actual college website URL. Legitimate password resets take you to the real portal with a secure token — they never ask for your current password via email. When in doubt, contact IT services directly.',
    evidence: {
      title: 'EVIDENCE #14: Credential Harvesting Campaign',
      description: 'A mass phishing email targeting all students with a fake mandatory password reset to steal college portal credentials.',
      whyItMatters: 'Institutional credential theft can compromise entire organizational systems and databases.',
    },
  },

  // Q15: Fake Internship Document Verification
  {
    id: 15,
    mission: 4,
    difficulty: 'MEDIUM',
    scoreCorrect: 20,
    scoreWrong: -10,
    title: 'Internship Document Verification',
    app: 'mail',
    scenario: {
      email: {
        from: 'TechCorp HR - Verification Team',
        fromEmail: 'verify@techcorp-hr-onboarding.com',
        to: 'student@college.edu.in',
        subject: 'Re: Your Internship Application - Document Verification Required',
        date: 'Sep 18, 2026, 2:00 PM',
        body: `Dear Candidate,

Thank you for your interest in TechCorp's internship program.

Your application has been SHORTLISTED for the final round. Before we can proceed with your offer letter, we need to verify the following documents:

Please upload ALL documents to our secure verification portal:
https://techcorp-hr-onboarding.com/verify-docs

Required Documents:
1. ✅ Latest Resume (Already received)
2. ⏳ College ID Card (front & back scan)
3. ⏳ Aadhaar Card (for background verification)
4. ⏳ PAN Card (for stipend processing)
5. ⏳ Bank Account Details (for salary credit)
   - Bank Name
   - Account Number
   - IFSC Code
   - Account holder name
6. ⏳ Passport-sized photo

Deadline: September 20, 2026

Note: Incomplete submissions will lead to automatic disqualification.

Best regards,
Ankit Verma
Senior Verification Officer
TechCorp Global Pvt. Ltd.`,
        attachments: [],
      },
    },
    question: 'You applied for an internship and received a "document verification" email asking for extensive personal documents and bank details. What\'s suspicious?',
    acceptedKeywords: [
      ['fake domain', 'techcorp-hr-onboarding.com', 'not official domain'],
      ['too many documents', 'excessive data', 'over-collection'],
      ['bank details', 'account number', 'IFSC', 'financial information'],
      ['aadhaar', 'PAN', 'identity theft', 'document harvesting'],
      ['pre-employment', 'before offer letter', 'before joining'],
    ],
    correctAnswer: 'Excessive document collection (bank details, Aadhaar, PAN) on unofficial domain before offer letter',
    explanation: 'Legitimate companies collect banking and identity documents AFTER issuing an offer letter and during the official onboarding process — not before. The domain "techcorp-hr-onboarding.com" is separate from TechCorp\'s official domain. Collecting Aadhaar, PAN, and bank account details together gives the attacker everything needed for identity theft and financial fraud.',
    realWorldExample: 'In 2024, a fake recruitment campaign harvested PAN and Aadhaar details from over 2,000 job seekers. The stolen documents were used to open bank accounts for money laundering and to file fraudulent tax returns.',
    preventionTip: 'Legitimate companies only collect sensitive documents AFTER extending a formal offer letter. Verify the email domain against the company\'s official website. Never upload bank details and identity documents to unknown portals. Contact the company\'s HR through their official website to verify.',
    evidence: {
      title: 'EVIDENCE #15: Document Harvesting Attack',
      description: 'An attacker collecting excessive personal and financial documents under the guise of internship verification.',
      whyItMatters: 'Identity document theft enables long-term fraud including identity theft, financial fraud, and money laundering.',
    },
  },

  // Q16: Fake Account Security Call
  {
    id: 16,
    mission: 5,
    difficulty: 'MEDIUM',
    scoreCorrect: 20,
    scoreWrong: -10,
    title: 'Account Security Verification Call',
    app: 'phone',
    scenario: {
      callLog: {
        callerName: 'Bank Security Department',
        callerNumber: '+91 1800 XXX XXXX',
        duration: '5:18',
        transcript: [
          'Caller: Good evening. This is the Fraud Prevention Department of SafeBank.',
          'Caller: We\'ve detected a suspicious transaction of ₹49,999 from your account ending in 4521.',
          'Caller: The transaction is currently on HOLD. We need your authorization to block it.',
          'Caller: For verification, can you confirm your date of birth and mother\'s maiden name?',
          'You: My DOB is... wait, why do you need my mother\'s maiden name?',
          'Caller: It\'s a standard security question, sir/ma\'am. We need it to verify your identity.',
          'Caller: We also need your card\'s CVV number and expiry date to locate the transaction.',
          'You: I\'m not comfortable sharing that...',
          'Caller: Sir/ma\'am, if you don\'t verify in the next 2 minutes, the transaction will be APPROVED automatically and you will LOSE ₹49,999.',
          'Caller: We are trying to HELP you. Please cooperate for your own safety.',
        ],
      },
    },
    question: 'A "bank fraud department" calls about a suspicious transaction and asks for your CVV and security questions. Analyze this call.',
    acceptedKeywords: [
      ['CVV request', 'asking CVV', 'card details', 'never ask CVV'],
      ['vishing', 'phone phishing', 'voice phishing'],
      ['security questions', 'mother\'s maiden name', 'social engineering'],
      ['bank never calls', 'banks don\'t ask', 'not legitimate'],
      ['urgency', '2 minutes', 'automatic approval', 'pressure'],
    ],
    correctAnswer: 'Banks never ask for CVV, security answers, or card details over phone',
    explanation: 'Banks will NEVER call you to ask for your CVV number, card expiry date, or security question answers. These are authentication credentials that even bank employees don\'t have access to. Real fraud alerts offer to block the card directly without requiring sensitive information. The 2-minute deadline is artificial urgency designed to prevent you from thinking clearly.',
    realWorldExample: 'The RBI regularly issues warnings about vishing attacks. In a notable 2024 case, a retired professor lost ₹1.2 crore after a caller impersonating a bank official convinced him to share his card details to "prevent a suspicious transaction."',
    preventionTip: 'Hang up immediately and call your bank\'s official customer care number (from the back of your card). Real banks can block suspicious transactions without needing your CVV or security questions. Never share card details over the phone.',
    evidence: {
      title: 'EVIDENCE #16: Advanced Vishing Attack',
      description: 'A sophisticated voice phishing attack impersonating a bank\'s fraud prevention department to steal card details.',
      whyItMatters: 'Vishing attacks exploit the immediate, personal nature of phone calls to create pressure and bypass email-based security awareness.',
    },
  },

  // Q17: Suspicious Payment Link
  {
    id: 17,
    mission: 5,
    difficulty: 'MEDIUM',
    scoreCorrect: 20,
    scoreWrong: -10,
    title: 'Suspicious Payment Link',
    app: 'chat',
    scenario: {
      chatMessages: [
        { sender: 'Amit (Senior)', message: 'Hey! Quick favor — I\'m selling my old textbooks for super cheap', time: '7:30 PM' },
        { sender: 'Amit (Senior)', message: 'Data Structures, OS, DBMS, Networks — full set for just ₹500', time: '7:30 PM' },
        { sender: 'You', message: 'That\'s a great deal! How do I pay?', time: '7:35 PM', isPlayer: true },
        { sender: 'Amit (Senior)', message: 'Just click this link to pay: https://gpay-secure-payment.link/pay/amit-books', time: '7:36 PM', isSuspicious: true },
        { sender: 'You', message: 'Can\'t I just UPI you directly?', time: '7:38 PM', isPlayer: true },
        { sender: 'Amit (Senior)', message: 'This link is easier bro, it\'s through GPay only. I set it up for multiple buyers', time: '7:39 PM', isSuspicious: true },
        { sender: 'Amit (Senior)', message: 'Just click and pay, it\'ll auto-fill my details. Many people already bought', time: '7:39 PM', isSuspicious: true },
        { sender: 'You', message: 'The domain looks weird...', time: '7:41 PM', isPlayer: true },
        { sender: 'Amit (Senior)', message: 'It\'s GPay\'s new payment link feature bro, totally safe 👍', time: '7:42 PM', isSuspicious: true },
      ],
    },
    question: 'A senior is selling textbooks and sharing a suspicious payment link instead of direct UPI. What\'s the risk?',
    acceptedKeywords: [
      ['fake payment link', 'suspicious link', 'phishing link', 'not GPay'],
      ['gpay-secure-payment.link', 'fake domain', 'not official GPay'],
      ['credential harvesting', 'steal UPI', 'steal credentials'],
      ['compromised account', 'impersonation', 'hacked senior'],
      ['refuses direct payment', 'insists on link', 'avoids UPI'],
    ],
    correctAnswer: 'Fake payment domain (not official GPay) / Refuses direct UPI transfer',
    explanation: 'The domain "gpay-secure-payment.link" is NOT an official Google Pay domain. Real GPay payment links come from pay.google.com. The insistence on using a link instead of a direct UPI transfer is a major red flag — it\'s likely a phishing page designed to capture your UPI credentials or initiate a fraudulent collect request.',
    realWorldExample: 'Fake payment link scams are rampant in college WhatsApp groups. Attackers either hack existing accounts or create look-alike profiles, then share phishing links disguised as payment platforms. Victims who click and "pay" end up on credential harvesting pages.',
    preventionTip: 'Always use direct UPI transfers through your official banking/payment app. Never click third-party payment links, especially from messaging apps. If someone insists on a link instead of direct transfer, it\'s likely a scam.',
    evidence: {
      title: 'EVIDENCE #17: Payment Link Phishing',
      description: 'A fake payment link impersonating Google Pay to capture credentials or initiate fraudulent transactions.',
      whyItMatters: 'Payment link phishing combines social engineering with technical deception to steal financial credentials.',
    },
  },

  // ================================================================
  // HARD QUESTIONS (18-25) — Correct: +30, Wrong: -13
  // ================================================================

  // Q18: Advanced Domain Investigation
  {
    id: 18,
    mission: 5,
    difficulty: 'HARD',
    scoreCorrect: 30,
    scoreWrong: -13,
    title: 'Advanced Domain Analysis',
    app: 'browser',
    scenario: {
      browserUrl: 'https://www.vidyacоllege.edu.in/student-portal/login',
      browserContent: `
╔══════════════════════════════════════════════════╗
║  🔒 www.vidyacоllege.edu.in                      ║
║  Certificate: DigiCert SHA2 Extended Validation   ║
║  WHOIS: Registered 3 days ago                     ║
║  Registrar: NameCheap                             ║
╠══════════════════════════════════════════════════╣
║                                                    ║
║   VIDYA COLLEGE OF ENGINEERING                     ║
║   Student Portal Login                             ║
║                                                    ║
║  ┌────────────────────────────────────────┐       ║
║  │ Student ID: _________________________ │       ║
║  │ Password: ___________________________ │       ║
║  │                                        │       ║
║  │ [  LOGIN  ]                            │       ║
║  └────────────────────────────────────────┘       ║
║                                                    ║
║  Forgot Password? | Help Desk                      ║
║                                                    ║
║  © 2026 Vidya College of Engineering                ║
║  NAAC Accredited | ISO 9001:2015                   ║
╚══════════════════════════════════════════════════╝

[INVESTIGATOR NOTE: Look very carefully at the URL.
The 'о' in 'college' is a CYRILLIC 'о' (U+043E),
not a Latin 'o' (U+006F). This is a homograph/
IDN homograph attack.]`,
    },
    question: 'You\'re investigating a student portal login page. The URL appears to be the college\'s official domain. WHOIS shows it was registered 3 days ago. What type of attack is this?',
    acceptedKeywords: [
      ['homograph', 'IDN homograph', 'punycode', 'unicode attack'],
      ['cyrillic', 'different character', 'look-alike character'],
      ['domain spoofing', 'fake domain', 'impersonation domain'],
      ['newly registered', 'registered 3 days ago', 'new domain'],
      ['internationalized domain', 'confusable characters'],
    ],
    correctAnswer: 'IDN homograph attack — uses Cyrillic characters that look identical to Latin characters',
    explanation: 'This is an IDN (Internationalized Domain Name) homograph attack. The \'о\' in the URL is actually a Cyrillic character (U+043E) that looks identical to the Latin \'o\'. This makes the fake domain visually indistinguishable from the real one. The WHOIS data showing registration 3 days ago confirms it\'s a freshly created phishing domain.',
    realWorldExample: 'In 2017, a researcher demonstrated that apple.com could be spoofed using Cyrillic characters (xn--80ak6aa92e.com) that rendered as "аррlе.com" in browsers. This led to major browser security updates. However, more targeted homograph attacks against educational institutions continue.',
    preventionTip: 'Check WHOIS data for newly registered domains. Use a password manager — it matches exact domains and won\'t auto-fill on homograph domains. Enable punycode display in your browser. When in doubt, type the URL manually instead of clicking links.',
    evidence: {
      title: 'EVIDENCE #18: IDN Homograph Attack',
      description: 'A sophisticated domain spoofing attack using visually identical Unicode characters to create an indistinguishable fake domain.',
      whyItMatters: 'Homograph attacks are among the most advanced phishing techniques and can fool even security-aware users.',
    },
  },

  // Q19: Malicious OAuth Permission
  {
    id: 19,
    mission: 5,
    difficulty: 'HARD',
    scoreCorrect: 30,
    scoreWrong: -13,
    title: 'Third-Party App Permission Request',
    app: 'browser',
    scenario: {
      browserUrl: 'https://accounts.google.com/o/oauth2/auth?client_id=study-helper-pro&scope=email+profile+gmail.readonly+gmail.send+drive+contacts',
      browserContent: `
╔══════════════════════════════════════════════════╗
║  🔒 accounts.google.com                           ║
╠══════════════════════════════════════════════════╣
║                                                    ║
║  "Study Helper Pro" wants to access               ║
║  your Google Account                               ║
║  student@college.edu.in                            ║
║                                                    ║
║  This will allow Study Helper Pro to:              ║
║                                                    ║
║  ✅ See your email address                          ║
║  ✅ See your personal info                          ║
║  ⚠️ Read your Gmail messages                       ║
║  🔴 Send email on your behalf                     ║
║  🔴 See, edit, create & delete ALL your            ║
║     Google Drive files                              ║
║  🔴 See and download your contacts                 ║
║                                                    ║
║  [  ALLOW  ]          [ Cancel ]                   ║
║                                                    ║
║  Make sure you trust Study Helper Pro              ║
║  You may be sharing sensitive info with this        ║
║  third-party application.                           ║
║                                                    ║
║  See Study Helper Pro's privacy policy              ║
║  See Study Helper Pro's terms of service            ║
╚══════════════════════════════════════════════════╝`,
    },
    question: 'A study app is requesting Google OAuth permissions. The login page is on the REAL accounts.google.com domain. Analyze the permission request.',
    acceptedKeywords: [
      ['excessive permissions', 'over-permission', 'too many permissions'],
      ['OAuth abuse', 'OAuth phishing', 'malicious OAuth', 'consent phishing'],
      ['send email', 'gmail.send', 'send on behalf'],
      ['drive access', 'all files', 'read gmail', 'contacts'],
      ['malicious app', 'data exfiltration', 'access abuse'],
    ],
    correctAnswer: 'Malicious OAuth app — requests excessive permissions (send email, full Drive access, contacts)',
    explanation: 'Even though the OAuth page is on the REAL Google domain, the THIRD-PARTY APP is malicious. "Study Helper Pro" is requesting far more permissions than a study app needs — it wants to send email on your behalf (to phish your contacts), access all your Drive files (data theft), and download your contacts (for targeted attacks). This is called OAuth phishing or consent phishing.',
    realWorldExample: 'In 2022, the "Google Docs" worm exploited OAuth consent to spread to millions of users. The malicious app, once authorized, sent phishing emails to all contacts using the victim\'s real Google account — making the phishing emails appear completely legitimate.',
    preventionTip: 'Always review OAuth permissions carefully before clicking "Allow." A study app should NOT need email sending or Drive access. Revoke suspicious app permissions at myaccount.google.com/permissions. Be especially wary of "Send email on your behalf" permission.',
    evidence: {
      title: 'EVIDENCE #19: OAuth Consent Phishing',
      description: 'A malicious third-party app exploiting OAuth to gain extensive access to a victim\'s Google account.',
      whyItMatters: 'OAuth attacks bypass traditional phishing detection because they use legitimate Google login pages — the attack is in the PERMISSIONS, not the login.',
    },
  },

  // Q20: Reply-To Trap
  {
    id: 20,
    mission: 6,
    difficulty: 'HARD',
    scoreCorrect: 30,
    scoreWrong: -13,
    title: 'Email Reply-To Discrepancy',
    app: 'mail',
    scenario: {
      email: {
        from: 'Dean\'s Office - Vidya College',
        fromEmail: 'dean.office@vidyacollege.edu.in',
        replyTo: 'dean-vidyacollege@protonmail.com',
        to: 'all-students@vidyacollege.edu.in',
        subject: 'IMPORTANT: Changes to Examination Schedule - Immediate Action Required',
        date: 'Sep 19, 2026, 9:00 AM',
        body: `Office of the Dean
Vidya College of Engineering

Dear Students,

Due to unforeseen circumstances, the End Semester Examination schedule has been REVISED. All exams scheduled for next week have been POSTPONED.

The new schedule will be shared with students who confirm their attendance by replying to this email with:

1. Student ID
2. Current semester
3. Subjects registered
4. Contact phone number

Students who do not reply by September 20, 2026, will NOT receive the updated schedule and may miss their exams.

This is an official communication from the Dean's Office.

Regards,
Prof. (Dr.) S. Krishnamurthy
Dean, Academics
Vidya College of Engineering`,
        attachments: [],
      },
    },
    question: 'An email from the Dean\'s Office asks students to reply with personal information. The From address looks official, but the Reply-To is dean-vidyacollege@protonmail.com. Analyze this attack.',
    acceptedKeywords: [
      ['reply-to', 'reply-to mismatch', 'different reply address', 'reply trap'],
      ['protonmail', 'external email', 'not college email'],
      ['data harvesting', 'information collection', 'social engineering'],
      ['authority', 'dean impersonation', 'institutional authority'],
      ['header manipulation', 'email header', 'spoofed from'],
    ],
    correctAnswer: 'Reply-To trap — replies go to an external Protonmail address, not the college domain',
    explanation: 'The "From" address appears to be the official college domain, but the "Reply-To" is set to a Protonmail address. When students reply with their Student ID, semester, subjects, and phone number, the data goes to the attacker. Protonmail is privacy-focused, making it harder to trace the attacker. This is a sophisticated header manipulation attack combined with authority-based social engineering.',
    realWorldExample: 'In 2023, a coordinated Reply-To attack against multiple Indian universities collected student data by impersonating deans and registrars. The harvested data was used for targeted spear-phishing and identity fraud.',
    preventionTip: 'Always check the Reply-To field in emails requesting personal information. Official college communications should always reply to college domains. Verify urgent announcements through the official college website or portal before responding with personal data.',
    evidence: {
      title: 'EVIDENCE #20: Reply-To Header Attack',
      description: 'An email appearing to be from the Dean but routing all replies to an attacker-controlled external email.',
      whyItMatters: 'Reply-To attacks are especially dangerous because they use legitimate-looking From addresses and exploit institutional trust.',
    },
  },

  // Q21: Fake Account Recovery Call
  {
    id: 21,
    mission: 6,
    difficulty: 'HARD',
    scoreCorrect: 30,
    scoreWrong: -13,
    title: 'Account Recovery Verification',
    app: 'phone',
    scenario: {
      callLog: {
        callerName: 'Google Account Recovery',
        callerNumber: '+1 (650) 253-0000',
        duration: '6:45',
        transcript: [
          'Automated: This is Google Account Recovery Service. Your account student@gmail.com has been flagged for suspicious activity.',
          'Automated: Press 1 to speak with a security specialist.',
          '[You press 1]',
          'Caller: Thank you for contacting Google Security. My name is David. For verification, I can see your account is student@gmail.com, is that correct?',
          'You: Yes, that\'s my account.',
          'Caller: We\'ve detected that someone from Nigeria is trying to permanently delete your account and all associated data including Google Photos and Drive.',
          'Caller: To stop this, I need to verify you\'re the real account owner.',
          'Caller: I\'m going to initiate a Google Prompt on your phone. When you see it, please tap "Yes" to verify your identity.',
          '[A real Google prompt appears on your phone saying "Trying to sign in?"]',
          'Caller: Can you see the prompt? Please tap "Yes" to confirm your identity and stop the deletion.',
          'Caller: Hurry, we only have 60 seconds before the deletion process completes.',
        ],
      },
    },
    question: 'You received a call from "Google" and a REAL Google sign-in prompt appeared on your phone. The caller is asking you to tap "Yes." What\'s happening?',
    acceptedKeywords: [
      ['real-time phishing', 'live phishing', 'simultaneous login'],
      ['MFA bypass', '2FA bypass', 'prompt bombing', 'social engineering MFA'],
      ['attacker logging in', 'attacker triggered prompt', 'they triggered it'],
      ['authentication relay', 'session hijacking', 'account takeover'],
      ['don\'t approve', 'decline prompt', 'tap no'],
    ],
    correctAnswer: 'Real-time authentication relay — the attacker is logging into your account and YOU are approving their login',
    explanation: 'This is a real-time authentication relay attack. The attacker is simultaneously trying to log into YOUR Google account from another device. When Google sends the verification prompt to your phone, the attacker calls you and tricks you into tapping "Yes" — effectively approving THEIR login. The prompt is real because the attacker genuinely triggered it. This is how attackers bypass 2FA/MFA.',
    realWorldExample: 'This attack method was used by the Lapsus$ group to breach major companies including Microsoft and Uber in 2022. They used social engineering combined with MFA prompt bombing to gain access to corporate accounts.',
    preventionTip: 'NEVER approve a sign-in prompt you didn\'t personally initiate. If you receive an unexpected sign-in prompt, tap "No" immediately and change your password. Google will never call you and ask you to approve a prompt — if someone calls claiming to be Google, hang up.',
    evidence: {
      title: 'EVIDENCE #21: MFA Bypass via Social Engineering',
      description: 'An attacker using a phone call to trick the victim into approving a real authentication prompt for the attacker\'s login session.',
      whyItMatters: 'MFA bypass through social engineering represents the cutting edge of phishing attacks, demonstrating that even advanced security measures can be circumvented.',
    },
  },

  // Q22: Malicious Document/Macro
  {
    id: 22,
    mission: 6,
    difficulty: 'HARD',
    scoreCorrect: 30,
    scoreWrong: -13,
    title: 'Research Paper with Macros',
    app: 'mail',
    scenario: {
      email: {
        from: 'Prof. Rajesh Kumar',
        fromEmail: 'rajesh.kumar@ieee-research.org',
        to: 'student@college.edu.in',
        subject: 'Re: Your IEEE Paper Submission - Reviewer Comments',
        date: 'Sep 19, 2026, 4:30 PM',
        body: `Dear Student,

Thank you for submitting your paper to IEEE International Conference on Cybersecurity 2026.

Your paper "Machine Learning Approaches for Phishing Detection" has received positive reviews! However, the reviewers have left detailed comments that you need to address before the acceptance deadline.

Please find the reviewer comments in the attached document. The document contains interactive forms where you can directly respond to each comment.

IMPORTANT: You must enable macros/active content to use the interactive response forms. This is required by our review management system.

Please submit your revised paper by September 25, 2026.

Best regards,
Prof. Rajesh Kumar
Program Chair, IEEE ICCS 2026
IEEE Senior Member

---
This email and attachments are confidential. If you are not the intended recipient, please delete this email.`,
        attachments: ['IEEE_Reviewer_Comments_Form.xlsm'],
        hasWarning: true,
      },
    },
    question: 'You submitted a research paper and received "reviewer comments" in a .xlsm file (macro-enabled Excel) from an IEEE email. You\'re asked to enable macros. What\'s the threat?',
    acceptedKeywords: [
      ['malicious macro', 'macro malware', 'macro enabled', 'VBA malware'],
      ['xlsm', 'macro spreadsheet', 'enable content trap'],
      ['fake IEEE', 'impersonation', 'not real IEEE domain'],
      ['malware delivery', 'payload', 'code execution'],
      ['spear phishing', 'targeted attack', 'context-aware phishing'],
    ],
    correctAnswer: 'Malicious macro in .xlsm file — enables arbitrary code execution when macros are enabled',
    explanation: 'The .xlsm file contains malicious VBA macros that execute when the user "enables content." This is a classic malware delivery mechanism. The attack is especially effective because it\'s a spear-phishing attack — it references your actual paper submission, making it highly convincing. The domain "ieee-research.org" is NOT the official IEEE domain (ieee.org).',
    realWorldExample: 'The APT group Lazarus used macro-enabled documents targeting researchers and academics. In 2023, a campaign specifically targeted cybersecurity researchers with fake conference reviewer documents containing malware that established persistent backdoors.',
    preventionTip: 'Never enable macros in documents from external sources. Legitimate review systems use web portals (like EasyChair or CMT), not macro-enabled documents. Verify the sender\'s domain against the official organization. Use Protected View in Microsoft Office and never click "Enable Content" for unexpected documents.',
    evidence: {
      title: 'EVIDENCE #22: Spear Phishing with Malicious Macros',
      description: 'A targeted attack using a fake research paper review to deliver malware through macro-enabled Excel documents.',
      whyItMatters: 'Spear phishing with context-relevant content is far more effective than generic phishing because it leverages specific knowledge about the target.',
    },
  },

  // Q23: Fake IT Portal / Session Hijacking
  {
    id: 23,
    mission: 6,
    difficulty: 'HARD',
    scoreCorrect: 30,
    scoreWrong: -13,
    title: 'IT Portal Session Alert',
    app: 'browser',
    scenario: {
      browserUrl: 'https://vidyacollege-it.help/portal/session-check',
      browserContent: `
╔══════════════════════════════════════════════════╗
║  🔒 vidyacollege-it.help                          ║
╠══════════════════════════════════════════════════╣
║                                                    ║
║   VIDYA COLLEGE IT SECURITY CENTER                 ║
║   Active Session Monitor                           ║
║                                                    ║
║   ⚠️ WARNING: Multiple active sessions detected     ║
║                                                    ║
║   Current Active Sessions:                         ║
║   ┌──────────────────────────────────────┐        ║
║   │ 🟢 Chrome - Windows 11                │        ║
║   │    Pune, Maharashtra                   │        ║
║   │    Active now                           │        ║
║   │                                          │        ║
║   │ 🔴 Firefox - Linux                     │        ║
║   │    Moscow, Russia                      │        ║
║   │    Last active: 2 min ago              │        ║
║   │    [TERMINATE SESSION]                 │        ║
║   │                                          │        ║
║   │ 🔴 Chrome - Android                   │        ║
║   │    Lagos, Nigeria                      │        ║
║   │    Last active: 5 min ago              │        ║
║   │    [TERMINATE SESSION]                 │        ║
║   └──────────────────────────────────────┘        ║
║                                                    ║
║   To terminate unauthorized sessions, verify:      ║
║   ┌──────────────────────────────────────┐        ║
║   │ Username: ___________________________ │        ║
║   │ Password: ___________________________ │        ║
║   │ Session Token: [AUTO-FILLED BY SYSTEM]│        ║
║   │                                          │        ║
║   │ [  TERMINATE ALL FOREIGN SESSIONS  ]  │        ║
║   └──────────────────────────────────────┘        ║
║                                                    ║
║   🔒 Secured by Vidya College IT Department        ║
╚══════════════════════════════════════════════════╝`,
    },
    question: 'A college IT security page shows "unauthorized sessions" from Russia and Nigeria and asks for credentials to terminate them. The domain is vidyacollege-it.help. Analyze this.',
    acceptedKeywords: [
      ['fake domain', 'vidyacollege-it.help', '.help TLD', 'not official'],
      ['credential harvesting', 'stealing credentials', 'fake login'],
      ['session hijacking', 'session token theft', 'token stealing'],
      ['scare tactic', 'fear', 'fake sessions', 'fake alerts'],
      ['social engineering', 'urgency', 'unauthorized access fear'],
    ],
    correctAnswer: 'Fake IT portal on unofficial domain using scare tactics to harvest credentials and session tokens',
    explanation: 'The domain "vidyacollege-it.help" is NOT the official college domain — ".help" is a generic TLD anyone can register. The "unauthorized sessions from Russia and Nigeria" are fake scare tactics designed to create panic. The real goal is to capture your username, password, AND session token — giving the attacker everything needed for complete account takeover. Legitimate session management is done through the official college portal.',
    realWorldExample: 'Fake "session monitor" phishing pages have been used against university students and corporate employees. By creating fear of unauthorized access, attackers successfully convince victims to enter credentials on fake portals, ironically creating the very unauthorized access they were trying to prevent.',
    preventionTip: 'Always check the domain carefully — official IT services use the college\'s primary domain. Session management is done through official portals, not random domains. If you suspect unauthorized access, contact IT directly, don\'t click links from emails or messages.',
    evidence: {
      title: 'EVIDENCE #23: Fear-Based Credential Harvesting',
      description: 'A fake IT security portal using fear of unauthorized access to trick users into surrendering credentials and session tokens.',
      whyItMatters: 'Fear-based social engineering is highly effective because it creates an emotional response that overrides rational thinking.',
    },
  },

  // Q24: Business Email Compromise
  {
    id: 24,
    mission: 7,
    difficulty: 'HARD',
    scoreCorrect: 30,
    scoreWrong: -13,
    title: 'Payment Account Change Request',
    app: 'mail',
    scenario: {
      email: {
        from: 'Finance Department - Vidya College',
        fromEmail: 'finance@vidyacollege.edu.in',
        replyTo: 'finance.dept.vidya@gmail.com',
        to: 'accounts@vendorcompany.com',
        subject: 'Urgent: Updated Bank Account Details for Pending Payment',
        date: 'Sep 20, 2026, 11:00 AM',
        body: `Dear Vendor Partner,

This is to inform you that our organization has recently changed its banking partner. Our previous bank account has been closed.

Please update your records with our new bank account details for all future and pending payments:

New Bank Details:
Bank: Federal Bank
Account Name: Vidya Educational Trust
Account Number: 1234 5678 9012 3456
IFSC: FDRL0001234
Branch: Koramangala, Bangalore

Please process the pending invoice #VDY-2026-0089 (₹12,45,000) to this new account IMMEDIATELY as we have an audit next week.

All future payments should also be directed to this account.

If you have any questions, please contact me directly at this email.

Regards,
Rajesh Menon
Chief Financial Officer
Vidya College of Engineering
Phone: +91 98765 XXXXX

CONFIDENTIAL: This email is intended only for the recipient. Please do not forward.`,
        attachments: [],
      },
    },
    question: 'You intercepted this email from the college Finance Department to a vendor requesting an urgent bank account change. The Reply-To goes to Gmail. What type of attack is this?',
    acceptedKeywords: [
      ['BEC', 'business email compromise', 'CEO fraud', 'CFO fraud'],
      ['payment diversion', 'payment redirect', 'account change fraud'],
      ['reply-to gmail', 'reply-to mismatch', 'external reply'],
      ['invoice fraud', 'vendor fraud', 'payment fraud'],
      ['wire fraud', 'financial diversion', 'fund diversion'],
    ],
    correctAnswer: 'Business Email Compromise (BEC) — payment diversion attack with Reply-To manipulation',
    explanation: 'This is a Business Email Compromise (BEC) attack — one of the most financially devastating types of cybercrime. The attacker impersonates the CFO and requests the vendor to redirect a ₹12.45 lakh payment to a fraudulent bank account. The Reply-To goes to a Gmail address, ensuring the vendor\'s responses go to the attacker, not the real finance department. The "CONFIDENTIAL" footer discourages the vendor from verifying with others.',
    realWorldExample: 'According to the FBI\'s IC3, BEC attacks caused over $2.7 billion in losses globally in 2022 alone. In India, several educational institutions have lost crores to similar payment diversion attacks where attackers intercepted vendor communications and redirected payments.',
    preventionTip: 'ALWAYS verify bank account change requests through a separate communication channel (phone call to a known number). Implement a multi-person verification process for payment changes. Check Reply-To headers. Never rush financial changes based on email urgency.',
    evidence: {
      title: 'EVIDENCE #24: Business Email Compromise',
      description: 'A sophisticated financial attack impersonating an institution\'s CFO to divert vendor payments to a fraudulent account.',
      whyItMatters: 'BEC is the single most costly type of cybercrime, causing billions in losses annually worldwide.',
    },
  },

  // Q25: Final Coordinated Phishing Attack
  {
    id: 25,
    mission: 7,
    difficulty: 'HARD',
    scoreCorrect: 30,
    scoreWrong: -13,
    title: 'The Final Attack — Coordinated Campaign',
    app: 'mail',
    scenario: {
      email: {
        from: 'Dr. S. Krishnamurthy, Dean Academics',
        fromEmail: 'dean.academics@vidyacollege.edu.in',
        replyTo: 'vidya-academics@protonmail.com',
        to: 'all-students@vidyacollege.edu.in',
        subject: '🚨 CRITICAL: Immediate Action Required — Student Data Breach Notification',
        date: 'Sep 20, 2026, 2:00 PM',
        body: `URGENT — OFFICIAL NOTIFICATION
Vidya College of Engineering
Office of the Dean, Academics

Dear Students,

We regret to inform you that our student database has been COMPROMISED. An unauthorized party has gained access to student records including:

• Personal information (names, addresses, phone numbers)
• Academic records and grades
• Fee payment information
• Aadhaar and PAN details on file

IMMEDIATE ACTION REQUIRED:

To protect your data, ALL students must:

1. Click the link below to verify and secure your student account:
   https://vidyacollege-emergency-response.in/verify

2. Log in with your student credentials

3. Verify your Aadhaar and PAN details are accurate

4. Set up emergency 2FA using the provided tool

5. Download and install the "Campus Shield" security app:
   https://vidyacollege-emergency-response.in/campus-shield.apk

Students who do not complete verification by 6 PM TODAY will have their accounts SUSPENDED for security purposes.

This is an official communication. All faculty have been informed.

For concerns, reply to this email directly.

Prof. (Dr.) S. Krishnamurthy
Dean, Academics
Vidya College of Engineering`,
        attachments: ['Data_Breach_Notice_Official.pdf', 'Campus_Shield_Setup_Guide.docm'],
        hasWarning: true,
      },
    },
    question: 'A mass email claims the college has suffered a data breach and asks ALL students to verify their Aadhaar/PAN on an external site and install an APK file. This is the FINAL ATTACK. Identify all attack vectors being used simultaneously.',
    acceptedKeywords: [
      ['coordinated attack', 'multi-vector', 'combined attack', 'multiple vectors'],
      ['credential harvesting', 'fake portal', 'phishing page'],
      ['malware', 'APK', 'malicious app', 'trojan'],
      ['reply-to trap', 'protonmail', 'external reply'],
      ['authority impersonation', 'dean impersonation', 'institutional authority'],
      ['data harvesting', 'aadhaar', 'PAN', 'identity theft'],
      ['macro', 'docm', 'malicious document'],
      ['urgency', 'panic', 'data breach fear', '6 PM deadline'],
      ['social engineering', 'fear-based', 'scare tactic'],
    ],
    correctAnswer: 'Coordinated multi-vector attack: credential harvesting + malware APK + Reply-To trap + malicious macro + authority impersonation + identity theft',
    explanation: 'This is the mastermind\'s FINAL coordinated attack combining EVERY technique you\'ve investigated:\n\n1. AUTHORITY IMPERSONATION — Impersonating the Dean to maximize trust\n2. CREDENTIAL HARVESTING — Fake portal to steal student login credentials\n3. IDENTITY THEFT — Collecting Aadhaar and PAN for identity fraud\n4. MALWARE DISTRIBUTION — APK file installs malicious app on phones\n5. REPLY-TO TRAP — Replies go to attacker\'s Protonmail\n6. MALICIOUS MACROS — .docm attachment can execute malicious code\n7. FEAR-BASED URGENCY — "Data breach" creates panic, "6 PM deadline" prevents rational thinking\n8. SCALE — Sent to ALL students for maximum impact\n\nThis attack combines social engineering, credential theft, malware delivery, and identity fraud into a single devastating campaign.',
    realWorldExample: 'Coordinated multi-vector attacks against educational institutions have increased by 300% since 2020. In one notable case, attackers compromised an entire university by combining email phishing, fake portals, and malware — affecting over 50,000 students and faculty.',
    preventionTip: 'NEVER act on breach notifications through email links — go directly to the official college website. Never install APK files from email links. Verify emergency communications through multiple official channels (website, official app, notice boards). Report suspicious mass emails to IT security immediately.',
    evidence: {
      title: 'EVIDENCE #25: FINAL — Coordinated Multi-Vector Attack',
      description: 'The mastermind\'s endgame: a devastating coordinated phishing campaign combining every attack technique to compromise the entire student body simultaneously.',
      whyItMatters: 'This represents the culmination of all the investigation skills you\'ve developed. Real-world attacks increasingly combine multiple vectors for maximum impact.',
    },
  },
];

// ============================================================
// KEYWORD-BASED ANSWER EVALUATION
// ============================================================

export function evaluateAnswer(questionId: number, userAnswer: string): { correct: boolean; score: number } {
  const question = QUESTIONS.find(q => q.id === questionId);
  if (!question) return { correct: false, score: 0 };

  const normalizedAnswer = userAnswer.toLowerCase().trim();
  
  // Check if the answer contains any relevant keywords
  let matched = false;
  for (const keywordGroup of question.acceptedKeywords) {
    for (const keyword of keywordGroup) {
      if (normalizedAnswer.includes(keyword.toLowerCase())) {
        matched = true;
        break;
      }
    }
    if (matched) break;
  }

  // Additional fuzzy matching for common variations
  if (!matched) {
    const fuzzyMatches: Record<string, string[]> = {
      'phishing': ['phish', 'phising', 'fishing'],
      'malware': ['malicious software', 'virus', 'trojan'],
      'social engineering': ['social eng', 'manipulation', 'manipulating'],
      'credential': ['cred', 'login details', 'login info', 'username password'],
      'suspicious': ['suspect', 'fishy', 'shady', 'sketchy'],
      'fake': ['fraudulent', 'bogus', 'counterfeit', 'forged'],
      'scam': ['fraud', 'con', 'swindle'],
      'domain': ['url', 'website', 'link', 'address'],
    };

    for (const [, variations] of Object.entries(fuzzyMatches)) {
      for (const variation of variations) {
        if (normalizedAnswer.includes(variation)) {
          // Check if any keyword group contains the base term
          for (const keywordGroup of question.acceptedKeywords) {
            for (const keyword of keywordGroup) {
              if (keyword.toLowerCase().includes(variation) || variation.includes(keyword.toLowerCase())) {
                matched = true;
                break;
              }
            }
            if (matched) break;
          }
        }
        if (matched) break;
      }
      if (matched) break;
    }
  }

  return {
    correct: matched,
    score: matched ? question.scoreCorrect : question.scoreWrong,
  };
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getQuestionsByMission(missionId: number): Question[] {
  return QUESTIONS.filter(q => q.mission === missionId);
}

export function getQuestion(id: number): Question | undefined {
  return QUESTIONS.find(q => q.id === id);
}

export function getMission(id: number): Mission | undefined {
  return MISSIONS.find(m => m.id === id);
}

export function getMissionForQuestion(questionId: number): Mission | undefined {
  return MISSIONS.find(m => questionId >= m.questionRange[0] && questionId <= m.questionRange[1]);
}
