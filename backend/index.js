const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")


// Middleware for parsing request bodies
app.use (express.json())
app.use("/admin", adminRouter)
app.use("/user", userRouter)
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


