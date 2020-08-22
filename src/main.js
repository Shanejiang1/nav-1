const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "C", url: "https://caniuse.com" },
  { logo: "G", url: "https://github.com" },
  { logo: "I", url: "https://www.iconfont.cn" },
  { logo: "L", url: "https://www.liaoxuefeng.com" },
  { logo: "M", url: "https://developer.mozilla.org" },
  { logo: "R", url: "http://www.ruanyifeng.com" },
  { logo: "W", url: "https://www.w3.org" },
  { logo: "Y", url: "https://www.yuque.com" },
  { logo: "Z", url: "https://www.zhangxinxu.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 删除 / 开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
          <div class="logo">
            ${node.logo}
          </div>
          <div class="link">
            ${simplifyUrl(node.url)}
          </div>
          <div class="close">
          <svg class="icon">
             <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
        </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入添加的网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  if (inputBlur === true) {
    return;
  } else if (inputBlur === false) {
  }
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

let input = document.querySelector("input");
input.onblur = inputBlur;
input.onfocus = inputFocus;
function inputBlur() {
  console.log(1);
  inputBlur = false;
}
function inputFocus() {
  console.log(2);
  inputBlur = true;
}
