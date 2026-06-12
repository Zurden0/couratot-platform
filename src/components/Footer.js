import "./css/footer.css"

const Footer = () => {
  return (
    <div className={"footer"}>
      <div className={"content"}>
        <div className={"first-row row"}>
          <a href="">Контакты</a>
          <a href="">О нас</a>
          <a href="">Обратная связь</a>
        </div>
        <div className={"last-row row"}>
          <p>© 2026 Все права защищены организацией КГБПОУ «Алтайский промышленно-экономический колледж»</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;