import styled from "@emotion/styled";

const Title = styled.div`
  background: #fff;
  border: 2px solid black;
  box-shadow: 0.3rem 0.3rem 0 #222;
  margin: ${(props) => (props.primary ? "0 50px" : "0 70px 20px")};
  padding: 10px 15px;
  text-align: center;
  .title {
    color: ${(props) => (props.primary ? "#222" : "rgba(234, 52, 87, 1)")};
    font-weight: 600;
    font-size: ${(props) => (props.primary ? "1.6em" : "1.1em")};
    text-transform: capitalize;
  }
`;

export default Title;
