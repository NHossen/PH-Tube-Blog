
let currentData = [];//Delare variable to keap value of function
const handelTabContainer = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
  const data = await res.json();
 //console.log(data);
  const getData = data.data;
  const tabContainer = document.getElementById('tab-container');
  tabContainer.innerHTML = "";// Clear previous data.

  
  getData.forEach((dataId) => {// create tab links.
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
      <a onclick="handelPostContainer('${dataId.category_id}')" class="tab tab-active bg-[#d4d4d4] rounded-lg">${dataId.category}</a>
    `;
    tabContainer.appendChild(newDiv);
  });
  currentData = getData;//Stor data in let variable
}


const handelPostContainer = async (getDataId) => {//get data by Id
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${getDataId}`);
  const data = await res.json();
  const newData = data.data;  // Get the post data.
  //console.log(newData);

  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";

 
  if (newData.length === 0) {//for emty data container
    cardContainer.innerHTML = `
    <div class="absolute">
    <img  class=" lg:ml-[500px] ml-[100px] lg:w-80" src="image/icon.png" alt="alert">
    <p class="lg:ml-[500px] ml-[25px] lg:mt-10 text-2xl text-center font-bold">Oops!! Sorry, There is no <br> content here</p>
    </div>
     
    `;
  } else {
    
    newData.forEach((dataId) => {// data for each card
      const postedDateInSeconds = dataId?.others.posted_date;
      const hours = Math.floor(postedDateInSeconds / 3600);
      const minutes = Math.floor((postedDateInSeconds % 3600) / 60);

      let formattedPostedDate = "";//data posted time 
      if (hours > 0) {
        formattedPostedDate = `${hours} hr${hours > 1 ? "s" : ""}`;
        if (minutes > 0) {
          formattedPostedDate += ` ${minutes} min ago${minutes > 1 ? "" : ""}`;
        }
      } else {
        formattedPostedDate = "";
      }

      const newDiv = document.createElement("div");//Create new element to keep card
      newDiv.innerHTML = `
        <div class="card card-compact">
          <div class=" ">
            <figure><img class="w-full h-[180px] mx-auto rounded-lg " src="${dataId.thumbnail}" alt="Shoes" /></figure>
            <div class="flex justify-end mr-2">
              <p class="-mt-8 px-2  absolute bg-[#0c0c0c] rounded-lg text-[white]">${formattedPostedDate} </p>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="flex gap-2 items-center">
            <img class="w-10 h-10 rounded-full " src="${dataId.authors[0].profile_picture}" alt="">
            <h2 class="card-title text-xl font-bold">${dataId.title}</h2>
          </div>
          <div>
            <p class="flex items-center text-lg gap-4">${dataId.authors[0].profile_name} <img class="w-[20px" src="${dataId?.authors[0]?.verified ? dataId.authors[0].verified : 'seal.svg'}" alt="">
            ${dataId?.authors[0]?.isVerified ? '' : ''}
            </p>
          </div>
          <p>${dataId?.others.views}</p>
        </div>
      `;

      cardContainer.appendChild(newDiv);
    });
  }


  currentData = newData;//
}


const sortDataByViews = () => { //Sort data by views 
  if (currentData.length > 0) {
    currentData.sort((a, b) => parseInt(b.others.views, 10) - parseInt(a.others.views, 10));
    renderData(currentData);//get data from let varibale
  }
}

const renderData = (data) => {//Sorting for each item 
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";

  if (data.length === 0) {
    cardContainer.innerHTML = `
      <p class="text-right">No data found</p>
      <img src="icon.png"/>
    `;
  } else {
    data.forEach((dataId) => {
      const postedDateInSeconds = dataId?.others.posted_date;
      const hours = Math.floor(postedDateInSeconds / 3600);
      const minutes = Math.floor((postedDateInSeconds % 3600) / 60);

      let formattedPostedDate = "";

      if (hours > 0) {
        formattedPostedDate = `${hours} hr${hours > 1 ? "s" : ""}`;
        if (minutes > 0) {
          formattedPostedDate += ` ${minutes} min ago${minutes > 1 ? "" : ""}`;
        }
      } else {
        formattedPostedDate = "";
      }

      const newDiv = document.createElement("div");
      newDiv.innerHTML = `
        <div class="card card-compact">
          <div class=" ">
            <figure><img class="w-full h-[180px] mx-auto rounded-lg " src="${dataId.thumbnail}" alt="Shoes" /></figure>
            <div class="flex justify-end mr-2">
              <p class="-mt-8 px-2  absolute bg-[#0c0c0c] rounded-lg text-[white]">${formattedPostedDate} </p>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="flex gap-2 items-center">
            <img class="w-10 h-10 rounded-full " src="${dataId.authors[0].profile_picture}" alt="">
            <h2 class="card-title text-xl font-bold">${dataId.title}</h2>
          </div>
          <div>
            <p class="flex items-center text-lg gap-4">${dataId.authors[0].profile_name} <img class="w-[20px" src="${dataId?.authors[0]?.verified ? dataId.authors[0].verified : 'seal.svg'}" alt="">
            ${dataId?.authors[0]?.isVerified ? '' : ''}
            </p>
          </div>
          <p>${dataId?.others.views}</p>
        </div>
      `;

      cardContainer.appendChild(newDiv);
    });
  }
}

// const sortButton = document.getElementById('sort-btn');
// const sortBtn = sortButton.querySelector('button');
// sortBtn.addEventListener('click', sortDataByViews);//add button clicke to sort data


handelTabContainer();
handelPostContainer('1000');
