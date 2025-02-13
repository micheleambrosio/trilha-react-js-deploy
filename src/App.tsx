import "./App.css";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <div className="container pt-10 mx-auto flex h-full items-center justify-center min-h-screen">
      <Login />
    </div>
  );
};

export default App;

