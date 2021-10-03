function loadDoc() {
    $.ajax({
           url: "movies.xml",
           dataType: "xml",
           success: function(data) {
              $("table").append('<tr><td>Title</td><td>Genre</td><td>Director</td><td>Cast</td><td>Short Description</td><td>IMDB-rating</td></tr>');
              $(data).find('movie').each(function(){
                  var title = $(this).find('title').text();
                  var director = $(this).find('director').text();
                  var genre = $(this).find('genre');
                  var genres = '';
                  var genresGroup = ' ';
                  $(genre).each(function(){
                        genres += ' '+ $(this).text()+',';
                        //for removing "," at the end.
                        genresGroup = genres.replace(/,\s*$/,"");
                  })
                  var imdbInfo = $(this).find('imdb-info');
                  var synopsis='';
                  var score = '';
                  $(imdbInfo).each(function(){
                      //fetching child tags value
                      synopsis += ' '+ $(this).find('synopsis').text();
                      score += ' '+ $(this).find('score').text();
                  })
                  var cast = $(this).find('cast');
                  $(cast).each(function(){
                    var person = $(this).find('person');
                    var name = '';
                    var namesGroup = '';
                    $(person).each(function(){
                        //for fetching attribute name from list of values.
                        name += ' ' + $(this).attr('name')+',';
                        //for removing "," at the end.
                        namesGroup = name.replace(/,\s*$/,"");
                    })
                
                  var info = '<tr><td>' + title +'</td><td>' +  genresGroup + '</td><td>' +  director + '</td><td>' +  namesGroup + '</td><td>' +  synopsis + '</td><td>' +  score + '</td></tr>';
                  //Displaying all the details in the table.
                  $("table").append(info);
              });
            });
           },
           error: function() { alert("Error in loading XML file");  }
       });
  
  
  }