import { Container, Card } from "../../../styles/producer_cart_styles";
import { useHistory } from "react-router-dom";
import RatingStar from "../../reviews-stars";

const ProducerCartDesktop = (): JSX.Element => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/ownerProfile/:id");
  };

  return (
    <Container onClick={handleClick}>
      <Card>
        <div className="information">
          <div className="name">
            <h3>Nome</h3>
            <p>Bino</p>
          </div>
          <div className="localization">
            <h3>Localização</h3>
            <p>Minas Gerais (MG)</p>
          </div>
          <div className="localization">
            <h3>Contato</h3>
            <div className="contact">
              <p>telefone: 4002-8922</p>
              <p>email: binoBetoneira@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="image">
          <RatingStar />
        </div>
      </Card>
    </Container>
  );
};

export default ProducerCartDesktop;
