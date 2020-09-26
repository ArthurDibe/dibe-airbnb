//OBJECT SVG IMAGES - CREATED USING PATH METHOD
// -- those vector images are used inside the containers for the inputs
const vectorIMAGES = {
    email: "m22.5 4h-21c-.83 0-1.5.67-1.5 1.51v12.99c0 .83.67 1.5 1.5 1.5h20.99a1.5 1.5 0 0 0 1.51-1.51v-12.98c0-.84-.67-1.51-1.5-1.51zm.5 14.2-6.14-7.91 6.14-4.66v12.58zm-.83-13.2-9.69 7.36c-.26.2-.72.2-.98 0l-9.67-7.36h20.35zm-21.17.63 6.14 4.67-6.14 7.88zm.63 13.37 6.3-8.1 2.97 2.26c.62.47 1.57.47 2.19 0l2.97-2.26 6.29 8.1z",
    person: "m14.76 11.38a6.01 6.01 0 0 0 3.28-5.36 6.02 6.02 0 0 0 -12.04 0 6.01 6.01 0 0 0 3.27 5.35c-4.81 1.22-9.27 5.31-9.27 8.7 0 1.56 6.8 3.93 12 3.93 5.23 0 12-2.34 12-3.93 0-3.39-4.45-7.47-9.24-8.7zm-7.76-5.36a5.02 5.02 0 0 1 10.04 0c0 2.69-2.12 4.87-4.78 5-.09 0-.18-.01-.26-.01s-.16.01-.24.01c-2.65-.14-4.76-2.32-4.76-5zm15.9 14.09a3.8 3.8 0 0 1 -.64.44c-.62.36-1.5.75-2.52 1.1-2.41.83-5.18 1.35-7.74 1.35-2.55 0-5.32-.52-7.74-1.37-1.01-.35-1.9-.74-2.52-1.1-.47-.27-.74-.51-.74-.46 0-3.35 5.55-7.85 10.64-8.05.13.01.25.02.38.02.12 0 .24-.01.36-.02 5.09.22 10.62 4.71 10.62 8.05 0-.07-.02-.04-.1.04z",
    phone: "M10,15.654c-0.417,0-0.754,0.338-0.754,0.754S9.583,17.162,10,17.162s0.754-0.338,0.754-0.754S10.417,15.654,10,15.654z M14.523,1.33H5.477c-0.833,0-1.508,0.675-1.508,1.508v14.324c0,0.833,0.675,1.508,1.508,1.508h9.047c0.833,0,1.508-0.675,1.508-1.508V2.838C16.031,2.005,15.356,1.33,14.523,1.33z M15.277,17.162c0,0.416-0.338,0.754-0.754,0.754H5.477c-0.417,0-0.754-0.338-0.754-0.754V2.838c0-0.417,0.337-0.754,0.754-0.754h9.047c0.416,0,0.754,0.337,0.754,0.754V17.162zM13.77,2.838H6.23c-0.417,0-0.754,0.337-0.754,0.754v10.555c0,0.416,0.337,0.754,0.754,0.754h7.539c0.416,0,0.754-0.338,0.754-0.754V3.592C14.523,3.175,14.186,2.838,13.77,2.838z M13.77,13.77c0,0.208-0.169,0.377-0.377,0.377H6.607c-0.208,0-0.377-0.169-0.377-0.377V3.969c0-0.208,0.169-0.377,0.377-0.377h6.785c0.208,0,0.377,0.169,0.377,0.377V13.77z",
    password: "m21.53 18.07c.15.22.46.28.69.13a.47.47 0 0 0 .14-.66l-1.32-1.9c1.86-1.33 2.97-3.11 2.97-5.17a.49.49 0 0 0 -.5-.48.49.49 0 0 0 -.5.48c0 3.82-4.73 6.7-11 6.7s-11-2.87-11-6.7a.49.49 0 0 0 -.5-.48.49.49 0 0 0 -.5.48c0 2.05 1.11 3.84 2.97 5.17l-1.32 1.9a.47.47 0 0 0 .14.66c.23.15.54.09.69-.13l1.32-1.9c.94.55 2.03.99 3.23 1.32a.29.29 0 0 0 -.01.04l-.58 2.23a.48.48 0 0 0 .36.58.5.5 0 0 0 .61-.35l.58-2.23.01-.04c1.1.23 2.28.37 3.51.4v2.4a.49.49 0 0 0 .5.48.49.49 0 0 0 .5-.48v-2.4a19.39 19.39 0 0 0 3.51-.4l.01.04.58 2.23a.5.5 0 0 0 .61.35.48.48 0 0 0 .36-.58l-.58-2.23-.01-.04c1.2-.33 2.29-.77 3.23-1.32z"
}

// This function has the purpose of changing the eye vector inside the password to change
// This function also allows the password to be reveiled or not
const eye = ()=>    
{                   
    let eyeBox = document.querySelector(".eyebox");
    let eyeIMG = document.querySelector(".eyebox path");
    let viewPASSWD = document.querySelector("#passwd");
    let viewCONFIRM = document.querySelector("#passwdCONFIRM");

    const openEYE = "m12 18c-6.25 0-11-3.11-11-7s4.75-7 11-7 11 3.11 11 7-4.75 7-11 7zm8.41-12.78c-.96-.62-2.09-1.12-3.32-1.49l.61-2.37a.5.5 0 1 0 -.97-.25l-.61 2.36a18.02 18.02 0 0 0 -3.63-.46v-2.51a.5.5 0 0 0 -1 0v2.51a17.9 17.9 0 0 0 -3.73.48l-.62-2.38a.5.5 0 0 0 -.97.25l.62 2.4c-1.22.38-2.33.88-3.28 1.5l-1.04-1.49a.5.5 0 0 0 -.82.57l1.05 1.5c-1.69 1.36-2.71 3.14-2.71 5.15 0 4.63 5.37 8 12 8s12-3.37 12-8c0-2.04-1.04-3.83-2.77-5.2l1.02-1.46a.5.5 0 0 0 -.82-.57zm-11.41 5.78a3 3 0 1 1 6 0 3 3 0 0 1 -6 0zm-1 0a4 4 0 1 0 8 0 4 4 0 0 0 -8 0z";

    const closeEYE = "m21.53 18.07c.15.22.46.28.69.13a.47.47 0 0 0 .14-.66l-1.32-1.9c1.86-1.33 2.97-3.11 2.97-5.17a.49.49 0 0 0 -.5-.48.49.49 0 0 0 -.5.48c0 3.82-4.73 6.7-11 6.7s-11-2.87-11-6.7a.49.49 0 0 0 -.5-.48.49.49 0 0 0 -.5.48c0 2.05 1.11 3.84 2.97 5.17l-1.32 1.9a.47.47 0 0 0 .14.66c.23.15.54.09.69-.13l1.32-1.9c.94.55 2.03.99 3.23 1.32a.29.29 0 0 0 -.01.04l-.58 2.23a.48.48 0 0 0 .36.58.5.5 0 0 0 .61-.35l.58-2.23.01-.04c1.1.23 2.28.37 3.51.4v2.4a.49.49 0 0 0 .5.48.49.49 0 0 0 .5-.48v-2.4a19.39 19.39 0 0 0 3.51-.4l.01.04.58 2.23a.5.5 0 0 0 .61.35.48.48 0 0 0 .36-.58l-.58-2.23-.01-.04c1.2-.33 2.29-.77 3.23-1.32z";

    console.log(eyeBox.getAttribute("height"));
    if(eyeBox.getAttribute("height") == "24")
    {
        eyeBox.setAttribute("height","25");
        eyeIMG.setAttribute("d", openEYE);
        viewPASSWD.setAttribute("type","text");
        viewCONFIRM.setAttribute("type","text");
    }
    else {
        eyeBox.setAttribute("height","24");
        eyeIMG.setAttribute("d", closeEYE);
        viewPASSWD.setAttribute("type","password");
        viewCONFIRM.setAttribute("type","password");
    }
}


const changeBlock = (option)=>  
{                               
    let linksAbout = document.querySelectorAll(".about a");
    let list = document.querySelectorAll(".infoBlock");

    list[option].style.display = "block";
    list[option].style.height = "420px";
    linksAbout[option].setAttribute("style","background-color: #ff3b5c; color:white;");

    for(let i = 0; i < list.length; i++)
    {
        if(i != option)
        {
            linksAbout[i].setAttribute("style","");
            list[i].style.height = "0";
        }
    }
}


const roomPopUp = (user_email,room_title,room_price,room_description,room_pic,room_location,check_IN,check_OUT,guest_NUMB)=>
{
    document.querySelector(".modal-title").innerHTML = `<b>${room_title}</b>`;
    document.querySelector("#roomModalBody").innerHTML = `
    <img style="width:350px;" class="img-thumbnail mb-3" src="/uploads/${room_pic}" alt="room">
    <p style="font-size:20px;">Description:
    <br>
    <b>${room_description}</b></p><br>
    <br>
    <span>CAD <b>${room_price}</b>/night</span><p class="float-right">Location: <b><u>${room_location}</u></b></p>
    <p>${check_IN}</p>
    <p>${check_OUT}</p>
    <p>${guest_NUMB}</p>`;

    const route = `/user/bookRoom?userEmail=${user_email}&roomTitle=${room_title}&roomLocation=${room_location}&checkIn=${check_IN}&checkOut=${check_OUT}&guestNumb=${guest_NUMB}`;

    document.querySelector(".modal-footer #bookRoom").setAttribute("href",route);

    $("#myModal").modal();
}