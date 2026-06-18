import "./css/userProfileData.css";
import {useState} from "react";

let  setEditModeFunc;
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

export const saveInfo = () => {
  setEditModeFunc(false);
  document.querySelector(".for-save-cont").classList.toggle("disable");
  document.querySelector(".edit-information").classList.toggle("disable");
}

const UserProfileData = () => {
  let [editMode, setEditMode] = useState(false);

  setEditModeFunc = setEditMode;
  getEditMode = editMode;

  const handlePhoneInput = (e) => {
    let input = e.target.value;
    let digits = input.replace(/\D/g, "");

    if (digits.startsWith("8")) {
      digits = "7" + digits.slice(1);
    }

    if (!digits.startsWith("7")) {
      digits = "7" + digits;
    }

    digits = digits.slice(0, 11);

    let result = "+7";

    let a = digits.slice(1, 4);
    let b = digits.slice(4, 7);
    let c = digits.slice(7, 9);
    let d = digits.slice(9, 11);

    if (digits.length > 4) a += `) `;
    if (digits.length === 1) result = "";

    if (a.length) result += ` (${a}`;
    if (b.length) result += `${b}`;
    if (c.length) result += ` ${c}`;
    if (d.length) result += `-${d}`;

    e.target.value = result;
  };

  return (
    <>
      <div className="user-data-cont">
        <p className="title">Паспорт</p>
        <div className="input">
          <input type="text" id="firstname" placeholder="Как в паспорте" disabled={!editMode}/>
          <label htmlFor="firstname">Имя</label>
        </div>
        <div className="input">
          <input type="text" id="lastname" placeholder="Как в паспорте" disabled={!editMode}/>
          <label htmlFor="lastname">Фамилия</label>
        </div>
        <div className="input">
          <input type="text" id="othername" placeholder="Как в паспорте (при наличии)" disabled={!editMode}/>
          <label htmlFor="othername">Отчество</label>
        </div>
        <div className="input">
          <input type="text" id="birthday" placeholder="1 Января 2000" disabled={!editMode}/>
          <label htmlFor="birthday">Дата рождения</label>
        </div>
      </div>
      <div className="user-data-cont">
        <p className="title">Конфиденциальная информация</p>
        <div className="input">
          <input type="tel" id="phone" onInput={handlePhoneInput} placeholder="+7 (900) 123 45-67" maxLength={18} disabled={!editMode}/>
          <label htmlFor="phone">Номер телефона</label>
        </div>
        <div className="input">
          <input type="text" id="mail" placeholder="Example@mail.ru" disabled={!editMode}/>
          <label htmlFor="mail">Адрес электронной почты</label>
        </div>
        <div className="input">
          <input type="text" id="lifePlace" placeholder="ул Пушкина д 12" disabled={!editMode}/>
          <label htmlFor="lifePlace">Место жительства</label>
        </div>
      </div>
      <div className="user-data-cont">
        <p className="title">Дополнительная информация</p>
        <div className="input">
          <input type="text" id="personalStatus" placeholder="Сирота, мать одиночка..." disabled={!editMode}/>
          <label htmlFor="personalStatus">Статус студента</label>
        </div>
        <div className="input">
          <input type="text" id="famalyStatus" placeholder="Многодетная, малообеспеченая..." disabled={!editMode}/>
          <label htmlFor="famalyStatus">Статус семьи</label>
        </div>
        <div className="input">
          <input type="text" id="citizenship" placeholder="Чей паспорт" disabled={!editMode}/>
          <label htmlFor="citizenship">Гражданство</label>
        </div>
        <div className="input">
          <input type="text" id="workplace" placeholder='Водитель ООО «НИВА»' disabled={!editMode}/>
          <label htmlFor="workplace">Место работы</label>
        </div>
        <div className="input">
          <input type="text" id="education" placeholder="Основное, Среднее" disabled={!editMode}/>
          <label htmlFor="education">Образование</label>
        </div>
      </div>
    </>
  );
};

export default UserProfileData;
