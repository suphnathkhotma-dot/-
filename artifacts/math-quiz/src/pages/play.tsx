import { useEffect, useState, useRef } from 'react';
import { useLocation, useSearch } from 'wouter';
import { Trophy, Flame, XCircle, PlaySquare } from 'lucide-react';
import { useSettings } from '../hooks/use-settings';
import { Layout } from '../components/layout';
import { generateQuestion, Question, Category } from '../lib/game';

export default function Play() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const categoryRaw = searchParams.get('category') || 'mixed';
  const category = categoryRaw as Category;

  const { playClick, playCorrect, playWrong } = useSettings();
  const [, setLocation] = useLocation();

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  
  const recentSignatures = useRef<Set<string>>(new Set());

  // Init question
  useEffect(() => {
    if (!question && !isGameOver) {
      loadNextQuestion();
    }
  }, [question, isGameOver]);

  const loadNextQuestion = () => {
    const nextQ = generateQuestion(category, recentSignatures.current);
    recentSignatures.current.add(nextQ.signature);
    if (recentSignatures.current.size > 20) {
      const iterator = recentSignatures.current.values();
      recentSignatures.current.delete(iterator.next().value);
    }
    setQuestion(nextQ);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: number | string) => {
    if (isAnswered || !question) return;
    
    setIsAnswered(true);
    setSelectedAnswer(answer);
    setTotalAnswered(prev => prev + 1);

    if (answer === question.correctAnswer) {
      playCorrect();
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      playWrong();
      setStreak(0);
    }

    // Auto advance
    setTimeout(() => {
      loadNextQuestion();
    }, 1200);
  };

  const handleEndSession = () => {
    playClick();
    setIsGameOver(true);
  };

  if (isGameOver) {
    const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
    return (
      <Layout>
        <div className="bg-card p-8 rounded-3xl border-b-8 border-card-border shadow-xl text-center animate-in zoom-in fade-in duration-500">
          <div className="flex justify-center mb-6">
            <Trophy className="w-24 h-24 text-yellow-400 drop-shadow-md" />
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-6">สรุปผลการเล่น</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl">
              <p className="text-muted-foreground text-sm font-bold mb-1">ตอบถูก</p>
              <p className="text-4xl font-mono font-black text-green-600 dark:text-green-400">{score}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
              <p className="text-muted-foreground text-sm font-bold mb-1">ทั้งหมด</p>
              <p className="text-4xl font-mono font-black text-blue-600 dark:text-blue-400">{totalAnswered}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-2xl col-span-2">
              <p className="text-muted-foreground text-sm font-bold mb-1">ความแม่นยำ</p>
              <p className="text-5xl font-mono font-black text-purple-600 dark:text-purple-400">{accuracy}%</p>
            </div>
          </div>

          <button
            onClick={() => { playClick(); setLocation('/'); }}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-2xl text-xl font-bold border-b-4 border-primary-foreground/30 shadow-md hover:translate-y-1 hover:border-b-0 active:scale-95 transition-all"
          >
            <PlaySquare className="w-6 h-6" />
            กลับหน้าแรก
          </button>
        </div>
      </Layout>
    );
  }

  if (!question) return <Layout><div className="text-center font-bold text-xl">กำลังโหลด...</div></Layout>;

  return (
    <Layout>
      <div className="w-full animate-in fade-in duration-300">
        {/* Top Stats */}
        <div className="flex justify-between items-center mb-6 px-1">
          <div className="bg-card px-5 py-2.5 rounded-full font-mono font-bold text-xl flex items-center gap-2 shadow-sm border-b-4 border-card-border text-foreground">
            <Trophy className="w-6 h-6 text-yellow-500" />
            {score}
          </div>
          
          <div className={`px-5 py-2.5 rounded-full font-mono font-bold text-xl flex items-center gap-2 shadow-sm border-b-4 transition-colors ${streak >= 3 ? 'bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-900/50 dark:text-orange-400 dark:border-orange-900' : 'bg-card text-muted-foreground border-card-border'}`}>
            <Flame className={`w-6 h-6 ${streak >= 3 ? 'text-orange-500 animate-pulse' : ''}`} />
            {streak}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card p-10 rounded-3xl shadow-xl border-b-8 border-card-border text-center mb-6 relative overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="text-5xl md:text-7xl font-mono font-black text-foreground tracking-tighter flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <span>{question.displayExpr}</span>
            {question.operator !== 'compare' && <span className="text-muted-foreground">=</span>}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">?</span>
          </div>
        </div>

        {/* Answers Grid */}
        <div className={`grid gap-4 mb-8 ${question.choices.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {question.choices.map((choice, i) => {
            const isSelected = selectedAnswer === choice;
            const isCorrect = choice === question.correctAnswer;
            
            let btnClass = "bg-card text-foreground border-card-border hover:bg-muted";
            if (isAnswered) {
              if (isCorrect) {
                btnClass = "bg-green-500 text-white border-green-600 ring-4 ring-green-500/30 dark:ring-green-400/20";
              } else if (isSelected) {
                btnClass = "bg-red-500 text-white border-red-600";
              } else {
                btnClass = "bg-card opacity-40 text-foreground border-card-border";
              }
            }

            return (
              <button
                key={`${question.signature}-${choice}-${i}`}
                disabled={isAnswered}
                onClick={() => handleAnswer(choice)}
                className={`py-8 md:py-10 rounded-2xl text-4xl md:text-5xl font-mono font-bold shadow-md border-b-4 transition-all active:scale-95 disabled:hover:scale-100 ${btnClass} ${!isAnswered ? 'hover:-translate-y-1' : ''}`}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <button
            onClick={handleEndSession}
            className="flex items-center gap-2 px-6 py-3 bg-destructive/10 text-destructive rounded-full font-bold hover:bg-destructive hover:text-destructive-foreground transition-colors active:scale-95"
          >
            <XCircle className="w-5 h-5" />
            เลิกเล่น (สรุปผล)
          </button>
        </div>
      </div>
    </Layout>
  );
}
