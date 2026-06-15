import {navigate} from "../../router";

const Logotype = () => {
  return (
    <img
      src="/favicon.png"
      alt="aiec"
      onClick={() => navigate("/")}
      style={{cursor: "pointer"}}
    />)
}

export default Logotype;