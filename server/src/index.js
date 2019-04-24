const { init, start } = require('./server');

init().then(() => {
  start();
});
