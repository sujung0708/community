import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';

/**
 * Header 컴포넌트 (공통 상단 네비게이션)
 *
 * Props:
 * @param {string} userName - 로그인된 사용자 이름 [Optional, 기본값: '김먹방']
 *
 * Example usage:
 * <Header userName="김먹방" />
 */
function Header({ userName = '김먹방' }) {
  const navigate = useNavigate();
  const location = useLocation();

  /** 현재 경로와 비교해 활성 여부 반환 */
  const isActive = (path) => location.pathname === path;

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
        {/* 로고 - 클릭 시 메인 목록으로 이동 */}
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

        {/* 우측 액션 버튼 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>

          {/* 게시물 작성 버튼 */}
          <Tooltip title='게시물 작성'>
            <IconButton onClick={() => navigate('/write')} sx={{ color: '#fff' }}>
              {isActive('/write')
                ? <AddCircleIcon sx={{ color: '#F79D65' }} />
                : <AddCircleOutlineIcon />
              }
            </IconButton>
          </Tooltip>

          {/* 저장한 게시물 버튼 */}
          <Tooltip title='저장한 게시물'>
            <IconButton onClick={() => navigate('/saved')} sx={{ color: '#fff' }}>
              {isActive('/saved')
                ? <BookmarkIcon sx={{ color: '#F79D65' }} />
                : <BookmarkBorderIcon />
              }
            </IconButton>
          </Tooltip>

          {/* 프로필 아바타 - 클릭 시 프로필 페이지 이동 */}
          <Tooltip title='내 프로필'>
            <Avatar
              onClick={() => navigate('/profile')}
              sx={{
                width: 32,
                height: 32,
                ml: 0.5,
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 700,
                bgcolor: isActive('/profile') ? '#fff' : '#F79D65',
                color: isActive('/profile') ? '#D65A31' : '#3E2A1E',
                border: isActive('/profile') ? '2px solid #fff' : 'none',
                transition: 'all 0.2s',
              }}
            >
              { userName ? userName[0] : 'U' }
            </Avatar>
          </Tooltip>

        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
