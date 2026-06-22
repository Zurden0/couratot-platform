import "./css/userProfileCard.css";
import {closeEditorMod, openEditorMod, saveInfo} from "./UserProfileData";
import {useEffect, useState} from "react";

export const getUserInfo = async (userid) => {
  let res;

  if (userid) {
    const formData = new FormData();
    formData.append("user_id", userid);

    res = await fetch("/server/api/getUserProfileData.php", {
      method: "POST",
      body: formData,
      credentials: "include"
    });

  } else {

    res = await fetch("/server/api/getMyProfileData.php", {
      method: "GET",
      credentials: "include"
    });

  }

  return await res.json();
};



const UserProfileCard = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserInfo().then(data => {
      setUserData(data);
    });
  }, []);

  return (
    <div className={"user-profile-card"}>
      <div className="user-profile-information">
        <div className="general-information">
          <p className="firstname">{userData.first_name}</p>
          <p className="lastname">{userData.last_name}</p>
          <p className="login">{userData.login}</p>
        </div>
        <a className="edit-information" onClick={openEditorMod}>Редактировать</a>
        <div className="for-save-cont disable">
          <a className="save-information" onClick={saveInfo}>Сохранить</a>
          <a className="undo-information" onClick={closeEditorMod}>Отменить сохранения</a>
        </div>
      </div>
      <div className="avatar-cont">
        <img src="/" onError={(e) => e.target.src = "/storage/avatarImg/default-avatar.webp"} alt={"Аватар"} />
      </div>
    </div>
  );
};

export default UserProfileCard;