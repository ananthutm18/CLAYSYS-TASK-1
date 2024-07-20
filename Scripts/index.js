let displayValue = "";
let operator = "";
let firstOperand = "";
let secondOperand = "";

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

//Footer component settin

class MyGame extends HTMLElement {
  async connectedCallback() {
    try {
      const res = await fetch("../Layouts/game.html");
      const data = await res.text();
      this.innerHTML = data;
    } catch (error) {
      console.error("Error loading header:", error);
    }
  }
}
customElements.define("my-game", MyGame);

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
  const errorBoarder = document.querySelectorAll(".fields");

  errorWarning.forEach((message) => (message.textContent = ""));
  errorBoarder.forEach((boarder) => boarder.classList.remove("error-boarder"));

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const phone = document.getElementById("phone").value;

  let isvalid = true;

  if (fname.length < 1) {
    let err = document.getElementById("fname");
    err.classList.add("error-boarder");

    document.getElementById("fname-error").textContent =
      "Please enthe the first name";
    isvalid = false;
  } else if (fname.length < 2) {
    let err = document.getElementById("fname");
    err.classList.add("error-boarder");
    document.getElementById("fname-error").textContent =
      "Please enter a First name with more than 2 letters";
    isvalid = false;
  }

  if (lname.length < 1) {
    let err = document.getElementById("lname");
    err;
    document.getElementById("lname-error").textContent =
      "Please enthe the Last name";
    isvalid = false;
  } else if (lname.length < 2) {
    let err = document.getElementById("lname");
    err.classList.add("error-boarder");
    document.getElementById("lname-error").textContent =
      "Please enter the Last name with more than 2 letters";
    isvalid = false;
  }

  if (email.length < 1) {
    let err = document.getElementById("email");
    err.classList.add("error-boarder");

    document.getElementById("email-error").textContent =
      "Please enthe the Email";
    isvalid = false;
  } else {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let check = regex.test(email);
    if (!check) {
      let err = document.getElementById("email");
      err.classList.add("error-boarder");

      document.getElementById("email-error").textContent =
        "Please a valid email";
      isvalid = false;
    }
  }

  if (password.length < 1) {
    let err = document.getElementById("password");
    err.classList.add("error-boarder");

    document.getElementById("password-error").textContent =
      "Please enthe the Password";
    isvalid = false;
  }

  if (password.length < 8) {
    let pass = document.getElementById("password");
    pass.classList.add("error-boarder");

    document.getElementById("password-error").textContent =
      "Password soul contain atleast 8 character.";
    isvalid = false;
  }

  if (password != confirmPassword) {
    document.getElementById("confirm-password-error").textContent =
      "Passwords does not match.";
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
  const userText = document.getElementById("username");
  const passText = document.getElementById("password");
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
    window.location.href = "productpage.html"; //redirecting the user to hom page
  } else {
    document.getElementById("login-error").textContent = "Invalid credential.";

    passText.classList.add("error-boarder");
    userText.classList.add("error-boarder");
  }
}

//function to hide and show the contact form on the home page(J query implementation)
let toggle = 1;

$(document).ready(function () {
  $("#contact-form").hide();

  $("#contact-butt").click(function () {
    toggle = toggle + 1;
    if (toggle % 2 == 0) {
      $("#contact-form").slideDown();
    } else {
      $("#contact-form").hide();
    }
  });
});

//function to remove hide and show the monu lists in small screens

function handleMenu() {
  console.log("hello");
  const menuList = document.getElementById("menuList");
  menuList.classList.toggle("show");
}

//Product fetching using fake api to dispaly all product page

document.addEventListener("DOMContentLoaded", function () {
  const Productpage = document.getElementById("products");

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        const productCard = `
               <a href="productDetail.html?id=${product.id}">
                    <div class="bg-white p-6 rounded-lg shadow-lg h-32">
                      <img src="${product.image}" alt="${product.title}" class="w-full  h-48 object-cover mb-4 rounded-lg">
                      <h3 class="text-lg font-semibold text-gray-800">${product.title}</h3>
                      <p class="text-gray-600 mt-2">$${product.price}</p>
                      <p class="text-gray-600 mt-2">${product.description}</p>
                  </div>
                  </a>
              `;
        Productpage.innerHTML += productCard;
      });
    })
    .catch((error) => {
      console.error("Error happend", error);
    });
});

//Product details  fetching using fake api to dispaly producy details  page

document.addEventListener("DOMContentLoaded", function () {
  const productDetailsContainer = document.getElementById("product-details");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      const productDetails = `
                  <div class="flex">
                      <img src="${product.image}" alt="${product.title}" class="w-m  h-auto rounded-lg mb-4 mr-8">
                      <div class="w-m">
                          <h2 class="text-2xl font-bold text-gray-800 mb-4">${product.title}</h2>
                          <p class="text-gray-600 mb-4">$${product.price}</p>
                          <p class="text-gray-600 mb-4">${product.description}</p>
                          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">Add to Cart</button>
                      </div>
                  </div>
              `;
      productDetailsContainer.innerHTML = productDetails;
    })
    .catch((error) => {
      console.error("Error happened");
    });
});

//Registration validation for on change==========================================

function handelChange() {
  const errorWarning = document.querySelectorAll(".error");
  const errorBoarder = document.querySelectorAll(".fields");

  errorWarning.forEach((message) => (message.textContent = ""));
  errorBoarder.forEach((boarder) => boarder.classList.remove("error-boarder"));

  document.getElementById("fname-error").textContent = "";
  document.getElementById("lname-error").textContent = "";
  console.log("hellooo");
  let fname = document.getElementById("fname");
  fname.classList.remove("error-boarder");

  let lname = document.getElementById("lname");
  lname.classList.remove("error-boarder");

  let email = document.getElementById("email");
  email.classList.remove("error-boarder");

  let password = document.getElementById("password");
  password.classList.remove("error-boarder");

  if (fname.value.length > 0) {
    if (fname.value.length <= 2) {
      document.getElementById("fname-error").textContent =
        "Please enter a First name with more than 2 letters";

      fname.classList.add("error-boarder");
    }
  }
  if (lname.value.length > 0) {
    if (lname.value.length <= 2) {
      document.getElementById("lname-error").textContent =
        "Please enter a Last name with more than 2 letters";

      lname.classList.add("error-boarder");
    }
  }
}

function calculateAge() {
  var dobInput = document.getElementById("dob");
  var ageInput = document.getElementById("age");
  var dobError = document.getElementById("dob-error");

  var dob = new Date(dobInput.value);
  var today = new Date();
  var fifteenYearsAgo = new Date(
    today.getFullYear() - 15,
    today.getMonth(),
    today.getDate()
  );

  // Validate if DOB is in the future
  if (dob > today) {
    dobInput.classList.add("error-boarder");
    document.getElementById("dob-error").textContent =
      "Please a valid Date of birth";
    ageInput.value = "";
    return;
  } else if (dob > fifteenYearsAgo) {
    dobInput.classList.add("error-boarder");
    document.getElementById("dob-error").textContent =
      "Booy,,,You are a kid,..Come back when you are above 15,,, future Warior...";
    ageInput.value = "";
    return;
  } else {
    dobInput.classList.remove("error-boarder");
    document.getElementById("dob-error").textContent = "";
  }

  // Calculating the  age
  var age = today.getFullYear() - dob.getFullYear();
  ageInput.value = age;
}

//=======TO do Logic

function addTask() {
  var task = document.getElementById("task");
  var showTask = document.getElementById("taskList");

  // Create new li element in the UL to show the enterd task
  var li = document.createElement("li");
  li.innerHTML = `
      <span>${task.value}</span>
      <button onclick="removeTask(this)">Remove</button>`;
  showTask.appendChild(li);

  // Clear input field once the task is added
  task.value = "";
}

function removeTask(button) {
  var li = button.parentElement;
  li.remove();
}

//Dark mode logic (2 nd implementation of J quey)
let k = 1;

$("#buttTheme").click(function () {
  console.log("hello");
  if (k % 2 == 0) {
    $("#buttTheme").text("Dark mode");
  } else {
    $("#buttTheme").text("Light mode");
  }
  k++;
  $("#regForm").toggleClass("dark-mode");
});

//Calculator logic

function addToDisplay(value) {
  displayValue += value;
  updateDisplay();
}

function clearDisplay() {
  displayValue = "0";
  operator = "";
  firstOperand = "";
  secondOperand = "";
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("display").innerText = displayValue;
}

function calculate() {
  try {
    displayValue = eval(displayValue).toString();
    updateDisplay();
  } catch (error) {
    displayValue = "Error";
    updateDisplay();
  }
}

function setOperator(op) {
  if (operator !== "") {
    calculate();
  }
  operator = op;
  firstOperand = displayValue;
  displayValue = "0";
  updateDisplay();
}

// Functionality set operator when oprtaor button  clicks
document.querySelectorAll(".operator").forEach((item) => {
  item.addEventListener("click", (event) => {
    setOperator(event.target.innerText);
  });
});




//Email sending.......==================================

