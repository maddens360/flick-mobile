const axios = require("axios");
const fetch = require("node-fetch");

const { default: FetchText } = require("./components/FetchText");



// async function getData() {
//     const response = await fetch('/dataFile.json');
//     const json = await response.json();
//     // console.log(json[0]);  
// }

const api_id =
"2fb3efe60be93f8b40b3e7513e7dd13eb1d385b92122af7d32eac3410097f38b";
const api_url = "https://labs.goo.ne.jp/api/hiragana";
const OUTPU_TYPE = "hiragana";

const options = {
    method: "post",
    url: api_url,
    headers: {
        "Content-Type": `application/x-www-form-urlencoded`,
        "Content-Type": `application/json`,
    },
    data: {
        app_id: api_id,
        sentence: FetchText().companyjp,
        output_type: OUTPU_TYPE,
    },
};

axios(options)
.then((res) => {
    console.log(res.data.converted.replace(/["・"' ']/g, ""));
})
.catch((err) => {
    // console.log(err);
    console.log("error!!!!!!!!!!!!");
});
// fetch("dataFile.json")
//   .then((res) => res.json())
//   .then((out) => {
//     console.log("Output: ", out);
//   })
//   .catch((err) => console.error(err));

console.log(FetchText(0));