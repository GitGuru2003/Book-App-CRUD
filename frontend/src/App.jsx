import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
      </Routes>
    </>
  );
}

export default App;
