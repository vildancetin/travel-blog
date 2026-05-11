import React from "react";
import connectToDatabase from "@/lib/mongodb";
import Post, { IPost } from "@/models/Post";

interface Props {
  params: { slug: string };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const post = (await Post.findOne({ slug }).lean()) as unknown as IPost | null;

  if (!post) {
    return <div className="p-8">Article not found</div>;
  }

  const displayDate = post.createdAt ? new Date(post.createdAt).toLocaleString() : "";

  return (
    <article className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-gray-600 mb-6">{displayDate}</div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content || "" }} />
    </article>
  );
}