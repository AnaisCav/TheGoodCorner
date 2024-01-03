import React, { useEffect, useState } from "react";
import axios from "axios";
import AdCard, { AdCardProps } from "./AdCard";

const RecentAds = () => {
  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>(
          "http://localhost:4000/ads"
        );
        setAds(result.data);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total : {total} €</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              picture={ad.picture}
              price={ad.price}
              title={ad.title}
              link={`/ads/${ad.id}`}
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
