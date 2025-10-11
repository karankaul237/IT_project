const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('page-title');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all links and pages
        navLinks.forEach(l => l.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));

        // Add active class to clicked link
        this.classList.add('active');

        // Show corresponding page
        const pageId = this.getAttribute('data-page');
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');

            // Update page title
            const pageName = this.textContent.trim();
            pageTitle.textContent = pageName;
        }
    });
});
const addPatientBtn = document.getElementById('add-patient-btn');
const addPatientModal = document.getElementById('add-patient-modal');
const closeModal = document.getElementById('close-modal');

if (addPatientBtn && addPatientModal && closeModal) {
    addPatientBtn.addEventListener('click', () => {
        addPatientModal.classList.add('show');
    });

    closeModal.addEventListener('click', () => {
        addPatientModal.classList.remove('show');
    });

    // Optional: Close modal when clicking outside modal content
    addPatientModal.addEventListener('click', (e) => {
        if (e.target === addPatientModal) {
            addPatientModal.classList.remove('show');
        }
    });
}