import EmojiPicker from 'emoji-picker-react';
import { Box } from "@mui/material";
function EmojiPick({onEmojiClick}) {
  return (
    <Box sx={{
        position:'absolute',
        bottom:70,
        zIndex:1
    }}>
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </Box>
  );
}

export default EmojiPick;