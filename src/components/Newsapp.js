import React, { useEffect, useState, useCallback } from 'react';
import Card from './Card';

const Newsapp = () => {
  const API_KEY = "a872d876340d41179a024351c038502b";
  const [search, setSearch] = useState('');
  const [newsData, setNewsData] = useState([]);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const getData = useCallback(async (query) => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
      const data = await response.json();
      setNewsData(data.articles || []); // Default to an empty array if no articles
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  },);

  // Debounced version of the getData function
  const debouncedGetData = useCallback(debounce(getData, 500), [getData]);

  const handleInput = (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query.trim() !== '') {
      debouncedGetData(query);
    }
  };

  useEffect(() => {
    getData('usa'); // Fetch default news
  }, [getData]);

  const fetchSportsNews = () => setSearch('sports') || getData('sports');
  const fetchPoliticsNews = () => setSearch('politics') || getData('politics');
  const fetchEntertainmentNews = () => setSearch('entertainment') || getData('entertainment');
  const fetchHealthNews = () => setSearch('health') || getData('health');
  const fetchFitnessNews = () => setSearch('fitness') || getData('fitness');

  return (
    <div>
      <nav>
        <div>
          <h1>Trending News</h1>
        </div>
        <ul>
          <button onClick={() => getData('all')}>All News</button>
          <button onClick={() => getData('trending')}>Trending News</button>
        </ul>
        <div className='search-bar'>
          <input type='text' placeholder='Search news' value={search} onChange={handleInput} />
          <button className='opay' onClick={() => getData(search)}>Search</button>
        </div>
      </nav>
      <div>
        <p className='head'>Stay updated with trending news</p>
      </div>
      <div className='category'>
        <button onClick={fetchSportsNews}>Sports</button>
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
