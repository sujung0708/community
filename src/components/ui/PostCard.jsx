import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import ReplayIcon from '@mui/icons-material/Replay';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';

/**
 * PostCard 컴포넌트 (게시물 목록 카드)
 *
 * Props:
 * @param {object} post - 게시물 데이터 객체 [Required]
 * @param {number} post.id - 게시물 ID
 * @param {string} post.store_name - 가게명
 * @param {string} post.summary_text - 한줄평
 * @param {string} post.visit_date - 방문일
 * @param {string} post.verification_type - 인증 방식 (receipt | location)
 * @param {boolean} post.is_revisit - 재방문 여부
 * @param {number} post.revisit_count - 재방문 카운트
 * @param {number} post.bookmark_count - 북마크 카운트
 * @param {string} post.user_name - 작성자 이름
 * @param {Array} post.images - 사진 배열
 *
 * Example usage:
 * <PostCard post={postData} />
 */
function PostCard({ post }) {
  const navigate = useNavigate();
  const thumbnail = post.images?.find((img) => img.is_thumbnail) || post.images?.[0];

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: '#F2E3D5',
        border: '1px solid rgba(214, 90, 49, 0.15)',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 24px rgba(214, 90, 49, 0.15)',
          borderColor: '#D65A31',
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/post/${post.id}`)}>
        {/* 대표 사진 */}
        {thumbnail && (
          <Box sx={{ position: 'relative' }}>
            <Box
              component='img'
              src={thumbnail.image_url}
              alt={post.store_name}
              sx={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* 방문 인증 배지 */}
            <Chip
              icon={<VerifiedIcon sx={{ fontSize: '0.9rem !important' }} />}
              label='방문 인증'
              size='small'
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: 'linear-gradient(90deg, #D65A31, #F79D65)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.7rem',
                height: 24,
              }}
            />
            {/* 재방문 배지 */}
            {post.is_revisit && (
              <Chip
                icon={<ReplayIcon sx={{ fontSize: '0.8rem !important' }} />}
                label={`재방문 ${post.revisit_count}`}
                size='small'
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  bgcolor: 'rgba(62, 42, 30, 0.75)',
                  color: '#F79D65',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 24,
                  backdropFilter: 'blur(4px)',
                }}
              />
            )}
          </Box>
        )}

        <CardContent sx={{ p: 2 }}>
          {/* 가게명 */}
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 700, color: '#3E2A1E', mb: 0.5, fontSize: '1rem', lineHeight: 1.3 }}
          >
            { post.store_name }
          </Typography>

          {/* 한줄평 */}
          <Typography
            variant='body2'
            sx={{
              color: '#8B5E3C',
              mb: 1.5,
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            { post.summary_text }
          </Typography>

          {/* 하단 메타 정보 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 22, height: 22, bgcolor: '#D65A31', fontSize: '0.65rem', fontWeight: 700 }}>
                { post.user_name?.[0] }
              </Avatar>
              <Typography variant='caption' sx={{ color: '#8B5E3C', fontWeight: 600 }}>
                { post.user_name }
              </Typography>
              <Typography variant='caption' sx={{ color: '#baa08a' }}>
                · { post.visit_date }
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <BookmarkBorderIcon sx={{ fontSize: '0.9rem', color: '#baa08a' }} />
              <Typography variant='caption' sx={{ color: '#baa08a' }}>
                { post.bookmark_count }
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PostCard;
