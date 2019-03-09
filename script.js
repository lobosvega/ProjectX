// change (Hamburg) into (X)when click on
$(document).ready(function() {
  // calling button when click event
  $(".nav-button").click(function() {
    // when click on(X) again back to(Hamburg) to do that we use (toggleClass)
    $(".nav-button").toggleClass("change");
  });

  // Use the properties (scrollTop) and (scrollLeft) to get or set the scroll position of an element:

  // (window) represents the entire page is attached to scroll enevnts
  $(window).scroll(function() {
    // Where we want to start chamging the (nav-bar)
    let position = $(this).scrollTop();
    // (this) keyword refers to the (window) object and (ScrollTop) calculate position in pixels when we scroll down
    // console.log(position);
    if (position >= 200) {
      $(".nav-menu").addClass("custom-navbar");
      // if the position is less then 200px we want to maintain default number
    } else {
      $(".nav-menu").removeClass("custom-navbar");
    }
  });

  // mission
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    // console.log(position);
    if (position >= 650) {
      $(".camera-img").addClass("fromLeft");
      $(".mission-text").addClass("fromRight");
    } else {
      $(".camera-img").removeClass("fromLeft");
      $(".mission-text").removeClass("fromRight");
    }
  });

  $(window).scroll(function() {
    let position = $(this).scrollTop();
    if (position >= 3115) {
      $(".card-1").addClass("moveFromLeft");
      $(".card-2").addClass("moveFromBottom");
      $(".card-3").addClass("moveFromRight");
    } else {
      $(".card-1").removeClass("moveFromLeft");
      $(".card-2").removeClass("moveFromBottom");
      $(".card-3").removeClass("moveFromRight");
    }
  });

  var map;
  var formHouseNumber;
  var formStreet;
  var formCity;
  var formState;
  var formZipCode;
  var pollingAddress;
  var pollingState;
  var pollingZip;

  function initMap() {
    console.log("INITIALIZING MAP");
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat: 38.897957, lng: -77.03656 }
    });
  }
  initMap();

  $("#add-address").on("click", function(event) {
    event.preventDefault();
    if (
      $.trim($("#house-input").val()) === "" ||
      $.trim($("#street-input").val()) === "" ||
      $.trim($("#city-input").val()) === "" ||
      $.trim($("#state-input").val()) === "" ||
      $.trim($("#zipCode-input").val()) === ""
    ) {
      $("#add-address").addClass("error");
      return false;
    }

    formHouseNumber = $("#house-input")
      .val()
      .trim();
    formStreet = $("#street-input")
      .val()
      .trim();
    formCity = $("#city-input")
      .val()
      .trim();
    formState = $("#state-input")
      .val()
      .trim();
    formZipCode = $("#zipCode-input")
      .val()
      .trim();

    console.log(formHouseNumber, formStreet, formCity, formState, formZipCode);

    var voteKey = "AIzaSyDrlrkFmFQIGo2oZGZ7FrwsYwiRZ2UFlf8";
    var voterURL =
      " https://www.googleapis.com/civicinfo/v2/voterinfo?key=" +
      voteKey +
      "&address=" +
      formHouseNumber +
      "%20" +
      formStreet +
      "%20" +
      formCity +
      "%20" +
      formState +
      "%20" +
      formZipCode +
      "%20" +
      "&electionId=2000";

    $.ajax({
      url: voterURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var pollingAddress = response.pollingLocations[0].address.line1;
      console.log(pollingAddress);
      var pollingState = response.pollingLocations[0].address.state;
      console.log(pollingState);
      var pollingZip = response.pollingLocations[0].address.zip;
      console.log(pollingZip);
      var mapsKey = "AIzaSyBNF6uPsCtt2kAj3M9Pt7jskCOhMT_KZ0U";
      var latLotURL =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        "+" +
        pollingAddress +
        "+" +
        pollingState +
        "+" +
        pollingZip +
        "&key=" +
        mapsKey;

      $.ajax({
        url: latLotURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        pollingLat = response.results[0].geometry.location.lat;
        pollingLng = response.results[0].geometry.location.lng;
        console.log(pollingLat, pollingLng);

        var directionsKey = "AIzaSyDs_PbNWm5zI9ruuOaUrl3CLZ_p6ZkWD3I";
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url =
          "https://maps.googleapis.com/maps/api/directions/json?origin=" +
          formHouseNumber +
          "+" +
          formStreet +
          "+" +
          formCity +
          "+" +
          formState +
          "+" +
          formZipCode +
          "&destination=" +
          pollingAddress +
          "+" +
          pollingState +
          "+" +
          pollingZip +
          "&key=" +
          directionsKey;

        var boothLocation = { lat: pollingLat, lng: pollingLng };

        var contentString =
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">' +
          pollingAddress +
          pollingState +
          pollingZip +
          "</h1>" +
          "</div>";

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: boothLocation,
          map: map
        });

        marker.addListener("click", function() {
          infowindow.open(map, marker);
        });

        map.setCenter(marker.getPosition());
      });
    });
  });
});

var candidateArray = [
  "Cory Booker",
  "Pete Buttigieg",
  "Julian Castro",
  "John Delaney",
  "Tulsi Gabbard",
  "Kirsten Gillibrand",
  "Kamala Harris",
  "John Hickenlooper",
  "Jay Inslee",
  "Amy Klobuchar",
  "Bernie Sanders",
  "Donald Trump",
  "Elizabeth Warren",
  "William Weld",
  "Marianne Williamson",
  "Andrew Yang"
];

$(document).ready(function() {
  cards = "";
  function displayButtons() {
    $("buttons").empty();
    for (var i = 0; i < candidateArray.length; i++) {
      var newBtn = $("<button>");
      newBtn.addClass("btn");
      newBtn.attr("data-name", candidateArray[i]);
      newBtn.text(candidateArray[i]);
      $("#buttons").append(newBtn);
    }
  }

  displayButtons();

  $(document).on("click", "button", function() {
    $("#cards").empty();
    var y = $(this).attr("data-name");
    var queryURL =
      "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      y +
      "&api-key=O9O42AUS15WtWuJXO33I79AgyT0nDPFq";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(data) {
      var articles = data.response.docs;

      for (var i = 0; i < articles.length; i++) {
        var articlesDiv = $("<div>");
        var articlesBody = $("<div class=newsCard>");
        var articlesHeadline = $("<h3>").text(articles[i].headline.main);
        var articlesSnippet = $("<p>").text(articles[i].snippet);
        var buttonDiv = $("<div>");
        buttonDiv.addClass("new");
        var more = $("<a>").text("More");
        more.attr("href", articles[i].web_url);
        more.attr("target", "_blank");
        more.addClass("btn btn-primary");
        articlesDiv.addClass("row");
        articlesDiv.addClass("col-md-4");
        articlesBody.append(articlesHeadline);
        articlesBody.append(articlesSnippet);
        articlesBody.append(buttonDiv);
        articlesDiv.append(articlesBody);
        buttonDiv.append(more);
        $("#cards").append(articlesDiv);
      }
    });
  });
});
