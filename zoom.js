/**
 * Created by mikenuchida on 4/5/16.
 */
/**
 * Created by michaeluchida on 1/26/16.
 */
//*****************************  Global Arrays and variables ***********************


// an object containing name, lastOrders, cardBalance
var customerData;
// one of 5 objects from the drinkMenu array;
var drinkObject;
//one of 3 objects from the espressoShot array;
var shotsObject;

var totalPrice;

var drinkMenu = [
    {name: "Americano", price: 2.75},
    {name: "Cappuchino", price: 3.35},
    {name: "Cubano", price: 3.85},
    {name: "Mexican Hot Chocolate", price: 4.10},
    {name: "Mocha", price: 3.50}
];

var espressoShot = [
    {name: "one", price: 0.50
    },
    {name: "two", price: 0.50
    },
    {name: "three", price: 1.50
    }
];

//a record of existing customer records: lastOrders, cardBalance;
var customerInfo = [
    {name: "Sleepy",
        lastOrders: [
            {name: "Americano", numberOfShots: 2, price: 4.50
            },
            {name: "Mocha", numberOfShots: 3, price: 5.00
            },
            {name: "Mexican Hot Chocolate", numberOfShots: 1, price: 4.60
            },
            {name: "Cappuchino", numberOfShots: 2, price: 4.35
            },
            {name: "Cubano", numberOfShots: 2, price: 4.85
            }
        ],
        cardBalance: 14.00,
    },

    {name: "Doc",
        lastOrders: [
            {name: "Americano", numberOfShots: 2, price: 4.50
            },
            {name: "Mocha", numberOfShots: 3, price: 5.00
            },
            {name: "Americano", numberOfShots: 2, price: 4.50
            },
            {name: "Mexican Hot Chocolate", numberOfShots: 1, price: 4.60
            },
            {name: "Cubano", numberOfShots: 2, price: 4.85
            },
            {name: "Cappuchino", numberOfShots: 2, price: 4.35
            }
        ],
        cardBalance: 7.50
    },
    {name: "Sneezy",
        lastOrders: [
            {name: "Americano", numberOfShots: 2, price: 4.50
            },
            {name: "Cappuchino", numberOfShots: 2, price: 4.35
            },
            {name: "Cubano", numberOfShots: 2, price: 4.85
            }
        ],
        cardBalance: 7.35
    },
    {name: "Bashful",
        lastOrders: [
            {name: "Cappuchino", numberOfShots: 2, price: 4.35
            },
            {name: "Americano", numberOfShots: 2, price: 4.50
            },
            {name: "Cubano", numberOfShots: 2, price: 4.85
            },
            {name: "Cappuchino", numberOfShots: 2, price: 4.35
            }
        ],
        cardBalance: 10.80
    },
    {name: "Hopeful",
        lastOrders: [
            {name: "Americano", numberOfShots: 2, price: 4.50
            },
            {name: "Cubano", numberOfShots: 2, price: 4.85
            },
            {name: "Americano", numberOfShots: 2, price: 4.50
            },
        ],
        cardBalance: 25.00
    }
];


//*****************************  END Global Arrays and variables ***********************




//assigns the customerData object to the returning user
var returningCustomer= function(){
    user = (document.getElementById("welcomeCustomer")).value;
    customerData = customerInfo.find(function(item){
        return item.name ===user;
    })
    orderForm.style.display = "block";
    welcomeMessage(customerData);

}


//creates a new customerData objec
var createNewAccount = function(){
    alert("Create an account and we will place $10.00 on your Zoom Card")
    var newObj = {};
    var name = prompt("Enter your Name");
    newObj.name = name;
    newObj.cardBalance = 10.00;
    newObj.lastOrders = 'null';
    customerData = newObj;
    orderForm.style.display = "block";
    welcomeMessage(customerData);
}


//displays a welcome message including name, lastOrders, and Zoom card balance
var welcomeMessage = function(customerData) {
    document.getElementById('returningOrNew').innerHTML = "";
    if(customerData.lastOrders === "null"){
        var divobject = document.getElementById("welcomeMessage");
        return divobject.innerHTML = "Welcome " + customerData.name + "," +
            " your Zoom card has a balance of $" + customerData.cardBalance.toFixed(2);
    }
    var summaryOfOrders = customerData.lastOrders.map(function (item) {
        return  "  "+item.name + " with " + item.numberOfShots + " shot(s) of espresso, $" + item.price.toFixed(2)+"  ";
    })
    var divobject = document.getElementById("welcomeMessage");
    divobject.innerHTML = "Welcome " + customerData.name + "," +
        " your Zoom card has a balance of $" + customerData.cardBalance.toFixed(2) + ". "
    var summaryObject = document.getElementById("lastOrders");
    summaryObject.innerHTML = "Your last orders include: " + summaryOfOrders;
};

//creates the drinkObject
var chosenDrink = function(drink){
    drinkObject =  drinkMenu.find(function(item){
        if(item.name === drink.value){
            return item.price.toFixed(2);
        }
    })
    return drinkObject;
};

//creats the shotsObject
var totalShots = function(shots){
    shotsObject =  espressoShot.find(function(item){
        if(item.name === shots.value){
            return item.price.toFixed(2);
        }
    })
    return shotsObject;
};
//calculates total before checkout
var calculateTotal = function() {

    if (!drinkObject) {
        return alert("Please Choose A Drink")
    }
    if (!shotsObject) {
        return alert("Please Choose The Number of Espresso Shots")
    }
    var arrayOfObject = [drinkObject, shotsObject];
    totalPrice = arrayOfObject.reduce(function (sum, item) {
        return sum + item.price;
    }, 0)
    alert("Here is your total $" + totalPrice.toFixed(2))
};
//resets drinkObject and shotsObject
var clearButton = function () {
    var ele = document.getElementsByName("radButton");
    for (var i = 0; i < ele.length; i++)
        ele[i].checked = false;
    document.getElementById('total').innerText = ""
    drinkObject = null;
    shotsObject = null;

};
//runs tests to see if the the customerData, drinkObject, shotsObject exist. finally returns a confirmation of order
var finalCheckOut = function () {
    if (!customerData) {
        return alert("Please enter your customer name or create an account");
    }
    if (!drinkObject || !shotsObject) {
        return alert("Please choose a drink and the number of espresso shots");
    }
    document.getElementById("orderSelection").innerText = "";
    document.getElementById("costSection").innerText = "";
    var divobject = document.getElementById("orderSelection");
    if (!customerData) {
        return alert("Please enter a customer name or enter a new name");
    }
    var arrayOfObject = [drinkObject, shotsObject]
    totalPrice = arrayOfObject.reduce(function (sum, item) {
        return sum + item.price;
    }, 0);
    divobject.innerHTML = "Hi " + customerData.name + ", you've ordered a " + drinkObject.name + " with "
        + shotsObject.name + " shot(s) of espresso."
        + "  $" + (drinkObject.price + shotsObject.price).toFixed(2) + " has been deducted from your Zoom card" +
        " and your new balance is $" + (customerData.cardBalance - totalPrice).toFixed(2) + ".  Your drink will be ready when you get here."
}


//******************************************* API ******************************************

//finds geolocation of user based on mac address or cell towers
function findLocation() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // navigator.geolocation determines geo location via data collection mechanisms like the ip of a wifi router, cell tower, etc
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            infoWindow.setPosition(pos);
            map.setCenter(pos);
            initializePlaceSearchMap(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }
    else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

var map;
var infowindow;
var cafeListing;

function initializePlaceSearchMap(coordinates) {
    var myLocation = coordinates;
    apiWrapper.style.display = "block";
    displayCafeInfo.style.display = "block";
    findLocationButton.style.display = "none"
    map = new google.maps.Map(document.getElementById('apiWrapper'), {
        center: myLocation,
        zoom: 14
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLocation,
        radius: 2500,
        keyword: ['cafe']
    }, callback);
    var cafeListing = service.nearbySearch;
};


function callback(results, status) {
    var cafeListing = results
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.map(function(item){
            createMarker(item);
        });
    }
    cafeDetails(results);
};

//creates the teardrop marker
function createMarker(place) {

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
//places the array of objects with cafe info in the global space
function cafeDetails (details){
    cafeListing = details;
}


//allows user to filter the results based on rating
var filterFunction  = function(value){

    var divobject = document.getElementById("displayFilteredResults")
    var stars = parseInt((document.getElementById("filteredResults")).value);
    var filterResults = _.sortBy(cafeListing, function(item){
        return item.rating
    })
    var final = filterResults.reverse().filter(function(item){
        if( item.rating >= stars && item.rating < stars + 1){
            return item;
        }
    })
    if(final.length === 0) {
        return divobject.innerHTML ="No results found"
    }
    var display = final.map(function(item, index){
        return ("  Rating "+item.rating +" "+item.name+" "+item.vicinity)
    })
    divobject.innerHTML = display;
}





