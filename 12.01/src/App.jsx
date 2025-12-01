// App.jsx
import Mandoo from "./Mandoo";
import { useState } from "react";

// 아래 todos 리스트를 만두 이미지 아래에 뿌려주세요
const mandooTodoLists = {
  todos: ["간식 먹기", "화분 돌 다 꺼내기", "공유기 위에서 자기"],
};

export default function App() {
const [type, setType] = useState("mission1");
const [number, setNumber] = useState(1);
const [increaseNumber, setIncreaseNumber] = useState(0);

if(type === "mission2") {
  	return(
      <main>
      <h1>{number}</h1>
      <button onClick={() => setNumber(number + 1)}>
        +1
      </button>
      <br />
      <input
        type="text"
        placeholder="숫자만 적으세요"
        value={increaseNumber}
        onChange={(e) => setIncreaseNumber(Number(e.target.value))}

      />
      <br />
      <button onClick={() => setNumber(number + increaseNumber)}>
        + {increaseNumber}
      </button>
    </main>
    )
}
  return (
    <main style={{ padding: "20px" }}>
      <h3>Mandoo Todo</h3>
      <Mandoo width={100} />
      {
        mandooTodoLists.todos.map((todo) => (
          <div key={todo} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>{todo}</span>
          </div>
        ))
      }

      <button onClick={() => setType("mission2")}>mission2</button>
    </main>
  );
}

