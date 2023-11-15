import express from "express";

const app = express();

app.use(express.json());

const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ad", (req, res) => {
  res.send(ads);
});

app.get("/ad/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(ads.find((ad) => ad.id === id));
});

app.post("/ad", (req, res) => {
  ads.push(req.body);
  res.send("Request received, check the backend terminal");
});

app.delete("/ad/:id", (req, res) => {
  console.log(`deleting ad #${req.params.id}`);

  ads = ads.filter((ad) => req.params.id !== ad.id.toString());

  // Autre méthodes :

  // for (let i = 0; i < ads.length; i++) {
  //   if (req.params.id === ads[i].id.toString()) {
  //     ads.splice(i, 1);
  //   }
  // }

  // ads.splice(
  //   ads.findIndex((ad) => ad.id.toString() === req.params.id),
  //   1
  // );

  res.sendStatus(204);
});

app.patch("/ad/:id", (req, res) => {
  ads = ads.map((ad) => {
    if (ad.id.toString() === req.params.id) {
      return { ...ad, ...req.body };
    }
    return ad;
  });

  res.send(ads.find((ad) => ad.id.toString() === req.params.id));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

let ads = [
  {
    id: 1,
    title: "Bike to sell",
    description:
      "My bike is blue, working fine. I'm selling it because I've got a new one",
    owner: "bike.seller@gmail.com",
    price: 100,
    picture:
      "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
    location: "Paris",
    createdAt: "2023-09-05T10:13:14.755Z",
  },
  {
    id: 2,
    title: "Car to sell",
    description:
      "My car is blue, working fine. I'm selling it because I've got a new one",
    owner: "car.seller@gmail.com",
    price: 10000,
    picture:
      "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
    location: "Paris",
    createdAt: "2023-10-05T10:14:15.922Z",
  },
];
