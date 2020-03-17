import React from 'react';
import Lists from './ListContainer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  sidebar: {
    position: 'fixed',
    width: '32%',
    overflowY: 'scroll',
    top: 0,
    bottom: 0,
  },
  hed: {
    fontSize: '38px',
    fontFamily: 'Nanum Gothic Coding',
    color: 'rgb(35, 40, 51)'
  },
  container: {
    padding: '10px'
  },
  dek: {
    fontFamily: 'Nanum Myeongjo',
    color: 'rgb(35, 40, 51)'
  },
  brand: {
    fontFamily: 'Nanum Myeongjo',
    color: 'rgb(35, 40, 51)',
    fontSize: '12px'
  },
  brandLink: {
    textDecoration: 'none',
    color:'#90d2d4'
  }
}));

function InfoSection() {
  const classes = useStyles();

  return (
      <aside className={classes.sidebar}>
        <div className={classes.container}>
          <h1 className={classes.hed}>Tracking Coronavirus COVID-19</h1>
          <p className={classes.dek}>
            The first case of the new Coronavirus COVID-19 was recorded on 31 December in Wuhan, China (WHO). Since then, over 100,000 confirmed cases have been recorded worldwide. This visualization shows the near real-time status based on data from the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University and DXY. Data currently available on the following zoom levels: City level - US, Canada and Australia; Province level - China; Country level - other countries.
          </p>
          <p className={classes.brand}>Made by <a className={classes.brandLink} href="http://www.flexsible.com" target="_blank" rel="noopener noreferrer">flexsible.com</a></p>
        </div>
          <Lists />
      </aside>
  );
}

export default InfoSection;