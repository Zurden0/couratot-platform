import "./css/nav.css"
import {navigate} from "../router";

const Nav = () => {
  return (
    <div className={"nav"}>
      <a href="">Главная</a>
      <p>•</p>
      <a href="">Профиль</a>
      <p>•</p>
      <a href="">Настройки</a>
      <p>•</p>
      <a href="">Группы</a>
      <p>•</p>
      <a href="">Создать пост</a>
      <p>•</p>
      <a href="">Администрирование</a>
      <a className={"login"} href="avigate('/login')">Войти</a>
    </div>
  )
}

export default Nav;