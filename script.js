const containers = document.querySelectorAll('.container')
let input = document.getElementById("todo");
let ul = document.querySelector("ul");
let submitButton = document.getElementById("submit");
let deleteAllButton = document.getElementById("deleteall");
let completedList = document.getElementById("completelist")

function checkClearAllButton(){
    if(ul.hasChildNodes() ){
        console.log('empty')
        console.log(ul)
        deleteAllButton.style.display = "none"
    }
    
}



function inputLength() {
	return input.value.length;
}




function createListElement() {
	let li = document.createElement("li");
    
    li.className += "single-task"
    li.draggable += "true" 
   
    li.appendChild(document.createTextNode(input.value.charAt(0).toUpperCase() + input.value.slice(1) ));
    
    // localStorage.setItem("list", li.innerText);

    let editbtn = document.createElement("button");

    editbtn.innerText = "Edit"
    editbtn.className = "button3"

    li.appendChild(editbtn)
    li.classList.add("editMode") 



    let delbtn = document.createElement("button");
    delbtn.innerText = "delete"
    delbtn.className = "button4"
    li.appendChild(delbtn)

	ul.appendChild(li);
	input.value = "";


    delbtn.addEventListener("click", function(){
        li.remove()
    })


   

   

    li.addEventListener("dblclick", function(){
        let liTwo = document.createElement("li");
    
       
        editbtn.remove()
        delbtn.remove();

        liTwo = li
        li.remove()
        liTwo.style.textDecoration = "line-through";
        console.log(completedList)
        completedList.appendChild(liTwo);
    })

  deleteAllButton.addEventListener("click", function(){
      ul.innerHTML = ""
      completedList.innerHTML = ""
      console.log(ul)
    
  })

  editbtn.addEventListener('click', function(){
      console.log("edit task");
      console.log(li)
      

    
    delbtn.remove();
    editbtn.remove();
    let tempData = li.innerText;
    li.remove()
    input.value = tempData
    console.log(tempData);

  })







  const draggables = document.querySelectorAll('.single-task')

  draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})


containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})





function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }




 





  
    
}








function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
        console.log(ul)
       
        deleteAllButton.style.display = "block"
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
        deleteAllButton.style.display = "block"
	}
}


    
submitButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

checkClearAllButton()







