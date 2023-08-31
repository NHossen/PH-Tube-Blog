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

        if(dataId.category_id){

                newDiv.innerHTML=`
        <a onclick="handelPostContainer('${dataId.category_id}')" class="tab tab-active bg-[#d4d4d4] rounded-lg">${dataId.category}</a>
        `;

        }else{
            newDiv.innerHTML=`
            <p>No data found.</p>
            `;
        }
    
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
    console.log("new data",newData);//important

    newData.forEach((dataId)=>{
        //console.log(dataId.thumbnail);
        const newDiv=document.createElement("div");
        newDiv.innerHTML= `
        <div class="card card-compact">
        <div>
        <figure><img class="w-full h-[180px] mx-auto rounded-lg " src="${dataId.thumbnail}" alt="Shoes" /></figure>
        </div>
       
        </div>
        

        <div class="card-body">
            <!-- Post title -->
            <div class="flex gap-2 items-center">
                <img class="w-10 rounded-full" src="${dataId.authors[0].profile_picture}" alt="">
                <h2 class="card-title text-2xl font-bold">${dataId.title}</h2>
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

handelPostContainer('1000')

handelTabContainer()