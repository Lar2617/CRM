const SERVER_URL = 'http://localhost:3000'
let clientsList = [];
let copyClientsArray = [];

async function serverAddClient(obj) {
    let response = await fetch(SERVER_URL + '/api/clients/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    })

    let data = await response.json()
    return data
};

async function serverGetClients() {
    let response = await fetch(SERVER_URL + '/api/clients/', {
        method: "GET",
        headers: { 'Content-Type': 'application/json'},
    })

    let data = await response.json()
    return data
};

async function serverGetClient(id) {
    let response = await fetch(SERVER_URL + '/api/clients/' + id, {
        method: "GET",
        headers: { 'Content-Type': 'application/json'},
    })

    let data = await response.json()
    return data
};

async function serverPatchClient(id, obj) {
    let response = await fetch(SERVER_URL + '/api/clients/' + id, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(obj),        
    })

    let data = await response.json()
    return data
};

async function serverDelClients(id) {
    let response = await fetch(SERVER_URL + '/api/clients/' + id, {
        method: "DELETE",
    })

    let data = await response.json()
    return data
};

const $clientsTable = document.getElementById('clients-app');
const $tableBody = document.createElement('tbody');
const $loader = document.getElementById('loader');
const $deleteClient = document.getElementById('accept-delete');
$tableBody.classList.add('clients__table-body');
$clientsTable.append($tableBody);

let sortColumnFlag = 'id',
    sortDirFlag = true,
    objId = '';
    


// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.
function getClientItem(clientObj) {
    const $clientTr = document.createElement('tr'),
        $clientID = document.createElement('td'),
        $clientFIO = document.createElement('td'),
        $clientCreate = document.createElement('td'),
        $createDate = document.createElement('span'),
        $createTime = document.createElement('span'),
        $clientUpdate = document.createElement('td'),
        $updateDate = document.createElement('span'),
        $updateTime = document.createElement('span'),
        $clientContacts = document.createElement('td'),
        $clientAction = document.createElement('td'),
        $clientChangeBtn = document.createElement('btn'),
        $clientDeleteBtn = document.createElement('btn')
    
    $clientTr.id = clientObj.id
    $clientID.textContent = clientObj.id
    $clientFIO.textContent = clientObj.fio
    $createDate.textContent = clientObj.createDate
    $createTime.textContent = clientObj.createTime
    $updateDate.textContent = clientObj.updateDate
    $updateTime.textContent = clientObj.updateTime
    $clientChangeBtn.textContent = 'Изменить'
    $clientDeleteBtn.textContent = 'Удалить'

    function contactsCreate(start, length) {
      for (i=start; i < length; i++) {
        switch (clientObj.contacts[i].type) {
          case 'Телефон':
            const $phoneBtn = document.createElement('btn');
            $phoneBtn.classList.add('contact', 'phone-btn');
            $phoneBtn.setAttribute('data-bs-toggle', value = "tooltip");
            $phoneBtn.setAttribute('data-bs-title', value = clientObj.contacts[i].type + ': ' + clientObj.contacts[i].value);
            $clientContacts.append($phoneBtn);
          break;
          case 'Email':
            const $mailBtn = document.createElement('btn');
            $mailBtn.classList.add('contact', 'mail-btn');
            $mailBtn.setAttribute('data-bs-toggle', value = "tooltip");
            $mailBtn.setAttribute('data-bs-title', value = clientObj.contacts[i].type + ': ' + clientObj.contacts[i].value);
            $clientContacts.append($mailBtn);
          break;
          case 'VK':
            const $vkBtn = document.createElement('btn');
            $vkBtn.classList.add('contact', 'vk-btn'); 
            $vkBtn.setAttribute('data-bs-toggle', value = "tooltip");
            $vkBtn.setAttribute('data-bs-title', value = clientObj.contacts[i].type + ': ' + clientObj.contacts[i].value);
            $clientContacts.append($vkBtn);
          break;
          case 'Facebook':
            const $fbBtn = document.createElement('btn');
            $fbBtn.classList.add('contact', 'fb-btn');
            $fbBtn.setAttribute('data-bs-toggle', value = "tooltip");
            $fbBtn.setAttribute('data-bs-title', value = clientObj.contacts[i].type + ': ' + clientObj.contacts[i].value);
            $clientContacts.append($fbBtn);
          break;
          default:
          const $anotherBtn = document.createElement('btn');
          $anotherBtn.classList.add('contact', 'another-btn');
          $anotherBtn.setAttribute('data-bs-toggle', value = "tooltip"); 
          $anotherBtn.setAttribute('data-bs-html', value = 'true');
          $anotherBtn.setAttribute('data-bs-title', value = clientObj.contacts[i].type + ': <span class="contact-value">' + clientObj.contacts[i].value + '</span>');
          $clientContacts.append($anotherBtn);
        };
      };      
    };

      if (clientObj.contacts.length <= 4) {
        contactsCreate(0, clientObj.contacts.length);
      };
      if (clientObj.contacts.length > 4) {
        contactsCreate(0, 4);
        const $moreBtn = document.createElement('btn');
        $moreBtn.classList.add('contact', 'more-btn');
        $clientContacts.append($moreBtn);
        $moreBtn.addEventListener('click', () => {
          $moreBtn.remove();          
          contactsCreate(4, clientObj.contacts.length)});
      };
 
    $clientTr.classList.add('tbody-tr')
    $clientID.classList.add('tr-grey-text', 'col-1')
    $createTime.classList.add('tr-grey-text', 'date')    
    $updateTime.classList.add('tr-grey-text', 'time')
    $clientFIO.classList.add('tr-black-text', 'col-5', 'md-col-3')
    $createDate.classList.add('tr-black-text', 'date') 
    $updateDate.classList.add('tr-black-text', 'time')
    $clientContacts.classList.add('col-3','md-col-2')
    $clientCreate.classList.add('col-1','md-col-2')
    $clientUpdate.classList.add('col-2')
    $clientAction.classList.add('col-1', 'md-col-2')

    $clientChangeBtn.classList.add('change-btn')
    $clientChangeBtn.setAttribute('data-bs-toggle', value = "modal")
    $clientChangeBtn.setAttribute('data-bs-target', value = "#upModal")
    $clientChangeBtn.setAttribute('data-bs-whatever', value = "Изменить данные " + clientObj.id)  
    $clientDeleteBtn.classList.add('delete-btn')
    $clientDeleteBtn.setAttribute('data-bs-toggle', value = "modal")
    $clientDeleteBtn.setAttribute('data-bs-target', value = "#delModal")
  
    $clientChangeBtn.addEventListener('click', () => {
      $upForm.data = clientObj.id;
      $upName.value = clientObj.name;
      $upLastname.value = clientObj.lastName;
      $upSurname.value = clientObj.surname; 
      window.location.hash = clientObj.id;
    }) 

    $clientDeleteBtn.addEventListener('click', () => {
      $deleteClient.data = clientObj.id;
    }) 

    $clientAction.append($clientChangeBtn)
    $clientAction.append($clientDeleteBtn)
    $clientTr.append($clientID)
    $clientTr.append($clientFIO)
    $clientCreate.append($createDate) 
    $clientCreate.append($createTime)
    $clientTr.append($clientCreate)
    $clientUpdate.append($updateDate)
    $clientUpdate.append($updateTime)
    $clientTr.append($clientUpdate)
    $clientTr.append($clientContacts)
    $clientTr.append($clientAction)

    return $clientTr
};

async function renderClientsTable(clientsArray) {
    $tableBody.innerHTML = '';
    let serverData = await serverGetClients();

    $loader.classList.add('hidden');
    clientsList = [...serverData];

    if (serverData) {
      clientsArray = [...serverData];
    }   
    copyClientsArray = [...clientsArray];
       
  // Подготовка
    for (const oneClient of copyClientsArray) { 
      oneClient.fio = oneClient.surname + ' ' + oneClient.name + ' ' + oneClient.lastName;
      oneClient.createDate = String((new Date(oneClient.createdAt)).getDate()).padStart(2, '0') + '.' + String((new Date(oneClient.createdAt)).getMonth() + 1).padStart(2, '0') + '.' + (new Date(oneClient.createdAt)).getFullYear();
      oneClient.createTime = String((new Date(oneClient.createdAt)).getHours()).padStart(2, '0') + '.' + String((new Date(oneClient.createdAt)).getMinutes()).padStart(2, '0');
      oneClient.updateDate = String((new Date(oneClient.updatedAt)).getDate()).padStart(2, '0') + '.' + String((new Date(oneClient.updatedAt)).getMonth() + 1).padStart(2, '0') + '.' + (new Date(oneClient.updatedAt)).getFullYear();
      oneClient.updateTime = String((new Date(oneClient.updatedAt)).getHours()).padStart(2, '0') + '.' + String((new Date(oneClient.updatedAt)).getMinutes()).padStart(2, '0');
    }

    //Сортировка
    copyClientsArray = copyClientsArray.sort(function(a, b) {
        let sort = a[sortColumnFlag] < b[sortColumnFlag];
        if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
        return sort ? -1 : 1
    });
    let filtredClientsArray = [];
      // Поиск
    if ($searchInp.value.trim() !== "") {
      filtredClientsArray = filter(copyClientsArray, $searchInp.value);
    }

   // Отрисовка
    for (const oneClient of copyClientsArray) {
      const $newTr = getClientItem(oneClient);
      $tableBody.append($newTr);
      if (filtredClientsArray.length != 0) {
        if (oneClient.id == filtredClientsArray[0].id) {
        $newTr.classList.add('table-primary');
        $newTr.scrollIntoView();
      }}
      if (oneClient.id == window.location.hash.slice(1)) {
        let newEventClick = new Event('click');
        let btn = $newTr.getElementsByClassName("change-btn")[0];
        btn.dispatchEvent(newEventClick);
      }
    }

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  };

renderClientsTable(clientsList);

//клики сортировки
const $sortIdBtn = document.getElementById('ID'),
      $sortFIOBtn = document.getElementById('fio'),
      $sortCreateBtn = document.getElementById('create'),
      $sortUpdateBtn = document.getElementById('update');


$sortIdBtn.addEventListener('click', function() {
    sortColumnFlag = 'id'
    sortDirFlag = !sortDirFlag
    $sortIdBtn.querySelector('.badge').classList.toggle('badge-transform');
    renderClientsTable(clientsList)
})

$sortFIOBtn.addEventListener('click', function() {
  sortColumnFlag = 'fio'
  sortDirFlag = !sortDirFlag
  $sortFIOBtn.querySelector('.badge').classList.toggle('badge-transform'); 
  renderClientsTable(clientsList)
})

$sortCreateBtn.addEventListener('click', function() {
  sortColumnFlag = 'createdAt'
  sortDirFlag = !sortDirFlag
  $sortCreateBtn.querySelector('.badge').classList.toggle('badge-transform');     
  renderClientsTable(clientsList)
})

$sortUpdateBtn.addEventListener('click', function() {
  sortColumnFlag = 'updatedAt'
  sortDirFlag = !sortDirFlag
  $sortUpdateBtn.querySelector('.badge').classList.toggle('badge-transform');     
  renderClientsTable(clientsList)
})

// Поиск с автодополнением
const $searchInp = document.getElementById('search');
const $dataList = document.getElementById('datalistOptions');
let resultArray = [];

// Функция для выполнения поиска

$searchInp.addEventListener('input', function() {
  renderDataListOptions(clientsList);
  setTimeout(renderClientsTable, 300, clientsList);       
})

function filter(arr, value) {
  return arr.filter(function(oneClient) {
    if (oneClient.id.includes(value.trim()) 
    || oneClient.fio.includes(value.trim()) 
    || oneClient.createDate.includes(value.trim()) 
    || oneClient.createTime.includes(value.trim()) 
    || oneClient.updateDate.includes(value.trim()) 
    || oneClient.updateTime.includes(value.trim()))
      return true
  });
};

function renderDataListOptions(optionsArr) {
    $dataList.innerHTML = '';
    if ($searchInp.value.trim() != '') {
      optionsArr = filter(optionsArr, $searchInp.value);
    }
    optionsArr.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.fio;
      $dataList.append(optionElement);
    }); 
}

//модальное окно изменения

const $upModal = document.getElementById('upModal'),
      $upForm = document.getElementById('up-form'),
      $upName = document.getElementById('up-name'),
      $upSurname = document.getElementById('up-surname'),
      $upLastname = document.getElementById('up-lastname'),
      $upContactBtn = document.getElementById('up-contact-btn'),
      $upAddFooter = document.getElementById('up-modal-footer'), 
      $upContactBlock = document.getElementById('up-contact-list'),
      $upSaveBtn = document.getElementById('up-accept'),
      $upSaveError = document.createElement('div'),

      $upClientDelete = document.getElementById('up-delete');
      let upContactsArr = []; 
      let firstUpContactsArr = []
      
if ($upModal) {
  $upModal.addEventListener('show.bs.modal', async function(event) {
    // Button that triggered the modal
    const button = event.relatedTarget
    // // Extract info from data-bs-* attributes
    const recipient = button.getAttribute('data-bs-whatever')

    // Update the modal's content.
    const $modalTitle = $upModal.querySelector('.modal-title');
    const $idButton = document.createElement('btn');
    const $idObj = `${recipient}`.slice(16);
    $idButton.classList.add('change-id');
    $idButton.textContent = 'ID: ' + `${recipient}`.slice(15);
    $modalTitle.textContent = 'Изменить данные';
    $modalTitle.append($idButton);

    $upContactBlock.innerHTML = '';
    $upName.value = '';
    $upLastname.value = '';
    $upSurname.value = ''; 
    $upName.disabled = true;
    $upSurname.disabled = true;
    $upLastname.disabled = true;
    
    let upClientItem = await serverGetClient($idObj); 
    $upName.value = upClientItem.name;
    $upLastname.value = upClientItem.lastName;
    $upSurname.value = upClientItem.surname; 
    $upName.removeAttribute('disabled');
    $upSurname.removeAttribute('disabled');
    $upLastname.removeAttribute('disabled');

    if (upClientItem.contacts.length >= 10) {
      $upContactBtn.classList.add('d-none');
    }

    for (const oneContact of upClientItem.contacts) {
      const $upContact = renderContactItem(oneContact).$upContactForm;
      $upContactBlock.append($upContact);
    } 
  })
}

$upForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const upObjId = $upForm.data;

  firstUpContactsArr = firstUpContactsArr.concat(firstContactsArr); 

  upContactsArr = firstUpContactsArr.map(function(item) { 
    delete item.id; 
    return item; 
  });

  if (firstUpContactsArr.length >= 10) {
    $upContactBtn.classList.add('d-none');
  } else {
    $upContactBtn.classList.remove('d-none');
  }

  let upClientObjData = {
    name: $upName.value.trim(),
    lastName: $upLastname.value.trim(),
    surname: $upSurname.value.trim(),
    contacts: upContactsArr
  };  

  $upName.setAttribute('disabled', true);
  $upLastname.setAttribute('disabled', true);
  $upSurname.setAttribute('disabled', true);
  
  let servDataObj = await serverPatchClient(upObjId, upClientObjData);

  if (servDataObj.status == 200 || servDataObj.status == 201) {
    $upSaveBtn.setAttribute('data-bs-dismiss', value = 'modal');
    $upName.setAttribute('disabled', false);
    $upLastname.setAttribute('disabled', false);
    $upSurname.setAttribute('disabled', false);
  } else if (servDataObj.status == 422 || servDataObj.status == 404 || servDataObj.status == ('5**')) {
    $upAddFooter.prepend($upSaveError);
    $upSaveError.textContent = 'Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!';
    $upName.setAttribute('disabled', false);
    $upLastname.setAttribute('disabled', false);
    $upSurname.setAttribute('disabled', false);  
  } else {
    $upAddFooter.prepend($upSaveError);
    $upSaveError.textContent = 'Что-то пошло не так';
    $upName.setAttribute('disabled', false);
    $upLastname.setAttribute('disabled', false);
    $upSurname.setAttribute('disabled', false);    
  }
  $upSaveError.classList.add('error-block');
  
  renderClientsTable(clientsList);  

  // //очистка формы
    $upName.value = '';
    $upLastname.value = '';
    $upSurname.value = ''; 
    upContactsArr = [];
    contactsArr = [];
    $upContactBlock.innerHTML = '';
    window.location.hash = '';
})

function renderContactItem(obj) {
  const $upContactForm = document.createElement('div');
  const $upSelect = document.createElement('select');
  const $upInput = document.createElement('input');
  const $upDeleteButton = document.createElement('btn');

  obj.id = createNewId(firstUpContactsArr);

  const options = ['Телефон', 'Email', 'VK', 'Facebook', 'Другое'];
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    $upSelect.appendChild(optionElement);
   });

  $upContactForm.classList.add('d-flex', 'add-contact-item')
  $upSelect.classList.add('form-select');
  $upInput.classList.add('contact-inp');
  $upDeleteButton.classList.add('delete-contact-btn');
  $upInput.type = 'text';
  $upSelect.value = obj.type;
  if ((obj.type != 'Телефон') && (obj.type != 'Email') && (obj.type != 'VK') && (obj.type != 'Facebook')) {
    $upSelect.value = 'Другое';
  };  
  $upInput.value = obj.value;  

      //обработчик события селект
  $upSelect.addEventListener('click', ()=> {
    obj.type = $upSelect.value;
    // if ($upSelect.value = 'Другое') {
    //   $upSelect.value = $upInput.value.split()
    // }
  })
  // Обработчик события для поля ввода
  $upInput.addEventListener('input', () => {
    obj.value = $upInput.value;
  });
  //обработчик для кнопки удаления
  $upDeleteButton.addEventListener('click', () => {
    i = 0
    while (i < firstUpContactsArr.length) {
      if (firstUpContactsArr[i].id == obj.id) {
        firstUpContactsArr.splice(i, 1);
      } else {
        i++;
      }}
    $upContactForm.remove();    
  });

  if (firstUpContactsArr.length == 0) {
    $upContactBtn.classList.remove('d-none');
  }

  if (firstUpContactsArr.length >= 10) {
    $upContactBtn.classList.add('d-none');
  }

  firstUpContactsArr.splice(obj.id, 1, obj);

  $upContactForm.appendChild($upSelect);
  $upContactForm.appendChild($upInput);
  $upContactForm.appendChild($upDeleteButton);
    // Возвращаем созданную форму
  return {
    firstUpContactsArr,  
    upContactsArr,  
    $upContactForm,
    $upSelect,
    $upInput,
    $upDeleteButton
  };
}

$upContactBtn.addEventListener('click', () => {
  $upContactBlock.append(createNewContact().$contactForm);
})  

$upClientDelete.addEventListener('click', () => {
  $deleteClient.data = $upForm.data;
})

//модальное окно добавления
const $addForm = document.getElementById('add-form'),
      $nameInpAdd = document.getElementById('add-name'),
      $lastNameInpAdd = document.getElementById('add-lastname'),
      $surNameInpAdd = document.getElementById('add-surname'),
      $addContact = document.getElementById('add-contact'),
      $addContactBlock = document.getElementById('add-contact-list'),
      $saveBtn = document.getElementById('add-accept'),
      $saveError = document.createElement('div'),
      $addFooter = document.getElementById('add-modal-footer'),
      $addContactBtn = document.getElementById('add-contact-btn');
      let contactsArr = [];
      let firstContactsArr= [];



$addForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // //валидация

  if (validation($addForm) == true) {
  let clientObjData = {
    name: $nameInpAdd.value.trim(),
    lastName: $lastNameInpAdd.value.trim(),
    surname: $surNameInpAdd.value.trim(),
    contacts: contactsArr
  };

  $nameInpAdd.setAttribute('disabled', true);
  $lastNameInpAdd.setAttribute('disabled', true);
  $surNameInpAdd.setAttribute('disabled', true);

  let servDataObj = await serverAddClient(clientObjData);
  if (servDataObj.status == 200 || servDataObj.status == 201) {
    $saveBtn.setAttribute('data-bs-dismiss', value = 'modal')
    $nameInpAdd.setAttribute('disabled', false);
    $lastNameInpAdd.setAttribute('disabled', false);
    $surNameInpAdd.setAttribute('disabled', false);    
  } else if (servDataObj.status == 422 || servDataObj.status == 404 || servDataObj.status == ('5**')) {
    $addFooter.prepend($saveError);
    $saveError.textContent = 'Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!';
    $nameInpAdd.setAttribute('disabled', false);
    $lastNameInpAdd.setAttribute('disabled', false);
    $surNameInpAdd.setAttribute('disabled', false);  
  } else {
    $addFooter.prepend($saveError);
    $saveError.textContent = 'Что-то пошло не так'
    $nameInpAdd.setAttribute('disabled', false);
    $lastNameInpAdd.setAttribute('disabled', false);
    $surNameInpAdd.setAttribute('disabled', false);    
  }
  $saveError.classList.add('error-block');
  }
 
  renderClientsTable(clientsList);  
  // //очистка формы
    $nameInpAdd.value = '';
    $lastNameInpAdd.value = '';
    $surNameInpAdd.value = ''; 
    firstContactsArr = [];    
    contactsArr = [];
    $addContactBlock.innerHTML = '';      
    window.location.hash = '';
})

$addContactBtn.addEventListener('click', () => {
  $addContactBlock.append(createNewContact().$contactForm);
})

function createNewId(Arr) {
  let max = 0;
  for(const item of Arr) {
    if (item.id > max) max = item.id;
  }
  return max + 1;
}


function createNewContact() {
  // Создаем элементы формы
  const $contactForm = document.createElement('div');
  const $select = document.createElement('select');
  const $input = document.createElement('input');
  const $deleteButton = document.createElement('btn');
  const $errorLadel = document.createElement('div');
  let contact = {}; 
  
  contact.id = createNewId(contactsArr);
 // Заполняем выпадающее меню
  const options = ['Телефон', 'Email', 'VK', 'Facebook', 'Другое'];
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    $select.append(optionElement);
  });

  // Настраиваем внешний вид и кнопку удаления
  $contactForm.classList.add('d-flex', 'add-contact-item')
  $select.classList.add('form-select');
  $input.classList.add('contact-inp');
  $input.placeholder = 'Введите данные контакта';
  $input.setAttribute('data-required', value ="true");
  $deleteButton.classList.add('delete-contact-btn');
  $input.type = 'text';
  $errorLadel.classList.add('error-label');
  $errorLadel.textContent = 'Поле не заполнено'


  // input.value = '';    
    //обработчик события селект
  $select.addEventListener('click', ()=> {
    contact.type = $select.value;
  })
  // Обработчик события для поля ввода
  $input.addEventListener('blur', () => {
    if ($input.value === '') {
    $input.classList.add('invalid');
    $contactForm.prepend($errorLadel);
  } else {
    $input.classList.remove('invalid');
    $errorLadel.remove();
    contact.value = $input.value    
  }
  }); 

  //обработчик для кнопки удаления
  $deleteButton.addEventListener('click', () => {
    $contactForm.remove();
    for (let i=0; i < firstContactsArr.length; i ++) {
      if (firstContactsArr[i].id == contact.id) firstContactsArr.splice(i, 1);
    }
  });


  firstContactsArr.push(contact); 
  
  // Добавляем элементы в форму
  $contactForm.append($select);
  $contactForm.append($input);
  $contactForm.append($deleteButton);

  contactsArr = firstContactsArr.map(function(item) { 
    delete item.id; 
    return item; 
  });
  
  if (firstContactsArr.length == 0) {
   $addContactBtn.classList.remove('d-none')
  }

  if (firstContactsArr.length >= 10) {
    $addContactBtn.classList.add('d-none');
  }

  if ((firstContactsArr.length + firstUpContactsArr.length) >= 10) {
    $upContactBtn.classList.add('d-none');
  } else {
    $upContactBtn.classList.remove('d-none');    
  }


  
  // Возвращаем созданную форму
  return {
    firstContactsArr,
    contactsArr,
    $contactForm,
    $select,
    $input,
    $deleteButton
  };
}

//удаление клиента
$deleteClient.addEventListener('click', async function() {
  await serverDelClients($deleteClient.data);
  $clientTr.remove()
})


//валидация

function validation(form) {
  let result = true;
  
  const allInputs = form.querySelectorAll('input');

  function removeError(input) {
  const parent = input.parentNode;    
    if (parent.classList.contains('error')) {
      parent.querySelector('.error-label').remove()
      parent.classList.remove('error')
    }
  }

  function createError(input, text) {
    const errorLabel = document.createElement('label')
    const parent = input.parentNode; 
    errorLabel.classList.add('error-label')
    errorLabel.textContent = text
    parent.classList.add('error')
    parent.prepend(errorLabel)
  }

  for (const input of allInputs) {
    removeError(input)
    if (input.dataset.required == "true") {
      if (input.value == "") {
        removeError(input)
        createError(input, 'Поле не заполнено!')
        result = false
      }
    }
  }
  return result
}

