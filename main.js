let item = {
    name: "nome dell'oggetto",
    netPrice: 10, // prezzo netto
    weight: 250, // peso dell'oggetto in grammi
    discount: 10, // sconto applicato all'oggetto, può essere 0
    quantity: 2 // numero di oggetti di questo tipo
}

const cart = [
    {
        name: 'ssd',
        netPrice: 95,
        weight: 100,
        discount: 5,
        quantity: 2
    },
    {
    name: 'motherboard',
    netPrice: 270,
    weight: 900,
    discount: 0,
    quantity: 1
    },
    {
    name: 'ram',
    netPrice: 120,
    weight: 60,
    discount: 10,
    quantity: 2
    },
    {
    name: 'processor',
    netPrice: 400,
    weight: 130,
    discount: 0,
    quantity: 1
    },
    {
    name: 'power supply',
    netPrice: 130,
    weight: 1400,
    discount: 15,
    quantity: 1
    },
    {
    name: 'cpu cooler',
    netPrice: 170,
    weight: 1000,
    discount: 23,
    quantity:1
    },
    {
    name: 'gpu',
    netPrice: 1600,
    weight: 2500,
    discount: 0,
    quantity: 1
    },
    {
    name: 'case',
    netPrice: 130,
    weight: 3500,
    discount: 30,
    quantity: 1
    }
];

const list = document.getElementById('lista')
cart.forEach(printElement)

function printElement(item, index){
    const listItem = document.createElement("li")
    listItem.classList.add("list-group-item", "item")
    listItem.innerHTML = `
    <div class="d-flex flex-row justify-content-between">
        <div class=" w-25">${item.name} </div>
        <div class="d-flex flex-row justify-content-end">
            <div class="d-flex flex-row justify-content-end">
                <span class="p-2">${item.netPrice}€ </span>
                <span class="p-2">-${item.discount}% </span>
            </div>   
            <div class="d-flex flex-row justify-content-end">
                    <label for="Quantity${index}" class="form-label">Quantity:</label>
                    <input type="number" class="form-control w-25" id="Quantity${index}" placeholder="0">
            </div>
        </div>
        <button type="button" class="btn btn-primary" > <span class="material-symbols-outlined">add_shopping_cart</span></button>
    </div>
    `
    list.appendChild(listItem)
}

function totalWeight(cart){
    let tot = 0
    for(let i = 0; i<cart.length; i++){
        tot+=cart[i].weight
    }
    return tot
}

function shippingCost(cart){
    let tot = totalWeight(cart)
    if(tot > 10)
        return 20
    if(tot > 5)
        return 15
    if(tot > 2)
        return 7
    return 0
}

function taxes(id){
    if(id=="IT")
        return 0.22
    else 
        return 0
}

let id = "IT"
function calcPrice(item){
    let tax = taxes(id)
    let price = item.netPrice * (1 + tax - item.discount/100)
    return price
}

function calcTotal(cart){
    let tot = 0
    for(let i = 0; i<cart.length; i++){
        let price = calcPrice(cart[i])
        tot += price
        console.log("Item: "+ cart[i].name +" at price "+ price + "\n")
    }
        
    console.log("Total cost: "+ tot +"\n")
    console.log("Shipping: "+shippingCost(cart))
}


calcTotal(cart)

let selectedItems = []
const addToCart = document.querySelectorAll(".btn-primary")

addToCart.forEach((button, index)=>{
    button.addEventListener('click', function(){
        const product = cart[index]
        const itemQuantity = document.getElementById(`Quantity${index}`)
        const quantity = parseInt(itemQuantity.value)
        if(isNaN(quantity) || quantity<=0){
            alert("Bad input") 
            return 
        }
        if(quantity>product.quantity){
            alert("Not enough stock")
            return
        }
        console.log(product.quantity)
        product.quantity -= quantity
        console.log(product.quantity)
        const chosenProduct = {
            ...product,
            quantity
        }
        selectedItems.push(chosenProduct)
        console.log(selectedItems)
    })
})