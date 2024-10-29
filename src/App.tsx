import "./App.css";

import MenuTemplate from "./components/menu/MenuTemplate";

import { Route, Routes } from "react-router-dom";
import ArticleEduListTemplate from "./components/article_edu/ArticleEduListTemplate";
import ArticleEduGroupManageTemplate from "./components/article_edu/ArticleEduGroupManageTemplate";
import ArticleEduContentTemplate from "./components/article_edu/ArticleEduContentViewTemplate";
import HeaderContainer from "./containers/common/HeaderContainer";

import BookInfoSavePage from "./pages/book/BookInfoSavePage";
import BookListPage from "./pages/book/BookListPage";
import BookContentWritePage from "./pages/book/BookContentWritePage";
import BookChapterListPage from "./pages/book/BookChapterListPage";
import BookContentViewPage from "./pages/book/BookContentViewPage";
import BookInfoUpdatePage from "./pages/book/BookInfoUpdatePage";
import BookContentUpdatePage from "./pages/book/BookContentUpdatePage";

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
          path="/book/chapter/update/:bookChapterInfoId"
          element={<BookContentUpdatePage/>}
        />
        <Route path="/text" element={<ArticleEduListTemplate />} />
        <Route path="/text/content" element={<ArticleEduContentTemplate />} />
        <Route path="/group/manage" element={<ArticleEduGroupManageTemplate />} />
      </Routes>
    </>
  );
}

export default App;
