interface Config {
  API_URL: string;
}

const development: Config = {
  API_URL: 'http://127.0.0.1:5000/api',
};

const production: Config = {
  API_URL: 'https://your-production-domain.com/api',
};

const env = process.env.REACT_APP_ENV || process.env.NODE_ENV || 'development';

export const config: Config = env === 'production' || env === 'PRODUCTION' ? production : development;

console.log(`Running in ${env} mode`); // Helpful for debugging 