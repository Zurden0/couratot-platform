import "./css/achievement.css";
import {useEffect, useState} from "react";

const getAchievement = async () => {
  const data = await fetch("/server/api/getAchivements.php", {
    credentials: "include"
  });

  return await data.json();
}

const deleteAchivement = async (name) => {
  const formData = new FormData();

  formData.append("name", name);

  const data = await fetch("/server/api/deleteAchivement.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  })

  alert(await data.text());
}

const Achievement = () => {
  const [docxName, setDocxName] = useState("");

  const [achievementList, setAchievementList] = useState([]);

  useEffect(() => {
    getAchievement().then(data => {
      setAchievementList(data);
    })
  }, []);

  return (
    <>
      <div className={"achievement-cont"}>
        <p className="title">Добавить новое достижение</p>
        <div className="input">
          <input type="text" id="title" placeholder="Названия достижения"/>
          <label htmlFor="title">Названия достижения</label>
        </div>
        <div className="input">
          <input type="file" onChange={(e) => {
            setDocxName(e.target.files[0]?.name || "")
          }}/>
          <input type="text" id="docx" value={docxName} placeholder="" disabled={true}/>
          <label htmlFor="docx">Документ подтверждающий прохождение</label>
        </div>
        <div className="button-cont">
          <a
            className="add-new-achieve"
            onClick={async () => {
              const file = document.querySelector('input[type="file"]').files[0];
              const title = document.querySelector("#title").value;

              const formData = new FormData();
              formData.append("file", file);
              formData.append("name", title);

              const res = await fetch("/server/api/addAchivement.php", {
                method: "POST",
                body: formData,
                credentials: "include"
              });

              alert(await res.text());
            }}
          >
            Добавить новое достижение
          </a>
        </div>
      </div>
      <div className="achievement-cont">
        <p className="title">Список достижений</p>
        <div className="table">
          <div className="first-row option">
            <p className="order">#</p>
            <p className="name">Название</p>
          </div>
          {
            achievementList.map((achievement, index) => (
              <div className="option" key={index + 1}>
                <p className="order">{index + 1}</p>
                <p className="name">{achievement.name}</p>
                <a href={achievement.storage_place} download>скачать</a>
                <a className="delete" onClick={() => {deleteAchivement(achievement.name)}}>удалить</a>
              </div>
            ))
          }
        </div>
      </div>
    </>

  );
};

export default Achievement;