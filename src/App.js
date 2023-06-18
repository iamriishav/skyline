import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { CiTempHigh } from "react-icons/ci";
import { LuWind } from "react-icons/lu";
import { ImEye, ImDroplet } from "react-icons/im";
import { BsArrowsCollapse } from "react-icons/bs";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=1fec584300af2dacc933ee5f046b56e4
  `;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${month} ${date} ${day}`;
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="search_box">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              type="text"
              placeholder="Enter Location"
            />
          </div>
          {data.name !== undefined ? (
            <div className="main_data">
              <div className="city">
                <h2>{data.name}</h2>
              </div>
              <div className="desc">
                <h3>{data.weather ? <p>{data.weather[0].main}</p> : null}</h3>
              </div>
              <div className="temp">
                <p>
                  {data.main ? <span>{data.main.temp.toFixed()}°C</span> : null}
                </p>
              </div>
              <div className="date">
                <p>
                  {data.main ? <span>{dateBuilder(new Date())}</span> : null}
                  &nbsp;&nbsp;&nbsp;
                  {data.main ? (
                    <span>
                      {data.main.temp_max.toFixed()}°c&nbsp;/&nbsp;
                      {data.main.temp_min.toFixed()}°c
                    </span>
                  ) : null}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
          {data.name !== undefined ? (
            <div className="secondary_data">
              <div className="feels_like">
                <CiTempHigh className="icon" />
                <p className="bold">Feels like</p>
                <p>
                  {data.main ? (
                    <span className="data">
                      {data.main.feels_like.toFixed()}
                    </span>
                  ) : null}
                  °C
                </p>
              </div>
              <div className="humidity">
                <ImDroplet className="icon" />
                <p className="bold">Humidity</p>
                <p>
                  {data.main ? (
                    <span className="data">{data.main.humidity.toFixed()}</span>
                  ) : null}
                  %
                </p>
              </div>
              <div className="wind">
                <LuWind className="icon" />
                <p className="bold">Wind speed</p>
                <p>
                  {data.main ? (
                    <span className="data">
                      {(data.wind.speed * 2.23694).toFixed()}
                    </span>
                  ) : null}
                  mi/h
                </p>
              </div>
              <div className="visibility">
                <ImEye className="icon" />
                <p className="bold">Visibility</p>
                <p>
                  {data.main ? (
                    <span className="data">
                      {data.visibility.toFixed() / 1000}
                    </span>
                  ) : null}
                  km
                </p>
              </div>
              <div className="air_pressure">
                <BsArrowsCollapse className="icon" />
                <p className="bold">Air pressure</p>
                <p>
                  {data.main ? (
                    <span className="data">{data.main.pressure.toFixed()}</span>
                  ) : null}
                  hPa
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default App;
