import Logotype from "./icons/Logotype";
import Home from "./icons/Home";
import Profile from "./icons/Profile";
import Notification from "./icons/Notification";
import Settings from "./icons/Settings";

export const options = [
  {
    icon: Logotype,
    access: ["student", "curator", "admin"],
    name: "",
    func: goto_main
  },
  {
    icon: Home,
    access: ["student", "curator", "admin"],
    name: "Главнаяя",
    func: goto_main
  },
  {
    icon: Profile,
    access: ["student", "curator", "admin"],
    name: "Профиль",
    func: goto_profile
  },
  {
    icon: Notification,
    access: ["student", "curator", "admin"],
    name: "Уведомления",
    func: goto_notification
  },
  {
    icon: Settings,
    access: ["student", "curator", "admin"],
    name: "Настройки",
    func: goto_settings
  },

];
const user_access = "student";

function check_user_access(component) {
  return component.access.includes(user_access);
}

function goto_main() {
}

function goto_profile() {
}

function goto_notification() {
}

function goto_settings() {
}

export const SidebarOption = ({component}) => {
  if (!check_user_access(component)) {
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

