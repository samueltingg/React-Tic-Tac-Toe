import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname,   
 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT   
 || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);   

});