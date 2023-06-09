import styles from "@/styles/Content.module.scss";
import Link from "next/link";

const Content = ({ posts, filter }: any) => {
  const curPosts =
    posts?.filter((post: any) => {
      if (!post || !post.title) return false;
      return filter ? post.title.includes(filter) : true;
    }) || [];

  return (
    <main className={`${styles.contentContainer}`}>
      {curPosts.length > 0 ? (
        <ul className={styles.main}>
          {curPosts.map((post: any) => (
            <li
              key={post.date}
              className={styles.postsList}
              style={{ overflow: "hidden" }}
            >
              <Link
                // href={{
                //   pathname: "/source/_posts/useCallback",
                // }}
                href={{
                  pathname: "/post/[slug]",
                  query: { slug: post.slug },
                }}
                className="pr-3"
              >
                {post.title}
              </Link>
              <div className={styles.contentDate}>{post.date.slice(0, 10)}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>🙊🙊🙊 Oops! There is no content.</div>
      )}
    </main>
  );
};

export default Content;
