document.addEventListener('DOMContentLoaded', () => {
    const totalSeatsInput = document.getElementById('totalSeats');
    const numCustomersInput = document.getElementById('numCustomers');
    const generateCustomerInputsBtn = document.getElementById('generateCustomerInputs');
    const customerInputArea = document.getElementById('customerInputArea');
    const bookTicketsBtn = document.getElementById('bookTickets');
    const bookingResultsDiv = document.getElementById('bookingResults');

    let customerNames = [];

    generateCustomerInputsBtn.addEventListener('click', () => {
        const numCustomers = parseInt(numCustomersInput.value);
        customerInputArea.innerHTML = '';
        customerNames = [];

        if (numCustomers > 0) {
            for (let i = 0; i < numCustomers; i++) {
                const label = document.createElement('label');
                label.textContent = `Name of Customer ${i + 1}:`;
                customerInputArea.appendChild(label);

                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `Enter name of customer ${i + 1}`;
                input.id = `customerName${i}`;
                customerInputArea.appendChild(input);
                customerInputArea.appendChild(document.createElement('br'));
            }
        }
    });

    bookTicketsBtn.addEventListener('click', () => {
        let totalSeats = parseInt(totalSeatsInput.value);
        bookingResultsDiv.innerHTML = '';
        customerNames = [];

        const numCustomers = parseInt(numCustomersInput.value);
        for (let i = 0; i < numCustomers; i++) {
            const customerNameInput = document.getElementById(`customerName${i}`);
            if (customerNameInput && customerNameInput.value.trim() !== '') {
                customerNames.push(customerNameInput.value.trim());
            } else if (customerNameInput) {
                customerNames.push(`Unnamed Customer ${i + 1}`);
            }
        }

        if (customerNames.length === 0 && numCustomers > 0) {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = 'Please generate customer input fields and enter customer names.';
            resultDiv.classList.add('sold-out');
            bookingResultsDiv.appendChild(resultDiv);
            return;
        } else if (customerNames.length === 0 && numCustomers === 0) {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = 'No customers in queue to book tickets for.';
            resultDiv.classList.add('sold-out');
            bookingResultsDiv.appendChild(resultDiv);
            return;
        }

        if (isNaN(totalSeats)) {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = 'Enter total number of seats.';
            resultDiv.classList.add('sold-out');
            bookingResultsDiv.appendChild(resultDiv);
            return;
        }

        for (const customer of customerNames) {
            const resultDiv = document.createElement('div');
            if (totalSeats > 0) {
                resultDiv.textContent = `Ticket booked for: ${customer}`;
                resultDiv.classList.add('booked');
                totalSeats--;
            } else {
                resultDiv.textContent = `Sorry ${customer}, tickets are sold out.`;
                resultDiv.classList.add('sold-out');
            }
            bookingResultsDiv.appendChild(resultDiv);
        }
    });
});
