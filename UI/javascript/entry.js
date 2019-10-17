function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}


// ENTRY MODAL


const modal = document.getElementById("myModal");

const close1 = document.getElementsByClassName("close1")[0];
const close2 = document.getElementsByClassName("close2")[0];

function entryView () {
    document.querySelector('.modal-content1').style.display = 'initial';
    modal.style.display = "flex";
}


close1.onclick = function() {
  document.querySelector('.modal-content1').style.display = 'none';
  modal.style.display = "none";
}

function entryUpdate () {
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

// REMOVE ENTRY

 function removeDiv(id){
   document.getElementById(id).style.display = 'none';
  }
