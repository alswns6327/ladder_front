import "./App.css";

import MenuTemplate from "./components/menu/MenuTemplate";

import { Route, Routes } from "react-router-dom";
import HeaderContainer from "./containers/common/HeaderContainer";

import BookInfoSavePage from "./pages/book/BookInfoSavePage";
import BookListPage from "./pages/book/BookListPage";
import BookContentWritePage from "./pages/book/BookContentWritePage";
import BookChapterListPage from "./pages/book/BookChapterListPage";
import BookContentViewPage from "./pages/book/BookContentViewPage";
import BookInfoUpdatePage from "./pages/book/BookInfoUpdatePage";
import BookContentUpdatePage from "./pages/book/BookContentUpdatePage";
import ArticleListPage from "./pages/article/ArticleListPage";
import ArticleContentViewPage from "./pages/article/ArticleContentViewPage";
import ArticleContentWritePage from "./pages/article/ArticleContentWritePage";
import ArticleContentUpdatePage from "./pages/article/ArticleContentUpdatePage";
import ArticleCategoryManagePage from "./pages/article/ArticleCategoryManagePage";
import EduListPage from "./pages/edu/EduListPage";
import EduContentViewPage from "./pages/edu/EduContentViewPage";
import EduContentWritePage from "./pages/edu/EduContentWritePage";
import EduContentUpdatePage from "./pages/edu/EduContentUpdatePage";
import EduCategoryManagePage from "./pages/edu/EduCategoryManagePage";

function App() {
  return (
    <>
      <HeaderContainer />
      <MenuTemplate />
      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route path="/book/chapter/:bookInfoId" element={<BookChapterListPage />}/>
        <Route path="/book/content/:bookChapterInfoId" element={<BookContentViewPage />}/>
        <Route path="/book/info" element={<BookInfoSavePage />} />
        <Route path="/book/info/:bookInfoId" element={<BookInfoUpdatePage />} />
        <Route path="/book/chapter/write/:bookInfoId" element={<BookContentWritePage />}/>
        <Route path="/book/chapter/update/:bookChapterInfoId" element={<BookContentUpdatePage/>}/>

        <Route path="/article" element={<ArticleListPage />} />
        <Route path="/article/:articleSeq" element={<ArticleContentViewPage/>} />
        <Route path="/article/write" element={<ArticleContentWritePage/>} />
        <Route path="/article/write/:articleSeq" element={<ArticleContentUpdatePage />} />
        <Route path="/article/group" element={<ArticleCategoryManagePage />} />

        <Route path="/edu" element={<EduListPage />} />
        <Route path="/edu/:eduSeq" element={<EduContentViewPage/>} />
        <Route path="/edu/write" element={<EduContentWritePage/>} />
        <Route path="/edu/write/:eduSeq" element={<EduContentUpdatePage />} />
        <Route path="/edu/group" element={<EduCategoryManagePage />} />
      </Routes>
    </>
  );
}

export default App;
