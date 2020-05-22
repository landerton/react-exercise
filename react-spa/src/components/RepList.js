import React from 'react'
import RepDetail from './RepDetail'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import './RepList.css';

class RepList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
  }

  componentDidUpdate(prevProps) {
    const {data} = this.props
    if (!data || data.type !== prevProps.data.type || data.state !== prevProps.data.state) {
      this.setState({selected: {}})
    }
  }

  handleSelect = (event, name) => {
    const {data} = this.props

    // Close detail view it data was updated
    if (data && data.list && data.list.length) {
      const selected = data.list.find(i => i.name === name)
      if (selected) {
        this.setState({selected})
      }
    }
  }

  render() {
    const {data} = this.props;
    if (!data || !data.state || !data.type || !data.list) {
      return null
    }

    if (!data.list.length) {
      return (
        <div className="Rep-List">
          <h2>{`No results found for ${data.type} in ${data.state}`}</h2>
        </div>
      )
    }

    return (
      <div className="Rep-List">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <h2>List / <span className="Rep-List-Title">Representatives</span></h2>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead className="Rep-List-Head">
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Party</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.list.map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      selected={row.name === this.state.selected.name}
                      onClick={(event) => this.handleSelect(event, row.name)}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.party}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={6}>
            <RepDetail data={this.state.selected} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default RepList
