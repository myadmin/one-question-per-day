/**
 * 适配器模式
 */
// demo
class HttpUtils {
  // get 方法
  static get(url) {
    return new Promise((resolve, reject) => {
      // 调用fetch
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // post 方法，data以object形式传入
  static post(url, data) {
    return new Promise((resolve, reject) => {
      // 调用fetch
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // 将object类型的数据格式化为合法的body参数
        body: this.changeData(data),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // body请求体的格式方法
  static changeData(obj) {
    let prop,
      str = "";
    let i = 0;
    for (prop in obj) {
      if (!prop) return;
      if (i === 0) {
        str += `${prop}=${obj[prop]}`;
      } else {
        str += `&${props}=${obj[props]}`;
      }
      i++;
    }
    return str;
  }
}

function Ajax(type, url, data, success, failed) {
  // 创建ajax对象
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var type = type.toUpperCase();

  // 识别请求类型
  if (type == "GET") {
    if (data) {
      xhr.open("GET", url + "?" + data, true); //如果有数据就拼接
    }
    // 发送get请求
    xhr.send();
  } else if (type == "POST") {
    xhr.open("POST", url, true);
    // 如果需要像 html 表单那样 POST 数据，使用 setRequestHeader() 来添加 http 头。
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // 发送post请求
    xhr.send(data);
  }

  // 处理返回数据
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        success(xhr.responseText);
      } else {
        if (failed) {
          failed(xhr.status);
        }
      }
    }
  };
}

// 发送get请求
Ajax(
  "get",
  url地址,
  post入参,
  function (data) {
    // 成功的回调逻辑
  },
  function (error) {
    // 失败的回调逻辑
  }
);

// Ajax适配器函数，入参与旧接口保持一致
async function AjaxAdpter(type, url, data, success, failed) {
  const type = type.toUpperCase();
  let result;
  try {
    // 实际的请求全部由新接口发起
    if (type === "GET") {
      result = (await HttpUtils.get(url)) || {};
    } else if (type === "POST") {
      result = (await HttpUtils.post(url, data)) || {};
    }

    // 假设请求成功对应的状态码是200
    result.statusCode === 200 && success
      ? success(result)
      : failed(result.statusCode);
  } catch (err) {
    // 捕获网络错误
    failed && failed(err);
  }
}

// 用适配器适配旧的Ajax方法
async function Ajax(type, url, data, success, failed) {
  await AjaxAdpter(type, url, data, success, failed);
}
