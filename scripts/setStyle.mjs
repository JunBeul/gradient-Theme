const writeDate = document.querySelector(".date");
const writeTime = document.querySelector(".time");
const clockBox = document.querySelector(".date-time");
const mainText = document.querySelector(".main-text");
const body = document.querySelector("html");
const keyboardText = document.querySelector(".typing-text");
const keyboardBox = document.querySelector(".keyboard-box");
const container = document.querySelector(".container");

export function updateStyle(setStyle) {
  //테마
  body.setAttribute("class", setStyle.palette);

  // 시계 비활성화
  if (setStyle.clockdisable) {
    writeDate.style.display = "none";
    writeTime.style.display = "none";
  } else {
    writeDate.style.display = "block";
    writeTime.style.display = "block";
  }
  // 날짜
  if (setStyle.date.bold) {
    writeDate.style.fontWeight = "bolder";
  } else {
    writeDate.style.fontWeight = "normal";
  }
  writeDate.style.fontSize = `${setStyle.date.size}em`;
  // 시간
  if (setStyle.time.bold) {
    writeTime.style.fontWeight = "bolder";
  } else {
    writeTime.style.fontWeight = "normal";
  }
  writeTime.style.fontSize = `${setStyle.time.size}em`;
  // 시계 위치
  clockBox.style.left = `${setStyle.clockPosition.X}%`;
  clockBox.style.top = `${setStyle.clockPosition.Y}%`;

  // 텍스트
  mainText.textContent = setStyle.text.sentence;
  mainText.style.fontSize = `${setStyle.text.size}em`;
  if (setStyle.text.bold) {
    mainText.style.fontWeight = "bolder";
  } else {
    mainText.style.fontWeight = "normal";
  }
  mainText.style.left = `${setStyle.text.X}%`;
  mainText.style.top = `${setStyle.text.Y}%`;
  if (setStyle.text.disable) {
    mainText.style.display = "none";
  } else {
    mainText.style.display = "block";
  }

  // 키보드 텍스트
  if (setStyle.keyboard.textDisable) {
    keyboardText.style.display = "none";
  } else {
    keyboardText.style.display = "block";
  }
  if (setStyle.keyboard.textBold) {
    keyboardText.style.fontWeight = "bolder";
  } else {
    keyboardText.style.fontWeight = "normal";
  }
  keyboardText.style.fontSize = `${setStyle.keyboard.textSize}em`;
  keyboardText.style.marginBottom = `${setStyle.keyboard.gap}em`;
  keyboardText.style.textAlign = setStyle.keyboard.align;

  // 키보드
  if (setStyle.keyboard.keyDisable) {
    keyboardBox.style.display = "none";
  } else {
    keyboardBox.style.display = "block";
  }
  keyboardBox.style.width = `${setStyle.keyboard.keySize}px`;
  container.style.left = `${setStyle.keyboard.X}%`;
  container.style.top = `${setStyle.keyboard.Y}%`;
}
