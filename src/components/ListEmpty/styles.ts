import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const Message = styled.Text`

${({ theme }) => css`
font-size: ${theme.FONT_SIZE.SM}px;
  color: ${theme.COLORS.GRAY_300};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  `};

`;

