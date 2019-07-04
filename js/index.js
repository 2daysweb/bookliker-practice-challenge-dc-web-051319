const baseURL = "http://localhost:3000/"
const booksURL = `${baseURL}books/`
let bookObjs = []
const user =  {
      "id": 1,
      "username": "pouros"
    }


document.addEventListener("DOMContentLoaded", function() {

	console.log("DOM Content loaded")
	getBooks() 

})

	function getBooks(){

    return fetch(booksURL)
		.then(resp => resp.json())
		.then(booksArray => booksArray.forEach(bookObj => renderBook(bookObj)))
	}

	function renderBook(bookObj){

		bookObjs.push(bookObj)

		let li = document.createElement('li')
		li.innerText = bookObj.title
		li.addEventListener("click", showBook)

		let ul = document.getElementById("list")
		ul.append(li)
	}

	function showBook(event){
		

		let bookTitle = event.target.innerText 
		var result = bookObjs.filter(book => {
			return book.title === bookTitle
		})
		let showPanelDiv = document.getElementById("show-panel")

		let h3 = document.createElement("h3") 
		h3.innerText = result[0].title 

		let img = document.createElement("img") 
		img.src = result[0].img_url  

		let p = document.createElement("p")
		p.innerText = result[0].description 

		let readBtn = document.createElement("button") 
		readBtn.innerText = "Read Book" 

		let likeBtn = document.createElement("button") 
		likeBtn.innerText = "Like Book" 
		likeBtn.setAttribute("book-id", result[0].id)
		likeBtn.addEventListener("click", addLiker)

		showPanelDiv.append(h3, img, p, readBtn, likeBtn) 
	}

	function addLiker(event){
			let bookId = event.target.getAttribute("book-id")
			var likedBook = bookObjs.filter(book => {
			return book.id === parseInt(bookId) 
			})

				let likers = []
				likers.push(likedBook[0].users) 
				if (!(likers.some(e => e.username === user.username))) {
						likers[0].push(user)
					
						debugger 
						fetch(`${booksURL}${bookId}`, {

							method: 'PATCH',							
							headers: {'Content-type':'application/json'},
							body: JSON.stringify( {"users" : likers } )
						})
						.then(resp => resp.json())
						.then(data => console.log(data))
					}
				}


	