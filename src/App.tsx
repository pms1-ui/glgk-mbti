import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, MapPin, RefreshCw, ChevronRight, Sparkles, Instagram, Share2, Download, Copy, ExternalLink, X } from 'lucide-react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { QUESTIONS, RESULTS } from './data';
import { Axis } from './types';

type View = 'intro' | 'quiz' | 'result';

export default function App() {
  const [view, setView] = useState<View>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Axis[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setView('quiz');
  };

  const handleGoToIntro = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setView('intro');
  };

  const handleAnswer = (axis: Axis) => {
    const newAnswers = [...answers, axis];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setView('result');
    }
  };

  const handleSaveImage = async () => {
    if (resultRef.current === null) return;
    try {
      const dataUrl = await toPng(resultRef.current, { cacheBust: true });
      download(dataUrl, `travel-mbti-${result?.mbti.toLowerCase()}.png`);
    } catch (err) {
      console.error('Failed to save image', err);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const result = useMemo(() => {
    if (view !== 'result' || answers.length < QUESTIONS.length) return null;

    const getAxis = (a: Axis, b: Axis, defaultVal: string) => {
      const countA = answers.filter(x => x === a).length;
      const countB = answers.filter(x => x === b).length;
      if (countA > countB) return a;
      if (countB > countA) return b;
      return defaultVal;
    };

    const mbti = [
      getAxis('E', 'I', 'E'),
      getAxis('S', 'N', 'S'),
      getAxis('T', 'F', 'T'),
      getAxis('J', 'P', 'J')
    ].join('');

    return RESULTS.find(r => r.mbti === mbti) || RESULTS[0];
  }, [view, answers]);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-white shadow-2xl relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col min-h-screen"
          >
            <div className="relative h-[60vh] w-full overflow-hidden">
              <img 
                src="https://picsum.photos/seed/travel-hero/1200/1600" 
                alt="Travel Hero" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
              
              <div className="absolute top-12 left-8">
                <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] text-white/80 uppercase">
                  <Plane size={14} />
                  HIRO / GLGK / SANN
                </div>
              </div>

              <div className="absolute bottom-12 left-8 right-8">
                <h1 className="font-display text-5xl font-black tracking-tight text-neutral-900 leading-[0.9] mb-4">
                  TRAVEL<br />
                  MBTI<br />
                  TEST
                </h1>
                <p className="text-lg font-medium text-neutral-600 leading-tight">
                  당신은 어떤 캐릭터의 여행자인가요?<br />
                  8가지 질문으로 알아보는 나의 여행 스타일
                </p>
              </div>
            </div>

            <div className="flex-1 px-8 pt-8 pb-32">
              <div className="rounded-3xl border border-neutral-100 bg-neutral-50/50 p-6">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold text-neutral-900">
                  <Sparkles size={16} className="text-neutral-400" />
                  EVENT
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  결과 인증 시 호텔 숙박권 추첨 증정!<br />
                  지금 바로 테스트를 시작해보세요.
                </p>
              </div>
            </div>

            <div className="btn-floating">
              <button onClick={handleStart} className="btn-primary group">
                테스트 시작하기
                <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col px-8 py-16"
          >
            <div className="mb-12">
              <div className="mb-4 flex items-center justify-between text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
                <span>STEP {currentQuestionIndex + 1} / {QUESTIONS.length}</span>
                <span className="text-neutral-900">{Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100">
                <motion.div 
                  className="h-full bg-neutral-900"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="mb-16 min-h-[120px] flex items-center">
              <h2 className="font-display text-3xl font-black leading-tight text-neutral-900">
                {QUESTIONS[currentQuestionIndex].text}
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {[QUESTIONS[currentQuestionIndex].optionA, QUESTIONS[currentQuestionIndex].optionB].map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.axis)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-neutral-100 bg-white p-6 text-left transition-all hover:border-neutral-900 hover:shadow-xl active:scale-[0.98]"
                >
                  <span className="text-lg font-bold text-neutral-800 pr-4">{option.text}</span>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-xs font-black group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                    {idx === 0 ? 'A' : 'B'}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col px-8 py-16 pb-24"
          >
            <div ref={resultRef} className="bg-white">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-block rounded-full border border-neutral-200 px-4 py-1 text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase">
                  {result.brand}
                </div>
                <h3 className="mb-2 font-display text-lg font-bold tracking-[0.2em] text-neutral-400 uppercase">{result.mbti}</h3>
                <h2 className="font-display text-4xl font-black text-neutral-900 leading-tight">{result.title}</h2>
              </div>

              <div className="mbti-card mb-8 overflow-hidden">
                <div className="aspect-square w-full bg-neutral-50">
                  <img 
                    src={result.imageUrl} 
                    alt={result.title} 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="p-8 text-center">
                  <p className="mb-8 text-lg font-medium text-neutral-500 leading-relaxed">
                    {result.description}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {result.keywords.map(kw => (
                      <span key={kw} className="rounded-lg bg-neutral-50 border border-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-400">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-12 rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-sm text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900">
                    <MapPin size={20} />
                  </div>
                  <span className="font-display text-lg font-bold text-neutral-900">추천 여행지</span>
                </div>
                <p className="text-xl font-black text-neutral-800">
                  {result.recommendedDestinations}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary !bg-[#E1306C] shadow-[#E1306C]/20"
              >
                <Instagram className="mr-2" size={20} />
                스토리 올리러 가기
              </a>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setIsShareModalOpen(true)} className="btn-secondary !py-3 !text-base">
                  <Share2 className="mr-2" size={18} />
                  공유하기
                </button>
                <button onClick={handleSaveImage} className="btn-secondary !py-3 !text-base">
                  <Download className="mr-2" size={18} />
                  저장하기
                </button>
              </div>

              <button onClick={handleGoToIntro} className="btn-secondary !py-4">
                <RefreshCw className="mr-2" size={18} />
                다시 테스트 해보기
              </button>
            </div>

            <div className="mt-12 text-center text-[10px] font-bold tracking-widest text-neutral-300 uppercase">
              HIRO / GLGK / SANN
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setIsShareModalOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <h4 className="font-display text-xl font-black text-neutral-900">공유하기</h4>
                <button onClick={() => setIsShareModalOpen(false)} className="rounded-full bg-neutral-100 p-2 text-neutral-400">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button 
                  onClick={handleCopyUrl}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-neutral-100 text-neutral-900 transition-transform group-hover:scale-105 group-active:scale-95">
                    <Copy size={24} />
                  </div>
                  <span className="text-sm font-bold text-neutral-600">{copySuccess ? '복사 완료!' : 'URL 복사'}</span>
                </button>

                <button className="flex flex-col items-center gap-3 group">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#FEE500] text-[#3c1e1e] transition-transform group-hover:scale-105 group-active:scale-95">
                    <Sparkles size={24} />
                  </div>
                  <span className="text-sm font-bold text-neutral-600">카카오 공유</span>
                </button>
              </div>
              
              <div className="mt-12 text-center">
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="text-sm font-bold text-neutral-400 underline underline-offset-4"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

