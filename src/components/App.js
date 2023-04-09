import React, { useState, useEffect } from 'react'
import '../styles/App.css';

  const posts= (category)=>{
  const API_KEY="a1741280db6dbc554c889a31544851b7"
  let url=`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&max=10&lang=en`;
  return fetch(url)
}
  
const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState();
  

  useEffect(()=>{
    setLoading(true)
    posts(category)
    .then((res)=>res.json())
    .then((data)=>{
      setNewsData(data.articles)
    })
    .then(()=>{
      setLoading(false)
    })
    console.log(newsData)
  },[category])

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading && <p className='loader'>Loading...</p>}
      {!loading &&
      <ol>
        {newsData.map((item,index)=>{
          return(
        <li key={index}>
          <img className='news-img' src={item.image} alt="randomimg"/>
          <section className='new-title-content-author'>
            <h3 className='news-title'>{item.title}</h3>
            <section className='new-content-author'>
              <p className='news-description'>{item.description}</p>
              <p className='news-source'><strong>Source:</strong>{item.source.name}</p>
            </section>
          </section>
        </li>)
        })}
      </ol>}
    </div>
  )
}


export default App;
