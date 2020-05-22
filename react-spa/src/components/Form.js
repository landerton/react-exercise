import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './Form.css';

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
 DEV_URL = 'http://localhost:3000';
}


const US_STATES = [
  { 'label':'Alabama', 'value': 'AL' },
  { 'label':'Alaska', 'value': 'AK'},
  { 'label':'American Samoa', 'value': 'AS'},
  { 'label':'Arizona', 'value': 'AZ'},
  { 'label':'Arkansas', 'value': 'AR'},
  { 'label':'California', 'value': 'CA'},
  { 'label':'Colorado', 'value': 'CO'},
  { 'label':'Connecticut', 'value': 'CT'},
  { 'label':'Delaware', 'value': 'DE'},
  { 'label':'District of Columbia', 'value': 'DC'},
  { 'label':'States of Micronesia', 'value': 'FM'},
  { 'label':'Florida', 'value': 'FL'},
  { 'label':'Georgia', 'value': 'GA'},
  { 'label':'Guam', 'value': 'GU'},
  { 'label':'Hawaii', 'value': 'HI'},
  { 'label':'Idaho', 'value': 'ID'},
  { 'label':'Illinois', 'value': 'IL'},
  { 'label':'Indiana', 'value': 'IN'},
  { 'label':'Iowa', 'value': 'IA'},
  { 'label':'Kansas', 'value': 'KS'},
  { 'label':'Kentucky', 'value': 'KY'},
  { 'label':'Louisiana', 'value': 'LA'},
  { 'label':'Maine', 'value': 'ME'},
  { 'label':'Marshall Islands', 'value': 'MH'},
  { 'label':'Maryland', 'value': 'MD'},
  { 'label':'Massachusetts', 'value': 'MA'},
  { 'label':'Michigan', 'value': 'MI'},
  { 'label':'Minnesota', 'value': 'MN'},
  { 'label':'Mississippi', 'value': 'MS'},
  { 'label':'Missouri', 'value': 'MO'},
  { 'label':'Montana', 'value': 'MT'},
  { 'label':'Nebraska', 'value': 'NE'},
  { 'label':'Nevada', 'value': 'NV'},
  { 'label':'New Hampshire', 'value': 'NH'},
  { 'label':'New Jersey', 'value': 'NJ'},
  { 'label':'New Mexico', 'value': 'NM'},
  { 'label':'New York', 'value': 'NY'},
  { 'label':'North Carolina', 'value': 'NC'},
  { 'label':'North Dakota', 'value': 'ND'},
  { 'label':'Northern Mariana Islands', 'value': 'MP'},
  { 'label':'Ohio', 'value': 'OH'},
  { 'label':'Oklahoma', 'value': 'OK'},
  { 'label':'Oregan', 'value': 'OR'},
  { 'label':'Palau', 'value': 'PW'},
  { 'label':'Pennsilvania', 'value': 'PA'},
  { 'label':'Puerto Rico', 'value': 'PR'},
  { 'label':'Rhode Island', 'value': 'RI'},
  { 'label':'South Carolina', 'value': 'SC'},
  { 'label':'South Dakota', 'value': 'SD'},
  { 'label':'Tennessee', 'value': 'TN'},
  { 'label':'Texas', 'value': 'TX'},
  { 'label':'Utah', 'value': 'UT'},
  { 'label':'Vermont', 'value': 'VT'},
  { 'label':'Virgin Islands', 'value': 'VI'},
  { 'label':'Virginia', 'value': 'VA'},
  { 'label':'Washington', 'value': 'WA'},
  { 'label':'West Virginia', 'value': 'WV'},
  { 'label':'Wisconsin', 'value': 'WI'},
  { 'label':'Wyoming', 'value': 'WY'}
];

class Form extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       repType: '',
       repState: '',
       helperText: '',
       error: false,
       disabled: false
     };
   }


  handleSubmit = (event) => {
    event.preventDefault()
    const {repType, repState} = this.state;
    if (repType && repState) {
      this.setState({
        error: false,
        helperText: '',
        disabled: true
      })
      this.apiCall(repType, repState)
    }
    else {
      this.setState({
        error: true,
        helperText: 'Please select a represtative type and state.'
      })
    }
  }

  handleTypeChange = (event) => {
    this.setState({repType: event.target.value})
  }

  handleStateChange = (event) => {
    this.setState({repState: event.target.value})
  }

  async apiCall(repType, repState) {
    // Call self-hosted API
    try {
      const res = await fetch(`${DEV_URL}/${repType}/${repState}`);
      const reps = await res.json();

      if (reps.success) {
        this.props.handleResults({
          type: repType,
          state: repState,
          list: reps.results
        })
      }
      else {
        this.props.handleResults({
          type: repType,
          state: repState,
          list: []
        })
      }
    }
    catch (e) {
      this.setState({
        error: true,
        helperText: 'Something went wrong finding your representative.'
      })
    }
    finally {
      this.setState({
        disabled: false
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="Rep-Form">
        <FormControl>
          <div className="Rep-Form-Control">
            <FormLabel component="legend">Type of Representative</FormLabel>
            <RadioGroup
              aria-label="representative type"
              name="type1"
              value={this.state.repType}
              onChange={this.handleTypeChange}
            >
              <FormControlLabel value="representatives" control={<Radio />} label="House of Representatives" />
              <FormControlLabel value="senators" control={<Radio />} label="Senators" />
            </RadioGroup>
          </div>
        </FormControl>

        <FormControl>
          <div className="Rep-Form-Control">
            <FormLabel component="legend">State</FormLabel>
            <Select
              value={this.state.repState}
              onChange={this.handleStateChange}
              displayEmpty
              inputProps={{ 'aria-label': 'representative state' }}
            >
              <MenuItem value="" disabled>
                Select State
              </MenuItem>
              {US_STATES.map(i =>
                <MenuItem value={i.value} key={i.value}>{i.label}</MenuItem>
              )}
            </Select>
          </div>
        </FormControl>

        <FormControl
          error={this.state.error}
          disabled={this.state.disabled}
        >
          <div className="Rep-Form-Control">
            <Button
              disabled={this.state.disabled}
              type="submit"
              variant="outlined"
              color="primary"
            >
              Find my representative
            </Button>
            <FormHelperText>{this.state.helperText}</FormHelperText>
          </div>
        </FormControl>
      </form>
    );
  }
}

Form.propTypes = {
  handleResults: PropTypes.func.isRequired
}

export default Form
