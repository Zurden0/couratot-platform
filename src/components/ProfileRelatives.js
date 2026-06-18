import "./css/profileRelatives.css";
import RelativeProfileData, {parsePhone} from "./RelativeProfileData";
import {useState} from "react";

export const getRelativesData = () => {
  return [
    {
      id: 1,
      firstname: "Ирина",
      lastname: "Есмагамбетова",
      phone: "+79237801680",
      type: "мама"
    },
    {

      id: 2,
      firstname: "Диана",
      lastname: "Белоглазкина",
      phone: "+82291671497",
      type: "сестра"
    },
    {
      id: 3,
      firstname: "Егор",
      lastname: "Есмагамбетов",
      phone: "",
      type: "брат"
    },
  ]
}

const ProfileRelatives = () => {
  const [relativeData, setRelativeData] = useState({});
  const [relativesListData, setRelativesListData] = useState(getRelativesData);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <>
      <div className={"relatives-cont"}>
        <div className="table">
          <div className="first-option">
            <p className="name cell">Имя родственика</p>
            <p className="phone cell">Номер телефона</p>
            <p className="type cell">Тип родственика</p>
          </div>
          {relativesListData.map(relative => (
            <div className="option" key={relative.id} onClick={() => {
              setRelativeData(relative);
              setPhoneNumber(parsePhone(relative.phone));
            }}>
              <div className="name cell">
                {relative.lastname} {relative.firstname}
              </div>
              <div className="phone cell">{relative.phone}</div>
              <div className="type cell">{relative.type}</div>
            </div>
            ))}
        </div>
      </div>
      <p className={"relatives-data-title"}>Информация о родственике</p>
      <RelativeProfileData
        relativeData={relativeData}
        setRelativeData={setRelativeData}
        phoneNumber = {phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
    </>
  )
    ;
};

export default ProfileRelatives;