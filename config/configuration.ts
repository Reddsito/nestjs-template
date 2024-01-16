
export const ConfigVariables = () => ({
  state: process.env.STATE || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432
  }
});


