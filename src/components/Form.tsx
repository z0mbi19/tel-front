import { useEffect, useState } from "react";
import {
  Combobox,
  Pane,
  TextInputField,
  Button,
  Badge,
  toaster,
} from "evergreen-ui";
import { useFormik } from "formik";
import api from "../api";
import { Code, Pay } from "../interface/form";

function Form() {
  const [code, setCode] = useState<Code>();
  const [pay, setPay] = useState<Pay>();

  useEffect(() => {
    api.get("form").then((data) => setCode(data.data));
  }, []);

  const formik = useFormik({
    initialValues: {
      origin: "",
      destiny: "",
      plan: "",
      min: "",
    },
    onSubmit: (values) => {
      api
        .post("form", values)
        .then((res) => {
          setPay(res.data);
          toaster.success("Confira abaixo os valores com e sem plano");
        })
        .catch((e) => toaster.danger(e.response.data));
    },
  });

  return (
    <Pane background="#fff" borderRadius={6} padding={25}>
      <h3>Calcular o valor da sua ligação </h3>
      {code && (
        <form onSubmit={formik.handleSubmit}>
          <Pane paddingBottom={10}>
            <label>Código de origem</label>
            <Combobox
              items={code.origin}
              onChange={(selected) => (formik.values.origin = selected)}
              placeholder="Código de origem"
            />
          </Pane>
          <Pane paddingBottom={10}>
            <label>Código de destino</label>
            <Combobox
              items={code.destiny}
              onChange={(selected) => (formik.values.destiny = selected)}
              placeholder="Código de destino"
            />
          </Pane>
          <Pane paddingBottom={10}>
            <label>Plano</label>
            <Combobox
              items={code.plans}
              onChange={(selected) => (formik.values.plan = selected)}
              placeholder="Plano"
            />
          </Pane>

          <TextInputField
            label="Quantos minutos"
            id="min"
            name="min"
            type="text"
            placeholder="Quantos minutos"
            value={formik.values.min}
            onChange={formik.handleChange}
          />
          <Button appearance="primary">Enviar</Button>
        </form>
      )}
      {pay && (
        <>
          <Pane display="flex" justifyContent="center" alignItems="center">
            <p>Com o plano: </p>
            <Badge color="green">{"R$" + pay.withPlan}</Badge>
          </Pane>
          <Pane display="flex" justifyContent="center" alignItems="center">
            <p>Sem o plano: </p>
            <Badge color="neutral">{"R$" + pay.withoutPlan}</Badge>
          </Pane>
        </>
      )}
    </Pane>
  );
}

export default Form;
