import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import PinDropIcon from '@material-ui/icons/PinDrop';
import { makeStyles } from '@material-ui/core/styles';

import { GlobalState } from './context/GlobalState';

const useStyles = makeStyles(() => ({
  paper: { backgroundColor: '#f6f6f6' },
  number: { paddingRight: '20px', fontSize: '15px', fontWeight: '600' }
}));

function formatNumber(value) {
  return Intl.NumberFormat().format(value);
}

function Lists() {
  const context = useContext(GlobalState);
  const { listData, selectedList, loaded } = context;

  const sublistItems = [];
  if (loaded) {
    for (let i = 1; i < listData.length; i++) {
      const {country, state, reportedCount, longitude, latitude } = listData[i];
      sublistItems.push(<SublistItem key={state + i} coords={[latitude, longitude]} country={country} state={state} reportedCount={formatNumber(reportedCount)} />);
    }
  }

  const handleListChange = (listName) => {
    context.selectList(listName);
  };
    
  return (
    <>
    <List component="div">
      <Box display="flex" flexDirection="row">
        <ListItem selected={selectedList === 'confirmed'} onClick={() => handleListChange('confirmed')} button>
          <ListItemText primary="Confirmed" secondary={selectedList === 'confirmed' && loaded && !isNaN(listData[0]) ? formatNumber(listData[0]) : null}/>
        </ListItem>
        <ListItem selected={selectedList === 'deaths'} onClick={() => handleListChange('deaths')} button>
          <ListItemText primary="Deaths" secondary={selectedList === 'deaths' && loaded && !isNaN(listData[0]) ? formatNumber(listData[0]) : null} />
        </ListItem>
        <ListItem selected={selectedList === 'recovered'} onClick={() => handleListChange('recovered')} button>
          <ListItemText primary="Recovered" secondary={selectedList === 'recovered' && loaded && !isNaN(listData[0]) ? formatNumber(listData[0]) : null} />
        </ListItem>
      </Box>
    </List>
    <List>

      { loaded && sublistItems }

    </List>

    </>
  );
}

function SublistItem({ country, state, reportedCount, coords }) {
  const classes = useStyles();
  const { setCenter } = useContext(GlobalState);

  const handleSelectedList = () => {
    setCenter(coords);
  };

  return (
    <>
      <Paper className={classes.paper} variant="outlined">
        <ListItem button>
          <ListItemText onClick={handleSelectedList} primary={country} secondary={state} />
          <div className={classes.number}>{reportedCount}</div>
          <ListItemIcon>
            <PinDropIcon fontSize='large' />
          </ListItemIcon>
        </ListItem>
      </Paper>
      <br/>
    </>
  );
}

export default Lists;
