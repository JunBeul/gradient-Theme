import * as setStyle from "./setStyle.mjs";
import * as setContent from "./setContent.mjs";

// 기본값
function DefaultValue() {
  this.clockdisable = false;
  this.date = {
    bold: false,
    size: 9,
  };
  this.time = {
    bold: true,
    size: 3,
  };
  this.clockPosition = {
    X: 15,
    Y: 50,
  };
  this.palette = "deepsea";
  this.text = {
    disable: false,
    sentence: "Now, Im waiting here in this place.",
    bold: true,
    size: 3,
    X: 50,
    Y: 50,
  };
  this.keyboard = {
    textDisable: false,
    sentence: "Hello World!!",
    textBold: false,
    textSize: 3,
    gap: 0,
    align: "center",
    keyDisable: false,
    keySize: 1200,
    X: 50,
    Y: 50,
    sound: false,
    speed: 500,
  };
}

let settings = new DefaultValue();

window.wallpaperPropertyListener = {
  applyUserProperties: function (properties) {
    if (properties.datebold) {
      // 날짜 굵기
      settings.date.bold = properties.datebold.value;
    }
    if (properties.datefontsize) {
      // 날짜 폰트 크기
      settings.date.size = properties.datefontsize.value;
    }
    if (properties.timebold) {
      // 시간 굵기
      settings.time.bold = properties.timebold.value;
    }
    if (properties.timefontsize) {
      // 시간 폰트 크기
      settings.time.size = properties.timefontsize.value;
    }
    if (properties.clockpositionx) {
      // 시계 X 좌표
      settings.clockPosition.X = properties.clockpositionx.value;
    }
    if (properties.clockpositiony) {
      // 시계 Y 좌표
      settings.clockPosition.Y = properties.clockpositiony.value;
    }
    if (properties.clockdisable) {
      // 시계 비활성화화
      settings.clockdisable = properties.clockdisable.value;
    }
    if (properties.colorpreset) {
      // 컬러 프리셋
      settings.palette = properties.colorpreset.value;
    }
    if (properties.sentence) {
      // 문구
      settings.text.sentence = properties.sentence.value;
    }
    if (properties.textfontsize) {
      settings.text.size = properties.textfontsize.value;
    }
    if (properties.textbold) {
      settings.text.bold = properties.textbold.value;
    }
    if (properties.textpositionx) {
      settings.text.X = properties.textpositionx.value;
    }
    if (properties.textpositiony) {
      settings.text.Y = properties.textpositiony.value;
    }
    if (properties.textdisable) {
      settings.text.disable = properties.textdisable.value;
    }
    if (properties.texttypingdisable) {
      settings.keyboard.textDisable = properties.texttypingdisable.value;
    }
    if (properties.texttypingbold) {
      settings.keyboard.textBold = properties.texttypingbold.value;
    }
    if (properties.texttypingsize) {
      settings.keyboard.textSize = properties.texttypingsize.value;
    }
    if (properties.texttypinggap) {
      settings.keyboard.gap = properties.texttypinggap.value;
    }
    if (properties.texttypingalign) {
      settings.keyboard.align = properties.texttypingalign.value;
    }
    if (properties.keyboarddisable) {
      settings.keyboard.keyDisable = properties.keyboarddisable.value;
    }
    if (properties.keyboardsize) {
      settings.keyboard.keySize = properties.keyboardsize.value;
    }
    if (properties.keyboardpositionx) {
      settings.keyboard.X = properties.keyboardpositionx.value;
    }
    if (properties.keyboardpositiony) {
      settings.keyboard.Y = properties.keyboardpositiony.value;
    }
    if (properties.texttypingsentence) {
      settings.keyboard.sentence = properties.texttypingsentence.value;
    }
    if (properties.typingsound) {
      settings.keyboard.sound = properties.typingsound.value;
    }
    if (properties.typingspeed) {
      settings.keyboard.speed = properties.typingspeed.value;
    }
    setStyle.updateStyle(settings);
    setContent.simulateTyping(
      settings.keyboard.sentence,
      settings.keyboard.speed
    );
    setContent.getSoundSelect(settings.keyboard.sound);
  },
};
