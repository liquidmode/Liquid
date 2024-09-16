document.addEventListener('DOMContentLoaded', () => {
    const paymentOptions = document.querySelectorAll('.payment-option');

    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            const paymentMethod = option.dataset.method;
            alert(`You selected ${paymentMethod}.`);
            // Handle the payment method selection logic here
            // For example, you could redirect to a payment processing page or show a confirmation modal.
        });
    });
});