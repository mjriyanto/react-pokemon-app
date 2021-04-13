import styled from "@emotion/styled";

const StyledInput = styled.input`
  background: #fff;
  border: 2px solid #222;
  box-shadow: 0.3rem 0.3rem 0 #222;
  margin: 0 70px 20px;
  padding: 10px 15px;
  &:focus {
    outline: none;
  }
`;

const Input = ({ handleChange }) => {
  return (
    <StyledInput type='text' onChange={(e) => handleChange(e.target.value)} />
  );
};

export default Input;
