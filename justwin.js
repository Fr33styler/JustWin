function handleMutations(mutations) {
  for (let mutation of mutations) {

    const target = mutation.target;
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && (checkFirstGame(target) || checkPlayAgain(target, mutation))) {
       playJustWin();
       break;
    }
  }
}

function checkFirstGame(target) {
   return target.className === 'sidebar-component' && target.getElementsByClassName('resign-button-component').length > 0;
}

function checkPlayAgain(target, mutation) {
  if (target.className === 'live-game-buttons-component') {
     for (let addedNode of mutation.addedNodes) {
         if (addedNode.className === 'resign-button-component') {
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