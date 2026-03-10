import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';

/**
 * PhotoGallery 컴포넌트 (사진 슬라이더 + 썸네일 그리드)
 *
 * Props:
 * @param {Array} images - 사진 배열 [Required]
 *   - image_url: string
 *   - sort_order: number
 *   - is_thumbnail: boolean
 *
 * Example usage:
 * <PhotoGallery images={post.images} />
 */
function PhotoGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) return null;

  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? sorted.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === sorted.length - 1 ? 0 : prev + 1));

  return (
    <Box sx={{ mb: 3 }}>
      {/* 메인 슬라이더 */}
      <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
        <Box
          component='img'
          src={sorted[currentIndex].image_url}
          alt={`사진 ${currentIndex + 1}`}
          sx={{ width: '100%', height: { xs: 220, md: 360 }, objectFit: 'cover', display: 'block' }}
        />

        {sorted.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                bgcolor: 'rgba(62,42,30,0.6)', color: '#fff',
                '&:hover': { bgcolor: 'rgba(62,42,30,0.85)' },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                bgcolor: 'rgba(62,42,30,0.6)', color: '#fff',
                '&:hover': { bgcolor: 'rgba(62,42,30,0.85)' },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
            <Box
              sx={{
                position: 'absolute', bottom: 10, right: 12,
                bgcolor: 'rgba(62,42,30,0.65)', borderRadius: 2,
                px: 1, py: 0.3,
              }}
            >
              <Typography variant='caption' sx={{ color: '#fff', fontWeight: 600 }}>
                { currentIndex + 1 } / { sorted.length }
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {/* 썸네일 */}
      {sorted.length > 1 && (
        <Box sx={{ display: 'flex', gap: 1, mt: 1.5, overflowX: 'auto', pb: 0.5 }}>
          {sorted.map((img, idx) => (
            <Box
              key={img.id || idx}
              component='img'
              src={img.image_url}
              alt={`썸네일 ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              sx={{
                width: 64, height: 64, objectFit: 'cover', borderRadius: 1.5,
                cursor: 'pointer', flexShrink: 0,
                border: currentIndex === idx ? '2.5px solid #D65A31' : '2.5px solid transparent',
                opacity: currentIndex === idx ? 1 : 0.65,
                transition: 'all 0.15s',
                '&:hover': { opacity: 1 },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default PhotoGallery;
