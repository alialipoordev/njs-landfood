import MenuPage from "@/components/templates/MenuPage";

export default function Menu({ data }) {
  return <MenuPage data={data} />;
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
