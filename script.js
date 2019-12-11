const inputNewRow = document.getElementById('input-new-row')
const filterNewRow = document.getElementById('filter-new-row')
const inputDeleteRow = document.getElementById('input-remove-row')
const filterDeleteRow = document.getElementById('filter-remove-row')

const ingredientNode = document.getElementById('ingredient-node')

let indexInput = document.getElementById('index-input')
let setInput = document.getElementById('set-input')
let dishInput = document.getElementById('dish-input')
let input = document.getElementById('input')
let filterInput = document.getElementById('filter-input')
let categoryInput = document.getElementById('category-input')

const searchByName = document.getElementById('search-by-name')
let dishNameSearch = document.getElementById('dish-name-search')

let searchResult = document.getElementById('search-result')

const clear = document.getElementById('clear')

let arr = [setInput, indexInput, dishInput, categoryInput]



function clearHTML(arr) {
    arr.forEach(el => el.innerHTML = '')
}

function clearValue(arr) {
    arr.forEach(el => el.value = '')
}

inputNewRow.addEventListener('click', function (e) {
    e.preventDefault()
    let newLabel = document.createElement('label')
    let newInput = document.createElement('input')
    newLabel.setAttribute('class', 'col-sm-2 col-form-label')
    newInput.setAttribute('class', 'ingredient-input form-control')
    newInput.required = true
    // if (ingredientNode.childNodes.length <= 13) {
    ingredientNode.appendChild(newLabel)
    ingredientNode.appendChild(newInput)
    // }
    // input.insertBefore(newInput, input.childNodes[input.childNodes.length - 12])
})

inputDeleteRow.addEventListener('click', function (e) {
    e.preventDefault()
    // if (ingredientNode.childNodes.length > 5) {
    ingredientNode.removeChild(ingredientNode.lastChild)
    ingredientNode.removeChild(ingredientNode.lastChild)
    // }
})


$('#clear').click(function (e) {
    e.preventDefault()
    clearForm()
})

function ajaxRequest(url, type, data, callback) {
    $.ajax({
        url: url,
        type: type,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: data,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
            callback(data)
        }
    })
}

$('#remove').click(function (e) {
    e.preventDefault()
    const newDish = {
        name: dishInput.value,
    }
    ajaxRequest('https://menu-server-jim.herokuapp.com/deleteone', "POST", JSON.stringify(newDish))
    clearForm()
    // clearValue(ingredients)
})

$('#input').click(function (e) {
    $('#form').submit(function (e) {
        console.log('input')
        e.preventDefault()
        let ingredientArr = []
        let ingredients = document.querySelectorAll('.ingredient-input')
        ingredients.forEach(el => ingredientArr.push(el.value))

        const newDish = {
            set: setInput.value,
            name: dishInput.value,
            index: indexInput.value,
            category: categoryInput.value,
            ingredients: ingredientArr
        }

        ajaxRequest('https://menu-server-jim.herokuapp.com/post', "POST", JSON.stringify(newDish))
        clearForm()
    })
    alert('new dish added')
})


function putData(data) {
    data.forEach((el) => {
        alldishArr.push({ name: el.name })
    })
}

function clearForm() {
    clearValue(arr)
    ingredientNode.innerHTML = ''
}

let alldishArr = []
function getAll() {
    ajaxRequest('https://menu-server-jim.herokuapp.com/findall', "GET", '', putData)
}


searchByName.addEventListener('input', function (e) {
    e.preventDefault()
    let filtered = []
    searchResult.innerHTML = ''

    alldishArr.filter((el) => {
        if (el.name.includes(e.target.value)) {
            filtered.push(el)
        }
    })
    if (e.target.value !== '') {
        for (let i = 0; i < filtered.length; i++) {
            searchResult.innerHTML += `<p>${filtered[i].name}</p>`
        }
    }
})

$('#get-all-btn').click(function (e) {
    searchResult.innerHTML = ''
    for (let i = 0; i < alldishArr.length; i++) {
        searchResult.innerHTML += `<p>${alldishArr[i].name}</p>`
        console.log('print')
    }
})

$('#update').click(function (e) {
    $('#form').submit(function (e) {
        console.log('update')
        e.preventDefault()
        let ingredientArr = []
        let ingredients = document.querySelectorAll('.ingredient-input')
        ingredients.forEach(el => ingredientArr.push(el.value))
        let arr = [setInput, indexInput, dishInput, categoryInput]
        console.log(arr)

        const newDish = {
            set: setInput.value,
            name: dishInput.value,
            category: categoryInput.value,
            index: indexInput.value,
            ingredients: ingredientArr
        }
        ajaxRequest('https://menu-server-jim.herokuapp.com/findandmodify', "POST", JSON.stringify(newDish))
        clearForm()
    })
    alert('update completed')


})


function addFound(data) {
    // console.log('helloe')
    console.log(data)
    if (data.length !== 0) {
        indexInput.value = data[0].index
        setInput.value = data[0].set
        dishInput.value = data[0].name
        categoryInput.value = data[0].category
        ingredientNode.innerHTML = ''
        for (let i = 0; i < data[0].ingredients.length; i++) {
            let newLabel = document.createElement('label')
            let newInput = document.createElement('input')
            newLabel.setAttribute('class', 'col-sm-2 col-form-label')
            newInput.setAttribute('class', 'ingredient-input form-control')
            newInput.required = true
            newInput.value = data[0].ingredients[i]
            ingredientNode.appendChild(newLabel)
            ingredientNode.appendChild(newInput)

        }
        searchResult.innerHTML = 'Dish Found'
    } else {
        searchResult.innerHTML = 'Dish Not Found'
        clearForm()
        // console.log('Not found')
    }
}


searchByName.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = {
        name: dishNameSearch.value
    }
    searchResult.innerHTML = ''
    console.log('search')
    // ajaxRequest('http://localhost:3000/searchbyname', "POST", JSON.stringify(data), addFound)
    ajaxRequest('https://menu-server-jim.herokuapp.com/searchbyname', "POST", JSON.stringify(data), addFound)


})


function addIngredientInput() {
    let newLabel = document.createElement('label')
    let newInput = document.createElement('input')
    newLabel.setAttribute('class', 'col-sm-2 col-form-label')
    newInput.setAttribute('class', 'ingredient-input form-control')
    newInput.required = true
    ingredientNode.appendChild(newLabel)
    ingredientNode.appendChild(newInput)
}
