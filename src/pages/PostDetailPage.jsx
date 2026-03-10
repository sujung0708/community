import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedIcon from '@mui/icons-material/Verified';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReplayIcon from '@mui/icons-material/Replay';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Header from '../components/common/Header';
import PhotoGallery from '../components/post/PhotoGallery';
import CommentSection from '../components/post/CommentSection';
import { mockPosts, mockComments, currentUser } from '../data/mock-data';

/**
 * PostDetailPage 컴포넌트 (게시물 상세 페이지)
 *
 * Props: 없음 (useParams로 post id를 가져옴)
 *
 * Example usage:
 * <PostDetailPage />
 */
function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = mockPosts.find((p) => p.id === Number(id));

  const [isRevisit, setIsRevisit] = useState(false);
  const [revisitCount, setRevisitCount] = useState(post?.revisit_count ?? 0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(post?.bookmark_count ?? 0);

  if (!post) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#FFF8F4' }}>
        <Header userName={currentUser.name} />
        <Container maxWidth='md' sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant='h6' sx={{ color: '#8B5E3C' }}>게시물을 찾을 수 없습니다.</Typography>
          <Button onClick={() => navigate('/')} sx={{ mt: 2, color: '#D65A31' }}>목록으로</Button>
        </Container>
      </Box>
    );
  }

  const postComments = mockComments.filter((c) => c.post_id === post.id);

  const handleRevisitToggle = () => {
    setIsRevisit((prev) => {
      setRevisitCount((count) => count + (prev ? -1 : 1));
      return !prev;
    });
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked((prev) => {
      setBookmarkCount((count) => count + (prev ? -1 : 1));
      return !prev;
    });
  };

  const verificationLabel = post.verification_type === 'receipt' ? '영수증 인증' : '위치 인증';
  const VerificationIcon = post.verification_type === 'receipt' ? ReceiptLongIcon : LocationOnIcon;

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#FFF8F4' }}>
      <Header userName={currentUser.name} />

      <Container maxWidth='md' sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
        {/* 뒤로가기 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <IconButton onClick={() => navigate('/')} size='small' sx={{ color: '#8B5E3C' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='caption' sx={{ color: '#8B5E3C', fontWeight: 600 }}>
            목록으로
          </Typography>
        </Box>

        {/* 인증 요약 박스 */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2.5,
            background: 'linear-gradient(135deg, #D65A31 0%, #F79D65 100%)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <VerifiedIcon sx={{ color: '#fff', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, display: 'block' }}>
              방문 인증 게시물
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.3 }}>
              <Chip
                icon={<VerificationIcon sx={{ fontSize: '0.85rem !important', color: '#D65A31 !important' }} />}
                label={verificationLabel}
                size='small'
                sx={{ bgcolor: '#fff', color: '#D65A31', fontWeight: 700, fontSize: '0.72rem', height: 22 }}
              />
              <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.9)' }}>
                방문일: { post.visit_date }
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* 가게명 + 작성자 정보 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='h5' sx={{ fontWeight: 800, color: '#3E2A1E', mb: 0.5, lineHeight: 1.3, fontSize: { xs: '1.3rem', md: '1.6rem' } }}>
            { post.store_name }
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 26, height: 26, bgcolor: '#D65A31', fontSize: '0.7rem', fontWeight: 700 }}>
              { post.user_name[0] }
            </Avatar>
            <Typography variant='caption' sx={{ color: '#8B5E3C', fontWeight: 600 }}>{ post.user_name }</Typography>
            <Typography variant='caption' sx={{ color: '#baa08a' }}>· { post.created_at.slice(0, 10) }</Typography>
          </Box>
        </Box>

        {/* 사진 갤러리 */}
        <PhotoGallery images={post.images} />

        {/* 한줄평 */}
        <Paper elevation={0} sx={{ p: 2.5, mb: 2.5, bgcolor: '#F2E3D5', borderRadius: 2, borderLeft: '4px solid #D65A31' }}>
          <Typography variant='body1' sx={{ color: '#3E2A1E', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.7 }}>
            &quot;{ post.summary_text }&quot;
          </Typography>
        </Paper>

        {/* 후기 템플릿 */}
        <Paper elevation={0} sx={{ p: 2.5, mb: 2.5, bgcolor: '#fff', border: '1px solid rgba(214,90,49,0.15)', borderRadius: 2 }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 700, color: '#D65A31', mb: 2 }}>
            방문 후기
          </Typography>
          <Grid container spacing={2}>
            {[
              { label: '메뉴', value: post.menu_text },
              { label: '가격', value: post.price_text },
              { label: '분위기', value: post.atmosphere_text },
            ].map(({ label, value }) => (
              <Grid key={label} size={{ xs: 12, sm: 4 }}>
                <Box>
                  <Typography variant='caption' sx={{ fontWeight: 700, color: '#8B5E3C', display: 'block', mb: 0.5 }}>
                    { label }
                  </Typography>
                  <Typography variant='body2' sx={{ color: '#3E2A1E', lineHeight: 1.6 }}>
                    { value || '-' }
                  </Typography>
                </Box>
              </Grid>
            ))}
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ borderColor: 'rgba(214,90,49,0.1)', my: 1 }} />
              <Typography variant='caption' sx={{ fontWeight: 700, color: '#8B5E3C', display: 'block', mb: 0.5 }}>
                한줄 총평
              </Typography>
              <Typography variant='body2' sx={{ color: '#3E2A1E', lineHeight: 1.6 }}>
                { post.final_comment || '-' }
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* 후기 본문 */}
        {post.content && (
          <Paper elevation={0} sx={{ p: 2.5, mb: 2.5, bgcolor: '#fff', border: '1px solid rgba(214,90,49,0.1)', borderRadius: 2 }}>
            <Typography variant='body2' sx={{ color: '#3E2A1E', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              { post.content }
            </Typography>
          </Paper>
        )}

        {/* 재방문 + 저장 버튼 */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
          <Button
            variant={isRevisit ? 'contained' : 'outlined'}
            startIcon={<ReplayIcon />}
            onClick={handleRevisitToggle}
            sx={{
              flex: 1,
              py: 1.2,
              fontWeight: 700,
              ...(isRevisit
                ? { bgcolor: '#D65A31', '&:hover': { bgcolor: '#C44536' } }
                : { borderColor: '#D65A31', color: '#D65A31', '&:hover': { borderColor: '#C44536', bgcolor: 'rgba(214,90,49,0.05)' } }),
            }}
          >
            재방문 했어요 { revisitCount }
          </Button>
          <Tooltip title={isBookmarked ? '저장 취소' : '저장하기'}>
            <IconButton
              onClick={handleBookmarkToggle}
              sx={{
                border: '1px solid',
                borderColor: isBookmarked ? '#D65A31' : 'rgba(214,90,49,0.3)',
                borderRadius: 2,
                px: 2,
                color: isBookmarked ? '#D65A31' : '#8B5E3C',
                bgcolor: isBookmarked ? 'rgba(214,90,49,0.08)' : 'transparent',
                '&:hover': { borderColor: '#D65A31', bgcolor: 'rgba(214,90,49,0.05)' },
              }}
            >
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              <Typography variant='caption' sx={{ ml: 0.5, fontWeight: 600 }}>{ bookmarkCount }</Typography>
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ borderColor: 'rgba(214,90,49,0.15)', mb: 3 }} />

        {/* 댓글 섹션 */}
        <CommentSection comments={postComments} currentUserName={currentUser.name} />
      </Container>
    </Box>
  );
}

export default PostDetailPage;
