import React, { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";

const RecentAds = () => {
  const [total, setTotal] = useState(0);

  const everyRender = () => {
    console.log("This will be executed after every render");
  };

  useEffect(() => {
    const firstRenderOnly = () => {
      setTotal(1);
      console.log(
        "This will be executed after the first render only. Even if I change the state"
      );
    };
    firstRenderOnly();
  }, []);

  const ads: AdCardProps[] = [
    {
      id: 1,
      imgUrl: "/images/table.webp",
      link: "/ad/1",
      price: 120,
      title: "Table",
    },
    {
      id: 2,
      imgUrl: "/images/dame-jeanne.webp",
      link: "/ad/2",
      price: 75,
      title: "Dame-jeanne",
    },
    {
      id: 3,
      imgUrl: "/images/vide-poche.webp",
      link: "/ad/3",
      price: 4,
      title: "Vide-poche",
    },
    {
      id: 4,
      imgUrl: "/images/vaisselier.webp",
      link: "/ad/4",
      price: 900,
      title: "Vaisselier",
    },
    {
      id: 5,
      imgUrl: "/images/bougie.webp",
      link: "/ad/5",
      price: 8,
      title: "Bougie",
    },
    {
      id: 6,
      imgUrl: "/images/porte-magazine.webp",
      link: "/ad/6",
      price: 45,
      title: "Porte-magazine",
    },
  ];
  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total : {total} €</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              imgUrl={ad.imgUrl}
              link={ad.link}
              price={ad.price}
              title={ad.title}
            />
            <button
              className="button"
              onClick={() => {
                setTotal(total + ad.price);
              }}
            >
              Add price to total
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
