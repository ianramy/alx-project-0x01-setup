import { UserData, UserModalProps } from '../../interfaces';
import { useState } from 'react';


const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser, onSubmit }) => {
  const [user, setUser] = useState<UserData>({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: { lat: '', lng: '' },
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [group, field] = name.split('.');
    setUser((prev: UserData) => ({
      ...prev,
      [group]: {
        ...(prev as Record<string, any>)[group],
        [field]: value,
      },
    }));
    } else {
    setUser((prev: UserData) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} className="input" />
          <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} className="input" />
          <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="input" />
          <input type="text" name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} className="input" />
          <input type="text" name="website" placeholder="Website" value={user.website} onChange={handleChange} className="input" />
          <input type="text" name="company.name" placeholder="Company Name" value={user.company.name} onChange={handleChange} className="input" />
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-red-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
