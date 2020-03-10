import React from 'react';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PinDropIcon from '@material-ui/icons/PinDrop';

function Lists() {
  return (
    <>
    <List component="div">
      <Box display="flex" flexDirection="row">
        <ListItem button>
          <ListItemText primary="100,000" secondary="Confirmed"/>
        </ListItem>
        <ListItem button>
          <ListItemText primary="1,200" secondary="Deaths" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="80,000" secondary="Recovered" />
        </ListItem>
      </Box>
    </List>
    <List>
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
      <SublistItem />
    </List>

    </>
  );
}

function SublistItem({ country = 'Country', city = 'City', reportedCount = 100, selected = false }) {
  return (
    <>
      <ListItem>
        <ListItemText  primary={country} secondary={city} />
          <div>{reportedCount}</div>
          <ListItemIcon>
            <PinDropIcon fontSize='large' />
          </ListItemIcon>
        </ListItem>
        <Divider />
    </>
  );
}

export default Lists;
