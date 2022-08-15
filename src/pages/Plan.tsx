import {
  Heading,
  Pane,
  TextInputField,
  Button,
  Table,
  Spinner,
  EditIcon,
  IconButton,
  DeleteIcon,
  toaster,
  Popover,
  Text,
} from "evergreen-ui";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import api from "../api";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/login";
import { AuthContextType } from "../interface/login";
import { PlanType } from "../interface/plan";

function Plan() {
  const [data, setData] = useState<PlanType[]>();
  const [update, setUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState<number>();
  const { handleLogout } = useContext(AuthContext) as AuthContextType;

  const formik = useFormik({
    initialValues: {
      name: "",
      min: "",
    },
    onSubmit: (values) => {
      if (update) {
        api
          .put("plan/" + idUpdate, values)
          .then(() => {
            toaster.success("Seu dados foram atualizados com sucesso");
            getData();
            formik.resetForm();
            formik.values.name = "";
            formik.values.min = "";
          })
          .catch((e) => toaster.danger(e.response.data));
      } else {
        api
          .post("plan", values)
          .then(() => {
            toaster.success("Seu dados foram salvos com sucesso");
            getData();
            formik.resetForm();
          })
          .catch((e) => toaster.danger(e.response.data));
      }
    },
  });

  const getData = () => {
    api
      .get("plan")
      .then(({ data }) => {
        setData(data);
      })
      .catch((e) => {
        if (e.response.data === "Unauthorized") {
          handleLogout();
        }
      });
  };

  const handleDelete = async (id: number) => {
    await api.delete("plan/" + id).then(() => {
      toaster.success("Plano deletado com succeso");
      getData();
    });
  };

  const handleUpdate = (id: number, name: string, min: string) => {
    formik.values.name = name;
    formik.values.min = min;
    setIdUpdate(id);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <NavBar title={"Planos"} />

      <Pane
        elevation={2}
        borderRadius={5}
        padding={15}
        marginX={100}
        marginY={30}
      >
        <Heading marginBottom={25}>
          Formulario para cadastrar mais planos
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <TextInputField
            label="Nome do plano"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextInputField
            label="Minutos descontados"
            name="min"
            value={formik.values.min}
            onChange={formik.handleChange}
          />
          {update ? (
            <>
              <Button marginRight={15} type="submit">
                Update
              </Button>
              <Button
                appearance="primary"
                onClick={() => {
                  setUpdate(false);
                  formik.values.name = "";
                  formik.values.min = "";
                  getData();
                }}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button type="submit">Enviar</Button>
          )}
        </form>
      </Pane>
      <Pane
        elevation={2}
        borderRadius={5}
        padding={15}
        marginX={100}
        marginY={30}
      >
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Nome do plano</Table.TextHeaderCell>
            <Table.TextHeaderCell>Minutos descontados</Table.TextHeaderCell>
            <Table.TextHeaderCell>Açõe</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {data ? (
              data.map((x) => (
                <Table.Row key={x.id}>
                  <Table.TextCell>{x.name}</Table.TextCell>
                  <Table.TextCell>{x.min}</Table.TextCell>
                  <Table.TextCell>
                    <IconButton
                      icon={EditIcon}
                      onClick={() => {
                        handleUpdate(x.id, x.name, x.min);
                        setUpdate(true);
                      }}
                      marginRight={3}
                    />
                    <Popover
                      content={({ close }) => (
                        <Pane
                          width={240}
                          height={240}
                          display="flex"
                          padding={10}
                          justifyContent="center"
                          flexDirection="column"
                        >
                          <Text>
                            Você tem certeza que quer deletar esse item?
                          </Text>
                          <Pane marginTop={10}>
                            <Button marginRight={5} onClick={close}>
                              Cancelar
                            </Button>
                            <Button
                              intent="danger"
                              onClick={() => {
                                handleDelete(x.id);
                                close();
                              }}
                            >
                              Deletar
                            </Button>
                          </Pane>
                        </Pane>
                      )}
                    >
                      <IconButton intent="danger" icon={DeleteIcon} />
                    </Popover>
                  </Table.TextCell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.TextCell>
                  <Spinner />
                </Table.TextCell>
                <Table.TextCell>
                  <Spinner />
                </Table.TextCell>
                <Table.TextCell>
                  <Spinner />
                </Table.TextCell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Pane>
    </div>
  );
}

export default Plan;
