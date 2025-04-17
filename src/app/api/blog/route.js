// app/api/blog/route.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "data/blog-posts");

  try {
    if (!fs.existsSync(postsDirectory)) {
      console.error(`Directory does not exist: ${postsDirectory}`);
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        // Combine the data with the slug
        return {
          slug,
          content,
          ...data,
        };
      });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}
