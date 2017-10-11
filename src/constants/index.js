let config = require('./../../config.json');

if (__DEV__) {
  config = config.dev;
} else {
  config = config.prod;
}

export default { ...config };
