import "./App.css";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="text-black">
      <Outlet />
    </div>
  );
}

export default App;
