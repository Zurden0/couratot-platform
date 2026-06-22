import "./css/profileRelatives.css";
import {useEffect, useState} from "react";

let currentRelativeID;
let relative;

export const getRelativesData = async () => {
  const data = await fetch("/server/api/getMyRelatives.php", {
    credentials: "include"
  });

  return await data.json();
}

const saveRelativeData = async () => {
  const formData = new FormData();

  Object.keys(relative).forEach(key => {
    formData.append(key, relative[key]);
  });

  const res = await fetch("/server/api/saveRelative.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  const result = await res.text();
  alert(result);
}


const deleteRelative = async () => {
  const formData = new FormData();

  formData.append("relative_id", currentRelativeID);

  const res = await fetch("/server/api/deleteRelative.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  const result = await res.text();
  alert(result);

}

const resetForm = () => {
  document.querySelectorAll(".relative-data-cont input").forEach(input => {
    input.value = "";
  });
}

const ProfileRelatives = () => {
  const [relativeData, setRelativeData] = useState({
    "first_name": "",
    "last_name": "",
    "other_name": "",
    "phone": "",
    "type": "",
    "workplace": "",
    "residence": "",
    "education": "",
    "citizenship": "",
    "birth_date": ""
  });
  const [relativesListData, setRelativesListData] = useState([]);
  const [displayResetButton, setDisplayResetButton] = useState(true);
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);
  const [displaySaveButton, setDisplaySaveButton] = useState(false);
  const [displayAddButton, setDisplayAddButton] = useState(true);
  const [currentRelative, setCurrentRelative] = useState(0);

  currentRelativeID = currentRelative;
  relative = relativeData;

  useEffect(() => {
    getRelativesData().then(data => {
      setRelativesListData(data);
    })
  }, [])

  const addNewRelative = async () => {
    const formData = new FormData();

    Object.keys(relativeData).forEach(key => {
      formData.append(key, relativeData[key]);
    });

    const res = await fetch("/server/api/addRelative.php", {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    const result = await res.text();
    alert(result);
  }

  return (
    <>
      <div className="relatives-cont">
        <p className="title">Список родствеников</p>
        <div className="table">
          <div className="first-option">
            <p className="name cell">ФИО родственика</p>
            <p className="phone cell">Номер телефона</p>
            <p className="type cell">Тип родственика</p>
          </div>
          {relativesListData.map(relative => (
            <div className="option" key={relative.id} onClick={() => {
              setRelativeData(relative);
              setCurrentRelative(relative.id);
              setDisplayResetButton(false);
              setDisplaySaveButton(true);
              setDisplayAddButton(false);
              setDisplayDeleteButton(true);
            }}>
              <div className="name cell">
                {relative.last_name} {relative.first_name}
              </div>
              <div className="phone cell">{relative.phone}</div>
              <div className="type cell">{relative.type}</div>
            </div>
          ))}
        </div>
      </div>
      <p className={"relatives-data-title"}>Информация о родственике</p>
      <div className="relative-data-cont">
        <p className="title">Паспорт</p>

        <div className="input">
          <input
            type="text"
            id="type"
            placeholder="мама, папа, брат..."
            value={relativeData.type}
            onChange={e => setRelativeData(prev => ({...prev, type: e.target.value}))}
          />
          <label htmlFor="type">Родственная связь</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="firstname"
            placeholder="Как в паспорте"
            value={relativeData.first_name}
            onChange={e => setRelativeData(prev => ({...prev, first_name: e.target.value}))}
          />
          <label htmlFor="firstname">Имя</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="lastname"
            placeholder="Как в паспорте"
            value={relativeData.last_name}
            onChange={e => setRelativeData(prev => ({...prev, last_name: e.target.value}))}
          />
          <label htmlFor="lastname">Фамилия</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="othername"
            placeholder="Как в паспорте (при наличии)"
            value={relativeData.other_name}
            onChange={e => setRelativeData(prev => ({...prev, other_name: e.target.value}))}
          />
          <label htmlFor="othername">Отчество</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="birthday"
            placeholder="1 Января 2000"
            value={relativeData.birth_date}
            onChange={e => setRelativeData(prev => ({...prev, birth_date: e.target.value}))}
          />
          <label htmlFor="birthday">Дата рождения</label>
        </div>
      </div>

      <div className="relative-data-cont">
        <p className="title">Конфиденциальная информация</p>

        <div className="input">
          <input
            type="tel"
            id="phone"
            placeholder="+7 (900) 123 45-67"
            maxLength={18}
            value={relativeData.phone}
            onChange={e => setRelativeData(prev => ({...prev, phone: e.target.value}))}
          />
          <label htmlFor="phone">Номер телефона</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="lifePlace"
            placeholder="ул Пушкина д 12"
            value={relativeData.residence}
            onChange={e => setRelativeData(prev => ({...prev, residence: e.target.value}))}
          />
          <label htmlFor="lifePlace">Место жительства</label>
        </div>
      </div>

      <div className="relative-data-cont">
        <p className="title">Дополнительная информация</p>

        <div className="input">
          <input
            type="text"
            id="personalStatus"
            placeholder="Пенсионер, инвалид..."
            value={relativeData.status}
            onChange={e => setRelativeData(prev => ({...prev, status: e.target.value}))}
          />
          <label htmlFor="personalStatus">Статус родственника</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="citizenship"
            placeholder="Чей паспорт"
            value={relativeData.citizenship}
            onChange={e => setRelativeData(prev => ({...prev, citizenship: e.target.value}))}
          />
          <label htmlFor="citizenship">Гражданство</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="workplace"
            placeholder="Водитель ООО «НИВА»"
            value={relativeData.workplace}
            onChange={e => setRelativeData(prev => ({...prev, workplace: e.target.value}))}
          />
          <label htmlFor="workplace">Место работы</label>
        </div>

        <div className="input">
          <input
            type="text"
            id="education"
            placeholder="Основное, среднее, СПО, высшее"
            value={relativeData.education}
            onChange={e => setRelativeData(prev => ({...prev, education: e.target.value}))}
          />
          <label htmlFor="education">Образование</label>
        </div>
      </div>

      <div className="relative-data-button-cont">
        {displayResetButton && (<a className={"reset"} onClick={resetForm}>Сбросить форму</a>)}
        {displayDeleteButton && (<a className={"delete"} onClick={deleteRelative}>Удалить родственика</a>)}
        {displaySaveButton && (<a className={"save"} onClick={saveRelativeData}>Сохранить изменения</a>)}
        {displayAddButton && (<a className={"add"} onClick={addNewRelative}>Добавить нового родственика</a>)}
      </div>
    </>
  )
    ;
};

export default ProfileRelatives;