const express = require('express')
const app = express()
const port = 3004;
const history = require('connect-history-api-fallback');

// app.get('/', (req, res) => res.send('Hello World!'))
app.use(history(
    {
        verbose: true,
        index: ''
    }
));
// 11
app.use('/',express.static('dist/mobile'))

// app.get("/",function(req,res){
//     res.render("index.html",{
       
//     })
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

