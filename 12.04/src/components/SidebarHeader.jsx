export default function SideBarHeader({openSidebar, toggleSidebar}) {
  return (
    <div className="SideBarHeader">
      <h1>메모장</h1>

      <button onClick={toggleSidebar}>
        {openSidebar ? <>&laquo;</> : <>&raquo;</>}
      </button>
    </div>
  );
}
