import "./css/userProfileData.css";
import {useEffect, useState} from "react";

let setEditModeFunc;
let oldData;
let userData;
export let getEditMode;
export const openEditorMod = () => {
  setEditModeFunc(true);
  document.querySelector(".for-save-cont").classList.toggle("disable");
  document.querySelector(".edit-information").classList.toggle("disable");
}

export const closeEditorMod = () => {
  setEditModeFunc(false);
  document.querySelector(".for-save-cont").classList.toggle("disable");
  document.querySelector(".edit-information").classList.toggle("disable");
}

export const saveInfo = async () => {
  document.querySelector(".for-save-cont").classList.toggle("disable");
  document.querySelector(".edit-information").classList.toggle("disable");
  setEditModeFunc(false);

  const formData = new FormData();

  Object.keys(userData).forEach(key => {
    formData.append(key, userData[key]);
  });

  const res = await fetch("/server/api/saveMyProfileData.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  const result = await res.text();
  alert(result);
};

const getUserData = async () => {
  const data = await fetch("/server/api/getMyProfileData.php");

  return await data.json();
}

const UserProfileData = () => {
  let [editMode, setEditMode] = useState(false);
  let [myData, setUserData] = useState({});

  useEffect(() => {
    getUserData().then(data => {
      setUserData(data);
      oldData = data;
    });
  }, []);

  setEditModeFunc = setEditMode;
  getEditMode = editMode;
  userData = myData;

  const updateField = (field, value) => {
    setUserData(prev => ({...prev, [field]: value}));
  };

  return (
    <>
      <div className="user-data-cont">
        <p className="title">Паспорт</p>

        <div className="input">
          <input
            type="text"
            id="firstname"
            placeholder="Как в паспорте"
            value={userData.first_name ?? ""}
            disabled={!editMode}
            onChange={e => updateField("first_name", e.target.value)}
          />
          <label htmlFor="firstname">Имя</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="lastname"
            placeholder="Как в паспорте"
            value={userData.last_name ?? ""}
            disabled={!editMode}
            onChange={e => updateField("last_name", e.target.value)}
          />
          <label htmlFor="lastname">Фамилия</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="othername"
            placeholder="Как в паспорте (при наличии)"
            value={userData.other_name ?? ""}
            disabled={!editMode}
            onChange={e => updateField("other_name", e.target.value)}
          />
          <label htmlFor="othername">Отчество</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="birthday"
            placeholder="Дата рождения"
            value={userData.birth_date ?? ""}
            disabled={!editMode}
            onChange={e => updateField("birth_date", e.target.value)}
          />
          <label htmlFor="birthday">Дата рождения</label>
        </div>
      </div>

      <div className="user-data-cont">
        <p className="title">Конфиденциальная информация</p>

        <div className="input">
          <input
            type="text"
            id="phone"
            placeholder="+7 900 123 45 67"
            value={userData.phone ?? ""}
            maxLength={18}
            disabled={!editMode}
            onChange={e => updateField("phone", e.target.value)}
          />
          <label htmlFor="phone">Номер телефона</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="mail"
            placeholder="Example@mail.ru"
            value={userData.mail ?? ""}
            disabled={!editMode}
            onChange={e => updateField("mail", e.target.value)}
          />
          <label htmlFor="mail">Адрес электронной почты</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="lifePlace"
            placeholder="ул Пушкина д 12"
            value={userData.address ?? ""}
            disabled={!editMode}
            onChange={e => updateField("address", e.target.value)}
          />
          <label htmlFor="lifePlace">Место жительства</label>
        </div>
      </div>

      <div className="user-data-cont">
        <p className="title">Дополнительная информация</p>

        <div className="input">
          <input
            type="text"
            id="personalStatus"
            placeholder="Сирота, мать одиночка..."
            value={userData.personal_status ?? ""}
            disabled={!editMode}
            onChange={e => updateField("personal_status", e.target.value)}
          />
          <label htmlFor="personalStatus">Статус студента</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="famalyStatus"
            placeholder="Многодетная, малообеспеченая..."
            value={userData.family_status ?? ""}
            disabled={!editMode}
            onChange={e => updateField("family_status", e.target.value)}
          />
          <label htmlFor="famalyStatus">Статус семьи</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="citizenship"
            placeholder="Чей паспорт"
            value={userData.citizenship ?? ""}
            disabled={!editMode}
            onChange={e => updateField("citizenship", e.target.value)}
          />
          <label htmlFor="citizenship">Гражданство</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="workplace"
            placeholder="Водитель ООО «НИВА»"
            value={userData.workplace ?? ""}
            disabled={!editMode}
            onChange={e => updateField("workplace", e.target.value)}
          />
          <label htmlFor="workplace">Место работы</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="education"
            placeholder="Основное, Среднее"
            value={userData.education ?? ""}
            disabled={!editMode}
            onChange={e => updateField("education", e.target.value)}
          />
          <label htmlFor="education">Образование</label>
        </div>
      </div>
    </>
  );
};


export default UserProfileData;
