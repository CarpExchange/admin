import { useContext, useState } from "react";
import { useFetchBanners } from "@/hooks/queries/FetchBanners";
import { InAppBanner } from "@/api/banners/types";
import { AuthContext } from "../AuthProvider";
import BannerEditForm from "./EditBannerModal";
import CreateBannerForm from "./CreateBannerModal";
import Modal from "./Modal";
import SkeletonBanner from "./SkeletonLoader";
import { Edit2 } from "lucide-react";

export default function BannerViewer() {
  const [from, setFrom] = useState<Date | null>(new Date('2024-01-01'));
  const [to, setTo] = useState<Date | null>(new Date());
  const { state: { user_info } } = useContext(AuthContext);

  const { banners, isLoading, refetch } = useFetchBanners({
    from: from || new Date('2024-01-01'),
    to: to || new Date(),
  });
  const inAppBanners = banners?.data ?? [];

  const [selectedBanner, setSelectedBanner] = useState<any>(null);
  const [creatingBanner, setCreatingBanner] = useState(false);

  return (
    <section className="bg-white p-0">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Campaign Banners
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage in-app announcements and marketing campaigns.
          </p>
        </div>

        <button
          onClick={() => setCreatingBanner(true)}
          className="bg-black text-white px-4 py-2 text-sm rounded-lg hover:opacity-90 transition"
        >
          + New Banner
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="date"
          value={from ? from.toISOString().split("T")[0] : ""}
          onChange={(e) => setFrom(e.target.value ? new Date(e.target.value) : null)}
          className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
        />
        <input
          type="date"
          value={to ? to.toISOString().split("T")[0] : ""}
          onChange={(e) => setTo(e.target.value ? new Date(e.target.value) : null)}
          className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
        />

        <button
          onClick={() => {
            setFrom(null);
            setTo(null);
            refetch();
          }}
          className="text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          Reset
        </button>
      </div>

      {/* Loading */}
      {isLoading && <SkeletonBanner />}

      {/* Banner Grid */}
      {!isLoading && inAppBanners.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...inAppBanners]
            .sort(
              (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
            )
            .map((banner: InAppBanner) => (
              <div
                key={banner.id}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
              >
                {/* Top Section */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {banner.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {banner.content}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (!user_info?.uid) return;

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
                    className="p-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>

                {/* Image Preview */}
                {banner.image_url && (
                  <div className="mb-4">
                    <img
                      src={banner.image_url}
                      alt={banner.title}
                      className="w-full h-36 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center text-sm">
                  <a
                    href={banner.action_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black underline"
                  >
                    Open Link
                  </a>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${banner.is_active
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                      }`}
                  >
                    {banner.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && inAppBanners.length === 0 && (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500 text-sm">
            No banners found for the selected range.
          </p>
        </div>
      )}

      {/* Edit Modal */}
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

      {/* Create Modal */}
      {creatingBanner && (
        <Modal onClose={() => setCreatingBanner(false)}>
          <CreateBannerForm
            banner={{
              title: "",
              content: "",
              image_url: "",
              action_url: "",
              is_active: true,
            }}
            onClose={() => {
              setCreatingBanner(false);
              refetch();
            }}
          />
        </Modal>
      )}
    </section>
  );
}