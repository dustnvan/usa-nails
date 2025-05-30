import Dropdown from './Dropdown';
import servicesData from '../data/services';

const Services = ({ searchQuery, setSelectedService }) => {
  const filteredCategories = searchQuery
    ? servicesData.filter((category) =>
        category.services.some((service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : servicesData;

  return (
    <section className="mt-4">
      {filteredCategories.map((serviceCategory) => (
        <Dropdown
          key={serviceCategory.name}
          serviceCategoryName={serviceCategory.name}
          setSelectedService={setSelectedService}
        />
      ))}
    </section>
  );
};
export default Services;
