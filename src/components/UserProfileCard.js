import "./css/userProfileCard.css";
import {closeEditorMod, openEditorMod, saveInfo} from "./UserProfileData";

export const getUserInfo = () => {
  return (
    {
      id: 0,
      firstname: "Герман",
      lastname: "Белоглазкин",
      login: "g.beloglazkin11web241"
    }
  )
}


const UserProfileCard = ({userData}) => {

  return (
    <div className={"user-profile-card"}>
      <div className="user-profile-information">
        <div className="general-information">
          <p className="firstname">{userData.firstname}</p>
          <p className="lastname">{userData.lastname}</p>
          <p className="birthday">{userData.login}</p>
        </div>
        <a className="edit-information" onClick={openEditorMod}>Редактировать</a>
        <div className="for-save-cont disable">
          <a className="save-information" onClick={saveInfo}>Сохранить</a>
          <a className="undo-information" onClick={closeEditorMod}>Отменить сохранения</a>
        </div>
      </div>
      <div className="avatar-cont">
        <img src="/" onError={(e) => e.target.src = "/storage/avatarImg/default-avatar.webp"} alt={"Аватар"}/>
      </div>
    </div>
  );
};

export default UserProfileCard;