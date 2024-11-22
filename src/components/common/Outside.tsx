import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const OutsideBlock = styled.div<{$display : boolean}>`
  display: ${props => props.$display ? 'block' : 'none'};
`

const Outside = ({ children, close, $display}: { children: React.ReactNode; close: () => void; $display: boolean }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e : MouseEvent) => {
      if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) close();
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  return (
    <OutsideBlock ref={dropdownRef} $display={$display}>
      {children}
    </OutsideBlock>
  );
};

export default Outside;