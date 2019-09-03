import React from 'react';
import Photo from './Photo';

//Generates the list of photos received as an array
const PhotoList = props => {
  let results = props.data;
  let photos;
  function getUrl(data) {
    return (data.url_l
     ? data.url_l
     : data.url_sq);
  }
    if (results.length > 3) {
      console.log(results);
      photos = results.map(photo => <Photo url={getUrl(photo)} key={photo.id}/>);
    } else if ((!props.data.loading) && (props.search >= 0)) {
      let value = props.search;
      props.upDateState('query', props.data.query);
      results = props.data.searches[value][0];
      photos = results.map(photo => <Photo url={getUrl(photo)} key={photo.id}/>);
    }

  return (
      <ul>
        {photos}
      </ul>
  )
};

export default PhotoList
