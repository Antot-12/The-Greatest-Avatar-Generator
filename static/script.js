// Update font size display in real-time
document.getElementById('font_size').addEventListener('input', function () {
    const fontSize = document.getElementById('font_size').value;
    document.getElementById('fontSizeValue').textContent = fontSize + 'px';
    document.getElementById('avatarText').style.fontSize = fontSize + 'px'; // Update avatar text font size
});

// Update text color in real-time
document.getElementById('text_color').addEventListener('input', function () {
    const textColor = document.getElementById('text_color').value;
    document.getElementById('avatarText').style.color = textColor; // Update avatar text color
});

// Update font style in real-time
document.getElementById('font_style').addEventListener('change', function () {
    const fontStyle = document.getElementById('font_style').value;
    document.getElementById('avatarText').style.fontFamily = fontStyle; // Update avatar text font style
});

// Update font weight in real-time
document.getElementById('font_weight').addEventListener('change', function () {
    const fontWeight = document.getElementById('font_weight').value;
    document.getElementById('avatarText').style.fontWeight = fontWeight; // Update avatar text font weight
});

// Generate Avatar button
document.getElementById('avatarForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const initials = name.slice(0, 10).toUpperCase();
    const bgColor = document.getElementById('bg_color').value;
    const gradientColor = document.getElementById('gradient_color').value;
    const textColor = document.getElementById('text_color').value;
    const fontStyle = document.getElementById('font_style').value;
    const fontWeight = document.getElementById('font_weight').value;
    const fontSize = document.getElementById('font_size').value;
    const shape = document.getElementById('shape').value;
    const icon = document.getElementById('icon_select').value;
    const overlayOpacity = document.getElementById('overlay-opacity').value;

    const avatarPreview = document.getElementById('avatarPreview');
    const avatarText = document.getElementById('avatarText');
    const uploadedImage = document.getElementById('uploadedImage');
    const overlay = document.getElementById('overlay');

    // Apply background gradient and avatar text properties
    avatarPreview.style.background = `linear-gradient(135deg, ${bgColor}, ${gradientColor})`;
    avatarPreview.className = `avatar-preview ${shape}`;

    // Update text color, font style, and font weight based on current input values
    avatarText.textContent = initials;
    avatarText.style.color = textColor;
    avatarText.style.fontFamily = fontStyle;
    avatarText.style.fontWeight = fontWeight;
    avatarText.style.fontSize = fontSize + 'px';

    // Handle overlay and text for uploaded image
    if (uploadedImage.style.display === 'block') {
        overlay.style.display = 'block';
        overlay.style.background = `rgba(0, 0, 0, ${overlayOpacity})`;
        avatarText.style.zIndex = 2;
    } else {
        overlay.style.display = 'none';
    }

    // Add icon
    const iconElem = document.getElementById('icon');
    if (icon) {
        iconElem.innerHTML = `<span class="material-icons">${icon}</span>`;
    } else {
        iconElem.innerHTML = '';
    }
});

// Handle clearing the form
document.getElementById('clearForm').addEventListener('click', function () {
    document.getElementById('avatarForm').reset();
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarText = document.getElementById('avatarText');

    avatarPreview.style.background = `linear-gradient(135deg, #3498db, #e74c3c)`;
    avatarText.style.color = '#ffffff';
    avatarText.style.fontFamily = 'Roboto';
    avatarText.style.fontWeight = '400';
    avatarText.style.fontSize = '36px';
    avatarPreview.className = 'avatar-preview circle';
    avatarText.textContent = 'JD';

    document.getElementById('uploadedImage').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('icon').innerHTML = '';
});

// Handle image uploads
document.getElementById('file-input').addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = document.getElementById('uploadedImage');
        img.src = event.target.result;
        img.style.display = 'block';
        document.getElementById('avatarText').textContent = ''; // Clear text
    };
    reader.readAsDataURL(e.target.files[0]);
});

// Handle overlay opacity slider
document.getElementById('overlay-opacity').addEventListener('input', function () {
    const opacityValue = document.getElementById('overlay-opacity').value;
    document.getElementById('overlayOpacityValue').textContent = opacityValue;
    document.getElementById('overlay').style.background = `rgba(0, 0, 0, ${opacityValue})`;
});

// Handle avatar download
document.getElementById('downloadAvatar').addEventListener('click', function () {
    const avatarElement = document.getElementById('avatarPreview');

    html2canvas(avatarElement, {
        backgroundColor: null,
        logging: true,
        useCORS: true,
        scale: 2,
    }).then(function (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'avatar.png';
        link.click();
    }).catch(function (error) {
        console.error('Error capturing avatar:', error);
    });
});

// Handle randomization of avatar styles
document.getElementById('randomizeAvatar').addEventListener('click', function () {
    const randomColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    const randomFont = ['Roboto', 'Courier Prime', 'PT Serif', 'Fira Code'];
    const randomWeight = ['400', '700'];
    const randomIcon = ['star', 'favorite', 'check'];
    const randomShape = ['circle', 'square', 'rounded'];

    const randomBgColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    const randomGradientColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    const randomTextColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    const randomFontStyle = randomFont[Math.floor(Math.random() * randomFont.length)];
    const randomFontWeight = randomWeight[Math.floor(Math.random() * randomWeight.length)];
    const randomFontSize = Math.floor(Math.random() * (48 - 24 + 1)) + 24;
    const randomIconValue = randomIcon[Math.floor(Math.random() * randomIcon.length)];
    const randomShapeValue = randomShape[Math.floor(Math.random() * randomShape.length)];

    const avatarPreview = document.getElementById('avatarPreview');
    avatarPreview.style.background = `linear-gradient(135deg, ${randomBgColor}, ${randomGradientColor})`;

    // Update text color, font style, and other properties with random values
    document.getElementById('avatarText').style.color = randomTextColor;
    document.getElementById('avatarText').style.fontFamily = randomFontStyle;
    document.getElementById('avatarText').style.fontWeight = randomFontWeight;
    document.getElementById('avatarText').style.fontSize = randomFontSize + 'px';
    avatarPreview.className = `avatar-preview ${randomShapeValue}`;
    document.getElementById('icon').innerHTML = `<span class="material-icons">${randomIconValue}</span>`;
    document.getElementById('fontSizeValue').textContent = randomFontSize + 'px';
});
