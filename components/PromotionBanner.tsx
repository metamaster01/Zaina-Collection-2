"use client"

export default function PromotionBanner() {
  const handleShopNowClick = () => {
    window.location.href = "/shop"
  }

  return (
    <div className="w-full bg-white py-8 px-4 rounded-3xl shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[400px] w-full">
          {/* Left Content Section */}
          <div className="flex flex-col justify-center items-start px-8 lg:px-12 py-12 lg:py-16 bg-gradient-to-r from-pink-50 to-orange-50 rounded-3xl">
            <div className="space-y-6">
              {/* Small heading */}
              <p className="text-sm font-medium text-gray-600 tracking-wider uppercase">
                CURATED LOOKS
              </p>

              {/* Main heading */}
              <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                ONLINE
                <br />
                EXCLUSIVE
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed max-w-md">
                Express Yourself and Discover your unique style. Shop Sustainable Fashion —
                Look good, feel good, do good.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={handleShopNowClick}
                  className="inline-block px-8 py-3 border-2 border-black text-black font-medium rounded-lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                >
                  Shop now
                </button>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative overflow-hidden rounded-3xl flex justify-center items-center">
            <img
              src="/promotion1.png"
              alt="Woman in traditional pink outfit"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
