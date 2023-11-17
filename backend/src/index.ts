import "reflect-metadata";
import express, { Request, Response } from "express";
import db from "./db";
import { Ad } from "./entities/ad";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/ads", async (req, res) => {
  try {
    const ads = await Ad.find({
      relations: {
        tags: true,
        category: true,
      },
    });
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

app.post("/ads", async (req, res) => {
  try {
    const newAd = Ad.create(req.body);
    const newAdWithId = await newAd.save();
    res.send(newAdWithId);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/ads/:id", async (req: Request, res: Response) => {
  try {
    const adToDelete = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToDelete) return res.sendStatus(404);
    await adToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
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

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/categories", async (req, res) => {
  try {
    const newCategory = Category.create(req.body);
    const newCategoryWithId = await newCategory.save();
    res.send(newCategoryWithId);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.send(tags);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/tags", async (req, res) => {
  try {
    const newTag = Tag.create(req.body);
    const NewTagWithId = await newTag.save();
    res.send(NewTagWithId);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, async () => {
  await db.initialize();
  console.log(`Server running on port ${port} 🚀`);
});
