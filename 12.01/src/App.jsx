// App.jsx
import Mandoo from "./Mandoo";

// 아래 todos 리스트를 만두 이미지 아래에 뿌려주세요
const mandooTodoLists = {
  todos: ["간식 먹기", "화분 돌 다 꺼내기", "공유기 위에서 자기"],
};

export default function App() {
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
    </main>
  );
}

