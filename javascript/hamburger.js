document.addEventListener('DOMContentLoaded', () => {
  const MAX_MOBILE_LINKS = 9;
  const desktopList = document.querySelector('.nav-list');
  const navPanel = document.querySelector('.nav-panel');
  const checkbox = document.querySelector('.nav-toggle');

  const closeMenu = () => { if (checkbox) checkbox.checked = false; };

  if (desktopList && navPanel) {

    navPanel.innerHTML = ''; 

    const overlayList = document.createElement('ul');
    overlayList.className = 'nav-list-overlay';

    const items = Array.from(desktopList.querySelectorAll('li'));
    
    items.slice(0, MAX_MOBILE_LINKS).forEach(li => {
      const clone = li.cloneNode(true);
      const link = clone.querySelector('a');
      if(link) link.addEventListener('click', closeMenu);
      overlayList.appendChild(clone);
    });

    navPanel.appendChild(overlayList);
  }

  document.addEventListener('click', (e) => {
    if (checkbox && checkbox.checked && !e.target.closest('header')) closeMenu();
  });
});