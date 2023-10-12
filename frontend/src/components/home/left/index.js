import LeftLink from "./LeftLink";
import "./style.css";
export default function LeftHome({ user }) {
  return (
    <div className="left_home">
      <div className="left_link">
        <img src={user?.first_name} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </div>
      <LeftLink />
    </div>
  );
}
