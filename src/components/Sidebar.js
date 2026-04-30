import "./css/sidebar.css";
import MiniProfile from "./MiniProfile";
import {options, SidebarOption} from "./SidebarOption";

const Sidebar = () => {
  return (
    <div className={"sidebar"}>
      <div className="options-cont">
        {options.map(component =>
          <SidebarOption
            component={component}
          />)}
      </div>
      {<MiniProfile/>}
    </div>
  );
};

export default Sidebar;