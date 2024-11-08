import React from "react";

const CategorySection = () => {
  const categories = [
    {
      name: "Fresh Vegetables",
      image: `${process.env.PUBLIC_URL}/image/Fresh-Vegetables.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Fresh+Vegetables&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Fresh Fruits",
      image: `${process.env.PUBLIC_URL}/image/Fresh-Fruits.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Fresh+Fruits&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Dairy, Bread and Eggs",
      image: `${process.env.PUBLIC_URL}/image/Dairy-Bread-and-Eggs.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Dairy%2C+Bread+and+Eggs&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Rice, Atta and Dals",
      image: `${process.env.PUBLIC_URL}/image/Rice-Atta-and-Dals.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Rice%2C+Atta+and+Dals&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Masalas and Dry Fruits",
      image: `${process.env.PUBLIC_URL}/image/Masalas-and-Dry-Fruits.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Masalas+and+Dry+Fruits&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Edible Oils and Ghee",
      image: `${process.env.PUBLIC_URL}/image/Edible-Oils-and-Ghee.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Edible+Oils+and+Ghee&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Munchies",
      image: `${process.env.PUBLIC_URL}/image/Munchles.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Munchies&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Sweet Tooth",
      image: `${process.env.PUBLIC_URL}/image/Sweet-Tooth.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Sweet+Tooth&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Cold Drinks and Juices",
      image: `${process.env.PUBLIC_URL}/image/Cold-Drinks-and-Juices.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Cold+Drinks+and+Juices&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Biscuits and Cakes",
      image: `${process.env.PUBLIC_URL}/image/Biscuits-and-Cakes.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Biscuits+and+Cakes&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Instant and Frozen Food",
      image: `${process.env.PUBLIC_URL}/image/Instant-and-Frozen-Food.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Instant+and+Frozen+Food&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Meat and Seafood",
      image: `${process.env.PUBLIC_URL}/image/Meat-and-Seafood.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Meat+and+Seafood&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Cereals and Breakfast",
      image: `${process.env.PUBLIC_URL}/image/Cereals-and-Breakfast.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Cereals+and+Breakfast&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Sauces and Spreads",
      image: `${process.env.PUBLIC_URL}/image/Sauces-and-Spreads.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Sauces+and+Spreads&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Tea, Coffee and More",
      image: `${process.env.PUBLIC_URL}/image/Tea-Coffee-and-More.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Tea%2C+Coffee+and+More&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Cleaning Essentials",
      image: `${process.env.PUBLIC_URL}/image/Cleaning-Essentials.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Cleaning+Essentials&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Pharma and Hygiene",
      image: `${process.env.PUBLIC_URL}/image/Pharma-and-Hygiene.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Pharma+and+Hygiene&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Bath, Body and Hair",
      image: `${process.env.PUBLIC_URL}/image/Bath-Body-and-Hair.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Bath%2C+Body+and+Hair&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Paan Corner",
      image: `${process.env.PUBLIC_URL}/image/Paan-Corner.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Paan+Corner&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Home and Kitchen",
      image: `${process.env.PUBLIC_URL}/image/Home-and-Kitchen.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Home+and+Kitchen&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Office and Electricals",
      image: `${process.env.PUBLIC_URL}/image/Office-and-Electricals.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Office+and+Electricals&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Baby Care",
      image: `${process.env.PUBLIC_URL}/image/Baby-Care.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Baby+Care&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Pet Supplies",
      image: `${process.env.PUBLIC_URL}/image/Pet-Supplies.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Pet+Supplies&custom_back=true&taxonomyType=All+Listing",
    },
    {
      name: "Beauty and Grooming",
      image: `${process.env.PUBLIC_URL}/image/Beauty-and-Grooming.png`,
      link: "https://www.swiggy.com/instamart/category-listing?categoryName=Beauty+and+Grooming&custom_back=true&taxonomyType=All+Listing",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] max-w-full -mt- sm:my-10 lg:my-20 px-4 sm:px-6 lg:px-8 ">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-200 text-center">
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 justify-items-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-item w-full bg-slate-50 rounded-lg shadow-lg transition-transform  duration-300 hover:scale-105 hover:bg-slate-200"
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
              <p className="text-lg font-bold text-black">{category.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
