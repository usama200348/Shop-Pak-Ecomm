import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCircleCheck , FaSpinner } from "react-icons/fa6";


const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const updatingModalRef  = useRef(null);
  const successModalRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("")
  const [formData, setFormData] = useState({name: "",description: "",price: "",category: "",stock: "",image: null,});

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
        image: null,
      });

      setImagePreview(data.images);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];

      setFormData({
        ...formData,
        image: file,
      });

      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
updatingModalRef.current.showModal();

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const body = new FormData();

      body.append("name", formData.name);
      body.append("description", formData.description);
      body.append("price", formData.price);
      body.append("category", formData.category);
      body.append("stock", formData.stock);

      if (formData.image) {
        body.append("image", formData.image);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        body,
      });

      const data = await res.json();

      if (res.ok) {
      successModalRef.current.showModal();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log("Error While Updating Prduct " + err.message);
      updatingModalRef.current.close();
      alert("Something went wrong.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (

    
    
    <>
{/* Updating Modal Ref*/}


<dialog ref={updatingModalRef} className="modal">
  <div className="modal-box text-center">

    <FaSpinner className="text-6xl text-green-500 mx-auto animate-spin" />

    <h3 className="text-3xl font-bold mt-5">
      Updating Product...
    </h3>

    <p className="mt-3 text-gray-500">
      Please wait while we update your product.
    </p>

  </div>
</dialog>

{/* Update Completed Modal */}


<dialog ref={successModalRef} className="modal">
  <div className="modal-box text-center">

    <FaCircleCheck className="text-7xl text-green-500 mx-auto animate-bounce" />

    <h3 className="text-3xl font-bold text-green-600 mt-4">
      Product Updated Successfully
    </h3>

    <p className="text-gray-500 mt-3">
      Your product has been updated successfully.
    </p>

    <div className="modal-action justify-center">
      <button
        className="btn bg-green-500 hover:bg-green-600 text-white"
        onClick={() => {
          successModalRef.current.close();
          navigate("/products");
        }}
      >
        OK
      </button>
    </div>

  </div>
</dialog>

{/* Edit ITem Code */}
<div className="min-h-screen bg-base-200 py-10 px-5">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8 text-green-500">
          Edit Product
        </h1>

        <form onSubmit={submitHandler}>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <label className="font-semibold">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                className="input input-bordered w-full mt-2"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            <div>

              <label className="font-semibold">
                Category
              </label>

              <input
                type="text"
                name="category"
                className="input input-bordered w-full mt-2"
                value={formData.category}
                onChange={handleChange}
              />

            </div>

            <div>

              <label className="font-semibold">
                Price
              </label>

              <input
                type="number"
                name="price"
                className="input input-bordered w-full mt-2"
                value={formData.price}
                onChange={handleChange}
              />

            </div>

            <div>

              <label className="font-semibold">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                className="input input-bordered w-full mt-2"
                value={formData.stock}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="mt-6">

            <label className="font-semibold">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              className="textarea textarea-bordered w-full mt-2"
              value={formData.description}
              onChange={handleChange}
            />

          </div>

          <div className="mt-6">

            <label className="font-semibold">
              Product Image
            </label>

            <input
              type="file"
              name="image"
              className="file-input file-input-bordered w-full mt-2"
              onChange={handleChange}
            />

          </div>

          {imagePreview && (
            <div className="mt-6 flex justify-center">

              <img
                src={imagePreview}
                alt="preview"
                className="w-64 h-64 object-cover rounded-xl shadow-lg border"
              />

            </div>
          )}

          <div className="flex justify-end gap-4 mt-10">

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              className="btn bg-green-500 hover:bg-green-600 text-white"
              disabled={updating}
            >
              {updating ? setLoading(true) : "Update Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  </>
  );


};

export default EditItem;