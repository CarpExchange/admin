import { useContext, useState } from 'react';
import { useFetchBanners } from '@/hooks/queries/FetchBanners';
import { InAppBanner } from '@/api/banners/types';
import Edit from '@/public/assets/svgs/Edit';
import BannerEditForm from './EditBannerModal';
import Modal from './Modal';
import { AuthContext } from '../AuthProvider';
import CreateBannerForm from './CreateBannerModal';
import SkeletonBanner from './SkeletonLoader';

export default function BannerViewer() {
  const [from, setFrom] = useState(new Date('2025-07-12'));
  const [to, setTo] = useState(new Date('2025-07-14'));
  const { state: { user_info } } = useContext(AuthContext);
  const { banners, isLoading, refetch } = useFetchBanners({ from, to });

  const inAppBanners = banners?.data ?? [];

  const [selectedBanner, setSelectedBanner] = useState(null);
  const [creatingBanner, setCreatingBanner] = useState(false);

  // Pagination logic
  const bannersPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(inAppBanners.length / bannersPerPage);
  const paginatedBanners = [...inAppBanners]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice((currentPage - 1) * bannersPerPage, currentPage * bannersPerPage);

  return (
    <div className="p-0 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#003399]">In-App Banners</h2>
        <button
          onClick={() => setCreatingBanner(true)}
          className="bg-[#003399] hover:bg-[#002080] text-white px-4 py-2 rounded-lg shadow transition"
        >
          + Create Banner
        </button>
      </div>

      {/* Date Filter */}
      <div className="flex gap-4 items-center mb-6">
        <input
          type="date"
          value={from.toISOString().split('T')[0]}
          onChange={(e) => setFrom(new Date(e.target.value))}
          className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
        <input
          type="date"
          value={to.toISOString().split('T')[0]}
          onChange={(e) => setTo(new Date(e.target.value))}
          className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
        <button
          onClick={() => {
            setTo(new Date());
            refetch();
          }}
          className="bg-[#003399] hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Jump to Today
        </button>
      </div>

      {isLoading && <SkeletonBanner />}

      {!isLoading && paginatedBanners.length === 0 && (
        <p className="text-center text-gray-500">No banners found for the selected date range.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedBanners.map((banner: InAppBanner) => (
          <div
            key={banner.id}
            className="relative border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-xl font-semibold text-[#003399]">{banner.title}</h3>
                <p className="text-sm text-gray-700">{banner.content}</p>
              </div>
            </div>

            <a
              href={banner.action_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 underline text-sm mb-4"
            >
              Visit Link
            </a>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium">Active</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={banner.is_active}
                  readOnly
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#003399] transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>

            <button
              onClick={() => {
                if (!user_info?.uid) {
                  console.error('User not available');
                  return;
                }
                setSelectedBanner({
                  id: user_info.uid,
                  banner_id: banner.id,
                  title: banner.title,
                  content: banner.content,
                  image_url: banner.image_url,
                  action_url: banner.action_url,
                  is_active: banner.is_active,
                });
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <Edit />
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-full border text-sm font-medium ${
                currentPage === i + 1
                  ? 'bg-[#003399] text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modals */}
      {selectedBanner && (
        <Modal onClose={() => setSelectedBanner(null)}>
          <BannerEditForm
            banner={selectedBanner}
            onClose={() => {
              setSelectedBanner(null);
              refetch();
            }}
          />
        </Modal>
      )}

      {creatingBanner && (
        <Modal onClose={() => setCreatingBanner(false)}>
          <CreateBannerForm
            banner={{
              title: '',
              content: '',
              image_url: '',
              action_url: '',
              is_active: true,
            }}
            onClose={() => {
              setCreatingBanner(false);
              refetch();
            }}
          />
        </Modal>
      )}
    </div>
  );
}
