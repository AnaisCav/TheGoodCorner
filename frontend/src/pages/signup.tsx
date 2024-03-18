import Layout from "@/components/Layout";
import { useSignupMutation } from "@/graphql/generated/schema";
import { Tag } from "@/types";
import { FormEvent, useState } from "react";

export default function NewAd() {
  const [error, setError] = useState("");
  const [createUser] = useSignupMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    try {
      await createUser({ variables: { data: formJSON } });
      alert("Compte créé");
    } catch (e) {
      setError("Une erreur est survenue");
    }
  };

  return (
    <Layout pageTitle="Creer un compte">
      <h1 className="pt-6 pb-6 text-2xl">Créer un compte</h1>

      <form onSubmit={handleSubmit} className="pb-12">
        <div className="flex flex-wrap gap-6 mb-3">
          <div className="form-control w-full">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mb-3">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="password">
              <span className="label-text">Mot de passe</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="nickname">
              <span className="label-text">Pseudo</span>
            </label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              minLength={2}
              maxLength={30}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        {error !== "" && <div className="text-red-700">{error}</div>}
        <button className="btn btn-primary text-white mt-12 w-full">
          Envoyer
        </button>
      </form>
    </Layout>
  );
}
