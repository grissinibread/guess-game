import express, { type Express, type Request, type Response } from 'express';

interface Game {
  id: string,
  difficulty: string
}

interface Player {
  words: string[]
}

// todo: replace with a database 
let tempStorage = [];

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  // todo: grab info from database
  let game: Game = {
    id: "0",
    difficulty: "normal"
  }

  res.json(game);
});

app.post('/', (req: Request, res: Response) => {
  // todo: send info to database
  tempStorage.push(req.body);

  res.send('game registered!');

  console.log(tempStorage);
});

console.log("server running on port 3000");
app.listen(3000);
