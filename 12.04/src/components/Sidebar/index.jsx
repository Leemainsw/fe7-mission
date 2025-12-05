import MemoList from '../MemoList';
import SideBarFooter from '../SideBarFooter';
import SideBarHeader from '../SideBarHeader';
import './index.css';
export default function SideBar({
  openSidebar,
  toggleSidebar,
  memos,
  selectedMemoIndex,
  setSelectedMemoIndex,
  onAddMemo,
  onMemoDeleteClick,
}) {
  return (
    <div
      className={`SideBar ${openSidebar ? 'SideBar--open' : 'SideBar--closed'}`}
    >
      <SideBarHeader openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
      <MemoList
        memos={memos}
        selectedMemoIndex={selectedMemoIndex}
        setSelectedMemoIndex={setSelectedMemoIndex}
        onMemoDeleteClick={onMemoDeleteClick}
      />
      <SideBarFooter onAddMemo={onAddMemo} />
    </div>
  );
}
