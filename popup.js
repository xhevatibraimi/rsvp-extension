let resourceObj;

const getUpdatedResources = (kind) => {
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    const response = await chrome.tabs.sendMessage(tabs[0].id, { kind });
    if(response){
      resourceObj = {...response};
      updateClientId();
    }
  });
};


const getResources = () => getUpdatedResources("getResource",);
const refresh = () => getUpdatedResources("refresh");

const updateClientId = () => {
  const clientId = document.querySelector("#client-id");
  clientId.value = resourceObj?.LiveLike?._$$?.clientId;
}

const renderPrograms = () => {
  let table = 'No programs found. Please Refresh.';
  if(resourceObj?.programs){
    table = `
    <table class='resource-table'>
      <thead>
          <tr>
              <th>Program Name</th>
              <th>Program ID</th>
          </tr>
      </thead>
      <tbody>
          ${resourceObj?.programs?.map(program => `
            <tr> 
              <td class='resource-name'>${program.name}</td>
              <td class="resource-id">${program.id}</td>
            </tr>
          `)}
      </tbody>
    </table>
  `;
  }
  const tableContainer = document.querySelector('.table-container');
  tableContainer.innerHTML = table;
}

const renderChatRooms = () => {
  let table = 'No chat rooms found. Please Refresh.';
  if(!!resourceObj?.chatRooms){
    table = `
      <table class='resource-table'>
        <thead>
            <tr>
                <th>Chat Room Name</th>
                <th>Chat Room ID</th>
            </tr>
        </thead>
        <tbody>
            ${resourceObj?.chatRooms?.map(chatRoom => `
              <tr> 
                <td class='resource-name'>${chatRoom.name}</td>
                <td class="resource-id">${chatRoom.id}</td>
              </tr>
            `)}
        </tbody>
      </table>
    `;
  }
  const tableContainer = document.querySelector('.table-container');
  tableContainer.innerHTML = table;
}

const renderWidgets = () => {
  let table = 'No widgets found. Please Refresh.';
  if(!!resourceObj?.widgets){
    table = `
      <table class='resource-table'>
        <thead>
            <tr>
                <th>Widget Kind</th>
                <th>Widget ID</th>
            </tr>
        </thead>
        <tbody>
            ${resourceObj?.widgets?.map(widget => {
              return `
              <tr> 
                <td class='resource-name'>${widget.kind}</td>
                <td class="resource-id">${widget.id}</td>
              </tr>
            `
            })}
        </tbody>
      </table>
    `;
  }
  const tableContainer = document.querySelector('.table-container');
  tableContainer.innerHTML = table;
}

const renderUser = () => {
  const user = resourceObj?.user;
  let table = 'No user found. Please Refresh.';
  if(!!user){
    table = `
      <table class='resource-table'>
        <thead>
            <tr>
                <th>User Nickname</th>
                <th>User ID</th>
                <th>User Access Token</th>
            </tr>
        </thead>
        <tbody>
          <tr> 
            <td class='resource-name'>${user?.nickname}</td>
            <td class='resource-id'>${user?.id}</td>
            <td class='resource-token'>${user?.accessToken}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
  const tableContainer = document.querySelector('.table-container');
  tableContainer.innerHTML = table;
}


document.addEventListener("DOMContentLoaded", () => {
  
  getResources();
  
  const refreshButton = document.querySelector('#refresh');
  refreshButton.addEventListener('click', ()=> {
    refresh();
  })

  const resourceType = document.querySelector('#resource-type');
  resourceType.addEventListener('change', (e) => {
    switch(e.target.value){
      case 'Programs':
        renderPrograms();
        break;
      case 'Chat Rooms':
        renderChatRooms();
        break;
      case 'Widgets':
        renderWidgets();
        break;
      case 'User':
        renderUser();
        break;
    }
  })
});