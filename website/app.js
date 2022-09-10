/* Global Variables */
//General variables
let ZipData;
let FeelingsData;
//Dom variables
const button = document.querySelector("#generate");
const Zip = document.querySelector("#zip");
const feeling = document.querySelector("#feelings");
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
//api
const units = `&units=metric`;
const apiKey = `&appid=6f11ab13af8988f88733aa4e073691f2${units}`;
let url = `https://api.openweathermap.org/data/2.5/weather?zip=`;
let api = "";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = ` ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

//setting the default value of date div to new date
const DateDiv = document.querySelector("#date");
DateDiv.innerText = `Today's Date:${newDate}`;

//functions
//MAIN FUNCTION
button.addEventListener("click", async () => {
  //getting the data from user
  GetData();
  try {
    //fetching the weather from url AND storing in the backend
    const Tempv = await Action();
    SaveData(Tempv);
  } catch (error) {
    alert("couldnt fetch Data, please make sure the zipCode is in USA");
    return;
  }
  // fetching Data from the backennd
  try {
    const Data = await retrieveData();
    //UPDATING THE DOM
    UpdatingTheDOM(Data);
  } catch (error) {
    alert("server is offline,Read the readme.md");
    return;
  }
});

//SUB FUNCTIONS
const GetData = () => {
  newDate = ` ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  FeelingsData = feeling.value;
  ZipData = Zip.value;
  api = url + ZipData + apiKey;
};

const Action = async () => {
  const res = await fetch(api);
  const data = await res.json();
  const tempV = data.main.temp;
  return tempV;
};

const SaveData = async (tempV) => {
  const Save = await fetch("/SaveData", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      tempV,
      FeelingsData,
      newDate,
    }),
  });
  const info = await Save.json();
  console.log(info.status);
};

const retrieveData = async () => {
  const res = await fetch("/all");
  const Data = await res.json();
  console.log(Data);
  return Data;
};

const UpdatingTheDOM = ({ newDate, tempV, FeelingsData }) => {
  date.innerText = `Today's Date: ${newDate}`;
  temp.innerText = `Temperature: ${tempV}°C`;
  content.innerText = `Feeling: ${FeelingsData}`;
};
