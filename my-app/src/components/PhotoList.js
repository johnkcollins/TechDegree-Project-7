import React from 'react';
import Photo from './Photo';
import { Redirect }from 'react-router-dom';

//Generates the list of photos received as an array
const PhotoList = props => {
  let results = props.data.activeSearch;
  let photos;

  //Retrieves the url data within props
  function getUrl(data) {
    return (data.url_l
        ? data.url_l
        : data.url_sq);
  }
  if((!props.data.loading) && (props.data.query) && (props.data.activeSearch !== null)){
    photos = results.map(photo => <Photo url={getUrl(photo)} key={photo.id}/>);
  } else if (props.data.activeSearch === null){
    return <Redirect to="/no-search-results"/>;
  } else if ((!props.data.loading) && (props.activeSearch >= 0)) {
    let value = props.activeSearch;
    results = props.data.loadedSearch[value][0];
    photos = results.map(photo => <Photo url={getUrl(photo)} key={photo.id}/>);
  }

  return (
      <ul>
        {photos}
      </ul>
  )
};

export default PhotoList
