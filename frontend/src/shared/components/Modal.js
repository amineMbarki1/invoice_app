import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Backdrop from './Backdrop';
import './Modal.css';

const variants = {
  visible: { y: -40, opacity: 1 },
  hidden: { y: 0, opacity: 0 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const Modal = (props) => {
  const modalElement = (
    <Fragment>
      <Backdrop
        onClickHandler={props.onCloseModalHandler}
        isVisible={props.isVisible}
      />
      <AnimatePresence>
        {props.isVisible && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="modal card"
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );

  return ReactDOM.createPortal(modalElement, document.getElementById('modal'));
};

export default Modal;
