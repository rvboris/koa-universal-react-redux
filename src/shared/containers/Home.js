import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { timeActions } from '../actions';
import Time from '../components/Time';

class HomePage extends Component {
  static propTypes = {
    time: ImmutablePropTypes.map.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static needs = [
    timeActions,
  ];

  constructor(props) {
    super(props);

    setInterval(() => {
      this.props.dispatch(timeActions());
    }, 1000);
  }

  render() {
    return (<Time time={ this.props.time } />);
  }
}

const selector = createSelector(state => ({ time: state.get('time') }), time => time);

export default connect(selector)(HomePage);
