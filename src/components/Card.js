import styled from "@emotion/styled";

const StyledCard = styled.div`
  background: #ffffff;
  border: 2px solid #222;
  box-shadow: 0.3rem 0.3rem 0 #222;
  font-family: "Rubik";
  font-weight: 400;
  grid-column: span 4;
  padding: 10px;
  text-align: center;
  .card-image {
    width: 85%;
  }
  .card-name {
    text-transform: capitalize;
    font-size: 1.2em;
    margin: 10px 0 0;
  }
  .card-owned {
    color: rgba(234, 52, 87, 1);
    margin: 20px;
  }
`;

const Card = ({ name, image, goToDetail }) => {
  return (
    <StyledCard onClick={() => goToDetail(name)}>
      <img src={image} className='card-image' alt={`${name}`} />
      <p className='card-name'>{name}</p>
      <p className='card-owned'>Owned: 1</p>
    </StyledCard>
  );
};

export default Card;
