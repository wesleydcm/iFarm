import { Container, Form, Logo } from "./styles";
import LogoImage from "../../../../assets/images-mobile/logo.svg";
import Input from "../../../Input";
import Button from "../../../Button";
import { useUser } from "../../../../providers/user";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { IAddress } from "../../../../@types";

interface FormValues {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  complement?: string;
  cep?: string;
}

const Motion = {
  hidden: {
    x: "100vw",
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      delay: 0.2,
      duration: 1,
    },
  },
};

const RegisterStep3Desktop = () => {
  const [cepValue, setCepValue] = useState("");

  const [districtInput, setDistrickInput] = useState("");

  const [cityInput, setCityInput] = useState("");

  const [streetInput, setStreetInput] = useState("");

  const [stateInput, setStateInput] = useState("");

  const { tempUser, initController } = useUser();

  const history = useHistory();

  const schema = yup.object().shape({
    state: yup.string(),
    city: yup.string(),
    neighborhood: yup.string(),
    street: yup.string(),
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

  const onSubmit = async (data: FormValues) => {
    const address: IAddress = {
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      complement: data.complement,
      cep: data.cep,
    };

    tempUser.address = address;
    tempUser.favorites = [];
    controller
      .registerUser(tempUser)
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        controller.login({
          email: tempUser.email,
          password: tempUser.password,
        });
        reset();
        history.push("/");
      });
  };

  const handleClick = useCallback(async (url) => {
    axios.get(url).then((response) => {
      setStateInput(response.data.uf);
      setCityInput(response.data.localidade);
      setDistrickInput(response.data.bairro);
      setStreetInput(response.data.logradouro);
    });
  }, []);

  useEffect(() => {
    if (cepValue.length === 8) {
      console.log("cepValue :>> ", cepValue);
      handleClick(`https://viacep.com.br/ws/${cepValue}/json/`);
    }
  }, [cepValue, handleClick]);

  return (
    <Container>
      <Logo>
        <div className="description">
          <h1>Bem vindo ao iRoça</h1>
          <p>
            Que legal! Agora queremos saber mais sobre você, por favor informe
            seus dados para concluir o seu cadastro
          </p>
        </div>
        <div className="image">
          <img src={LogoImage} alt="logo" />
        </div>
      </Logo>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        variants={Motion}
        initial="hidden"
        animate="visible"
      >
        <div className="input">
          <h1>Dados de Endereço</h1>
          <Input
            placeholder={"Estado"}
            type={"text"}
            width={260}
            name={"state"}
            register={register}
            value={stateInput}
          />
          <p>{errors.state?.message}</p>
          <Input
            placeholder={"Cidade"}
            type={"text"}
            width={260}
            name={"city"}
            register={register}
            value={cityInput}
          />
          <p>{errors.city?.message}</p>
          <Input
            placeholder={"Bairro"}
            type={"text"}
            width={260}
            name={"neighborhood"}
            register={register}
            value={districtInput}
          />
          <p>{errors.neighborhood?.message}</p>
          <Input
            placeholder={"Rua"}
            type={"text"}
            width={260}
            name={"street"}
            register={register}
            value={streetInput}
          />
          <p>{errors.street?.message}</p>
          <Input
            placeholder={"Complemento"}
            type={"text"}
            width={260}
            name={"complement"}
            register={register}
          />
          <p>{errors.complement?.message}</p>
        </div>
        <div className="photo">
          <div className="photo-input">
            <input
              placeholder="CEP"
              type="text"
              {...register("cep")}
              onChange={(e) => setCepValue(e.target.value)}
            />
            <span>ou</span>
            <Button
              width={130}
              color={"green"}
              type={"button"}
              onClick={() =>
                handleClick(`https://viacep.com.br/ws/${cepValue}/json/`)
              }
            >
              Verificar
            </Button>
          </div>
          <p>{errors.cep?.message}</p>
        </div>
        <div className="button">
          <Button width={225} color={"green"} type={"submit"}>
            Finalizar cadastro
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default RegisterStep3Desktop;
