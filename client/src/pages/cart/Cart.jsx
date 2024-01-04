import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";
import { failed, success } from "../../utils/notify";
import { Link, useNavigate } from "react-router-dom";
import publicAxios from "../../config/publicAxios";
import confirm from "antd/es/modal/confirm";

export default function Cart() {
  const currentUser = JSON.parse(localStorage.getItem("userLogin"));
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [addressBill, setAddressBill] = useState("");
  const [phoneBill, setPhoneBill] = useState("");
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handleGetCartByUser = async () => {
    try {
      const response = await publicAxios.get(
        `/api/v1/cart/${currentUser?.user_id}`
      );
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCartByUser();
  }, [flag]);

 const handleDeleteItem = async (id) => {
   try {
    const response =  await publicAxios.delete(`/api/v1/deleteByitem/${id}`);
    handleGetCartByUser();
   } catch (error) {
     console.log(error);
   }
 };

  const handleGetTotal = () => {
    const result = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(result);
  };
  useEffect(() => {
    handleGetTotal();
  }, [cart]);


  const handleGoToCheckOut = async () => {
    if(cart == ""){
      failed("Mua something");
      return;
    }
    if (addressBill == "" || phoneBill == "") {
      failed("Nhập thông tin");
      return;
    }
    // validate phone
    const regexPhone = /^0\d{9,10}$/;
    if (!regexPhone.test(phoneBill)) {
      failed("Số điện thoại không hợp lệ");
      return;
    }
    const order = {
      user_id: currentUser.user_id,
      purchase: total,
      addressBill,
      phoneBill,
      status : "Processing"
    };
    try {
      const response = await publicAxios.post("/api/v1/orders", order);
      await Promise.all(
        cart.map(async (item) => {
          const orderDetail = {
            order_id: response.data.order,
            product_id: item.product_id,
            quantity: item.quantity,
           
          };
          await publicAxios.post("/api/v1/order_details", orderDetail);
        })
      );
      await publicAxios.delete(`/api/v1/cartDeleteWhenpay/${currentUser?.user_id}`);
      setCart([]);
      setTimeout(() => {
        navigate("/checkOut");
      }, 900);
    } catch (error) {
      console.log(error);
    }
  };


const handleMinus = async (item) => {
    const body = {cart_id: item.cart_id, type:"decre"}
    try {     
        await publicAxios.patch(`/api/v1/cart/decre`,body);
        setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

const handlePlus = async (item) => {
  const body = {cart_id: item.cart_id, type:"incre"}
  try {
    if (item.quantity > item.stock) {
      failed("Cháy hàng");
      return;
    }
      await publicAxios.patch(`/api/v1/cart/incre`,body);
      setFlag(!flag);
  } catch (error) {
    console.log(error)
  }
}


  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard
                className="card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <MDBCardBody className="p-0">
                  <MDBRow className="g-0">
                    <MDBCol lg="8">
                      <div className="p-5">
                        <div className="d-flex justify-between align-items-center mb-5">
                          <MDBTypography className="fw-bold mb-0 text-black">
                            Giỏ hàng của bạn
                          </MDBTypography>
                          <MDBTypography className="mb-0">
                            {cart.length} sản phẩm
                          </MDBTypography>
                        </div>

                        <hr className="my-4" />
                        {cart.map((item, index) => {
                          return (
                            <MDBRow
                              className="mb-4 d-flex justify-content-between align-items-center"
                              key={index}
                            >
                              <MDBCol md="2" lg="2" xl="2">
                                <MDBCardImage
                                  src={item.image}
                                  fluid
                                  className="rounded-3"
                                  alt="Cotton T-shirt"
                                />
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3">
                                <MDBTypography tag="h6" className="text-muted">
                                  {item.category}
                                </MDBTypography>
                                <MDBTypography
                                  tag="h6"
                                  className="text-black mb-0"
                                >
                                  {item.name_product}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol
                                md="3"
                                lg="3"
                                xl="3"
                                className="d-flex align-items-center"
                              >
                                <MDBBtn
                                  color="link"
                                  className="px-2"
                                  onClick={() => handleMinus(item)}
                                >
                                  <MDBIcon fas icon="minus" />
                                </MDBBtn>

                                <MDBInput
                                  type="text"
                                  min="0"
                                  value={item.quantity}
                                  size="sm"
                                  className="text-center "
                                />

                                <MDBBtn
                                  color="link"
                                  className="px-2"
                                  onClick={() => handlePlus(item)}
                                >
                                  <MDBIcon fas icon="plus" />
                                </MDBBtn>
                              </MDBCol>
                              <MDBCol md="3" lg="2" xl="2" className="text-end">
                                <MDBTypography tag="h6" className="mb-0">
                                  {VND.format(item.price * item.quantity)}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="1" lg="1" xl="1" className="text-end">
                                <div
                                  className="text-muted cursor-pointer"
                                  onClick={() => handleDeleteItem(item.product_id)}
                                >
                                  <MDBIcon fas icon="times" />
                                </div>
                              </MDBCol>
                            </MDBRow>
                          );
                        })}

                        <hr className="my-4" />

                        <div className="pt-5">
                          <MDBTypography tag="h6" className="mb-0">
                            <Link
                              tag="a"
                              to="/products"
                              className="text-body"
                            >
                              <MDBIcon fas icon="long-arrow-alt-left me-2" />{" "}
                              Mua tiếp
                            </Link>
                          </MDBTypography>
                          
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol lg="4" className="bg-grey">
                      <div className="p-5">
                        <MDBTypography
                          tag="h3"
                          className="fw-bold mb-5 mt-2 pt-1"
                        >
                          Thanh toán
                          <Link to="/checkout" className="ml-[90px]"> Đơn hàng của bạn</Link>
                        </MDBTypography>
                      
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <MDBTypography tag="h5" className="text-black">
                            {cart.length} sản phẩm
                          </MDBTypography>
                          <MDBTypography tag="h5">
                            {VND.format(total)}
                          </MDBTypography>
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Địa chỉ
                        </MDBTypography>

                        <div className="mb-4 pb-2">
                          <MDBInput
                            size="lg"
                            label="Nhập địa chỉ"
                            onChange={(e) => setAddressBill(e.target.value)}
                          />
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Số điện thoại
                        </MDBTypography>

                        <div className="mb-5">
                          <MDBInput
                            size="lg"
                            label="Nhập số điện thoại"
                            onChange={(e) => setPhoneBill(e.target.value)}
                          />
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <MDBTypography tag="h5" className="text-uppercase">
                            Tổng tiền
                          </MDBTypography>
                          <MDBTypography tag="h5">
                            {VND.format(total)}
                          </MDBTypography>
                        </div>

                        <MDBBtn
                          color="dark"
                          block
                          size="lg"
                          onClick={handleGoToCheckOut}
                        >
                          Thanh Toán
                        </MDBBtn>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
