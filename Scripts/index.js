//Header Component setting

class MyHeader extends HTMLElement {
  connectedCallback() {
    fetch("../Layouts/header.html")
      .then((response) => response.text())
      .then((data) => {
        this.innerHTML = data
      })
      .catch((error) => {
        console.error("Error loading header:", error)
      });
  }
}
customElements.define("my-header", MyHeader)

//Footer component settin

class MyFooter extends HTMLElement {
  connectedCallback() {
    fetch("../Layouts/footer.html")
      .then((response) => response.text())
      .then((data) => {
        this.innerHTML = data
      })
      .catch((error) => {
        console.error("Error loading header:", error)
      });
  }
}
customElements.define("my-footer", MyFooter)

//State city settings------------------------------------

const citiesData = {
  Kerala: ["Alappuzha", "Kottayam", "Thrissur"],
  TamilNadu: ["Maduray", "Chennai", "Chennai"],
  Karnataka: ["K state1", "K state2", "K state3"],
  Maharashtra: ["M state1", "M state2", "M state3"],
};

function setCities() {
  const state = document.getElementById("state");
  const city = document.getElementById("city");

  city.innerHTML = '<option value="">Select a city</option>'

  const selectedState = state.value;
  const cities = citiesData[selectedState]
  console.log(selectedState)

  cities.forEach((val) => {
    const option = document.createElement("option");
    option.value = val
    option.textContent = val
    city.appendChild(option)
  });
}


//  function to set username  automatically as email
function setUsername() {

    console.log("hello")
  const email = document.getElementById("email").value
console.log(email)
  const username = document.getElementById("username")
  console.log(username)
  username.value = email
}


//  function to form submition


function handlesubmit(event){

    event.preventDefault()


    //Form validation part--------------------------------------------------------

    const errorWarning = document.querySelectorAll('.error')
    errorWarning.forEach(message => message.textContent = '')
    
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value
    const fname = document.getElementById("fname").value
    const lname = document.getElementById("lname").value
    const phone = document.getElementById("phone").value


let isvalid=true

    if(password!=confirmPassword){
        document.getElementById("confirm-password-error").textContent = "Passwords does not match."
        isvalid=false
    }
    
    if(fname.length<2){
        document.getElementById("fname-error").textContent = "Please enter a First name with more than 2 letters"
        isvalid=false
    }
    if(lname.length<2){
        document.getElementById("lname-error").textContent = "Please enter A Last name with more than 2 letters"
        isvalid=false
    }
    if (phone.startsWith('1') || phone.startsWith('2') || phone.startsWith('3')) {
        document.getElementById("phone-error").textContent = "Enter a vaild phone number"
        isvalid=false
    }

    if(isvalid){
        alert("Form submitted Successfully")

    }




}
