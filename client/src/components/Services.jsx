import Dropdown from './Dropdown';
import categoryData from '../data/categories';

const Services = ({
  searchQuery,
  setSelectedService,
  selectedStaff = null,
}) => {
  const filteredCategories = searchQuery
    ? categoryData.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryData;

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
