import { useState } from 'react';

const AdminPage = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {};

  return (
    <div className="flex justify-center items-center flex-col pt-20">
      <h1 className="text-2xl mb-4">Admin Page</h1>
      <form onSubmit={handleSubmit} className="">
        <input
          name="name"
          placeholder="Service Name"
          onChange={handleChange}
          required
        />
        <input name="price" placeholder="Price" required />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};
export default AdminPage;
