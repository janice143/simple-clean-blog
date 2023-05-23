import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Navbar from "@/components/Navbar";
import { getPostBySlug, getAllPosts } from "../api/post";
import Footer from "../../components/Footer";
import { IPost } from "../api/post";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import MarkNav from "markdown-navbar";

const Post = ({ post }: { post: IPost }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col wrapper">
        <Navbar />
        <div className="flex flex-row">
          <article className="markdown-body" style={{ maxWidth: 800 }}>
            {
              <div>
                <h1>{post.title}</h1>
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      return !inline ? (
                        <SyntaxHighlighter>
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {post.content!}
                </ReactMarkdown>
                ,
              </div>
            }
          </article>
          <div className="post-content">
            <div className="post-content-title">目录</div>
            <MarkNav
              source={post.content!}
              ordered={false}
              className="post-content-list"
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const post = await getPostBySlug(params.slug);
  return {
    props: {
      post,
    },
  };
};

export async function getStaticPaths() {
  const posts = await getAllPosts();

  return {
    paths: posts.map((posts: any) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
