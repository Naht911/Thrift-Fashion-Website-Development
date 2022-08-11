function addToCart(btn){
    let trNode = btn.parentElement.parentElement
    let trNodeClone = trNode.cloneNode(true)
    let btnAdd = trNodeClone.getElementsByTagName('button');
    btnAdd[0].innerText = 'xoa';
    btnAdd[0].setAttribute('onclick','removeCartItem(this)');
    let cartBody = document.getElementById('cart-body');

    cartBody.appendChild(trNodeClone);

    let cartTable = document.getElementById('cartItems');
    cartTable.style.display = 'table';
// xoá hiển thị của emptyCart
    let emptyCart = document.getElementById('emptyCart');
    emptyCart.style.display = 'none';
    let grandTotal = document.getElementById('grandTotal');
    grandTotal.style.display = 'block';

    tongTotal();
}
//  Remove
function removeCartItem(btn){
    let trNode = btn.parentElement.parentElement
    let tbodyNode = trNode.parentElement
    tbodyNode.removeChild(trNode)
    if(tbodyNode.children.length <= 0){
        let cartTable = document.getElementById('cartItems');
        cartTable.style.display ='none';
        let emptyCart = document.getElementById('emptyCart');
        emptyCart.style.display ='block';
        let grandTotal = document.getElementById('grandTotal');
        grandTotal.style.display ='none';
        grandTotal.childNodes[1].innerText ='0';
    }
    tongTotal();
}
function tongTotal(){
    let cartItemsTable = document.getElementById('cartItems');
    let amountSpans = cartItemsTable.getElementsByClassName('amount')

    let total = 0;
    for(let element of amountSpans){
        total += Number(element.innerText);
    }
    let totalSpan = document.getElementById('total');
    totalSpan.innerText = total;
}