import React, { useState, useRef, useEffect } from 'react';
import { PostData, PostModalProps } from '@/interfaces';

const PostModal = <T extends PostData>({ 
    isOpen, 
    onClose, 
    onSubmit, 
    initialContent = '', 
    title = 'Create Post' 
}: PostModalProps): React.ReactElement | null => {
    const [content, setContent] = useState(initialContent);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setContent(initialContent);
        }
    }, [isOpen, initialContent]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            onSubmit({
                id: Date.now(),
                title: title.trim(),
                body: content.trim(),
                author: 'Anonymous',
                date: new Date().toISOString(),
                excerpt: content.trim().slice(0, 100)
              } as PostData);
            setContent('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            aria-modal="true"
            role="dialog"
        >
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="text-gray-500 hover:text-gray-700"
                        type="button"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full border rounded p-2 mb-4 resize-none focus:outline-none focus:ring"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        required
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            disabled={!content.trim()}
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostModal;