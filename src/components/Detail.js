import styled from "@emotion/styled";

const Detail = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 20px;
  .card {
    background: #ffffff;
    border: 2px solid #222;
    grid-column: span 3;
    padding: 10px;
    p {
      text-transform: capitalize;
    }
  }
`;

export default Detail;
