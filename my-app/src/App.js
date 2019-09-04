import React, { PureComponent } from 'react';
import axios from 'axios';
import apiKey from './config';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

//App components
import Search from './components/Search';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';
import NotFound from './components/NotFound';

export default class App extends PureComponent {

  constructor() {
    super();
          this.state = {
            loading: true,
            loadedSearch: ['dry tortugas', 'sea turtles', 'sand crabs'],
            query: ' ',
            redirect: false,
            activeSearch: [],
            h2: ''
          }
  }

  //When the page loads the initial activeSearch queries are called from the API
  //The first is displayed on the page, and the 2nd is saved for later use
  componentDidMount() {
    this.buildPhotoStates();
    this.performSearch('solar flare');
  }

  //This downloads the button items as "loadedSearch" in state for later retrieval
  buildPhotoStates (){
    let searches = this.state.loadedSearch;
    for(let i = 0; i < searches.length; i++){
      let query = searches[i];
      searches[i] = [];
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&safe_search=1&content_type=photo&extras=url_l,url_sq&per_page=24&page=1&format=json&nojsoncallback=1`)
          .then(response => {
            searches[i].push(response.data.photos.photo);
          })
          .catch(error => {
            console.log('Error fetching and parsing data', error);
          });
    }
  }

  //Handles the activeSearch input upon change
  onSearchChange = (e) => {
    this.setState({
      query: e.target.value,
      redirect: true
    });
  };

  //Handles the activeSearch input upon submit
  handleSubmit = (e) => {
    e.preventDefault();
    this.performSearch(this.state.query);
    this.setState({
      redirect: true
    });
    e.currentTarget.reset();
  };

  //Takes input and returns photos from the Flickr API
  //API key is saved in ./config.js
  performSearch = (query) => {
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&safe_search=1&content_type=photo&extras=url_l,url_sq&per_page=24&page=1&format=json&nojsoncallback=1`)
          //Response is returned in JSON as requested from the API
          .then(response => {

            //Checks to see if the search returned any results
            (response.data.photos.photo.length > 0)
                ?
                  this.setState({
                    activeSearch: response.data.photos.photo,
                    loading: false,
                    h2: query,
                    query
                  })
                : this.searchPath('no results');
          })
          .catch(error => {
            console.log('Error fetching and parsing data', error);
          });
  };

  //Changes the status of redirect to false when the Nav links are clicked
  resetRedirect(){
    if(this.state.activeSearch) {
      this.setState({
        redirect: false,
      });
      this.searchPath();
    }
  }

  //Changes the path for search results
  searchPath(string){
    console.log(this.state.activeSearch.length + " " + this.state.loading);
    if(string === 'no results'){
      this.setState({
        h2: 'Sorry',
        activeSearch: [],
        redirect: true
      });
      return <Route path="/no-results" component={NotFound}/>
    } else if ((this.state.activeSearch) && (!string === 'no results')){
      if(this.state.activeSearch.length > 0) {
        return <Redirect to="/search"/>
      }
    }
  }

  //Renders the page
  render () {
  return (
    <BrowserRouter>
      <div className="container">
        <Route path="/" render={()=><Search onSearchChange={this.onSearchChange} handleSubmit={this.handleSubmit} />} />
        {this.searchPath()}
        <Nav performSearch={this.performSearch} resetRedirect={this.resetRedirect}/>
        <nav className="photo-container">
        <h2>{(this.state.h2 === 'Sorry')? 'Sorry' : `${this.state.h2} Photos`}</h2>
          {
            (this.state.loading)
            ? <p>Loading.....</p>
            : <Switch>
            <Route exact path="/" render={()=> <PhotoList data={this.state}/>} />
            <Route path="/dry tortugas" render={()=> <PhotoList data={this.state} search={0}/>}/>
            <Route path="/sea turtles" render={()=> <PhotoList data={this.state} search={1}/>}/>
            <Route path="/sand crabs" render={()=> <PhotoList data={this.state} search={2}/>}/>
            <Route path="/search" render={()=> <PhotoList data={this.state} /> }  />
            <Route component={NotFound} />
            </Switch>
          }
      </nav>
      </div>
    </BrowserRouter>
    );
  }
}