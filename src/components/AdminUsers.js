import "./css/adminUsers.css";
import {useEffect, useState} from "react";
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

const translit = (str) => {
  return str.split('').map(ch => map[ch] ?? ch).join('');
}

const createNewStudent = async (value) => {
  const formData = new FormData();

  const parts = value.trim().split(/\s+/);
  const lastname = parts[0] ?? "";
  const firstname = parts[1] ?? "";
  const othername = parts[2] ?? "";

  formData.append("login", translit(firstname[0] + "." + lastname));


  const data = await fetch("/server/api/addStudent.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  alert(await data.text())
}

const getUsers = async () => {
  const data = await fetch("/server/api/getAllUsers.php", {
    credentials: "include"
  });

  return await data.json()
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

const saveRole = async (id, role) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("role", role);

  const data = await fetch("/server/api/setRole.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  alert(await data.text());
}

const AdminUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    getUsers().then(data => {
      const prepared = data.map(u => ({...u, originalRole: u.role}));
      setUsersData(prepared);
      console.log(prepared);
    });
  }, []);

  return (
    <div className="admin-cont">
      <p className="title">Список пользователей</p>
      <div className="input-cont">
        <input
          onChange={(e) => {
            setNewUserName(e.target.value)
          }}
          type="text"
          placeholder="Регистрация пользователя (ФИО)"
        />

        <a
          onClick={(e) => {
            createNewStudent(newUserName).then(() => {
            });
          }}
        >
          Добавить
        </a>
      </div>

      <div className="table">
        <div className="first-row option">
          <p className="order">#</p>
          <p className="username">Логин</p>
          <p className="role">Роль</p>
          <p className="action">Действия</p>
        </div>
        {
          usersData.map((data, index) => (
            <div className="option" key={data.id}>
              <p className="order">{index + 1}</p>
              <p className="username" onClick={() => {
                goToProfile(data.id).then(r => {
                })
              }}>{data.login}</p>

              <input
                type="text"
                value={data.role}
                onChange={(e) => {
                  const newRole = e.target.value;

                  setUsersData(prev =>
                    prev.map((u, i) =>
                      i === index ? {...u, role: newRole} : u
                    )
                  );
                }}
              />

              {data.role !== data.originalRole ? (
                <a onClick={() => saveRole(data.id, data.role)}>
                  Сохранить
                </a>
              ) : (<a/>)}
            </div>)
          )}
      </div>
    </div>
  );
};

export default AdminUsers;