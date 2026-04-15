import { Question, Result } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "여행 가서 더 끌리는 건?",
    optionA: { text: "새로운 사람, 현지 분위기", axis: "E" },
    optionB: { text: "혼자만의 시간, 나만의 루트", axis: "I" },
    axis: "E / I"
  },
  {
    id: 2,
    text: "여행 계획 스타일은?",
    optionA: { text: "대충 정하고 가서 정함", axis: "P" },
    optionB: { text: "미리 루트 다 짜둠", axis: "J" },
    axis: "P / J"
  },
  {
    id: 3,
    text: "여행에서 더 중요한 건?",
    optionA: { text: "지금 재밌는 경험", axis: "S" },
    optionB: { text: "의미 있는 경험", axis: "N" },
    axis: "S / N"
  },
  {
    id: 4,
    text: "친구랑 의견 갈릴 때",
    optionA: { text: "현실적으로 맞는 쪽 선택", axis: "T" },
    optionB: { text: "서로 기분 안 상하는 게 중요", axis: "F" },
    axis: "T / F"
  },
  {
    id: 5,
    text: "여행 중 시간 남으면",
    optionA: { text: "근처 재밌는 거 찾아봄", axis: "E" },
    optionB: { text: "조용한 곳에서 쉬기", axis: "I" },
    axis: "E / I"
  },
  {
    id: 6,
    text: "여행지 선택 기준은?",
    optionA: { text: "핫플 / 액티비티", axis: "S" },
    optionB: { text: "감성 / 분위기 / 의미", axis: "N" },
    axis: "S / N"
  },
  {
    id: 7,
    text: "여행 중 문제 생기면",
    optionA: { text: "빠르게 해결부터", axis: "T" },
    optionB: { text: "상황 보고 유연하게", axis: "F" },
    axis: "T / F"
  },
  {
    id: 8,
    text: "여행 마무리 느낌은?",
    optionA: { text: "재밌었다 또 가자", axis: "P" },
    optionB: { text: "좋은 기억으로 정리됨", axis: "J" },
    axis: "P / J"
  }
];

export const RESULTS: Result[] = [
  {
    brand: 'HIRO',
    mbti: 'ESTP',
    title: '판 뒤집는 여행자',
    description: '계획보다 현장 감각! 여행 루트 계획 안 세워도 그냥 그때 꽂히는 데 가는 스타일. 돌발 상황도 즐겁게 받아들이고, 여행 전체를 하나의 게임처럼 즐김.',
    keywords: ['즉흥', '액션', '스트릿'],
    imageUrl: '/images/estp.jpg',
    recommendedDestinations: '제주 / 양양 서피비치'
  },
  {
    brand: 'HIRO',
    mbti: 'ESFP',
    title: '분위기 터뜨리는 여행자',
    description: '여행의 텐션과 재미를 만드는 타입. 맛집, 핫플, 숙소 등 취향이 확고하며 여행 내내 웃음이 끊이지 않게 함.',
    keywords: ['무드', '에너지', '소셜'],
    imageUrl: '/images/esfp.jpg',
    recommendedDestinations: '부산 / 강릉'
  },
  {
    brand: 'HIRO',
    mbti: 'ENTP',
    title: '루트 깨는 여행자',
    description: '기존 계획보다 더 재밌는 선택지를 찾는 타입. "이거보다 저게 더 재밌을 것 같은데?" 하며 루트를 바꿈. 근데 그게 또 기가 막히게 재밌음.',
    keywords: ['아이디어', '변화', '자유'],
    imageUrl: '/images/entp.jpg',
    recommendedDestinations: '도쿄(시부야/하라주쿠) / 베를린'
  },
  {
    brand: 'HIRO',
    mbti: 'ENTJ',
    title: '판 깔아주는 여행자',
    description: '여행 전체를 진두지휘하는 리더형 여행자. 가장 효율적인 루트를 짜고 실행하며, 돌발 상황도 완벽하게 통제함.',
    keywords: ['리더', '전략', '추진'],
    imageUrl: '/images/entj.jpg',
    recommendedDestinations: '뉴욕(브루클린/맨해튼) / 파리'
  },
  {
    brand: 'HIRO',
    mbti: 'ISTP',
    title: '혼자 잘 노는 여행자',
    description: '자기 방식으로 여행을 즐기는 타입. 남들 시선 신경 안 쓰고 혼자서도 잘 놀며, 액티비티 하나만 있어도 즐거워함.',
    keywords: ['쿨', '기술', '독립'],
    imageUrl: '/images/istp.jpg',
    recommendedDestinations: '아이슬란드 / 몽골'
  },
  {
    brand: 'HIRO',
    mbti: 'ESTJ',
    title: '동선 정리해주는 여행자',
    description: '동선과 일정을 정리해 여행을 굴러가게 하는 타입. 숙소, 맛집, 교통편 등 모든 것을 미리 확인하고 준비함.',
    keywords: ['리더', '운영', '추진'],
    imageUrl: '/images/estj.jpg',
    recommendedDestinations: '런던 / 뉴욕'
  },
  {
    brand: 'GLGK',
    mbti: 'ESFJ',
    title: '다 챙기는 메이트',
    description: '모두가 편하고 즐겁도록 세심하게 챙기는 타입. "물은 챙겼어?", "배고프진 않아?" 하며 주변을 돌봄.',
    keywords: ['케어', '관계', '따뜻함'],
    imageUrl: '/images/esfj.jpg',
    recommendedDestinations: '다낭 / 후쿠오카'
  },
  {
    brand: 'GLGK',
    mbti: 'ISFJ',
    title: '조용히 준비하는 메이트',
    description: '필요한 것들을 미리 준비해두는 안정형 타입. 남들이 찾기 전에 이미 가방에서 필요한 게 나오는 준비성 끝판왕.',
    keywords: ['배려', '준비', '안정'],
    imageUrl: '/images/isfj.jpg',
    recommendedDestinations: '교토 / 치앙마이'
  },
  {
    brand: 'GLGK',
    mbti: 'ENFJ',
    title: '기억 만들어주는 메이트',
    description: '여행의 순간에 의미를 부여하고 오래 남게 만드는 타입. "우리가 함께한 이 시간이 정말 소중해" 하며 분위기를 훈훈하게 만듦.',
    keywords: ['감정', '리드', '공감'],
    imageUrl: '/images/enfj.jpg',
    recommendedDestinations: '피렌체 / 프라하'
  },
  {
    brand: 'GLGK',
    mbti: 'ISFP',
    title: '감성 기록자 메이트',
    description: '사진과 분위기, 순간의 결을 소중히 담는 타입. 빛, 온도, 습도... 모든 것이 완벽한 순간을 포착해 기록함.',
    keywords: ['감성', '기록', '무드'],
    imageUrl: '/images/isfp.jpg',
    recommendedDestinations: '파리 / 바르셀로나'
  },
  {
    brand: 'GLGK',
    mbti: 'ENFP',
    title: '사람 끌어당기는 메이트',
    description: '어디서든 친구를 만들고 분위기를 넓히는 타입. "저기 사람 많은데 가볼까?" 하며 새로운 만남과 경험을 즐김.',
    keywords: ['친화력', '호기심', '확산'],
    imageUrl: '/images/enfp.jpg',
    recommendedDestinations: '방콕 / 홍콩'
  },
  {
    brand: 'SANN',
    mbti: 'INFJ',
    title: '이유 찾는 워크루',
    description: '여행을 통해 스스로의 방향을 찾으려는 타입. "나는 왜 여기 왔을까?" 하며 내면의 목소리에 귀 기울이는 철학적 여행자.',
    keywords: ['내면', '의미', '방향'],
    imageUrl: '/images/infj.jpg',
    recommendedDestinations: '교토 / 포르투'
  },
  {
    brand: 'SANN',
    mbti: 'INFP',
    title: '감정 따라가는 워크루',
    description: '느낌 좋은 장소와 순간에 오래 머무는 타입. 계획보다는 발길 닿는 대로, 마음 가는 대로 움직이며 감성에 젖음.',
    keywords: ['감정', '몰입', '진정성'],
    imageUrl: '/images/infp.jpg',
    recommendedDestinations: '치앙마이 / 베를린'
  },
  {
    brand: 'SANN',
    mbti: 'INTJ',
    title: '전략 워크루',
    description: '효율적인 동선과 계획으로 자유를 만드는 타입. 최소한의 움직임으로 최대한의 만족을 끌어내는 전략가임.',
    keywords: ['전략', '효율', '설계'],
    imageUrl: '/images/intj.jpg',
    recommendedDestinations: '싱가포르 / 런던'
  },
  {
    brand: 'SANN',
    mbti: 'INTP',
    title: '관찰하는 워크루',
    description: '도시와 공간의 구조를 유심히 보고 해석하는 타입. "이 건물은 왜 이렇게 지어졌을까?" 하며 호기심 가득한 눈으로 관찰함.',
    keywords: ['분석', '관찰', '호기심'],
    imageUrl: '/images/intp.jpg',
    recommendedDestinations: '도쿄(진보초/나카메구로) / 런던'
  },
  {
    brand: 'SANN',
    mbti: 'ISTJ',
    title: '안정적으로 즐기는 워크루',
    description: '검증된 선택 안에서 만족도를 높이는 타입. 실패 없는 여행을 위해 꼼꼼하게 계획하고 안정적으로 즐김.',
    keywords: ['안정', '기준', '신뢰'],
    imageUrl: '/images/istj.jpg',
    recommendedDestinations: '오사카 / 타이베이'
  }
];
