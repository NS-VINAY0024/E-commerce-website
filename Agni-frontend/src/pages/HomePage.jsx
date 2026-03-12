import { useEffect } from "react";
import CategoryItem from "../components/layout/components/CategoryItem";
import { useProductStore } from "../Store/useProductStore";
import FeaturedProducts from "../components/layout/components/FeaturedProducts";

const categories = [
  { href: "/Grocery", name: "Grocery", imageUrl: "/rice.jpg" },
  { href: "/Fruits", name: "Fruits", imageUrl: "/fruite.jpg" },
  { href: "/Vegetables", name: "Vegetables", imageUrl: "/vegitable.jpg" },
  { href: "/Stationaries", name: "Stationaries", imageUrl: "/items.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.18),_transparent_30%),linear-gradient(180deg,_rgba(15,23,42,0.8),_rgba(2,6,23,1))]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Find groceries and essentials quickly with category-first browsing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!loading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};
export default HomePage;
