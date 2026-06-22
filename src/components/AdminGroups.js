import {useEffect, useState} from "react";
import "./css/adminGroups.css";
import {navigate} from "../router";

const map = {
  'а': 'a', 'А': 'A',
  'б': 'b', 'Б': 'B',
  'в': 'v', 'В': 'V',
  'г': 'g', 'Г': 'G',
  'д': 'd', 'Д': 'D',
  'е': 'e', 'Е': 'E',
  'ё': 'e', 'Ё': 'E',
  'ж': 'zh', 'Ж': 'Zh',
  'з': 'z', 'З': 'Z',
  'и': 'i', 'И': 'I',
  'й': 'y', 'Й': 'Y',
  'к': 'k', 'К': 'K',
  'л': 'l', 'Л': 'L',
  'м': 'm', 'М': 'M',
  'н': 'n', 'Н': 'N',
  'о': 'o', 'О': 'O',
  'п': 'p', 'П': 'P',
  'р': 'r', 'Р': 'R',
  'с': 's', 'С': 'S',
  'т': 't', 'Т': 'T',
  'у': 'u', 'У': 'U',
  'ф': 'f', 'Ф': 'F',
  'х': 'h', 'Х': 'H',
  'ц': 'c', 'Ц': 'C',
  'ч': 'ch', 'Ч': 'Ch',
  'ш': 'sh', 'Ш': 'Sh',
  'щ': 'sch', 'Щ': 'Sch',
  'ъ': '', 'Ъ': '',
  'ы': 'y', 'Ы': 'Y',
  'ь': '', 'Ь': '',
  'э': 'e', 'Э': 'E',
  'ю': 'yu', 'Ю': 'Yu',
  'я': 'ya', 'Я': 'Ya'
};

const getRole = async () => {
  const data = await fetch("/server/validators/getUserRole.php", {
    credentials: "include"
  });
  return await data.text();
}

const translit = (str) => {
  return str.split('').map(ch => map[ch] ?? ch).join('');
}
const getAllGroups = async (userRole) => {
  let url;

  if (userRole === "admin") {
    url = "/server/api/getAllGroups.php";
  } else {
    url = "/server/api/getMyGroupsInfo.php";
  }

  const data = await fetch(url, {
    credentials: "include"
  });
  return await data.json();
}

const createNewStudent = async (group_id, value) => {
  const formData = new FormData();

  const parts = value.trim().split(/\s+/);
  const lastname = parts[0] ?? "";
  const firstname = parts[1] ?? "";
  const othername = parts[2] ?? "";

  formData.append("group_id", group_id);
  formData.append("login", translit(firstname[0] + "." + lastname));
  formData.append("first_name", firstname);
  formData.append("last_name", lastname);
  formData.append("other_name", othername);


  const data = await fetch("/server/api/addStudent.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  });
}

const goToProfile = async (id) => {
  const formData = new FormData();

  formData.append("id", id);

  const data = await fetch("/server/api/setStudent.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  if (await data.text() === "ok") {
    navigate("/profile");
  } else {
    alert("Ошибка перехода");
  }
}

const updateCurator = async (group_id, value) => {
  const formData = new FormData();

  formData.append("login", value);
  formData.append("id", group_id);

  const data = await fetch("/server/api/setCurator.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  alert(await data.text());

}

const createNewGroup = async (name) => {
  const formData = new FormData();

  formData.append("name", name);

  const data = await fetch("/server/api/addGroup.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  alert(await data.text());
}


const AdminGroups = () => {
  const [groups, setGroupsData] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    getRole()
      .then(role => {
        setUserRole(role);
        return getAllGroups(role);
      })
      .then(groups => {
        // добавляем оригинальное значение
        const prepared = groups.map(g => ({
          ...g,
          curator_name_original: g.curator_name
        }));

        setGroupsData(prepared);
      });
  }, []);


  return (
    <div className="admin-group-cont">
      <p className="title">Список групп</p>
      <div className={
        "add-group-input-cont " +
        (userRole === "admin" ? "" : "hidden")
      }>
        <input
          type="text"
          placeholder="Добавить группу"
          className="add-group"
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <a onClick={() => {createNewGroup(newGroupName).then(r => {})}}>
          Добавить
        </a>
      </div>
      <div className="table">
        <div className="first-row group-option">
          <p className="name">Название группы</p>
          <p className="curator">Куратор группы</p>
          <p className="counter">Колличество участников</p>
          <p className="action">Действия</p>
        </div>
        {groups.map((group, index) => (
          <div className="group-option" key={group.groups_id}>
            <div className="metadata">
              <p className="name">{group.groups_name}</p>
              <input
                className="curator"
                value={group.curator_name}
                onChange={(e) => {
                  const newValue = e.target.value;

                  setGroupsData(prev =>
                    prev.map(g =>
                      g.groups_id === group.groups_id
                        ? { ...g, curator_name: newValue }
                        : g
                    )
                  );
                }}
              />

              <a
                onClick={() => updateCurator(group.groups_id, group.curator_name)}
                className={
                  "update-curator " +
                  (group.curator_name === group.curator_name_original ? "hidden" : "")
                }
              >
                обновить куратора
              </a>


              <p className="counter">{group.students.length}</p>
              <a className="action" onClick={(e) => {
                const parent = e.target.closest(".group-option");
                const content = parent.querySelector(".group-content-cont");

                content.classList.toggle("hidden");

                if (content.classList.contains("hidden")) {
                  e.target.innerHTML = "развернуть";
                } else {
                  e.target.innerHTML = "свернуть";
                }
              }}
              >
                развернуть
              </a>
            </div>

            <div className="group-content-cont hidden">
              <div className="input-cont">
                <input
                  type="text"
                  placeholder="Регистрация студента (ФИО)"
                  className="add-studdent"
                />
                <a
                  onClick={(e) => {
                    const parent = e.target.closest(".group-content-cont");
                    const input = parent.querySelector(".add-studdent");

                    createNewStudent(group.groups_id, input.value)
                      .then(() => alert("Успешно"));
                  }}
                >
                  Добавить
                </a>
              </div>

              {group.students.map((student, i) => (
                <div className="row" key={student.id}>
                  <p>{String(i + 1).padStart(2, "0")}</p>
                  <p className="student-option">
                    {student.last_name} {student.first_name}
                  </p>
                  <a onClick={() => {
                    goToProfile(student.id)
                  }} className="go-to-profile">перейти в профиль</a>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AdminGroups;