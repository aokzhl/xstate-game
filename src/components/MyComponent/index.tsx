import styled from "styled-components";

const Div = styled.div`
  background-color: ${(props) => props.theme.color.black};
  color: ${(props) => props.theme.color.white};
`;

export const MyComponent = () => {
  return <Div>hsekoo</Div>;
};
