import React from 'react';
import Lists from './ListContainer';
import { makeStyles } from '@material-ui/core/styles';

import './Map.css';

const useStyles = makeStyles(() => ({
  sidebar: {
    position: 'fixed',
    width: '24%',
    overflowY: 'scroll',
    top: 0,
    bottom: 0,
  }
}));

function InfoSection() {
  const classes = useStyles();

  return (
      <aside className={classes.sidebar}>
        <h1>Tracking Coronavirus COVID-19</h1>
        <p>The first case of the new Coronavirus COVID-19 was recorded on 31 December in Wuhan, China (WHO). Since then, 101,880 confirmed cases have been recorded worldwide. This visualization shows the near real-time status based on data from the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University and DXY. Data currently available on the following zoom levels: City level - US, Canada and Australia; Province level - China; Country level - other countries.</p>
          <Lists />
      </aside>
  );
}

export default InfoSection;