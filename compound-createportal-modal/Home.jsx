import { createPortal } from "react-dom";
import Nav from "../components/Nav";
import PropTypes from "prop-types";

function Modal({ children }) {
  return createPortal(
    <>
      <div className="fixed inset-0 backdrop-blur-[5px]">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 p-6 rounded-lg shadow-lg">
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

function Home() {
  return (
    <>
      <Modal>
        <div>Modal content</div>
      </Modal>
    </>
  );
}

export default Home;
