import Dropdown from './Dropdown';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Loading from './Loading';

const Services = ({
  searchQuery,
  setSelectedService,
  selectedStaff = null,
}) => {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_RENDER_API}/api/categories`
        );
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-center">Error: {error}</div>;

  const filteredCategories = searchQuery
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  return (
    <section className="mt-6 flex flex-col gap-4">
      {filteredCategories.map((category) => (
        <Dropdown
          key={category._id}
          category={category}
          setSelectedService={setSelectedService}
          selectedStaff={selectedStaff}
        />
      ))}
    </section>
  );
};
export default Services;
