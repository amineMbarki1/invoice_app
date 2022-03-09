import { Link } from 'react-router-dom';

import './Button.css';

const Button = (props) => {
  const button = (
    <button
      data-action={props.btnAction}
      onClick={props.clickHandler}
      className={`btn btn--${props.btnAction} ${
        props.className ? props.className : ''
      }`}
    >
      {props.children}
    </button>
  );
  if (props.to) return <Link to={props.to}>{button}</Link>;
  return button;
};

export default Button;
