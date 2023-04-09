import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateNews = (type) => {
    setLoading(true);
    fetch(`https://gnews.io/api/v4/top-headlines?category=${type}&apikey=aa9c04bf0f87a6cb98e5baa034ac6998&max=10&lang=en`)
      .then((response) => { return response.json() })
      .then((data) => {
        // console.log(data.articles);
        setNewsData(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  useEffect(() => {
    generateNews('general');
  }, [])

  const optionHandler = (e) => {
    const value = e.target.value;
    setCategory(value);
    generateNews(value);
  }

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select onChange={optionHandler} value={category}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading && <p className='loader'>Loading...</p>}
      {!loading && <ol>
        {
          newsData.map((eachNews, index) => {
            return (
              <li key={index}>
                <img className='news-img' src={eachNews.image} alt="" />
                <section className='new-title-content-author'>
                  <h3 className='news-title'>{eachNews.title}</h3>
                  <section className='new-content-author'>
                    <p className='news-description'>{eachNews.description}</p>
                    <p className='news-source'><strong>Source:</strong> {eachNews.source.name}</p>
                  </section>
                </section>
              </li>
            )
          })
        }
      </ol>}
    </div>
  )
}


export default App;
