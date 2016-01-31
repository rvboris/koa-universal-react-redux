const port = process.env.PORT || 3000;
const hostname = 'localhost';
const apiUrl = `http://${hostname}:${port}/api`;

export default ({
  port,
  loglevel: 'silly',
  hostname,
  apiUrl,
});
