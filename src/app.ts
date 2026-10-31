import express, { type Express, type Request, type Response } from "express";
import { openDb } from "./db.ts";
import cors from 'cors';

interface Game {
  id: string;
  difficulty: string;
}

interface Player {
  words: string[];
}

let db = await openDb();

db.exec(`
  create table if not exists game (
    id integer primary key autoincrement,
    difficulty varchar(50)
  )
`);

const app: Express = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  // todo: grab info from database
  let game: Game = {
    id: "0",
    difficulty: "normal",
  };

  res.json(game);
});

app.post("/", async (req: Request, res: Response) => {
  // todo: send info to database
  await db.run(
    `
    INSERT INTO game (difficulty)
    VALUES (?)
  `,
    [req.body.difficulty],
  );

  res.send("game registered!");

  console.log(
    await db.all(
      `select * 
    from game`,
    ),
  );
});

console.log("server running on port 3000");
app.listen(3000);
