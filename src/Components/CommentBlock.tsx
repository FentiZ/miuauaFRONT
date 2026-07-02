import { useState, type ChangeEvent } from 'react';
import { Box, Button, TextField, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from 'react-i18next';

export default function CommentBlock(){
  const {t} = useTranslation("pay");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <Box sx={{ width: "100%", p: 2, pl: 0 }}>
      <Button
        variant="text"
        onClick={toggleOpen}
        endIcon={isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{
          textTransform: 'none',
          fontSize: {xs: '10px', md: "15px"},
          color: '#1976d2',
          padding: 0,
          mb: 1,
          '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
        }}
      >
        {t("comment")}
      </Button>

      {/* Блок анімації розгортання */}
      <Collapse in={isOpen}>
        <TextField
          multiline
          rows={4} 
          fullWidth
          variant="outlined"
          value={comment}
          onChange={handleTextChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
              '& fieldset': { borderColor: '#e0e0e0' },
            }
          }}
        />
      </Collapse>
    </Box>
  );
}
