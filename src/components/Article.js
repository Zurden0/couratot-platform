import "./css/article.css";
import {useState} from "react";

export const getArticlesData = () => {
  // получение с бд

  return [
    {
      imgLinks: {
        previewImgID: 0, // номер массива
        images: ["/storage/articlesImg/salad.jpg"]
      },
      title: "Тестовая c очень длинным названием но не более 100 символов",
      text: "Contrary to popular belief, <br>Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n",
      createdAT: "2026-12-06, 12:45",
      creator: "Тучина Нина Васильевна"
    },
    {
      imgLinks: {
        previewImgID: 0, // номер массива
        images: ["/storage/articlesImg/salad.jpg", "/storage/articlesImg/salad.jpg", "/storage/articlesImg/salad.jpg"]
      },
      title: "Тестовая c очень длинным названием но не более 100 символов",
      text: "Contrary to popular belief, <br>Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n",
      createdAT: "2026-10-06, 11:11"
    }
  ]
}


const Article = ({articleData}) => {
  const Text = ({value}) => {
    return (
      <p className="text">{value}</p>
    )
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
              key={index}
              src={url}
              alt=""/>
          ))}
        </div>
      </div>
    );
  };


  return (
    <div className={"article-cont"}>
      <p className="title">{articleData.title}</p>
      <div>
        <p className={"creator"}>{articleData.creator}</p>
        <p className="date">{articleData.createdAT}</p>
      </div>

      <div className="img-cont">
        <ImgSlider images={articleData.imgLinks.images}/>
      </div>
      <div className={"article-information"}>
        {
          articleData.text.split("<br>").map((textValue, index) => {
            return (
              <Text
                key={index}
                value={textValue}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default Article;