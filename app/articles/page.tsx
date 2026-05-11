import React from "react";
import Link from "next/link";
import connectToDatabase from "@/lib/mongodb";
import Post, { IPost } from "@/models/Post";

type PostType = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  published?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export default async function ArticlesPage() {
  await connectToDatabase();
  const postsRaw = (await Post.find({}).sort({ createdAt: -1 }).lean()) as unknown as IPost[];
  const posts: PostType[] = postsRaw.map((p) => ({
    _id: String(p._id),
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    tags: p.tags,
    published: p.published,
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : undefined,
    updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : undefined,
  }));

  return (
    <section className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post: PostType) => {
            const displayDate = post.createdAt ? new Date(post.createdAt).toLocaleString() : "";
            return (
              <li key={post._id} className="border rounded p-4 bg-white/60">
                <Link href={`/articles/${post.slug}`} className="block">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  {post.excerpt && <p className="text-sm text-muted mt-2">{post.excerpt}</p>}
                  <div className="text-xs text-gray-500 mt-2">{displayDate}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}