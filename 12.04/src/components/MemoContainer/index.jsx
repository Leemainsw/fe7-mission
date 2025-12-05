import './index.css';

export default function MemoContainer({memo, onMemoChange}) {
  if (!memo) return null;
  return (
    <div className="MemoContainer">
      <div>
        <input
          type="text"
          className="MemoContainer__title"
          value={memo.title}
          onChange={e => {
            onMemoChange({
              ...memo,
              title: e.target.value,
              updateAt: new Date().getTime(),
            });
          }}
        />
      </div>
      <div>
        <textarea
          className="MemoContainer__content"
          value={memo.content}
          onChange={e => {
            onMemoChange({
              ...memo,
              content: e.target.value,
              updateAt: new Date().getTime(),
            });
          }}
        />
      </div>
    </div>
  );
}
