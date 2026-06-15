import "./css/nav.css"
import {navigate} from "../router";

const createNavOption = (navOption) => {
  return (
    <>
      <a className={navOption.className ?? ""} onClick={() => navigate(navOption.url)}>{navOption.name}</a>
    </>
  )
}

const Nav = ({navOptionsList}) => {
  return (
    <div className={"nav"}>
      {navOptionsList.map(element => createNavOption(element))}
    </div>
  )
}

export default Nav;