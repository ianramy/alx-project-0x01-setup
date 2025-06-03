import React from 'react';
import { PostProps } from '@/interfaces';

const PostCard: React.FC<PostProps> = ({ id, userId, title, author, date, excerpt, onClick }) => {
    return (
        <div
            className="post-card"
            style={{
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                padding: 20,
                marginBottom: 20,
                cursor: onClick ? 'pointer' : 'default',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
            onClick={onClick}
            tabIndex={onClick ? 0 : -1}
            role={onClick ? 'button' : undefined}
            aria-pressed={onClick ? false : undefined}
        >
            <h2 style={{ margin: '0 0 10px 0', fontSize: 22 }}>{title}</h2>
            <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>
                By {author} &middot; {date}
            </div>
            <p style={{ margin: '4px 0', color: '#666', fontSize: 14 }}>
                User ID: {userId}
            </p>
            <p style={{ margin: '4px 0 10px 0', color: '#666', fontSize: 14 }}>
                Post ID: {id}
            </p>
            <p style={{ margin: 0, color: '#444', fontSize: 16 }}>{excerpt}</p>
        </div>
    );
};

export default PostCard;
