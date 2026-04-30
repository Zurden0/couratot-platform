const Button = ({icon, text, func}) => {
  const Icon = icon;
  return (
    <div onClick={func} className={"button"}>
      {<Icon />}
      {text}
    </div>
  )
}

export default Button;