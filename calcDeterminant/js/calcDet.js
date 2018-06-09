const detArray = [
  [- 1, 2, 0, 3],
  [0, 3, 1, -2],
  [2, -1, 0, 3],
  [2, -1, -1, 3]
];

const DIMENSION = 4;
let answerLabel;

///////////メイン関数部分//////////////
window.onload = () => {
  answerLabel = document.getElementById("answerLabel");
  answerLabel.innerText = "Text";
}

const TraceDet = () => {
  let traceVal = 0;

  for (let i = 0; i < DIMENSION; i++) {
    traceVal += detArray[i][i];
  }

  return traceVal;
}

//方針：上三角行列を作って最後に体格成分の積を求める。
const Determinant = () => {
  let cpDetArray = detArray;
  
  //2つの行を交換する(交換時にマイナスをかけることに注意)
  const SwapLine = (l1, l2) => {
    let tmpLine = cpDetArray[l1];
    cpDetArray[l1] = cpDetArray[l2];
    cpDetArray[l2] = tmpLine;

    for (let i = 0; i < DIMENSION; i++) {
      cpDetArray[l2][i] *= -1;      
    }
  }

  for (let i = 0; i < DIMENSION; i++) {
    for (let j = i + 1; j < DIMENSION; j++) {

      //基準となる値が0のとき0では割れないため、他の行と入れ替える
      if (cpDetArray[i][i] === 0) {
        let k = i;
        while (cpDetArray[k][i] === 0) {
          k++;

          //入れ替える行がないとき対角成分がすべて0？
          if (k > DIMENSION) {
            return 0;
          }
        }
        SwapLine(i, k);
      }

      let bias = cpDetArray[j][i] / cpDetArray[i][i];
      for (let k = 0; k < DIMENSION; k++) {
        cpDetArray[j][k] -= cpDetArray[i][k] * bias;
      }
    }
  }

  let productTraceVal = 1;
  for (let i = 0; i < DIMENSION; i++) {
    productTraceVal *= cpDetArray[i][i];
  }

  return productTraceVal;
}

const OnClickTraceButton = () => {
  answerLabel.innerText = "TraceDet = " + TraceDet();
}

const OnClickDeterminantButton = () => {
  answerLabel.innerText = "Determinant = " + Determinant();
}