import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import LinkButton from "../common/LinkButton";
import * as bookTypes from "../../types/bookTypes";
import * as authTypes from "../../types/authTypes";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import TemplateBox from "../common/TemplateBox";
import NoContent from "../common/NoContent";
import * as SelectStyle from "../common/SelectBox";

const BookListTemplateBlock = styled(TemplateBox)``;

const BookTopHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const BookGridList = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: 10px;
  justify-items: center;
  align-items: center;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1300px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const BookItem = styled.div`
  width: 130px;
  height: 180px;
  
  position: relative;
  perspective: 1000px;
  &:hover > .firstPage {
    z-index: 0;
    transform: rotateY(-180deg);
  }
  &:hover > .firstPageBack {
    z-index: 1;
    transform: rotateY(-180deg);
  }
`;

const BookItemPage = styled.div`
  width: 100%;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
`;

const BookItemFirstPage = styled(BookItemPage)`
  z-index: 1;
  transform-origin: left center;
  transition-duration: 1s;
  background-color: rgb(80, 80, 80);
`;

const BookItemFirstPageBack = styled(BookItemFirstPage)`
  z-index: 0;
  transform-origin: left center;
  transition-duration: 1s;
  background-color: rgb(80, 80, 80);
`;

const BookItemSecondPage = styled(BookItemPage)`
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: rgb(80, 80, 80);
  div {
    text-align: center;
    display: -webkit-box;             /* 텍스트가 여러 줄로 표시될 수 있게 설정 */
    -webkit-box-orient: vertical;     /* 세로 방향으로 내용 정렬 */
    -webkit-line-clamp: 8;            /* 최대 3줄까지 표시 */
    overflow: hidden;
    text-overflow:ellipsis;
    width: 90%;   
    color: white;
  }
`;

const BookItemImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: contain;
`;

const BookUpdateLink = styled(Link)`
  position: absolute; 
  border: 2px solid black;
  width: 44px;
  left: 0;
  bottom: 0;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1px 1px;
  color: black;
  &:link, &:visited, &:hover, &:active {
    color: black;
    text-decoration: none;
  }
  font-size: 14px;
  height: 18px;
  background-color: white;
`;

const BookDeleteButton = styled(Button)`
  position: absolute;
  border-radius: 8px;
  padding: 1px 1px;
  width: 50px;
  bottom: 0;
  right: 0;
  font-size: 14px;
`;

type BookListTemplateProps = {
  bookInfoList: bookTypes.bookInfoFileStringType[];
  ladderAccountId: string;
  handleDeleteBookItem: (bookInfoId: number) => void;
  userList : authTypes.ladderUserSelectType[];
  handleSelectBoxChange : (ladderAccountId : string) => void;
};

const BookListTemplate = ({
  bookInfoList,
  ladderAccountId,
  handleDeleteBookItem,
  userList,
  handleSelectBoxChange,
}: BookListTemplateProps) => {
  const auth = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
  const [toggleSelectBox, setToggleSelectBox] = useState<boolean>(false);
  
  return (
    <BookListTemplateBlock>
      <BookTopHeader>
        {ladderAccountId === auth.ladderAccountId && <LinkButton text={"추가"} link={"/book/info"} />}
        <SelectStyle.SelectBoxContainer>
          <SelectStyle.DropdownBtn onClick={() => setToggleSelectBox(!toggleSelectBox)}>
            <div className="text">{ladderAccountId}</div>
            <div className="btn">▼</div>
          </SelectStyle.DropdownBtn>
          
          <SelectStyle.DropdownList $display={toggleSelectBox}>
            {userList.map(user => (
              <SelectStyle.DropdownItem key={user.ladderAccountSeq}
                onClick={() => handleSelectBoxChange(user.ladderAccountId)}>
                {user.ladderAccountId}
              </SelectStyle.DropdownItem>
            ))}
          </SelectStyle.DropdownList>
        </SelectStyle.SelectBoxContainer>
      </BookTopHeader>
      {!bookInfoList || bookInfoList.length === 0 ? <NoContent/> : 
        <BookGridList >
          {bookInfoList?.map((bookInfo) => (
            <BookItem key={bookInfo.bookInfoId}>
              <BookItemFirstPage className="firstPage">
                <BookItemImg
                  src={
                    bookInfo.bookImgFile
                      ? `data:image/${bookInfo.bookImgFileExtension};base64,${bookInfo.bookImgFile}`
                      : `${process.env.PUBLIC_URL}/book.svg`
                  }
                />
              </BookItemFirstPage>
              <BookItemFirstPageBack className="firstPageBack" />
              <Link to={`/book/chapter/${bookInfo.bookInfoId}`}>
                <BookItemSecondPage>
                  <div>
                    {bookInfo.bookDescription ? bookInfo.bookDescription : "들어가기"}
                  </div>
                </BookItemSecondPage>
              </Link>
              {auth.ladderAccountId === bookInfo.firstSaveUser && (
                <>
                  <BookUpdateLink to={`/book/info/${bookInfo.bookInfoId}`}>
                    수정
                  </BookUpdateLink>
                  <BookDeleteButton
                    onClick={() => handleDeleteBookItem(bookInfo.bookInfoId)}
                  >
                    삭제
                  </BookDeleteButton>
                </>
              )}
            </BookItem>
          ))}
        </BookGridList>
      }
    </BookListTemplateBlock>
  );
};

export default BookListTemplate;
