class Adapter {
  static getShows (){
    fetch("http://api.tvmaze.com/shows")
    .then(res => res.json())
    .then(data => data)
  }

  static getShowEpisodes (showID){
    return fetch(`http://api.tvmaze.com/shows/${showID}/episodes`)
    .then(res => res.json)
  }
}

export default Adapter
