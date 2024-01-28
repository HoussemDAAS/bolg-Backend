
const express=  require('express');
const { MongoClient } = require('mongodb');
const app= express();
const port=process.env.port || 3001;

app.use(express.json( {extended: false}));
// const articlesInfo={
//     "learn-react":{
//         Comments :[],
//     },
//     "learn-node":{
//         Comments :[],
//     },
//     "my-thoughts-on-learning-react":{
//         Comments :[],
//     }
// }
 







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

app.get('/api/articles/:title', async(req, res)=> {
    try {
        const articleName=req.params.title;
        const client = new MongoClient('mongodb://localhost:27017');
        console.log("Connected to MongoDB");
        const db=client.db('mernapp');
        const articleInfo= await db.collection('articles').findOne({name:articleName});
        res.status(200).json(articleInfo);
        client.close();
        
    } catch (error) {
        console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
    }
   

})



app.post('/api/articles/:title/comments', (req, res)=> {
    const {username, text}= req.body;
    const articleName= req.params.title;
    articlesInfo[articleName].Comments.push({username, text});
    res.status(200).send(articlesInfo[articleName]);
})