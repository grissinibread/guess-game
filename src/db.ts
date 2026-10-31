import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as os from "os";

const platform: string = os.platform();

let filename: string = "C:/Users/naval/tmp/database.db";
if (platform !== "win32") {
  filename = "tmp/database.db";
}

// you would have to import / invoke this in another file
export async function openDb() {
  return open({
    filename: filename,
    driver: sqlite3.Database,
  });
}
