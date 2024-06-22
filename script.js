document.getElementById('pincodeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const pincode = document.getElementById('pincodeInput').value;

    
    if (!/^\d{6}$/.test(pincode)) {
        alert('Please enter a valid 6-digit PIN code.');
        return;
    }

    // loader
    // ...

    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();

        if (data && data[0]?.Status === 'Success') {
            const postOffice = data[0]?.PostOffice[0];
            const detailsSection = document.getElementById('detailsSection');
            detailsSection.innerHTML = `
                <p><strong>Post Office Name:</strong> ${postOffice.Name}</p>
                <p><strong>Pincode:</strong> ${postOffice.Pincode}</p>
                <p><strong>District:</strong> ${postOffice.District}</p>
                <p><strong>State:</strong> ${postOffice.State}</p>
            `;
        } else {
            alert('Couldn\'t find the postal data you\'re looking for.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data. Please try again later.');
    } finally {

    }
});
