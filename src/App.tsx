import React from "react";
import "./App.css";
import Header from "./components/common/Header";
import MenuTemplate from "./components/menu/MenuTemplate";

import { Route, Routes } from "react-router-dom";
import BookPageTemplate from "./components/book/BookPageTemplate";
import BookChapterListTemplate from "./components/book/BookChapterListTemplate";

function App() {
  return (
    <>
      <Header />
      <MenuTemplate />
      <Routes>
        <Route path="/" element={<BookPageTemplate />} />
        <Route path="/chapter" element={<BookChapterListTemplate />} />
      </Routes>
    </>
  );
}

export default App;
