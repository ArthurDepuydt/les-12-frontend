export function colorMatch(land) {
  if (land.continents == "Africa") {
    return "blue";
  } else if (land.continents == "North America") {
    return "green";
  } else if (land.continents == "South America") {
    return "lightgreen";
  } else if (land.continents == "Asia") {
    return "red";
  } else if (land.continents == "Europe") {
    return "yellow";
  } else if (land.continents == "Oceania") {
    return "magenta";
  } else {
    return "grey";
  }
}

export default colorMatch;
