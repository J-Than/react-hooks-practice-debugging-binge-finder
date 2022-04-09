import React from "react";

function Episode({ episode }) {

  return (
    <div>
      Episode {episode.number} - {episode.name}
    </div>
  );
}

export default Episode;
