import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/common/Header';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import { currentUser } from '../data/mock-data';

/**
 * PostWritePage 컴포넌트 (게시물 작성 페이지)
 *
 * Props: 없음
 *
 * Example usage:
 * <PostWritePage />
 */
function PostWritePage() {
  const navigate = useNavigate();

  /** Context에서 addPost 함수를 가져옴 */
  const { addPost } = usePosts();

  /** 폼 입력 상태 */
  const [form, setForm] = useState({
    store_name: '',
    visit_date: '',
    verification_type: 'receipt',
    summary_text: '',
    content: '',
    menu_text: '',
    price_text: '',
    atmosphere_text: '',
    final_comment: '',
  });

  /** 미리보기 이미지 목록 (최대 5장) */
  const [previewImages, setPreviewImages] = useState([]);

  /** 입력값 변경 핸들러 */
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  /** 인증 방식 변경 핸들러 */
  const handleVerificationChange = (_, value) => {
    if (value !== null) setForm((prev) => ({ ...prev, verification_type: value }));
  };

  /** 사진 선택 핸들러 (최대 5장, 미리보기만) */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 5 - previewImages.length;
    const selected = files.slice(0, remaining);

    selected.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewImages((prev) => [...prev, ev.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  /** 미리보기 이미지 삭제 */
  const handleImageRemove = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  /** 작성 완료 - 새 게시물을 Context에 추가 후 메인 페이지로 이동 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.store_name || !form.visit_date || !form.summary_text) {
      alert('가게명, 방문일, 한줄평은 필수 입력 항목입니다.');
      return;
    }

    /** 새 게시물 객체 생성 (DB 구조와 동일한 형태) */
    const newPost = {
      id: Date.now(),
      user_id: currentUser.id,
      user_name: currentUser.name,
      store_name: form.store_name,
      summary_text: form.summary_text,
      content: form.content,
      visit_date: form.visit_date,
      verification_type: form.verification_type,
      menu_text: form.menu_text,
      price_text: form.price_text,
      atmosphere_text: form.atmosphere_text,
      final_comment: form.final_comment,
      is_revisit: false,
      revisit_count: 0,
      bookmark_count: 0,
      /** 선택한 사진을 이미지 배열 형태로 변환 */
      images: previewImages.map((url, idx) => ({
        id: Date.now() + idx,
        image_url: url,
        sort_order: idx + 1,
        is_thumbnail: idx === 0,
      })),
      created_at: new Date().toISOString(),
    };

    /** Context의 addPost 호출 → PostListPage 즉시 반영 */
    addPost(newPost);
    navigate('/');
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

      <Container maxWidth='md' sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>

        {/* 페이지 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <IconButton onClick={() => navigate('/')} size='small' sx={{ color: '#8B5E3C' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' sx={{ fontWeight: 800, color: '#3E2A1E' }}>
            방문 후기 작성
          </Typography>
        </Box>

        <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

          {/* 기본 정보 섹션 */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: '1px solid rgba(214,90,49,0.15)', bgcolor: '#fff' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 700, color: '#D65A31', mb: 2 }}>
              기본 정보 <Typography component='span' variant='caption' sx={{ color: '#baa08a' }}>(* 필수)</Typography>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              <TextField
                fullWidth
                size='small'
                label='가게명 *'
                value={form.store_name}
                onChange={handleChange('store_name')}
                placeholder='예: 을지로 노가리집'
                sx={textFieldSx}
              />

              <TextField
                fullWidth
                size='small'
                label='방문일 *'
                type='date'
                value={form.visit_date}
                onChange={handleChange('visit_date')}
                InputLabelProps={{ shrink: true }}
                sx={textFieldSx}
              />

              {/* 인증 방식 선택 */}
              <Box>
                <Typography variant='caption' sx={{ color: '#8B5E3C', fontWeight: 600, display: 'block', mb: 1 }}>
                  인증 방식 *
                </Typography>
                <ToggleButtonGroup
                  value={form.verification_type}
                  exclusive
                  onChange={handleVerificationChange}
                  size='small'
                  sx={{
                    '& .MuiToggleButton-root': {
                      border: '1px solid rgba(214,90,49,0.3)',
                      color: '#8B5E3C',
                      fontWeight: 600,
                      px: 2.5,
                      gap: 0.5,
                      '&.Mui-selected': {
                        bgcolor: '#D65A31',
                        color: '#fff',
                        borderColor: '#D65A31',
                        '&:hover': { bgcolor: '#C44536' },
                      },
                    },
                  }}
                >
                  <ToggleButton value='receipt'>
                    <ReceiptLongIcon sx={{ fontSize: '1rem' }} />
                    영수증 인증
                  </ToggleButton>
                  <ToggleButton value='location'>
                    <LocationOnIcon sx={{ fontSize: '1rem' }} />
                    위치 인증
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <TextField
                fullWidth
                size='small'
                label='한줄평 *'
                value={form.summary_text}
                onChange={handleChange('summary_text')}
                placeholder='예: 진짜 레전드 노가리, 맥주 한잔하기 딱 좋아요!'
                inputProps={{ maxLength: 60 }}
                helperText={`${form.summary_text.length}/60`}
                sx={textFieldSx}
              />
            </Box>
          </Paper>

          {/* 사진 업로드 섹션 */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: '1px solid rgba(214,90,49,0.15)', bgcolor: '#fff' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 700, color: '#D65A31', mb: 1.5 }}>
              사진 첨부 <Typography component='span' variant='caption' sx={{ color: '#baa08a' }}>(최대 5장)</Typography>
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {/* 미리보기 이미지 */}
              {previewImages.map((src, idx) => (
                <Box key={idx} sx={{ position: 'relative', width: 80, height: 80 }}>
                  <Box
                    component='img'
                    src={src}
                    alt={`미리보기 ${idx + 1}`}
                    sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1.5 }}
                  />
                  <IconButton
                    size='small'
                    onClick={() => handleImageRemove(idx)}
                    sx={{
                      position: 'absolute', top: -6, right: -6,
                      bgcolor: '#C44536', color: '#fff', width: 20, height: 20,
                      '&:hover': { bgcolor: '#a33020' },
                    }}
                  >
                    <CloseIcon sx={{ fontSize: '0.75rem' }} />
                  </IconButton>
                </Box>
              ))}

              {/* 사진 추가 버튼 */}
              {previewImages.length < 5 && (
                <Box
                  component='label'
                  sx={{
                    width: 80, height: 80,
                    border: '2px dashed rgba(214,90,49,0.35)',
                    borderRadius: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#D65A31',
                    '&:hover': { bgcolor: 'rgba(214,90,49,0.05)', borderColor: '#D65A31' },
                  }}
                >
                  <AddPhotoAlternateIcon sx={{ fontSize: '1.5rem' }} />
                  <Typography variant='caption' sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                    사진 추가
                  </Typography>
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    hidden
                    onChange={handleImageChange}
                  />
                </Box>
              )}
            </Box>
          </Paper>

          {/* 후기 상세 섹션 */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: '1px solid rgba(214,90,49,0.15)', bgcolor: '#fff' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 700, color: '#D65A31', mb: 2 }}>
              후기 상세 <Typography component='span' variant='caption' sx={{ color: '#baa08a' }}>(선택)</Typography>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField fullWidth size='small' label='메뉴' value={form.menu_text} onChange={handleChange('menu_text')} placeholder='예: 노가리 2마리, 생맥주 500cc' sx={textFieldSx} />
              <TextField fullWidth size='small' label='가격' value={form.price_text} onChange={handleChange('price_text')} placeholder='예: 2인 약 18,000원' sx={textFieldSx} />
              <TextField fullWidth size='small' label='분위기' value={form.atmosphere_text} onChange={handleChange('atmosphere_text')} placeholder='예: 복고풍 실내, 시끌벅적한 분위기' sx={textFieldSx} />
              <TextField fullWidth size='small' label='한줄 총평' value={form.final_comment} onChange={handleChange('final_comment')} placeholder='예: 서울에서 이런 분위기 없어요. 꼭 가보세요.' sx={textFieldSx} />

              <Divider sx={{ borderColor: 'rgba(214,90,49,0.1)' }} />

              <TextField
                fullWidth
                label='후기 본문'
                multiline
                minRows={4}
                maxRows={10}
                value={form.content}
                onChange={handleChange('content')}
                placeholder='방문 경험을 자유롭게 작성해주세요.'
                sx={textFieldSx}
              />
            </Box>
          </Paper>

          {/* 하단 버튼 */}
          <Box sx={{ display: 'flex', gap: 1.5, pb: 4 }}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => navigate('/')}
              sx={{ py: 1.3, fontWeight: 700, borderColor: 'rgba(139,94,60,0.3)', color: '#8B5E3C', '&:hover': { borderColor: '#8B5E3C' } }}
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
              작성 완료
            </Button>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}

export default PostWritePage;
