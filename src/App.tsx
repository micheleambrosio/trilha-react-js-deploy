import "./App.css";
import Posts from "./components/Posts";

const App: React.FC = () => {
  return (
    <div className="container pt-10 mx-auto flex h-full items-center justify-center min-h-screen">
      <Posts />
    </div>
  );
};

export default App;

