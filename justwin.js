function handleMutations(mutations) {
  for (let mutation of mutations) {

    const target = mutation.target;
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
       
       if (checkFirstGame(target)) break;
       if (checkPlayAgain(target, mutation)) break;
    }
  }
}

function checkFirstGame(target) {
   if (target.className === 'sidebar-component' && target.getElementsByClassName('live-game-buttons-component').length > 0) {
      playJustWin();
      return true;
   }
   return false;
}

function checkPlayAgain(target, mutation) {
  if (target.className === 'live-game-buttons-component') {
     for (let addedNode of mutation.addedNodes) {
         if (addedNode.className === 'resign-button-component') {
            playJustWin();
            return true;
         }
     }
  }
  return false;
}

function playJustWin() {
   const audio = new Audio(browser.runtime.getURL("justwin.mp3"));
   audio.play();
}

const observer = new MutationObserver(handleMutations);

observer.observe(document.body, {
  childList: true,
  subtree: true
});