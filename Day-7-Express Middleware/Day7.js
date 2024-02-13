const express=require('express');
const app=express();
function requestLoggerMiddleware(req,res,next){
    const timestamp=new Date().toLocaleString();
    const method=req.method;
    console.log(`${timestamp} ${method} ${req.url}`);
    next();
}

app.use(requestLoggerMiddleware);
app.get('/',(req,res)=>{
    res.send("Hello, World");
});

const port=3000;
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
});