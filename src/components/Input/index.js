import React, { useEffect, useState } from "react";
import "./styles.css";
import api from "../../services/api";
import PalavraDoDia from "../../palavraDoDia";
import { AuthContext } from "../../providers/auth";

const Input = (props) => {
  const [letrasIguais, setLetrasIguais] = useState(0);
  const { keys, setKeys } = React.useContext(AuthContext);
  const propsContext = React.useContext(AuthContext);
  const currentRow = propsContext.activeRow == props.row;

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
  }, [propsContext.enterButtonClick]);
  useEffect(() => {
    if (propsContext.activeRow > props.row) {
      for (var i = 0; i < backgroundColorInputStyle.length; i++) {
        if (
          backgroundColorInputStyle[i].backgroundColor !== "greenBackground"
        ) {
          return;
        }
      }
      alert("PARABÉNS! VOCÊ VENCEU");
    }
  }, [propsContext.activeRow]);

  function Valida() {
    const palavra =
      propsContext.inputContent[0].content +
      propsContext.inputContent[1].content +
      propsContext.inputContent[2].content +
      propsContext.inputContent[3].content +
      propsContext.inputContent[4].content;

    if (palavra.length === 5) {
      VerificaSePalavraExiste(palavra);
    } else {
    }
  }

  const VerificaSePalavraExiste = (palavra) => {
    if (currentRow) {
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
      propsContext.setActiveRow(propsContext.activeRow + 1);
      propsContext.SetInputContent([
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

  const MudarText = (e, index) => {
    console.log(e.target.value);
    const backup = propsContext.inputContent;
    backup[index].content = e.target.value;

    return backup;
  };

  return (
    <div>
      <div className="inputArea">
        {propsContext.inputContent.map((item, i) => (
          <div>
            {propsContext.activeRow !== props.row ? (
              <input
                readOnly
                className={`${
                  propsContext.activeRow > props.row
                    ? backgroundColorBackup[i].backgroundColor
                    : ""
                } disableInput`}
              ></input>
            ) : (
              <input
                required
                readOnly
                className={`${
                  backgroundColorBackup[i].backgroundColor
                    ? `${backgroundColorBackup[i].backgroundColor}`
                    : `${backgroundColorInputStyle[i].backgroundColor}`
                } activeInput ${
                  propsContext.activeInput === i ? "focusInput" : ""
                }  ${item.content !== "" ? "popUpInput" : ""} `}
                value={item.content}
                type="text"
                maxLength={1}
                onChange={(e) => propsContext.SetInputContent(MudarText(e, i))}
                onClick={() => {
                  propsContext.setActiveInput(i);
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
