import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/components/AuthProvider';
import { useCreateBanner } from '@/hooks/mutations/useCreateBanner';

interface Props {
  banner: {
    title: string;
    content: string;
    image_url: string;
    action_url: string;
    is_active: boolean;
  };
  onClose: () => void;
  // refetch: () => void;
}

export default function CreateBannerForm({ banner, onClose }: Props) {
  const { state: { user_info } } = useContext(AuthContext);

  const [title, setTitle] = useState(banner.title);
  const [content, setContent] = useState(banner.content);
  const [imageUrl, setImageUrl] = useState(banner.image_url);
  const [actionUrl, setActionUrl] = useState(banner.action_url);
  const [isActive, setIsActive] = useState(banner.is_active);

  const { mutate, isPending } = useCreateBanner(() => {
    onClose(); // Close modal or form on success
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user_info?.uid) return;

    mutate({
      id: user_info.uid,
      title,
      content,
      image_url: imageUrl,
      action_url: actionUrl,
      is_active: isActive,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-[#003399]">Edit Banner</h2>

      <div>
        <label className="block text-sm font-medium text-[#003399] mb-1">Banner Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#003399] mb-1">Banner Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={4}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#003399] mb-1">Action URL</label>
        <input
          value={actionUrl}
          onChange={(e) => setActionUrl(e.target.value)}
          placeholder="Action URL"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#003399] mb-1">Image URL</label>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Active</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-[#003399] rounded-full peer peer-checked:bg-[#003399] transition-all duration-300"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
        </label>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#003399] text-white py-3 rounded-lg font-medium hover:bg-[#002080] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? 'Saving...' : 'Create Banner'}
      </button>
    </form>

  );
}
