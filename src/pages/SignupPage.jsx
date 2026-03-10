import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

/**
 * SignupPage 컴포넌트 (회원가입 페이지)
 *
 * Props: 없음
 *
 * Example usage:
 * <SignupPage />
 */
function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  /** 입력값 변경 핸들러 */
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  /** 회원가입 제출 - 완료 시 로그인 페이지로 이동 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('회원가입 데이터:', form);
    alert('회원가입이 완료되었습니다! 로그인해주세요.');
    navigate('/login');
  };

  /** 소셜 회원가입 처리 - 완료 시 메인으로 이동 */
  const handleSocialSignup = (provider) => {
    console.log(`${provider} 회원가입 시도`);
    navigate('/');
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': { borderColor: '#D65A31' },
      '&.Mui-focused fieldset': { borderColor: '#D65A31' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#D65A31' },
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(160deg, #FFF8F4 0%, #F2E3D5 100%)',
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth='xs'>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: '1px solid rgba(214, 90, 49, 0.15)',
            bgcolor: '#fff',
          }}
        >
          {/* 뒤로가기 + 로고 */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => navigate('/login')} size='small' sx={{ color: '#8B5E3C', mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <RestaurantIcon sx={{ color: '#D65A31', fontSize: 22 }} />
              <Typography variant='h6' sx={{ fontWeight: 900, color: '#D65A31', letterSpacing: '-0.5px' }}>
                먹증 회원가입
              </Typography>
            </Box>
          </Box>

          <Typography variant='body2' sx={{ color: '#8B5E3C', mb: 3, lineHeight: 1.6 }}>
            방문 인증 맛집 후기를 공유해보세요!
          </Typography>

          {/* 소셜 회원가입 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2.5 }}>
            <Button
              fullWidth
              variant='contained'
              onClick={() => handleSocialSignup('kakao')}
              sx={{
                bgcolor: '#FEE500',
                color: '#3E2A1E',
                fontWeight: 700,
                py: 1.2,
                '&:hover': { bgcolor: '#f0d800' },
                boxShadow: 'none',
              }}
            >
              카카오로 가입하기
            </Button>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => handleSocialSignup('google')}
              sx={{
                borderColor: '#dadce0',
                color: '#3E2A1E',
                fontWeight: 700,
                py: 1.2,
                bgcolor: '#fff',
                '&:hover': { bgcolor: '#f8f8f8', borderColor: '#D65A31' },
              }}
            >
              Google로 가입하기
            </Button>
          </Box>

          <Divider sx={{ my: 2.5 }}>
            <Typography variant='caption' sx={{ color: '#baa08a', px: 1 }}>
              또는 이메일로 가입
            </Typography>
          </Divider>

          {/* 이메일 회원가입 폼 */}
          <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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
              required
              sx={textFieldSx}
            />
            <TextField
              fullWidth
              size='small'
              label='비밀번호'
              type='password'
              value={form.password}
              onChange={handleChange('password')}
              required
              sx={textFieldSx}
            />
            <TextField
              fullWidth
              size='small'
              label='비밀번호 확인'
              type='password'
              value={form.passwordConfirm}
              onChange={handleChange('passwordConfirm')}
              required
              error={form.passwordConfirm !== '' && form.password !== form.passwordConfirm}
              helperText={
                form.passwordConfirm !== '' && form.password !== form.passwordConfirm
                  ? '비밀번호가 일치하지 않습니다.'
                  : ''
              }
              sx={textFieldSx}
            />
            <Button
              fullWidth
              type='submit'
              variant='contained'
              sx={{
                mt: 0.5,
                py: 1.3,
                background: 'linear-gradient(90deg, #D65A31, #C44536)',
                fontWeight: 700,
                fontSize: '0.95rem',
                '&:hover': { background: 'linear-gradient(90deg, #C44536, #a33020)' },
                boxShadow: 'none',
              }}
            >
              가입하기
            </Button>
          </Box>

          {/* 로그인 링크 */}
          <Box sx={{ textAlign: 'center', mt: 2.5 }}>
            <Typography variant='body2' sx={{ color: '#8B5E3C' }}>
              이미 계정이 있으신가요?{' '}
              <Box
                component='span'
                onClick={() => navigate('/login')}
                sx={{
                  color: '#D65A31',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': { color: '#C44536' },
                }}
              >
                로그인
              </Box>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignupPage;
