import RemaProvider from "../lib/remaProvider";
import Container from "./components/Container";
import Content1 from "./components/Content1";
import Content2 from "./components/Content2";

function App() {
  return (
    <RemaProvider>
      <Container>
        <div style={{ display: "flex", gap: "1em", width: "100%" }}>
          <Content1 />
          <Content2 />
        </div>
      </Container>
    </RemaProvider>
  );
}

export default App;
