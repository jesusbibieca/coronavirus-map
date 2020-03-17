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
  number: { paddingRight: '20px', fontSize: '15px', fontWeight: '600' },
  listItem: { color: '#1f4a7a' },
  icon: { color: '#90d2d4' }
}));

function formatNumber(value) {
  return Intl.NumberFormat().format(value);
}

function Lists() {
  const context = useContext(GlobalState);
  const { listData, selectedList, loaded } = context;
  const classes = useStyles();

  const sublistItems = [];
  if (loaded) {
    for (let i = 1; i < listData[selectedList].length; i++) {
      const {country, state, reportedCount, longitude, latitude } = listData[selectedList][i];
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
          <ListItemText className={classes.listItem} primary="Confirmed" secondary={loaded && !isNaN(listData.confirmed[0]) ? formatNumber(listData.confirmed[0]) : null}/>
        </ListItem>
        <ListItem selected={selectedList === 'deaths'} onClick={() => handleListChange('deaths')} button>
          <ListItemText className={classes.listItem} primary="Deaths" secondary={loaded && !isNaN(listData.deaths[0]) ? formatNumber(listData.deaths[0]) : null} />
        </ListItem>
        <ListItem selected={selectedList === 'recovered'} onClick={() => handleListChange('recovered')} button>
          <ListItemText className={classes.listItem} primary="Recovered" secondary={loaded && !isNaN(listData.recovered[0]) ? formatNumber(listData.recovered[0]) : null} />
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
          <ListItemText className={classes.listItem} onClick={handleSelectedList} primary={country} secondary={state} />
          <div className={classes.number}>{reportedCount}</div>
          <ListItemIcon>
            <PinDropIcon className={classes.icon} fontSize='large' />
          </ListItemIcon>
        </ListItem>
      </Paper>
      <br/>
    </>
  );
}

export default Lists;
