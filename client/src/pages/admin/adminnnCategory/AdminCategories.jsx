import React, { useEffect, useState } from "react";
import publicAxios from "../../../config/publicAxios";
import Button from "react-bootstrap/Button";
import { failed, success } from "../../../utils/notify";
import tokenAxios from "../../../config/privateAxios";


export default function AdminCategories() {
    const [newCategory, setNewCategory] = useState({
       
    });
    const [categories, setCategories] = useState([])
    const handleGetAllCate = async () => {
        try {
            const response = await publicAxios.get("/api/v1/categories");
            setCategories(response.data);
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        handleGetAllCate();
    }, []);

    const handleAddCategory = async () => {
        // const newAddCateGory = {
        //     nameCategory: newCategory
        // }
        try {
            const response = await tokenAxios.post("/api/v1/categories", newCategory)
            setCategories(response.data.cates)
            alert(response.data.message)
            setNewCategory({nameCategoryInput : ""})
        } catch (error) {
            console.log(error.response.data.message)
        }
    };

    const handleEdit = (item) => {
        setNewCategory(item)
    }
    const handleSave = async () => {
        try {
            const res = await tokenAxios.put(`/api/v1/updateCategories/${newCategory.category_id}`, newCategory)
            setCategories(res.data.cates)
            setNewCategory({
                newCategory: ""
            })
        } catch (error) {
            console.log(error)
        }
    };
    const handleDelete = async (id) => {
        try {
            const res = await tokenAxios.delete(`/api/v1/deleteCategories/${id}`)
            setCategories(res.data.cates)
            success(res.data.message)
        } catch (error) {
            failed(error.res.cates.message)
        }
    }
  return (
    <>
      <div className="admin__main">
        <div className="ml-[450px] flex">
          <label htmlFor="" className="text-2xl ">
            Tên thể loại
          </label>
          <input
            type="text"
            placeholder="Thêm"
            className="ml-[20px] w-[600px] h-[40px] pl-4"
            name="nameCategoryInput"
            value={newCategory.nameCategoryInput}
            onChange={(e) =>        
                setNewCategory({ ...newCategory, nameCategoryInput: e.target.value })
            }
          />
          <br />
          <Button
            className=" ml-3 bg-blue-400 "
            onClick={newCategory.category_id ? handleSave : handleAddCategory}
          >
            {newCategory.category_id ? "Lưu" : "Thêm"}
          </Button>
        </div><br />

        <div className="card p-0 g-col-8 shadow border-0 h-[100%] w-[81vw] ml-[240px]">
          <div className="card-header">
            <h5 className="mb-0 title ">Danh Sách Thể Loại</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-nowrap">
              <thead className="thead-light ">
                <tr>
                  <th scope="col">Stt</th>
                  <th scope="col">Tên </th>
                  <th scope="col">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name_category}</td>
                      <td>
                        <button
                          className="bg-rose-400 rounded-3  text-white hover:bg-rose-500 w-[80px]"
                          variant="contained"
                          onClick={() => handleEdit(item)}
                        >
                          Sửa
                        </button>
                        <br />
                        <br />
                        <button
                          className="bg-rose-400 rounded-3  text-white hover:bg-rose-500 w-[80px]"
                          variant="contained"
                          onClick={() => handleDelete(item.category_id)}
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
    </>
  );
}
