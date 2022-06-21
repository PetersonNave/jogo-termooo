import React, { useEffect, useState } from "react";
import { AuthContext } from "../../providers/auth";
import "./styles.css";
// import Delete from "../../../public/images/icons/delete.svg";

const Keyboard = (props) => {
  const { keys, setKeys } = React.useContext(AuthContext);

  const [position, setPosition] = useState(1);
  const MudarText = (letter, index) => {
    if (index < 5) {
      const backup = props.inputContent;
      backup[index].content = letter;

      if (letter !== "") {
        props.setActiveInput(props.activeInput + 1);
      } else {
        props.setActiveInput(props.activeInput - 1);
      }

      return backup;
    }
    return props.inputContent;
  };

  return (
    <section>
      <div className="letters-area">
        {keys.map((item, key) => (
          <button
            className={`letters ${item.className}`}
            onClick={() =>
              props.SetInputContent(
                MudarText(item.letter, props.activeInput, item.delete)
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
            props.setEnterButtonClick(!props.enterButtonClick);
          }}
        >
          ENTER
        </button>
      </div>
    </section>
  );
};

export default Keyboard;
