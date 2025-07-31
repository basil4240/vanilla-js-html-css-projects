# Universal Unit Converter

A modern, responsive unit converter web application that supports 8 different unit categories with comprehensive conversion capabilities.

![Unit Converter](https://img.shields.io/badge/Version-1.0.0-blue) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Features

### 🎯 **8 Unit Categories**
- **Length**: meter, kilometer, centimeter, millimeter, inch, foot, yard, mile, nautical mile
- **Weight**: kilogram, gram, pound, ounce, ton, stone, carat
- **Temperature**: celsius, fahrenheit, kelvin, rankine
- **Area**: square meter, square kilometer, square centimeter, square millimeter, square inch, square foot, square yard, acre, hectare
- **Volume**: liter, milliliter, cubic meter, cubic centimeter, US gallon, UK gallon, quart, pint, cup, fluid ounce, tablespoon, teaspoon
- **Speed**: meter/second, kilometer/hour, mile/hour, foot/second, knot, mach
- **Time**: second, minute, hour, day, week, month, year, millisecond, microsecond, nanosecond
- **Energy**: joule, kilojoule, calorie, kilocalorie, watt hour, kilowatt hour, BTU, foot-pound

### 🎨 **Modern UI/UX**
- Glassmorphism design with gradient backgrounds
- Smooth animations and hover effects
- Responsive design for all devices
- Interactive swap button with rotation animation
- Quick conversion buttons for common conversions
- Real-time conversion as you type

### ⚡ **Performance**
- Vanilla JavaScript (no dependencies)
- Lightweight and fast
- Optimized for mobile devices
- Smooth 60fps animations

## Installation

1. Clone or download the repository
2. Ensure all files are in the same directory:
   ```
   project-folder/
   ├── index.html
   ├── style.css
   ├── script.js
   └── README.md
   ```
3. Open `index.html` in your web browser

## Usage

### Basic Conversion
1. Select a unit category from the top buttons
2. Enter a value in the "From" input field
3. Choose source and target units from the dropdowns
4. The result appears instantly in the "To" field

### Swap Units
- Click the swap button (🔄) to interchange the source and target units

### Quick Conversions
- Use the quick conversion buttons at the bottom for common unit pairs
- Each category has 4 preset conversions for convenience

### Keyboard Navigation
- Tab through all interactive elements
- Enter values using keyboard input
- Accessible design for screen readers

## Technical Details

### File Structure
- **index.html**: Main HTML structure and semantic markup
- **style.css**: Complete CSS styling with animations and responsive design
- **script.js**: All conversion logic and user interactions
- **README.md**: Documentation and usage instructions

### Conversion Logic
- **Standard Units**: Uses multiplication factors relative to base units
- **Temperature**: Uses formula-based conversions for accurate temperature scaling
- **Precision**: Automatic formatting based on result magnitude
- **Error Handling**: Graceful handling of invalid inputs

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Customization

### Adding New Units
1. Add the unit to the appropriate category in `unitData`
2. Add the display name to `unitNames`
3. Update quick conversions if desired

### Styling Changes
- Modify CSS variables for colors and spacing
- Update gradient backgrounds in the CSS
- Customize animations and transitions

### Adding Categories
1. Add new category data to `unitData`
2. Add corresponding unit names to `unitNames`
3. Create quick conversions for the new category
4. Add category button to HTML

## Performance Optimizations

- Efficient DOM manipulation
- Minimal reflows and repaints
- Optimized CSS animations using transforms
- Lazy loading of conversion calculations
- Memory-efficient event handling

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color ratios
- Responsive font sizes
- Screen reader compatibility

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 60+     | ✅ Full |
| Firefox | 55+     | ✅ Full |
| Safari  | 12+     | ✅ Full |
| Edge    | 79+     | ✅ Full |
| Mobile  | All     | ✅ Full |

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- New unit categories
- Additional units within existing categories
- UI/UX improvements
- Performance optimizations
- Bug fixes

## Author

Created with ❤️ for easy and accurate unit conversions.

---