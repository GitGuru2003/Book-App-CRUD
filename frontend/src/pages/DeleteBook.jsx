import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import axios from "axios";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDelete = () => {
    setLoading(true);
    try {
      const res = axios.delete(`http://localhost:8000/books/${id}`, {
        withCredentials: true,
      });
      navigate("/");
      if (res.status === 200) {
        alert("Book deleted successfully");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Are you sure you want to delete this book?
            </span>
          </div>
          <div className="my-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
