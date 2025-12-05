import MemoItem from './MemoItem';

export default function MemoList({
  memos,
  selectedMemoIndex,
  setSelectedMemoIndex,
  onMemoDeleteClick,
}) {
  return (
    <div className="MemoList">
      {memos.map((memo, index) => (
        <MemoItem
          key={index}
          onMemoItemClick={() => setSelectedMemoIndex(index)}
          isSelected={selectedMemoIndex === index}
          onMemoDeleteClick={() => onMemoDeleteClick(index)}
        >
          {memo.title}
        </MemoItem>
      ))}
    </div>
  );
}
