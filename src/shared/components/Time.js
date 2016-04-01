import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const time = (props) => (<span>{ props.time.get('time') }</span>);

time.propTypes = {
  time: ImmutablePropTypes.map.isRequired,
};

export default time;
