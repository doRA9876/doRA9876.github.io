const detArray = [
  [- 1, 2, 0, 3],
  [0, 3, 1, -2],
  [2, -1, 0, 3],
  [2, -1, -1, 3]
];

const DIMENSION = 4;
let answerLabel;

const MakeTable = (data, tableId) => {
  let rows = [];
  let table = document.createElement("table");

  for (let i = 0; i < data.length; i++) {
    rows.push(table.insertRow(-1));
    for (let j = 0; j < data[0].length; j++) {
      cell = rows[i].insertCell(-1);
      cell.appendChild(document.createTextNode(data[i][j]));

      if (i == 0) {
        cell.style.backgroundColor = "#bbb";
      } else {
        cell.style.backgroundColor = "#ddd";
      }
    }
  }
  document.getElementById(tableId).appendChild(table);
}

///////////メイン関数部分//////////////
window.onload = () => {
  answerLabel = document.getElementById("answerLabel");
  answerLabel.innerText = "Text";
  MakeTable(detArray, "table");
}

//対角成分の和
const TraceDet = (data) => {
  let traceVal = 0;

  for (let i = 0; i < data.length; i++) {
    traceVal += data[i][i];
  }

  return traceVal;
}

//方針：上三角行列を作って最後に体格成分の積を求める。
const Determinant = (data) => {
  let cpDetArray = $.extend(true, {}, data);
  cpDetArray.length = detArray.length;
  console.log(cpDetArray.length);
  
  // let cpDetArray = data;
  
  //2つの行を交換する(交換時にマイナスをかけることに注意)
  const SwapLine = (l1, l2) => {
    let tmpLine = cpDetArray[l1];
    cpDetArray[l1] = cpDetArray[l2];
    cpDetArray[l2] = tmpLine;

    for (let i = 0; i < cpDetArray.length; i++) {
      cpDetArray[l2][i] *= -1;      
    }
  }

  for (let i = 0; i < cpDetArray.length; i++) {
    for (let j = i + 1; j < cpDetArray.length; j++) {

      //基準となる値が0のとき0では割れないため、他の行と入れ替える
      if (cpDetArray[i][i] === 0) {
        let k = i;
        while (cpDetArray[k][i] === 0) {
          k++;

          //入れ替える行がないとき対角成分がすべて0？
          if (k > cpDetArray.length) {
            return 0;
          }
        }
        SwapLine(i, k);
      }

      let bias = cpDetArray[j][i] / cpDetArray[i][i];
      for (let k = 0; k < cpDetArray.length; k++) {
        cpDetArray[j][k] -= cpDetArray[i][k] * bias;
      }
    }
  }

  let productTraceVal = 1;
  for (let i = 0; i < cpDetArray.length; i++) {
    productTraceVal *= cpDetArray[i][i];
  }

  return productTraceVal;
}



const OnClickTraceButton = () => {
  answerLabel.innerText = "TraceDet = " + TraceDet(detArray);
}

const OnClickDeterminantButton = () => {
  answerLabel.innerText = "Determinant = " + Determinant(detArray);
}