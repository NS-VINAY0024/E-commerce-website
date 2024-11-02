import React from "react";

const CategorySection = () => {
  const categories = [
    {
      name: "Fresh Vegetables",
      image: "image/Fresh-Vegetables.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Fresh+Vegetables&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Fresh Fruits",
      image: "image/Fresh-Fruits.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Fresh+Fruits&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Dairy, Bread and Eggs",
      image: "image/Dairy-Bread-and-Eggs.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Dairy%2C+Bread+and+Eggs&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Rice, Atta and Dals",
      image: "image/Rice-Atta-and-Dals.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Rice%2C+Atta+and+Dals&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Masalas and Dry Fruits",
      image: "image/Masalas-and-Dry-Fruits.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Masalas+and+Dry+Fruits&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Edible Oils and Ghee",
      image: "image/Edible-Oils-and-Ghee.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Edible+Oils+and+Ghee&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Munchies",
      image: "image/Munchles.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Munchies&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Sweet Tooth",
      image: "image/Sweet-Tooth.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Sweet+Tooth&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Cold Drinks and Juices",
      image: "image/Cold-Drinks-and-Juices.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Cold+Drinks+and+Juices&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Biscuits and Cakes",
      image: "image/Biscuits-and-Cakes.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Biscuits+and+Cakes&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Instant and Frozen Food",
      image: "image/Instant-and-Frozen-Food.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Instant+and+Frozen+Food&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Meat and Seafood",
      image: "image/Meat-and-Seafood.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Meat+and+Seafood&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Cereals and Breakfast",
      image: "image/Cereals-and-Breakfast.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Cereals+and+Breakfast&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Sauces and Spreads",
      image: "image/Sauces-and-Spreads.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Sauces+and+Spreads&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Tea, Coffee and More",
      image: "image/Tea-Coffee-and-More.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Tea%2C+Coffee+and+More&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Cleaning Essentials",
      image: "image/Cleaning-Essentials.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Cleaning+Essentials&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Pharma and Hygiene",
      image: "image/Pharma-and-Hygiene.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Pharma+and+Hygiene&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Bath, Body and Hair",
      image: "image/Bath-Body-and-Hair.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Bath%2C+Body+and+Hair&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Paan Corner",
      image: "image/Paan-Corner.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Paan+Corner&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Home and Kitchen",
      image: "image/Home-and-Kitchen.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Home+and+Kitchen&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Office and Electricals",
      image: "image/Office-and-Electricals.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Office+and+Electricals&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Baby Care",
      image: "image/Baby-Care.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Baby+Care&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Pet Supplies",
      image: "image/Pet-Supplies.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Pet+Supplies&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Beauty and Grooming",
      image: "image/Beauty-and-Grooming.png",
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Beauty+and+Grooming&custom_back=true&taxonomyType=All+Listing",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-200 text-center">Shop by Category</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-items-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-item w-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <a
              href={category.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 text-center"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-auto max-w-[100px] mx-auto mb-2"
              />
              <p className="text-lg font-bold text-gray-200">{category.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
