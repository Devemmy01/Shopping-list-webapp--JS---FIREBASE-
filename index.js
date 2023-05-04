import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-list-177a8-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list")


addButtonEl.addEventListener('click', function() {
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);
    clearInputField();
})

onValue(shoppingListInDB, function(snapshot){

    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val());
        clearShoppingListEl();
        for (let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i];

            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];

            appendItemToShoppingListEl(currentItem);
        } 
    } else {
        shoppingListEl.innerHTML = "No items here yet ..."
    }

    
})
const clearShoppingListEl = () => {
    shoppingListEl.innerHTML = ""
}

const clearInputField = () => {
    inputFieldEl.value = ""
}

const appendItemToShoppingListEl = (item) => {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener('click', function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark':'light'
// const getCurrentIcon = () => themeButton.body.classList.contains(iconTheme) ? 'bx-moon':'bx-sun'

if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', ()=> {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem( 'selected-theme', getCurrentTheme() )
    // localStorage.setItem( 'selected-icon', getCurrentIcon() )
})

const modal = document.getElementById("modal");
const modalButton = document.getElementById("modal-button");
const closeButton = document.getElementsByClassName("close-button")[0];

// Listen for modal button click
modalButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Listen for close button click
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Listen for outside click
window.addEventListener("click", event => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});