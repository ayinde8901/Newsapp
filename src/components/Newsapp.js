import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
  const API_KEY = "a872d876340d41179a024351c038502b";
  const [search, setSearch] = useState('usa');
  const [newsData, setNewsData] = useState([]);

  // Function to fetch data
  const getData = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
      const data = await response.json();
      setNewsData(data.articles || []); // Default to an empty array if no articles
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  useEffect(() => {
    getData();
  },);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  // Functions for each category
  const fetchSportsNews = () => setSearch('sports');
  const fetchPoliticsNews = () => setSearch('politics');
  const fetchEntertainmentNews = () => setSearch('entertainment');
  const fetchHealthNews = () => setSearch('health');
  const fetchFitnessNews = () => setSearch('fitness');

  return (
    <div>
      <nav>
        <div>
          <h1>Trending News</h1>
        </div>
        <ul>
          <button>All news</button>
          <button>Trending news</button>
        </ul>
        <div className='search-bar'>
          <input type='text' placeholder='Search news' onChange={handleInput} />
          <button className='opay' onClick={getData}>Search</button>
        </div>
      </nav>
      <div>
        <p className='head'>Stay updated with trending news</p>
      </div>
      <div className='category'>
        <button onClick={fetchSportsNews}>Sport</button>
        <button onClick={fetchPoliticsNews}>Politics</button>
        <button onClick={fetchEntertainmentNews}>Entertainment</button>
        <button onClick={fetchHealthNews}>Health</button>
        <button onClick={fetchFitnessNews}>Fitness</button>
      </div>
      <div>
        {newsData.length > 0 ? <Card data={newsData} /> : <p>No news articles available.</p>}
      </div>
    </div>
  );
};

export default Newsapp;
