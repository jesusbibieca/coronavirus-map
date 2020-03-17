import React, { useContext, useState } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import PinDropIcon from '@material-ui/icons/PinDrop';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import { GlobalState } from './context/GlobalState';
import { groupByCountry, sumReportedCountByCountry } from './helpers/misc';

const useStyles = makeStyles(() => ({
  paper: { backgroundColor: '#f6f6f6' },
  number: { paddingRight: '20px', fontSize: '15px', fontWeight: '600' },
  listItem: { color: '#1f4a7a' },
  icon: { color: '#90d2d4' },
  litsItemButton: { borderBottom: '2px solid #90d2d4' },
  box: { borderBottom: "2px solid #A0A0A0" },
  listItemSelected: { color: '#90d2d4', fontSize: '28px' },
  listItemSecondary: { color: '#000' },
  listItemNotSelected: { color: '#000', fontSize: '28px' },
  nested: {
    paddingLeft: '32px',
  },
}));

function formatNumber(value) {
  return Intl.NumberFormat().format(value);
}

function formattedPrimary(data, styles, isSelected) {
  return (<span className={isSelected ? styles.listItemSelected : styles.listItemNotSelected}>{formatNumber(data)}</span>);
}

function formattedSecondary(data, styles) {
  return (<span className={styles.listItemSecondary}>{data}</span>);
}

function Lists() {
  const context = useContext(GlobalState);
  const { listData, selectedList, loaded } = context;
  const classes = useStyles();
  const [_, ...data] = sumReportedCountByCountry(groupByCountry(listData[selectedList]));
  console.log(data);

  const handleListChange = (listName) => {
    context.selectList(listName);
  };
    
  return (
    <>
    <List component="div">
      <Box display="flex" flexDirection="row">

        <ListItem className={selectedList === 'confirmed' ? classes.litsItemButton : classes.box } onClick={() => handleListChange('confirmed')} button>
          <ListItemText
              primary={loaded && !isNaN(listData.confirmed[0]) ? formattedPrimary(listData.confirmed[0], classes, selectedList === 'confirmed') : null}
              secondary={formattedSecondary("Confirmed", classes)}
            />
        </ListItem>
        <ListItem className={selectedList === 'deaths' ? classes.litsItemButton : classes.box } onClick={() => handleListChange('deaths')} button>
          <ListItemText
            primary={loaded && !isNaN(listData.deaths[0]) ? formattedPrimary(listData.deaths[0], classes, selectedList === 'deaths') : null}
            secondary={formattedSecondary("Deaths", classes)}
          />
        </ListItem>
        <ListItem className={selectedList === 'recovered' ? classes.litsItemButton : classes.box } onClick={() => handleListChange('recovered')} button>
          <ListItemText
            className={classes.listItem}
            primary={loaded && !isNaN(listData.recovered[0]) ? formattedPrimary(listData.recovered[0], classes, selectedList === 'recovered') : null}
            secondary={formattedSecondary("Recovered", classes)}
          />
        </ListItem>
      </Box>
    </List>
    <List>

      {loaded && data.map(payload =>  {
        const countryName = Object.keys(payload)[0];
        const { totalReportedCount, cities  } = payload[Object.keys(payload)[0]];
        if (cities.length > 1) {
          return <SublistItemWithCities key={countryName} country={countryName} totalReportedCount={totalReportedCount} cities={cities} />
        }
        return <SublistItem key={countryName} country={countryName} totalReportedCount={totalReportedCount} coords={[cities[0].latitude, cities[0].longitude]} />
      }
      )}

    </List>

    </>
  );
}

function SublistItem({ country, totalReportedCount, coords }) {
  const classes = useStyles();
  const { setCenter } = useContext(GlobalState);

  const handleSelectedList = () => {
    setCenter(coords);
  };

  return (
    <>
      <Paper className={classes.paper} variant="outlined">
        <ListItem button>
          <ListItemText className={classes.listItem} primary={country} onClick={handleSelectedList} />
          <div className={classes.number}>{totalReportedCount}</div>
          <ListItemIcon>
            <PinDropIcon className={classes.icon} fontSize='large' />     
          </ListItemIcon>
        </ListItem>
      </Paper>
      <br/>
    </>
  );
}

function SublistItemWithCities({ country, totalReportedCount, cities  }) {
  const classes = useStyles();
  const { setCenter, setZoomLevel } = useContext(GlobalState);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSelectedList = (coords) => {
    setCenter(coords);
    setZoomLevel(8);
  };

  return (
    <>
      <Paper className={classes.paper} variant="outlined">
        <ListItem button onClick={handleClick}>
          <ListItemText className={classes.listItem} primary={country} />
          <div className={classes.number}>{totalReportedCount}</div>
          <ListItemIcon>
           {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {cities.map(city => (
            <Paper key={city.state} className={classes.paper} variant="outlined" onClick={() => handleSelectedList([city.latitude, city.longitude])}>
              <ListItem button className={classes.nested}>
                <ListItemText className={classes.listItem} primary={city.state} />
                <div className={classes.number}>{city.reportedCount}</div>
              </ListItem>
            </Paper>
          ))}
        </List>
      </Collapse>
      </Paper>
      <br/>
    </>
  );
}


export default Lists;
