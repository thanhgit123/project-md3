import React, { useEffect, useRef, useState } from "react";
import "./AdminProduct.scss";
import axios from "axios";
import confirm from "antd/es/modal/confirm";
import publicAxios from "../../../config/publicAxios";
import tokenAxios from "../../../config/privateAxios";

export default function AdminProduct() {
  const [preview, setPreview] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name_product: "",
    price: 0,
    image: null,
    description: "",
    category_id: "",
    stock: 0,
  });
  // chuyen doi tien te
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // upload img
  const handleGetCategories = async () => {
    try {
      const response = await publicAxios.get("/api/v1/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetProducts = async () => {
    try {
      const response = await publicAxios.get("/api/v1/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCategories();
    handleGetProducts();
  }, []);

  // upload img
  const handleAddMedia = (event) => {
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  const handleGetValue = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "project");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dzwap0buq/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      const response = await tokenAxios.post("/api/v1/products", {
        ...newProduct,
        image: media,
      });
      setProducts(response.data.products);
      setNewProduct({
        name_product: "",
        price: 0,
        image: null,
        description: "",
        category_id: "",
        stock: 0,
      });
      setPreview(null);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleSave = async () => {
    try {
      const response = await tokenAxios.put(
        `/api/v1/products/${newProduct.product_id}`,
        newProduct
      );
      setProducts(response.data.products);
      setNewProduct({
        name_product: "",
        price: 0,
        image: null,
        description: "",
        category_id: "",
        stock: 0,
      });
      setPreview(null);

    } catch (error) {}
  };
  const handleEdit = async (item) => {
    setNewProduct(item);
    setPreview(item.image);
  };
  const handleDelete = async (id) => {
    try {
      const response = await tokenAxios.delete(`/api/v1/deleteProduct/${id}`);
      setProducts(response.data.products);
    } catch (error) {}
  };

  const handlSearchAdmin = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  const handleSearch = async () => {
    try {
      const response = await tokenAxios.get(
        `/api/v1/products/search?key=${search}`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //phan trang

  return (
    <>
      <div className="ml-[230px]">
        <div className=" pb-3 ">
          <div className="card shadow border-0 px-2 w-[1245px]">
            <div className="card-header ml-7 text-2xl text-rose-600 flex justify-between">
              <h5 className="mb-0 ">Thêm sản phẩm</h5>
              <div className="flex">
                <input type="text" className="form-control" placeholder="Tìm kiem" onChange={handlSearchAdmin} />
                <button className="btn btn-primary ml-2 " onClick={handleSearch}>Tìm</button>
              </div>
             
            </div>
            <div className=" flex justify-around">
              <div className="w-[400px] h-[360px]">
                <div className="mb-1 ">
                  <label htmlFor="name" className="form-label">
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name-product"
                    aria-describedby="emailHelp"
                    name="name_product"
                    value={newProduct.name_product}
                    onChange={handleGetValue}
                  />
                </div>

                <div className="mb-1 ">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Giá
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={newProduct.price}
                    onChange={handleGetValue}
                  />
                </div>

                <div className="mb-1 ">
                  <label className="form-label">Loại sản phẩm</label>
                  <select
                    className="form-select form-select "
                    aria-label="Large select example"
                    id="categoryId"
                    name="category_id"
                    value={newProduct.category_id}
                    onChange={handleGetValue}
                  >
                    {categories.map((category) => (
                      <option value={category.category_id}>
                        {category.name_category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-1 ">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Số lượng
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="stock"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleGetValue}
                  />
                </div>

                <button
                  onClick={newProduct.product_id ? handleSave : handleAdd}
                  className="btn btn-primary mt-2"
                  id="save"
                >
                  {newProduct.product_id ? "Sửa" : "Thêm sản phẩm"}
                </button>
              </div>

              <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">
                  Ảnh sản phẩm
                </label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  name="image"
                  type="file"
                  // value={inputData.image}
                  onChange={handleAddMedia}
                />
                <img
                  id="image"
                  src={preview}
                  alt=""
                  width="200px"
                  height="20px"
                  className="mt-2"
                />
                <div></div>
              </div>

              <div>
                <label htmlFor="formFileSm" className="form-label">
                  Mô tả
                </label>
                <br />
                <textarea
                  type="text"
                  className=" w-[360px] h-[200px]  form-control form-control-sm text-wrap overflow-auto"
                  onChange={handleGetValue}
                  name="description"
                  value={newProduct.description}
                ></textarea>
              </div>
            </div>
          </div>
          <br />

          <div className="card p-0 g-col-8 shadow border-0 h-[600px] w-[81vw]">
            <div className="card-header">
              <h5 className="mb-0 title">Danh Sách Sản Phẩm</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-nowrap">
                <thead className="thead-light ">
                  <tr>
                    <th scope="col">Stt</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Loại</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item.image}
                            alt=""
                            className="w-[100px] h-[120px]"
                          />
                        </td>
                        <td>{item.name_product}</td>
                        <td>{item.name_category}</td>
                        <td>{VND.format(item.price)}</td>
                        <td>{item.stock}</td>
                        <td>
                          <button
                            className="bg-rose-400 rounded-3  text-black hover:bg-sky-400 w-[80px]"
                            // variant="contained"
                            onClick={() => handleEdit(item)}
                          >
                            Sửa
                          </button>
                          <br />
                          <br />
                          <button
                            className="bg-rose-400 rounded-3  text-black hover:bg-sky-400 w-[80px]"
                            variant="contained"
                            onClick={() => handleDelete(item.product_id)}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div id="changePage"></div>
          </div>
        </div>
      </div>
    </>
  );
}
