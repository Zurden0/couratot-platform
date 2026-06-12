import "./css/progileHeader.css";
import "./css/button.css";
import ArrowBack from "./icons/ArrowBack";
import BurgerMenu from "./icons/BurgerMenu";
import Edit from "./icons/Edit";
import Button from "./Button.js";
import ProfileEditUserInfo from "./ProfileEditUserInfo";

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

function editButtonListener() {
  const editInfoCont = document.querySelector(".edit-user-info-cont");

  editInfoCont.classList.toggle("active");
}

// компоненты
const Nav = new NavClass().Nav;
const BannerAndAvatar = new BannerAndAvatarClass("#14f1ce", "").BannerAndAvatar;

const ProfileHeader = ({children}) => {
  return (
    <div className={"header"}>
      {<Nav/>}
      {<BannerAndAvatar/>}
      <div className="profile-button-cont">
        <Button
          icon={Edit}
          text={"Редактировать"}
          func={editButtonListener}
        />
        {<ProfileEditUserInfo />}
      </div>
      {children}
    </div>
  )
}

export default ProfileHeader;
