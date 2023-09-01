// Define a global variable to store the data.
let currentData = [];

// Function to fetch and render tab categories.
const handelTabContainer = async () => {
  // Fetch categories data.
  const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
  const data = await res.json();

  // Get the category data.
  const getData = data.data;
  const tabContainer = document.getElementById('tab-container');

  // Clear previous data.
  tabContainer.innerHTML = "";

  // Iterate through categories and create tab links.
  getData.forEach((dataId) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
      <a onclick="handelPostContainer('${dataId.category_id}')" class="tab tab-active bg-[#d4d4d4] rounded-lg">${dataId.category}</a>
    `;
    tabContainer.appendChild(newDiv);
  });

  // Store the fetched data in the global variable currentData.
  currentData = getData;
}

// Function to fetch and render posts based on category.
const handelPostContainer = async (getDataId) => {
  // Fetch posts data for a specific category.
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${getDataId}`);
  const data = await res.json();

  // Get the post data.
  const newData = data.data;
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";

  // Check if there is no data.
  if (newData.length === 0) {
    cardContainer.innerHTML = `
      <p>No data found</p> <img src="icon.png"/>
    `;
  } else {


    // Render the sorted data.
    newData.forEach((dataId) => {
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

  // Store the fetched data in the global variable currentData.
  currentData = newData;
}

// Function to sort data by views and re-render.
const sortDataByViews = () => {

    console("cliked")
  // Check if there is data to sort.
  if (currentData.length > 0) {
    // Sort currentData by views in descending order (highest views first).
    currentData.sort((a, b) => parseInt(b.others.views, 10) - parseInt(a.others.views, 10));

    // Re-render the sorted data.
    renderData(currentData);
  }
}

// Function to render data.
const renderData = (data) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";

  if (data.length === 0) {
    cardContainer.innerHTML = `
      <p>No data found</p> <img src="icon.png"/>
    `;
  } else {
    data.forEach((dataId) => {
      // ... Your existing code for rendering each post ...
    });
  }
}

// Add an event listener to the "Sort by View" button.
const sortButton = document.getElementById('sort-btn');
const sortBtn = sortButton.querySelector('button');
sortBtn.addEventListener('click', sortDataByViews);

// Call the initial functions to fetch and render data.
handelTabContainer();
handelPostContainer('1000');
