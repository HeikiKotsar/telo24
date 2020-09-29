const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Define routes
app.use('/api/v1/products', require('./routes/productRouter'));
app.use('/api/v1/auth', require('./routes/authRouter'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));