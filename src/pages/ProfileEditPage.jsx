import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Header from '../components/common/Header';
import { currentUser } from '../data/mock-data';
import { useNavigate } from 'react-router-dom';

/**
 * ProfileEditPage 컴포넌트 (프로필 수정 페이지)
 *
 * Props: 없음
 *
 * Example usage:
 * <ProfileEditPage />
 */
function ProfileEditPage() {
  const navigate = useNavigate();

  /** 수정 폼 상태 (현재 사용자 정보로 초기화) */
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  /** 프로필 이미지 미리보기 (실제 업로드는 백엔드 연동 시 구현) */
  const [avatarPreview, setAvatarPreview] = useState(null);

  /** 입력값 변경 핸들러 */
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  /** 프로필 이미지 선택 핸들러 */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  /** 저장 - 프로필 페이지로 이동 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert('이름(닉네임)을 입력해주세요.');
      return;
    }
    console.log('수정 데이터:', form);
    alert('프로필이 수정되었습니다!');
    navigate('/profile');
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: '#fff',
      '&:hover fieldset': { borderColor: '#D65A31' },
      '&.Mui-focused fieldset': { borderColor: '#D65A31' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#D65A31' },
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#FFF8F4' }}>
      <Header userName={currentUser.name} />

      <Container maxWidth='sm' sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 3 } }}>

        {/* 페이지 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <IconButton onClick={() => navigate('/profile')} size='small' sx={{ color: '#8B5E3C' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' sx={{ fontWeight: 800, color: '#3E2A1E' }}>
            프로필 수정
          </Typography>
        </Box>

        <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

          {/* 프로필 이미지 수정 */}
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(214,90,49,0.15)', bgcolor: '#fff', textAlign: 'center' }}
          >
            <Typography variant='subtitle2' sx={{ fontWeight: 700, color: '#D65A31', mb: 2, textAlign: 'left' }}>
              프로필 사진
            </Typography>

            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src={avatarPreview || undefined}
                sx={{
                  width: 90,
                  height: 90,
                  bgcolor: '#D65A31',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#fff',
                }}
              >
                { !avatarPreview && currentUser.name[0] }
              </Avatar>

              {/* 카메라 아이콘 (이미지 변경 버튼) */}
              <Box
                component='label'
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 28,
                  height: 28,
                  bgcolor: '#D65A31',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '2px solid #fff',
                  '&:hover': { bgcolor: '#C44536' },
                }}
              >
                <CameraAltIcon sx={{ fontSize: '0.9rem', color: '#fff' }} />
                <input type='file' accept='image/*' hidden onChange={handleAvatarChange} />
              </Box>
            </Box>

            <Typography variant='caption' sx={{ color: '#baa08a', display: 'block', mt: 1.5 }}>
              카메라 아이콘을 눌러 사진을 변경하세요
            </Typography>
          </Paper>

          {/* 기본 정보 수정 */}
          <Paper
            elevation={0}
            sx={{ p: 2.5, borderRadius: 2, border: '1px solid rgba(214,90,49,0.15)', bgcolor: '#fff' }}
          >
            <Typography variant='subtitle2' sx={{ fontWeight: 700, color: '#D65A31', mb: 2 }}>
              기본 정보
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                size='small'
                label='이름 (닉네임)'
                value={form.name}
                onChange={handleChange('name')}
                required
                sx={textFieldSx}
              />
              <TextField
                fullWidth
                size='small'
                label='이메일'
                type='email'
                value={form.email}
                onChange={handleChange('email')}
                sx={textFieldSx}
              />
            </Box>
          </Paper>

          {/* 하단 버튼 */}
          <Box sx={{ display: 'flex', gap: 1.5, pb: 4 }}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => navigate('/profile')}
              sx={{
                py: 1.3,
                fontWeight: 700,
                borderColor: 'rgba(139,94,60,0.3)',
                color: '#8B5E3C',
                '&:hover': { borderColor: '#8B5E3C' },
              }}
            >
              취소
            </Button>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              sx={{
                py: 1.3,
                fontWeight: 700,
                background: 'linear-gradient(90deg, #D65A31, #C44536)',
                '&:hover': { background: 'linear-gradient(90deg, #C44536, #a33020)' },
                boxShadow: 'none',
              }}
            >
              저장하기
            </Button>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}

export default ProfileEditPage;
