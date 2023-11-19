function toggleForm(feature) {
    const formContainer = document.getElementById(`${feature}-form`);
    
    if (formContainer.style.display === 'none' || formContainer.style.display === '') {
        formContainer.style.display = 'block';
    } else {
        formContainer.style.display = 'none';
    }
}

function toggleContent(feature) {
    const content = document.getElementById(`${feature}-content`);
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
}
