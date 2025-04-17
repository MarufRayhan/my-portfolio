// app/api/blog/[slug]/route.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const post = getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

function getPostBySlug(slug) {
  const postsDirectory = path.join(process.cwd(), "data/blog-posts");
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Combine the data with the slug and content
    return {
      slug,
      content,
      ...data,
    };
  } catch (error) {
    console.error(`Error reading file for slug ${slug}:`, error);
    return null;
  }
}
