import {
  Icon,
  Pane,
  AlignJustifyIcon,
  SideSheet,
  Heading,
  Link,
  Dialog,
} from "evergreen-ui";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/login";
import { AuthContextType } from "../interface/login";

function NavBar({ title }: { title: string }) {
  const { user, handleLogout } = useContext(AuthContext) as AuthContextType;
  const [isShown, setIsShown] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <Pane
      background="#8257e5"
      display="flex"
      padding={15}
      justifyContent="space-between"
      elevation={3}
      alignItems="center"
    >
      <h1>{title}</h1>
      <Pane onClick={() => setIsShown(true)} display="flex" alignItems="center">
        <Heading paddingRight={5}>Menu</Heading>
        <Icon icon={AlignJustifyIcon} size={20} />
      </Pane>
      <SideSheet
        width={250}
        isShown={isShown}
        onCloseComplete={() => setIsShown(false)}
      >
        <Dialog
          isShown={show}
          title="Logout"
          intent="danger"
          onCloseComplete={() => {
            handleLogout();
            setShow(false);
          }}
          confirmLabel="Sair"
        >
          Você tem certeza que quer sair?
        </Dialog>
        <Pane display="flex" flexDirection="column">
          <Link
            href="#"
            onClick={() => navigate("/code")}
            color="neutral"
            margin={40}
          >
            Códigos de área
          </Link>
          <Link
            href="#"
            onClick={() => navigate("/plan")}
            color="neutral"
            margin={40}
          >
            Planos
          </Link>
          {user?.adm && (
            <Link
              href="#"
              onClick={() => navigate("/user")}
              color="neutral"
              margin={40}
            >
              Usuários
            </Link>
          )}
          <Link
            style={{ color: "red" }}
            href="#"
            onClick={() => setShow(true)}
            margin={40}
          >
            Sair
          </Link>
        </Pane>
      </SideSheet>
    </Pane>
  );
}

export default NavBar;
