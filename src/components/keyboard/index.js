import React, { useEffect, useState } from "react";
import { AuthContext } from "../../providers/auth";
import "./styles.css";
// import Delete from "../../../public/images/icons/delete.svg";

const Keyboard = (props) => {
  const { keys, setKeys } = React.useContext(AuthContext);
  const propsContext = React.useContext(AuthContext);
  const MudarText = (letter, index) => {
    if (index < 5) {
      const backup = propsContext.inputContent;
      backup[index].content = letter;

      if (letter !== "") {
        propsContext.setActiveInput(propsContext.activeInput + 1);
      } else {
        propsContext.setActiveInput(propsContext.activeInput - 1);
      }

      return backup;
    }
    return propsContext.inputContent;
  };

  return (
    <section>
      <div className="letters-area">
        {keys.map((item, key) => (
          <button
            className={`letters ${item.className}`}
            onClick={() =>
              propsContext.SetInputContent(
                MudarText(item.letter, propsContext.activeInput, item.delete)
              )
            }
          >
            {item.delete ? (
              <img
                src="./images/icons/delete.svg"
                style={{ height: 18, width: 18 }}
              ></img>
            ) : (
              item.letter
            )}
          </button>
        ))}
        <button
          style={{ width: 96, marginLeft: 5 }}
          className="letters"
          onClick={() => {
            propsContext.setEnterButtonClick(!propsContext.enterButtonClick);
          }}
        >
          ENTER
        </button>
      </div>
    </section>
  );
};

export default Keyboard;
