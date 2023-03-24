console.log("client side server running on 3000");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.getElementById(1);
const msg2 = document.getElementById(2);

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);

    msg1.textContent="Loading...";
    msg2.textContent = ''

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          msg1.textContent = data.error
        } else {
          console.log(data);
          msg1.textContent = `${data.location}`
          msg2.textContent = data.forcastData
          console.log(data.forcastData);
        }
      });
    }
  );
});
