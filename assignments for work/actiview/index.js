var img,nav,main,line;
window.onload=function(){
 img = document.getElementById('proImage');
 nav=document.getElementById("mySidenav");
 main=document.getElementById("main");
 line=document.getElementById("white");
 createItems();
 createOps()
}
let show =false;

function changeImage(showLeft) {
    console.log(showLeft)
    if(showLeft){
        img.src = "pro2.png"
    }else{
        img.src = "pro.png"
    }
}
window.addEventListener('resize', function(event){
    var newWidth = window.innerWidth;

     if(newWidth<=1000){
    changeImage(true);
    closeNav()
    }else{
        changeImage(false);
        openNav()
    }


   
   

});
function createItems()
{
    let sideBox = document.getElementById('mySidenav');
    for(let i =0;i<4;i++)
    {
    let d = document.createElement("div");
    let img = document.createElement("img");
    let p = document.createElement("p");
    p.innerText = "text text";
    img.src = "a.PNG";
    img.alt = "image not found";
    d.className = "item";
    d.appendChild(img);
    d.append(p);
    sideBox.appendChild(d);
    }
}

function createOps(){
let  wordsCon=document.getElementById('wordsCon');

    const items=[ "Business Management & Administration",
    'Finance', "Science, Technology, Engineering & Mathematics ",
       "Marketing",
        "General Management",
       "Information Technology",
        "Office and Administrative Support",
        "Architecture & Engineering",
        "Health Science",
       "Computer and Mathematical",
       "Education, Training and Library",
       "Other"]

       items.forEach(item=>{
        let div = document.createElement('div');
        div.className='col-md-4 col-lg-3  col-sm-12 block-Words';
        div.innerText=item;
        wordsCon.appendChild(div);

       })


}
function openNav() {
    document.getElementById('openHumb').style.opacity='0';
    show=true;
   
    nav.style.width = "5rem";
    document.getElementById("main").style.marginLeft = "5rem";
  }
  
  function closeNav() {
    document.getElementById('openHumb').style.opacity='1';

  

   
    line.style.marginLeft= "0";
      show=false;
      nav.style.width = "0";
    main.style.marginLeft= "0";
  }