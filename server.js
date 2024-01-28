
const express=  require('express');


const app= express();
const port=process.env.port || 3001;

app.use(express.json( {extended: false}));
const articlesInfo={
    "learn-react":{
        Comments :[],
    },
    "learn-node":{
        Comments :[],
    },
    "my-thoughts-on-learning-react":{
        Comments :[],
    }
}
 







app.listen(port, ()=>{
    console.log(`server is running on port http://localhost:${port}`);
})
// just test
// app.get('/', (req, res)=> {

//     res.send('hello world');
// })
// app.post('/', (req, res)=> {

//     res.send(`hello ${req.body.lastname}`);
// })
// app.get('/hello/:lastname', (req, res)=> {
//     res.send(`hello ${req.params.lastname}`);
// })
app.post('/api/articles/:title/comments', (req, res)=> {
    const {username, text}= req.body;
    const articleName= req.params.title;
    articlesInfo[articleName].Comments.push({username, text});
    res.status(200).send(articlesInfo[articleName]);
})