const initialVideos = require('./data/exampleresponse.json');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const express = require('express');
const bp = require('body-parser');

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Listening on port ${port}`));

let videos = [...initialVideos];

app.get('/', (req, res) => {
  res.status(200).send(videos);
});

app.post('/', (req, res) => {
  const video = {...req.body};
  if(!video) {
    res.status(404).send({
      'result': 'failure',
      'message': 'Video could not be saved'
    });
    return;
  };

  const rating = Math.round(Math.random() * 3000);
  const newDate = new Date();
  const date = newDate.toLocaleDateString('fr-CA');
  const time = newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
  Object.assign(video, {
    id: uuidv4(),
    rating: rating, 
    date: date, 
    time: time
  });
  videos.push(video);
});

app.get('/:id', (req, res) => {
  const video = videos.find(video => video.id === +req.params.id);
  if(!video) {
    res.status(404).send('Could not find video with this ID');
    return;
  };
  res.status(200).send(video);
});

app.delete('/:id', (req, res) => {
  const videoIndex = videos.findIndex(video => video.id === +req.params.id);
  if(!videoIndex) {
    res.status(404).send({
      "result": "failure",
      "message": "Video could not be deleted"
    });
    return;
  };
  videos.splice(videoIndex, 1);
  res.status(200).send(videos);
});
