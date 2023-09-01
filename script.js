
const handelTabContainer=async()=>{
    const res= await  fetch(" https://openapi.programming-hero.com/api/videos/categories");
    const data=await res.json();
   //console.log(data.data[1].category);
    const getData=data.data;
    //console.log(getData);
   const tabContainer=document.getElementById('tab-container')
    getData.forEach((dataId)=>{//get data id by forEach loop
        //console.log(dataId);
        const newDiv=document.createElement('div');

        newDiv.innerHTML=`
        <a onclick="handelPostContainer('${dataId.category_id}')" class="tab tab-active bg-[#d4d4d4] rounded-lg">${dataId.category}</a>
        `;

        tabContainer.appendChild(newDiv);
        console.log("news data",dataId.category_id)
    })
}

const handelPostContainer=async (getDataId)=>{
    //console.log(getDataId);
    const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${getDataId}`);
    const data=await res.json();
    const newData=data.data;
    
    const cardContainer=document.getElementById('card-container');
    cardContainer.innerHTML="";
    
    //console.log("new data",newData);//important
 if(newData.length === 0 ){
    cardContainer.innerHTML = `
    <div class="border-2">
     <img class="w-[800px] mx-auto" src="icon.png"/>
     <p class="w-[400px]">No data found</p>
    </div>
   
    
    `;
 }else{
newData.forEach((dataId)=>{
        //console.log(dataId.thumbnail);
        //  Posted date
         // Convert seconds to hours and minutes
         const postedDateInSeconds = dataId?.others.posted_date;
         const hours = Math.floor(postedDateInSeconds / 3600);
         const minutes = Math.floor((postedDateInSeconds % 3600) / 60);
         // Format the posted date
         let formattedPostedDate = "";
 
         if (hours > 0) {
             formattedPostedDate = `${hours} hr${hours > 1 ? "s" : ""}`;
             if (minutes > 0) {
                 formattedPostedDate += ` ${minutes} min ago${minutes > 1 ? "" : ""}`;
             }
         }
          else {
             formattedPostedDate = "";
         }

 const newDiv=document.createElement("div");

        newDiv.innerHTML= `
        <div class="card card-compact">
        <div class=" ">
        <figure><img class="w-full h-[180px] mx-auto rounded-lg " src="${dataId.thumbnail}" alt="Shoes" /></figure>
        <div class="flex justify-end mr-2">
         <p class="-mt-8 px-2  absolute bg-[#0c0c0c] rounded-lg text-[white]">${formattedPostedDate} </p>
        </div>
        </div>
        </div>
        <div class="card-body">
            <!-- Post title -->
            <div class="flex gap-2 items-center">
                <img class="w-10 h-10 rounded-full " src="${dataId.authors[0].profile_picture}" alt="">
                <h2 class="card-title text-xl font-bold">${dataId.title}</h2>
            </div>
           <!-- Author Name  -->
          <div>
            <p class="flex items-center text-lg gap-4">${dataId.authors[0].profile_name} <img class="w-[20px" src="${dataId?.authors[0]?.verified ? dataId.authors[0].verified : 'seal.svg'}" alt="">
            ${dataId?.authors[0]?.isVerified ? '' : ''}
            </p>
          </div>
          <p>${dataId?.others.views}</p>
        </div>
    </div>
        
        `;
    cardContainer.appendChild(newDiv);
    console.log("this is data",dataId); 

    
    });

 }

 
     
}



// handelSort//  newData.sort((a, b) => parseInt(b.others.views, 10) - parseInt(a.others.views, 10));
const sortDataByViews=(newData)=>{
    console.log("this is new data section",newData)
    //newData.sort((a, b) => parseInt(b.others.views, 10) - parseInt(a.others.views, 10));
}

handelPostContainer('1000')
handelTabContainer()