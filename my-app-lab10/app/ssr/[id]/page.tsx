import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = { title: 'SSR Post' };

// Task 1 – Dynamic SSR page.
// The equivalent of Pages-Router getServerSideProps(context) in the App Router:
// this server component runs at request time and receives the dynamic route
// segment as `params` (the `/ssr/2` in the URL gives id = "2").
async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return (
    <div>
      <h1>Dynamic SSR Page</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </div>
  );
}

export default function SSRPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p>Loading post…</p>}>
      <Post params={params} />
    </Suspense>
  );
}
