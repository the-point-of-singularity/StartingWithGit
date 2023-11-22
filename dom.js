//const headerTitle = document.getElementById('main-header');
//headerTitle.style.borderBottom = 'solid 3px #000';
//const addItem = document.getElementsByClassName('title');
//addItem[0].style.fontWeight = '700';
//addItem[0].style.color = 'green';
//const items = document.getElementsByClassName('list-group-item');
//items[2].style.backgroundColor = 'green';
//for(let i=0;i<items.length;i++) {
    //items[i].style.fontWeight = 'bold';
//}
let odd = document.querySelectorAll('li:nth-child(odd)');
for(let i=0;i<odd.length;i++) {
    odd[i].style.backgroundColor = 'blue';
}
