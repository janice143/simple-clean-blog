import Content from "@/pages/content";
import { getAllPosts } from "./api/post";
// import mongodb from "../../config/mongodb";
// import Posts from "../../models/post";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Head from "next/head";

const Home = ({ posts }: any) => {
  const [inputVal, setInputVal] = useState<string>();
  const handleInput = (val: string) => {
    setInputVal(val);
  };
  return (
    <>
      <Head>
        <title>blog | home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="page-container">
        <Navbar handleInput={handleInput} />
        <div className="wrapper">
          <Content posts={posts} filter={inputVal} />
          <Footer />
        </div>
      </div>
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
