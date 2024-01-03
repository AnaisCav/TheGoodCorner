import Layout from "@/components/Layout";
import { Ad } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AdDetailComponent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ad, setAd] = useState<Ad>();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/ads/${id}`)
      .then((res) => setAd(res.data))
      .catch(console.error);
  }, []);

  return (
    <Layout pageTitle={`Annonce n°${router.query.id}`}>
      <main className="main-content">
        <h2 className="ad-details-title">{ad?.title}</h2>
        <section className="ad-details">
          <div className="ad-details-image-container">
            <img
              className="ad-details-image"
              src={ad?.picture}
              alt={ad?.title}
            />
          </div>
          <div className="ad-details-info">
            <div className="ad-details-price">120 €</div>
            <div className="ad-details-description">{ad?.description}</div>
            <p>Localisation : {ad?.location}</p>
            <hr className="separator" />
            <div className="ad-details-owner">
              Annoncée publiée par {ad?.owner} le {ad?.createdAt}.
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AdDetailComponent;
