$(document).ready(() => {
  $('#searchForm').on('submit', e => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  })
});

function getMovies(searchText) {
  axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=thewdb')
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class=""well text-center>
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a 
              onclick="movieSelected('${movie.imdbID}')" 
              class="btn btn-primary 
              role="button" 
              href="#"
              style="margin: 0 0 5px 0">Movie Details</a>
            </div>
          </div>

        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
  }

  function getMovie() {
    let movieId = sessionStorage.getItem('movieId'); 

    axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=thewdb')
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong>&nbsp; ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong>&nbsp; ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong>&nbsp; ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong>&nbsp; ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong>&nbsp; ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong>&nbsp; ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong>&nbsp; ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well" style="margin: 15px 0 20px 15px">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary" role="button">View IMDB</a>
            <a href="index.html" class="btn btn-light role="button">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
  }