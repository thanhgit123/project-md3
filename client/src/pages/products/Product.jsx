import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { failed, success } from "../../utils/notify";
import { BiSearch } from "react-icons/bi";
import Button from "@mui/material/Button";
import { Pagination } from "antd";
import publicAxios from "../../config/publicAxios";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [renderProducts, setRenderProducts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("userLogin"))

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // chuyen doi tien te
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const navigate = useNavigate();
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
  const handleProducts = (category_id) => {
    setRenderProducts(
      products.filter((product) => product.category_id === category_id)
    );
  };

  const handleAddToCart = async (product_id) => {
    if(!currentUser){
      failed('Hãy đăng nhập để mua hàng !')
    }
    try {
      const cart = {
        user_id: currentUser.user_id,
        product_id,
      };
      const response = await publicAxios.post("/api/v1/cart/", cart);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };  

  // detail
  const handleGoToDetail = async(id) => {
    try {
      const response = await publicAxios.get(`/api/v1/products/${id}`);
    } catch (error) {
      console.log(error)
    }
    navigate("/productDetail");
  };


  
  return (
    <>
      <div className="h-[400px] bg-[url('assets/image/sanpham.png')]"></div>
      <br />

      <div className=" flex items-center  ">
        <div className="h-7 flex ml-[70px] ">
          {/* <input
            className="w-[700px] h-[30px] border-2 border-rose-300 rounded-sm m-auto"
            type="text"
            placeholder="Tìm Kiếm"
            style={{ fontSize: "14px" }}
            onChange={handleSearch}
          /> */}
          {/* <Button variant="contained">
            <BiSearch></BiSearch>
          </Button> */}
        </div>
      </div>
      <div className="flex px-[300px] ">
        {categories.map((category) => {
          return (
            <div className="flex justify-around w-[100%] ">
              <Button
                key={category.category_id}
                onClick={() => handleProducts(category.category_id)}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 cursor-pointer text-white w-[100px] h-[40px] pt-2"
              >
                {category.name_category}
              </Button>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-4 pl-10 mt-7">
        {renderProducts.map((product) => {
          return (
            <div
              className="text-center w-[300px] border-2 border-purple-700 shadow-1xl shadow-zinc-400  h-[450px] flex flex-col items-center justify-evenly"
              key={product.product_id}
            >
              <div onClick={() => handleGoToDetail(product.product_id)}>
                <img
                  src={product.image}
                  alt=""
                  className="w-[200px] h-[200px] hover:h-[200] transform hover:scale-110 transition-all duration-200"
                />
              </div>
              {}
              {/* <p className="text-3xl text-black">{product.name_category}</p> */}
              <p className="text-2xl">{product.name_product}</p>
              <p className="text-lg"> {VND.format(product.price)}</p>
              <div
                onClick={() => handleAddToCart(product.product_id)}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 cursor-pointer text-white w-[200px] h-[40px] pt-2"
              >
                Thêm vào giỏ hàng
              </div>
            </div>
          );
        })}
      </div>
      <br />
      {/* <Pagination
        current={currentPage}
        onChange={onPageChange}
        pageSize={itemsPerPage}
        total={showPage.length}
        className="ml-[45%]"
      /> */}
      <br />
    </>
  );
}
