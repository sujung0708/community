import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

/**
 * Header 컴포넌트 (공통 상단 네비게이션)
 *
 * Props:
 * @param {string} userName - 로그인된 사용자 이름 [Optional]
 *
 * Example usage:
 * <Header userName="김먹방" />
 */
function Header({ userName = '김먹방' }) {
  const navigate = useNavigate();

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        background: 'linear-gradient(90deg, #D65A31 0%, #C44536 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
        {/* 로고 */}
        <Box
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flexGrow: 1 }}
        >
          <RestaurantIcon sx={{ color: '#F79D65', fontSize: 28 }} />
          <Typography
            variant='h6'
            sx={{ fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', fontSize: { xs: '1.1rem', md: '1.3rem' } }}
          >
            먹증
          </Typography>
          <Typography
            variant='caption'
            sx={{ color: 'rgba(255,255,255,0.7)', display: { xs: 'none', sm: 'block' }, ml: 0.5 }}
          >
            방문 인증 맛집 커뮤니티
          </Typography>
        </Box>

        {/* 우측 액션 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton sx={{ color: '#fff' }} title='게시물 작성'>
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton sx={{ color: '#fff' }} title='북마크'>
            <BookmarkBorderIcon />
          </IconButton>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#F79D65',
              color: '#3E2A1E',
              fontSize: '0.8rem',
              fontWeight: 700,
              ml: 0.5,
              cursor: 'pointer',
            }}
          >
            { userName ? userName[0] : 'U' }
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
