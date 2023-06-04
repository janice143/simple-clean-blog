import Heart from "@/components/Heart";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import styles from "@/styles/Post.module.scss";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { IPost, getAllPosts, getPostBySlug } from "../../api/post";

const Post = ({ post }: { post: IPost }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div style={{ overflow: "auto", height: "90vh", paddingBottom: 60 }}>
      <div className={styles.lgHeart}>
        <Heart style={{ marginLeft: "auto" }} />
      </div>
      <article className="markdown-body">
        <div>
          <div>
            <h1>{post.title}</h1>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  // render iframe
                  if (className === "language-iframe") {
                    return (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: children[0] as string,
                        }}
                      />
                    );
                  }
                  // render aside
                  if (className === "language-aside") {
                    return (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: children[0] as string,
                        }}
                      />
                    );
                  }

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
          </div>
        </div>
      </article>

      {/* 移动端展示 */}
      <div className={styles.smHeart}>
        <Heart style={{ margin: "auto" }} />
      </div>
      {/* <div className="post-content">
            <div className="post-content-title">目录</div>
            <MarkNav
              source={post.content!}
              ordered={false}
              className="post-content-list"
            />
          </div> */}
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
