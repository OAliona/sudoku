function intersection(possibleValuesByRow, possibleValuesByColumn, possibleValuesByBlock) {
  const possibleValues = possibleValuesByRow.filter(value => possibleValuesByColumn.includes(value));

  return possibleValues.filter(value => possibleValuesByBlock.includes(value));

}

module.exports = function solveSudoku(matrix) {
  function getRow(rowIndex) {
    return matrix[rowIndex];
  }

  function getColumn(columnIndex) {
    const column = [];

    matrix.forEach(function (row) {
      column.push(row[columnIndex]);
    });

    return column;
  }      

  function getBlock(rowIndex, columnIndex) {
    const block = [];

    const x = Math.floor(rowIndex/3);
    const y = Math.floor(columnIndex/3);  
    
    const startx = 3 * x;
    const endx = 3 * (x + 1) - 1;
    const starty = 3 * y;
    const endy = 3 * (y + 1) - 1;
    
    for (let indexx = startx; indexx <= endx; indexx++) {
      for (let indexy = starty; indexy <= endy; indexy++) {
        block.push(matrix[indexx][indexy]);
      }
    }

    return block;    
  }

  function getPrediction(rowOrColumn) {
    const rawPrediction = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    rowOrColumn.forEach(function (number) {
      if (number != 0) {
        const predictionIndex = number - 1;

        rawPrediction[predictionIndex] = null;
      }
    });

    const prediction = [];

    rawPrediction.forEach(function (number) {
      if (number != null) {
        prediction.push(number);
      }
    })

    return prediction;
  }

  function getPredictionByBlock(block) {
    const rawPrediction = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    block.forEach(function (number) {
      if (number != 0) {
        const predictionIndex = number - 1;

        rawPrediction[predictionIndex] = null;
      }
    });

    const prediction = [];

    rawPrediction.forEach(function (number) {
      if (number != null) {
        prediction.push(number);
      }
    })

    return prediction;
  }

  function getPossibleValues(rowIndex, columnIndex) {
    const row = getRow(rowIndex);
    const column = getColumn(columnIndex);
    const block = getBlock(rowIndex, columnIndex);

    const possibleValuesByRow = getPrediction(row);
    const possibleValuesByColumn = getPrediction(column);
    const possibleValuesByBlock = getPredictionByBlock(block);

    const possibleValues = intersection(
      possibleValuesByRow,
      possibleValuesByColumn,
      possibleValuesByBlock
    );

    return possibleValues;
  }

  let wasMatrixUpdated = false;

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < matrix[rowIndex].length; columnIndex++) {
      const number = matrix[rowIndex][columnIndex];

      if (number === 0) {
        const possibleValues = getPossibleValues(rowIndex, columnIndex);

        if (possibleValues.length === 1) {
          matrix[rowIndex][columnIndex] = possibleValues[0];
          wasMatrixUpdated = true;

          break;
        }
      }
    }

    if (wasMatrixUpdated) {
      break;
    }
  }

  if (wasMatrixUpdated) {
    return solveSudoku(matrix);
  }

  return matrix;
}