import app from './app.js';
import { connectDatabase } from './config/database.js';

const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});

connectDatabase().catch((error) => {
  console.error('MongoDB unavailable; API is running without database access:', error);
});