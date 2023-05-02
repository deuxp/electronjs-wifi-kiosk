import style from "./App.module.css";
import Button from "./components/Button/Button";

function App() {
  function handleClick() {
    console.log("click");
  }
  return (
    <div className={style.main}>
      <div className={style.container}>
        <div>hello</div>
        <Button handleClick={handleClick}>Click</Button>
      </div>
    </div>
  );
}

export default App;
