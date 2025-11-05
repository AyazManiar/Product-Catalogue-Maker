import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`); 
})
app.get('/', (req, res)=>{
    res.send("Hello World!");
});

// Routes
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);


// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));