import Layout from "@/components/Layout";
import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";

function PostCategory() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    console.log("envoi de la catégorie", formJSON);
    axios
      .post("http://localhost:4000/categories", formJSON)
      .then((res) => {
        console.log("catégorie créée :", res.data);
        alert("ok");
        form.reset();
        router.reload();
      })
      .catch(console.error);
  };

  return (
    <Layout pageTitle="Ajout catégorie">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nom de la catégorie
          <input type="text" name="name" id="name" />
        </label>
        <button className="button">Submit</button>
      </form>
    </Layout>
  );
}

export default PostCategory;
