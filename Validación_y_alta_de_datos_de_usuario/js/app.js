try {
    window.document.write(validateUserData(window.location.search));
} catch (e) {
    window.document.write(e.message);
}
