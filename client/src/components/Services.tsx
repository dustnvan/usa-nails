import React from 'react';
import Dropdown from './Dropdown';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import categoriesDummyData from '../dummyData/categoriesDummyData';
import serviceDummyData from '../dummyData/servicesDummyData';
import { toast, ToastContainer } from 'react-toastify';
import { Staff, Category, Service } from '../types/booking';

interface ServicesProps {
  searchQuery: string;
  setSelectedService: (service: Service) => void;
  selectedStaff: Staff | null;
}

const Services = ({
  searchQuery,
  setSelectedService,
  selectedStaff = null,
}: ServicesProps) => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[] | null>(null);

  useEffect(() => {
    // Set for demos
    setCategories(categoriesDummyData);
    setServices(serviceDummyData);
    setLoading(false);

    const fetchAll = async () => {
      try {
        const categoryRes = await axios.get(
          `${import.meta.env.VITE_RENDER_API}/api/categories`
        );
        const serviceRes = await axios.get(
          `${import.meta.env.VITE_RENDER_API}/api/services`
        );

        setCategories(categoryRes.data);
        setServices(serviceRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error(
          'Couldn’t load live service data. Showing fallback content.'
        );
        setCategories(categoriesDummyData);
        setServices(serviceDummyData);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <Loading />;

  const filteredCategories = searchQuery
    ? categories?.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  return (
    <section className="mt-6 flex flex-col gap-4">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeOnClick={true}
      />

      {filteredCategories?.map((category) => (
        <Dropdown
          key={category._id}
          category={category}
          setSelectedService={setSelectedService}
          selectedStaff={selectedStaff}
          services={services}
        />
      ))}
    </section>
  );
};
export default Services;
