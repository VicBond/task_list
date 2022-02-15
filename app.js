const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => { //make an obj to easily lookup for tasks
    acc[task._id] = task;
    return acc;
  }, {});

  //show elements

  const listContainer = document.querySelector('.tasks-list-section .list-group');

  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];

  // console.log('inputTitle:', inputTitle, 'inputBody:', inputBody);

  //events
  renderAllTasks(objOfTasks); // render tasks to page using renderAllTasks function
  // console.log(objOfTasks);

  form.addEventListener('submit', onFormSubmitHandler); //listen to submit event
  listContainer.addEventListener('click', onDeleteHandler); //listen to delete event

  function renderAllTasks(tasksList) {
    if(!tasksList) {
      console.error('No tasks to render');
      return ;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach(task => {
      // console.log(task);
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  };

  function listItemTemplate({_id, title, body} = {}) {
    // console.log(_id, title);
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
    li.setAttribute('data-task-id', _id);
    
    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('add', 'btn-danger', 'ml-auto', 'delete-btn');

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);
    console.log(li);

    return li;
  };
  
  function onFormSubmitHandler(event) {
    event.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    // console.log('titleValue:',titleValue ,'bodyValue:', bodyValue);
    if(!titleValue || !bodyValue) {
      alert('Please enter a title and body');
      return;
    }
    const task = createNewTask(titleValue, bodyValue);
    // console.log(objOfTasks);
    const listItem = listItemTemplate(task);
    // console.log(listItem);
    listContainer.insertAdjacentElement("afterbegin", listItem); //add li task in front of others tasks
    form.reset(); // add clean inputs in form
  };

  function createNewTask(title, body) {
    const newTask = { 
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    // console.log(newTask);
    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  };

  function deleteTasks(id) {
    // console.log(objOfTasks[id]);
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Are you sure you want to delete : ${title}`);
    // console.log(isConfirm);
    if(!isConfirm) return isConfirm; //not confirmed then return
    delete objOfTasks[id];
    return isConfirm;
  };

  function deleteTaskFromHtml(el){
    el.remove();
  };

  function onDeleteHandler({ target }) {
    // console.log(event.target);
    if (target.classList.contains('delete-btn')) {
      // console.log('delete');
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      // console.log(parent);
      // console.log(id);
      const confirmed = deleteTasks(id);
      // console.log(confirmed);
    }
  }
  
})(tasks);