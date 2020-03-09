import React from 'react';
import { readRemoteFile } from 'react-papaparse';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Map from './Map';
import InfoSection from './InfoSection';

import { handleComplete, FILES } from './scripts/parseCSV';

const MAP_FILE_URL = {
  confirmed: FILES[0],
  deaths: FILES[1],
  recovered: FILES[2]
};

function App() {

  readRemoteFile(FILES[0],
    {
      header: true,
      complete: function(res) {
        const results = handleComplete(res); //send to state somehow
      }
    });

  return (
    <Grid container>
      <Grid item spacing={2} xs={0} md={3}>
        <Box display={{ xs: 'none', md: 'block' }} m={1}>
          <InfoSection />
        </Box>
      </Grid>
      <Grid item xs={12} md={9}>
        <Map />
      </Grid>
    </Grid>
  );
}

export default App;
