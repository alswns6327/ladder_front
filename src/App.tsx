import "./App.css";

import MenuTemplate from "./components/menu/MenuTemplate";

import { Route, Routes } from "react-router-dom";
import ArticleListTemplate from "./components/article/ArticleListTemplate";
import ArticleGroupManageTemplate from "./components/article/ArticleGroupManageTemplate";
import ArticleContentTemplate from "./components/article/ArticleContentTemplate";
import HeaderContainer from "./containers/common/HeaderContainer";

import BookInfoSavePage from "./pages/book/BookInfoSavePage";
import BookListPage from "./pages/book/BookListPage";
import BookContentWritePage from "./pages/book/BookContentWritePage";
import BookChapterListPage from "./pages/book/BookChapterListPage";
import BookContentViewPage from "./pages/book/BookContentViewPage";
import BookInfoUpdatePage from "./pages/book/BookInfoUpdatePage";

function App() {
  return (
    <>
      <HeaderContainer />
      <MenuTemplate />
      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route
          path="/book/chapter/:bookInfoId"
          element={<BookChapterListPage />}
        />
        <Route
          path="/book/content/:bookChapterInfoId"
          element={<BookContentViewPage />}
        />
        <Route path="/book/info" element={<BookInfoSavePage />} />
        <Route path="/book/info/:bookInfoId" element={<BookInfoUpdatePage />} />
        <Route
          path="/book/chapter/write/:bookInfoId"
          element={<BookContentWritePage />}
        />
        <Route
          path="/book/info/:bookId"
          element={<ArticleGroupManageTemplate />}
        />
        <Route path="/text" element={<ArticleListTemplate />} />
        <Route path="/text/content" element={<ArticleContentTemplate />} />
        <Route path="/group/manage" element={<ArticleGroupManageTemplate />} />
      </Routes>
    </>
  );
}

export default App;
