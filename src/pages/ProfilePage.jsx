import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Header from '../components/common/Header';
import { mockPosts, currentUser } from '../data/mock-data';
import { useNavigate } from 'react-router-dom';

/**
 * ProfilePage 컴포넌트 (프로필 정보 페이지)
 *
 * Props: 없음
 *
 * Example usage:
 * <ProfilePage />
 */
function ProfilePage() {
  const navigate = useNavigate();

  /** 내가 작성한 게시물 */
  const myPosts = mockPosts.filter((post) => post.user_id === currentUser.id);

  /** 내가 저장한 게시물 */
  const savedPosts = mockPosts.filter((post) =>
    currentUser.savedPostIds.includes(post.id)
  );

  /** 가입 방식 한글 라벨 */
  const signupTypeLabel = {
    kakao: '카카오',
    google: '구글',
    email: '이메일',
    naver: '네이버',
  };

  /** 로그아웃 처리 */
  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      navigate('/login');
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#FFF8F4' }}>
      <Header userName={currentUser.name} />

      <Container maxWidth='sm' sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 3 } }}>

        {/* 페이지 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => navigate('/')} size='small' sx={{ color: '#8B5E3C' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant='h6' sx={{ fontWeight: 800, color: '#3E2A1E' }}>
              내 프로필
            </Typography>
          </Box>
          {/* 오른쪽 상단 프로필 수정 버튼 */}
          <Button
            variant='outlined'
            startIcon={<EditIcon />}
            onClick={() => navigate('/profile/edit')}
            size='small'
            sx={{
              borderColor: '#D65A31',
              color: '#D65A31',
              fontWeight: 700,
              '&:hover': { borderColor: '#C44536', bgcolor: 'rgba(214,90,49,0.05)' },
            }}
          >
            수정
          </Button>
        </Box>

        {/* 프로필 카드 */}
        <Paper
          elevation={0}
          sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(214,90,49,0.15)', bgcolor: '#fff', mb: 2.5 }}
        >
          {/* 아바타 + 이름 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 2.5 }}>
            <Avatar
              sx={{
                width: 72,
                height: 72,
                bgcolor: '#D65A31',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#fff',
              }}
            >
              { currentUser.name[0] }
            </Avatar>
            <Box>
              <Typography variant='h6' sx={{ fontWeight: 800, color: '#3E2A1E', lineHeight: 1.3 }}>
                { currentUser.name }
              </Typography>
              <Chip
                label={`${signupTypeLabel[currentUser.signup_type] || currentUser.signup_type} 로그인`}
                size='small'
                sx={{ mt: 0.5, bgcolor: '#F2E3D5', color: '#8B5E3C', fontWeight: 600, fontSize: '0.72rem', height: 22 }}
              />
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(214,90,49,0.1)', mb: 2 }} />

          {/* 이메일 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box>
              <Typography variant='caption' sx={{ color: '#8B5E3C', fontWeight: 700, display: 'block' }}>
                이메일
              </Typography>
              <Typography variant='body2' sx={{ color: '#3E2A1E' }}>
                { currentUser.email }
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* 활동 통계 */}
        <Paper
          elevation={0}
          sx={{ p: 2.5, borderRadius: 3, border: '1px solid rgba(214,90,49,0.15)', bgcolor: '#fff', mb: 2.5 }}
        >
          <Typography variant='subtitle2' sx={{ fontWeight: 700, color: '#D65A31', mb: 2 }}>
            나의 활동
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* 작성한 글 */}
            <Box
              onClick={() => navigate('/')}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                bgcolor: '#FFF8F4',
                border: '1px solid rgba(214,90,49,0.12)',
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { borderColor: '#D65A31', bgcolor: 'rgba(214,90,49,0.04)' },
                transition: 'all 0.2s',
              }}
            >
              <ArticleIcon sx={{ color: '#D65A31', fontSize: '1.8rem', mb: 0.5 }} />
              <Typography variant='h5' sx={{ fontWeight: 800, color: '#3E2A1E', lineHeight: 1 }}>
                { myPosts.length }
              </Typography>
              <Typography variant='caption' sx={{ color: '#8B5E3C', fontWeight: 600 }}>
                작성한 글
              </Typography>
            </Box>

            {/* 저장한 글 */}
            <Box
              onClick={() => navigate('/saved')}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                bgcolor: '#FFF8F4',
                border: '1px solid rgba(214,90,49,0.12)',
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { borderColor: '#D65A31', bgcolor: 'rgba(214,90,49,0.04)' },
                transition: 'all 0.2s',
              }}
            >
              <BookmarkIcon sx={{ color: '#D65A31', fontSize: '1.8rem', mb: 0.5 }} />
              <Typography variant='h5' sx={{ fontWeight: 800, color: '#3E2A1E', lineHeight: 1 }}>
                { savedPosts.length }
              </Typography>
              <Typography variant='caption' sx={{ color: '#8B5E3C', fontWeight: 600 }}>
                저장한 글
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* 로그아웃 버튼 */}
        <Button
          fullWidth
          variant='outlined'
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            py: 1.3,
            fontWeight: 700,
            borderColor: 'rgba(139,94,60,0.3)',
            color: '#8B5E3C',
            '&:hover': { borderColor: '#C44536', color: '#C44536', bgcolor: 'rgba(196,69,54,0.04)' },
          }}
        >
          로그아웃
        </Button>

      </Container>
    </Box>
  );
}

export default ProfilePage;
