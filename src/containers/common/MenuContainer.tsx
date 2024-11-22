import React, { useEffect, useState } from 'react';
import * as commonTypes from "../../types/commonTypes";
import { requestApiFn } from '../../lib/api/apiClient';
import * as menuApiRequestParam from "../../lib/api/menu";
import useModal from '../../hooks/modal/useModal';
import MenuTemplate from '../../components/menu/MenuTemplate';

const MenuContainer = () => {

  const [menuList, setMenuList] = useState<commonTypes.menu[]>([]);
  const modal = useModal();

  useEffect(() => {
    const searchMenuList = async () => {
      const resultData = await requestApiFn<void, commonTypes.menu[]>(
        menuApiRequestParam.searchMenuList()
      );
      if(resultData.code === "200") setMenuList(resultData.data);
      else modal.openToastModal(resultData.msg, "error");
    }
    searchMenuList();
  }, []);

  return (
    <MenuTemplate
      menuList={menuList}
    />
  );
};

export default MenuContainer;