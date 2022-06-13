/* Global Variables */
let type = "";
baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
apiKey = "&units=imperial&appid=b749e9d4ae56ba23908e47b4f29f2332";

// get button element
let button = document.querySelector("#generate");

/*
 *add click event to the button element
 *  to start GET, POST routes
 */
button.addEventListener("click", () => {
	// take input values
	let zip = document.getElementById("zip").value;
	let city = document.getElementById("city").value;
	type = city !== "" ? `q=${city}` : `zip=${zip}`;

	// take textarea value
	let textarea = document.getElementById("feelings").value;

	getOpenWeather()
		.then((data) => appendData(data, textarea))
		.then((data) => (document.querySelector("#entryHolder").style.display = "flex"));
});

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

//GET OpenWeather api
const getOpenWeather = async () => {
	const response = await fetch(baseUrl + type + apiKey);
	try {
		const data = await response.json();
		if (data.cod === "404") {
			errorMsg();
		} else {
			return data;
		}
	} catch (e) {
		console.log("error", e);
	}
};

// append results in the page
let appendData = (data = {}, text) => {
	document.querySelector(".entry").scrollIntoView({ behavior: "smooth" });
	document.getElementById("name").innerHTML = data.sys.country;
	document.getElementById("fer").innerHTML = data.main.temp.toFixed(1) + `<span>F</span>`;
	document.getElementById("cel").innerHTML = ((data.main.temp - 32) * 0.5556).toFixed(1) + `<span>C</span>`;
	document.getElementById("maxfer").innerHTML = data.main.temp_max.toFixed(1) + `<span>F</span>`;
	document.getElementById("maxcel").innerHTML =
		((data.main.temp_max - 32) * 0.5556).toFixed(1) + `<span>C</span>`;
	document.getElementById("minfer").innerHTML = data.main.temp_min.toFixed(1) + `<span>F</span>`;
	document.getElementById("mincel").innerHTML =
		((data.main.temp_min - 32) * 0.5556).toFixed(1) + `<span>C</span>`;
	document.getElementById("date").innerHTML = newDate;
	document.getElementById("content").innerHTML = text;
};

// error msg if input was wrong
function errorMsg() {
	document.querySelector(".error").style.display = "block";
	document.querySelector(".back").style.display = "block";
}

//Event to hide error msg
let eButton = document.getElementById("again");
eButton.addEventListener("click", () => {
	location.reload(true);
});
