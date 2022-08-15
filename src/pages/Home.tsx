import { Icon, Pane, CogIcon, Tooltip } from "evergreen-ui";
import { Link } from "react-router-dom";
import Form from "../components/Form";

export default function Home() {
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
      <h1>Telzir plano FalaMais</h1>
      <Form />
      <Pane left={0} top={0} padding={10} position="absolute">
        <Tooltip content="Só para funcionarios">
          <Link to="/login">
            <Icon color="black" icon={CogIcon} />
          </Link>
        </Tooltip>
      </Pane>
    </Pane>
  );
}
