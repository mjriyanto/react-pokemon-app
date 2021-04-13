import styled from "@emotion/styled";
import pokeball from "../assets/pokeball.png";

const StyledLoader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loader = () => {
  return (
    <StyledLoader>
      <img src={pokeball} alt='pokeball' />
    </StyledLoader>
  );
};

export default Loader;
