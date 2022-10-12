import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
dotenv.config();
const db = connectDB();
const app = express();
app.use(express.json())
app.get('/', (req, res) => {
    res.send('API is running...')
})
//route to the /api/products/ file 
app.use('/api/products/', productRoutes);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
