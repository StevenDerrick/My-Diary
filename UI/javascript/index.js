const modal = document.getElementById("myModal");

const btn2 = document.getElementById("modal2");


const close1 = document.getElementsByClassName("close1")[0];
const close2 = document.getElementsByClassName("close2")[0];


function signinModal () {
  document.querySelector('.modal-content1').style.display = 'initial';
  modal.style.display = "flex";

}

function unCheck () {
  document.getElementById("chk").checked = false;

}


close1.onclick = function() {
  document.querySelector('.modal-content1').style.display = 'none';
  modal.style.display = "none";
}

btn2.onclick = function() {
    document.querySelector('.modal-content2').style.display = 'initial';
    modal.style.display = "flex";
    }


    close2.onclick = function() {
    document.querySelector('.modal-content2').style.display = 'none';
    modal.style.display = "none";
    }


window.onclick = function(event) {
  if (event.target == modal) {
    document.querySelector('.modal-content1').style.display = 'none';
    document.querySelector('.modal-content2').style.display = 'none';
    modal.style.display = "none";
  }
}