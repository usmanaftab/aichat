interface Config {
  API_URL: string;
  BASE_PATH: string;
  NOT_FOUND_REDIRECT: string;
}

const development: Config = {
  API_URL: 'http://127.0.0.1:5000/api',
  BASE_PATH: '',
  NOT_FOUND_REDIRECT: '/',
};

const production: Config = {
  API_URL: 'https://aichat-server.usmanaftab.com/api',
  BASE_PATH: '',
  NOT_FOUND_REDIRECT: '/',
};

const env = process.env.REACT_APP_ENV || process.env.NODE_ENV || 'development';

export const config: Config = env === 'production' || env === 'PRODUCTION' ? production : development;

console.log(`Running in ${env} mode`); // Helpful for debugging