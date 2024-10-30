# Drag-Select Checkbox Group

A lightweight, accessible implementation of a checkbox group that supports both individual selection and drag-to-select functionality. Built with vanilla JavaScript and designed with accessibility in mind.

## Features

- ✨ Click individual checkboxes
- 🖱️ Click and drag to select/deselect multiple checkboxes
- ⌨️ Full keyboard navigation support
- 📱 Touch device support
- ♿ Screen reader friendly
- 🎨 Colorblind-friendly visual indicators

## Demo

![Demo of drag-select functionality](Demo/Multi%20Select%20Radio%20Boxes.gif)

## Usage

1. Include the required files:
```html
<link rel="stylesheet" href="styles.css">
<script src="app.js"></script>
```

2. Add the HTML structure:
```html
<div class="radio-group" role="group" aria-labelledby="groupLabel" aria-describedby="groupInstructions">
    <div class="radio-item" tabindex="0">
        <input type="checkbox" id="option1" name="options" aria-label="Option 1">
        <label for="option1">Option 1</label>
    </div>
    <!-- Add more options as needed -->
</div>
```

## Accessibility Features

- Keyboard Navigation:
  - `Space/Enter`: Toggle selected item
  - `Shift + Arrow Up/Down`: Select multiple items
  - `Tab`: Navigate between items
- Screen Reader Support:
  - ARIA labels and roles
  - Live announcements for state changes
  - Clear instructions
- Visual Accessibility:
  - High contrast focus indicators
  - Patterns and icons for colorblind users
  - Reduced motion support
- Touch Device Support:
  - Large touch targets
  - Touch drag functionality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/drag-select-checkbox.git
```

2. Open `index.html` in your browser.

## Development

The project consists of three main files:
- `index.html`: Base HTML structure
- `styles.css`: Styling and visual feedback
- `app.js`: Drag-select and accessibility functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Built with accessibility guidelines from WCAG 2.1
- Inspired by modern UX patterns for multi-select functionality
- Feedback and contributions from the accessibility community

## Future Improvements

- [ ] Add support for touch gestures
- [ ] Implement virtual scrolling for large lists
- [ ] Add customizable themes
- [ ] Enhance mobile experience
- [ ] Add automated accessibility tests

## Contact

Your Name - [@heyjson](https://x.com/heyjson)