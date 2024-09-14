let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let del;
let parentElement;
// function get total

let mode = "create";

function getTotal() {
  if (price.value != "") {
    let totale = 0;
    totale = +price.value;
    total.textContent = `Total : ${totale}`;
    total.style.backgroundColor = "green";
    if (price.value != "" && discount.value != "") {
      totale = +price.value - +discount.value;
      total.textContent = `Total : ${totale}`;
      total.style.backgroundColor = "green";
    }
    total.textContent = `Total : ${totale}`;
    if (price.value != "" && taxes.value != "") {
      totale = +price.value + +taxes.value;
      total.textContent = `Total : ${totale}`;
      total.style.backgroundColor = "green";
    }
    if (price.value != "" && taxes.value != "" && ads.value != "") {
      totale = +price.value + +taxes.value + +ads.value;
      total.textContent = `Total : ${totale}`;
      total.style.backgroundColor = "green";
      if (discount.value != "") {
        totale = +price.value + +taxes.value + +ads.value - discount.value;
        total.textContent = `Total : ${totale}`;
        total.style.backgroundColor = "green";
      }
    }
  } else {
    total.textContent = `Total :`;
    total.style.backgroundColor = "brown";
  }
}
// function creat product

let arrayData = [];

class Data {
  constructor(id, title, price, taxes, ads, discount, total, count, category) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.taxes = taxes;
    this.ads = ads;
    this.discount = discount;
    this.total = total;
    this.count = count;
    this.category = category;
  }
}
submit.addEventListener("click", () => {
  if (
    title.value != "" &&
    price.value != "" &&
    total.textContent != "" &&
    category.value != ""
  ) {
    if (count.value === "") {
      count.value = 1;
      newData = new Data(
        Date.now(),
        title.value,
        +price.value,
        +taxes.value,
        +ads.value,
        +discount.value,
        total.textContent,
        +count.value,
        category.value
      );
      if (mode == "create") {
        arrayData.push(newData);
      } else {
        submit.textContent = "update";
      }
      localStorage.setItem("arrayOfData", JSON.stringify(arrayData));
    } else {
      if (mode == "create") {
        for (let i = 1; i <= +count.value; i++) {
          let newData = new Data(
            Date.now(),
            title.value,
            +price.value,
            +taxes.value,
            +ads.value,
            +discount.value,
            +total.textContent.match(/\d+/gi),
            +count.value,
            category.value
          );
          arrayData.push(newData);
          localStorage.setItem("arrayOfData", JSON.stringify(arrayData));
        }
      }
    }
  }
});

submit.addEventListener("click", () => {
  if (mode == "create") {
    if (
      title.value != "" &&
      price.value != "" &&
      total.textContent != "" &&
      category.value != ""
    ) {
      tbody.innerHTML = "";
      for (let i = 0; i < arrayData.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${i}</td>
      <td>${arrayData[i].title}</td>
      <td>${arrayData[i].price}</td>
      <td>${arrayData[i].taxes}</td>
      <td>${arrayData[i].ads}</td>
      <td>${arrayData[i].discount}</td>
      <td>${arrayData[i].total}</td>
      <td>${arrayData[i].count}</td>
      <td>${arrayData[i].category}</td>
      <td><button id='update'>update</button></td>
      <td><button id='delete'>delete</button></td>
      `;
        let tbody = document.getElementById("tbody");
        tbody.appendChild(tr);
      }
      clearData();
      let delAll = document.getElementById("delAll");
      if (!delAll) {
        if (arrayData.length > 0) {
          let delAll = document.createElement("button");
          let bloock = document.querySelector(".searchBlook");
          delAll.innerHTML = `Delete All(${arrayData.length})`;
          delAll.id = "delAll";
          bloock.appendChild(delAll);
          console.log(bloock);
          console.log(delAll);
          delAll.addEventListener("click", () => {
            localStorage.clear();
            tbody.innerHTML = "";
            delAll.remove();
            console.log("hello");
            arrayData = [];
          });
        } else {
        }
      }
    }
  } else {
    parentElement.children[1].textContent = title.value;
    parentElement.children[2].textContent = price.value;
    parentElement.children[3].textContent = taxes.value;
    parentElement.children[4].textContent = ads.value;
    parentElement.children[5].textContent = discount.value;
    parentElement.children[6].textContent = total.textContent.match(/\d+/gi);
    parentElement.children[8].textContent = category.value;
    submit.textContent = "Create";
    mode = "create";
    count.style.display = "block";
    total.style.backgroundColor = "red";

    let index = parentElement.children[0].textContent; // أخذ الفهرس من العمود الأول

    // تحديث البيانات في arrayData
    arrayData[index].title = title.value;
    arrayData[index].price = price.value;
    arrayData[index].taxes = taxes.value;
    arrayData[index].ads = ads.value;
    arrayData[index].discount = discount.value;
    arrayData[index].total = total.textContent.match(/\d+/gi)[0]; // أخذ القيمة العددية من التوتال
    arrayData[index].category = category.value;

    // تحديث localStorage بالبيانات الجديدة
    localStorage.setItem("arrayOfData", JSON.stringify(arrayData));

    // إعادة الوضع إلى الإنشاء
    submit.textContent = "Create";
    mode = "create";
    count.style.display = "block"; // إعادة إظهار خانة العدد
    clearData(); // مسح الحقول بعد التحديث
  }
});

// save data in localstorage
// clear the input with they click in create button
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.textContent = "Total :";
  count.value = "";
  category.value = "";
}
// read the data in the page

window.addEventListener("load", () => {
  let myData = JSON.parse(localStorage.getItem("arrayOfData"));
  if (myData) {
    for (let i = 0; i < myData.length; i++) {
      arrayData.push(myData[i]);
    }
    let trarr = [];
    let tr = "";
    for (let i = 0; i < arrayData.length; i++) {
      tr = document.createElement("tr");
      trarr.push(tr);
      trarr[i].innerHTML = `
      <td>${i}</td>
      <td>${arrayData[i].title}</td>
      <td>${arrayData[i].price}</td>
      <td>${arrayData[i].taxes}</td>
      <td>${arrayData[i].ads}</td>
      <td>${arrayData[i].discount}</td>
      <td>${arrayData[i].total}</td>
      <td>${arrayData[i].count}</td>
      <td>${arrayData[i].category}</td>
      <td><button id='update'>update</button></td>
      <td><button id='delete'>delete</button></td>
      `;
      let tbody = document.getElementById("tbody");
      tbody.appendChild(tr);
    }

    if (arrayData.length > 0) {
      let delAll = document.createElement("button");
      let bloock = document.querySelector(".searchBlook");
      delAll.innerHTML = `Delete All(${arrayData.length})`;
      delAll.id = "delAll";
      bloock.appendChild(delAll);
      console.log(bloock);
      delAll.addEventListener("click", () => {
        localStorage.clear();
        tbody.innerHTML = "";
        delAll.remove();
      });
    } else {
    }
  }
});
let tbody = document.getElementById("tbody");
tbody.addEventListener("click", function (event) {
  // التحقق من أن العنصر الذي تم النقر عليه هو زر الحذف
  if (event.target.id === "delete") {
    let deleteButton = event.target;

    // الحصول على العنصر الأب (الصف الذي يحتوي على الزر)
    let parentElement = deleteButton.parentElement.parentElement;

    // افتراض أن الفهرس (index) مخزن في أول خلية (td) في الصف
    let index = parentElement.children[0].textContent; // أخذ الفهرس من العمود الأول

    // حذف الصف من DOM
    parentElement.remove();

    // حذف العنصر من arrayData بناءً على الفهرس
    arrayData.splice(index, 1);

    // تحديث البيانات في localStorage
    localStorage.setItem("arrayOfData", JSON.stringify(arrayData));
  }
});

tbody.addEventListener("click", function (event) {
  // التحقق من أن العنصر الذي تم النقر عليه هو زر الحذف
  if (event.target.id === "update") {
    let updateButton = event.target;
    parentElement = updateButton.parentElement.parentElement;
    title.value = `${parentElement.children[1].textContent}`;
    price.value = `${parentElement.children[2].textContent}`;
    taxes.value = `${parentElement.children[3].textContent}`;
    ads.value = `${parentElement.children[4].textContent}`;
    discount.value = `${parentElement.children[5].textContent}`;
    total.textContent = `total: ${parentElement.children[6].textContent}`;
    count.value = `${parentElement.children[7].textContent}`;
    category.value = `${parentElement.children[8].textContent}`;
    mode = "update";
    // افتراض أن الفهرس (index) مخزن في أول خلية (td) في الصف
    // let index = parentElement.children[0].textContent; // أخذ الفهرس من العمود الأول
    submit.textContent = "update";
    // تحديث البيانات في localStorage
    localStorage.setItem("arrayOfData", JSON.stringify(arrayData));
    count.style.display = "none";
  }
});

let searchMode = "title";
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
searchTitle.addEventListener("click", () => {
  searchMode = "title";
  search.focus();
  search.placeholder = "Search By Titel";
});
let searchCategory = document.getElementById("searchCategory");
searchCategory.addEventListener("click", () => {
  searchMode = "category";
  search.focus();
  search.placeholder = "Search By Category";
});

search.addEventListener("keyup", () => {
  if (searchMode === "title") {
    tbody.innerHTML = "";
    for (let i = 0; i < arrayData.length; i++) {
      if (arrayData[i].title.toLowerCase().includes(search.value.toLowerCase())) {
        let tr = "";
        tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${i}</td>
      <td>${arrayData[i].title}</td>
      <td>${arrayData[i].price}</td>
      <td>${arrayData[i].taxes}</td>
      <td>${arrayData[i].ads}</td>
      <td>${arrayData[i].discount}</td>
      <td>${arrayData[i].total}</td>
      <td>${arrayData[i].count}</td>
      <td>${arrayData[i].category}</td>
      <td><button id='update'>update</button></td>
      <td><button id='delete'>delete</button></td>
      `;
        let tbody = document.getElementById("tbody");
        tbody.appendChild(tr);
      }
    }
  } else {
    tbody.innerHTML = "";
    for (let i = 0; i < arrayData.length; i++) {
      if (arrayData[i].category.toLowerCase().includes(search.value.toLowerCase())) {
        let tr = "";
        tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${i}</td>
      <td>${arrayData[i].title}</td>
      <td>${arrayData[i].price}</td>
      <td>${arrayData[i].taxes}</td>
      <td>${arrayData[i].ads}</td>
      <td>${arrayData[i].discount}</td>
      <td>${arrayData[i].total}</td>
      <td>${arrayData[i].count}</td>
      <td>${arrayData[i].category}</td>
      <td><button id='update'>update</button></td>
      <td><button id='delete'>delete</button></td>
      `;
        let tbody = document.getElementById("tbody");
        tbody.appendChild(tr);
      }
    }
  }
});

