const units = {
  length: ["meters", "feet", "inches"],
  weight: ["kilograms", "pounds"],
  temperature: ["Celsius", "Fahrenheit", "Kelvin"]
};

const conversions = {
  // from BASE -> to target
  length: {
    meters: v => v,
    feet: v => v * 3.2808,
    inches: v => v * 39.3701
  },
  weight: {
    kilograms: v => v,
    pounds: v => v * 2.20462
  },
  temperature: {
    Celsius: v => v,
    Fahrenheit: v => (v * 9 / 5) + 32,
    Kelvin: v => v + 273.15
  }
};

const inverse = {
  // from source -> BASE
  length: {
    meters: v => v,
    feet: v => v / 3.2808,
    inches: v => v / 39.3701
  },
  weight: {
    kilograms: v => v,
    pounds: v => v / 2.20462
  },
  temperature: {
    Celsius: v => v,
    Fahrenheit: v => (v - 32) * 5 / 9,
    Kelvin: v => v - 273.15
  }
};

function updateUnits() {
  const type = document.getElementById("type").value; // <-- daidai
  const from = document.getElementById("from");
  const to = document.getElementById("to");

  from.innerHTML = "";
  to.innerHTML = "";

  units[type].forEach(unit => {
    from.innerHTML += `<option value="${unit}">${unit}</option>`;
    to.innerHTML += `<option value="${unit}">${unit}</option>`;
  });

  // zabi default daban-daban kadan
  if (to.options.length > 1) to.selectedIndex = 1;
}

function convert() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const val = parseFloat(document.getElementById("inputValue").value); // <-- daidai id

  if (isNaN(val)) {
    document.getElementById("result").innerText = "Please enter a number";
    return;
  }

  // 1) koma BASE da inverse, 2) daga BASE zuwa target da conversions
  const inBase = inverse[type][from](val);
  const out = conversions[type][to](inBase);

  document.getElementById("result").innerText =
    `${val} ${from} = ${out.toFixed(2)} ${to}`;
}

// cika dropdowns a lokacin da shafi ya gama load
document.addEventListener("DOMContentLoaded", updateUnits);
