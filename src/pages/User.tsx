import {
  Button,
  Checkbox,
  DeleteIcon,
  EditIcon,
  Heading,
  Icon,
  IconButton,
  Pane,
  Popover,
  Spinner,
  Table,
  Text,
  TextInputField,
  toaster,
} from "evergreen-ui";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import api from "../api";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/login";
import { AuthContextType } from "../interface/login";
import { UserTypes } from "../interface/user";

function User() {
  const [data, setData] = useState<UserTypes[]>();
  const [checked, setChecked] = useState(false);
  const [update, setUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState<number>();
  const { handleLogout } = useContext(AuthContext) as AuthContextType;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      adm: false,
    },
    onSubmit: (values) => {
      if (update) {
        api
          .put("user/" + idUpdate, values)
          .then(() => {
            toaster.success("Seu dados foram atualizados com sucesso");
            getData();
            formik.resetForm();
            formik.values.email = "";
            formik.values.password = "";
            formik.values.adm = false;
          })
          .catch((e) => toaster.danger(e.response.data));
      } else {
        api
          .post("user", values)
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
      .get("user")
      .then(({ data }) => {
        setData(data);
      })
      .catch((e) => {
        if (e.response.data === "Unauthorized") {
          handleLogout();
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id: number) => {
    await api.delete("user/" + id).then(() => {
      toaster.success("Código deletado com succeso");
      getData();
    });
  };

  const handleUpdate = (
    id: number,
    email: string,
    password: string,
    adm: boolean
  ) => {
    formik.values.email = email;
    formik.values.adm = adm;
    setIdUpdate(id);
    getData();
  };

  return (
    <div>
      <NavBar title="Usuários" />
      <Pane
        elevation={2}
        borderRadius={5}
        padding={15}
        marginX={100}
        marginY={30}
      >
        <Heading marginBottom={25}>
          Formulario para cadastrar mais usuários
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <TextInputField
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextInputField
            label="Senha"
            name="password"
            type="password"
            placeholder="Senha"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Checkbox
            label="Administrador"
            name="adm"
            checked={formik.values.adm}
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
                  formik.values.email = "";
                  formik.values.password = "";
                  formik.values.adm = false;
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
            <Table.TextHeaderCell>ID</Table.TextHeaderCell>
            <Table.TextHeaderCell>Email</Table.TextHeaderCell>
            <Table.TextHeaderCell>Açõe</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {data ? (
              data.map((x) => (
                <Table.Row key={x.id}>
                  <Table.TextCell>{x.id}</Table.TextCell>
                  <Table.TextCell>{x.email}</Table.TextCell>
                  <Table.TextCell>
                    <IconButton
                      icon={EditIcon}
                      onClick={() => {
                        handleUpdate(x.id, x.email, x.password, x.adm);
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

export default User;
