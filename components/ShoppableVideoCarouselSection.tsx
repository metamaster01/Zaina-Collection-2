// ShoppableVideoCarouselSection.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { ShoppableVideo, Product } from '../types';
import PlayCircleIcon from './icons/PlayCircleIcon';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import CloseIcon from './icons/CloseIcon';

/* ============================ VideoCard (white bg, engaging) ============================ */
interface VideoCardProps {
  video: ShoppableVideo;
  onClick: (video: ShoppableVideo) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div
      role="button"
      aria-label={`Play video: ${video.title}`}
      onClick={() => onClick(video)}
      className="group relative aspect-[9/16] w-full bg-white rounded-2xl overflow-hidden
                 border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-0.5
                 transition-all duration-300"
    >
      {/* Cover */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Badges */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        {video.tag && (
          <span className="inline-flex items-center rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-neutral-900 shadow ring-1 ring-black/5">
            #{video.tag}
          </span>
        )}
        <span className="hidden sm:inline-flex items-center rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-neutral-900 shadow ring-1 ring-black/5">
          <ShoppingCartIcon className="w-3.5 h-3.5 mr-1" /> Shop the look
        </span>
      </div>

      {/* Play pill */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-4 py-2 shadow ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
          <PlayCircleIcon className="w-5 h-5 text-neutral-900" />
          <span className="ml-2 text-sm font-semibold text-neutral-900">Play</span>
        </div>
      </div>

      {/* Title */}
      <div className="absolute inset-x-3 bottom-3 text-white drop-shadow">
        <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
      </div>
    </div>
  );
};

/* ================== VideoPlayerModal (CENTERED + TALL ON DESKTOP) ================== */
interface VideoPlayerModalProps {
  video: ShoppableVideo | null;
  allProducts: Product[];
  isOpen: boolean;
  onClose: () => void;
  onQuickShop: (product: Product) => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  allProducts,
  isOpen,
  onClose,
  onQuickShop,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Modal controls body scroll lock */
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow || '';
    };
  }, [isOpen]);

  /* ESC close */
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* Focus trap entry */
  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen]);

  const isActive = isOpen && !!video;
  const featuredProducts = isActive
    ? allProducts.filter(p => video!.featuredProductIds.includes(p.id))
    : [];

  const handleClose = () => {
    if (videoRef.current) videoRef.current.pause();
    onClose();
  };

  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-[2px]
                 flex items-center justify-center px-3 sm:px-6 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={handleClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="
          relative bg-white dark:bg-dark-zaina-bg-card rounded-2xl shadow-2xl ring-1 ring-black/10 overflow-hidden
          w-full max-w-[94vw] md:max-w-[62rem] lg:max-w-[66rem]
          h-auto md:h-[92dvh]               /* <-- explicit tall height on desktop */
          grid grid-cols-1 md:grid-cols-[1fr_360px]
        "
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full
                     bg-white/95 dark:bg-dark-zaina-bg-card/90 backdrop-blur p-2 shadow
                     ring-1 ring-black/10 hover:bg-white transition"
          aria-label="Close video"
        >
          <CloseIcon className="w-5 h-5 text-neutral-900 dark:text-white" />
        </button>

        {/* VIDEO COLUMN — 16:9 on mobile; FILL HEIGHT on desktop */}
        <div className="relative bg-black aspect-video md:aspect-auto md:h-full">
          <video
            ref={videoRef}
            src={video!.videoUrl}
            poster={video!.thumbnailUrl}
            controls
            autoPlay
            playsInline
            muted
            loop
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-contain bg-black"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* SIDEBAR — scrolls independently if tall */}
        <aside className="bg-white dark:bg-dark-zaina-neutral-medium p-4 md:p-5 overflow-y-auto h-auto md:h-full">
          <h3 id="video-modal-title" className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white mb-1">
            {video!.title}
          </h3>
          {video!.tag && (
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-3">#{video!.tag}</p>
          )}

          {featuredProducts.length > 0 ? (
            <div className="space-y-3">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-start p-2 bg-white dark:bg-dark-zaina-bg-card rounded-lg
                             border border-neutral-200/70 dark:border-white/10 shadow-sm"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-20 object-cover rounded mr-3 flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <h4 className="text-xs font-medium text-neutral-900 dark:text-white line-clamp-2">
                      {product.name}
                    </h4>
                    <div className="text-xs my-1">
                      <span className="font-bold text-neutral-900 dark:text-white">
                        ₹{product.price.toFixed(2)}
                      </span>
                      {product.mrp > product.price && (
                        <span className="line-through text-neutral-500 ml-1.5">
                          ₹{product.mrp.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onQuickShop(product)}
                      className="mt-1 w-full inline-flex items-center justify-center gap-1.5
                                 rounded-md px-2.5 py-1.5 text-[11px] font-semibold
                                 bg-neutral-900 text-white hover:bg-neutral-800
                                 shadow-sm ring-1 ring-neutral-900/10 transition"
                    >
                      <ShoppingCartIcon className="w-3.5 h-3.5" />
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center py-10">
              No products featured in this video.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
};

/* ============================ Main Carousel Section ============================ */
interface ShoppableVideoCarouselSectionProps {
  videos: ShoppableVideo[];
  allProducts: Product[];
  onQuickShop: (product: Product) => void;
}

const ShoppableVideoCarouselSection: React.FC<ShoppableVideoCarouselSectionProps> = ({
  videos,
  allProducts,
  onQuickShop,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<ShoppableVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoCardClick = (video: ShoppableVideo) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    // Do NOT touch body overflow here; modal handles it.
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    // Modal restores body scroll on unmount.
  };

  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-6 md:py-8 bg-white" id="zainagram">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:4xl font-heading-cinzel font-bold text-center text-neutral-900 dark:text-white mb-10 md:mb-12">
          #ZainaGram
        </h2>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={16}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            520: { slidesPerView: 1.6, spaceBetween: 18 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="pb-10"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <VideoCard video={video} onClick={handleVideoCardClick} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <VideoPlayerModal
        video={selectedVideo}
        allProducts={allProducts}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onQuickShop={onQuickShop}
      />
    </section>
  );
};

export default ShoppableVideoCarouselSection;
