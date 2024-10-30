document.addEventListener('DOMContentLoaded', () => {
  const radioGroup = document.querySelector('.radio-group');
  let dragStart = null;
  let isDragging = false;
  let targetState = null;

  // Initialize accessibility features
  radioGroup.setAttribute('role', 'group');
  radioGroup.setAttribute('aria-label', 'Selectable options group');
  
  // Add keyboard support for multi-select
  radioGroup.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
          const checkbox = e.target.querySelector('input[type="checkbox"]');
          if (checkbox) {
              checkbox.checked = !checkbox.checked;
              updateVisualState(e.target.closest('.radio-item'));
              e.preventDefault();
          }
      }

      // Allow Shift+Arrow keys to select multiple checkboxes
      if (e.shiftKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
          e.preventDefault();
          const items = [...radioGroup.querySelectorAll('.radio-item')];
          const currentIndex = items.findIndex(item => item.contains(document.activeElement));
          if (currentIndex === -1) return;

          const nextIndex = e.key === 'ArrowUp' ? 
              Math.max(0, currentIndex - 1) : 
              Math.min(items.length - 1, currentIndex + 1);

          const checkbox = items[nextIndex].querySelector('input[type="checkbox"]');
          checkbox.checked = items[currentIndex].querySelector('input[type="checkbox"]').checked;
          checkbox.focus();
          updateVisualState(items[nextIndex]);
      }
  });

  function hasDraggedEnough(e) {
      if (!dragStart) return false;
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance > 5;
  }

  // Track potential drag start position
  radioGroup.addEventListener('mousedown', (e) => {
      const item = e.target.closest('.radio-item');
      if (!item) return;

      dragStart = { 
          x: e.clientX, 
          y: e.clientY,
          item: item
      };
      
      const checkbox = item.querySelector('input[type="checkbox"]');
      targetState = !checkbox.checked;

      // Announce drag start to screen readers
      announceToScreenReader('Started checkbox selection. Drag to select multiple items.');
  });

  // Handle drag selection
  document.addEventListener('mousemove', (e) => {
      if (!dragStart) return;

      if (!isDragging && hasDraggedEnough(e)) {
          isDragging = true;
          const checkbox = dragStart.item.querySelector('input[type="checkbox"]');
          checkbox.checked = targetState;
          updateVisualState(dragStart.item);
      }

      if (isDragging) {
          const currentItem = e.target.closest('.radio-item');
          if (currentItem) {
              const checkbox = currentItem.querySelector('input[type="checkbox"]');
              const previousState = checkbox.checked;
              checkbox.checked = targetState;
              
              if (previousState !== targetState) {
                  announceToScreenReader(`${checkbox.checked ? 'Checked' : 'Unchecked'} ${checkbox.getAttribute('aria-label')}`);
              }
              
              updateVisualState(currentItem);
              currentItem.classList.add('dragging');
          }
      }
  });

  // Clean up after drag
  document.addEventListener('mouseup', () => {
      if (isDragging) {
          announceToScreenReader('Finished checkbox selection.');
      }

      document.querySelectorAll('.radio-item').forEach(item => {
          item.classList.remove('dragging');
      });
      
      dragStart = null;
      isDragging = false;
      targetState = null;
  });

  // Update visual and ARIA states
  function updateVisualState(item) {
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
          item.classList.add('selected');
          // Add icons/patterns for colorblind users
          item.setAttribute('data-checked', 'true');
      } else {
          item.classList.remove('selected');
          item.removeAttribute('data-checked');
      }
      
      // Update ARIA state
      checkbox.setAttribute('aria-checked', checkbox.checked);
  }

  // Helper function for screen reader announcements
  function announceToScreenReader(message) {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('class', 'sr-only');
      announcement.textContent = message;
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
  }

  // Handle checkbox changes
  radioGroup.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
          updateVisualState(e.target.closest('.radio-item'));
      }
  });

  // Add touch support
  let touchStartX, touchStartY;
  radioGroup.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
  });

  radioGroup.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      // Convert touch to mouse event for consistency
      const mouseEvent = new MouseEvent('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY
      });
      document.dispatchEvent(mouseEvent);
  });
});