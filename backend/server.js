const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cors=require('cors');

const recipeRoutes=require('./routes/recipeRoutes');

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/recipes',recipeRoutes);

app.get('/',(req,res)=>{
    res.send("Hello from backend");
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err.message);
  });
