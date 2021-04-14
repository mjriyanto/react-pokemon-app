import styled from "@emotion/styled";
import { useLocation, useHistory } from "react-router-dom";

const StyledNavbar = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding: 10px 20px;
  .nav {
    background: rgba(234, 52, 87, 0.9);
    color: #fff;
    border: 2px solid #222;
    box-shadow: 0.3rem 0.3rem 0 #222;
    grid-column: span 6;
    font-size: 1.1em;
    padding: 10px;
  }
`;

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  let url = location.pathname === '/' ? '/inventory' : '/';
  let text = location.pathname === '/' ? '> Open My Inventory' : '< Back to Homepage'

  return (
    <StyledNavbar onClick={() => history.push(url)}>
      <div className='nav'>{text}</div>
    </StyledNavbar>
  );
};

export default Navbar;
