/** 먹증 커뮤니티 목(Mock) 데이터 */

export const mockUsers = [
  { id: 1, name: '김먹방', profile_image_url: null, signup_type: 'kakao' },
  { id: 2, name: '이리뷰', profile_image_url: null, signup_type: 'google' },
  { id: 3, name: '박인증', profile_image_url: null, signup_type: 'email' },
];

export const mockPosts = [
  {
    id: 1,
    user_id: 1,
    user_name: '김먹방',
    store_name: '을지로 노가리집',
    summary_text: '진짜 레전드 노가리, 맥주 한잔하기 딱 좋아요!',
    content: '오랜만에 을지로 나들이. 골목 안쪽에 있어서 찾기 살짝 어렵지만 찾아가면 행복합니다.',
    visit_date: '2026-03-05',
    verification_type: 'receipt',
    menu_text: '노가리 2마리, 생맥주 500cc',
    price_text: '약 18,000원 (2인)',
    atmosphere_text: '복고풍 실내, 시끌벅적, 어른 분위기',
    final_comment: '서울에서 이런 분위기 없어요. 꼭 가보세요.',
    is_revisit: true,
    revisit_count: 24,
    bookmark_count: 18,
    images: [
      { id: 1, image_url: 'https://picsum.photos/seed/food1/600/400', sort_order: 1, is_thumbnail: true },
      { id: 2, image_url: 'https://picsum.photos/seed/food2/600/400', sort_order: 2, is_thumbnail: false },
      { id: 3, image_url: 'https://picsum.photos/seed/food3/600/400', sort_order: 3, is_thumbnail: false },
    ],
    created_at: '2026-03-05T18:30:00',
  },
  {
    id: 2,
    user_id: 2,
    user_name: '이리뷰',
    store_name: '망원동 돼지국밥',
    summary_text: '뽀얀 국물이 진짜배기, 해장엔 여기!',
    content: '망원시장 근처 작은 가게인데 국물이 진짜 진해요. 아침 일찍 가야 재료 소진 전에 먹을 수 있습니다.',
    visit_date: '2026-03-08',
    verification_type: 'location',
    menu_text: '순대국밥, 돼지국밥',
    price_text: '1인 9,000원',
    atmosphere_text: '소박한 로컬 식당, 아늑함',
    final_comment: '집 근처에 이런 집 있으면 매일 가겠다.',
    is_revisit: false,
    revisit_count: 11,
    bookmark_count: 7,
    images: [
      { id: 4, image_url: 'https://picsum.photos/seed/food4/600/400', sort_order: 1, is_thumbnail: true },
    ],
    created_at: '2026-03-08T09:15:00',
  },
  {
    id: 3,
    user_id: 3,
    user_name: '박인증',
    store_name: '성수 브런치카페 Mellow',
    summary_text: '에그베네딕트 맛집, 주말 웨이팅 각오하세요',
    content: '성수 핫플 카페. 인테리어도 예쁘고 음식 퀄리티도 좋아요. 주말엔 1시간 웨이팅 기본입니다.',
    visit_date: '2026-03-09',
    verification_type: 'receipt',
    menu_text: '에그베네딕트, 아이스 라떼',
    price_text: '2인 32,000원',
    atmosphere_text: '모던 인더스트리얼, 채광 좋음, 인스타각',
    final_comment: '웨이팅 감수할 만한 맛이에요.',
    is_revisit: true,
    revisit_count: 33,
    bookmark_count: 45,
    images: [
      { id: 5, image_url: 'https://picsum.photos/seed/food5/600/400', sort_order: 1, is_thumbnail: true },
      { id: 6, image_url: 'https://picsum.photos/seed/food6/600/400', sort_order: 2, is_thumbnail: false },
      { id: 7, image_url: 'https://picsum.photos/seed/food7/600/400', sort_order: 3, is_thumbnail: false },
      { id: 8, image_url: 'https://picsum.photos/seed/food8/600/400', sort_order: 4, is_thumbnail: false },
    ],
    created_at: '2026-03-09T12:00:00',
  },
];

export const mockComments = [
  {
    id: 1,
    post_id: 1,
    user_id: 2,
    user_name: '이리뷰',
    content: '저도 갔다왔는데 노가리 퀄리티 진짜 최고였어요!',
    like_count: 8,
    is_author: false,
    created_at: '2026-03-06T10:00:00',
  },
  {
    id: 2,
    post_id: 1,
    user_id: 1,
    user_name: '김먹방',
    content: '맞아요~ 3번 갔는데 매번 실망 없이 좋았어요!',
    like_count: 5,
    is_author: true,
    created_at: '2026-03-06T11:30:00',
  },
  {
    id: 3,
    post_id: 1,
    user_id: 3,
    user_name: '박인증',
    content: '위치가 좀 헷갈렸는데 덕분에 찾았어요 감사합니다!',
    like_count: 2,
    is_author: false,
    created_at: '2026-03-07T09:00:00',
  },
];

/** 현재 로그인된 사용자 (목 데이터) */
export const currentUser = {
  id: 1,
  name: '김먹방',
  email: 'mukbang@example.com',
  signup_type: 'kakao',
  profile_image_url: null,
  /** 내가 저장(북마크)한 게시물 ID 목록 */
  savedPostIds: [1, 3],
};
