$(function () {


    const key = '92087764';
    const siteUrl = 'https://www.omdbapi.com/';

    $('#search').on('change', function (event) {

        let search = $(this).val();

        let url = siteUrl + '?apikey=' + key + '&s=' + search;

        $.ajax({
            type: "post",
            url: url,
            data: '',
            dataType: "json",
            beforeSend: function () {
                $(".loader-div").show();
            },
            success: function (response) {

                console.log(response);

                if (response.Response == 'True') {

                    // alert('Search Results Found !');

                    let results = response.Search;

                    $("#movie_list").html('');

                    $.each(results, function (indexInArray, valueOfElement) {

                        let movieImage = valueOfElement.Poster;
                        let MovieTitle = valueOfElement.Title;
                        let movieType = valueOfElement.Type;
                        let movieYear = valueOfElement.Year;
                        let imdbID = valueOfElement.imdbID;

                        let template = `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 p-0">
                                    <div class="movie-card" data-imdbID="${imdbID}">
                                        <img class="img-fluid movie-img" src="${movieImage}" onerror="this.onerror=null;this.src='https://i.ebayimg.com/images/g/1EMAAMXQdGJR2-n3/s-l1600.jpg';" alt="Sorry, something went wrong">
                                        <div class="movie-description p-3">
                                            <h3 class="movie-type">${movieType}</h3>
                                            <h3 class="movie-title">${MovieTitle}</h3>

                                            <div class="movie-details">
                                                <h4>${MovieTitle}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

                        $("#movie_list").append(template);

                    });

                } else {
                    alert(response.Error);
                }
            }, complete: function () {

                setTimeout(() => {
                    $(".loader-div").hide();
                }, 200);
            },
        });

    });

    $(document).on('mouseenter', '.movie-card',
        function () {
            $(this).find(".movie-details").show();

            let id = $(this).data('imdbid');

            let parentdiv = $(this);

            $.ajax({
                type: "get",
                url: 'http://www.omdbapi.com/?apikey=92087764&i=' + id,
                dataType: "json",
                crossDomain: true,
                success: function (response) {
                    if (response.Response == 'False') {
                        //do nothing
                    } else {
                        let result = `<h4>${response.Title}</h4>
                          <h5>Year: ${response.Year}</h5>
                          <h6>Rated: ${response.Rated}</h6>
                          <h6>Released: ${response.Released}</h6>
                          <h6>Director: ${response.Director}</h6>
                          <h6>Ratings: ${response.imdbRating}</h6>`;

                        parentdiv.find(".movie-details").html(result);
                    }
                }
            });

            // $.get("http://www.omdbapi.com/?apikey=92087764&i=" + id,
            //     '',
            //     function (data, textStatus, jqXHR) {
            //         if (data.Response == 'False') {
            //             //do nothing
            //         } else {
            //             let result = `<h4>${data.Title}</h4>
            //               <h5>Year: ${data.Year}</h5>
            //               <h6>Rated: ${data.Rated}</h6>
            //               <h6>Released: ${data.Released}</h6>
            //               <h6>Director: ${data.Director}</h6>
            //               <h6>Ratings: ${data.imdbRating}</h6>`;

            //             parentdiv.find(".movie-details").html(result);
            //         }

            //     },
            //     "json"
            // );

        }
    );

    $(document).on('mouseleave', '.movie-card',
        function () {
            $(this).find(".movie-details").hide();
        }
    );


});
