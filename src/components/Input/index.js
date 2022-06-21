import React, { useEffect, useState } from "react";
import "./styles.css";
import api from "../../services/api";
import PalavraDoDia from "../../palavraDoDia";
import { AuthContext } from "../../providers/auth";

const Input = (props) => {
  const [letrasIguais, setLetrasIguais] = useState(0);
  const { keys, setKeys } = React.useContext(AuthContext);

  const AttDisableLetter = (lettersModify) => {
    console.log(lettersModify[0]);
    for (var i = 0; i < lettersModify.length; i++) {
      for (var j = 0; j < keys.length; j++) {
        if (lettersModify[i] === keys[j].letter) {
          const backup = keys;
          backup[j] = { letter: lettersModify[i], className: "disableKey" };
          setKeys(backup);
        } else {
        }
      }
    }
  };
  const AttAlmostLetter = (lettersModify) => {
    console.log(lettersModify[0]);
    for (var i = 0; i < lettersModify.length; i++) {
      for (var j = 0; j < keys.length; j++) {
        if (lettersModify[i] === keys[j].letter) {
          const backup = keys;
          backup[j] = { letter: lettersModify[i], className: "almostKey" };
          setKeys(backup);
        } else {
        }
      }
    }
  };
  const AttCorrectLetter = (lettersModify) => {
    console.log(lettersModify[0]);
    for (var i = 0; i < lettersModify.length; i++) {
      for (var j = 0; j < keys.length; j++) {
        if (lettersModify[i] === keys[j].letter) {
          const backup = keys;
          backup[j] = { letter: lettersModify[i], className: "correctKey" };
          setKeys(backup);
        } else {
        }
      }
    }
  };

  const [backgroundColorInputStyle, setBackgroundColorInputStyle] = useState([
    { backgroundColor: false },
    { backgroundColor: false },
    { backgroundColor: false },
    { backgroundColor: false },
    { backgroundColor: false },
  ]);
  const [backgroundColorBackup, setBackgroundColorBackup] = useState([
    { backgroundColor: false },
    { backgroundColor: false },
    { backgroundColor: false },
    { backgroundColor: false },
    { backgroundColor: false },
  ]);

  useEffect(() => {
    Valida();
  }, [props.enterButtonClick]);
  useEffect(() => {
    if (props.activeRow > props.row) {
      for (var i = 0; i < backgroundColorInputStyle.length; i++) {
        if (
          backgroundColorInputStyle[i].backgroundColor !== "greenBackground"
        ) {
          return;
        }
      }
      alert("ganhou");
    }
  }, [props.activeRow]);

  function Valida() {
    const palavra =
      props.inputContent[0].content +
      props.inputContent[1].content +
      props.inputContent[2].content +
      props.inputContent[3].content +
      props.inputContent[4].content;

    if (palavra.length === 5) {
      VerificaSePalavraExiste(palavra);
    } else {
    }
  }

  const VerificaSePalavraExiste = (palavra) => {
    if (props.activeRow == props.row) {
      api
        .get(`/${palavra}`)
        .then((response) => {
          VerificaSeTemLetraIgual(palavra);
        })
        .catch((err) => {
          alert("PALAVRA NÃO RECONHECIDA");
        });
    }
  };

  function VerificaSeTemLetraIgual(palavra) {
    if (props.activeRow == props.row) {
      var palavraDoDia = PalavraDoDia();
      var palavraUpper = palavra.toUpperCase();
      const palavraUpperCortada = palavraUpper.split("");
      const backup = backgroundColorInputStyle;
      const disableKeys = [];
      const almostKeys = [];
      const correctKeys = [];
      for (let i = 0; i < palavraDoDia.length; i++) {
        const letraAtual = palavraUpperCortada.shift();
        console.log("fui chamado");
        const indexDaPalavraDigitada = palavraDoDia.indexOf(letraAtual);
        if (indexDaPalavraDigitada == -1) {
          backup[i] = { backgroundColor: "blackBackground" };
          setBackgroundColorInputStyle(backup);
          disableKeys.push(letraAtual);
          continue;
        }

        if (letraAtual === palavraDoDia[i]) {
          setLetrasIguais(letrasIguais + 1);
          backup[i] = {
            backgroundColor: "greenBackground",
          };
          correctKeys.push(letraAtual);
        } else {
          backup[i] = {
            backgroundColor: "yellowBackground",
          };

          almostKeys.push(letraAtual);
        }
        palavraDoDia = palavraDoDia.replace(letraAtual, " ");
        setBackgroundColorInputStyle(backup);
      }

      setTimeout(() => {
        setBackgroundColorBackup(backgroundColorInputStyle);
        AttDisableLetter(disableKeys);
        AttAlmostLetter(almostKeys);
        AttCorrectLetter(correctKeys);
        props.setActiveRow(props.activeRow + 1);
      }, 1000);
      setTimeout(() => {
        props.SetInputContent([
          {
            content: "",
          },
          {
            content: "",
          },
          {
            content: "",
          },
          {
            content: "",
          },
          {
            content: "",
          },
        ]);
      }, 1000);
    }
  }

  const MudarText = (e, index) => {
    console.log(e.target.value);
    const backup = props.inputContent;
    backup[index].content = e.target.value;

    return backup;
  };

  return (
    <div>
      <div className="inputArea">
        {props.inputContent.map((item, i) => (
          <div>
            {props.activeRow !== props.row ? (
              <input
                className={`${
                  props.activeRow > props.row
                    ? backgroundColorBackup[i].backgroundColor
                    : ""
                } disableInput`}
              ></input>
            ) : (
              <input
                required
                onFocus="blur()"
                className={`${
                  backgroundColorBackup[i].backgroundColor
                    ? `${backgroundColorBackup[i].backgroundColor}`
                    : `${backgroundColorInputStyle[i].backgroundColor}`
                } activeInput ${props.activeInput === i ? "focusInput" : ""}`}
                value={item.content}
                type="text"
                maxLength={1}
                onChange={(e) => props.SetInputContent(MudarText(e, i))}
                onClick={() => {
                  props.setActiveInput(i);
                }}
              ></input>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Input;
