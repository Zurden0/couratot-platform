import "./css/generaluserInfo.css"

const GeneralUserInfo = ({full_name, login, bio_content}) => {
  return (
    <div className={"general-user-info-content"}>
      <div className="full-name-and-login-cont">
        <p className="full-name">{full_name}</p>
        <p className="login">{login}</p>
      </div>
      <div className="bio">
        <p className="title">О себе</p>
        <p className="content-value">{bio_content}</p>
      </div>
    </div>
  )
}

export default GeneralUserInfo;