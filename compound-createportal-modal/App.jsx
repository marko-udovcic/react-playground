import { createPortal } from "react-dom";
import Nav from "../components/Nav";
import { cloneElement, createContext, useContext } from "react";
import { useState } from "react";
const ModalContext = createContext();
//parent component Modal.jsx
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);
  return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>;
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  if (name !== openName) return null;
  return createPortal(
    <>
      <div className="fixed inset-0 backdrop-blur-[5px]">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </div>
      </div>
    </>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

function App() {
  const deleteUser = (userId) => {
    console.log("user ", userId, "deleting....");
  };
  return (
    <>
      <Nav />
      <div className="text-white">User1</div>
      <Modal>
        <Modal.Open opens="user-form">
          <button className="text-white">Delete User</button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <ConfirmDelete onConfirm={() => deleteUser(1)} />
        </Modal.Window>
      </Modal>
    </>
  );
}
function ConfirmDelete({ onCloseModal, onConfirm }) {
  const handleDelete = () => {
    onConfirm();
    onCloseModal();
  };
  return (
    <div>
      <h2 className="text-xl font-bold">Are you sure that you want delete this user</h2>
      <button onClick={onCloseModal}>Cancel</button>
      <button className="bg-red-500 text-white p-2 mt-4 rounded" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
export default App;
