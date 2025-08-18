import React from "react"

const ShopByCategories = () => {
  const categories = [
    {
      id: 1,
      name: "New collection",
      image: "/category1.png",
      bgColor: "bg-gray-200",
      link: "/categories/new-collection",
    },
    {
      id: 2,
      name: "Suits",
      image: "/category2.png",
      bgColor: "bg-gray-200",
      link: "/categories/suits",
    },
    {
      id: 3,
      name: "Kurti and pant with dupatta",
      image: "/category3.png",
      bgColor: "bg-gradient-to-br from-red-500 to-orange-400",
      link: "/categories/kurti-pant-dupatta",
    },
    {
      id: 4,
      name: "Jwellery",
      image: "/category4.png",
      bgColor: "bg-gray-200",
      link: "/categories/jewellery",
    },
  ]

  const handleCategoryClick = (link) => {
    window.location.href = link
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-600 mb-2">Latest collection</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">SHOP BY CATEGORIES</h2>
          <p className="text-gray-600 text-lg">Find What You Need, Faster</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => handleCategoryClick(category.link)}
            >
              {/* Flower-shaped Background with Image */}
              <div className="relative mb-6">
                {/* Flower Shape Background */}
                <div
                  className={`w-80 h-80 ${category.bgColor} transform transition-all duration-300 group-hover:scale-105`}
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                />

                {/* Category Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-60 h-60 object-cover rounded-full transform transition-all duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Category Name */}
              <h3 className="text-lg font-semibold text-black text-center group-hover:text-blue-600 transition-colors duration-300">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopByCategories
