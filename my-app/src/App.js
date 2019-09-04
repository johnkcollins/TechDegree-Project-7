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
            query: 'dry tortugas',
            redirect: false
          }
  }

  //When the page loads the initial activeSearch queries are called from the API
  //The first is displayed on the page, and the 2nd is saved for later use
  componentDidMount() {
    this.buildPhotoStates();
    this.performSearch(this.state.query);
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
            this.setState({
              activeSearch: response.data.photos.photo,
              loading: false,
              h2: query,
              query
            })
          })
          .catch(error => {
            console.log('Error fetching and parsing data', error);
          });
  };

  resetRedirect(){
    this.setState({
      redirect: false
    })
  }

  renderRedirect(){
    if (this.state.redirect)
    {
      return <Redirect to="/search"/>
    }
  }

  //Renders the page
  render () {
  return (
    <BrowserRouter>
      <div className="container">
        <Route path="/" render={()=><Search to='/search' onSearchChange={this.onSearchChange} handleSubmit={this.handleSubmit} />} />
        {this.renderRedirect()}
        <Nav performSearch={this.performSearch} resetRedirect={this.resetRedirect}/>
        <nav className="photo-container">
        {
          (this.state.loading)
              ? <h2>Dry Tortugas</h2>
              : <h2>{this.state.h2} Photos</h2>
        }
          {
            (this.state.loading)
            ? <p>Loading.....</p>
            : <Switch>
            <Route exact path="/" render={() => <Redirect to="/dry tortugas"/>} />
            <Route path="/dry tortugas" render={()=> <PhotoList data={this.state} search={0}/>}/>
            <Route path="/sea turtles" render={()=> <PhotoList data={this.state} search={1}/>}/>
            <Route path="/sand crabs" render={()=> <PhotoList data={this.state} search={2}/>}/>
            <Route path="/search" render={()=> <PhotoList data={this.state}/>} />
            <Route component={NotFound} />
            </Switch>
          }
      </nav>
      </div>
    </BrowserRouter>
    );
  }
}
