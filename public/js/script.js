 (function () {
        'use strict'

        const forms = document.querySelectorAll('.needs-validation')

        Array.from(forms).forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
      })()



// AUTOMATICALLY CLOSE ALERTS OF FLASH MSG AFTER 4 SECONDS ->
 
const alertEl = document.querySelector('.alert');
  if (alertEl) {
    setTimeout(() => {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alertEl);
      bsAlert.close();
    }, 4000); // 4 seconds
  }
