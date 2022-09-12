import { Box, CircularProgress, Modal, Stack, Typography } from '@mui/material';
import './LoaderOverlay.css';
import * as React from 'react';
import { theme } from '../../../../lib/Theme';

function LoaderOverlay() {
  return (
    <Modal className="loader-bg" open={true}>
      <Box className="loader-content">
        <Stack sx={{ color: theme.palette.primary.main }} spacing={0}>
          <CircularProgress className={'loader-spinner'} color={'inherit'} />
        </Stack>
        <Typography variant="body1">give it a second... it&apos;s going through space</Typography>
      </Box>
    </Modal>
  );
}

export default LoaderOverlay;
