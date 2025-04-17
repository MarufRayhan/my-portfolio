import BlogPost from "../../components/BlogPost";

export default function BlogPostPage({ params }) {
  return <BlogPost slug={params.slug} />;
}
