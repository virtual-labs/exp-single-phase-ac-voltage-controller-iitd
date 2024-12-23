// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


                
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }    
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
}

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
}

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn(){
  let nextBtn = document.querySelector(".btn-next")
  nextBtn.classList.toggle("btn-deactive")
}
const cancelSpeech = ()=>{
  window.speechSynthesis.cancel()
  ccQueue = []
}

const setIsProcessRunning = (value) => {
  // calling toggle the next
  if(value != isRunning){
    toggleNextBtn()
  }

  isRunning = value;
  if(value){
    cancelSpeech()
    Dom.hideAll()
  }
};

// global for document object
const get = (query) => {
  return document.querySelector(query);
};

const getAll = (query) => {
  return document.querySelectorAll(query);
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const 


textToSpeach = (text,speak=true) => {
  // for filter <sub></sub>
  text = text.replaceAll("<sub>"," ").replaceAll("</sub>"," ")
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  if(isMute || !speak){
    utterance.volume = 0
    utterance.rate = 10
  }
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = 25, speak = true) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: speed,
    onStringTyped(){
      ccQueue.shift()
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())`
      // }
    }
  });
  let utterance = textToSpeach(text,speak)
  return utterance
}
   

class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else if (selector instanceof HTMLElement) {
      this.item = selector;
    } else {
      this.item = src.get(selector);
    }
    this.selector = selector;
    // push
  }
  getValue() {
    return this.item.attributes["value"].value;
  }
  setValue(val) {
    this.item.attributes["value"].value = val;
  }
  hidden(isHidden) {
    if (isHidden == false) this.item.style.visibility = "visible";
    else this.item.style.visibility = "hidden";
  }
  setContent(text) {
    this.item.innerHTML = text;
    return this;
  }
  zIndex(idx) {
    this.item.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.item.style.opacity = val;
    return this;
  }
  rotate(deg) {
    this.item.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  addClass(className) {
    this.item.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.item.classList.remove(className);
    return this;
  }
  borderRadius(amount) {
    amount += "px";
    this.styles({
      borderRadius: amount,
    });
  }
  scale(val = 1) {
    this.item.style.scale = val;
    return this;
  }
  get() {
    return this.item;
  }
  left(leftPixel) {
    this.item.left = leftPixel + "px";
    return this;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null,
    disp = "block"
  ) {
    // coordinates
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.height = height;
    this.width = width;
    this.item.style.opacity = 1;
    this.item.style.transform = "translateX(0) translateY(0)";

    if (this.left !== null) this.item.style.left = String(this.left) + "px";
    if (this.top !== null) this.item.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.item.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.item.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.item.style.height = String(this.height) + "px";
    if (this.width !== null) this.item.style.width = String(this.width) + "px";
    this.show(disp);
    return this;
  }
  show(disp = "block") {
    //! push for every element
    this.push();

    this.item.style.display = disp;
    // this.opacity();
    return this;
  }
  hide() {
    this.item.style.display = "none";
    return this;
  }
  play(speed = 1) {
    this.item.play();
    this.item.playbackRate = speed;
    return this;
  }
  // for setting styles
  styles(props) {
    for (let property in props) {
      this.item.style[property] = props[property];
    }
    return this;
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj) {
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems() {
    Dom.arrayOfAnimes = [];
  }
  static hideAll() {
    //to empty the setCC
    setCC("");
    // to delete all content of content adder menu
    Scenes.items.contentAdderBox.setContent("");
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
    }
    // * reset animes
    for (let i of Dom.arrayOfAnimes) {
      // to reset each anime after back btn pressed
      i.reset();
    }
    Dom.resetItems();
  }
  static resetItems() {
    Dom.arrayOfItems = [];
  }
  static setBlinkArrowRed(
    isX = true,
    left = null,
    top = null,
    height = 30,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom(".blinkArrowRed")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = 60,
    rotate = 0
  ) {
    // because we added the blinkArrow image out of the anime-main
    top += 130;
    let blinkArrow = new Dom(".blinkArrow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  push() {
    if (this.selector != ".anime-header") Dom.arrayOfItems.push(this);
    return this;
  }
  forMathematicalExpressionBtn = 0;
}



// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  // ! To Plot graph
  plotGraph(
    ctx,
    graphIdx,
    startEmpty = false,
    xLabel = "",
    yLabel = "",
    data = [],
    dataLabel = "",
    beginAtZero = true,
  ) {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel
    Scenes.items.chart.label[graphIdx].x = xLabel
    // for label
    Scenes.items.yLabel.set(500, 188).setContent(yLabel).styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      width: "170px",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(697, 329).setContent(xLabel).styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
    });
    

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset 
    let datasets = [
      {
        label: dataLabel,
        fill: false,
        borderColor: "red",
        backgroundColor: "red",
        data: data,
        display: false,
      },
    ]

    if(startEmpty){
      datasets=[]
    }

    graphRef = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: yLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: xLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
        },
      },
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef
  },

  // for adding new datasets to graph
  graphFeatures: {
    addDataset(chart, label, bgColor, data) {
      chart.data.datasets.push({
        label: label,
        fill: false,
        borderColor: bgColor,
        backgroundColor: bgColor,
        data: data,
      });
      chart.update();
    },
    addData(chart, index, data) {
      console.log(data);
      if (data.length > 0) {
        chart.data.datasets[index].data = data;
      } else {
        chart.data.datasets[index].data.push(data);
      }
      chart.update();
    },
    getSizeOfDatasets(chart){
      return chart.data.datasets.length
    }
  },
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    tempTitle22: new Dom(".temp-title22"),
    tempTitle23: new Dom(".temp-title23"),
    tempTitle24: new Dom(".temp-title24"),
    tempTitle25: new Dom(".temp-title25"),
    tempTitle26: new Dom(".temp-title26"),
    tempTitle27: new Dom(".temp-title27"),
    tempTitle28: new Dom(".temp-title28"),
    tempTitle29: new Dom(".temp-title29"),
    tempTitle30: new Dom(".temp-title30"),
    tempTitle31: new Dom(".temp-title31"),
    tempTitle32: new Dom(".temp-title32"),
    tempTitle33: new Dom(".temp-title33"),
    tempTitle34: new Dom(".temp-title34"),
    tempTitle35: new Dom(".temp-title35"),
    tempTitle36: new Dom(".temp-title36"),
    tempTitle37: new Dom(".temp-title37"),
    tempTitle38: new Dom(".temp-title38"),
    tempTitle39: new Dom(".temp-title39"),
    tempTitle40: new Dom(".temp-title40"),
    tempTitle41: new Dom(".temp-title41"),
    tempTitle42: new Dom(".temp-title42"),
    tempTitle43: new Dom(".temp-title43"),
    tempTitle44: new Dom(".temp-title44"),
    tempTitle45: new Dom(".temp-title45"),
    tempTitle46: new Dom(".temp-title46"),
    tempTitle47: new Dom(".temp-title47"),
    tempTitle48: new Dom(".temp-title48"),
    tempTitle49: new Dom(".temp-title49"),
    tempTitle50: new Dom(".temp-title50"),
    tempTitle51: new Dom(".temp-title51"),
    tempTitle52: new Dom(".temp-title52"),
    tempTitle53: new Dom(".temp-title53"),
    tempTitle54: new Dom(".temp-title54"),
    tempTitle55: new Dom(".temp-title55"),
    tempTitle56: new Dom(".temp-title56"),
    tempTitle57: new Dom(".temp-title57"),
    tempTitle58: new Dom(".temp-title58"),
    tempTitle59: new Dom(".temp-title59"),
    tempTitle60: new Dom(".temp-title60"),

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),

//!images of previous experiment
    

part3_table_one : new Dom(".part3_table_one"),
part3_table_two : new Dom(".part3_table_two"),
part3_table_three : new Dom(".part3_table_three"),
part3_table_three_two : new Dom(".part3_table_three_two"),
part3_table_four : new Dom(".part3_table_four"),
part3_table_four_2 : new Dom(".part3_table_four_2"),
slider_vIn : new Dom(".slider_vIn"),
slider_D : new Dom(".slider_D"),
slider_R : new Dom(".slider_R"),
slider_box : new Dom(".universal-slider"),

graph0: new Dom(".graph0"),
graph1: new Dom(".graph1"),
graph2: new Dom(".graph2"),
graph3: new Dom(".graph3"),
graph4: new Dom(".graph4"),
graph5: new Dom(".graph5"),
graph6: new Dom(".graph6"),
graph7: new Dom(".graph7"),
graph8: new Dom(".graph8"),
graph9: new Dom(".graph9"),
graph10: new Dom(".graph10"),
graph_box_0: new Dom(".graph_box0"),
graph_box_1: new Dom(".graph_box1"),
graph_box_2: new Dom(".graph_box2"),
graph_box_3: new Dom(".graph_box3"),
graph_box_4: new Dom(".graph_box4"),
graph_box_5: new Dom(".graph_box5"),
graph_box_6: new Dom(".graph_box6"),
graph_box_7: new Dom(".graph_box7"),
graph_box_8: new Dom(".graph_box8"),
graph_box_9: new Dom(".graph_box9"),
graph_box_10: new Dom(".graph_box10"),
xLabel: new Dom(".xLabel"),
yLabel: new Dom(".yLabel"),
xLabel2: new Dom(".xLabel2"),
yLabel2: new Dom(".yLabel2"),



btn_delete : new Dom(".btn-delete"),
btn_reset : new Dom(".btn-reset"),


btn_check_connections: new Dom(".btn-check-connections"),
btn_circuit_diagram: new Dom(".btn-circuit-diagram"),

// Theory

// theory image removed

btn_transparent: new Dom(".btn-transparent"),

// ! Procedure formula Nomenclature images 
 
formulas_component_stress : new Dom("formulas_component_stress"),
formulas_efficiency : new Dom("formulas_efficiency"),
formulas_ideal : new Dom("formulas_ideal"),
formulas_nomenclautre : new Dom("formulas_nomenclautre"),
formulas_non_ideal : new Dom("formulas_non_ideal"),
formulas_procedure : new Dom("formulas_procedure"),
formulas_universal : new Dom("formulas_universal"),

// ! Procedure formula Nomenclature images end


// EE2 images added
btn_reset_connections: new Dom(".btn-connections"),

//! EE8 images added 

btn_plot : new Dom("btn_plot"),
btn_reset : new Dom("btn_reset"),
part_1_circuit : new Dom("part_1_circuit"),
part_1_component_1 : new Dom("part_1_component_1"),
part_1_component_1_1 : new Dom("part_1_component_1_1"),
part_1_component_1_2 : new Dom("part_1_component_1_2"),
part_1_component_2 : new Dom("part_1_component_2"),
part_1_component_2_1 : new Dom("part_1_component_2_1"),
part_1_component_2_2 : new Dom("part_1_component_2_2"),
part_1_connectiion_completed : new Dom("part_1_connectiion_completed"),
part_1_frame : new Dom("part_1_frame"),
part_1_terminal_1 : new Dom("part_1_terminal_1"),
part_1_terminal_2 : new Dom("part_1_terminal_2"),
part_1_text_1 : new Dom("part_1_text_1"),
part_1_text_2 : new Dom("part_1_text_2"),
part_2_btn_r_load : new Dom("part_2_btn_r_load"),
part_2_btn_r_l_load : new Dom("part_2_btn_r_l_load"),
part_2_circuit : new Dom("part_2_circuit"),
part_2_graph_empty : new Dom("part_2_graph_empty"),
part_2_r_load_graph_1 : new Dom("part_2_r_load_graph_1"),
part_2_r_load_graph_2 : new Dom("part_2_r_load_graph_2"),
part_2_r_load_graph_3 : new Dom("part_2_r_load_graph_3"),
part_2_r_l_load_graph_1 : new Dom("part_2_r_l_load_graph_1"),
part_2_r_l_load_graph_2 : new Dom("part_2_r_l_load_graph_2"),
part_2_r_l_load_graph_3 : new Dom("part_2_r_l_load_graph_3"),
part_2_text_for_r_load : new Dom("part_2_text_for_r_load"),
part_2_text_for_r_l_load : new Dom("part_2_text_for_r_l_load"),
part_3_circuit : new Dom("part_3_circuit"),
part_3_select_option_1 : new Dom("part_3_select_option_1"),
part_3_select_option_2 : new Dom("part_3_select_option_2"),
part_3_tab_1 : new Dom("part_3_tab_1"),
part_3_tab_2 : new Dom("part_3_tab_2"),
part_3_tab_3 : new Dom("part_3_tab_3"),
part_3_tab_4 : new Dom("part_3_tab_4"),
part_3_tab_5 : new Dom("part_3_tab_5"),
part_3_text_load_1 : new Dom("part_3_text_load_1"),
part_3_text_load_2 : new Dom("part_3_text_load_2"),
btn_record : new Dom("btn_record"),
btn_delete : new Dom("btn_delete"),
part_1_text_3 : new Dom("part_1_text_3"),
part_2_helper : new Dom("part_2_helper"),
part_2_circuit_r_load : new Dom("part_2_circuit_r_load"),
part_2_circuit_r_l_load : new Dom("part_2_circuit_r_l_load"),
part_4_circuit : new Dom("part_4_circuit"),
part_4_bulb_1 : new Dom("part_4_bulb_1"),
part_4_bulb_2 : new Dom("part_4_bulb_2"),
part_4_bulb_3 : new Dom("part_4_bulb_3"),
part_4_text : new Dom("part_4_text"),
right_tick_1 : new Dom("right_tick_1"),
right_tick_2 : new Dom("right_tick_2"),
right_tick_3 : new Dom("right_tick_3"),
right_tick_4 : new Dom("right_tick_4"),
right_tick_5 : new Dom("right_tick_5"),
part_3_alpha_text : new Dom("part_3_alpha_text"),
part_3_beta_text : new Dom("part_3_beta_text"),
r_l_load : new Dom("r_l_load"),
btn_auto : new Dom("btn_auto"),
btn_manual: new Dom("btn_manual"),
slider_v_arrow_application_step: new Dom("slider_v_arrow_application_step"),
btn_hint: new Dom("btn_hint"),
hint_box: new Dom("hint_box"),

//! new 
beta_line_blinking : new Dom("beta_line_blinking"),
bnt_click : new Dom("bnt_click"),
btn_firing_angle : new Dom("btn_firing_angle"),
btn_input_voltage : new Dom("btn_input_voltage"),
btn_load_inductance : new Dom("btn_load_inductance"),
btn_load_resistance : new Dom("btn_load_resistance"),
components_rl_load : new Dom("components_rl_load"),
components_r_load : new Dom("components_r_load"),
rl_load_click_1 : new Dom("rl_load_click_1"),
rl_load_click_2 : new Dom("rl_load_click_2"),
rl_load_click_3 : new Dom("rl_load_click_3"),
rl_load_click_4 : new Dom("rl_load_click_4"),
r_load_click_1 : new Dom("r_load_click_1"),
r_load_click_2 : new Dom("r_load_click_2"),
r_load_click_3 : new Dom("r_load_click_3"),
r_load_click_4 : new Dom("r_load_click_4"),
val_a : new Dom("val_a"),
val_l : new Dom("val_l"),
val_r : new Dom("val_r"),
val_v : new Dom("val_v"),
circle : new Dom("circle"),





//! images end here
concept_development: new Dom(".concept_development"), 
        

// ! new items dom
 domQs1: new Dom("domQs1"),
 domQs2: new Dom("domQs2"),
 domQs3: new Dom("domQs3"),
 domQs4: new Dom("domQs4"),
 domQs5: new Dom("domQs5"),
 domQs6: new Dom("domQs6"),


  chart: {
    graph: [
      graph1=null,
      graph2=null,
      graph3=null,
      graph4=null,
      graph5=null,
      graph6=null,
      graph7=null,
      graph8=null,
      graph9=null,
      graph10=null,
      graph11=null,
    ],
    label: [
      label1 = {
        x: "Label 2",
        y: "Label 1",
      },
      label2 = {
        x: "Label 2",
        y: "Label 1",
      },
      label3 = {
        x: "Label 2",
        y: "Label 1",
      },
      label4 = {
        x: "Label 2",
        y: "Label 1",
      },
      label5 = {
        x: "Label 2",
        y: "Label 1",
      },
      label6 = {
        x: "Label 2",
        y: "Label 1",
      },
      label7 = {
        x: "Label 2",
        y: "Label 1",
      },
      label8 = {
        x: "Label 2",
        y: "Label 1",
      },
      label9 = {
        x: "Label 2",
        y: "Label 1",
      },
      label10 = {
        x: "Label 2",
        y: "Label 1",
      },
      label11 = {
        x: "Label 2",
        y: "Label 1",
      },
    ]
  }


  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  optionsDone:[0,0,0,0],
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      };
      return true;
      }),
      (objective = function () {
        setIsProcessRunning(true);
        Dom.hideAll()
        // require
        Scenes.items.slider_box.hide()
        
        let btn_transparent = Scenes.items.btn_transparent.set().item;
  
        Scenes.items.concept_development.set().styles({
          zIndex: "5000",
          scale: "1 0.915",
          top: "-144px",
          position: "absolute",
        })
  
        // ! Slide ended enable the button next button
        function checkIsSlideEnded(){
          let isSlideEnded = localStorage.getItem("isSlideEnded")
          if(isSlideEnded=="true"){
            btn_transparent.disabled = false
            setIsProcessRunning(false)
            btn_transparent.classList.remove("btn-disabled")
            // setCC("Click next to goto next slide.")
            Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
            btn_transparent.onclick = ()=>{
              Scenes.next()
              localStorage.setItem("isSlideEnded",false)
              window.clearInterval(interval)
            }
          }
        }
        var interval = window.setInterval(checkIsSlideEnded, 1000)
          
        return true;
      }),
      
    //! Circuit formulation
    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.slider_box.hide()


      let frameBlink = function(){
        anime({
          targets: Scenes.items.part_1_frame.item,
          scale: [0.9, 1, 0.9, 1, 0.9],
          loop: true,
          complete(){
          }
        })
      }


      Scenes.items.part_1_circuit.set(54,100, 338, 859)
      Scenes.items.part_1_component_1.set(65, -32, 80).zIndex(1)
      Scenes.items.part_1_component_1_1.set(65, -32, 80).zIndex(1)
      Scenes.items.part_1_component_1_2.set(65, -32, 80).zIndex(1)
      Scenes.items.part_1_component_2.set(65, 40, 80).zIndex(1)
      Scenes.items.part_1_component_2_1.set(65, 40, 80).zIndex(1)
      Scenes.items.part_1_component_2_2.set(65, 40, 80).zIndex(1)
      Scenes.items.part_1_terminal_1.set(241, -12, null, 298)
      Scenes.items.part_1_terminal_2.set(241, 62, null, 298)
      Scenes.items.part_1_frame.set(552,108-5, 85)

      frameBlink()

      Scenes.items.part_1_text_1.set(679, 0, 52, 200)
      Scenes.items.part_1_text_2.set(600, -25, 125, 340).hide()
      Scenes.items.part_1_text_3.set(629, -15, 112, 276).hide()
      Scenes.items.part_1_connectiion_completed.set(620, -15, 92, 300).hide() 
      
      //! hint button code
      Scenes.items.btn_hint.set(808 + 55, 24 +  4 + 36 + 28, 36).zIndex(10)
      Scenes.items.hint_box.set(188 + 55, 24 +  52 + 28, 322).zIndex(1000).hide()

      let hint_btn = Scenes.items.btn_hint;
      hint_btn.item.onmouseenter = ()=>{
        Scenes.items.hint_box.show()
      }
      hint_btn.item.onmouseout = ()=>{
        Scenes.items.hint_box.hide()
      }
      
      Dom.setBlinkArrowRed(true, 545, -12,30,null).play()
      setCC("Select suitable thyristor for the circuit to control the voltage during the positive half cycle.")


      let setComponents = function(){
        
        let terminal1 = Scenes.items.part_1_terminal_1.item
        let terminal2 = Scenes.items.part_1_terminal_2.item

            
        let clickCount2 = 0;
        let setComponent2 = function(){
          switch(clickCount2){
            case 0: {
              anime({
                targets: Scenes.items.part_1_component_2.item,
                easing: "easeInOutQuad",
                duration: 2000,
                left: 573,
                top: 108,
      
                complete(){
                  Scenes.items.part_1_frame.set(552,194-5, 85)
                }
              })
              clickCount2++;
              break;
            }
              
            case 1: {
              anime.timeline({
                easing: "easeInOutQuad",
                duration: 2000,
                
              })
              .add({
                targets: Scenes.items.part_1_component_2_1.item,
                left: 573,
                top: 188,
  
                complete(){
        
                Dom.setBlinkArrowRed(-1)
                Scenes.items.part_1_frame.hide()
                Scenes.items.part_1_text_1.hide()
                // Scenes.items.part_1_text_2.show()
                Scenes.items.part_1_text_2.show()
              }
              })
              .add({
                delay:3000,
                complete(){
                  Scenes.items.part_1_frame.set(552,108-5, 85)
                  Scenes.items.part_1_component_2.hide()
                  Scenes.items.part_1_component_2_1.hide()
                  Scenes.items.part_1_text_1.hide()
                  Scenes.items.part_1_text_2.hide()
                  Scenes.items.part_1_text_3.show()

                  Dom.setBlinkArrowRed(true, 545, -12,30,null).play()
                }
              })
              .add({
                complete(){
                  clickCount = 2
                  setCC("Select suitable thyristor for the circuit to control the voltage during the positive and negative half cycle.")
                  terminal1.onclick = setComponent1
                }
              })
              clickCount2++;
              break;

            }
                
            case 2 : {
              anime.timeline({
                easing: "easeInOutQuad",
                duration: 2000,
                
              })
              .add({
                targets: Scenes.items.part_1_component_2_2.item,
                left: 573,
                top: 188,
  
                complete(){
                // Dom.setBlinkArrowRed(true, 545, 66,30,null).play()
                Dom.setBlinkArrowRed(-1)
                Scenes.items.part_1_text_1.hide()
                Scenes.items.part_1_text_2.hide()
                Scenes.items.part_1_text_3.hide()
           
                Scenes.items.part_1_connectiion_completed.show()
                Scenes.items.part_1_frame.hide()
              }
              })
              .add({
                delay:3000,
                complete(){
                  Scenes.items.part_1_component_2.hide()
                  Scenes.items.part_1_component_2_1.hide()
                }
              })
            .add({
              complete(){
                // after complete
                Dom.setBlinkArrow(true, 790, 408).play()
                setCC("Connections complete. Proceed for experimentation.")
                setIsProcessRunning(false)
              }
            })
            clickCount2 = 0;
            break;
          }
        } 
        }

        let clickCount = 0;
        let setComponent1 = function(){
        switch(clickCount){
          case 0: {
            anime({
              targets: Scenes.items.part_1_component_1.item,
              easing: "easeInOutQuad",
              duration: 2000,
              left: 573,
              top: 108,
    
              complete(){
                Scenes.items.part_1_frame.set(552,194-5, 85)
              }
            })
            clickCount++;
            break;
          }

          case 1: {
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
              
            })
            .add({
              targets: Scenes.items.part_1_component_1_1.item,
              left: 573,
              top: 188,

              complete(){
                setCC("This circuit controls power in positive half cycle and gives Positive DC output voltage.")
              Dom.setBlinkArrowRed(-1)
              Scenes.items.part_1_frame.hide()
              Scenes.items.part_1_text_1.hide()
              Scenes.items.part_1_text_2.show()
            }
            })
            .add({
              delay:4000,
              complete(){
                Scenes.items.part_1_frame.set(552,108-5, 85)
                Scenes.items.part_1_text_2.hide()
                Scenes.items.part_1_text_1.show()
                Scenes.items.part_1_component_1.hide()
                Scenes.items.part_1_component_1_1.hide()
                Dom.setBlinkArrowRed(true, 545, 66,30,null).play()
                setCC("Select suitable thyristor for the circuit to control the voltage during the negative half cycle.")
              }
            })
            .add({
              complete(){
                terminal2.onclick = setComponent2
              }
            })
            clickCount ++;
            break;
          }
        
          case 2:{
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
              
            })
            .add({
              targets: Scenes.items.part_1_component_1_2.item,
              left: 573,
              top: 108,

              complete(){
              Dom.setBlinkArrowRed(true, 545, 66,30,null).play()
              Scenes.items.part_1_frame.set(552,194-5, 85)
              // Scenes.items.part_1_text_3.show()
              Scenes.items.part_1_text_2.hide()
            }
            })
            .add({
              delay:3000,
              complete(){
                Scenes.items.part_1_component_1.hide()
                Scenes.items.part_1_component_1_1.hide()
              }
            })
            .add({
                complete(){
                  clickCount2 = 2
                  terminal2.onclick = setComponent2
                }
            })
            clickCount = 0;
            break;
          }

        } 
      }

      terminal1.onclick = setComponent1
      }

      setComponents();
    
      return true
    }),

    //! voltage and current waveforms
    (step2 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading(
        "Step-2",
        "Voltage and current waveforms."
      )
      //! functionality

      let btn_plot = Scenes.items.btn_plot
      let btn_reset = Scenes.items.btn_reset

      let r_load = Scenes.items.part_2_btn_r_load.item
      let r_l_load = Scenes.items.part_2_btn_r_l_load.item
      
      // to hide the sliders default value using as a overlay layer

      let sliderOverlayLayer = Scenes.items.tempTitle19.setContent("<pre>30             90            150</pre>").styles({
        height: "11px",
        width: "185px",
        zIndex: "1000",
        backgroundColor: "rgb(208, 5, 208)",
      }).set(364,107)
      let preOfLayer = new Dom(sliderOverlayLayer.item.firstChild)
      preOfLayer.styles({
        fontSize: "10px",
        margin: "0",
      })


      let r_load_graph = false;
      let r_l_load_graph = false;

      //*onclick for reset button
      btn_reset.item.onclick = function(){
        sliders.resetSlidersValue()
        Scenes.steps[3]()

      }
      
      function stepTutorial2(){

        setCC("Select the R-Load, set firing angle and observe various waveforms.")
        Dom.setBlinkArrowRed(true,610,220,30,30,0).play()

        
        r_load.onclick = ()=>{

          setCC("Select the value of Firing angle.")
          Dom.setBlinkArrowRed(true,395,125,30,30,90).play()

          //* circuit for r load 
          Scenes.items.part_2_circuit_r_l_load.hide()
          Scenes.items.part_2_circuit.hide()
          Scenes.items.part_2_circuit_r_load.set(0,-60, 246, 645)
          Scenes.items.part_2_helper.set(168, 24, 145, 111).zIndex(2000)
          r_load_graph = true;
          r_l_load_graph = false;
        
          sliders.d.onclick = ()=>{
            Scenes.items.part_2_text_for_r_load.hide()
            Scenes.items.part_2_text_for_r_l_load.hide()
 


            setCC("Press the plot button")
            Dom.setBlinkArrowRed(true,160,320,30,30,-90).play()
          }    
        } 

        r_l_load.onclick = ()=>{
          Scenes.items.part_2_text_for_r_load.hide()

          setCC("Select the value of Firing angle.")
          Dom.setBlinkArrowRed(true,395,125,30,30,90).play()

          Scenes.items.part_2_circuit.hide()
          Scenes.items.part_2_circuit_r_load.hide()

          //* circuit for r load 
          Scenes.items.part_2_circuit_r_l_load.set(0,-60, 246, 645)
          Scenes.items.part_2_helper.set(163, 24, 145, 109).zIndex(2000)
          r_l_load_graph = true;
          r_load_graph = false;

          sliders.d.onclick = ()=>{

            Scenes.items.part_2_text_for_r_l_load.hide()
            Scenes.items.part_2_text_for_r_load.hide()
            setCC("Press the plot button")
            Dom.setBlinkArrowRed(true,160,320,30,30,-90).play()
          }    
        }  


       
        
      }

      stepTutorial2()
      Scenes.items.btn_next.show();

      //! Required Items
      Scenes.items.slider_box.item.style.scale = "1.1";
      Scenes.items.slider_box.show("flex").set(82, -37);
      sliders.showSlider('d')

      //! new item added
      Scenes.items.part_2_circuit.set(0, -60, 246, 645)
      Scenes.items.part_2_helper.set(166, 24, 145, 109).zIndex(2000)

      // Scenes.items.part_2_circuit_r_load.set(0,-60, 246, 645)
      // Scenes.items.part_2_helper.set(168, 24, 145, 111).zIndex(2000)

      // Scenes.items.part_2_circuit_r_l_load.set(0,-60, 246, 645)
      // Scenes.items.part_2_helper.set(163, 24, 145, 109).zIndex(2000)

      Scenes.items.part_2_text_for_r_load.set(100, 205, 137).hide()
      Scenes.items.part_2_text_for_r_l_load.set(100, 205, 137).hide()


      Scenes.items.btn_reset.set(10, 352, 54)
      Scenes.items.btn_plot.set(125, 352, 54)
      Scenes.items.part_2_btn_r_load.set(447, 198, 76)
      Scenes.items.part_2_btn_r_l_load.set(449, 298, 76)
      Scenes.items.part_2_graph_empty.set(658, -43, 433)

      //* r load graph
      Scenes.items.part_2_r_load_graph_1.set(655, -74, 484).hide()
      Scenes.items.part_2_r_load_graph_2.set(655, -74, 484).hide()
      Scenes.items.part_2_r_load_graph_3.set(655, -74, 484).hide()

      //* r-l load graph
      Scenes.items.part_2_r_l_load_graph_1.set(655, -74, 484).hide()
      Scenes.items.part_2_r_l_load_graph_2.set(655, -74, 484).hide()
      Scenes.items.part_2_r_l_load_graph_3.set(655, -74, 484).hide()
 
      let currentGraph = Scenes.items.part_2_graph_empty

       
      // *  chage the step size of the sliders
      // let dutyRatioSlider = Scenes.items.slider_D.item.children[1].children[0];
      let dutyRatioSlider = sliders.d;
      let valueInput = document.querySelector(".d .value-box input")
      valueInput.readOnly = true
      dutyRatioSlider.min = "30"
      dutyRatioSlider.max = "150"
      dutyRatioSlider.step = "60"
      dutyRatioSlider.value = 30
      valueInput.value = 30
      // 30 90 150

      function arrowBlinkForAll(){
        setCC("Change the parameters to see the effect")
        anime.timeline({
          easing: "linear",
          duration: 1500,
        })
        .add({
          delay: 3000,
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,610,220,30,30,0).play()
          }
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,610,317,30,30,0).play()
          }
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,395,125,30,30,90).play()
          }
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,160,320,30,30,-90).play()
          }
        })
      }
 
      // ! onclick for plot

      let isClicked = false
      let clickIdx = 0;


      btn_plot.item.onclick = function () {

 
        
        console.log("btn plot click", clickIdx)

        
        if(clickIdx == 0 || clickIdx == 1 || clickIdx == 2){
          Scenes.items.part_2_text_for_r_load.show() 
        }

        if(clickIdx == 3 || clickIdx == 4 || clickIdx == 5){
          Scenes.items.part_2_text_for_r_l_load.show() 
        }


        if(clickIdx == 2){
          setCC("Select the R L Load, set firing angle and observe various waveforms.")
          Dom.setBlinkArrowRed(true,610,317,30,30,0).play()
        }
        else if(clickIdx  >=  5){
          // Scenes.items.part_2_text_for_r_l_load.hide() 
          Scenes.items.part_2_text_for_r_load.hide()
          Dom.setBlinkArrowRed(-1) 
          if(isClicked == false){
          arrowBlinkForAll()
          isClicked = true
        }

        }
        else{   
        setCC("Select the value of Firing angle.")
        Dom.setBlinkArrowRed(true,395,125,30,30,90).play()
        }
        clickIdx++;

        


        let dutyRatioValue = Number(sliders.d.value);
        console.log("d",dutyRatioValue)
        
        if (dutyRatioValue == 30 && r_load_graph == true) {
          currentGraph.hide();
          Scenes.items.part_2_r_load_graph_1.show();
          currentGraph = Scenes.items.part_2_r_load_graph_1;
        }

        if (dutyRatioValue == 30 && r_l_load_graph == true) {
          currentGraph.hide();
          Scenes.items.part_2_r_l_load_graph_1.show();
          currentGraph = Scenes.items.part_2_r_l_load_graph_1;
        }
        
        if (dutyRatioValue == 90 && r_load_graph == true) {
          currentGraph.hide();
          Scenes.items.part_2_r_load_graph_2.show();
          currentGraph = Scenes.items.part_2_r_load_graph_2;
        }

        if (dutyRatioValue == 90 && r_l_load_graph == true) {
          currentGraph.hide();
          Scenes.items.part_2_r_l_load_graph_2.show();
          currentGraph = Scenes.items.part_2_r_l_load_graph_2;
        }
        
        if (dutyRatioValue == 150 && r_load_graph == true) {
          currentGraph.hide();
          Scenes.items.part_2_r_load_graph_3.show();
          currentGraph = Scenes.items.part_2_r_load_graph_3;
        }

        if (dutyRatioValue == 150 && r_l_load_graph == true) {
          currentGraph.hide();
          Scenes.items.part_2_r_l_load_graph_3.show();
          currentGraph = Scenes.items.part_2_r_l_load_graph_3;
        }
        // completed
        Scenes.items.part_2_graph_empty.set(658, -43, 433)

        setIsProcessRunning(false);
      };
      

      
      return true
    }),

    //! part 3 select option
    (step3 = function () {
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      
      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step-3", "");
      
      // * remove all previous restrictions
      
      // * Required Elements

      // Scenes.items.circuit_full_2.set(6,40,230)
      // Scenes.items.part_3_option_select.set(650-70, 0, 350)
      // Scenes.items.part_3_option_1.set(709-70, 30, 60).zIndex(2)
      // Scenes.items.part_3_option_2.set(725-70, 100, 60).zIndex(2)
      // Scenes.items.part_3_option_3.set(725-70, 175, 60).zIndex(2)
      // Scenes.items.part_3_option_4.set(712-70, 248, 60).zIndex(2)

      //! new added
      Scenes.items.part_3_circuit.set(168,-80, 215)
      Scenes.items.part_3_select_option_1.set(92, 166, 210)
      Scenes.items.part_3_select_option_2.set(546, 175, 204,333)
      // // hide the slider
      Scenes.items.slider_box.hide()
      // resloving the step to css
      Scenes.items.slider_box.item.style.scale = "1";


      // let rightTicks = [
      //   Scenes.items.right_tick_1.set(640,35,44).zIndex(2000).hide(),
      //   Scenes.items.right_tick_2.set(655,105,44).zIndex(2001).hide(),
      //   Scenes.items.right_tick_3.set(655,180,44).zIndex(2000).hide(),
      //   Scenes.items.right_tick_4.set(645,255,44).zIndex(2000).hide()
      // ]

      // hide all tables
      Scenes.items.part3_table_one.hide()
      Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide()
      Scenes.items.part3_table_four.hide()
      Scenes.items.part3_table_four_2.hide()
      let rightTicks = [
        Scenes.items.right_tick_1.set(120,190,20).hide(),
        Scenes.items.right_tick_2.set(573,197,20).hide(),
      ]

      // active all sliders
      

      // * showing right tick if done
      // for(let i in rightTicks){
      //   if(Scenes.optionsDone[i] == 1){
      //     rightTicks[i].show()
      //   }
      // }


      // ! Final Position
    //  Scenes.items.tableCalc.show()

    // ! onclicks for all options
      let options = [
        Scenes.items.part_3_select_option_1,
        Scenes.items.part_3_select_option_2,
      ]

      //! RESET ALL THE SLIDER VALUES
      // sliders.reset()
      Scenes.forMathematicalExpressionBtn = 0
      
      const opOne = ()=>{
        
        Scenes.optionsDone[0]=1;
        Scenes.forMathematicalExpressionBtn = 1
        Scenes.currentStep = 6
        Scenes.steps[0+5]()
      }
      const opTwo = ()=>{
      
        Scenes.optionsDone[1]=1;
        Scenes.forMathematicalExpressionBtn = 2
        Scenes.currentStep = 7
        Scenes.steps[1+5]()
      }

      options[0].item.onclick = opOne
      // rightTicks[0].item.onclick = opOne

      options[1].item.onclick =  opTwo
      // rightTicks[1].item.onclick = opTwo

      if(Scenes.optionsDone[0] == 0 && Scenes.optionsDone[1] == 0){
        setCC("First select the R-load and proceed for experimentation")
      }else if(Scenes.optionsDone[0] == 1){
        setCC("Now select the R L load and proceed for experimentation")
      }

      // ! if all options done then exit
      let exit = true
      for(let i in Scenes.optionsDone){
        if(Scenes.optionsDone[i]==0){
          exit = false
          break
        }
        if(Scenes.optionsDone[i]==1){
          rightTicks[i].show()
        }
      }      

      if(exit){
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulation Done");
        setIsProcessRunning(false);
      }

      return true;

    }),

    //! R load 
    (step4 = function () {
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "",
        ""
      )
      // ! show the slider
      Scenes.items.slider_box.set(0,-50).show("flex")
      sliders.resetSlidersValue()
      sliders.showAllSliders()
      //!new added for EE8
      Scenes.items.part3_table_three.set(10)
      Scenes.items.part_3_tab_1.set(612,-75, 47).zIndex(3)
      Scenes.items.part_3_tab_2.set(788, -75, 47).zIndex(3)
      Scenes.items.part_3_tab_3.set(612,-30, 47).zIndex(3)
      Scenes.items.part_3_tab_4.set(788, -30, 47).zIndex(3)
      Scenes.items.part_3_tab_5.set(699, 14, 47).zIndex(3)

      let rightTicks = [
        Scenes.items.right_tick_1.set(622,-61,19).hide(),
        Scenes.items.right_tick_2.set(798,-61,19).hide(),
        Scenes.items.right_tick_3.set(622,-16, 19).hide(),
        Scenes.items.right_tick_4.set(798, -16, 19).hide(),
        Scenes.items.right_tick_5.set(712, 28, 19).hide(),
      ]

      Scenes.items.btn_record.set(598, 360, 54)
      Scenes.items.btn_reset.set(698+20, 360, 54)
      Scenes.items.btn_delete.set(798+40, 360, 54)

      let valuesToMatch = [] 

      let table = new Dom(".part3_table_three").item
      
       // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

      // ! Tutorial Function
      // Dom.setBlinkArrowRed(true,0,0,30,null,-90)
      function stepTutorial2(){
        
        Dom.setBlinkArrowRed(true,72,0,30, null,-90).play()
        setCC("Set AC input voltage, resistive load and vary the firing angle and record the observations.")

        // reset slider d onclick
        sliders.d.onclick = ()=>{}
        sliders.v_knob.onclick = ()=>{
          sliders.sliderV()
          sliders.v_knob.click()
          Dom.setBlinkArrowRed(true,542,68,30,null,0).play()
          setCC("Set the value of Load resistance")

          sliders.r.onclick = ()=>{
            sliders.sliderR()
            sliders.r.click()

            Dom.setBlinkArrowRed(true,622,324,null,null,-90).play()
            setCC("Press the 'Record' Button")
          
            sliders.d.oninput = ()=>{
              // sliders.d.input()
              Dom.setBlinkArrowRed(true,622,324,null,null,-90).play()
              setCC("Press the 'Record' Button")
              
              sliders.sliderD()
            }
          }
        }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }

      // ! graph
      let graph_width = 346
      let graph_height = 273

      let graph_box_height = 295
      let graph_box_top = 60
      let dataLabelX = "Firing angle (𝜶°)"
      
      // ! Forshowing dummy graph
      Scenes.items.graph_box_0.set(null, graph_box_top, graph_box_height)
      Scenes.items.graph0.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph0.item
      let dummyGraphIdx = 10
      // graph idx is for  showing which graph is being shown
      let graphIdx = 0
      // * showing the dummy graph
      function showDummyGraph(){
        // if(forceShow || Scenes.items.chart.graph[dummyGraphIdx]==null){
        //   Scenes.items.graph_box_0.set()
        //   Scenes.plotGraph(ctx,dummyGraphIdx,true,dataLabelX,"")
        // }
        Scenes.items.graph_box_0.set()
      }
      showDummyGraph()  
      
      // ! To Plot graph
      function plotGraphs(){
        let ctxs = {
          graph_box: [
            Scenes.items.graph_box_1,
            Scenes.items.graph_box_2,
            Scenes.items.graph_box_3,
            Scenes.items.graph_box_4,
            Scenes.items.graph_box_5,
          ],
          graph: [
            Scenes.items.graph1.item,
            Scenes.items.graph2.item,
            Scenes.items.graph3.item,
            Scenes.items.graph4.item,
            Scenes.items.graph5.item,
          ]
        }
        let data = {
          labels: [
            "Vo",
            "Io",
            "Po",
            "PF",
            "THD",
          ],
          colors: [
            "#cc0505",
            "#7937aa",
            "#05bc57",
            "#05bcfe",
            "#d26315"  
          ],
          datas:[],
        }
        let yLabels = [
          "Output Voltage (Volts)",
          "Current (Amp)",
          "Output Power (Watts)",
          "Power Factor (PF)",
          "THD (%)",
        ]
        function getDataFromTable(){
          let datas_XY = [] // v0,i0,p0,PF,THD
          let indexForTableColunmDataY = [4,5,7,8,10,11]
          let indexForTableColumnDataX = 2
          indexForTableColunmDataY.forEach(col_idx=>{
            let datas = []
            let rows = table.tBodies[0].rows
            // get data from rows.cells
            for(let row of rows){
              let x = row.cells[indexForTableColumnDataX].innerHTML
              let y = row.cells[col_idx].innerHTML
              let data = {x,y}
              datas.push(data);
            }
            // save data on datas_XY
            datas_XY.push(datas)
          })
          return datas_XY
        }
        // table data to array conversion
        let datas_XY = getDataFromTable()
        data.datas = datas_XY

        // ! set all data and plot graph but hide all or don't set
        // and active all click buttons
        function dataToGraphConversion(){
          ctxs.graph.forEach((ctx,idx)=>{
            idx = idx
            let 
            xLabel = dataLabelX,
            yLabel = yLabels[idx],
            dataArray = data.datas[idx],
            dataLabel = data.labels[idx],
            dataColor = data.colors[idx]
            // plot empty graph
            let graphRef = Scenes.plotGraph(ctx,idx,true,xLabel,yLabel)

            // ! for second tab graph where (two dataset exist)
            if(idx == 1){
              // for i0 and iSCR
              let data_1 = {
                array: data.datas[idx],
                label: data.labels[idx],
                color: data.colors[idx],
              }
              let data_2 = {
                array: data.datas[5],
                label: "iSCR",
                color: "red",
              }
              Scenes.graphFeatures.addDataset(graphRef,data_1.label,data_1.color,data_1.array)
              Scenes.graphFeatures.addDataset(graphRef,data_2.label,data_2.color,data_2.array)
            }
            
            else{
              // plot empty first then add data
              Scenes.graphFeatures.addDataset(graphRef,dataLabel,dataColor,dataArray)
            }
          })
          Scenes.items.yLabel.setContent("")
          Scenes.items.xLabel.setContent("")
        }
        dataToGraphConversion()

        // * graph tab btn onclick
        function btnGraphTab(){
          let subtitles = {
            lastButtonFunction: ()=>{
              // todo 
                Dom.setBlinkArrowRed(-1)
                setTimeout(() => {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 544).play();
                setIsProcessRunning(false);
                Scenes.currentStep = 4
              }, 12000);
              // showArrowForAll()
              setCC("In AC voltage controller the waveform distortion is more at higher firing angles and thus THD is high.")
            },
            arrows: [
              ()=>Dom.setBlinkArrowRed(true,842,-20,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,672,25,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,872,25,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,762,68,30,null,90).play(),
            ],
            texts: [
              "Here, the load voltage decreases with increasing firing angle",
              "Here, the load and SCR current decreases with increasing firing angle.",
              "Here, both the load voltage and power demand are controlled by the AC voltage controller.",
              "In AC voltage controller the power factor decreases with increasing firing angle"
            ]
          }
          let btns = document.querySelectorAll(".btn_graph_tab")

          btns.forEach((btn,idx)=>{

            btn.onclick = () =>{
                //for labeling
              let conclusionFront = ""
              //* for conclusion
              switch(idx){
                case 0: 
                  conclusionFront = "The load voltage decreases with increasing firing angle."
                  break;
                
                case 1: 
                  conclusionFront = "The load current and current through SCR decreases with increasing firing angle."
                  break;
                
                case 2: 
                  conclusionFront = "As load voltage and current decreases with increasing firing angle, the load power can easily be controlled by changing the firing angle."
                  break;
                
                case 3: 
                  conclusionFront = "Power factor decreases with increasing firing angle. "
                  break;
                  
                case 4: 
                  conclusionFront = "As waveform distortion increases with increasing firing angle, the THD also increases."
                  break;
              }
              Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

              for(let gb of ctxs.graph_box){
                gb.hide()
              }

              // * show current clicked graph and labels
              ctxs.graph_box[idx].set()
              // showing right tick
              rightTicks[idx].set()
              if(idx < btns.length - graphIdx - 1){
                subtitles.arrows[idx]()
                setCC(subtitles.texts[idx])
              }else{
                subtitles.lastButtonFunction()
              }
              let yLabel = Scenes.items.chart.label[idx].y
              Scenes.items.yLabel.setContent(yLabel)
              Scenes.items.xLabel.setContent(dataLabelX)

              // ! download button anime
              Download.playDownloadButtonAnime()
            }
          })
        }
        btnGraphTab()
      }

      //* to check conclusion appearance
      // Scenes.items.tempTitle1.set(null, -74,108, 301 ).setContent("lorem20sdhs jfjdsf ajhs;as hdf asdlhf").addClass("conclusion").zIndex(2000).item


      // ! ------------> If data already present plot the graph
      // if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
      //   // setDataToGraph()= 
      //     setIsProcessRunning(false)
      //     Scenes.currentStep  = 4

      //     recordBtnClickIdx = 21
      //     let r=7
      //     let tab=3
      //     // * to get old values from table for matching
      //     for(let i=0;i<tab;i++){
      //       let arr = []
      //       for(let j=0;j<r;j++){
      //         arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
      //       }
      //       valuesToMatch.push(arr)
      //     }

      //     disableSlider("r")
      //     disableSlider("v")
      //     setDataToGraph()
      // }else{
      //   plotGraph()
      // }
       
      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
          return
        }
        let rows = table.tBodies[0].rows
        let n = 11
        
        for(let i=1;i<n;i++){
          rows[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          // disableSlider("reset")
        }
        valuesToMatch.pop()
        // for safe the prdefined values
        if(recordBtnClickIdx==0){
          rows[0].cells[2].innerHTML = 0
          valuesToMatch.push(0)
        }else if(recordBtnClickIdx==1){
          rows[1].cells[2].innerHTML = 170
          valuesToMatch.push(170)
        }
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=7
        let m=11
  
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }
        rows[0].cells[2].innerHTML = 0
        rows[1].cells[2].innerHTML = 170
        // reset all the parameters
        // so just simply call this step again
        // sliders.reset()
        Scenes.steps[5]()
      }

      let currentTableIdx = 0
      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){
        // for arrow system
         if(recordBtnClickIdx > 0 && recordBtnClickIdx < 6){
            Dom.setBlinkArrowRed(true,312,98,null,null,90).play()
            setCC("Change the value of firing angle")
            
            sliders.d.oninput = (e)=>{
              // sliders.d.input()
              Dom.setBlinkArrowRed(true,622,324,null,null,-90).play()
              setCC("Press the 'Record' Button")
              
              let slider_D = document.querySelector(".slider_D")
              let sliderImg = document.querySelector(".slider-D-arrow")
              let sliderValueInput = document.querySelector(".d .value-box input")
              let val = 0
              
              // slider function  
              e = e instanceof Event
              if(e){
                  sliderValueInput.value = slider_D.value 
              }
              else{
                  slider_D.value = sliderValueInput.value
              }
              val = ((slider_D.value * 95) / 109) - 7
              sliderImg.style.left = `${114 + val}px`
            }
        }else{
          Dom.setBlinkArrowRed(true,622,324,null,null,-90).play()
          setCC("Press the 'Record' Button")
        }
        // dutyRatioValue/d is firing angle
        let vInValue = Number(sliders.v.value)
        let dutyRatioValue = Number(sliders.d.value)
        // * for default two values
        if(recordBtnClickIdx == 0 || recordBtnClickIdx == 1){
          dutyRatioValue = recordBtnClickIdx==0 ? 0:170
        }
        let resistanceValue = Number(sliders.r.value)
        updateValues(vInValue,dutyRatioValue,resistanceValue)
        // ! Can't select same values
        if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different firing angle.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx==7){

          function sortTable(){
            var rows = table.tBodies[0].rows
            let valueColumnToShort = 2
            
            let n=7
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[valueColumnToShort].innerHTML)
                    let val2 = Number(rows[j+1].cells[valueColumnToShort].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()
          // ! plot all graphs
          plotGraphs()

          // ! Graph Tab Buttons click
          function graphTabButtonArrows(){
            Dom.setBlinkArrowRed(true,672,-20,30,null,90).play()
            setCC("Plot output voltage variation with firing angle characteristics")
            // refer to plotGraphs() area
          }
          graphTabButtonArrows()
          // after complete
          // Dom.setBlinkArrow(true, 790, 408).play()
          // setCC("Click 'Next' to go to next step")
          // setIsProcessRunning(false)
          // Scenes.currentStep = 4
        }

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          // disableSlider("v")
          // disableSlider("d")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        let FiringAngleValue = tableRow.cells[2].innerHTML
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = FiringAngleValue==""?dutyRatioValue:FiringAngleValue
        tableRow.cells[3].innerHTML = resistanceValue
        tableRow.cells[4].innerHTML = Number(Formulas.r_load.v0(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.r_load.i0(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.r_load.iIn(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.r_load.p0(values)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.r_load.pf(values)).toFixed(2)
        tableRow.cells[9].innerHTML = Number(Formulas.r_load.v01(values)).toFixed(2)
        tableRow.cells[10].innerHTML = Number(Formulas.r_load.THD(values)).toFixed(2)
        // added a display none column
        tableRow.cells[11].innerHTML = Number(Formulas.r_load.iSCR(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        // if(recordBtnClickIdx==7){
        //   setCC("Click 'Record' to sort the table according to D and plot the graph.")
        // }
      }    

      return true;

    }),

    //! R-L load 
    (step5 = function () {
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "",
        ""
      );
      // ! show the slider
      Scenes.items.slider_box.set(0,-50).show("flex")
      sliders.showAllSliders()
      sliders.resetSlidersValue()
      // setCC("Record  7 reading for different Duty Ratio.")
      
      // ! required item
      // circuit full 3 replaced by 2 because of changes
      // Scenes.items.circuit_full_2.set(230,-50,175)
      // Scenes.items.part_3_option_1.set(10, 170-15)
      // Scenes.items.right_tick_1.set(-12,185-15)
      // Scenes.items.graph1_arrow.set(-5,6)

      // Scenes.items.part3_table_one.set(10).show("flex")

      //!new added for EE8
      Scenes.items.part3_table_three_two.set(10)
      Scenes.items.part_3_tab_1.set(612,-75, 47).zIndex(3)
      Scenes.items.part_3_tab_2.set(788, -75, 47).zIndex(3)
      Scenes.items.part_3_tab_3.set(612,-30, 47).zIndex(3)
      Scenes.items.part_3_tab_4.set(788, -30, 47).zIndex(3)
      Scenes.items.part_3_tab_5.set(699, 14, 47).zIndex(3)

      Scenes.items.part_3_text_load_1.set(458, -76, 72)
      Scenes.items.part_3_text_load_2.set(535, -76, 72)

      Scenes.items.part_3_alpha_text.set(410, 136, 30)
      Scenes.items.part_3_beta_text.set(490, 136, 30)
      var st = {
        color: "black",
      }
      let phyTempText = Scenes.items.tempTitle40.set(437,140).styles(st).setContent("0")    
      let betaTempText = Scenes.items.tempTitle41.set(517,140).styles(st).setContent("0")     
      // hide slider
      sliders.hideSlider("r")
      Scenes.items.r_l_load.set(449,3,121, 60)

      let rightTicks = [
        Scenes.items.right_tick_1.set(622,-61,19).hide(),
        Scenes.items.right_tick_2.set(798,-61,19).hide(),
        Scenes.items.right_tick_3.set(622,-16, 19).hide(),
        Scenes.items.right_tick_4.set(798, -16, 19).hide(),
        Scenes.items.right_tick_5.set(712, 28, 19).hide(),
      ]

      Scenes.items.btn_record.set(598, 360, 54)
      Scenes.items.btn_reset.set(698+20, 360, 54)
      Scenes.items.btn_delete.set(798+40, 360, 54)

      let vInValue = 0
      let dutyRatioValue = 0
      let resistanceValue = 0
      let inductanceValue = 0
      let isLoadAndInductanceSelected = false

      // ! onclick for load selecting buttons
      Scenes.items.part_3_text_load_1.item.onclick = ()=>{
        inductanceValue = 20
        resistanceValue = 100
        isLoadAndInductanceSelected = true
        updateValues(vInValue,dutyRatioValue,resistanceValue,inductanceValue)
        betaTempText.setContent(Formulas.r_l_load.betaDeg(values))
        phyTempText.setContent(Formulas.r_l_load.phy(values))

        Scenes.items.part_3_text_load_1.addClass("load-active")
        Scenes.items.part_3_text_load_2.addClass("load-deactive")
        Scenes.items.part_3_text_load_1.item.onclick = ()=>{}
        Scenes.items.part_3_text_load_2.item.onclick = ()=>{}
        Scenes.items.part_3_text_load_1.removeClass("btn-img")
        Scenes.items.part_3_text_load_2.removeClass("btn-img") 

        // * show blink arrow
        Dom.setBlinkArrowRed(true,622,324,null,null,-90).play()
        setCC("Press the 'Record' Button")
      }
      Scenes.items.part_3_text_load_2.item.onclick = ()=>{
        inductanceValue = 40
        resistanceValue = 50
        isLoadAndInductanceSelected = true
        updateValues(vInValue,dutyRatioValue,resistanceValue,inductanceValue)
        betaTempText.setContent(Formulas.r_l_load.betaDeg(values))
        phyTempText.setContent(Formulas.r_l_load.phy(values))

        Scenes.items.part_3_text_load_1.addClass("load-deactive")
        Scenes.items.part_3_text_load_2.addClass("load-active")
        Scenes.items.part_3_text_load_1.item.onclick = ()=>{}
        Scenes.items.part_3_text_load_2.item.onclick = ()=>{}
        Scenes.items.part_3_text_load_1.removeClass("btn-img")
        Scenes.items.part_3_text_load_2.removeClass("btn-img") 

        // * show blink arrow
        Dom.setBlinkArrowRed(true,622,324,null,null,-90).play()
        setCC("Press the 'Record' Button")
      }

      // Scenes.items.btn_record.set(610,365,60)
      // Scenes.items.btn_delete.set(730,365)
      // Scenes.items.btn_reset.set(820,365)
      let valuesToMatch = [] 

      let table = new Dom(".part3_table_three_two").item
       // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

      // ! Tutorial Function
      // Dom.setBlinkArrowRed(true,0,0,30,null,-90)
      function stepTutorial2(){
        
        Dom.setBlinkArrowRed(true,72,0,30, null,-90).play()
        setCC("Set AC input voltage, resistive load and vary the firing angle and record the observations.")

        // reset slider d onclick
        sliders.d.onclick = ()=>{}
        sliders.v_knob.onclick = ()=>{
          sliders.sliderV()
          sliders.v_knob.click()
          Dom.setBlinkArrowRed(true,515,0,30,null,90).play()
          setCC("Select the load parameters")

          sliders.r.onclick = ()=>{
            sliders.sliderR()
            sliders.r.click()

            Dom.setBlinkArrowRed(true,622,324,null,null,-90).play()
            setCC("Press the 'Record' Button")
          
            sliders.d.oninput = ()=>{
              // sliders.d.input()
              Dom.setBlinkArrowRed(true,622,324,null,null,-90).play()
              setCC("Press the 'Record' Button")
              
              sliders.sliderD()
            }
          }
        }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }

      // ! graph
      let graph_width = 346
      let graph_height = 273

      let graph_box_height = 295
      let graph_box_top = 60
      let dataLabelX = "Firing angle (𝜶°)"
      
      // ! Forshowing dummy graph
      Scenes.items.graph_box_0.set(null, graph_box_top, graph_box_height)
      Scenes.items.graph0.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph0.item
      let dummyGraphIdx = 10
      // graph idx is for  showing which graph is being shown
      let graphIdx = 5
      // * showing the dummy graph
      function showDummyGraph(){
        // if(forceShow || Scenes.items.chart.graph[dummyGraphIdx]==null){
        //   Scenes.items.graph_box_0.set()
        //   Scenes.plotGraph(ctx,dummyGraphIdx,true,dataLabelX,"")
        // }
        Scenes.items.graph_box_0.set()
      }
      showDummyGraph()  
      
      // ! To Plot graph
      function plotGraphs(){
        let ctxs = {
          graph_box: [
            Scenes.items.graph_box_6,
            Scenes.items.graph_box_7,
            Scenes.items.graph_box_8,
            Scenes.items.graph_box_9,
            Scenes.items.graph_box_10,
          ],
          graph: [
            Scenes.items.graph6.item,
            Scenes.items.graph7.item,
            Scenes.items.graph8.item,
            Scenes.items.graph9.item,
            Scenes.items.graph10.item,
          ]
        }
        let data = {
          labels: [
            "Vo",
            "Io",
            "Po",
            "PF",
            "THD",
          ],
          colors: [
            "#cc0505",
            "#7937aa",
            "#05bc57",
            "#05bcfe",
            "#d26315"  
          ],
          datas:[],
        }
        let yLabels = [
          "Output Voltage (Volts)",
          "Current (Amp)",
          "Output Power (Watts)",
          "Power Factor (PF)",
          "THD (%)",
        ]
        function getDataFromTable(){
          let datas_XY = [] // v0,i0,p0,PF,THD
          let indexForTableColunmDataY = [4,5,7,8,10,11]
          let indexForTableColumnDataX = 2
          indexForTableColunmDataY.forEach(col_idx=>{
            let datas = []
            let rows = table.tBodies[0].rows
            // get data from rows.cells
            for(let row of rows){
              let x = row.cells[indexForTableColumnDataX].innerHTML
              let y = row.cells[col_idx].innerHTML
              let data = {x,y}
              datas.push(data);
            }
            // save data on datas_XY
            datas_XY.push(datas)
          })
          return datas_XY
        }
        // table data to array conversion
        let datas_XY = getDataFromTable()
        data.datas = datas_XY

        // ! set all data and plot graph but hide all or don't set
        // and active all click buttons
        function dataToGraphConversion(){
          ctxs.graph.forEach((ctx,idx)=>{
            let 
            xLabel = dataLabelX,
            yLabel = yLabels[idx],
            dataArray = data.datas[idx],
            dataLabel = data.labels[idx],
            dataColor = data.colors[idx]

            // plot empty first then add data
            let graphRef = Scenes.plotGraph(ctx,graphIdx + idx,true,xLabel,yLabel)
            
            // ! for second tab graph where (two dataset exist)
            if(idx == 1){
              // for i0 and iSCR
              let data_1 = {
                array: data.datas[idx],
                label: data.labels[idx],
                color: data.colors[idx],
              }
              let data_2 = {
                array: data.datas[5],
                label: "iSCR",
                color: "red",
              }
              Scenes.graphFeatures.addDataset(graphRef,data_1.label,data_1.color,data_1.array)
              Scenes.graphFeatures.addDataset(graphRef,data_2.label,data_2.color,data_2.array)
            }
            else{
              // plot empty first then add data
              Scenes.graphFeatures.addDataset(graphRef,dataLabel,dataColor,dataArray)
            }
            // ctxs.graph_box[idx].set()
          })
          Scenes.items.yLabel.setContent("")
          Scenes.items.xLabel.setContent("")
        }
        dataToGraphConversion()

        // * graph tab btn onclick
        function btnGraphTab(){
          let subtitles = {
            lastButtonFunction: ()=>{
              // todo 
              Dom.setBlinkArrowRed(-1)
              setTimeout(() => {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 544).play();
                setIsProcessRunning(false);
                Scenes.currentStep = 7
              }, 12000);
              // showArrowForAll()
              setCC("In AC voltage controller the waveform distortion is more at higher firing angles and thus THD is high.")
            },
            arrows: [
              ()=>Dom.setBlinkArrowRed(true,842,-20,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,672,25,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,872,25,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,762,68,30,null,90).play(),
            ],
            texts: [
              "Here, the load voltage decreases with increasing firing angle",
              "Here, the load and SCR current decreases with increasing firing angle.",
              "Here, both the load voltage and power demand are controlled by the AC voltage controller.",
              "In AC voltage controller the power factor decreases with increasing firing angle"
            ]
          }
          let btns = document.querySelectorAll(".btn_graph_tab")
          btns.forEach((btn,idx)=>{
            btn.onclick = () =>{
              //for labeling
              let conclusionFront = ""
              //* for conclusion
              switch(idx){
                case 0: 
                  conclusionFront = "The load voltage decreases with increasing firing angle."
                  break;
                
                case 1: 
                  conclusionFront = "The load current and current through SCR decreases with increasing firing angle."
                  break;
                
                case 2: 
                  conclusionFront = "As load voltage and current decreases with increasing firing angle, the load power can easily be controlled by changing the firing angle."
                  break;
                
                case 3: 
                  conclusionFront = "Power factor decreases with increasing firing angle. "
                  break;
                  
                case 4: 
                  conclusionFront = "As waveform distortion increases with increasing firing angle, the THD also increases."
                  break;
              }
              Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

              for(let gb of ctxs.graph_box){
                gb.hide()
              }

              // * show current clicked graph and labels
              ctxs.graph_box[idx].set()
              // showing right tick
              rightTicks[idx].set()
              if(idx < btns.length - 1){
                subtitles.arrows[idx]()
                setCC(subtitles.texts[idx])
              }else{
                subtitles.lastButtonFunction()
              }
              let yLabel = Scenes.items.chart.label[idx+graphIdx].y
              Scenes.items.yLabel.setContent(yLabel)
              Scenes.items.xLabel.setContent(dataLabelX)

              // ! download button anime
              Download.playDownloadButtonAnime()
            }
          })
        }
        btnGraphTab()
      }


      // ! ------------> If data already present plot the graph
      // if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
      //   // setDataToGraph()= 
      //     setIsProcessRunning(false)
      //     Scenes.currentStep  = 4

      //     recordBtnClickIdx = 21
      //     let r=7
      //     let tab=3
      //     // * to get old values from table for matching
      //     for(let i=0;i<tab;i++){
      //       let arr = []
      //       for(let j=0;j<r;j++){
      //         arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
      //       }
      //       valuesToMatch.push(arr)
      //     }

      //     disableSlider("r")
      //     disableSlider("v")
      //     setDataToGraph()
      // }else{
      //   plotGraph()
      // }
       
      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
          return
        }
        let rows = table.tBodies[0].rows
        let n = 11
        
        for(let i=1;i<n;i++){
          rows[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          // disableSlider("reset")
        }
        valuesToMatch.pop()
        // for safe the prdefined values
        if(recordBtnClickIdx==0){
          rows[0].cells[2].innerHTML = 0
          valuesToMatch.push(0)
        }else if(recordBtnClickIdx==1){
          rows[1].cells[2].innerHTML = 170
          valuesToMatch.push(170)
        }
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=7
        let m=11
  
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }
        rows[0].cells[2].innerHTML = 0
        rows[1].cells[2].innerHTML = 170
        // reset all the parameters
        // so just simply call this step again
        // sliders.reset()

        // reset load parameters
        Scenes.items.part_3_text_load_1.removeClass("load-active")
        Scenes.items.part_3_text_load_2.removeClass("load-active")
        Scenes.items.part_3_text_load_1.removeClass("load-deactive")
        Scenes.items.part_3_text_load_2.removeClass("load-deactive")

        isLoadAndInductanceSelected = false
        Scenes.steps[6]()
      }

      let currentTableIdx = 0
      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){
        if(!isLoadAndInductanceSelected){
          Dom.setBlinkArrowRed(true,515,0,30,null,90).play()
          setCC("Select the load parameters")
          return  
        }
        // for arrow system
         if(recordBtnClickIdx > 0 && recordBtnClickIdx < 6){
            Dom.setBlinkArrowRed(true,312,98,null,null,90).play()
            setCC("Change the value of firing angle")
            
            sliders.d.oninput = (e)=>{
              // sliders.d.input()
              Dom.setBlinkArrowRed(true,622,324,null,null,-90).play()
              setCC("Press the 'Record' Button")
              
              let slider_D = document.querySelector(".slider_D")
              let sliderImg = document.querySelector(".slider-D-arrow")
              let sliderValueInput = document.querySelector(".d .value-box input")
              let val = 0
              
              // slider function  
              e = e instanceof Event
              if(e){
                  sliderValueInput.value = slider_D.value 
              }
              else{
                  slider_D.value = sliderValueInput.value
              }
              val = ((slider_D.value * 95) / 109) - 7
              sliderImg.style.left = `${114 + val}px`

              // ! update the text accroding to value
              if(Scenes.currentStep == 5 || Scenes.currentStep == 7){
                  console.log(34)
                  let betaTempText = Scenes.items.tempTitle41
                  let first = 183.6
                  let second = 194.1
                  let load_1 = 100
                  let betaDeg = (values.R == load_1 ? first : second)
                  if(slider_D.value <= 15){
                      betaDeg = 180
                  }
                  betaTempText.setContent(betaDeg)
              }
            }

        }else{
          Dom.setBlinkArrowRed(true,622,324,null,null,-90).play()
          setCC("Press the 'Record' Button")
        }
        // dutyRatioValue/d is firing angle
        vInValue = Number(sliders.v.value)
        dutyRatioValue = Number(sliders.d.value)
        // * for default two values
        if(recordBtnClickIdx == 0 || recordBtnClickIdx == 1){
        dutyRatioValue = recordBtnClickIdx==0 ? 0:170
        }
        updateValues(vInValue,dutyRatioValue,resistanceValue,inductanceValue)
        console.log("india")

        // ! Can't select same values
        if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different firing angle.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx==7){

          function sortTable(){
            var rows = table.tBodies[0].rows
            let valueColumnToShort = 2
            
            let n=7
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[valueColumnToShort].innerHTML)
                    let val2 = Number(rows[j+1].cells[valueColumnToShort].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()
          // ! plot all graphs
          plotGraphs()

          // ! Graph Tab Buttons click
          function graphTabButtonArrows(){
            Dom.setBlinkArrowRed(true,672,-20,30,null,90).play()
            setCC("Plot output voltage variation with firing angle characteristics")
            // refer to plotGraphs() area
          }
          graphTabButtonArrows()
          // after complete
          // Dom.setBlinkArrow(true, 790, 408).play()
          // setCC("Click 'Next' to go to next step")
          // setIsProcessRunning(false)
          // Scenes.currentStep = 4
        }

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          // disableSlider("v")
          // disableSlider("d")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        let FiringAngleValue = tableRow.cells[2].innerHTML
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = FiringAngleValue==""?dutyRatioValue:FiringAngleValue
        tableRow.cells[3].innerHTML = resistanceValue
        tableRow.cells[4].innerHTML = Number(Formulas.r_l_load.v0(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.r_l_load.i0(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.r_l_load.iIn(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.r_l_load.p0(values)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.r_l_load.pf(values)).toFixed(2)
        tableRow.cells[9].innerHTML = Number(Formulas.r_l_load.v01(values)).toFixed(2)
        tableRow.cells[10].innerHTML = Number(Formulas.r_l_load.THD(values)).toFixed(2)
        tableRow.cells[11].innerHTML = Number(Formulas.r_l_load.iSCR(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        // if(recordBtnClickIdx==7){
        //   setCC("Click 'Record' to sort the table according to D and plot the graph.")
        // }
      }    

      return true;

    }),

    //! Application 
    (step6 = function () {
      setIsProcessRunning(true);
      // to hide previous step

     //! Required Items
     Scenes.items.btn_next.show()
     Scenes.items.slider_box.item.style.scale = "1.1";
     Scenes.items.slider_box.show("flex").set(132, 187);
     sliders.showSlider('d')
      Dom.setBlinkArrowRed(true,115,240,30,null,-90).play()
      setCC("Here AC voltage controller application is demonstrated for illumination control.")
      setCC("Set the AC voltage and then change the firing angle and see the variation in the light intensity")
      
      Scenes.items.part_4_circuit.set(10, 125, 288).zIndex(1)
      Scenes.items.part_2_helper.set(207, 230, 164, 118).zIndex(2000)
      Scenes.items.part_4_text.set(10, -14, 52, 610)
      Scenes.items.part_4_bulb_1.set(732, 90, 150).zIndex(2)
      Scenes.items.part_4_bulb_2.set(699, 50, 250)
      Scenes.items.part_4_bulb_3.set(699, 50, 250)

      Scenes.items.btn_auto.set(125, 40, 40)
      Scenes.items.btn_manual.set(235, 40, 40)
      Scenes.items.slider_v_arrow_application_step.set(98,272,80)

      let isVoltageSet = false
      Scenes.items.slider_v_arrow_application_step.item.onclick = ()=>{
        anime({
          targets: Scenes.items.slider_v_arrow_application_step.item,
          duration: 500,
          rotate: "329",
          easing: "linear",
          complete(){
            isVoltageSet = true
            Dom.setBlinkArrowRed(true,150,90,30,null,90).play()
            // setCC("Click on 'Auto'")
          }
        })

        // empty the onclick
        Scenes.items.slider_v_arrow_application_step.item.onclick = ()=>{}
      }
      let sliderValue = {
        value: 0
      }
      let setManual = false
      let loopedAutoAnime = anime({
        targets: sliderValue,
        value: 180,
        easing: "linear",
        duration: 5000,
        loop: true,
        direction: 'alternate',
        autoplay: false,
        round: 10,
        update:()=>{
          sliders.d.value = sliderValue.value
          // * for slider assistance
          let slider_D = document.querySelector(".slider_D")
          let sliderImg = document.querySelector(".slider-D-arrow")
          let sliderValueInput = document.querySelector(".d .value-box input")
          let val = 0
          
          if(true){
              sliderValueInput.value = slider_D.value 
          }
          else{
              slider_D.value = sliderValueInput.value
          }
          val = ((slider_D.value * 95) / 109) - 7
          sliderImg.style.left = `${114 + val}px`

          // * for glow light
          let value = sliders.d.value
          // for all three images
          if(glowAndDimAll.min <= value && value <= glowAndDimAll.max){
            let min = glowAndDimAll.min
            let max = glowAndDimAll.max
            let ratioValue = 1 - (value - min) / (max - min)
            let bulbIdx = 0
            glow[bulbIdx++].img.opacity(ratioValue).scale(ratioValue)
            glow[bulbIdx++].img.opacity(ratioValue).scale(ratioValue)
            // for light image scale is not less then 0.6
            // 40% of 100% so
            let lightScaleRatio = (ratioValue < 0.6 ? 0.6 : ratioValue)

            glow[bulbIdx].img.scale(lightScaleRatio)  
          }
        }
      })
      
      function voltageNotSet(){
        setCC("Please set the ac voltage first !")
        Dom.setBlinkArrowRed(true,115,240,null,null,-90).play()
      }
      let isOneTimeClick = true
      Scenes.items.btn_auto.item.onclick = ()=>{
        if(isVoltageSet){
          loopedAutoAnime.play()
          Dom.setBlinkArrowRed(-1)
        }else{
          voltageNotSet()
        }
      }
      Scenes.items.btn_manual.item.onclick = ()=>{
        if(isVoltageSet){
          loopedAutoAnime.pause()
          Dom.setBlinkArrowRed(-1)
          isOneTimeClick = false
          if(isOneTimeClick)
            setCC("Change the firing angle")
        }else{
          voltageNotSet()
        }
      }
      
      let st = {
        transition: "0.1s",
      }
      let glowAndDimAll = {
        min: 0,
        max: 180,
      }
      let glow = [
        first = { // opacity from 0 to 1
          img: Scenes.items.part_4_bulb_3.styles(st),
          min: 0,
          max: 90,
        },
        second= { // opacity from 0 to 1
          img: Scenes.items.part_4_bulb_2.styles(st),
          min: 80,
          max: 150,
        },
        third= { // scale from 1 to 0.6
          img: Scenes.items.part_4_bulb_1.styles(st),
          min: 140,
          max: 180,
        },
      ]

      let FirstTimeDone = true
      
      // oninput function
      function onValueChangeGlowImgs(e){
        let value = sliders.d.value
        // for all three images
        if(glowAndDimAll.min <= value && value <= glowAndDimAll.max){
          let min = glowAndDimAll.min
          let max = glowAndDimAll.max
          let ratioValue = 1 - (value - min) / (max - min)
          let bulbIdx = 0
          glow[bulbIdx++].img.opacity(ratioValue).scale(ratioValue)
          glow[bulbIdx++].img.opacity(ratioValue).scale(ratioValue)
          // for light image scale is not less then 0.6
          // 40% of 100% so
          let lightScaleRatio = (ratioValue < 0.6 ? 0.6 : ratioValue)

          console.log(ratioValue)
          glow[bulbIdx].img.scale(lightScaleRatio)  
        }
        
        let slider_D = document.querySelector(".slider_D")
        let sliderImg = document.querySelector(".slider-D-arrow")
        let sliderValueInput = document.querySelector(".d .value-box input")
        sliderValueInput.readOnly = true
        let val = 0
        
        // slider function  
        e = e instanceof Event
        if(e){
          sliderValueInput.value = slider_D.value 
        }
        else{
          slider_D.value = sliderValueInput.value
        }
        val = ((slider_D.value * 95) / 109) - 7
        sliderImg.style.left = `${114 + val}px`
      }
      
      // ! firing slider oninput
      onValueChangeGlowImgs()
      sliders.d.oninput = (e)=> {
        if(FirstTimeDone == true){
          setTimeout(() => {
            setCC("Click 'Next' to got to next step")
            Dom.setBlinkArrow(true, 790, 555).play()
            setIsProcessRunning(false)
            // nextBtn.onclick = ()=>{
            //   location.reload()
            // }
          }, 5000)
          FirstTimeDone = false
        }
        onValueChangeGlowImgs(e)
      }
      
      return true
    }),

    //! R LOAD  Waveforms section 
    (step7 = function () {
      setIsProcessRunning(true);
      // to hide previous step

     //! Required Items
     Scenes.items.btn_next.show()
     Scenes.items.slider_box.hide()

     //r load click
     let arrowIdx = 0;
     let arrows = [
      ()=>{
        Dom.setBlinkArrowRed(true, 669, 73, 30,null,180).play();
        arrowIdx++
      },
      ()=>{
        Dom.setBlinkArrowRed(true, 669, 164, 30,null,180).play();
        arrowIdx++
      },
      ()=>{
        Dom.setBlinkArrowRed(true, 669, 256, 30,null,180).play();
        arrowIdx++
      }, 
      ()=>{
        Dom.setBlinkArrowRed(-1)
      }
     ]

     arrows[arrowIdx]()
     setCC("To View the experimental waveforms select the parameters.")
     Scenes.items.components_r_load.set(0, -24, 462)

     let btns = [
       Scenes.items.btn_input_voltage.set(719, 159 - 92, 47).zIndex(1), 
       Scenes.items.btn_load_resistance.set(719, 159, 47).zIndex(1),
       Scenes.items.btn_firing_angle.set(719, 159 + 92, 47).zIndex(1)
     ]
     
     let vals = [
       Scenes.items.val_v.set(719, 35 + 159 - 92, 47).zIndex(1).hide(), 
       Scenes.items.val_r.set(719, 35 + 159, 47).zIndex(1).hide(), 
       Scenes.items.val_a.set(719, 35 + 159 + 92, 47).zIndex(1).hide()
     ]

     let optionsClick = [0, 0, 0]
     let btn_see_waveforms = Scenes.items.bnt_click.set(600, 374, 43).zIndex(1)

     btns.forEach((btn, idx)=>{
      btn.item.onclick = ()=>{
        arrows[arrowIdx]()
        vals[idx].show()
        optionsClick[idx] = 1
        if(optionsClick.indexOf(0) == -1){
          Scenes.items.circle.set(580, 346, 93)
          btn_see_waveforms.item.classList.add("btn-img")
          let scaleBtn = anime({
           targets: Scenes.items.bnt_click.item,
           scale: [1, 1.1],
           duration: 1000,
           easing: "linear",
           loop: true
          })
          btn_see_waveforms.item.onclick = ()=>{
            scaleBtn.reset()
            waveformShow()
          }
        } 
      }
     })
  
     let scenes = [
       Scenes.items.r_load_click_1.set(15, -30, 444).hide(),
       Scenes.items.r_load_click_2.set(15, -30, 444).hide(),
       Scenes.items.r_load_click_3.set(15, -30, 444).hide(),
       Scenes.items.r_load_click_4.set(15, -30, 444).hide(),
     ]

     let waveformShow = ()=>{
      vals.forEach((_, idx)=>{
        btns[idx].hide()
        vals[idx].hide()
      })
     Scenes.items.circle.set(580, 346, 93).hide()
      Scenes.items.bnt_click.hide()
      Scenes.items.components_r_load.hide()

      Dom.setBlinkArrowRed(true, 555, 80,30,null,0).play();
      
      scenes[0].show()
      setCC("The experimental waveforms discussion is given here. AC supply voltage of 100 Volt is given to the AC voltage controller.")

      setTimeout(()=>{
        // setCC("Click 'Next' to go to next step");
        Dom.setBlinkArrow(true, 790, 415).play();
        setIsProcessRunning(false);
      }, 6000)
     }

      return true
    }),

    //! R LOAD  CLICK 2
    (step8 = function () {
      setIsProcessRunning(true);

     //! Required Items
     Scenes.items.btn_next.show()
     Scenes.items.slider_box.hide()
      // to hide previous step
      Scenes.items.r_load_click_2.set(15, -30, 444)
      Dom.setBlinkArrowRed(true, 555, 80 + 80,30,null,0).play();

      setCC("Voltage across load is equal to AC input voltage when thyristors are in ON-state and it is close to zero when thyristors are in OFF-state.")

      setTimeout(()=>{
        // setCC("Click 'Next' to go to next step");
        Dom.setBlinkArrow(true, 790, 415).play();
        setIsProcessRunning(false);
      }, 7000)

     //! Required Items


      return true
    }),

    //! R LOAD  CLICK 3
    (step9 = function () {
      setIsProcessRunning(true);

      
     //! Required Items
     Scenes.items.btn_next.show()
     Scenes.items.slider_box.hide()

      // to hide previous step
      Scenes.items.r_load_click_3.set(15, -30, 444)
      Dom.setBlinkArrowRed(true, 555, 80+80+80,30,null,0).play();

      setCC("Here, the load is resistive nature and hence its current waveform follows the load voltage waveform.")

      setTimeout(()=>{
        // setCC("Click 'Next' to go to next step");
        Dom.setBlinkArrow(true, 790, 415).play();
        setIsProcessRunning(false);
      }, 6000)

     //! Required Items


      return true
    }),

    //! R LOAD  CLICK 4
    (step10 = function () {
      setIsProcessRunning(true);
      // to hide previous step

      
     //! Required Items
     Scenes.items.btn_next.show()
     Scenes.items.slider_box.hide()
     
      Scenes.items.r_load_click_4.set(15, -30, 444)
      Dom.setBlinkArrowRed(true, 555, 80+80+80+80,30,null,0).play();

      setCC("Voltage across thyristor is equal to AC input voltage when thyristors are in OFF-state and it is close to zero when thyristors are in ON-state.")

      setTimeout(()=>{
        // setCC("Click 'Next' to go to next step");
        Dom.setBlinkArrow(true, 790, 415).play();
        setIsProcessRunning(false);
      }, 8000)

     //! Required Items

      return true
    }),

    //! RL LOAD  Waveforms section 
    (step11 = function () {
      setIsProcessRunning(true);
      // to hide previous step

     //! Required Items
     Scenes.items.btn_next.show()
     Scenes.items.slider_box.hide()

     let arrowIdx = 0;
     let arrows = [
      ()=>{
        Dom.setBlinkArrowRed(true, 648, 67, 30,null,180).play();
        arrowIdx++
      },
      ()=>{
        Dom.setBlinkArrowRed(true, 648, 153, 30,null,180).play();
        arrowIdx++
      },
      ()=>{
        Dom.setBlinkArrowRed(true, 648, 237, 30,null,180).play();
        arrowIdx++
      }, 
      ()=>{
        Dom.setBlinkArrowRed(true, 648, 322, 30,null,180).play();
        arrowIdx++
      }, 
      ()=>{
        Dom.setBlinkArrowRed(-1)
      }
     ]
     arrows[arrowIdx]()

     //* Required items
      setCC("To View the experimental waveforms select the parameters.")

      Scenes.items.circle.set(322, 346, 98).hide()
      Scenes.items.components_rl_load.set(0, -24, 462)
      Scenes.items.beta_line_blinking.set(104, 134, 196).zIndex(1).hide()

     let btns = [
       Scenes.items.btn_input_voltage.set(697, 133 - 70, 45).zIndex(1), 
       Scenes.items.btn_load_resistance.set(697, 15+133, 45).zIndex(1),
       Scenes.items.btn_load_inductance.set(697, 25+133 + 74, 45).zIndex(1),
       Scenes.items.btn_firing_angle.set(697, 35+133 + 74+ 74, 45).zIndex(1)
     ]
     
     let vals = [
      Scenes.items.val_v.set(697, 38+133 - 70, 45).zIndex(1).hide(), 
      Scenes.items.val_r.set(697, 15+38+133, 45).zIndex(1).hide(),
      Scenes.items.val_l.set(697, 25+38+133 + 74, 45).zIndex(1).hide(),
      Scenes.items.val_a.set(697, 35+38+133 + 74+ 74, 45).zIndex(1).hide()
     ]

     //* To check if all the btns are clicked or not
     let optionsClick = [0, 0, 0, 0]
     let btn_see_waveforms = Scenes.items.bnt_click.set(349, 378, 43).zIndex(1)

     //* onclick for each btn
     btns.forEach((btn, idx)=>{
      btn.item.onclick = ()=>{
        arrows[arrowIdx]()
        vals[idx].show()
        optionsClick[idx] = 1

        //* if all btns are clicked then see waveform active
        if(optionsClick.indexOf(0) == -1){
          Scenes.items.circle.show()
          btn_see_waveforms.item.classList.add("btn-img")
          anime({
           targets: Scenes.items.bnt_click.item,
           scale: [1, 1.1],
           duration: 1000,
           easing: "linear",
           loop: true
          })
          btn_see_waveforms.item.onclick = waveformShow
        } 

      }
     })
  
     let scenes = [
       Scenes.items.rl_load_click_1.set(10, -25, 453).hide(),
       Scenes.items.rl_load_click_2.set(10, -25, 453).hide(),
       Scenes.items.rl_load_click_3.set(10, -25, 453).hide(),
       Scenes.items.rl_load_click_4.set(10, -25, 453).hide(),
     ]

     let waveformShow = ()=>{
      vals.forEach((_, idx)=>{
        btns[idx].hide()
        vals[idx].hide()
      })
     Scenes.items.circle.set(580, 346, 93).hide()
      Scenes.items.bnt_click.hide()
      Scenes.items.components_rl_load.hide()

      Dom.setBlinkArrowRed(true, 555, 10+80,30,null,0).play();
      
      scenes[0].show()
      // Scenes.items.beta_line_blinking.show()
      // anime({
      //   targets: Scenes.items.beta_line_blinking.item,
      //   scale: [1, 1.1],
      //   easing: "easeInOutQuad",
      //   duration: 2000,
      //   loop: true  
      //  })
      
      setCC("AC supply voltage of 100 Volt (RMS value) is given to the AC voltage controller.")

      setTimeout(()=>{
        // setCC("Click 'Next' to go to next step");
        Dom.setBlinkArrow(true, 790, 415).play();
        setIsProcessRunning(false);
      }, 4000)
     }

      return true
    }),

    //! RL LOAD  CLICK 2
    (step12 = function () {
      setIsProcessRunning(true);

     //! Required Items
     Scenes.items.btn_next.show()
     Scenes.items.slider_box.hide()

     Scenes.items.rl_load_click_2.set(10, -25, 453)
     Scenes.items.beta_line_blinking.set(104, 134, 196).zIndex(1)

     anime({
      targets: Scenes.items.beta_line_blinking.item,
      scale: [1, 1.1],
      easing: "easeInOutQuad",
      duration: 2000,
      loop: true

     })

      // to hide previous step
      Dom.setBlinkArrowRed(true, 555,10+ 80 + 80,30,null,0).play();

      setCC("Due to high inductance at load, the load current continue to flow even after complete half cycle," )
      setCC("hence the voltage across the load is non zero after half cycle.")

      setTimeout(()=>{
        // setCC("Click 'Next' to go to next step");
        Dom.setBlinkArrow(true, 790, 415).play();
        setIsProcessRunning(false);
      }, 9000)

     //! Required Items


      return true
    }),

    //! RL LOAD  CLICK 3
    (step13 = function () {
      setIsProcessRunning(true);

      
     //! Required Items
     Scenes.items.btn_next.show()
     Scenes.items.slider_box.hide()

      // to hide previous step

      Scenes.items.rl_load_click_3.set(10, -25, 453)
      Scenes.items.beta_line_blinking.set(104, 134, 196).zIndex(1)
 
      anime({
       targets: Scenes.items.beta_line_blinking.item,
       scale: [1, 1.1],
       easing: "easeInOutQuad",
       duration: 2000,
       loop: true 
      })
 
      Dom.setBlinkArrowRed(true, 555, 10+80+80+80,30,null,0).play();

      setCC("Load current Flow only when load voltage is non-zero.")

      setTimeout(()=>{
        // setCC("Click 'Next' to go to next step");
        Dom.setBlinkArrow(true, 790, 415).play();
        setIsProcessRunning(false);
      }, 4000)

     //! Required Items


      return true
    }),

    //! RL LOAD  CLICK 4
    (step14 = function () {
      setIsProcessRunning(true);
      // to hide previous step

      
     //! Required Items
     Scenes.items.btn_next.show()
     Scenes.items.slider_box.hide()

     Scenes.items.rl_load_click_4.set(10, -25, 453)
     Scenes.items.beta_line_blinking.set(104, 134, 196).zIndex(1)

     anime({
      targets: Scenes.items.beta_line_blinking.item,
      scale: [1, 1.1],
      easing: "easeInOutQuad",
      duration: 2000,
      loop: true 
     })
     
      Dom.setBlinkArrowRed(true, 555,10+ 80+80+80+80,30,null,0).play();

      setCC("Voltage across thyristor is equal to AC input voltage when thyristors are in OFF-state and it is close to zero when thyristors are in ON-state.")

      setTimeout(()=>{
        setCC("Simulation Done")
        Dom.setBlinkArrow(true, 790, 415).play();
        setIsProcessRunning(false);
      }, 8000)

     //! Required Items

      return true
    }),
  
  ],
  // ! For adding realcurrentstep in every step
  // ! For tracking the current step accuratly
  realCurrentStep: null,
  setRealCurrentStep(){
    let count = 0
    this.steps.forEach((step,idx) => {
      const constCount = count
      let newStep = () => {
        this.realCurrentStep = constCount;
        console.log(`RealCurrentStep: ${this.realCurrentStep}`)
        return step();
      };

      count++;
      this.steps[idx] = newStep
    });
  },
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]()
      this.currentStep++
      backDrawerItem()
      backProgressBar()
    }
  },
  next() {
    if(!this.realCurrentStep){
      Scenes.setRealCurrentStep()
    }
    //! animation isRunning
    if (isRunning) {
      return
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        nextDrawerItem();
        nextProgressBar();
        this.currentStep++;
      }         
    } else {
      
    }
  },
}

// stepcalling
Scenes.currentStep = 2

Scenes.next()
// Scenes.steps[3]()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next")

const backBtn = get(".btn-back")
nextBtn.addEventListener("click", () => {
  Scenes.next();
})
backBtn.addEventListener("click", () => {
  Scenes.back();
})

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
  }
});

// ! Anime Header Hover Buttons
function btnPopupBox(){
  let popupBtns = document.querySelectorAll(".btn-popup")
  let popupWindow = document.querySelector(".btn-popup-window")
  
  popupBtns[0].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_procedure.item.src
  }
  popupBtns[1].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src
  }
  popupBtns[2].onmouseover = ()=>{
    switch (Scenes.forMathematicalExpressionBtn) {
      case 1:
        popupWindow.src = Scenes.items.formulas_ideal.item.src
        break;

      case 2:
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src
        break;

      case 3:
        popupWindow.src = Scenes.items.formulas_efficiency.item.src
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src
        break;
    
      default:
        popupWindow.src = Scenes.items.formulas_universal.item.src
        break;
    }
  }
}
btnPopupBox()

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }























