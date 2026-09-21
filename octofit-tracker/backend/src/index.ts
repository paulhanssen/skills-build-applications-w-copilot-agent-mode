import app from './app.js';
import { connectDatabase } from './config/database.js';

const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});

connectDatabase().catch((error) => {
  console.error('MongoDB unavailable; API is running without database access:', error);
});