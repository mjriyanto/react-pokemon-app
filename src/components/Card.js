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
  .card-btn {
    background: rgba(234, 52, 87, 0.9);
    border: 2px solid black;
    box-shadow: 0.2rem 0.2rem 0 #222;
    color: #fff;
    margin: 20px 0;
    padding: 7px 15px;
    text-align: center;
  }
`;

const Card = ({ id, name, image, goToDetail, getOwned, onClickRelease }) => {
  return (
    <>
      {id === "pokemon-list" ? (
        <StyledCard onClick={() => goToDetail(name)}>
          <img src={image} className='card-image' alt={`${name}`} />
          <p className='card-name'>{name}</p>
          <p className='card-owned'>Owned: {getOwned(name)}</p>
        </StyledCard>
      ) : (
        <StyledCard>
          <img src={image} className='card-image' alt={`${name}`} />
          <p className='card-name'>{name}</p>
          <button className='card-btn' onClick={() => onClickRelease(name)}>
            Release
          </button>
        </StyledCard>
      )}
    </>
  );
};

export default Card;
