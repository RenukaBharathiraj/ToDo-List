const todoList = document.querySelector("#todo-list");
const form = document.querySelector("#todo-form");


function renderCafe(doc){
    let li = document.createElement("li");
    let div = document.createElement("div")
    let todo = document.createElement("span");
    let date = document.createElement("span")
    let cross = document.createElement("div");
    div.className = "flex-item-container";
    cross.className="cross";
    
    li.setAttribute("data-id", doc.id);
    todo.textContent = doc.data().todo;
    date.textContent = doc.data().date;
    
    cross.textContent = "x";
    div.appendChild(todo);
    div.appendChild(date);
   
    li.appendChild(div);
    li.appendChild(cross);

    todoList.appendChild(li);

    // Deleting data
    cross.addEventListener("click", (e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection("todos").doc(id).delete().then(()=>{
            alert("TODO HAS BEEN DELETED");
        });
    });
}



db.collection('todos').orderBy('todo').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = todoList.querySelector('[data-id=' + change.doc.id + ']');
            todoList.removeChild(li);
        }
    });
});

// Adding data
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    db.collection("todos").add({
        todo: form.todo.value,
        date: new Date().toUTCString()
        
    }).then(()=>{
        alert("TODO ADDED")
    });

    form.todo.value = "";
  
});