const submitButton = document.getElementById("submit-button");
const allInputs = document.querySelectorAll("input");
const mobileNum = document.getElementById("employee-number");
const numAlert = document.getElementById("number-alert")

const validationFields = {
  employeeName: false,
  employeeEmail: false,
  employeeAddress: false,
  employeeCity: false,
  employeeState: false,
  employeeDob: false,
  employeeMobileNum: false,
  employeePincode: false,
};

allInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    let name = e.target.getAttribute("name");

    if (name === "employeeMobileNum") {
      if (e.target.value.length === 10) {
        numAlert.style.visibility="hidden"
        validationFields[name] = true;
      } else {
        numAlert.style.visibility="visible"
        validationFields[name] = false;
      }
    } else if (e.target.value.length > 0) {
      validationFields[name] = true;
    } else {
      validationFields[name] = false;
    }
    let allFieldCheck = Object.keys(validationFields).every((field) => {
      return validationFields[field] === true;
    });

    if (!allFieldCheck) {
      submitButton.setAttribute("disabled", "");
    } else {
      submitButton.removeAttribute("disabled");
    }
  });
});
