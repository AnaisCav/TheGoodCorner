import AdCard from "@/components/AdCard";
import Layout from "@/components/Layout";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/graphql/generated/schema";
import { FormEvent, useState } from "react";

export default function Profile() {
  const [error, setError] = useState("");
  const [updateProfile] = useUpdateProfileMutation();

  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  if (!currentUser)
    return <Layout pageTitle="Mon profil">Chargement...</Layout>;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    try {
      const res = await updateProfile({ variables: { data: formJSON } });
    } catch (e: any) {
      setError("Une erreur est survenue");
      console.log(e);
    }
  };

  return (
    <Layout pageTitle="Mon profil">
      <h1 className="pt-6 pb-6 text-2xl">Mon profil</h1>

      <form onSubmit={handleSubmit} className="pb-12">
        <div className="flex justify-between mb-3 gap-8">
          <div className="flex flex-col w-full max-w-xs">
            <label className="label" htmlFor="nickname">
              <span className="label-text">Pseudo</span>
            </label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              minLength={2}
              maxLength={30}
              defaultValue={currentUser.profile.nickname}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex w-full gap-4">
            <div className="form-control w-full">
              <label className="label w-full" htmlFor="avatar">
                <span className="label-text">Avatar</span>
              </label>
              <input
                type="url"
                name="avatar"
                id="avatar"
                minLength={2}
                maxLength={255}
                defaultValue={currentUser.profile.avatar}
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <img
              src={currentUser.profile.avatar}
              alt={currentUser.profile.nickname}
              className="h-24 w-24 rounded-full"
            />
          </div>
        </div>

        {error !== "" && <pre className="text-red-700">{error}</pre>}
        <button className="btn btn-primary text-white mt-4 w-auto">
          Mettre à jour
        </button>

        <div className="mt-12">
          <h2 className="text-xl mb-2">Mes annonces</h2>

          <section className="flex flex-wrap pb-24">
            {currentUser.profile.ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
            ))}
          </section>
        </div>
      </form>
    </Layout>
  );
}
