
import React, { useState, useEffect, useCallback } from 'react';
// Fix: Import RawLesson type to correctly type initial lesson data that lacks IDs.
import type { Quiz, RawQuiz, Question, Option, Lesson, RawLesson } from './types';
import QuizEditor from './components/QuizEditor';
import LessonEditor from './components/LessonEditor';

const initialRawData: RawQuiz[] = [
  {
    "title": "Bitcoin Basics Quiz",
    "courseId": "",
    "requiredCorrectAnswers": 7,
    "questions": `{"{\\\"type\\\": \\\"radio\\\", \\\"title\\\": \\\"What makes Bitcoin fundamentally different from traditional money?\\\", \\\"options\\\": [{\\\"title\\\": \\\"It''s accepted only in El Salvador\\\", \\\"correctly\\\": false}, {\\"title\\": \\\"It has a fixed supply of 21 million coins\\\", \\\"correctly\\\": true}, {\\"title\\": \\\"It is backed by the IMF\\\", \\\"correctly\\\": false}, {\\"title\\": \\\"It guarantees stable prices\\\", \\\"correctly\\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\\"Why is Bitcoin considered borderless?\\\", \\\"options\\\": [{\\"title\\": \\\"It is tied to the U.S. dollar\\\", \\\"correctly\\\": false}, {\\"title\\": \\\"It needs passport verification\\\", \\\"correctly\\\": false}, {\\"title\\": \\\"It works the same anywhere in the world\\\", \\\"correctly\\\": true}, {\\"title\\": \\\"It''s banned globally\\\", \\\"correctly\\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\\"What is Bitcoin mining?\\\", \\\"options\\\": [{\\"title\\": \\"Creating new laws\\", \\"correctly\\": false}, {\\"title\\": \\"Solving puzzles to validate transactions and earn BTC\\", \\"correctly\\": true}, {\\"title\\": \\"Digging through code manually\\", \\"correctly\\": false}, {\\"title\\": \\"Sending Bitcoin to friends\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What machine is typically used to mine Bitcoin?\\\", \\\"options\\": [{\\"title\\": \\"Raspberry Pi\\", \\"correctly\\": false}, {\\"title\\": \\"ASIC\\", \\"correctly\\": true}, {\\"title\\": \\"USB stick\\", \\"correctly\\": false}, {\\"title\\": \\"Blockchain printer\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What does a halving event do?\\\", \\\"options\\\": [{\\"title\\": \\"Halves your wallet balance\\", \\"correctly\\": false}, {\\"title\\": \\"Reduces the block reward\\", \\"correctly\\": true}, {\\"title\\": \\"Increases Bitcoin supply\\", \\"correctly\\": false}, {\\"title\\": \\"Doubles transaction speed\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What happens after you send Bitcoin?\\\", \\\"options\\\": [{\\"title\\": \\"A bank confirms the payment\\", \\"correctly\\": false}, {\\"title\\": \\"The network validates and adds it to the blockchain\\", \\"correctly\\": true}, {\\"title\\": \\"It must be reviewed by miners\\", \\"correctly\\": false}, {\\"title\\": \\"It goes to your email\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What''s a key feature of Bitcoin transactions?\\\", \\\"options\\\": [{\\"title\\": \\"Reversible anytime\\", \\"correctly\\": false}, {\\"title\\": \\"Peer-to-peer and final\\", \\"correctly\\": true}, {\\"title\\": \\"Requires notarization\\", \\"correctly\\": false}, {\\"title\\": \\"Takes weeks to confirm\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What is \\\\\\"DYOR\\\\\\"?\\\", \\\"options\\\": [{\\"title\\": \\"Do Your Own Research\\", \\"correctly\\": true}, {\\"title\\": \\"Don''t Yield On Risk\\", \\"correctly\\": false}, {\\"title\\": \\"Digital Your Own Resources\\", \\"correctly\\": false}, {\\"title\\": \\"Deposit Your Online Receipts\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What should you never share?\\\", \\\"options\\\": [{\\"title\\": \\"Wallet address\\", \\"correctly\\": false}, {\\"title\\": \\"Email ID\\", \\"correctly\\": false}, {\\"title\\": \\"Private keys or seed phrase\\", \\"correctly\\": true}, {\\"title\\": \\"Transaction fees\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What should you do if unsure about your country’s crypto laws?\\\", \\\"options\\\": [{\\"title\\": \\"Post on Twitter\\", \\"correctly\\": false}, {\\"title\\": \\"Check government websites and legal blogs\\", \\"correctly\\": true}, {\\"title\\": \\"Ignore them\\", \\"correctly\\": false}, {\\"title\\": \\"Buy anyway\\", \\"correctly\\": false}]}\"}`,
    "durationInMinutes": 10
  }
];
// Fix: Use the new RawLesson[] type for initial data to match its shape (no IDs).
const initialRawLessonsData: RawLesson[] = [
  {
    "title": "Lesson 5",
    "metaTitle": "Crypto Scams | Cryptocurrency Risks | GoMining Academy",
    "metaDescription": "Learn how to protect yourself from crypto scams and risky situations. Our expert tips will help you navigate safely in a world full of potential threats.",
    "slug": "how-to-avoid-scams-and-protect-yourself-against-risks",
    "durationInMinutes": 6,
    "segments": [
        { "html": "<p>In the previous lesson, we discussed how Bitcoin has real-world value — not just as a concept, but as a practical tool for saving, sending, and protecting your wealth in uncertain times. </p><p>We<strong> </strong>explored<strong> </strong>how to get Bitcoin, learned what kind of wallets exist and how to choose your first wallet, and how transactions work.</p><p>Now it’s time to rethink safety and see what it really means in the new financial reality.</p><p>Bitcoin was designed to put you in full control of your money. It doesn’t rely on banks, governments, or third parties. That’s what makes it powerful — especially in countries facing inflation, currency controls, or political instability.</p><h3 id=\"but-this-freedom-comes-with-a-trade-you-are-now-responsible-for-your-own-security\"><strong>But this freedom comes with a trade: you are now responsible for your own security.</strong></h3><p></p><p>That means:</p><ul><li><em>There’s no customer support if you send funds to the wrong address.</em></li><li><em>There’s no password reset if you lose your seed phrase.</em></li><li><em>And there are no fraud reversals like you’d get with a credit card.</em></li></ul><p>In Bitcoin, you become your own bank — and that means <strong>your safety depends on your habits</strong>, not a middleman. You are the helpline.</p><p>In a world where anyone can create a fake token, scam website, or phishing link in seconds, understanding how to identify and manage risk is not optional — it’s essential.</p><p>Fortunately, the most dangerous mistakes are also the most preventable.</p><p><strong>By the end of this lesson, you’ll be able to:</strong></p><ul><li>Identify the major risks and threats when using Bitcoin.</li><li>Understand foundational safety principles: DYOR, Verify Don’t Trust, and key protection.</li><li>Apply basic strategies to secure your Bitcoin and make informed decisions.</li></ul>", "type": "video", "videoUrl": "https://www.youtube.com/watch?v=-T40gizBrOs" },
        { "html": "<p>In the previous lesson, we discussed how Bitcoin has real-world value — not just as a concept, but as a practical tool for saving, sending, and protecting your wealth in uncertain times. </p><p>We<strong> </strong>explored<strong> </strong>how to get Bitcoin, learned what kind of wallets exist and how to choose your first wallet, and how transactions work.</p><p>Now it’s time to rethink safety and see what it really means in the new financial reality.</p><p>Bitcoin was designed to put you in full control of your money. It doesn’t rely on banks, governments, or third parties. That’s what makes it powerful — especially in countries facing inflation, currency controls, or political instability.</p><h3 id=\"but-this-freedom-comes-with-a-trade-you-are-now-responsible-for-your-own-security\"><strong>But this freedom comes with a trade: you are now responsible for your own security.</strong></h3><p></p><p>That means:</p><ul><li><em>There’s no customer support if you send funds to the wrong address.</em></li><li><em>There’s no password reset if you lose your seed phrase.</em></li><li><em>And there are no fraud reversals like you’d get with a credit card.</em></li></ul><p>In Bitcoin, you become your own bank — and that means <strong>your safety depends on your habits</strong>, not a middleman. You are the helpline.</p><p>In a world where anyone can create a fake token, scam website, or phishing link in seconds, understanding how to identify and manage risk is not optional — it’s essential.</p><p>Fortunately, the most dangerous mistakes are also the most preventable.</p><p><strong>By the end of this lesson, you’ll be able to:</strong></p><ul><li>Identify the major risks and threats when using Bitcoin.</li><li>Understand foundational safety principles: DYOR, Verify Don’t Trust, and key protection.</li><li>Apply basic strategies to secure your Bitcoin and make informed decisions.</li></ul>", "type": "audio", "audioUrl": "https://storage.googleapis.com/edge-academy.cdn.gomining.com/lesson5.mp3" },
        { "html": "<p>In the previous lesson, we discussed how Bitcoin has real-world value — not just as a concept, but as a practical tool for saving, sending, and protecting your wealth in uncertain times. </p><p>We<strong> </strong>explored<strong> </strong>how to get Bitcoin, learned what kind of wallets exist and how to choose your first wallet, and how transactions work.</p><p>Now it’s time to rethink safety and see what it really means in the new financial reality.</p><p>Bitcoin was designed to put you in full control of your money. It doesn’t rely on banks, governments, or third parties. That’s what makes it powerful — especially in countries facing inflation, currency controls, or political instability.</p><h3 id=\"but-this-freedom-comes-with-a-trade-you-are-now-responsible-for-your-own-security\"><strong>But this freedom comes with a trade: you are now responsible for your own security.</strong></h3><p></p><p>That means:</p><ul><li><em>There’s no customer support if you send funds to the wrong address.</em></li><li><em>There’s no password reset if you lose your seed phrase.</em></li><li><em>And there are no fraud reversals like you’d get with a credit card.</em></li></ul><p>In Bitcoin, you become your own bank — and that means <strong>your safety depends on your habits</strong>, not a middleman. You are the helpline.</p><p>In a world where anyone can create a fake token, scam website, or phishing link in seconds, understanding how to identify and manage risk is not optional — it’s essential.</p><p>Fortunately, the most dangerous mistakes are also the most preventable.</p><p><strong>By the end of this lesson, you’ll be able to:</strong></p><ul><li>Identify the major risks and threats when using Bitcoin.</li><li>Understand foundational safety principles: DYOR, Verify Don’t Trust, and key protection.</li><li>Apply basic strategies to secure your Bitcoin and make informed decisions.</li></ul><p>Let’s first have a look at the big picture.</p><p>To understand what Bitcoin changed forever, it helps to contrast Bitcoin’s approach to safety with the traditional financial world most of us grew up in. </p><h2 id=\"bitcoin-flips-that-model-completely\"><strong>Bitcoin flips that model completely.</strong></h2><p></p><p>Traditional finance may feel safer because it's familiar — but it’s built on centralized control, hidden fees, and inflation. Bitcoin gives you full ownership of your money, transparent fees, and a monetary system built to resist inflation, but it also exists in a space where scams are common and personal security is essential.</p><p></p><figure class=\"kg-card kg-image-card\"><img src=\"https://gomining.ghost.io/content/images/2025/07/Image-5-2.png\" class=\"kg-image\" alt=\"\" loading=\"lazy\" width=\"1120\" height=\"630\" srcset=\"https://gomining.ghost.io/content/images/size/w600/2025/07/Image-5-2.png 600w, https://gomining.ghost.io/content/images/size/w1000/2025/07/Image-5-2.png 1000w, https://gomining.ghost.io/content/images/2025/07/Image-5-2.png 1120w\" sizes=\"(min-width: 720px) 720px\"></figure><h2 id=\"common-risks-and-scams-in-the-bitcoin-ecosystem\"><strong>Common Risks and Scams in the Bitcoin Ecosystem</strong></h2><p><br>Let’s walk through the most common risks — followed by some suggestions on how to defend yourself:</p><h3 id=\"1scams-and-phishing\"><strong>1.Scams and Phishing</strong></h3><p><br><strong><em>Most common examples: </em></strong></p><p>Fake giveaways, impersonators, fake wallet apps, etc.&nbsp;</p><p><em><strong>Defense:</strong>&nbsp;</em></p><ul><ul><li>Never share your private keys.&nbsp;</li><li>Double-check websites and sources.</li><li>Avoid clicking suspicious links or trusting messages from strangers. Scammers often mimic real services (and even impersonate support team when you raise an order dispute on different DEX/CEX platforms)</li></ul></ul><p><strong><em>Real-world example: </em></strong></p><p>In 2020 and 2021, a wave of <strong>“Bitcoin giveaway” scams</strong> flooded Twitter. <strong>Hackers or bots impersonated major public figures </strong>— including Elon Musk, Vitalik Buterin, and major crypto companies — promising to “double your Bitcoin” if you sent a small amount to a wallet address.</p><p>The scam posts looked like this:</p><p><em>“Feeling generous! I’m giving back to the community. Send me 0.1 BTC and I’ll send back 0.2 BTC. Only for the next 30 minutes! BTC address: [wallet address]”</em></p><p>These tweets often appeared under real posts by the actual celebrities and even used verified-looking accounts. In one high-profile hack, the official Twitter accounts of Elon Musk, Bill Gates, Apple, and others were compromised in a coordinated attack. The scammers made off with over $100,000 in Bitcoin in just a few hours.</p><p><strong>If someone asks you to send Bitcoin with a promise to send more back — it’s a scam. Always.</strong></p><p>Double-check official accounts. Don’t trust screenshots, comments, or urgency tricks. Never share your keys. Never send Bitcoin to strangers.</p><h3 id=\"2-key-or-wallet-loss\"><strong>2. Key or Wallet Loss</strong></h3><p></p><p>If you lose access to your private keys, you lose your Bitcoin — permanently. Back them up securely.</p><p>It's estimated that <strong>20% of all Bitcoin in existence is lost</strong>, primarily due to forgotten passwords, lost seed phrases, or discarded hardware wallets.</p><figure class=\"kg-card kg-image-card\"><img src=\"https://gomining.ghost.io/content/images/2025/07/Image-2-3.png\" class=\"kg-image\" alt=\"\" loading=\"lazy\" width=\"1120\" height=\"630\" srcset=\"https://gomining.ghost.io/content/images/size/w600/2025/07/Image-2-3.png 600w, https://gomining.ghost.io/content/images/size/w1000/2025/07/Image-2-3.png 1000w, https://gomining.ghost.io/content/images/2025/07/Image-2-3.png 1120w\" sizes=\"(min-width: 720px) 720px\"></figure><p><strong><em>Defense:</em></strong> Use hardware wallets. Back up your seed phrase securely offline. And we will highlight that again - securely.&nbsp;</p><h3 id=\"3-volatility\"><strong>3. Volatility</strong></h3><p><br>Most common mistake: <strong>Investing money you can’t afford to lose.</strong> </p><p>Bitcoin is volatile. It can drop 20% in a week. Don’t put in rent money, emergency funds, or everything you own.</p><p><strong>Bitcoin price can swing 10–20% in a day.</strong></p><p>In April 2021, Bitcoin reached a new all-time high of over $64,000. The market was booming, fueled by institutional interest, Elon Musk’s tweets, and growing retail adoption.</p><p>But just two months later — by June 2021 — Bitcoin’s price had plummeted to under $30,000.</p><p>That’s a drop of more than 50% in less than 60 days.</p><p><em><strong>Defense:</strong> </em></p><p>Don’t invest more than you can afford to lose. Think long-term.</p><h3 id=\"4-leaving-your-bitcoin-on-an-exchange\"><strong>4. Leaving your Bitcoin on an exchange</strong></h3><p></p><p>Use secure backups. For large amounts, consider multisig or hardware wallets. Your setup should match your level of investment.</p><p>Exchanges can be hacked. Withdraw your Bitcoin to a wallet you control.</p><h3 id=\"5-chasing-hype\"><strong>5. Chasing hype</strong></h3><p></p><p>Buying based on TikToks, tweets, or price pumps is risky. Build conviction through education, not emotion.</p>", "question": { "type": "radio", "title": "Which of these is NOT a Bitcoin-specific risk?", "options": [ { "title": "Seed phrase theft", "correctly": false }, { "title": "Volatility", "correctly": false }, { "title": "Bank failure", "correctly": true } ] } },
        { "html": "<p></p><p>Now that you’ve seen the biggest risks Bitcoin users face, the next step is knowing how to protect yourself — confidently and consistently.</p><p>These core safety principles aren’t just tips — they’re habits. We’ve covered some of them in previous lessons, but now we can explore how they work in practice.</p><p>&nbsp;Think of them as your personal toolkit for navigating Bitcoin securely, no matter your experience level.</p><p>Let’s break each one down, so you can understand why it matters, how to apply it, and how it can help you avoid costly mistakes.</p><h3 id=\"1-dyor-%E2%80%94-do-your-own-research\"><strong>1. DYOR — Do Your Own Research</strong></h3><p><br>Don’t trust hype. Investigate before acting.</p><p><em><strong>Example:</strong> </em></p><p>A coin promises 100x returns? Google the team, the code, and community sentiment before touching it.</p><h3 id=\"2-don%E2%80%99t-trust-verify\"><strong>2. Don’t Trust, Verify</strong></h3><p><br>Always double-check information. Use multiple sources. Double-check addresses. Ask questions.</p><p><em><strong>Example:</strong> </em></p><p>A link to a wallet site could be a phishing copy. Make sure URLs are official.&nbsp;</p><p>When in doubt, ask in trusted communities.</p><hr><h3 id=\"3-protect-your-private-keys\"><strong>3. Protect Your Private Keys</strong></h3><p><br>Your private key — or seed phrase — is what gives you access to your Bitcoin. If someone else gets it, they don’t need your permission to take your funds.</p><p>There are no backups, no recovery centers, and no refunds. <br>Control the keys = control the coins.</p><p><strong>Example of What <em>Not</em> to Do:</strong><br></p><ul><li><strong>Storing your seed phrase in cloud services</strong> (Google Drive, Dropbox, iCloud, email drafts). These platforms can be hacked or accessed through social engineering.</li><li><strong>Taking a screenshot</strong> of your seed phrase — and leaving it in your phone gallery or backed up to a cloud album.</li><li><strong>Saving it in your Notes app</strong> without encryption.</li><li><strong>Typing it into websites</strong> (even wallets you trust) — many fake wallets are built to harvest this data.</li><li><strong>Sharing it with “support agents”</strong> who claim they need it to help you recover your funds. No legit service will ever ask for this.<strong>4. Accept and Prepare for Volatility</strong></h3><p>Volatility is normal in Bitcoin’s growth phase.</p><p><strong>Example:</strong> Buy Bitcoin with a 5-year mindset, not a 5-day trade plan. Avoid emotional decisions based on price swings.</p>", "question": { "type": "radio", "title": "What happens if you lose your private keys?", "options": [ { "title": "You can reset them online", "correctly": false }, { "title": "Your wallet will email you a backup", "correctly": false }, { "title": "You lose access to your Bitcoin forever", "correctly": true } ] } },
        { "html": "<p></p><h3 id=\"summary\"><strong>Summary:&nbsp;</strong><br></h3><ul><li>Bitcoin empowers you — but safety is your responsibility.</li><li>The most common risks are preventable with basic habits.</li><li>Think long-term, verify everything, and protect your keys like gold.</li></ul><p><strong>Bitcoin rewards responsibility — but it can punish carelessness. Be intentional.</strong></p>" }
    ],
  }
];

const parseQuestions = (questionsString: string): Question[] => {
  if (!questionsString || typeof questionsString !== 'string' || questionsString.length < 2) return [];
  try {
    const parsableString = `[${questionsString.substring(1, questionsString.length - 1)}]`;
    const stringArray = JSON.parse(parsableString);
    if (!Array.isArray(stringArray)) return [];
    return stringArray.map((qStr: string) => {
      const questionData = JSON.parse(qStr);
      return { ...questionData, id: crypto.randomUUID(), options: questionData.options.map((opt: Omit<Option, 'id'>) => ({ ...opt, id: crypto.randomUUID() })) };
    });
  } catch (error) { console.error("Failed to parse questions string:", error); return []; }
};

const serializeQuestions = (questions: Question[]): string => {
  try {
    const questionsWithoutIds = questions.map(({ id, options, ...rest }) => ({ ...rest, options: options.map(({ id, ...optRest }) => optRest) }));
    const stringifiedArray = questionsWithoutIds.map(q => JSON.stringify(q));
    const joinedString = stringifiedArray.join(',');
    return `{${joinedString}}`;
  } catch (error) { console.error("Failed to serialize questions:", error); return "{}"; }
};

// Fix: Update parseLessons to accept RawLesson[] and allow type inference for nested objects.
const parseLessons = (rawLessons: RawLesson[]): Lesson[] => {
  return rawLessons.map(lesson => ({
    ...lesson,
    id: lesson.slug,
    segments: lesson.segments.map((segment) => ({
      ...segment,
      id: crypto.randomUUID(),
      question: segment.question ? {
        ...segment.question,
        id: crypto.randomUUID(),
        options: segment.question.options.map((opt) => ({ ...opt, id: crypto.randomUUID() }))
      } : undefined
    }))
  }));
};

// Fix: Update serializeLessons to return RawLesson[] as it strips IDs, matching the raw data structure.
const serializeLessons = (lessons: Lesson[]): RawLesson[] => {
  try {
    return lessons.map(({ id, segments, ...rest }) => ({
      ...rest,
      segments: segments.map(({ id, question, ...segmentRest }) => ({
        ...segmentRest,
        ...(question && {
          question: {
            type: question.type,
            title: question.title,
            options: question.options.map(({ id, ...optRest }) => optRest)
          }
        })
      }))
    }));
  } catch (error) {
    console.error("Failed to serialize lessons:", error);
    return [];
  }
};

const App: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [jsonOutput, setJsonOutput] = useState('');
  const [activeTab, setActiveTab] = useState<'quizzes' | 'lessons'>('quizzes');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setQuizzes(initialRawData.map(rawQuiz => ({ ...rawQuiz, questions: parseQuestions(rawQuiz.questions) })));
    setLessons(parseLessons(initialRawLessonsData));
  }, []);

  const updateJsonOutput = useCallback(() => {
    if (activeTab === 'quizzes') {
      const rawData: RawQuiz[] = quizzes.map(quiz => ({ ...quiz, questions: serializeQuestions(quiz.questions) }));
      setJsonOutput(JSON.stringify(rawData, null, 2));
    } else {
      const rawData = serializeLessons(lessons);
      setJsonOutput(JSON.stringify(rawData, null, 2));
    }
  }, [quizzes, lessons, activeTab]);

  useEffect(() => {
    updateJsonOutput();
  }, [quizzes, lessons, activeTab, updateJsonOutput]);

  const handleQuizChange = (index: number, updatedQuiz: Quiz) => {
    const newQuizzes = [...quizzes];
    newQuizzes[index] = updatedQuiz;
    setQuizzes(newQuizzes);
  };
  
  const handleLessonChange = (index: number, updatedLesson: Lesson) => {
    const newLessons = [...lessons];
    newLessons[index] = updatedLesson;
    setLessons(newLessons);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const TabButton: React.FC<{tabName: 'quizzes' | 'lessons'; label: string;}> = ({ tabName, label }) => {
    const isActive = activeTab === tabName;
    return (
      <button
        onClick={() => setActiveTab(tabName)}
        className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none transition-colors duration-200 ${
          isActive
            ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">JSON Content Editor</h1>
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 mt-2">
            Visually edit the content below and see the live JSON output.
          </p>
        </header>
        
        <div className="border-b border-gray-300 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <TabButton tabName="quizzes" label="Quizzes" />
            <TabButton tabName="lessons" label="Lessons" />
          </nav>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2 border-gray-300 dark:border-gray-700">Editor</h2>
            {activeTab === 'quizzes' && quizzes.map((quiz, index) => (
              <QuizEditor key={quiz.courseId} quiz={quiz} onChange={(updatedQuiz) => handleQuizChange(index, updatedQuiz)} />
            ))}
            {activeTab === 'lessons' && lessons.map((lesson, index) => (
              <LessonEditor key={lesson.id} lesson={lesson} onChange={(updatedLesson) => handleLessonChange(index, updatedLesson)} />
            ))}
          </div>
          <div className="relative">
             <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2 mb-6">
                <h2 className="text-2xl font-semibold">Live JSON Output</h2>
                <button
                    onClick={handleCopy}
                    className="ml-4 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center"
                    aria-live="polite"
                >
                    {isCopied ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                    </>
                    ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                    </>
                    )}
                </button>
            </div>
            <div className="sticky top-8">
              <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-inner h-[80vh] overflow-auto text-sm ring-1 ring-gray-200 dark:ring-gray-700">
                <code className="font-mono">{jsonOutput}</code>
              </pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
