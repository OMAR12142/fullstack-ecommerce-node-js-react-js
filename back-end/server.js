import express from 'express'
import connectDb from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound,errorHandler } from './midd/errorMiddleware.js'
import dotenv from 'dotenv'
dotenv.config()

connectDb()
const port =process.env.PORT || 8000

const app =express()


app.get('/',(req,res)=>{
    res.send('app is running')
} )

app.use('/api/products',productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`server runnning in port ${port}`))