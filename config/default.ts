require("dotenv").config();

interface AppConfig {
  port: number;
}

const config: AppConfig = {
  port: Number(process.env.PORT) || 3500,
};

export default config;
