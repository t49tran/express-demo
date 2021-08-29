module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/server.js',
      env: {
        NODE_ENV: 'production'
      },
      log_file: 'combined.log',
      error: 'error.log'
    }
  ]
};
