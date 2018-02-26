import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import Trip from './trip.jsx';
import {Link} from 'react-router-dom';

class UserPage extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.state.authenticated) {
      this.props.actions.fetchTrips(this.props.state.username);
    }
  }

  generateMessage () {
    if (this.props.state.trips.length === 0) {
      return (<div> You don't have any trips yet :( </div>);
    } else {
      return (<div> These are your trips you've been planning </div>);
    }
  }


  render() {
    if (this.props.state.authenticated === true) {
      return (
        <div>
          {this.generateMessage()}
          
          {this.props.state.trips.map((trip, index) => 
            <Trip key = {index}
              user = {this.props.state.username} 
              trip = {trip} 
              editable = {true}
              delete = {this.props.actions.deleteTrip}
              toggleStatus = {this.props.actions.toggleTripStatus}
            />)}
          <Link to='/plan'>SearchPage</Link>
        </div>
      );
    } else {
      return (
        <Paper>
        <h2> Sorry! Please log in to access this content! </h2>
        <Link to='/'> Home </Link>
        </Paper>
      );
    }
  }
}

const mapStateToProps = state => (
  {state: state}
);

const mapDispatchToProps = dispatch =>
  ({
    actions: bindActionCreators(actions, dispatch)
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
