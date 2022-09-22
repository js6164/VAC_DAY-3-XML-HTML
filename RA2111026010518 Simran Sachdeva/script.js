// Alter the code so that subtotal automatically updates
// Need to react on click?
// Add an "oninput = updateSubtotal()" in the created table to try and catch any additions 
// keep menu on page when selected
// updating the price when changing number of people
var totalGuests=1;

var table = document.getElementsByTagName("table")[0];
var tbody = table.getElementsByTagName("tbody")[0];

// Obtain guest value from html
var billTbody = document.getElementById("orderTable");
var priceColumn = 1;
var quantityColumn = 2;

function updateSubtotals() {

  // Create necessary variables (running total, row counter, and counts for interested columns)
  var subtotal = 0;
  var numberOfRows = billTbody.rows.length;

  // Obtain the total pre tax
  for (var i=0; i<numberOfRows; i++) {
    var trElem = billTbody.rows[i];
    var tdPriceElem = trElem.cells[priceColumn].innerHTML;
    var tdQuantityElem = trElem.cells[quantityColumn].innerHTML;
    var textNode = tdPriceElem * tdQuantityElem;

    // Check to ensure value is numeric
    var thisNumber = parseFloat(textNode);
    if (!isNaN(thisNumber)) {
      subtotal += thisNumber;
    } else {alert("error");}
  }

  //Obtain and display the total per guest
  subtotal /= totalGuests;
  document.getElementById("perGuestSubtotal").innerHTML = Math.round(subtotal*100)/100;
}

function updateGuestTotal() {
  var guestSubtotal = document.getElementById("perGuestSubtotal").textContent;
  var totalGuests = document.getElementById("billInput").value;
  var subtotal = guestSubtotal / totalGuests;
  document.getElementById("perGuestSubtotal").innerHTML = Math.round(subtotal*100)/100;
}

tbody.onclick = function (e) {
  e = e || window.event;
  var data = [];
  var target = e.srcElement || e.target;
  while (target && target.nodeName !== "TR") {
    target = target.parentNode;
  }
  if (target) {
    var cells = target.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
      data.push(cells[i].innerHTML);
    }
  }
  var trNode = document.createElement("tr");

  for (var i = 0; i < data.length; i++) {
    var tdNode = document.createElement("td");
    var textNode = document.createTextNode(data[i]);
    tdNode.appendChild(textNode);
    trNode.appendChild(tdNode);
  }
  
  // Add the row to the order table
  document.getElementById("orderTable").appendChild(trNode);
  
  // Calculate new subtotal
  updateSubtotals();
};






