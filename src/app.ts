import express, { Request, Response } from "express";
import axios from "axios";
import * as redis from "redis";
import "dotenv/config";

const app = express();

const VISUALCROSSING_API_KEY: string | undefined =
    process.env.VISUALCROSSING_API_KEY;
const PORT: number = +(process.env.PORT || 3000);

let redisClient;

(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
})();

app.get("/weather-api/:city", async (req: Request, res: Response, next) => {
    try {
        if (!VISUALCROSSING_API_KEY) {
            throw new Error(
                "Error fetching https://weather.visualcrossing.com: no api key provided"
            );
        }

        const city: string = req.params.city;
        let isCached = false;
        let results: object;
        let data: object;

        const cacheResults = await redisClient.get(city);
        if (cacheResults) {
            isCached = true;
            data = JSON.parse(cacheResults);
        } else {
            results = await axios.get(
                "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
                    city +
                    "?unitGroup=metric&key=" +
                    VISUALCROSSING_API_KEY +
                    "&contentType=json"
            );

            data = results["data"];

            await redisClient.set(city, JSON.stringify(data));
        }

        res.setHeader("Content-Type", "application/json");
        res.send({ fromCache: isCached, data: data });
    } catch (error) {
        return next(error);
    }
});

app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
});

app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});
