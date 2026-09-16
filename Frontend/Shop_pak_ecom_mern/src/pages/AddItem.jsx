import React, { useContext, useEffect, useRef, useState } from "react";
import {FaBoxOpen,FaImage,FaTag,FaDollarSign,FaWarehouse,FaAlignLeft,FaPlusCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [loading, setLoading] = useState(false);
  const [image,setImage] = useState(null);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const ModalRef = useRef(null);
  const successModalRef = useRef(null); 
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: "",
    featured: false,
  });


useEffect(()=>{
  if (!user || user.role !== 'admin') {
    ModalRef.current.showModal();
    setTimeout(()=>{
      ModalRef.current.close();
      navigate('/');
    },2500)
  }
},[user,navigate])
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();

    formData.append("name", product.name);
    // formData.append("brand", product.brand);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("description", product.description);
    formData.append("featured", product.featured);
    formData.append("image", image);

 const user = JSON.parse(localStorage.getItem("userInfo"));

const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
  body: formData,
});

    const data = await res.json();

    console.log(data);

   if (res.ok) {
  successModalRef.current.showModal();

  // Reset Form
  setProduct({
    name: "",
    category: "",
    price: "",
    stock: "",
    images: "",
    description: "",
    featured: false,
  });

  setImage(null);
} else {
      alert(data.message);
    }

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
    {/* Product Added Successfully Modal */}
<dialog ref={successModalRef} className="modal">
  <div className="modal-box text-center">

    <FaCircleCheck className="text-7xl text-green-500 mx-auto mb-4 animate-bounce" />

    <h3 className="text-3xl font-bold text-green-600">
      Product Added Successfully
    </h3>

    <p className="text-gray-500 mt-3">
      Your product has been added to the store.
    </p>

    <div className="modal-action justify-center">

      <button
        className="btn bg-green-500 hover:bg-green-600 text-white"
        onClick={() => {
          successModalRef.current.close();
          navigate("/products");
        }}
      >
        View Products
      </button>

    </div>

  </div>
</dialog>
{/* Access Denied Modal */}
    <dialog ref={ModalRef} className="modal">
  <div className="modal-box text-center">

    <h3 className="text-3xl font-bold text-red-600">
      Access Denied
    </h3>

    <p className="py-4 text-gray-500">
      Only administrators can add new products.
    </p>

  </div>
</dialog>


    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-8">

            <h1 className="text-4xl font-bold flex items-center gap-3">
              <FaPlusCircle />
              Add New Product
            </h1>

            <p className="mt-2 opacity-90">
              Create a new product for your ShopPak Store
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="p-10 space-y-8"
          >

            <div className="grid md:grid-cols-2 gap-6">

              {/* Product Name */}

              <div>

                <label className="font-semibold">
                  Product Name
                </label>

                <div className="relative mt-2">

                  <FaBoxOpen className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    required
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Apple iPhone 16 Pro"
                    className="input input-bordered w-full pl-11"
                  />

                </div>

              </div>

              {/* Brand */}

              <div>

                <label className="font-semibold">
                  Brand
                </label>

                <div className="relative mt-2">

                  <FaTag className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    name="brand"
                    value={product.brand}
                    onChange={handleChange}
                    placeholder="Apple"
                    className="input input-bordered w-full pl-11"
                  />

                </div>

              </div>

              {/* Category */}

              <div>

                <label className="font-semibold">
                  Category
                </label>

                <select
                  className="select select-bordered w-full mt-2"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>

                  <option>Smartphones</option>
                  <option>Laptop</option>
                  <option>Wearables</option>
                  <option>Accessories</option>
                  <option>Gaming</option>
                  <option>Audio</option>

                </select>

              </div>

              {/* Price */}

              <div>

                <label className="font-semibold">
                  Price
                </label>

                <div className="relative mt-2">

                  <FaDollarSign className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="number"
                    name="price"
                    required
                    value={product.price}
                    onChange={handleChange}
                    placeholder="25000"
                    className="input input-bordered w-full pl-11"
                  />

                </div>

              </div>

              {/* Stock */}

              <div>

                <label className="font-semibold">
                  Stock
                </label>

                <div className="relative mt-2">

                  <FaWarehouse className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="number"
                    name="stock"
                    required
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="20"
                    className="input input-bordered w-full pl-11"
                  />

                </div>

              </div>

              {/* Image */}

              <div>

             <div className="form-control">
  <label className="label">
    <span className="label-text font-semibold">
      Product Image
    </span>
  </label>

  <input
    type="file"
    accept="image/*"
    className="file-input file-input-bordered w-full"
    onChange={(e) => setImage(e.target.files[0])}
    required
  />
</div>
</div>
            </div>

            {/* Description */}

            <div>

              <label className="font-semibold">
                Description
              </label>

              <div className="relative mt-2">

                <FaAlignLeft className="absolute left-4 top-5 text-gray-400" />

                <textarea
                  rows={6}
                  required
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full pl-11"
                  placeholder="Write Product Description..."
                />

              </div>

            </div>

            {/* Featured */}

            <div className="bg-green-50 rounded-xl p-5 flex justify-between items-center">

              <div>

                <h3 className="font-bold text-lg">
                  Featured Product
                </h3>

                <p className="text-gray-500">
                  Display this product on Homepage
                </p>

              </div>

              <input
                type="checkbox"
                className="toggle toggle-success toggle-lg"
                name="featured"
                checked={product.featured}
                onChange={handleChange}
              />

            </div>

            {/* Button */}

            <button
              className={`btn bg-green-500 hover:bg-green-600 text-white w-full text-lg ${
                loading && "btn-disabled"
              }`}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Adding Product...
                </>
              ) : (
                <>
                  <FaPlusCircle />
                  Add Product
                </>
              )}
            </button>

          </form>

        </div>

      </div>

    </div>
  </>
  );
};

export default AddItem;