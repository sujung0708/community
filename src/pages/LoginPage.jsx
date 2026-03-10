import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';

/**
 * LoginPage 컴포넌트
 *
 * Props: 없음
 *
 * Example usage:
 * <LoginPage />
 */
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /** 이메일 로그인 처리 - 성공 시 메인 페이지로 이동 */
  const handleEmailLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  /** 소셜 로그인 처리 - 성공 시 메인 페이지로 이동 */
  const handleSocialLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
    navigate('/');
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
          {/* 로고 */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
              <RestaurantIcon sx={{ color: '#D65A31', fontSize: 36 }} />
              <Typography variant='h4' sx={{ fontWeight: 900, color: '#D65A31', letterSpacing: '-1px' }}>
                먹증
              </Typography>
            </Box>
            <Typography variant='body2' sx={{ color: '#8B5E3C', lineHeight: 1.6 }}>
              먹증은 &apos;방문 인증&apos; 후기만 모아요
            </Typography>
          </Box>

          {/* 소셜 로그인 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2.5 }}>
            <Button
              fullWidth
              variant='contained'
              onClick={() => handleSocialLogin('kakao')}
              sx={{
                bgcolor: '#FEE500',
                color: '#3E2A1E',
                fontWeight: 700,
                fontSize: '0.95rem',
                py: 1.3,
                '&:hover': { bgcolor: '#f0d800' },
                boxShadow: 'none',
              }}
            >
              카카오로 시작하기
            </Button>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => handleSocialLogin('google')}
              sx={{
                borderColor: '#dadce0',
                color: '#3E2A1E',
                fontWeight: 700,
                fontSize: '0.95rem',
                py: 1.3,
                bgcolor: '#fff',
                '&:hover': { bgcolor: '#f8f8f8', borderColor: '#D65A31' },
              }}
            >
              Google로 시작하기
            </Button>
          </Box>

          <Divider sx={{ my: 2.5 }}>
            <Typography variant='caption' sx={{ color: '#baa08a', px: 1 }}>
              또는 이메일로 로그인
            </Typography>
          </Divider>

          {/* 이메일 로그인 폼 */}
          <Box component='form' onSubmit={handleEmailLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TextField
              fullWidth
              size='small'
              label='이메일'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#D65A31' },
                  '&.Mui-focused fieldset': { borderColor: '#D65A31' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#D65A31' },
              }}
            />
            <TextField
              fullWidth
              size='small'
              label='비밀번호'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#D65A31' },
                  '&.Mui-focused fieldset': { borderColor: '#D65A31' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#D65A31' },
              }}
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
              로그인
            </Button>
          </Box>

          {/* 회원가입 링크 */}
          <Box sx={{ textAlign: 'center', mt: 2.5 }}>
            <Typography variant='body2' sx={{ color: '#8B5E3C' }}>
              아직 계정이 없으신가요?{' '}
              <Box
                component='span'
                onClick={() => navigate('/signup')}
                sx={{
                  color: '#D65A31',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': { color: '#C44536' },
                }}
              >
                회원가입
              </Box>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
