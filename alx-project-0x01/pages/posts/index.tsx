import PostCard from '@/components/common/PostCard';
import PostModal from '@/components/common/PostModal';
import Header from '@/components/layout/Header';
import { PostProps } from '@/interfaces';
import { PostData } from '@/interfaces';
import { useState } from 'react';

interface PostsPageProps {
  posts: PostProps[];
}

const Posts: React.FC<PostsPageProps> = ({ posts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [postList, setPostList] = useState<PostData[]>(
    posts.map((post) => ({
        id: post.id,
        userId: post.userId,
        author: String(post.userId),
        title: post.title,
        body: post.body ?? '',
        date: new Date().toISOString(),
        excerpt: post.body?.slice(0, 100) + '...'
      }))
  );
  const [post, setPost] = useState<PostData | null>(null);

  const handleAddPost = (newPost: PostData) => {
    const newId = postList.length + 1;
    setPostList([...postList, { ...newPost, id: newId }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Post Content</h1>
          <button onClick={() => setModalOpen(true)} className="bg-blue-700 px-4 py-2 rounded-full text-white">
            Add Post
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {postList.map((post) => (
            <PostCard
              key={post.id}
              id={post.id ?? 0}
              userId={post.userId ?? 0}
              author={post.author}
              title={post.title}
              body={post.body}
              date={post.date}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <PostModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddPost}
        />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
  return { props: { posts } };
}

export default Posts;
