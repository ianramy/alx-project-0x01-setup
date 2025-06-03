export interface UserProps {
    userId: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
    posts?: PostProps[];
  }
  
export interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddUser: (newUser: UserProps) => void;
    onSubmit: (post: UserProps) => void;
  }


export interface PostData {
    id?: number;
    userId: number;
    author: string;
    title: string;
    body: string;
    date: string;
    excerpt: string;
}

export interface PostProps {
    id?: number;
    userId: number;
    title: string;
    body?: string;
    author: string;
    date: string;
    excerpt: string;
    onClick?: () => void;
}

export interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (post: PostData) => void;
    initialContent?: string;
    title?: string;
}