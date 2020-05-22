import React from 'react'
import Form from './Form'
import RepList from './RepList'
import Divider from '@material-ui/core/Divider';

class RepFinder extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       data: {}
     };
   }

  handleListChange = (data) => {
    this.setState({data})
  }

  render() {
    return (
      <div>
        <Form handleResults={this.handleListChange}/>
        <Divider />
        <RepList data={this.state.data} />
      </div>
    );
  }
}

export default RepFinder
