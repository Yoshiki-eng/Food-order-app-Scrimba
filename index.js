import {menuArray} from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


const menuEl = document.getElementById('menu')
const addBtn = document.getElementById('add')
const yourOrderEl = document.getElementById('your-order')
const totalPriceEl = document.getElementById('total-price')
const purchaseBtn = document.getElementById('purchase-btn')
const modalEl = document.getElementById('modal')
const payBtn = document.getElementById('pay-btn')
const paymentForm = document.getElementById('payment-form')
const bottomSectionEl = document.getElementById('bottom-section')

let totalPrice = 0;

renderMenuItem()

document.addEventListener('click', function(e){
    
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
        addTotalPrice(e.target.dataset.add)
        totalPriceEl.innerHTML = "$" + totalPrice
        
    }
    else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
        subtractTotalPrice(e.target.dataset.remove)
        totalPriceEl.innerHTML = "$" + totalPrice
    
      
      
    }
})

function renderMenuItem(){
    menuArray.forEach(function(menu){
        menuEl.innerHTML += `
        <div class='menuItem'>
            <div class='menu-emoji'>
                ${menu.emoji}
            </div>
            <div class='menuText'>
                <h2 class='item-title'>${menu.name}</h2>
                <p class='item-desc'>${menu.ingredients}</p>
                <h2 class='item-price'>$${menu.price}</h2>
            </div>
            <div class='add-btn'>
              <button class='add' id='add' data-add=${menu.id}>+</button>
            </div>
        </div>
    
           <div class='divider'>
                <div class='inner'></div>
            <div>`
        
    })
}


function addTotalPrice(itemId){
      const targetMenuObj = menuArray.filter(function(menuItem){
        return menuItem.id === itemId
    })[0]
    
    totalPrice = totalPrice + targetMenuObj.price
   
}



function subtractTotalPrice(itemId){
     const targetMenuObj = menuArray.filter(function(menuItem){
        return menuItem.id === itemId
    })[0]
    
     console.log(totalPrice)
     totalPrice -= targetMenuObj.price
}


function handleRemoveClick(itemId){
     
    const targetMenuObj = menuArray.filter(function(menuItem){
        return menuItem.id === itemId
    })[0]
   
   document.getElementById(`added-${targetMenuObj.id}`).remove();
   
}


function handleAddClick(itemId){
    const targetMenuObj = menuArray.filter(function(menuItem){
        return menuItem.id === itemId
    })[0]
    
    yourOrderEl.innerHTML += `
    <div class='menuItem' id='added-${targetMenuObj.id}'>
        <h2 class='menuText ordred-menu-title'>${targetMenuObj.name}</h2>
        <button id='remove' data-remove=${targetMenuObj.id}>remove</button>
        <h2 ordred-menu-price>$${targetMenuObj.price}</h2>
    </div>`
    
}


purchaseBtn.addEventListener('click', function(){
    modalEl.style.display = 'block'

    
})

paymentForm.addEventListener('submit', function(e){
     e.preventDefault()
      
    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('fullName')

  modalEl.style.display = 'none';
  
  bottomSectionEl.innerHTML = `
  <div class='order-complete'>
    <h1 class='thanks-message'>Thanks, ${fullName}! Your order is on its way!</h1>
  </div>`
  
})






