import Content from "@/pages/content";
import Head from "next/head";
import { useContext } from "react";
import { getAllPosts } from "./api/post";
import { inputValContext } from "./context/inputValContext";

const Home = ({ posts }: any) => {
  const inputVal = useContext(inputValContext);

  return (
    <>
      <Head>
        <title>blog | home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Content posts={posts} filter={inputVal} />
    </>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPosts();

  // upload local file to mongodb
  // const promises: any = await uploadToDB(posts);
  // await Promise.all(promises);

  return {
    props: { posts },
  };
};

export default Home;
