import { config as _config } from 'dotenv';
import { resolve } from 'path';

const ENV = process.env.NODE_ENV || 'production';
const envFile = resolve(__dirname, `.env.${ENV}`);
_config({ path: envFile });

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: process.env.API_URL,
      eas: {
        projectId: "260dda9a-838f-413b-9db8-2622e1c5ee87"
      }
    },
  };
};