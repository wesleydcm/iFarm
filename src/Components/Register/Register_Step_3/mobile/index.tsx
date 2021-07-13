import { Container, Logo, Form, Footer } from "./styles";
import LogoImage from "../../../../assets/images-mobile/logo.svg";
import Input from "../../../Input";
import Button from "../../../Button";
import { useUser } from "../../../../Providers/user";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { IAdress } from "../../../../@types";

interface FormValues {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  complement?: string;
  cep?: string;
}

const RegisterStep2Mobile = () => {
  const [cepValue, setCepValue] = useState("");

  const [districtInput, setDistrickInput] = useState("");

  const [cityInput, setCityInput] = useState("");

  const [streetInput, setStreetInput] = useState("");

  const [stateInput, setStateInput] = useState("");

  const { tempUser, setTempUser, initController } = useUser();

  const history = useHistory();

  const schema = yup.object().shape({
    state: yup.string().required("Campo obrigatório"),
    city: yup.string().required("Campo obrigatório"),
    neighborhood: yup.string().required("Campo obrigatório"),
    street: yup.string().required("Campo obrigatório"),
    complement: yup.string(),
    cep: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const controller = initController();

  const onSubmit = (data: FormValues) => {
    const address: IAdress = {
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      complement: data.complement,
      cep: data.cep,
    };
    setTempUser({ ...tempUser, address });
    controller.registerUser(tempUser).then(() => {
      controller.login({
        email: tempUser.email,
        password: tempUser.password,
      });
      reset();
      history.push("/home");
    });
  };

  const handleClick = () => {
    axios.get(`https://viacep.com.br/ws/${cepValue}/json/`).then((response) => {
      setStateInput(response.data.uf);
      setCityInput(response.data.localidade);
      setDistrickInput(response.data.bairro);
      setStreetInput(response.data.logradouro);
    });
  };

  return (
    <Container>
      <Logo>
        <img src={LogoImage} alt="logo" />
        <p>
          Que legal! Agora queremos saber mais sobre você, por favor informe
          seus dados para concluir o seu cadastro
        </p>
      </Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Dados de endereço</h1>
        <div className="cep">
          <input
            placeholder="CEP"
            type="text"
            {...register("cep")}
            onChange={(e) => setCepValue(e.target.value)}
          />
          <Button type={"button"} width={115} onClick={handleClick}>
            Verificar
          </Button>
          <p>{errors.cep?.message}</p>
        </div>
        <div className="input">
          <Input
            placeholder={"Estado"}
            type={"text"}
            color={"white"}
            name={"state"}
            register={register}
            value={stateInput}
            width={310}
          />
          <p>{errors.state?.message}</p>
          <Input
            placeholder={"Cidade"}
            type={"text"}
            color={"white"}
            name={"city"}
            register={register}
            value={cityInput}
            width={310}
          />
          <p>{errors.city?.message}</p>
          <Input
            placeholder={"Bairro"}
            type={"text"}
            color={"white"}
            name={"neighborhood"}
            register={register}
            value={districtInput}
            width={310}
          />
          <p>{errors.neighborhood?.message}</p>
          <Input
            placeholder={"Rua"}
            type={"text"}
            color={"white"}
            name={"street"}
            register={register}
            value={streetInput}
            width={310}
          />
          <p>{errors.street?.message}</p>
          <Input
            placeholder={"Complemento"}
            type={"text"}
            color={"white"}
            name={"complement"}
            register={register}
            width={310}
          />
          <p>{errors.complement?.message}</p>
        </div>
        <div className="button">
          <Button type={"submit"} width={230}>
            Finalizar cadastro
          </Button>
        </div>
      </Form>
      <Footer>
        <p>Já possui uma conta ? Entre por aqui!</p>
      </Footer>
    </Container>
  );
};

export default RegisterStep2Mobile;
