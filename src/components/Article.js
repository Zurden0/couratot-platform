import "./css/article.css";
import {useEffect, useState} from "react";


export const getArticlesData = async () => {
  const data = await fetch("/server/api/getAllArticles.php");

  return [
    {
      img: "/storage/articlesImg/salad.jpg",
      title: "Готов ли ты проверить свою силу? Армрестлинг ждёт!",
      text: "Хочешь испытать себя, почувствовать адреналин и доказать, что твоя хватка — железная? Тогда присоединяйся к нашим соревнованиям по армрестлингу!<br>" +
        "Это шанс показать характер, силу и волю к победе. Здесь нет случайных побед — только честная борьба и чистая мощь.<br>" +
        "Не важно, новичок ты или опытный атлет — главное, что ты готов выйти к столу и показать, на что способен.<br>" +
        "📅 Дата: с 1 июня  <br>" +
        "📍 Место: Уточняйте у кураторов  <br>" +
        "⏱ Регистрация: до 24 июля" +
        "Готов стать сильнейшим? Тогда жми на регистрацию и приходи побеждать!",
      creator: "Тучина Нина Васильевна",
      createdAT: "2026-06-01 12:00", // "YYYY-MM-DD HH:MM"
      endAt: "2026-07-24 12:00"
    }
  ]
}


const Article = ({articleData}) => {
    const [deltaText, setDeltaText] = useState("");
    const [deltaBool, setDeltaBool] = useState("");

    const getDeltaTime = (end) => {
      const now = new Date().getTime();
      const endTime = new Date(end).getTime();

      const delta = endTime - now;
      return Math.round(delta / (1000 * 60 * 60 * 24));
    }


    useEffect(() => {
      const days = getDeltaTime(articleData.endAt);

      if (days >= 0) {
        setDeltaText(`Осталось ${days} дней`);
        setDeltaBool("actual");
      } else {
        setDeltaText("Событие закончилось");
        setDeltaBool("not-actual");
      }
    }, [articleData.endAt]);

    return (
      <div className="article-cont">
        <p className="title">{articleData.title}</p>

        <div>
          <p className="creator-and-date">{articleData.creator}, {articleData.createdAT}</p>

          <p className={`end-timer ${deltaBool}`}>
            {deltaText}
          </p>
        </div>

        <div className="img-cont">
          <img draggable={false} src={articleData.img} alt=""/>
        </div>

        <div className="article-information">
          {articleData.text.split("<br>").map((text, index) => (
            <p className={"text"} key={index}>{text}</p>
          ))}
        </div>
      </div>
    );
  }
;

export default Article;