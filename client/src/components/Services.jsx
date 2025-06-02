import Dropdown from './Dropdown';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

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

  if (loading) return;
  if (error) return <div>Error: {error}</div>;

  const filteredCategories = searchQuery
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  return (
    <section className="mt-4">
      {filteredCategories.map((category) => (
        <Dropdown
          key={category.name}
          serviceCategoryName={category.name}
          setSelectedService={setSelectedService}
          selectedStaff={selectedStaff}
        />
      ))}
    </section>
  );
};
export default Services;
