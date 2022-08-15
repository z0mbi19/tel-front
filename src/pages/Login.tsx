import { CogIcon, Icon, Pane, Tooltip } from "evergreen-ui";
import { Link } from "react-router-dom";
import FormLogin from "../components/FormLogin";

function Login() {
  return (
    <Pane
      display="flex"
      flexFlow="column"
      position="absolute"
      right={0}
      left={0}
      top={0}
      bottom={0}
      background="#8257e5"
      justifyContent="center"
      alignItems="center"
    >
      <FormLogin />
      <Pane left={0} top={0} padding={10} position="absolute">
        <Tooltip content="Pagina inicial">
          <Link to="/">
            <Icon color="black" icon={CogIcon} />
          </Link>
        </Tooltip>
      </Pane>
    </Pane>
  );
}

export default Login;
