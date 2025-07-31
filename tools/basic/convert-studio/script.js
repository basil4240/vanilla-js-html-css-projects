// Unit conversion data
const unitData = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        inch: 39.3701,
        foot: 3.28084,
        yard: 1.09361,
        mile: 0.000621371,
        nautical_mile: 0.000539957
    },
    weight: {
        kilogram: 1,
        gram: 1000,
        pound: 2.20462,
        ounce: 35.274,
        ton: 0.001,
        stone: 0.157473,
        carat: 5000
    },
    temperature: {
        celsius: { base: true },
        fahrenheit: { 
            toBase: (f) => (f - 32) * 5/9,
            fromBase: (c) => c * 9/5 + 32
        },
        kelvin: {
            toBase: (k) => k - 273.15,
            fromBase: (c) => c + 273.15
        },
        rankine: {
            toBase: (r) => (r - 491.67) * 5/9,
            fromBase: (c) => c * 9/5 + 491.67
        }
    },
    area: {
        square_meter: 1,
        square_kilometer: 0.000001,
        square_centimeter: 10000,
        square_millimeter: 1000000,
        square_inch: 1550,
        square_foot: 10.7639,
        square_yard: 1.19599,
        acre: 0.000247105,
        hectare: 0.0001
    },
    volume: {
        liter: 1,
        milliliter: 1000,
        cubic_meter: 0.001,
        cubic_centimeter: 1000,
        gallon_us: 0.264172,
        gallon_uk: 0.219969,
        quart: 1.05669,
        pint: 2.11338,
        cup: 4.22675,
        fluid_ounce: 33.814,
        tablespoon: 67.628,
        teaspoon: 202.884
    },
    speed: {
        meter_per_second: 1,
        kilometer_per_hour: 3.6,
        mile_per_hour: 2.23694,
        foot_per_second: 3.28084,
        knot: 1.94384,
        mach: 0.00291545
    },
    time: {
        second: 1,
        minute: 0.0166667,
        hour: 0.000277778,
        day: 0.0000115741,
        week: 0.00000164609,
        month: 3.8052e-7,
        year: 3.17098e-8,
        millisecond: 1000,
        microsecond: 1000000,
        nanosecond: 1000000000
    },
    energy: {
        joule: 1,
        kilojoule: 0.001,
        calorie: 0.239006,
        kilocalorie: 0.000239006,
        watt_hour: 0.000277778,
        kilowatt_hour: 2.77778e-7,
        btu: 0.000947817,
        foot_pound: 0.737562
    }
};

// Unit display names
const unitNames = {
    // Length
    meter: 'Meter (m)',
    kilometer: 'Kilometer (km)',
    centimeter: 'Centimeter (cm)',
    millimeter: 'Millimeter (mm)',
    inch: 'Inch (in)',
    foot: 'Foot (ft)',
    yard: 'Yard (yd)',
    mile: 'Mile (mi)',
    nautical_mile: 'Nautical Mile (nmi)',
    
    // Weight
    kilogram: 'Kilogram (kg)',
    gram: 'Gram (g)',
    pound: 'Pound (lb)',
    ounce: 'Ounce (oz)',
    ton: 'Metric Ton (t)',
    stone: 'Stone (st)',
    carat: 'Carat (ct)',
    
    // Temperature
    celsius: 'Celsius (°C)',
    fahrenheit: 'Fahrenheit (°F)',
    kelvin: 'Kelvin (K)',
    rankine: 'Rankine (°R)',
    
    // Area
    square_meter: 'Square Meter (m²)',
    square_kilometer: 'Square Kilometer (km²)',
    square_centimeter: 'Square Centimeter (cm²)',
    square_millimeter: 'Square Millimeter (mm²)',
    square_inch: 'Square Inch (in²)',
    square_foot: 'Square Foot (ft²)',
    square_yard: 'Square Yard (yd²)',
    acre: 'Acre (ac)',
    hectare: 'Hectare (ha)',
    
    // Volume
    liter: 'Liter (L)',
    milliliter: 'Milliliter (mL)',
    cubic_meter: 'Cubic Meter (m³)',
    cubic_centimeter: 'Cubic Centimeter (cm³)',
    gallon_us: 'US Gallon (gal)',
    gallon_uk: 'UK Gallon (gal)',
    quart: 'Quart (qt)',
    pint: 'Pint (pt)',
    cup: 'Cup (c)',
    fluid_ounce: 'Fluid Ounce (fl oz)',
    tablespoon: 'Tablespoon (tbsp)',
    teaspoon: 'Teaspoon (tsp)',
    
    // Speed
    meter_per_second: 'Meter/Second (m/s)',
    kilometer_per_hour: 'Kilometer/Hour (km/h)',
    mile_per_hour: 'Mile/Hour (mph)',
    foot_per_second: 'Foot/Second (ft/s)',
    knot: 'Knot (kn)',
    mach: 'Mach',
    
    // Time
    second: 'Second (s)',
    minute: 'Minute (min)',
    hour: 'Hour (h)',
    day: 'Day',
    week: 'Week',
    month: 'Month',
    year: 'Year',
    millisecond: 'Millisecond (ms)',
    microsecond: 'Microsecond (μs)',
    nanosecond: 'Nanosecond (ns)',
    
    // Energy
    joule: 'Joule (J)',
    kilojoule: 'Kilojoule (kJ)',
    calorie: 'Calorie (cal)',
    kilocalorie: 'Kilocalorie (kcal)',
    watt_hour: 'Watt Hour (Wh)',
    kilowatt_hour: 'Kilowatt Hour (kWh)',
    btu: 'British Thermal Unit (BTU)',
    foot_pound: 'Foot-Pound (ft⋅lb)'
};

// Quick conversion presets
const quickConversions = {
    length: [
        { from: 'meter', to: 'foot', label: '1m → ft' },
        { from: 'kilometer', to: 'mile', label: '1km → mi' },
        { from: 'inch', to: 'centimeter', label: '1in → cm' },
        { from: 'foot', to: 'meter', label: '1ft → m' }
    ],
    weight: [
        { from: 'kilogram', to: 'pound', label: '1kg → lb' },
        { from: 'pound', to: 'kilogram', label: '1lb → kg' },
        { from: 'gram', to: 'ounce', label: '1g → oz' },
        { from: 'ton', to: 'pound', label: '1t → lb' }
    ],
    temperature: [
        { from: 'celsius', to: 'fahrenheit', label: '0°C → °F' },
        { from: 'fahrenheit', to: 'celsius', label: '32°F → °C' },
        { from: 'celsius', to: 'kelvin', label: '0°C → K' },
        { from: 'kelvin', to: 'celsius', label: '273K → °C' }
    ],
    area: [
        { from: 'square_meter', to: 'square_foot', label: '1m² → ft²' },
        { from: 'acre', to: 'hectare', label: '1ac → ha' },
        { from: 'square_kilometer', to: 'square_mile', label: '1km² → mi²' },
        { from: 'hectare', to: 'acre', label: '1ha → ac' }
    ],
    volume: [
        { from: 'liter', to: 'gallon_us', label: '1L → gal' },
        { from: 'milliliter', to: 'fluid_ounce', label: '1mL → fl oz' },
        { from: 'gallon_us', to: 'liter', label: '1gal → L' },
        { from: 'cup', to: 'milliliter', label: '1c → mL' }
    ],
    speed: [
        { from: 'kilometer_per_hour', to: 'mile_per_hour', label: '1km/h → mph' },
        { from: 'meter_per_second', to: 'kilometer_per_hour', label: '1m/s → km/h' },
        { from: 'mile_per_hour', to: 'kilometer_per_hour', label: '1mph → km/h' },
        { from: 'knot', to: 'kilometer_per_hour', label: '1kn → km/h' }
    ],
    time: [
        { from: 'hour', to: 'minute', label: '1h → min' },
        { from: 'day', to: 'hour', label: '1d → h' },
        { from: 'week', to: 'day', label: '1w → d' },
        { from: 'year', to: 'day', label: '1y → d' }
    ],
    energy: [
        { from: 'joule', to: 'calorie', label: '1J → cal' },
        { from: 'kilocalorie', to: 'joule', label: '1kcal → J' },
        { from: 'kilowatt_hour', to: 'joule', label: '1kWh → J' },
        { from: 'btu', to: 'joule', label: '1BTU → J' }
    ]
};

// DOM elements
const categoryButtons = document.querySelectorAll('.category-btn');
const fromInput = document.getElementById('from-input');
const toInput = document.getElementById('to-input');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const swapBtn = document.getElementById('swap-btn');
const quickGrid = document.getElementById('quick-grid');

// Current category
let currentCategory = 'length';

// Initialize the app
function init() {
    updateUnits();
    updateQuickConversions();
    
    // Event listeners
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            switchCategory(category);
        });
    });
    
    fromInput.addEventListener('input', convert);
    fromUnit.addEventListener('change', convert);
    toUnit.addEventListener('change', convert);
    swapBtn.addEventListener('click', swapUnits);
    
    // Initial conversion
    convert();
}

// Switch category
function switchCategory(category) {
    currentCategory = category;
    
    // Update active button
    categoryButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    updateUnits();
    updateQuickConversions();
    convert();
}

// Update unit dropdowns
function updateUnits() {
    const units = Object.keys(unitData[currentCategory]);
    
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    units.forEach(unit => {
        const fromOption = document.createElement('option');
        fromOption.value = unit;
        fromOption.textContent = unitNames[unit];
        fromUnit.appendChild(fromOption);
        
        const toOption = document.createElement('option');
        toOption.value = unit;
        toOption.textContent = unitNames[unit];
        toUnit.appendChild(toOption);
    });
    
    // Set default selections
    if (units.length > 1) {
        toUnit.selectedIndex = 1;
    }
}

// Convert units
function convert() {
    const value = parseFloat(fromInput.value);
    if (isNaN(value)) {
        toInput.value = '';
        return;
    }
    
    const fromUnitValue = fromUnit.value;
    const toUnitValue = toUnit.value;
    
    let result;
    
    if (currentCategory === 'temperature') {
        result = convertTemperature(value, fromUnitValue, toUnitValue);
    } else {
        result = convertStandard(value, fromUnitValue, toUnitValue);
    }
    
    toInput.value = formatResult(result);
}

// Standard conversion (multiplication-based)
function convertStandard(value, fromUnit, toUnit) {
    const fromFactor = unitData[currentCategory][fromUnit];
    const toFactor = unitData[currentCategory][toUnit];
    
    // Convert to base unit, then to target unit
    const baseValue = value / fromFactor;
    return baseValue * toFactor;
}

// Temperature conversion (formula-based)
function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;
    
    // Convert to celsius first
    let celsius;
    const fromUnitData = unitData.temperature[fromUnit];
    
    if (fromUnitData.base) {
        celsius = value;
    } else {
        celsius = fromUnitData.toBase(value);
    }
    
    // Convert from celsius to target unit
    const toUnitData = unitData.temperature[toUnit];
    if (toUnitData.base) {
        return celsius;
    } else {
        return toUnitData.fromBase(celsius);
    }
}

// Format result
function formatResult(result) {
    if (Math.abs(result) >= 1000000 || (Math.abs(result) < 0.001 && result !== 0)) {
        return result.toExponential(6);
    } else if (Math.abs(result) >= 100) {
        return result.toFixed(2);
    } else if (Math.abs(result) >= 1) {
        return result.toFixed(4);
    } else {
        return result.toFixed(6);
    }
}

// Swap units
function swapUnits() {
    const fromValue = fromUnit.value;
    const toValue = toUnit.value;
    const inputValue = fromInput.value;
    
    fromUnit.value = toValue;
    toUnit.value = fromValue;
    fromInput.value = toInput.value;
    
    convert();
}

// Update quick conversions
function updateQuickConversions() {
    const conversions = quickConversions[currentCategory];
    quickGrid.innerHTML = '';
    
    conversions.forEach(conversion => {
        const btn = document.createElement('button');
        btn.className = 'quick-btn';
        btn.textContent = conversion.label;
        btn.addEventListener('click', () => {
            fromUnit.value = conversion.from;
            toUnit.value = conversion.to;
            fromInput.value = conversion.from === 'celsius' && conversion.to === 'fahrenheit' ? '0' :
                             conversion.from === 'fahrenheit' && conversion.to === 'celsius' ? '32' :
                             conversion.from === 'celsius' && conversion.to === 'kelvin' ? '0' :
                             conversion.from === 'kelvin' && conversion.to === 'celsius' ? '273' : '1';
            convert();
        });
        quickGrid.appendChild(btn);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);