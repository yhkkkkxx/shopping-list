"use strict"

const insertItemBtn = document.querySelector('.insert');
const total = document.querySelector('.total-price');
const line = document.querySelector('.line');
const allClearBtn = document.querySelector('.all-clear');
var totalPrice = Number(0);


showTextIfListEmpty(true);


//아이템 추가 버튼
insertItemBtn.addEventListener('click', () => {
    checkBeforeInsert();
});


//아이템 추가 후 엔터
function onEnterKeyDown() {
    if(window.event.keyCode == 13) checkBeforeInsert();
}


//추가 전 검사
function checkBeforeInsert() {
    const item = document.querySelector('.input-item').value;
    var price = Number(document.querySelector('.input-price').value);

    if(item=='' || price=='') {
        clearInput();
        alert('please enter values');
        return;
    }

    if(isNaN(price)) {
        clearInput();
        alert('price must be a number');
        return;
    }

    insertItem(item, price);
}


//아이템 삭제 버튼
function delItem(delItemBtn) {
    delItemBtn.parentElement.remove();

    const priceText = delItemBtn.previousSibling.previousSibling.previousSibling.previousSibling;
    subTotal(Number(priceText.textContent.replace(/,/g, "")));
    checkIsListEmpty();
}


//전체 삭제
allClearBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.shopping-item');
    for(var i=0; i<items.length; i++) {
        items[i].remove();
    }

    total.textContent = '0';
    totalPrice = Number(0);
    
    checkIsListEmpty();
});


//리스트 비었는지 확인
function checkIsListEmpty() {
    const shoppingLists = document.querySelectorAll('.shopping-item');
    var isListEmpty = Boolean(true);
    
    if(shoppingLists.length > 0) {
        isListEmpty = Boolean(false);
    }

    showTextIfListEmpty(isListEmpty);
}

//안내 문구 표시
function showTextIfListEmpty (isListEmpty) {
    const shoppingList = document.querySelector('.main');
    const notice = document.querySelectorAll('.notice');
    
    if(isListEmpty && notice.length < 1) {
        const noticeText = document.createElement('div');
        noticeText.setAttribute('class', 'notice');
        
        noticeText.textContent = 'please enter items!';

        shoppingList.prepend(noticeText);
    }
    else if(!isListEmpty && notice.length == 1) {
        const noticeText = document.querySelector('.notice');
        noticeText.remove();        
    }
    else return;
}


// 아이템 추가
function insertItem (item, price) {

    const shoppingList = document.querySelector('.main');

    const listItem = document.createElement('div');
    listItem.setAttribute('class', 'shopping-item');
    listItem.innerHTML =
    `
    <input type="checkbox" onclick="checkItem(this)" class="item-checkbox">
    <label class="list list-item" checked="false" for="item-checkbox">${item}</label>
    <label class="list list-price" for="item-checkbox">${price.toLocaleString('ko-KR')}</label>
    <label class="list won" for="item-checkbox">won</label>
    <img class="del-item" onclick="delItem(this)" src="img/delete.png">
    `

    shoppingList.insertBefore(listItem, line);
    addTotal(price);
    clearInput();
    checkIsListEmpty();
}


//총합 계산
function addTotal (price) {
    totalPrice += price;
    total.innerHTML = totalPrice.toLocaleString('ko-KR');
}

function subTotal (price) {
    totalPrice -= price;
    total.innerHTML = totalPrice.toLocaleString('ko-KR');
}


//체크 시 취소선
function checkItem (checkBox) {
    checkBox = checkBox.nextSibling.nextSibling;
    checkBox.checked = !checkBox.checked;
    if(checkBox.checked == true) checkBox.style.textDecorationLine = 'line-through'
    else checkBox.style.textDecorationLine = 'none'
}


//입력칸 초기화
function clearInput () {
    const input = document.querySelectorAll('.input');

    for( var i=0;i<input.length;i++){
        input[i].value='';
    }
}
