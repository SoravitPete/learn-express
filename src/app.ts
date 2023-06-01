import express, { Application, Request, Response } from 'express'


const app: Application = express()
app.use(express.json())

const playlist = [
  {type: 'j-pop',
  id : 0,
  },
  {type: 'k-pop',
  id : 1,
  }
];

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/playlist', (req: Request, res: Response) => {
  res.send(playlist)
})

app.get('/playlist/:playlistID', (req: Request, res: Response)  => {
  // req.quer.user
  // req.params.userId
  // req.body
  // res.status(200).send('adfasdf')
  // res.status(200).json({
  //   test: 'test'
  // })
  if (typeof parseInt(req.params.playlistID) !== "number"){
    res.status(404).json({massage : "Not found"});
  }
  else if (isNaN(0 - parseInt(req.params.playlistID))){
    res.status(404).json({massage : "Pls enter Number"});
  }
  let dummy = parseInt(req.params.playlistID);
  // let ans = playlist.find((item) => item.id == dummy);
  var i = 0;
  while(i < playlist.length) {
    let ans = playlist[i].id
    if (ans === dummy) {
      console.log(ans)
      console.log(typeof(playlist[i]))
      res.send(playlist[i])
    }
    i++
  }
  // console.log(typeof(ans))
  // res.send(ans)
})

app.post('/create', (req: Request, res: Response)  => {
  console.log(req.body);
  const data = req.body;
  let i = 0;
  while (i < playlist.length) {
      console.log(i);
      i++;
  }
  data.id = i;
  playlist.push(data);
  res.send(data)
})

app.put('/update/:playlistID', (req: Request, res: Response)  => {
  let dummy = parseInt(req.params.playlistID);
  const new_data = req.body;
  var ans = playlist.find(item => item.id == dummy);
  if (!ans) {
    res.status(404).json({ message: 'Not found'})
    return
  }
  ans.type = new_data.type;
  console.log(typeof(ans));
  res.json({data : new_data});
})

app.get('/query_by_name', (req: Request, res: Response)  => {
  var type = req.query.type;
  var ans = playlist.find(item => item.type === type);
  console.log(ans)
  res.send(ans)
})

app.get('/query_by_id', (req: Request, res: Response)  => {
  if (typeof req.query.id !== "string") {
    res.status(404).json({ message: 'Wrong Format'})
    return
  }
  var id = parseInt(req.query.id as string);
  var ans = playlist.find(item => item.id === id);
  console.log(ans)
  res.send(ans)
})

// app.delete('/delete/:deleteID', (req: Request, res: Response)  => {
//   var del = req.params.deleteID;
//   var ans = playlist.find(item => item.id == del);
//   playlist.pop(type : ans.type)
//   console.log(ans)
//   res.send(ans)
// })


module.exports = app
