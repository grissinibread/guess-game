import express, { type Express, type Request, type Response } from 'express';
import { openDb } from './db.ts';

interface Game {
  id: string,
  difficulty: string
}

interface Player {
  words: string[]
}

// todo: replace with a database
let db = await openDb();

db.exec(`
  create table if not exists game (
    id integer primary key autoincrement,
    difficulty varchar(50)
  )
`);

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

app.post('/', async (req: Request, res: Response) => {
  // todo: send info to database
  await db.run(`
    INSERT INTO game (difficulty)
    VALUES (?)
  `, [req.body.difficulty]);

  res.send('game registered!');

  console.log(await db.all(
    `select * 
    from game`
  ));
});

console.log("server running on port 3000");
app.listen(3000);
