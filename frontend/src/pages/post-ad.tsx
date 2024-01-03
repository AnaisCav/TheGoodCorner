import Layout from "@/components/Layout";
import React, { FormEvent, useEffect, useState } from "react";
import { Category } from "@/types";
import { fromJSON } from "postcss";
import axios from "axios";

function PostAd() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form as HTMLFormElement);
    const formJSON = Object.fromEntries(formData.entries());
    (fromJSON as any).price = parseFloat((fromJSON as any).price);
    (fromJSON as any).category = Number((fromJSON as any).category);
    console.log("envoi de l'annonce", formJSON);
    axios
      .post("http://localhost:4000/ads", formJSON)
      .then((res) => {
        console.log("Annonce créée", res.data);
        alert("Ok!");
        form.reset();
      })
      .catch(console.error);
  };

  return (
    <Layout pageTitle="Création d'annonce">
      <form onSubmit={handleSubmit}>
        <div className="ad-post-form">
          <label htmlFor="title">
            Titre de l&apos;annonce
            <input type="text" id="title" name="title" />
          </label>
          <label htmlFor="price">
            Prix
            <input type="number" name="price" id="price" step={0.01} />
          </label>
          <label htmlFor="picture">
            Image
            <input type="url" name="picture" id="picture" />
          </label>
          <label htmlFor="owner">
            Propriétaire
            <input type="text" name="owner" id="owner" />
          </label>
          <label htmlFor="location">
            Localisation
            <input type="text" name="location" id="location" />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              name="description"
              id="description"
              style={{ resize: "none" }}
            />
          </label>
          <label htmlFor="category">
            Catégorie
            <select name="category" id="category">
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button className="button">Submit</button>
      </form>
    </Layout>
  );
}

export default PostAd;
