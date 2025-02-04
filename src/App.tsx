import { RemaProvider } from "../lib";
import Container from "./components/Container";
import Content1 from "./components/Page1/Content1";
import Content2 from "./components/Page1/Content2";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Content3 from "./components/Page2/Content3";
import Content4 from "./components/Page2/Content4";

function App() {
  return (
    <RemaProvider>
      <BrowserRouter>
        <Container>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/other">Other</Link>
            </li>
          </ul>
          <Routes>
            <Route
              index
              element={
                <div style={{ display: "flex", gap: "1em", width: "100%" }}>
                  <Content1 />
                  <Content2 />
                </div>
              }
            />
            <Route
              path="/other"
              element={
                <div style={{ display: "flex", gap: "1em", width: "100%" }}>
                  <Content3 />
                  <Content4 />
                </div>
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </RemaProvider>
  );
}

export default App;
