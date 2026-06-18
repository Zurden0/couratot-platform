import "./css/relativeProfileData.css";
import {useState} from "react";

export const parsePhone = (value) => {
  let digits = value.slice(0, 11);

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

  return result
}

const RelativeProfileData = ({relativeData, setRelativeData, phoneNumber, setPhoneNumber}) => {
  const [displayResetButton, setDisplayResetButton] = useState(true);
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);
  const [displaySaveButton, setDisplaySaveButton] = useState(false);
  const [displayAddButton, setDisplayAddButton] = useState(true);
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

    setPhoneNumber(result);
  };


  return (
    <>
      <div className="relative-data-cont">
        <p className="title">Паспорт</p>
        <div className="input">
          <input type="text" id="type" placeholder="мама, папа, брат..." value={relativeData.type ?? null}/>
          <label htmlFor="type">Родственая связь</label>
        </div>
        <div className="input">
          <input type="text" id="firstname" placeholder="Как в паспорте" value={relativeData.firstname ?? null}/>
          <label htmlFor="firstname">Имя</label>
        </div>
        <div className="input">
          <input type="text" id="lastname" placeholder="Как в паспорте" value={relativeData.lastname ?? null}/>
          <label htmlFor="lastname">Фамилия</label>
        </div>
        <div className="input">
          <input type="text" id="othername" placeholder="Как в паспорте (при наличии)" value={relativeData.othername ?? null}/>
          <label htmlFor="othername">Отчество</label>
        </div>
        <div className="input">
          <input type="text" id="birthday" placeholder="1 Января 2000" value={relativeData.birthday ?? null}/>
          <label htmlFor="birthday">Дата рождения</label>
        </div>
      </div>
      <div className="relative-data-cont">
        <p className="title">Конфиденциальная информация</p>
        <div className="input">
          <input type="tel" id="phone" onInput={handlePhoneInput} placeholder="+7 (900) 123 45-67" maxLength={18} value={phoneNumber ?? null}/>
          <label htmlFor="phone">Номер телефона</label>
        </div>
        <div className="input">
          <input type="text" id="lifePlace" placeholder="ул Пушкина д 12" value={relativeData.lifePlace ?? null}/>
          <label htmlFor="lifePlace">Место жительства</label>
        </div>
      </div>
      <div className="relative-data-cont">
        <p className="title">Дополнительная информация</p>
        <div className="input">
          <input type="text" id="personalStatus" placeholder="Пенсионер, инвалид..." value={relativeData.status ?? null}/>
          <label htmlFor="personalStatus">Статус подственика</label>
        </div>
        <div className="input">
          <input type="text" id="citizenship" placeholder="Чей паспорт" value={relativeData.citizenship ?? null}/>
          <label htmlFor="citizenship">Гражданство</label>
        </div>
        <div className="input">
          <input type="text" id="workplace" placeholder='Водитель ООО «НИВА»' value={relativeData.work ?? null}/>
          <label htmlFor="workplace">Место работы</label>
        </div>
        <div className="input">
          <input type="text" id="education" placeholder="Основное, среднее, СПО, высшее" value={relativeData.education ?? null}/>
          <label htmlFor="education">Образование</label>
        </div>
      </div>
      <div className="relative-data-button-cont">
        {displayResetButton && (<a className={"reset"}>Сбросить форму</a>)}
        {displayDeleteButton && (<a className={"delete"}>Удалить родственика</a>)}
        {displaySaveButton && (<a className={"save"}>Сохранить изменения</a>)}
        {displayAddButton && (<a className={"add"}>Добавить нового родственика</a>)}
      </div>
    </>
  );
};

export default RelativeProfileData;