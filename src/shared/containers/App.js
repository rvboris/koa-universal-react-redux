import React, { PropTypes } from 'react';

const app = (props) => (<div id="app">{props.children}</div>);

app.propTypes = {
  children: PropTypes.object,
};

export default app;
