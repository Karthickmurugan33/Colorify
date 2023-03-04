import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTaker } from "../../store/redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import style from "./ColorChanger.module.css";
// import { actionTaker } from "../../store/redux";
const ColorChanger = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const idToken = useSelector((state) => state.idToken);
  const [red, setred] = useState(0);
  const [green, setgreen] = useState(0);
  const [blue, setblue] = useState(0);
  const [fecthColor, setFetchColor] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const redHanlder = (event) => {
    setred(event.target.value);
  };
  const greenHanlder = (event) => {
    setgreen(event.target.value);
  };
  const blueHanlder = (event) => {
    setblue(event.target.value);
  };

  const logutHanlder = () => {
    dispatch(actionTaker.isLogout());
    localStorage.removeItem("user");
    history.replace("/");
  };

  const addColorHandler = async (event) => {
    event.preventDefault();
    const userid = localStorage.getItem("user");

    await axios
      .post(
        `https://fir-9d689-default-rtdb.firebaseio.com/colorss/${userid}.json`,
        {
          red: red,
          green: green,
          blue: blue,
        }
      )
      .then((resolve) => {
        getDataToAxios();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const getDataToAxios = async () => {
    const userId = localStorage.getItem("user");
    setIsLoading(true);
    axios
      .get(
        `https://fir-9d689-default-rtdb.firebaseio.com/colorss/${userId}.json`
      )
      .then((resolve) => {
        console.log("idd", resolve);
        let value = [];
        for (let key in resolve.data) {
          let objValue = {
            key: key,
            red: resolve.data[key].red,
            green: resolve.data[key].green,
            blue: resolve.data[key].blue,
          };
          value.push(objValue);
        }
        setFetchColor(value);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    getDataToAxios();
  }, []);

  const editHandler = (id) => {
    setIsLoading(true);
    const userid = localStorage.getItem("user");
    const editColor = {
      red: red,
      green: green,
      blue: blue,
    };
    axios
      .put(
        `https://fir-9d689-default-rtdb.firebaseio.com/colorss/${userid}/${id}.json`,
        editColor
      )
      .then((resolve) => {
        getDataToAxios();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeHanlder = (id) => {
    const deleteId = localStorage.getItem("user");
    setIsLoading(true);
    axios
      .delete(
        `https://fir-9d689-default-rtdb.firebaseio.com/colorss/${deleteId}/${id}.json`
      )
      .then((resolve) => {
        console.log(resolve);
        getDataToAxios();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className={style.main}>
        <nav>
          <button onClick={logutHanlder}>Logout</button>
        </nav>
        <header>
          <div
            style={{
              width: "8rem",
              height: "8rem",
              position: "relative",
              left: "6rem",
              top: "1rem",
              backgroundColor: `rgba(${red}, ${green}, ${blue})`,
            }}
          ></div>
          <div className={style.input_Value}>
            <input
              type="range"
              min={"0"}
              max={"255"}
              value={red}
              onChange={redHanlder}
            />{" "}
            <br />
            <input
              type="range"
              min={"0"}
              max={"255"}
              value={green}
              onChange={greenHanlder}
            />{" "}
            <br />
            <input
              type="range"
              min={"0"}
              max={"255"}
              value={blue}
              onChange={blueHanlder}
            />
          </div>

          <div className={style.action_home}>
            <button onClick={addColorHandler}>Add Color</button>
          </div>
        </header>

        {!isloading ? (
          <div className={style.getColorFromFetch}>
            {fecthColor.map((color) => {
              return (
                <main key={color.key}>
                  <div
                    style={{
                      width: "8rem",
                      height: "8rem",
                      backgroundColor: `rgba(${color.red}, ${color.green}, ${color.blue})`,
                    }}
                  >
                    <img
                      onClick={() => {
                        editHandler(color.key);
                      }}
                      className={style.edit}
                      src="https://adityabhoir777.github.io/colorify/assets/pencil-8a15c3ef.png"
                    />
                    <img
                      onClick={() => {
                        removeHanlder(color.key);
                      }}
                      className={style.remove}
                      src="https://adityabhoir777.github.io/colorify/assets/remove-f143b868.png"
                    />
                  </div>
                </main>
              );
            })}
          </div>
        ) : (
          <footer>
            <h1>Loading....</h1>

            <div className={style.result}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default ColorChanger;
