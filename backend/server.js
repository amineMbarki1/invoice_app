const dotenv = require('dotenv');

const connectDB = require('./config/connectDB');
const app = require('./app');

dotenv.config({ path: 'backend/.env' });

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
