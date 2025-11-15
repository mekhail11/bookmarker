var siteName = document.getElementById("siteName");
var websiteUrl = document.getElementById("websiteUrl");
var deleteAll = document.getElementById("deleteAll");


var siteCont = [];

if (localStorage.getItem("sites") != null) {
    siteCont = JSON.parse(localStorage.getItem("sites"));
    displayData();
}

function addSite() {
if (validInputs() == true) {
        var site = {
        name: siteName.value,
        url: websiteUrl.value,
    };
    
    siteCont.push(site);
    localStorage.setItem("sites" , JSON.stringify(siteCont));  

    clsForm();
    displayData();
} else {
    alert(`Please enter a valid Name and URL
    Name: minimum 2 character
    URL: should be start with (https://)
    and end with minimum 2 character after (.)`);
}
}

function clsForm(){
    siteName.value="";
    websiteUrl.value="";
}

function displayData(){
    cartona = "";
    for (let i = 0; i < siteCont.length; i++) {
        cartona+=`
        <tr>
          <td>${i+1}</td>
          <td>${siteCont[i].name}</td>
          <td><a href="${siteCont[i].url}" target="blank" class="btn visit-btn" id="visit"><i class="fa fa-solid fa-external-link"></i></a></td>
          <td><button class="btn delete-btn" onclick="deleteItem(${i})" id="deleteItem"><i class="fa fa-solid fa-trash-alt"></i></button></td>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;

    if (siteCont.length > 0) {
        var bTn = `<tr>
          <td colspan="5">
            <button class="deleteAll-btn" id="deleteAll" onclick="deleteALL()">
              <i class="fa fa-solid fa-trash-alt"></i> Delete All
            </button>
          </td>
        </tr>`
        
        document.getElementById("deletAll").innerHTML = bTn;
    }else{
        document.getElementById("deletAll").innerHTML = "";
    }
}

function deleteALL(){
     siteCont.splice(0,siteCont.length);

    localStorage.setItem("sites" , JSON.stringify(siteCont)); 
    displayData();
}

function deleteItem(elementIndex){
    siteCont.splice(elementIndex,1);

    localStorage.setItem("sites" , JSON.stringify(siteCont)); 
    displayData();
}

function validInputs() {
  var paternName = /[a-zA-Z0-9]{2,}/;
  var paternURL = /^https?:\/\/(www\.)?[a-z0-9\.]{2,}(\.[a-z]{2,}$)/;
  if (
    paternURL.test(siteURLInput.value) === true &&
    paternName.test(siteNameInput.value) === true
  ) {
    return true;
  } else {
    return false;
  }
}