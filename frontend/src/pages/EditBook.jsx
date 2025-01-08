import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setLoading(true);
      const res = axios.get(`http://localhost:8000/books/${id}`, {
        withCredentials: true,
      });
      setTitle(res.data.data.title);
      setAuthor(res.data.data.author);
      setPublishYear(res.data.data.publishYear);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const handleSubmit = () => {
    const newBook = { title, author, publishYear };
    setLoading(true);
    try {
      axios.put(`http://localhost:8000/books/${id}`, newBook, {
        withCredentials: true,
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              placeholder="Enter the book title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              placeholder="Enter the book author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="text"
              placeholder="Enter the publish year"
              value={publishYear}
              onChange={(e) => {
                setPublishYear(e.target.value);
              }}
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleSubmit}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
