import "./css/article.css";
import {useEffect, useState} from "react";

export const getArticlesData = () => {
  // получение с бд

  return [
    {
      imgLinks: {
        previewImgID: 0, // номер массива
        images: ["/storage/articlesImg/salad.jpg"]
      },
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

    const ImgSlider = ({images}) => {
      const [current, setCurrent] = useState(0);
      const [dragStartX, setDragStartX] = useState(0);
      const [dragOffset, setDragOffset] = useState(0);
      const [isDragging, setIsDragging] = useState(false);

      const handleMouseDown = (e) => {
        if (e.button !== 0) return; // только ЛКМ
        setIsDragging(true);
        setDragStartX(e.clientX);
      };

      const handleMouseMove = (e) => {
        if (!isDragging) return;

        const delta = e.clientX - dragStartX;
        setDragOffset(delta);
      };

      const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 150; // порог перелистывания

        if (dragOffset > threshold && current > 0) {
          // листаем влево
          setCurrent(current - 1);
        } else if (dragOffset < -threshold && current < images.length - 1) {
          // листаем вправо
          setCurrent(current + 1);
        }

        setDragOffset(0); // сброс
      };

      return (
        <div className="img-cont-slider"
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
             onMouseLeave={handleMouseUp}>
          <div style={{
            transform: `translateX(calc(${-current * 100}% + ${dragOffset}px))`,
            transition: isDragging ? "none" : "transform 0.25s ease"
          }}>
            {images.map((url, index) => (
              <img
                draggable={"false"}
                key={index}
                src={url}
                alt=""/>
            ))}
          </div>
        </div>
      );
    };

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
          <ImgSlider images={articleData.imgLinks.images}/>
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