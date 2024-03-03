import DetailsPage from "@/components/templates/DetailsPage";
import { useRouter } from "next/router";

export default function Details({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h2>Loading page...</h2>;
  }

  return <DetailsPage {...data} />;
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const json = await res.json();
  const data = json.slice(0, 9);
  const paths = data.map((food) => ({
    params: {
      id: food.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  try {
    const {
      params: { id },
    } = context;
    const res = await fetch(`${process.env.BASE_URL}/data/${id}`);
    const data = await res.json();

    return {
      props: {
        data,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
