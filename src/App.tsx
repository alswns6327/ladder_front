import React from "react";
import "./App.css";
import Header from "./components/common/Header";
import MenuTemplate from "./components/menu/MenuTemplate";

import { Route, Routes } from "react-router-dom";
import BookPageTemplate from "./components/book/BookPageTemplate";
import BookChapterListTemplate from "./components/book/BookChapterListTemplate";
import BookContentTemplate from "./components/book/BookContentTemplate";
import ArticleListTemplate from "./components/article/ArticleListTemplate";
import ArticleGroupManageTemplate from "./components/article/ArticleGroupManageTemplate";
import ArticleContentTemplate from "./components/article/ArticleContentTemplate";

function App() {
  return (
    <>
      <Header />
      <MenuTemplate />
      <Routes>
        <Route path="/" element={<BookPageTemplate />} />
        <Route path="/chapter" element={<BookChapterListTemplate />} />
        <Route path="/book/content" element={<BookContentTemplate />} />
        <Route path="/text" element={<ArticleListTemplate />} />
        <Route path="/text/content" element={<ArticleContentTemplate />} />
        <Route path="/group/manage" element={<ArticleGroupManageTemplate />} />
      </Routes>
    </>
  );
}

export default App;
