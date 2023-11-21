import Layout from "@/components/Layout";
import { useRouter } from "next/router";

const AdDetailComponent = () => {
  const router = useRouter();
  console.log(router);

  return (
    <Layout pageTitle={`Annonce n°${router.query.id}`}>
      <p>Display details of ad with id {router.query.id}</p>
    </Layout>
  );
};

export default AdDetailComponent;
