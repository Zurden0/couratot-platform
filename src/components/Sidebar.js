import "./css/sidebar.css";
// импорт компонентов иконок
import LogotypeIcon from "./icons/Logotype";
import HomeIcon from "./icons/Home";
import ProfileIcon from "./icons/Profile";
import SettingsIcon from "./icons/Settings";
import NotificationIcon from "./icons/Notification";

class MiniProfileClass {
  #user_info;

  constructor(user_info) {
    /**
     * @param {Object} user_info
     * @param {number | string} user_info.id
     * @param {string} user_info.firstname
     * @param {string} user_info.login
     * @param {string} user_info.avatar_link
     */

    this.#user_info = user_info;
  }

  #goto_profile() {
  }

  MiniProfile = () => {
    return (
      <div className={"mini-profile"} onClick={this.#goto_profile}>
        <div className="profile-info">
          <img src={this.#user_info.avatar_link} alt=""/>
          <div className={"name-info"}>
            <p className="firstname">{this.#user_info.first_name}</p>
            <p className="login">{this.#user_info.login}</p>
          </div>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M17 12C17 13.3807 18.1193 14.5 19.5 14.5C20.8807 14.5 22 13.3807 22 12C22 10.6193 20.8807 9.5 19.5 9.5C18.1193 9.5 17 10.6193 17 12Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd"
                d="M9.5 12C9.5 13.3807 10.6193 14.5 12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd"
                d="M2 12C2 13.3807 3.11929 14.5 4.5 14.5C5.88071 14.5 7 13.3807 7 12C7 10.6193 5.88071 9.5 4.5 9.5C3.11929 9.5 2 10.6193 2 12Z"
                fill="currentColor"/>
        </svg>
      </div>
    )
  }
}

class SidebarOptionClass {
  #user_access;

   #options =  [
      {
        icon: LogotypeIcon,
        access: ["student", "curator", "admin"],
        name: "",
        func: this.#goto_main
      },
      {
        icon: HomeIcon,
        access: ["student", "curator", "admin"],
        name: "Главнаяя",
        func: this.#goto_main
      },
      {
        icon: ProfileIcon,
        access: ["student", "curator", "admin"],
        name: "Профиль",
        func: this.#goto_profile
      },
      {
        icon: NotificationIcon,
        access: ["student", "curator", "admin"],
        name: "Уведомления",
        func: this.#goto_notification
      },
      {
        icon: SettingsIcon,
        access: ["student", "curator", "admin"],
        name: "Настройки",
        func: this.#goto_settings
      },
    ];

  constructor(user_access) {
    this.#user_access = user_access;
  }

  #check_user_access(component) {
    return component.access.includes(this.#user_access);
  }

  #goto_main() {
  }

  #goto_profile() {
  }

  #goto_notification() {
  }

  #goto_settings() {
  }

  #Option = ({component}) => {
    if (!this.#check_user_access(component)) {
      return
    }

    const ComponentIcon = component.icon;
    return (
      <div className={"sidebar-option"} onClick={component.func}>
        {<ComponentIcon/>}
        <p>{component.name}</p>
      </div>
    )
  }

  SidebarOptions = () => {
    const Option = this.#Option;
    return (
      <div className="options-cont">
        {this.#options.map((component, index) =>
          <Option
            key={index}
            component={component}
          />)}
      </div>
    )
  }
}


const user_info = {
  id: 1,
  first_name: "Герман",
  login: "german",
  avatar_link: "",
  user_access: "student"
}
// Компоненты
const MiniProfile = new MiniProfileClass(user_info).MiniProfile;
const SidebarOptions = new SidebarOptionClass(user_info.user_access).SidebarOptions;


const Sidebar = () => {
  return (
    <div className={"sidebar"}>
      {<SidebarOptions/>}
      {<MiniProfile/>}
    </div>
  );
};

export default Sidebar;