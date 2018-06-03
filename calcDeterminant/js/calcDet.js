{
  const detArray = [
    [- 1, 2, 0, 3],
    [0, 3, 1, -2],
    [2, -1, 0, 3],
    [2, -1, -1, 3]
  ];

  const DIMENSION = 4;
 
  const TraceDet = () => {
    let traceVal = 0;

    for (let i = 0; i < DIMENSION; i++){
      traceVal += detArray[i][i];
    } 

    return traceVal;
  }

  ///////////メイン関数部分//////////////
  window.onload = () => {
    let traceText = document.getElementById("traceText");
    traceText.innerText = "Trace Value = " + TraceDet();
  }
}