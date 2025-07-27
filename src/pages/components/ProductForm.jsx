import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {

  

  const [product, setProduct] = useState({ name: '', price: '', category: '', stock: '' });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!product.name || product.name.length < 3) errs.name = "Min 3 chars";
    if (product.price === '' || product.price <= 0) errs.price = "Must be > 0";
    if (!product.category) errs.category = "Required";
    if (product.stock === '' || product.stock < 0) errs.stock = "Can't be negative";
    return errs;
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://backend-inventory-soundarya.vercel.app/api/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.error("Failed to fetch product", err);
      alert("Product not found.");
      navigate('/');
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    try {
      if (id) {
        await axios.put(`https://backend-inventory-soundarya.vercel.app/api/products/${id}`, product);
      } else {
        await axios.post(`https://backend-inventory-soundarya.vercel.app/api/products`, product);
      }
      navigate('/');
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {id ? 'Update' : 'Add'} Product
        </h2>
        {['name', 'price', 'category', 'stock'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block mb-1 capitalize font-medium text-gray-700">
              {field}
            </label>
            <input
              placeholder={field}
              value={product[field]}
              onChange={(e) =>
                setProduct({ ...product, [field]: e.target.value })
              }
              type={field === 'price' || field === 'stock' ? 'number' : 'text'}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors[field] && (
              <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {id ? 'Update' : 'Add'} Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
