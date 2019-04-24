module.exports.isProd = () => {
  return (
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'
  );
};

module.exports.isDev = () => {
  return (
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev'
  );
};

module.exports.isTest = () => {
  return process.env.NODE_ENV === 'test';
};
