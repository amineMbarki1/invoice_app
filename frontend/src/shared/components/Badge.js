import './Badge.css';

const Badge = (props) => {
  return (
    <div className={`badge badge--${props.status} center`}>
      <span>&bull; {props.status}</span>
    </div>
  );
};

export default Badge;
