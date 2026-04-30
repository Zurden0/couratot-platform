import "./css/header.css";
import ArrowBack from "./icons/ArrowBack";
import BurgerMenu from "./icons/BurgerMenu";

class NavClass {
  #goto_back() {
  }

  #burger_menu() {
  }

  Nav = () => {
    return (
      <div className={"nav"}>
        {<ArrowBack/>}
        <div className="burger-menu-cont">
          {/* Позже здесь будет еще и поиск */}
          {<BurgerMenu/>}
        </div>
      </div>
    )
  }
}

class BannerAndAvatarClass {
  #banner_color;
  #avatar_link;

  constructor(banner_color, avatar_link) {
    this.#banner_color = banner_color;
    this.#avatar_link = avatar_link;
  }

  BannerAndAvatar = () => {
    return (
      <div className="banner-and-avatar">
        <div className="banner" style={{backgroundColor: this.#banner_color}}>
          <div className="avatar">
            <img src={this.#avatar_link} alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

// компоненты
const Nav = new NavClass().Nav;
const BannerAndAvatar = new BannerAndAvatarClass("#14f1ce", "").BannerAndAvatar;

const Header = () => {
  return (
    <div className={"header"}>
      {<Nav/>}
      {<BannerAndAvatar />}
      <div className="profile-button-cont">
      </div>
    </div>
  )
}

export default Header;
