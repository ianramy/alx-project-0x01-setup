import Header from '@/components/layout/Header';
import UserCard from '@/components/common/UserCard';
import UserModal from '@/components/common/UserModal';
import { UserProps } from '@/interfaces';
import { useState } from 'react';

interface UsersPageProps {
  users: UserProps[];
}

const Users: React.FC<UsersPageProps> = ({ users }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userList, setUserList] = useState<UserProps[]>(users);

  const handleAddUser = (newUser: UserProps) => {
    const newId = userList.length + 1;
    setUserList([...userList, { ...newUser, userId: newId }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">User List</h1>
          <button onClick={() => setModalOpen(true)} className="bg-blue-700 px-4 py-2 rounded-full text-white">
            Add User
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userList.map((user) => (
            <UserCard key={user.userId} {...user} />
          ))}
        </div>
      </main>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddUser={handleAddUser}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export async function getStaticProps() {
    const [usersResponse, postsResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts'),
    ]);
  
    const users = await usersResponse.json();
    const posts = await postsResponse.json();
  
    const usersWithPosts = users.map((user: any) => ({
      ...user,
      userId: user.id,
      posts: posts.filter((post: any) => post.userId === user.id),
    }));
  
    return { props: { users: usersWithPosts } };
  }
  

export default Users;
