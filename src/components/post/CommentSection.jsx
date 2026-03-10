import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

/**
 * CommentSection 컴포넌트 (댓글 목록 + 작성)
 *
 * Props:
 * @param {Array} comments - 댓글 목록 [Required]
 * @param {string} currentUserName - 현재 로그인 사용자 이름 [Optional]
 *
 * Example usage:
 * <CommentSection comments={mockComments} currentUserName="김먹방" />
 */
function CommentSection({ comments = [], currentUserName = '김먹방' }) {
  const [sortBy, setSortBy] = useState('latest');
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState({});
  const [commentList, setCommentList] = useState(comments);
  const [reportAnchor, setReportAnchor] = useState(null);
  const [reportingCommentId, setReportingCommentId] = useState(null);

  const sortedComments = [...commentList].sort((a, b) => {
    if (sortBy === 'popular') return b.like_count - a.like_count;
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const handleLike = (commentId) => {
    setLikedComments((prev) => {
      const isLiked = prev[commentId];
      setCommentList((prevList) =>
        prevList.map((c) =>
          c.id === commentId ? { ...c, like_count: c.like_count + (isLiked ? -1 : 1) } : c
        )
      );
      return { ...prev, [commentId]: !isLiked };
    });
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      post_id: 1,
      user_name: currentUserName,
      content: newComment.trim(),
      like_count: 0,
      is_author: false,
      created_at: new Date().toISOString(),
    };
    setCommentList((prev) => [comment, ...prev]);
    setNewComment('');
  };

  const handleReportOpen = (event, commentId) => {
    setReportAnchor(event.currentTarget);
    setReportingCommentId(commentId);
  };

  const handleReportClose = () => {
    setReportAnchor(null);
    setReportingCommentId(null);
  };

  const reportReasons = [
    { value: 'ad', label: '광고' },
    { value: 'abuse', label: '욕설' },
    { value: 'false_info', label: '허위' },
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <Box>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant='h6' sx={{ fontWeight: 700, color: '#3E2A1E', fontSize: '1rem' }}>
          댓글 { commentList.length }
        </Typography>
        <FormControl size='small'>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              fontSize: '0.8rem', color: '#8B5E3C',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(139,94,60,0.3)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D65A31' },
            }}
          >
            <MenuItem value='latest'>최신순</MenuItem>
            <MenuItem value='popular'>인기순</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 댓글 작성 */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: '#D65A31', fontSize: '0.8rem', fontWeight: 700, mt: 0.5 }}>
          { currentUserName[0] }
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            placeholder='댓글을 입력하세요...'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            size='small'
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#FFF8F4',
                fontSize: '0.9rem',
                '&:hover fieldset': { borderColor: '#D65A31' },
                '&.Mui-focused fieldset': { borderColor: '#D65A31' },
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              variant='contained'
              size='small'
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              sx={{
                bgcolor: '#D65A31',
                '&:hover': { bgcolor: '#C44536' },
                '&:disabled': { bgcolor: '#e0c4b8' },
              }}
            >
              등록
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(214,90,49,0.15)', mb: 2 }} />

      {/* 댓글 목록 */}
      {sortedComments.length === 0 ? (
        <Typography variant='body2' sx={{ color: '#baa08a', textAlign: 'center', py: 4 }}>
          첫 번째 댓글을 남겨보세요!
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {sortedComments.map((comment) => (
            <Box key={comment.id}>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Avatar sx={{ width: 34, height: 34, bgcolor: comment.is_author ? '#D65A31' : '#8B5E3C', fontSize: '0.75rem', fontWeight: 700, mt: 0.3 }}>
                  { comment.user_name?.[0] }
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant='caption' sx={{ fontWeight: 700, color: '#3E2A1E' }}>
                      { comment.user_name }
                    </Typography>
                    {comment.is_author && (
                      <Chip label='작성자' size='small' sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#D65A31', color: '#fff', fontWeight: 700 }} />
                    )}
                    <Typography variant='caption' sx={{ color: '#baa08a', ml: 'auto' }}>
                      { formatDate(comment.created_at) }
                    </Typography>
                  </Box>
                  <Typography variant='body2' sx={{ color: '#3E2A1E', lineHeight: 1.6, mb: 1 }}>
                    { comment.content }
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size='small' onClick={() => handleLike(comment.id)} sx={{ p: 0.5 }}>
                      {likedComments[comment.id]
                        ? <ThumbUpIcon sx={{ fontSize: '0.95rem', color: '#D65A31' }} />
                        : <ThumbUpOutlinedIcon sx={{ fontSize: '0.95rem', color: '#baa08a' }} />
                      }
                    </IconButton>
                    <Typography variant='caption' sx={{ color: likedComments[comment.id] ? '#D65A31' : '#baa08a', fontWeight: likedComments[comment.id] ? 700 : 400 }}>
                      공감 { comment.like_count }
                    </Typography>
                    <IconButton size='small' onClick={(e) => handleReportOpen(e, comment.id)} sx={{ p: 0.5, ml: 'auto' }}>
                      <FlagOutlinedIcon sx={{ fontSize: '0.95rem', color: '#baa08a' }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* 신고 메뉴 */}
      <Menu anchorEl={reportAnchor} open={Boolean(reportAnchor)} onClose={handleReportClose}>
        <Typography variant='caption' sx={{ px: 2, py: 0.5, color: '#8B5E3C', fontWeight: 700, display: 'block' }}>
          신고 사유 선택
        </Typography>
        {reportReasons.map((reason) => (
          <MenuItem key={reason.value} onClick={handleReportClose} sx={{ fontSize: '0.85rem', color: '#3E2A1E' }}>
            { reason.label }
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default CommentSection;
