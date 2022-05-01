const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

const url = 'mongodb+srv://cis350:cis350@cluster0.h226w.mongodb.net/files?retryWrites=true&w=majority';
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = GridFsStorage({
  url,
  file: (req, file) => {
    return { filename: `${Date.now()}-${file.originalname}` }
  },
});
const upload = multer({ storage });

const { MongoClient, GridFSBucket } = require('mongodb');
let db;

app.use(express.static(path.join(__dirname, 'file-upload', 'build')));

app.post('/api/file', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.status(201).json({message: 'Successfully uploaded file'});
});

app.get('/api/file', async (req, res) => {
  // get list of files
  try {
    const list = await db.collection('fs.files').find({}).toArray();
    res.status(200).json({ data: list });
  } catch (err) {
    console.log(err.message);
    res.status(500).end();
  }
});

app.get('/api/file/:name', (req, res) => {
  const fileName = req.params.name;
  if (!fileName) {
    res.status(400).json('Provide a file name');
  }
  const bucket = new GridFSBucket(db);
  let downloadStream = bucket.openDownloadStreamByName(req.params.name);
  downloadStream.on("data", (data) => {
    return res.status(200).write(data);
  });
  downloadStream.on("error", (err) => {
    return res.status(404).send({ message: "Cannot download the Image!" });
  });
  downloadStream.on("end", () => {
    return res.end();
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'file-upload', 'build', 'index.html'));
});

app.listen(port, async () => {
  db = await (await MongoClient.connect(url)).db();
  console.log(`App listening on port ${port}`);
});

// const express = require('express');
// const path = require('path');
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.static(path.join(__dirname, 'file-upload', 'build')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'file-upload', 'build', 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });