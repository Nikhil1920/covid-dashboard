import express, { Request, Response } from "express";
import axios from "axios";
import "dotenv/config";
import WorldDataResponseType from "./types/WorldDataResponseType";

import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB || "test";

const app = express();
const port = process.env.PORT || 3006;

app.get("/", async (req: Request, res: Response) => {});

app.get("/fill-data", async (req: Request, res: Response) => {
    let data: WorldDataResponseType[] = [];
    await axios.get("https://api.covid19api.com/world").then((response) => {
        data = response.data;
    });
    try {
        await client.connect();
        const db = client.db(dbName);
        await db.collection("WorldDaily").insertMany(data);
        res.send("Filled database with data");
    } catch (err) {
        console.error(err);
        res.send("ERROR");
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log("app listening on port", port);
});
