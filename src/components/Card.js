import React from 'react';

const Card = ({ data }) => {
  console.log(data);

  return (
    <div className='cardcontainer'>
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) {
          return null;
        }

        return (
          <div key={index} className='card'>
            <img src={curItem.urlToImage} alt="news thumbnail" />
            <div className='cardcontent'>
              {/* Make the title clickable and open the link in a new tab */}
              <a href={curItem.url} target="_blank" rel="noopener noreferrer">
                {curItem.title}
              </a>
              <p>{curItem.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
