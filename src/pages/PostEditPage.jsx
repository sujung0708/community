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
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import { currentUser } from '../data/mock-data';

/**
 * PostEditPage 컴포넌트 (게시물 수정 페이지)
 * 기존 게시물 데이터를 폼에 미리 채워서 수정할 수 있습니다.
 *
 * Props: 없음 (useParams로 post id를 가져옴)
 *
 * Example usage:
 * <PostEditPage />
 */
function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost } = usePosts();

  /** Context에서 수정할 게시물 조회 (id 타입: string → Number 변환) */
  const post = posts.find((p) => p.id === Number(id));

  /** 게시물이 없거나 본인 글이 아니면 접근 차단 */
  if (!post || post.user_id !== currentUser.id) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#FFF8F4' }}>
        <Header userName={currentUser.name} />
        <Container maxWidth='md' sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant='h6' sx={{ color: '#8B5E3C' }}>수정 권한이 없습니다.</Typography>
          <Button onClick={() => navigate('/')} sx={{ mt: 2, color: '#D65A31' }}>목록으로</Button>
        </Container>
      </Box>
    );
  }

  /** 폼 상태 - 기존 게시물 데이터로 초기화 */
  const [form, setForm] = useState({
    store_name: post.store_name,
    visit_date: post.visit_date,
    verification_type: post.verification_type,
    summary_text: post.summary_text,
    content: post.content || '',
    menu_text: post.menu_text || '',
    price_text: post.price_text || '',
    atmosphere_text: post.atmosphere_text || '',
    final_comment: post.final_comment || '',
  });

  /** 기존 이미지 목록 (url 문자열 배열로 변환) */
  const existingImageUrls = post.images?.map((img) => img.image_url) || [];
  const [previewImages, setPreviewImages] = useState(existingImageUrls);

  /** 입력값 변경 핸들러 */
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  /** 인증 방식 변경 핸들러 */
  const handleVerificationChange = (_, value) => {
    if (value !== null) setForm((prev) => ({ ...prev, verification_type: value }));
  };

  /** 사진 추가 핸들러 (최대 5장) */
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

  /** 이미지 삭제 핸들러 */
  const handleImageRemove = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  /** 수정 완료 - updatePost 호출 후 상세 페이지로 이동 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.store_name || !form.visit_date || !form.summary_text) {
      alert('가게명, 방문일, 한줄평은 필수 입력 항목입니다.');
      return;
    }

    /** 기존 게시물 데이터를 유지하면서 수정된 필드만 덮어씀 */
    const updatedPost = {
      ...post,
      store_name: form.store_name,
      visit_date: form.visit_date,
      verification_type: form.verification_type,
      summary_text: form.summary_text,
      content: form.content,
      menu_text: form.menu_text,
      price_text: form.price_text,
      atmosphere_text: form.atmosphere_text,
      final_comment: form.final_comment,
      images: previewImages.map((url, idx) => ({
        id: Date.now() + idx,
        image_url: url,
        sort_order: idx + 1,
        is_thumbnail: idx === 0,
      })),
    };

    /** Context의 updatePost 호출 → 목록 + 상세 페이지 즉시 반영 */
    updatePost(updatedPost);
    navigate(`/post/${post.id}`);
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
          <IconButton onClick={() => navigate(`/post/${post.id}`)} size='small' sx={{ color: '#8B5E3C' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' sx={{ fontWeight: 800, color: '#3E2A1E' }}>
            방문 후기 수정
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
                inputProps={{ maxLength: 60 }}
                helperText={`${form.summary_text.length}/60`}
                sx={textFieldSx}
              />
            </Box>
          </Paper>

          {/* 사진 섹션 */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: '1px solid rgba(214,90,49,0.15)', bgcolor: '#fff' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 700, color: '#D65A31', mb: 1.5 }}>
              사진 <Typography component='span' variant='caption' sx={{ color: '#baa08a' }}>(최대 5장)</Typography>
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {previewImages.map((src, idx) => (
                <Box key={idx} sx={{ position: 'relative', width: 80, height: 80 }}>
                  <Box
                    component='img'
                    src={src}
                    alt={`사진 ${idx + 1}`}
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
                  <input type='file' accept='image/*' multiple hidden onChange={handleImageChange} />
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
              <TextField fullWidth size='small' label='메뉴' value={form.menu_text} onChange={handleChange('menu_text')} sx={textFieldSx} />
              <TextField fullWidth size='small' label='가격' value={form.price_text} onChange={handleChange('price_text')} sx={textFieldSx} />
              <TextField fullWidth size='small' label='분위기' value={form.atmosphere_text} onChange={handleChange('atmosphere_text')} sx={textFieldSx} />
              <TextField fullWidth size='small' label='한줄 총평' value={form.final_comment} onChange={handleChange('final_comment')} sx={textFieldSx} />
              <Divider sx={{ borderColor: 'rgba(214,90,49,0.1)' }} />
              <TextField
                fullWidth
                label='후기 본문'
                multiline
                minRows={4}
                maxRows={10}
                value={form.content}
                onChange={handleChange('content')}
                sx={textFieldSx}
              />
            </Box>
          </Paper>

          {/* 하단 버튼 */}
          <Box sx={{ display: 'flex', gap: 1.5, pb: 4 }}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => navigate(`/post/${post.id}`)}
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
              수정 완료
            </Button>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}

export default PostEditPage;
