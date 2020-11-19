import "./App.css";
import styled, { keyframes } from "styled-components";

import React, { useState } from "react";
import { MdContentCopy, MdClear } from "react-icons/md";
import engToThainLanguage from "./engToThaiLanguage.js";

function App() {
  const [textarea, settextarea] = useState({
    height: 36,
    minRows: 5,
    curRows: 5,
    textvalue: "",
    textTrans: "",
  });

  const [isCopy, setIsCopy] = useState(false);

  const transfromtext = (value) => {
    return value
      .split("")
      .map((item) => {
        return engToThainLanguage[item];
      })
      .join("");
  };

  const onChangeTextArea = (event) => {
    const previousRows = event.target.rows;
    //รีเซ็ตบรรทัดล่างสุดที่ไม่มีอะไรจนถึง minRows
    event.target.rows = textarea.minRows;

    const currentRows = Math.trunc(event.target.scrollHeight / textarea.height);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    let textTrans = transfromtext(event.target.value);

    settextarea({
      ...textarea,
      curRows: currentRows,
      textvalue: event.target.value,
      textTrans,
    });
  };
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Navbar>
        <nav>
          <h3>
            <span>Forgot</span> to Change Language
          </h3>
        </nav>
      </Navbar>
      <Header>
        <h1>
          เปลี่ยนภาษา <span>อังกฤษ</span> ให้เป็นภาษา <span>ไทย</span>
        </h1>
      </Header>
      <MainInputDiv textareaheight={textarea.height}>
        <MdContentCopy
          style={{ display: `${textarea.textvalue ? "block" : "none"}` }}
          size="1.8em"
          className="copyicon"
          onClick={() => {
            navigator.clipboard.writeText(textarea.textTrans);
            setIsCopy(true);
            setTimeout(() => {
              setIsCopy(false);
            }, 3000);
          }}
        />
        <MdClear
          style={{ display: `${textarea.textvalue ? "block" : "none"}` }}
          size="2em"
          className="clearicon"
          onClick={() => {
            settextarea({
              ...textarea,
              textvalue: "",
              textTrans: "",
              curRows: 5,
            });
          }}
        />
        <textarea
          onChange={onChangeTextArea}
          value={textarea.textvalue}
          rows={textarea.curRows}
          placeholder="Enter your text"
          style={{ borderRight: "none", borderRadius: "10px 0px 0px 10px" }}
        />
        <textarea
          readOnly
          value={textarea.textTrans}
          onChange={onChangeTextArea}
          rows={textarea.curRows}
          style={{
            borderRadius: "0px 10px 10px 0px",
            backgroundColor: "#f7f7f7",
            cursor: "default",
          }}
        />
      </MainInputDiv>
      <Snackbar className={isCopy ? "show" : ""}>
        <p>Copied to clipboard</p>
      </Snackbar>
    </div>
  );
}

const fadein = keyframes`
from {bottom: 0px; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
`;

const fadeout = keyframes`
from {bottom: 30px; opacity: 1;}
  to {bottom: -30px; opacity: 0;}
`;

const Navbar = styled.div`
  font-family: "Montserrat", sans-serif;
  box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
  font-size: 18px;
  height: 64px;
  width: 100%;
  background-color: #f5f5f5;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  nav {
    width: 90%;
    margin: 0 auto;
    span {
      color: #a30000;
    }
  }
`;

const Snackbar = styled.div`
  visibility: hidden;
  height: 48px;
  width: 276px;
  font-size: 17px;
  position: fixed;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  right: 30px;
  bottom: 0px;
  border: 1px solid #ccc;
  border-left: 8px brown solid;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgb(0, 0, 0, 0.2);

  &.show {
    visibility: visible;
    animation: ${fadein} 0.5s forwards, ${fadeout} 0.5s forwards 2s;
  }
`;

const Header = styled.header`
  font-family: "Prompt", sans-serif;
  height: auto;
  min-height: 226px;
  width: 100%;
  margin: 0px auto 30px auto;
  padding-top: 94px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  div {
    height: 42px;
    width: 70%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h1 {
    font-size: 40px;
    span {
      display: inline-block;
      cursor: pointer;
      color: #a30000;
      :after {
        display: block;
        content: "";
        border-bottom: solid 3px #a30000;
        transform: scaleX(0);
        transform-origin: 0% 100%;
        transition: transform 250ms ease-in-out;
      }
      :hover {
        :after {
          transform: scaleX(1);
        }
      }
    }
  }
`;

const MainInputDiv = styled.div`
  height: auto;
  width: 70%;
  margin: 0px auto 25px auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  textarea {
    max-height: 700px;
    font-family: "Prompt", sans-serif;
    line-height: ${(props) => props.textareaheight}px;
    font-size: 24px;
    padding: 15px 92px 15px 15px;
    width: 100%;
    outline: none;
    resize: none;
    border: 1px solid #ccc;
    border-radius: 10px 0 0 10px;
    box-shadow: 2px 2px 10px rgb(0, 0, 0, 0.2);
  }
  .copyicon {
    position: absolute;
    right: 2%;
    top: 20px;
    color: #919191;
    cursor: pointer;
    :hover {
      color: #a30000;
    }
  }
  .clearicon {
    position: absolute;
    left: 46%;
    top: 16px;
    color: #919191;
    cursor: pointer;
    :hover {
      color: #a30000;
    }
  }
`;

export default App;
