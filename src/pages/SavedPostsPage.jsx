import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Header from '../components/common/Header';
import PostCard from '../components/ui/PostCard';
import { mockPosts, currentUser } from '../data/mock-data';
import { useNavigate } from 'react-router-dom';

/**
 * SavedPostsPage 컴포넌트 (저장한 게시물 목록 페이지)
 *
 * Props: 없음
 *
 * Example usage:
 * <SavedPostsPage />
 */
function SavedPostsPage() {
  const navigate = useNavigate();

  /** 현재 사용자가 저장한 게시물만 필터링 */
  const savedPosts = mockPosts.filter((post) =>
    currentUser.savedPostIds.includes(post.id)
  );

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#FFF8F4' }}>
      <Header userName={currentUser.name} />

      <Container maxWidth='lg' sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 3 } }}>

        {/* 페이지 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <IconButton onClick={() => navigate('/')} size='small' sx={{ color: '#8B5E3C' }}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BookmarkIcon sx={{ color: '#D65A31', fontSize: '1.3rem' }} />
            <Typography variant='h6' sx={{ fontWeight: 800, color: '#3E2A1E' }}>
              저장한 게시물
            </Typography>
          </Box>
        </Box>

        <Typography variant='body2' sx={{ color: '#8B5E3C', mb: 3, pl: 5.5 }}>
          총 { savedPosts.length }개의 게시물을 저장했습니다.
        </Typography>

        {/* 저장한 게시물 없을 때 */}
        {savedPosts.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <BookmarkIcon sx={{ fontSize: 56, color: 'rgba(214,90,49,0.2)' }} />
            <Typography variant='h6' sx={{ color: '#baa08a', fontWeight: 600 }}>
              저장한 게시물이 없습니다
            </Typography>
            <Typography variant='body2' sx={{ color: '#baa08a' }}>
              마음에 드는 후기를 저장해보세요!
            </Typography>
            <Button
              variant='contained'
              onClick={() => navigate('/')}
              sx={{
                mt: 1,
                background: 'linear-gradient(90deg, #D65A31, #C44536)',
                '&:hover': { background: 'linear-gradient(90deg, #C44536, #a33020)' },
                boxShadow: 'none',
                fontWeight: 700,
              }}
            >
              게시물 둘러보기
            </Button>
          </Box>
        ) : (
          /* 저장한 게시물 카드 목록 */
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {savedPosts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        )}

      </Container>
    </Box>
  );
}

export default SavedPostsPage;
