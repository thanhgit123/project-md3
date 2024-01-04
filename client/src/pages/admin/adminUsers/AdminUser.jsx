import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminUser.scss";
import publicAxios from "../../../config/publicAxios";
export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(true);
  const handleGetData = async () => {
    try {
      const response = await publicAxios.get("/api/v1/users")
      .then(result =>{
        let arr = result.data.users.filter(e=>e.role == 0)
        setUsers(arr)
      })
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);

  //khoa tai khoan
  const handleChangeStatus = async (user_id) => {
    try {
      const response = await publicAxios
        .patch(`/api/v1/users/${user_id}`)
        // setUsers(response.data.users)
        .then((result) => {
          let arr = result.data.users.filter((e) => e.role == 0);
          setUsers(arr);
        });
    } catch (error) {
      console.log(error); 
    }
  };
  return (
    <>
      <h1 className="text-center text-3xl text-black ">Quản lý người dùng</h1>
      <div className="tableContainer">
        <table className="tableUser  ">
          <tr className="trUser">
            <th>STT</th>
            <th>Email</th>
            <th>Tên người dùng</th>
            <th>Trạng thái</th>
            <th>Tính năng</th>
          </tr>
          {users.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.email}</td>
                <td>{item.user_name}</td>
                <td>{item.status == 0 ? "Hoạt động" : "Khóa"}</td>
                <td>
                  {" "}
                  <button
                    className="bg-rose-200 w-[80px] rounded-5 hover:bg-blue-300 hover:text-white"
                    onClick={() => handleChangeStatus(item.user_id)}
                  >
                    {item.status == 0 ? "Khóa" : "Mở"}
                  </button>{" "}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}
