import React, { useState, useEffect } from "react";
import "./TextEditor.css";

const TextEditor = () => {
  const [text, setText] = useState("");
  const [styles, setStyles] = useState({
    color: "black",
    fontFamily: "Arial",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
    isBold: false,
    isItalic: false,
    isUnderline: false,
  });

  // Восстановление текста из localStorage
  useEffect(() => {
    const savedText = localStorage.getItem("text");
    if (savedText) setText(savedText);
  }, []);

  // Автосохранение текста
  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  // Изменение стиля текста
  const handleStyleChange = (styleType) => {
    setStyles((prevStyles) => {
      const newStyles = { ...prevStyles };

      if (styleType === "bold") {
        newStyles.isBold = !prevStyles.isBold;
        newStyles.fontWeight = newStyles.isBold ? "bold" : "normal";
      } else if (styleType === "italic") {
        newStyles.isItalic = !prevStyles.isItalic;
        newStyles.fontStyle = newStyles.isItalic ? "italic" : "normal";
      } else if (styleType === "underline") {
        newStyles.isUnderline = !prevStyles.isUnderline;
        newStyles.textDecoration = newStyles.isUnderline ? "underline" : "none";
      }

      return newStyles;
    });
  };


  // Изменение цвета текста
  const handleColorChange = (color) => {
    setStyles((prevStyle) => ({
      ...prevStyle,
      color,
    }));
  };

  // Изменение шрифта текста
  const handleFontChange = (fontFamily) => {
    setStyles((prevStyle) => ({
      ...prevStyle,
      fontFamily,
    }));
  };

  // Очистка форматирования
  const clearFormatting = () => {
    setStyles({
      color: "black",
      fontFamily: "Arial",
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
    });
  };

  // Загрузка текста из файла
  const loadText = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Сохранение текста в файл
  const saveText = () => {
    const blob = new Blob([text], {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "text-editor-content.txt";
    link.click();
  };

  return (
    <div className="text-editor">
      <div className="toolbar">
        <div className="toolbar-row">
          <button onClick={() => handleStyleChange("bold")}>
            <i className={`fas fa-bold ${styles.isBold ? "active" : ""}`}></i>
          </button>
          <button onClick={() => handleStyleChange("italic")}>
            <i className={`fas fa-italic ${styles.isItalic ? "active" : ""}`}></i>
          </button>
          <button onClick={() => handleStyleChange("underline")}>
            <i className={`fas fa-underline ${styles.isUnderline ? "active" : ""}`}></i>
          </button>
          <select onChange={(e) => handleColorChange(e.target.value)}>
            <option value="black"> Black </option>{""}
            <option value="red"> Red </option>{""}
            <option value="blue"> Blue </option>{""}
            <option value="green"> Green </option>{""}
          </select>{""}
          <select onChange={(e) => handleFontChange(e.target.value)}>
            <option value="Arial"> Arial </option>{""}
            <option value="Courier New"> Courier New </option>{""}
            <option value="Georgia"> Georgia </option>{""}
            <option value="Times New Roman"> Times New Roman </option>{""}
            <option value="Verdana"> Verdana </option>{""}
          </select>
          <button onClick={clearFormatting}>
            <i className="fas fa-eraser"> </i>{""}
          </button>{""}
        </div>{""}
        <div className="toolbar-row">
          <input type="file" accept=".txt" onChange={loadText} />{""}
          <button onClick={saveText}>
            <i className="fas fa-save"> </i>{""}
          </button>{""}
        </div>{""}
      </div>

      <textarea
        className="text-area"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Напишите, что вашей душе угодно..."
        style={text ? styles : {}}
      />
    </div>
  );
};

export default TextEditor;
