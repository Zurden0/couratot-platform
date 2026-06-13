import "./css/articleFilters.css";


const ArticleFilters = ({articlesData, filterArticleData}) => {
  const filterData = (data) => {
    return data.filter(article => {
      if (window.category === "actual") {
        const days = Math.round((new Date(article.endAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

        return days >= 0;
      }
      return true;
    }).sort((a, b) => {
      if (window.sortBy === "new") {
        return new Date(b.createdAT) - new Date(a.createdAT);
      }
      if (window.sortBy === "ending") {
        return new Date(a.endAt) - new Date(b.endAt);
      }
      return 0;
    });
  }

  const applyFilters = () => {
    const filtered = filterData(articlesData);
    filterArticleData(filtered);
  };

  const showAll = (element) => {
    window.category = "all";
    document.querySelector(".category .selected").classList.remove("selected");
    element.classList.add("selected");

    window.sortBy = "new";
    document.querySelector(".sort-by .selected").classList.remove("selected");
    document.querySelector(".sort-by .new").classList.add("selected");

    applyFilters();
  }

  const showActual = (element) => {
    window.category = "actual";
    document.querySelector(".category .selected").classList.remove("selected");
    element.classList.add("selected");
    applyFilters();
  }

  const sortByNew = (element) => {
    window.sortBy = "new";
    document.querySelector(".sort-by .selected").classList.remove("selected");
    element.classList.add("selected");
    applyFilters();
  }

  const sortByEnding = (element) => {
    window.sortBy = "ending";
    document.querySelector(".sort-by .selected").classList.remove("selected");
    element.classList.add("selected");

    window.category = "actual";
    document.querySelector(".category .selected").classList.remove("selected");
    document.querySelector(".category .actual").classList.add("selected");
    element.classList.add("selected");

    applyFilters();
  }


  return (
    <div className={"article-filters"}>
      <div className="name">
        <p>Категории</p>
        <p>Сортировать по</p>
      </div>
      <div className="options">
        <div className="category">
          <a onClick={(e) => showAll(e.target)} className={"selected all"}>все</a>
          <a onClick={(e) => showActual(e.target)} className={"actual"}>актуальные</a>
        </div>
        <div className="sort-by">
          <a onClick={(e) => sortByNew(e.target)} className={"selected new"}>сначало новые</a>
          <a onClick={(e) => sortByEnding(e.target)} className={"ending"}>скоро закончатся</a>
        </div>
      </div>
    </div>
  );
};

export default ArticleFilters;
