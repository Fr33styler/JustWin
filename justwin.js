function handleMutations(mutations) {
  for (let mutation of mutations) {

    if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && (checkFirstGame(mutation) || checkPlayAgain(mutation))) {
       playJustWin();
       break;
    }
  }
}

function checkFirstGame(mutation) {
   for (let addedNode of mutation.addedNodes) {
       if (addedNode.className === 'live-game-buttons-component') {
          return true;
       }
   }
   return false;
}

function checkPlayAgain(mutation) {
  if (mutation.target.className === 'live-game-buttons-component') {
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