import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Map from './Map';
import InfoSection from './InfoSection';

import { GlobalStateProvider } from './context/GlobalState';

import './assets/scss/DefaultTheme.scss';

function App() {
  return (
    <Grid container>
      <GlobalStateProvider>
        <Grid item md={4}>
          <Box display={{ xs: 'none', md: 'block' }} m={1}>
            <InfoSection />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </GlobalStateProvider>
    </Grid>
  );
}

export default App;
