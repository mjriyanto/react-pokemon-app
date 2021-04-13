import styled from "@emotion/styled";

const Button = styled.div`
  background: rgba(234, 52, 87, 0.9);
  border: 2px solid black;
  box-shadow: 0.3rem 0.3rem 0 #222;
  color: #fff;
  margin: 0 70px 35px;
  padding: 10px 15px;
  text-align: center;
  .title {
    color: #fff;
    font-weight: 600;
    font-size: ${(props) => (props.primary ? "1.6em" : "1.1em")};
    text-transform: capitalize;
  }
`;

export default Button;
