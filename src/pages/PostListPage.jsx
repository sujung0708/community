import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Header from '../components/common/Header';
import PostCard from '../components/ui/PostCard';
import { mockPosts, currentUser } from '../data/mock-data';

/**
 * PostListPage 컴포넌트 (게시물 목록 페이지)
 *
 * Props: 없음
 *
 * Example usage:
 * <PostListPage />
 */
function PostListPage() {
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  const handleCertifiedToggle = (_, value) => {
    if (value !== null) setCertifiedOnly(value === 'certified');
  };

  const filteredPosts = mockPosts
    .filter((post) => (certifiedOnly ? post.verification_type : true))
    .sort((a, b) => {
      if (sortBy === 'popular') return b.revisit_count - a.revisit_count;
      return new Date(b.created_at) - new Date(a.created_at);
    });

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#FFF8F4' }}>
      <Header userName={currentUser.name} />

      <Container maxWidth='lg' sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 3 } }}>
        {/* 페이지 타이틀 */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant='h5'
            sx={{ fontWeight: 800, color: '#3E2A1E', mb: 0.5, fontSize: { xs: '1.3rem', md: '1.6rem' } }}
          >
            방문 인증 맛집 모음
          </Typography>
          <Typography variant='body2' sx={{ color: '#8B5E3C' }}>
            직접 방문하고 인증한 후기만 모아요
          </Typography>
        </Box>

        {/* 필터 영역 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 1.5 }}>
          {/* 인증글만 토글 */}
          <ToggleButtonGroup
            value={certifiedOnly ? 'certified' : 'all'}
            exclusive
            onChange={handleCertifiedToggle}
            size='small'
            sx={{
              '& .MuiToggleButton-root': {
                border: '1px solid rgba(214,90,49,0.3)',
                color: '#8B5E3C',
                fontWeight: 600,
                fontSize: '0.8rem',
                px: 2,
                '&.Mui-selected': {
                  bgcolor: '#D65A31',
                  color: '#fff',
                  borderColor: '#D65A31',
                  '&:hover': { bgcolor: '#C44536' },
                },
                '&:hover': { borderColor: '#D65A31' },
              },
            }}
          >
            <ToggleButton value='all'>전체</ToggleButton>
            <ToggleButton value='certified'>인증글만</ToggleButton>
          </ToggleButtonGroup>

          {/* 정렬 드롭다운 */}
          <FormControl size='small'>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{
                fontSize: '0.85rem',
                color: '#8B5E3C',
                minWidth: 110,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(139,94,60,0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D65A31' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D65A31' },
              }}
            >
              <MenuItem value='latest'>최신순</MenuItem>
              <MenuItem value='popular'>인기순</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* 게시물 카드 그리드 */}
        {filteredPosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant='body1' sx={{ color: '#baa08a' }}>
              게시물이 없습니다.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {filteredPosts.map((post) => (
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

export default PostListPage;
