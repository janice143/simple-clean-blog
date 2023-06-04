import fs from "fs";
import matter from "gray-matter";
import path from "path";
import ReadingTime from "reading-time";
// import mongodb from "../../../config/mongodb";

export interface IPost {
  title?: string;
  slug?: string;
  content?: string;
  date?: string;
  categories?: string;
  readingTime?: string;
}

const root = process.cwd();
const postsDirectory = path.join(root, "source", "_posts");

// get posts from local
export function getAllPosts() {
  const allBlogFiles = fs.readdirSync(postsDirectory);

  const allFileDatas = allBlogFiles.map((filename) => {
    const fileData = fs.readFileSync(
      path.join(postsDirectory, filename),
      "utf-8"
    );
    const matterData = matter(fileData);
    const slug = filename.replace(".md", "");
    const { data } = matterData;
    data.slug = slug;
    data.date = data.date
      ? JSON.stringify(data.date).replace(/[\\*"*'*]/g, "")
      : JSON.stringify(new Date()).replace(/[\\]/g, "");
    return matterData;
  });

  const posts: IPost[] = allFileDatas
    .map((fileData) => {
      const { data, content } = fileData;
      return {
        ...data,
        content,
        readingTime: ReadingTime(content).text,
      };
    })
    .sort((a: IPost, b: IPost) => +new Date(b.date!) - +new Date(a.date!));

  return posts;
}

// export async function uploadToDB(posts: Array<Record<any, any>>) {
//   await mongodb();
//   return posts.map((post: Record<any, any>) => {
//     return Posts.updateOne(
//       { date: post.date },
//       {
//         $set: {
//           ...post,
//         },
//       },
//       {
//         upsert: true,
//         setDefaultsOnInsert: true,
//       }
//     );
//   });
// }

// get post from mongodb
// export async function getAllPosts() {
//   await mongodb();
//   const res = await Posts.find({}).sort({ date: 1 });
//   return JSON.parse(JSON.stringify(res));
// }

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((post: any) => post.slug === slug);
}
