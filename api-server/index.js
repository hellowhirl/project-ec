'use strict';

const { readFile } = require('fs').promises;
const { resolve } = require('path');
const express = require('express');
const cors = require('cors');

(async () => {
  const [items, categories] = (
    await Promise.all(['items', 'categories'].map((type) => readFile(resolve(`json/${type}.json`), 'utf-8')))
  ).map(JSON.parse);
  const port = 8000;
  const app = express();

  for (const id of Object.keys(items.data)) {
    items.data[id].image = `http://localhost:${port}/${items.data[id].image}`;
  }

  app.use(cors());

  app.get('/items', (req, res) => {
    return res.send(items);
  });

  app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.data.find((item) => item.id === Number(id));

    if (!item) {
      return res.status(404).send('Not found');
    }
    return res.send(item);
  });

  app.get('/categories', (req, res) => {
    return res.send(categories);
  });

  app.use('/images', express.static(resolve('static/images')));

  app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).send('Internal Server Error');
  });

  app.listen(port);
  console.log(`serving on http://localhost:${port} ...`);
})();

process.on('unhandledRejection', (reason, promise) => {
  console.warn(reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});
