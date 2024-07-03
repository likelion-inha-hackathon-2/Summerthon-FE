const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  resolve: {
    fallback: {
      "fs": false, 
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
  },
  plugins: [
    new Dotenv() // .env 파일에서 환경 변수 로드
  ]
};

