import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";

import DefaultLayout from "./layout/default";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
