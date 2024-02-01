const fs = require('fs')

const express = require('express')

// const  =  fs.readFileSync('./dev-data/tours-simple.json','utf-8');

const app = express()

const port = 3000

app.use(express.json())

const tours =JSON.parse(

    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf8')
);

app.get('/api/v1/tours', (req,res) => {
    res.status(201).json({ 
        status : 'success',
        resultat : tours.length,
        data : {tours:tours},
    });
});

app.post('/api/v1/tours', (req,res) => {
    console.log(req.body)
    const newId = tours[tours.length - 1].id + 1 
    const newTour = Object.assign({id:newId},{tours:req.body})
    tours.push(newTour);
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err)=>{
            if(err){
                console.log(err)
            }
            res.status(201).json({
                status : "success",
                resultat : tours.length,
                data : {
                     tours
                }
            })
        })
    })



app.listen(port,()=>{
    console.log(`server is listening in port : ${port} !`)
})