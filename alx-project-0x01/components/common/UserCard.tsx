import { UserProps } from '@/interfaces';

const UserCard: React.FC<UserProps> = ({ name, username, email, phone, website, company }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold text-gray-800">{name} (@{username})</h2>
      <p className="text-gray-600">📧 {email}</p>
      <p className="text-gray-600">📞 {phone}</p>
      <p className="text-gray-600">🌐 {website}</p>
      <p className="text-gray-500 mt-2 text-sm">🏢 {company?.name}</p>
    </div>
  );
};

export default UserCard;
