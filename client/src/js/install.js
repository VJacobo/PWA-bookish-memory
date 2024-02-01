const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior
  event.preventDefault();

  // Store the event for later use
  const deferredPrompt = event;

  // Update UI to notify the user that they can install the app
  butInstall.style.display = 'block';

  // TODO: Implement logic to handle installation prompt
  butInstall.addEventListener('click', async () => {
    // Show the installation prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    // Reset the deferredPrompt variable
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User declined the PWA installation');
    }
  });
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // This event is fired after the app has been successfully installed
  console.log('App installed successfully');
});
