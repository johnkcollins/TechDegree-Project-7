import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoList = props => {
  const results = props.data;
  let photos;
  function getUrl (data) { return (data.url_l
        ? data.url_l
        : data.url_sq);
  }
  if (results.length > 0) {
    photos = results.map(photo => <Photo url={getUrl(photo)} key={photo.id}/> );
  } else {
   photos = <NotFound/>;
  }

  return (
      <ul>
        {photos}
      </ul>
  )
};

export default PhotoList
