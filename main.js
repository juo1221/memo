"use strict";

const button = document.querySelector(".plus");
const input = document.querySelector("#input");
const main__contents = document.querySelector(".main__contents");
const form = document.querySelector("form");
const deleteAll = document.querySelector(".seleted");
const TODOS_LS = "items";
let toDos = [];

// localStorage.clear();
function onAdd(text) {
  // 1. 사용자가 입력한 텍스트 받아오기
  if (text === "") {
    input.focus();
    return;
  }

  // 2. 새로운 아이템 생성 ( 텍스트 + 삭제 버튼)
  const item = createItem(text);

  // 3. main__contents안에 새로만든 아이템 추가
  main__contents.appendChild(item);

  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: "center" });

  // 5. 인풋을 초기화
  input.value = "";
  input.focus();
}

// 아이템 생성 & 삭제
function createItem(text) {
  const newId = toDos.length + 1;
  const contentList = document.createElement("li");
  contentList.setAttribute("class", "content__list");
  contentList.setAttribute("data-id", newId);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveLocalItem();

  contentList.innerHTML = `
    <span class="content__subject">Plan</span>
    <div class="content__plan">
      <span class="content__name">${text}</span>
      <button class="button trash" data-key= ${newId}>
       <i class="far fa-trash-alt" data-key= ${newId}></i>
      </button>
    </div>
  `;

  main__contents.addEventListener("click", deleteLocal);

  return contentList;
}

function deleteLocal(e) {
  const id = e.target.dataset.key;
  if (id) {
    const toBeDeleted = document.querySelector(
      `.content__list[data-id="${id}"]`
    );
    toBeDeleted.remove();

    // 버튼 클릭시 해당 local 데이터 삭제
    const targetListDelete = toDos.filter((item) => {
      return item.id !== parseInt(id);
    });
    toDos = targetListDelete;
    saveLocalItem();
  }
}

function onlocal(e) {
  e.preventDefault();
  onAdd(input.value);
}

function saveLocalItem() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function load() {
  const itemsArray = localStorage.getItem(TODOS_LS);
  if (itemsArray !== null) {
    const data = JSON.parse(itemsArray);

    data.forEach((item) => {
      onAdd(item.text);
    });
  }
}

function init() {
  load();
  form.addEventListener("submit", onlocal);
  button.addEventListener("click", () => {
    onAdd(input.value);
  });

  deleteAll.addEventListener("click", () => {
    const confrim = confirm("모든 데이터가 삭제됩니다");
    if (confrim) {
      localStorage.clear();
      main__contents.remove();
      input.focus();
    }
  });
}

init();
