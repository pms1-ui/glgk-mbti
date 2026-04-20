import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, MapPin, RefreshCw, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Sparkles, Instagram, Share2, Download, Copy, ExternalLink, X, Check } from 'lucide-react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { QUESTIONS, RESULTS } from './data';
import { Axis } from './types';

type View = 'intro' | 'quiz' | 'result';

export default function App() {
  const [view, setView] = useState<View>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(Axis | null)[]>(new Array(QUESTIONS.length).fill(null));
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isEventExpanded, setIsEventExpanded] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setCurrentQuestionIndex(0);
    setView('quiz');
  };

  const handleGoToIntro = () => {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setCurrentQuestionIndex(0);
    setView('intro');
  };

  const handleSelect = (axis: Axis) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = axis;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setView('result');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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
    if (view !== 'result' || answers.some(a => a === null)) return null;

    const validAnswers = answers as Axis[];

    const getAxis = (a: Axis, b: Axis, defaultVal: string) => {
      const countA = validAnswers.filter(x => x === a).length;
      const countB = validAnswers.filter(x => x === b).length;
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
            className="flex flex-col min-h-screen bg-[#92B085]"
          >
            <div className="relative w-full overflow-hidden leading-[0]">
              <img 
                src="/images/intro.png" 
                alt="Travel MBTI Test" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 px-8 pt-10 pb-32 text-white">
              <div className="mb-10 text-center">
                <h2 className="text-[22px] font-bold mb-3 tracking-tight">나의 MBTI를 인스타그램에 공유해주세요!</h2>
                <div className="h-0.5 w-10 bg-white/40 mx-auto rounded-full" />
              </div>

              <div className="mb-12 space-y-6">
                <div className="rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-xl">
                  <p className="text-[17px] font-medium leading-[1.6] mb-6">
                    인스타그램 스토리에 공유해주신 분들 중 <br />
                    <span className="text-yellow-300 font-semibold">3명을 추첨</span>하여 소노호텔&리조트 <br />
                    1박 숙박권 및 패밀리룩을 드립니다!
                  </p>
                  
                  <div className="space-y-5 pt-6 border-t border-white/10">
                    <h3 className="flex items-center gap-2 text-[15px] font-semibold">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#92B085] text-[10px]">📌</span>
                      참여방법
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded leading-none mt-1">step 1</span>
                        <p className="text-[14px] font-medium leading-relaxed">여행 MBTI 테스트 참여 결과 화면 <br/>캡쳐 후 인스타 스토리에 업로드</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded leading-none mt-1">step 2</span>
                        <p className="text-[14px] font-medium leading-relaxed">스토리 내 <span className="underline font-semibold">@glgk_official</span> 태그</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-white/5 p-6 border border-white/10">
                  <h3 className="text-xs font-semibold mb-4 opacity-60 uppercase tracking-widest">[ 참여기한 ]</h3>
                  <ul className="text-sm space-y-2 font-medium">
                    <li className="flex gap-2"><span className="opacity-50">•</span> 기한: 5월 1일(금) ~ 3일(일) (3일간)</li>
                    <li className="flex gap-2"><span className="opacity-50">•</span> 당첨자 발표: 5월 7일(목) 발표</li>
                  </ul>
                </div>

                <div className="rounded-[2rem] bg-white/5 p-6 border border-white/10">
                  <h3 className="text-xs font-semibold mb-4 opacity-60 uppercase tracking-widest">[ 유의사항 ]</h3>
                  <ul className="text-[12px] space-y-3 opacity-80 leading-relaxed font-medium">
                    <li className="flex gap-2"><span>*</span> <span>당첨자는 지엘지케이 인스타그램 계정에서 공개됩니다.</span></li>
                    <li className="flex gap-2"><span>*</span> <span>당첨자에게 1박 숙박권이 증정되며 최대 6명까지 숙박 가능합니다.</span></li>
                    <li className="flex gap-2"><span>*</span> <span>5월 내 예약 완료 필수이며, 이용 가능 기간은 5월 8일 ~ 8월 8일까지입니다.</span></li>
                    <li className="flex gap-2"><span>*</span> <span>패밀리룩은 HIRO / GLGK / SANN 중 선택 가능합니다.</span></li>
                  </ul>
                </div>
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
            className="flex flex-col min-h-screen pt-12 pb-24"
          >
            {/* Header */}
            <div className="px-6 flex items-center justify-between mb-8">
              <button 
                onClick={currentQuestionIndex === 0 ? handleGoToIntro : handlePrev}
                className="p-2 -ml-2 text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <div className="font-display text-xl font-bold tracking-[0.2em] text-neutral-900">
                {currentQuestionIndex + 1} / {QUESTIONS.length}
              </div>
              <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Progress Bar */}
            <div className="px-6 mb-12">
              <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100">
                <motion.div 
                  className="h-full bg-[#92B085]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="px-6 mb-12 min-h-[80px] flex items-center">
              <h2 className="font-display text-2xl font-bold leading-tight text-neutral-900">
                {QUESTIONS[currentQuestionIndex].text}
              </h2>
            </div>

            {/* Options */}
            <div className="px-6 flex flex-col gap-4">
              {[QUESTIONS[currentQuestionIndex].optionA, QUESTIONS[currentQuestionIndex].optionB].map((option, idx) => {
                const isSelected = answers[currentQuestionIndex] === option.axis;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(option.axis)}
                    className={`group flex w-full items-center justify-between rounded-2xl border p-6 text-left transition-all ${
                      isSelected 
                        ? 'border-travel-green bg-travel-green/10 shadow-sm' 
                        : 'border-neutral-100 bg-white hover:border-neutral-200'
                    }`}
                  >
                    <span className={`text-[17px] font-semibold pr-4 ${isSelected ? 'text-travel-text' : 'text-neutral-800'}`}>
                      {idx === 0 ? 'A.' : 'B.'} {option.text}
                    </span>
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected 
                        ? 'bg-travel-green border-travel-green text-white' 
                        : 'border-neutral-200 text-transparent'
                    }`}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sticky Navigation Footer */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white p-6 shadow-[0_-8px_20px_rgba(0,0,0,0.03)] flex gap-3">
              <button 
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0 || answers[currentQuestionIndex] === null}
                className={`flex h-14 w-1/4 items-center justify-center rounded-xl font-bold transition-all ${
                  currentQuestionIndex === 0 || answers[currentQuestionIndex] === null
                    ? 'bg-neutral-50 text-neutral-300 cursor-not-allowed'
                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                }`}
              >
                이전
              </button>
              <button 
                onClick={handleNext}
                disabled={answers[currentQuestionIndex] === null}
                className={`flex h-14 flex-1 items-center justify-center rounded-xl font-bold transition-all ${
                  answers[currentQuestionIndex] === null
                    ? 'bg-neutral-100 text-neutral-300 cursor-not-allowed'
                    : 'bg-travel-green text-white shadow-lg shadow-travel-green/20'
                }`}
              >
                {currentQuestionIndex === QUESTIONS.length - 1 ? '결과 확인' : '다음'}
              </button>
            </div>
          </motion.div>
        )}

        {view === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col bg-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <button 
                onClick={handleGoToIntro}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-50"
              >
                <ChevronLeft size={24} className="text-neutral-900" />
              </button>
            </div>

            <div ref={resultRef} className="bg-white px-8 pb-12">
              {/* Type & Title */}
              <div className="mb-8 text-center pt-8">
                <p className="mb-2 text-sm font-bold text-neutral-400 uppercase tracking-widest leading-none">{result.mbti}</p>
                <h2 className="font-display text-4xl font-bold text-travel-text leading-tight drop-shadow-sm">
                  {result.title}
                </h2>
              </div>

              {/* Character Image */}
              <div className="relative mb-8 flex justify-center">
                <div className="aspect-square w-72 overflow-hidden rounded-full bg-neutral-50 shadow-inner">
                  <img 
                    src={result.imageUrl} 
                    alt={result.title} 
                    className="h-full w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Keywords */}
              <div className="mb-10 flex flex-wrap justify-center gap-2">
                {result.keywords.map(kw => (
                  <span key={kw} className="rounded-lg bg-neutral-50 px-4 py-1.5 text-xs font-bold text-neutral-400">
                    #{kw}
                  </span>
                ))}
              </div>

              {/* Stats Section */}
              <div className="mb-10 space-y-4">
                {[
                  { label: '에너지력', val: 4 },
                  { label: '모험력', val: 1 },
                  { label: '팩폭력', val: 2 },
                  { label: '번개력', val: 3 },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-4">
                    <span className="w-16 text-sm font-semibold text-neutral-800">{stat.label}</span>
                    <div className="flex flex-1 gap-1">
                      {[1, 2, 3, 4, 5].map((seg) => (
                        <div
                          key={seg}
                          className={`h-4 flex-1 rounded-sm ${
                            seg <= stat.val ? 'bg-travel-green' : 'bg-neutral-100'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mb-10 h-px w-full bg-neutral-100" />

              {/* Description List */}
              <div className="mb-12">
                <ul className="space-y-4 text-[15px] font-medium text-neutral-700 leading-relaxed">
                  {result.description.split('. ').filter(s => s.trim().length > 0).map((sentence, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 text-travel-green opacity-50">•</span>
                      <span>{sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendation Box */}
              <div className="mb-12 rounded-3xl border border-neutral-100 bg-white px-8 py-8 text-center shadow-sm">
                <div className="mb-4 flex items-center justify-center gap-2 text-neutral-400">
                  <MapPin size={18} />
                  <span className="text-sm font-semibold">추천 여행지</span>
                </div>
                <p className="text-lg font-bold text-neutral-900">
                  {result.recommendedDestinations}
                </p>
              </div>
            </div>

            {/* Event Toggle Section */}
            <div className="px-8 pb-4">
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50/50 overflow-hidden">
                <button 
                  onClick={() => setIsEventExpanded(!isEventExpanded)}
                  className="flex w-full items-center justify-between p-5 transition-colors hover:bg-neutral-100/50"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-travel-green" />
                    <span className="text-[15px] font-bold text-neutral-900 tracking-tight">[EVENT] 숙박권 증정 이벤트</span>
                  </div>
                  {isEventExpanded ? <ChevronUp size={20} className="text-neutral-400" /> : <ChevronDown size={20} className="text-neutral-400" />}
                </button>

                <AnimatePresence>
                  {isEventExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 space-y-6 border-t border-neutral-100/50 pt-6">
                        <div className="text-center">
                          <h4 className="text-[16px] font-bold text-neutral-800 mb-2">나의 MBTI를 인스타그램에 공유해주세요!</h4>
                          <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-4">
                            <img src="/images/intro.png" alt="Event" className="w-full h-full object-cover" />
                          </div>
                          <p className="text-[14px] font-medium leading-relaxed text-neutral-600">
                            인스타그램 스토리에 공유해주신 분들 중 <span className="text-travel-text font-bold">3명을 추첨</span>하여<br />
                            소노호텔&리조트 1박 숙박권 및 패밀리룩을 드립니다!
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h5 className="flex items-center gap-2 text-[14px] font-bold text-neutral-800">
                            <span className="text-[12px]">📌</span> 참여방법
                          </h5>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white p-3 rounded-xl border border-neutral-100">
                              <span className="text-[10px] font-bold text-travel-text uppercase tracking-widest block mb-1">Step 1</span>
                              <p className="text-[12px] leading-snug text-neutral-500 font-medium text-pretty">결과 화면 캡쳐 후 인스타 스토리 업로드</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-neutral-100">
                              <span className="text-[10px] font-bold text-travel-text uppercase tracking-widest block mb-1">Step 2</span>
                              <p className="text-[12px] leading-snug text-neutral-500 font-medium text-pretty">스토리 내 @glgk_official 태그</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h5 className="flex items-center gap-2 text-[14px] font-bold text-neutral-800">
                            <span className="text-[12px]">📌</span> 참여기한
                          </h5>
                          <ul className="text-[13px] font-medium text-neutral-500 space-y-1 ml-1 leading-relaxed">
                            <li>• 기한: 5월 1일(금) ~ 3일(일) (3일간)</li>
                            <li>• 당첨자 발표: 5월 7일(목) 발표</li>
                          </ul>
                        </div>

                        <div className="bg-neutral-100/50 rounded-xl p-4">
                          <h5 className="text-[12px] font-bold text-neutral-400 mb-3 tracking-tight">[ 유의사항 ]</h5>
                          <ul className="text-[11px] font-medium text-neutral-400 space-y-2 leading-relaxed">
                            <li>* 당첨자는 지엘지케이 인스타그램 계정에서 공개됩니다.</li>
                            <li>* 당첨자에게 1박 숙박권이 증정되며 최대 6명까지 숙박 가능합니다.</li>
                            <li>* 5월 내 예약 완료 필수이며, 이용 가능 기간은 5월 8일 ~ 8월 8일까지입니다.</li>
                            <li>* 패밀리룩은 HIRO / GLGK / SANN 중 선택 가능합니다.</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-8 pb-12 space-y-3">
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-2xl bg-travel-green px-6 py-4 font-display text-lg font-bold text-white shadow-lg shadow-travel-green/20 transition-all active:scale-95"
              >
                <Instagram className="mr-2" size={20} />
                스토리 올리러 가기
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setIsShareModalOpen(true)} className="btn-secondary !text-base !py-3.5">
                  <Share2 className="mr-2" size={18} />
                  공유하기
                </button>
                <button onClick={handleSaveImage} className="btn-secondary !text-base !py-3.5">
                  <Download className="mr-2" size={18} />
                  저장하기
                </button>
              </div>

              <button onClick={handleGoToIntro} className="btn-secondary !py-4">
                <RefreshCw className="mr-2" size={18} />
                테스트 다시 하기
              </button>
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

