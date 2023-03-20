import Link from "next/link";

const Content = ({ posts, filter }: any) => {
  const curPosts = posts?.filter((post: any) => {
    return filter ? post.title.includes(filter) : true;
  });
  console.log(111, curPosts);

  return (
    <main>
      {curPosts.length > 0 ? (
        <ul>
          {curPosts.map((post: any) => (
            <li
              key={post.date}
              className="posts-list"
              style={{ overflow: "hidden" }}
            >
              <Link
                href={{
                  pathname: "/post/[slug]",
                  query: { slug: post.slug },
                }}
                className="pr-3"
              >
                {post.title}
              </Link>
              <em>{post.date.slice(0, 10)}</em>
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
