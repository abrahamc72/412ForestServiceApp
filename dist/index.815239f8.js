var queryData;
var queryString;
function grabAll() {
    //numPeople
    //paySelect
    //horseSelect
    //trashSelect
    //waterSelect
    //toiletSelect
    queryString = "SELECT * from ";
    horseCheck = 0;
    if (document.getElementById("horseSelect").value == 1) {
        horseCheck = 1;
        queryString += "horse_campground";
    } else queryString += "campsite";
    if (horseCheck == 0) {
        if (document.getElementById("paySelect").value == 0) queryString += " WHERE daily_fee = 0";
        else queryString += " WHERE daily_fee >= 0";
        if (document.getElementById("trashSelect") == 1) queryString += " AND has_garbage = true";
        if (document.getElementById("waterSelect").value == 1) queryString += " AND has_water = true";
        if (document.getElementById("toiletSelect").value == 1) queryString += " AND toilet_type != Compost";
    }
    console.log(queryString);
}
function hideElement() {
    var element = document.getElementById("Home");
    element.style.display = "none";
}
function startConnection() {
    console.log("yes");
}

//# sourceMappingURL=index.815239f8.js.map
