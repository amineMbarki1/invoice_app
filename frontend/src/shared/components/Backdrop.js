import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './Backdrop.css';

const Backdrop = (props) => {
  const history = useHistory();

  return ReactDOM.createPortal(
    <AnimatePresence>
      {props.isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={
            props.onClickHandler
              ? props.onClickHandler
              : () => history.push(props.page)
          }
          className="backdrop"
        ></motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('backdrop')
  );
};

export default Backdrop;
