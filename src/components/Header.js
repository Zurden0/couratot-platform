import "./css/header.css";
import Logotype from "./icons/Logotype";

const Header = () => {
  return (
    <div className={"header"}>
      <div className="content">
        <Logotype />
        <div className={"info-cont"}>
          <p className="title">КГБПОУ «Алтайский промышленно-экономический колледж»</p>
          <p className="adress">Алтайский край, г. Барнаул, Октябрьский район, ул. Горно-Алтайская, д. 17</p>
        </div>
      </div>
    </div>
  );
};

export default Header;