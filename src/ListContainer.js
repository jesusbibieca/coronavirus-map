import React from 'react';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function Lists() {
  return (
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
  );
}

export default Lists;
