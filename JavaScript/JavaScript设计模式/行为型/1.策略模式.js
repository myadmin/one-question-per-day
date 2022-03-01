/**
 * 策略模式
 */
// 处理预热价
function prePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 20;
  }
  return originPrice * 0.9;
}

// 处理大促价
function onSalePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 30;
  }
  return originPrice * 0.8;
}

// 处理返场价
function backPrice(originPrice) {
  if (originPrice >= 200) {
    return originPrice - 50;
  }
  return originPrice;
}

// 处理尝鲜价
function freshPrice(originPrice) {
  return originPrice * 0.5;
}

// 定义一个询价处理器对象
const priceProcessor = {
  pre(originPrice) {
    return originPrice >= 100 ? originPrice - 20 : originPrice * 0.9;
  },
  onSale(originPrice) {
    return originPrice >= 100 ? originPrice - 30 : originPrice * 0.8;
  },
  back(originPrice) {
    return originPrice >= 200 ? originPrice - 50 : originPrice;
  },
  fresh(originPrice) {
    return originPrice * 0.5;
  },
};

priceProcessor.newUser = (originPrice) =>
  originPrice >= 100 ? originPrice - 50 : originPrice;

function askPrice(tag, originPrice) {
  /*
  const price = new Map([
    // 处理预热价
    "pre",
    prePrice(originPrice),
    // 处理大促价
    "onSale",
    onSalePrice(originPrice),
    // 处理返场价
    "back",
    backPrice(originPrice),
    // 处理尝鲜价
    "fresh",
    freshPrice(originPrice),
  ]);

  return price.get(tag);
  */
 
  return priceProcessor[tag](originPrice);
}
