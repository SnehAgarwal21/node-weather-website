console.log("Client side JS loaded");

// client side js
//clien tside api callout
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const para1 = document.querySelector("#message-1");
const para2 = document.querySelector("#message-2");

const getWeatherData = (location) => {
  para1.textContent = "Loading...";
  para2.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          // console.log(data.error);
          para1.textContent = data.error;
        } else {
          // console.log(data.location);
          // console.log(data.temperature);
          para1.textContent = `Location: ${data.location}`;
          para2.textContent = `Temperature: ${data.temperature} °C`;
        }
      });
    }
  );
};

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault(); //do not reload the page after form submit-this is default behaviour
  const location = search.value;
  getWeatherData(location);
});
