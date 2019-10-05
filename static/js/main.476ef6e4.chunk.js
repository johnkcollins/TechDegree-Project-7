(window["webpackJsonpmy-app"]=window["webpackJsonpmy-app"]||[]).push([[0],{32:function(e,t,a){e.exports=a(60)},37:function(e,t,a){},60:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(29),o=a.n(c),l=(a(37),a(10)),s=a(11),u=a(13),i=a(12),h=a(14),m=a(16),d=a.n(m),f="9f7c6978fbb51c53a1b4cdcc0339fb02",p=a(6),E=a(7),g=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),c=0;c<r;c++)n[c]=arguments[c];return(a=Object(u.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(n)))).onSearchChange=function(e){a.setState({query:a.query.value})},a.handleSubmit=function(e){e.preventDefault(),a.props.performSearch(a.query.value),e.currentTarget.reset(),a.props.history.push("/search")},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("form",{className:"search-form",onSubmit:this.handleSubmit},n.a.createElement("input",{type:"search",name:"search",placeholder:"Search...",required:!0,onChange:this.onSearchChange,ref:function(t){return e.query=t}}),n.a.createElement("button",{type:"submit",className:"search-button",id:"submit"},n.a.createElement("svg",{fill:"#fff",height:"24",viewBox:"0 0 23 23",width:"24",xmlns:"http://www.w3.org/2000/svg"},n.a.createElement("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),n.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))))}}]),t}(r.PureComponent),b=Object(E.g)(g),v=function(e){return n.a.createElement("nav",{className:"main-nav"},n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement(p.b,{onClick:function(){return e.performSearch("Dry Tortugas")},exact:!0,to:"/dry tortugas"},"Dry Tortugas")),n.a.createElement("li",null,n.a.createElement(p.b,{onClick:function(){return e.performSearch("sea turtles")},exact:!0,to:"/sea turtles"},"Sea Turtles")),n.a.createElement("li",null,n.a.createElement(p.b,{onClick:function(){return e.performSearch("sand crabs")},exact:!0,to:"/sand crabs"},"Sand Crabs"))))},S=function(e){return n.a.createElement("li",null,n.a.createElement("img",{src:e.url,key:e.id,alt:e.title}))},y=function(e){var t,a=e.data.activeSearch;function r(e){return e.url_l?e.url_l:e.url_sq}if(!e.data.loading&&e.data.query&&null!==e.data.activeSearch)t=a.map(function(e){return n.a.createElement(S,{url:r(e),key:e.id})});else{if(null===e.data.activeSearch)return n.a.createElement(E.a,{to:"/no-search-results"});if(!e.data.loading&&e.activeSearch>=0){var c=e.activeSearch;t=(a=e.data.loadedSearch[c][0]).map(function(e){return n.a.createElement(S,{url:r(e),key:e.id})})}}return n.a.createElement("ul",null,t)},w=function(){return n.a.createElement("div",null,n.a.createElement("h3",null,"No Results Found"),n.a.createElement("h4",null,"That search did not return any results, please try again."))},k=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(i.a)(t).call(this))).performSearch=function(t){d.a.get("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=".concat(f,"&tags=").concat(t,"&safe_search=1&content_type=photo&extras=url_l,url_sq&per_page=24&page=1&format=json&nojsoncallback=1")).then(function(a){a.data.photos.photo.length>0?e.setState({activeSearch:a.data.photos.photo,loading:!1,h2:t,query:t}):e.handleNoResults()}).catch(function(e){console.log("Error fetching and parsing data",e)})},e.state={loading:!0,loadedSearch:["dry tortugas","sea turtles","sand crabs"],query:" ",redirect:!1,activeSearch:[],h2:""},e}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.buildPhotoStates(),this.performSearch("sea shells")}},{key:"buildPhotoStates",value:function(){for(var e=this.state.loadedSearch,t=function(t){var a=e[t];e[t]=[],d.a.get("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=".concat(f,"&tags=").concat(a,"&safe_search=1&content_type=photo&extras=url_l,url_sq&per_page=24&page=1&format=json&nojsoncallback=1")).then(function(a){e[t].push(a.data.photos.photo)}).catch(function(e){console.log("Error fetching and parsing data",e)})},a=0;a<e.length;a++)t(a)}},{key:"handleNoResults",value:function(){this.setState({activeSearch:null,h2:"Sorry"})}},{key:"render",value:function(){var e=this;return n.a.createElement(p.a,null,n.a.createElement("div",{className:"container"},n.a.createElement(b,{performSearch:this.performSearch}),n.a.createElement(v,{performSearch:this.performSearch}),n.a.createElement("nav",{className:"photo-container"},n.a.createElement("h2",null,"Sorry"===this.state.h2?"Sorry":"".concat(this.state.h2," Photos")),this.state.loading?n.a.createElement("p",null,"Loading....."):n.a.createElement(E.d,null,n.a.createElement(E.b,{exact:!0,path:"/",render:function(){return n.a.createElement(y,{data:e.state})}}),n.a.createElement(E.b,{path:"/dry tortugas",render:function(){return n.a.createElement(y,{data:e.state,search:0})}}),n.a.createElement(E.b,{path:"/sea turtles",render:function(){return n.a.createElement(y,{data:e.state,search:1})}}),n.a.createElement(E.b,{path:"/sand crabs",render:function(){return n.a.createElement(y,{data:e.state,search:2})}}),n.a.createElement(E.b,{path:"/search",render:function(){return n.a.createElement(y,{data:e.state})}}),n.a.createElement(E.b,{component:w})))))}}]),t}(r.PureComponent);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[32,1,2]]]);
//# sourceMappingURL=main.476ef6e4.chunk.js.map