document.addEventListener('DOMContentLoaded', function() {
    const cardNumber = document.getElementById('cardNumber');
    const cardHolder = document.getElementById('cardHolder');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');
    const form = document.getElementById('creditCardForm');
    const card = document.querySelector('.card');

    const cardNumberDisplay = document.getElementById('cardNumberDisplay');
    const cardHolderDisplay = document.getElementById('cardHolderDisplay');
    const expiryDisplay = document.getElementById('expiryDisplay');
    const cvvDisplay = document.getElementById('cvvDisplay');
    const brandLogo = document.getElementById('brandLogo');

    const cardBrands = {
        visa: 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png',
        mastercard: 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png',
        amex: 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/amex.png',
        discover: 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/discover.png'
    };

    function detectCardBrand(number) {
        const patterns = {
            visa: /^4/,
            mastercard: /^5[1-5]/,
            amex: /^3[47]/,
            discover: /^6/
        };

        for (const [brand, pattern] of Object.entries(patterns)) {
            if (pattern.test(number)) {
                brandLogo.src = cardBrands[brand];
                return;
            }
        }
        brandLogo.src = cardBrands.visa; // Default to Visa
    }

    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value) {
            value = value.match(/.{1,4}/g).join(' ');
            detectCardBrand(value.replace(/\s/g, ''));
        }
        e.target.value = value;
        cardNumberDisplay.textContent = value || '•••• •••• •••• ••••';
    });

    cardHolder.addEventListener('input', (e) => {
        let value = e.target.value.toUpperCase();
        e.target.value = value;
        cardHolderDisplay.textContent = value || 'NOME COMPLETO';
    });

    expiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
        expiryDisplay.textContent = value || 'MM/AA';
    });

    cvv.addEventListener('focus', () => {
        card.classList.add('flip');
    });

    cvv.addEventListener('blur', () => {
        card.classList.remove('flip');
    });

    cvv.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
        cvvDisplay.textContent = value || '•••';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Cartão cadastrado com sucesso!');
    });
});