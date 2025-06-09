let todo=[];
function formatDateInput(input) {
  let value = input.value.replace(/\D/g, ""); 
  if (value.length > 8) value = value.slice(0, 8);

  const parts = [];
  if (value.length > 0) parts.push(value.slice(0, 2)); 
  if (value.length > 2) parts.push(value.slice(2, 4)); 
  if (value.length > 4) parts.push(value.slice(4));    

  input.value = parts.join("-");
}
function filter() {
    const selected = document.querySelector("#filterSelect").value;

    let filteredTodos = [];

    if (selected === "all") {
        render(); 
        return;
    } else if (selected === "pending") {
        filteredTodos = todo.filter(t => t.status === "Pending");
    } else if (selected === "completed") {
        filteredTodos = todo.filter(t => t.status === "completed");
    }
    const originalTodos = todo;
    todo = filteredTodos;
    render();
    todo = originalTodos;
}

function edit(i) {
    const row = document.querySelectorAll("#to tr")[i];
    const tdTitle = row.children[0];
    const tdActions = row.children[3];
    const editBtn = tdActions.children[1];
    if (editBtn.innerText === "save") {
        const input = tdTitle.querySelector("input");
        const updatedTitle = input.value.trim();
        if (updatedTitle !== "") {
            todo[i].title = updatedTitle;
        }
        render();
        return;
    }
    const currentTitle = todo[i].title;
    tdTitle.innerHTML = `<input type="text" value="${currentTitle}" id="edit-input-${i}" style="padding:4px;border-radius:4px;border:1px solid #ccc;" />`;
    editBtn.innerText = "save";
}

function done(i){
    todo[i].status="Completed";
    render();
}
function addtodo(){
    const title = document.querySelector("#add").value.trim();
    const dueDate = document.querySelector("#time").value.trim();

    if (title === "" && dueDate === "") return;
    if ( dueDate === ""){
        todo.push({
        title: title,
        dueDate: "NodueDate",
        status: "Pending"
    })
    }
    else{todo.push({
        title: title,
        dueDate: dueDate,
        status: "Pending"
    })}
    document.querySelector("#add").value=""
    document.querySelector("#time").value=""
    render();
}
function del(){
    todo=[]
    render()
}
function deltodo(i){
    todo.splice(i,1);
    render()
}
function addelement(item,i){
    const tr=document.createElement("tr");
    const tdTitle = document.createElement("td");
    tdTitle.innerHTML = item.title;

    const tdDate = document.createElement("td");
    tdDate.innerHTML = item.dueDate;

    const tdStatus = document.createElement("td");
    tdStatus.innerHTML = item.status;

    const tdActions = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.onclick=()=> deltodo(i)
    const editbtn = document.createElement("button");
    editbtn.innerText = "edit";
    editbtn.onclick=()=> edit(i)
    const donebtn= document.createElement("button");
    donebtn.innerText = "done";
    donebtn.onclick=()=> done(i);
    tdActions.appendChild(donebtn);
    tdActions.appendChild(editbtn);
    tdActions.appendChild(delBtn);
    tr.append(tdTitle, tdDate, tdStatus, tdActions);
    return tr;

}
function render(){
    document.querySelector("#to").innerHTML="";
    for(let i =0;i<todo.length;i++){
        const element=addelement(todo[i],i);
        document.querySelector("#to").appendChild(element)
    }
}
