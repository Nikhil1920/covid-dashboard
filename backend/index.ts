import express, { NextFunction, Request, Response } from "express";
import axios from "axios";
import "dotenv/config";
import WorldDataResponseType from "./types/WorldDataResponseType";

import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB || "test";

const app = express();
const port = process.env.PORT || 3006;

app.all("*", function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get("/", async (req: Request, res: Response) => {
    // Get List Of Cases Per Country By Case Type (confirmed, recovered, deaths)
    const response = await axios.get("https://corona.lmao.ninja/v2/countries");
    res.send("Nothing to see here");
});

app.get("/fill-data", async (req: Request, res: Response) => {
    let data: WorldDataResponseType[] = [];
    await axios
        .get<WorldDataResponseType[]>("https://api.covid19api.com/world")
        .then((response) => {
            response.data.forEach((item) => {
                data.push({
                    ...item,
                    Date: new Date(item.Date),
                });
            });
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

app.get("/all-world-daily-data", async (req: Request, res: Response) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("WorldDaily");
        const data = await collection.find().toArray();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    } finally {
        client.close();
    }
});

app.get("/world-data", async (req: Request, res: Response) => {
    const start = (req.query.start as string) || "2021-01-01";
    const end = (req.query.end as string) || "2021-12-31";

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("WorldDaily");
        const data = await collection
            .find({ Date: { $gte: new Date(start), $lte: new Date(end) } })
            .toArray();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        client.close();
    }
});

app.listen(port, () => {
    console.log("app listening on port", port);
});
