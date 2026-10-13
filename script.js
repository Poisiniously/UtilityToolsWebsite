// --- Popup & Loading Logic ---
  function openTool(url) {
    currentToolUrl = url;
    const popup = document.getElementById('popup');
    const iframe = document.getElementById('toolFrame');
    const spinner = document.getElementById('popupSpinner');
    
    // NEW: Prevent scrolling on the main page
    document.body.style.overflow = 'hidden';
    
    spinner.style.opacity = '1';
    spinner.style.visibility = 'visible';
    iframe.style.opacity = '0';
    
    iframe.src = url;
    popup.style.display = 'flex';
  }

  function closeTool() {
    const popup = document.getElementById('popup');
    const iframe = document.getElementById('toolFrame');
    
    // NEW: Re-enable scrolling on the main page
    document.body.style.overflow = 'auto';
    
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.log(err));
    }
    
    popup.classList.remove('fullscreen-mode');
    document.getElementById('fullscreenBtn').innerText = '🗖';
    
    popup.style.display = 'none';
    iframe.src = '';
    currentToolUrl = '';
  }
