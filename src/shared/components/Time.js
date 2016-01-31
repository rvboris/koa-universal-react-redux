import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class Time extends React.Component {
  static propTypes = {
    time: ImmutablePropTypes.map.isRequired,
  };

  render() {
    return (<span>{ this.props.time.get('time') }</span>);
  }
}
