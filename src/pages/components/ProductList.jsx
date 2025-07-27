import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${REACT_BACKEND_URL}/api/products`);
      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setProducts([]);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${REACT_BACKEND_URL}/api/products/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting product:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-3xl font-semibold mb-6">🛒 Product Inventory</h2>
      <Link
        to="/add"
        className="inline-block mb-4 rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
      >
        ➕ Add Product
      </Link>

      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Created</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(prod => (
                <tr key={prod._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{prod.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{prod.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{prod.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{prod.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(prod.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Link
                      to={`/edit/${prod._id}`}
                      className="inline-block rounded bg-yellow-400 px-3 py-1 text-sm font-semibold text-gray-800 hover:bg-yellow-500 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(prod._id)}
                      className="inline-block rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
