const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Stash the event to the deferredPrompt
    window.deferredPrompt = event;
    // show butInstall
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
     return;
    }
  
    promptEvent.prompt();
    // Clear deferredPrompt var
    window.deferredPrompt = null;
    // hide butInstall
    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
