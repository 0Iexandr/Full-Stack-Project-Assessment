const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const express = require('express');
const bp = require('body-parser');
const { Pool } = require('pg');

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Listening on port ${port}`));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'videos',
  port: 5432
});

app.get('/', (req, res) => {
  pool.query('SELECT * FROM videosdata')
  .then(result => {
    const videos = result.rows;
    if(req.query.order === 'ascending') {
      videos.sort((a, b) => a.rating - b.rating);
      res.status(200).send(videos);
    }
    else {
      videos.sort((a, b) => b.rating - a.rating);
      res.status(200).send(videos);
    }
  })
  .catch(error => {
    console.error(error);
    res.status(500).json(error);
  });
});

app.post('/', async (req, res) => {
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
  await pool.query('INSERT INTO videosdata values($1, $2, $3, $4)', [video.id, video.title, video.url, video.rating]);
  res.status(200).send(video);
});

app.delete('/:id', (req, res) => {
  pool.query('DELETE FROM videosdata where id like ($1) RETURNING *', [req.params.id])
    .then(result => {
      const deletedVideo = result.rows;
      res.status(200).send(deletedVideo[0]);
  })
});
