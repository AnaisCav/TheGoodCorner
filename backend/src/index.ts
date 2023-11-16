import "reflect-metadata";
import express, { Request, Response } from "express";
import sqlite from "sqlite3";
import { dataSource } from "./config/db";
import { Ad } from "./entities/ad";

const db = new sqlite.Database("the_good_corner.sqlite");

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/ads", async (req, res) => {
  try {
    const ads = await Ad.find();
    res.send(ads);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/ads/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ad = await Ad.findOneBy({ id });

    if (ad === null) return res.sendStatus(422);
    res.send(ad);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/ads", (req, res) => {
  try {
    const ad = new Ad();

    ad.title = req.body.title;
    ad.description = req.body.description;
    ad.owner = req.body.owner;
    ad.price = req.body.price;
    ad.picture = req.body.picture;
    ad.location = req.body.location;
    ad.createdAd = req.body.createdAd;

    ad.save();

    res.send(ad);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.delete("/ads/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ad = await Ad.findOneBy({ id });

    if (ad === null) return res.sendStatus(404);

    res.send("Ok");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.put("/ads/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ad = await Ad.findOneBy({ id });

    if (ad !== null) {
      ad.title = req.body.title;
      ad.description = req.body.description;
      ad.owner = req.body.owner;
      ad.price = req.body.price;
      ad.picture = req.body.picture;
      ad.location = req.body.location;
      ad.createdAd = req.body.createdAd;

      ad.save();
    }
    res.send(ad);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server running on port ${port} 🚀`);
});
