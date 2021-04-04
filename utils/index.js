const utils = {};

utils.paginationArray = function(num) {
  let pageNums = new Array(num);
  for (let i=0; i<pageNums.length; i++) {
    pageNums[i] = i+1;
  }
  return pageNums;
}

module.exports = utils;
