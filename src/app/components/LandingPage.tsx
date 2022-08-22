import { Box, Typography } from '@mui/material';
import { theme } from '../../lib/Theme';

function LandingPage() {
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100vh',
        ml: '3rem'
      }}
    >
      <Typography variant="h2" color={theme.palette.primary.main}>
        welcome to Lyric Helper!
      </Typography>
      <Typography
        variant="h5"
        color={theme.palette.secondary.main}
        sx={{
          mt: '3rem'
        }}
      >
        hover over the panel to get started
      </Typography>
    </Box>
  );
}

export default LandingPage;
