import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './RepDetail.css';

class RepDetail extends React.Component {
  render() {
    const {data} = this.props;
    if (!data || !data.name) {
      return null;
    }

    return (
      <div>
        <h2>Info</h2>
        <List>
          <ListItem className="Rep-Detail-Item">
            <ListItemText
              primary="Name"
              secondary={data.name}
            />
          </ListItem>

          {data.district &&
            <ListItem className="Rep-Detail-Item">
              <ListItemText
                primary="District"
                secondary={data.district}
              />
            </ListItem>
          }

          <ListItem className="Rep-Detail-Item">
            <ListItemText
              primary="Phone"
              secondary={data.phone}
            />
          </ListItem>

          <ListItem className="Rep-Detail-Item">
            <ListItemText
              primary="Office"
              secondary={data.office}
            />
          </ListItem>

          <ListItem className="Rep-Detail-Item">
            <ListItemText
              primary="Website"
              secondary={data.link}
            />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default RepDetail
