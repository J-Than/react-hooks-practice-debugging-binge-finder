import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";

function App() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [filterByRating, setFilterByRating] = useState("");

  useEffect(() => {
    fetch("http://api.tvmaze.com/shows")
    .then(r => r.json())
    .then(shows => {setShows(shows)})
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  function handleSearchInput(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  function handleFilter(e) {
    e.target.value === "No Filter"
      ? setFilterByRating("")
      : setFilterByRating(e.target.value);
  }

  function selectShow(show) {
    fetch(`http://api.tvmaze.com/shows/${show.id}/episodes`)
    .then(r => r.json())
    .then((data) => {
      setSelectedShow(show);
      setEpisodes(data);
    });
  }

  let displayShows = shows;
  if (filterByRating) {
    displayShows = displayShows.filter((s) => s.rating.average >= filterByRating);
  }

  if (searchTerm) {
    displayShows = displayShows.filter((s) => s.name.toLowerCase().includes(searchTerm));
  }

  return (
    <div>
      <Nav
        handleFilter={handleFilter}
        handleSearch={handleSearchInput}
        searchTerm={searchTerm}
      />
      <Grid celled>
        <Grid.Column width={5}>
          {!!selectedShow ? (
            <SelectedShowContainer
              selectedShow={selectedShow}
              episodes={episodes}
            />
          ) : (
            <div />
          )}
        </Grid.Column>
        <Grid.Column width={11}>
          <TVShowList
            shows={displayShows}
            selectShow={selectShow}
            searchTerm={searchTerm}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
