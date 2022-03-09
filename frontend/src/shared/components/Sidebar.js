import { ReactComponent as Logo } from '../icons/logo.svg';
import { ReactComponent as Avatar } from '../icons/avatar.svg';

import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <Link to="/invoices" className="sidebar__logo sidebar__item">
        <Logo />
      </Link>
      <button onClick={props.openProfileModal} className="sidebar__avatar sidebar__item">
        <Avatar />
      </button>
    </div>
  );
};

export default Sidebar;
