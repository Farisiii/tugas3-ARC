const axios = require("axios");

axios
  .get(
    "https://api.aladhan.com/v1/calendar/2017/4?latitude=51.508515&longitude=-0.1254872&method=2http://api.aladhan.com/v1/calendar/2019?latitude=51.508515&longitude=-0.1254872&method=2"
  )
  .then((res) => {
    const data = res.data;
    // menampilkan keseluruhan data
    console.log(data);

    // menampilkan data kesatu
    console.log(data.data[0]);

    // menampilkan timings untuk data ke 17 pada API
    console.log(data.data[16].timings);
  })
  .catch((error) => {
    console.log(error);
  });
