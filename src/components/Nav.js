import "./css/nav.css"
import {navigate} from "../router";

const createNavOption = (navOption) => {
  return (
    <>
      <a onClick={() => navigate(navOption.url)}>{navOption.name}</a>
    </>
  )
}

const Nav = ({navOptionsList}) => {
  return (
    <div className={"nav"}>
      {navOptionsList.map(element => createNavOption(element))}
      <a className={"login"} onClick={() => navigate('/login')}>Войти</a>
    </div>
  )
}

export default Nav;