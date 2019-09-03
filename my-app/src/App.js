import React, { PureComponent } from 'react';
import axios from 'axios';
import apiKey from './config';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect, NavLink
} from 'react-router-dom';

//App components
import Search from './components/Search';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';
import NotFound from './components/NotFound';

export default class App extends PureComponent {

  constructor(props) {
    super(props);
          this.state = {
            loading: true,
            searches: ['dry tortugas', 'sea turtles', 'sand crabs'],
            query: ''
          }
  }

  //When the page loads the initial search queries are called from the API
  //The first is displayed on the page, and the 2nd is saved for later use
  componentDidMount() {
    this.buildPhotoStates();
    this.performSearch(`dry tortugas`);
    return <Route exact path="/search_results" render={()=> <PhotoList data={this.state} upDateState={this.upDateState} />}/>
  }

  //This saves the "button" searches in state for later retrieval
  buildPhotoStates (){
    let searches = this.state.searches;
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

  //Handles the search input upon change
  onSearchChange = (e) => {
    this.setState ({ query: e.target.value});
    this.performSearch(e.target.value);
  };

  //Handles the search input upon submit
  handleSubmit = (e) => {
    e.preventDefault();
    this.performSearch(this.state.query);
    e.currentTarget.reset();
  };

  //Trying to update state to for search functions to display properly
  upDateState=(object, value)=>{
    this.setState({
      object: value
    });
  };

  //Takes input and returns photos from the Flickr API
  //API key is saved in ./config.js
  performSearch = (query) => {
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&safe_search=1&content_type=photo&extras=url_l,url_sq&per_page=24&page=1&format=json&nojsoncallback=1`)
          .then(response => {
            this.setState({
              photos: response.data.photos.photo,
              loading: false,
              query
            })
          })
          .catch(error => {
            console.log('Error fetching and parsing data', error);
          });
      console.log(query);
  };

  //Renders the page
  render () {
  return (
    <BrowserRouter>
      <div className="container">
        <Search handleSubmit={this.handleSubmit} onSearchChange={this.onSearchChange} onSearch={this.performSearch} data={this.performSearch} />
        <Nav data={this.state.searches}/>
        <nav className="photo-container">
        <h2> {this.state.query} </h2>
        <Switch>
          <Route exact path="/" render={() =><Redirect to="/dry_tortugas"/> }/>
          <Route path="/dry_tortugas" render={()=> <PhotoList data={this.state}  upDateState={this.upDateState} search={0}/>}/>
          <Route path="/sea_turtles" render={()=> <PhotoList data={this.state} upDateState={this.upDateState} search={1}/>}/>
          <Route path="/sand_crabs" render={()=> <PhotoList data={this.state} upDateState={this.upDateState} search={2}/>}/>
          <Route path="/search" render={()=> <Search data={this.state} />} />
          <Route component={NotFound} />
        </Switch>
      </nav>
      </div>
    </BrowserRouter>
    );
  }
}
