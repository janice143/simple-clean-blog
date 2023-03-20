import Content from "@/pages/content";
import { getAllPosts, uploadToDB } from "./api/post";
// import mongodb from "../../config/mongodb";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";
// import Posts from "../../models/post";

const Home = ({ posts }: any) => {
  const [inputVal, setInputVal] = useState<string>();
  const handleInput = (val: string) => {
    setInputVal(val);
  };
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col wrapper">
        <Navbar handleInput={handleInput} />
        <Content posts={posts} filter={inputVal} />
        <Footer />
      </div>
    </div>
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
