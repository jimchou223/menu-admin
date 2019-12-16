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

// function chooseInput() {
//     let setInput = 'test'
//     if ($('#set-input').value == '') {
//         setInput = $('create-set').value
//     } else if ($('#set-input').value !== '') {
//         setInput = $('#set-input').value
//     }
//     console.log(setInput)
//     return setInput

// }

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
            // console.log(textStatus);
            // console.log(jqXHR);
            callback(data)
        }
    })
}

$('#remove').click(function (e) {
    e.preventDefault()
    const newDish = {
        name: dishInput.value,
    }
    // ajaxRequest('http://localhost:3000/deleteone', "POST", JSON.stringify(newDish))
    ajaxRequest('https://menu-server-jim.herokuapp.com/deleteone', "POST", JSON.stringify(newDish))
    clearForm()
    alert('one deleted')
    // clearValue(ingredients)
})

$('#input').click(function (e) {
    $('#form').submit(function (e) {
        console.log('input')
        e.preventDefault()
        let ingredientArr = []
        let ingredients = document.querySelectorAll('.ingredient-input')
        ingredients.forEach(el => ingredientArr.push(el.value))

        // setInput = chooseInput($('#set-input'), $('#create-set'))
        let ans
        if ($('#set-input').value == 'empty') {
            ans = $('create-set').val()
        } else if ($('#set-input').value !== '') {
            ans = $("#set-input :selected").val()
        }

        const newDish = {
            set: ans,
            name: dishInput.value,
            index: indexInput.value,
            category: categoryInput.value,
            ingredients: ingredientArr
        }
        console.log(newDish)


        // ajaxRequest('http://localhost:3000/post', "POST", JSON.stringify(newDish))
        ajaxRequest('https://menu-server-jim.herokuapp.com/post', "POST", JSON.stringify(newDish))
        clearForm()
    })
    alert('new dish added')
})

let allSetArr = []

function putData(data) {
    data.forEach((el) => {
        alldishArr.push({ name: el.name })
        if (!allSetArr.includes(el.set)) {
            allSetArr.push(el.set)
        }
    })
    for (let i = 0; i < allSetArr.length; i++) {
        $('#set-input').append(`<option>${allSetArr[i]}</option>`)
    }

}


function clearForm() {
    clearValue(arr)
    ingredientNode.innerHTML = ''
}

function addOption() {


}

let alldishArr = []
async function getAll() {
    ajaxRequest('https://menu-server-jim.herokuapp.com/findall', "GET", '', putData)
    // addOption()
    // uniqueSetArr = findUnique(allSetArr)
    // console.log(uniqueSetArr)
}

function findUnique(arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        if (!newArr.includes(arr[i])) {
            newArr.push(arr[i])
        }
    }
    return newArr
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

        let ans
        if ($('#set-input').value == '') {
            ans = $('create-set').value
        } else if ($('#set-input').value !== '') {
            ans = $("#set-input :selected").val()
        }
        console.log(ans)

        const newDish = {
            set: ans,
            name: dishInput.value,
            category: categoryInput.value,
            index: indexInput.value,
            ingredients: ingredientArr
        }
        console.log(newDish.set)
        // ajaxRequest('http://localhost:3000/findandmodify', "POST", JSON.stringify(newDish))
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
