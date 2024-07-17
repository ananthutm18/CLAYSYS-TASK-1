//Header Component setting

class MyHeader extends HTMLElement {
  async connectedCallback() {
    try {
      const res = await fetch("../Layouts/header.html");
      const data = await res.text();
      this.innerHTML = data;
    } catch (error) {
      console.error("Error loading header:", error);
    }
  }
}
customElements.define("my-header", MyHeader);

//Footer component settin

class MyFooter extends HTMLElement {
  async connectedCallback() {
    try {
      const res = await fetch("../Layouts/footer.html");
      const data = await res.text();
      this.innerHTML = data;
    } catch (error) {
      console.error("Error loading header:", error);
    }
  }
}
customElements.define("my-footer", MyFooter);

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

  city.innerHTML = '<option value="">Select a city</option>';

  const selectedState = state.value;
  const cities = citiesData[selectedState];
  console.log(selectedState);

  cities.forEach((val) => {
    const option = document.createElement("option");
    option.value = val;
    option.textContent = val;
    city.appendChild(option);
  });
}

//  function to set username  automatically as email
function setUsername() {
  console.log("hello");
  const email = document.getElementById("email").value;
  console.log(email);
  const username = document.getElementById("username");
  console.log(username);
  username.value = email;
}

//  function to form submition

function handlesubmit(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const dob = document.getElementById("dob").value;
  const age = document.getElementById("age").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const username = document.getElementById("username").value;

  //Form validation part--------------------------------------------------------

  const errorWarning = document.querySelectorAll(".error");
  errorWarning.forEach((message) => (message.textContent = ""));

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const phone = document.getElementById("phone").value;

  let isvalid = true;

  if (password.length < 8) {
    document.getElementById("password-error").textContent =
      "Password soul contain atleast 8 character.";
    isvalid = false;
  }
  {
  }
  if (password != confirmPassword) {
    document.getElementById("confirm-password-error").textContent =
      "Passwords does not match.";
    isvalid = false;
  }

  if (fname.length < 2) {
    document.getElementById("fname-error").textContent =
      "Please enter a First name with more than 2 letters";
    isvalid = false;
  }
  if (lname.length < 2) {
    document.getElementById("lname-error").textContent =
      "Please enter A Last name with more than 2 letters";
    isvalid = false;
  }
  if (phone.startsWith("1") || phone.startsWith("2") || phone.startsWith("3")) {
    document.getElementById("phone-error").textContent =
      "Enter a vaild phone number";
    isvalid = false;
  }

  if (isvalid) {

    //Storing data in local storage and showing alert
    const currentData = JSON.parse(localStorage.getItem("userData")) || [];   

    const formData = {
      firstName: fname,
      lastName: lname,
      email: email,
      phone: phone,
      address: address,
      password: password,
      dob: dob,
      age: age,
      state: state,
      city: city,
      username: username,
    };

    const newData = [...currentData, formData];

    localStorage.setItem("userData", JSON.stringify(newData));
    alert("Form submitted Successfully");
  }
}


//Function to login

function handleLogin(event) {
  event.preventDefault();
  document.getElementById("login-error").textContent = "";

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const userdata = JSON.parse(localStorage.getItem("userData")); //taking data from local storage for matchnig the enterd username and password
  console.log(userdata);

  console.log(username, password);
  
  const userval = userdata.find(  
    (user) => user.username === username && user.password === password
  );

  if (userval) {
    alert("Login successful!");
    window.location.href = "home.html";  //redirecting the user to hom page
  } else {
    document.getElementById("login-error").textContent = "Invalid credential.";
  }
}
