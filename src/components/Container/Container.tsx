import React from "react";
import * as S from "./Container.styled";

type Props = {
  children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
  return <S.Container>{children}</S.Container>;
};
