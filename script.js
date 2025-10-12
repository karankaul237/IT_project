const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('page-title');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        navLinks.forEach(l => l.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        const pageId = this.getAttribute('data-page');
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
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

    addPatientModal.addEventListener('click', (e) => {
        if (e.target === addPatientModal) {
            addPatientModal.classList.remove('show');
        }
    });
}

const addDoctorBtn = document.getElementById('add-doctor-btn');
const addDoctorModal = document.getElementById('add-doctor-modal');
const closeDoctorModal = document.getElementById('close-doctor-modal');

if (addDoctorBtn && addDoctorModal && closeDoctorModal) {
    addDoctorBtn.addEventListener('click', () => {
        addDoctorModal.classList.add('show');
    });

    closeDoctorModal.addEventListener('click', () => {
        addDoctorModal.classList.remove('show');
    });

    addDoctorModal.addEventListener('click', (e) => {
        if (e.target === addDoctorModal) {
            addDoctorModal.classList.remove('show');
        }
    });
}

function closeAddDoctorModal() {
    document.getElementById('add-doctor-modal').classList.remove('show');
}
window.closeAddDoctorModal = closeAddDoctorModal;

// Data storage
const patients = [];
const doctors = [];

// Render patients table
function renderPatients() {
    const tbody = document.getElementById('patients-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    patients.forEach((p, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.gender}</td>
            <td>${p.contact}</td>
            <td>${p.bloodGroup}</td>
            <td>${p.lastVisit || '-'}</td>
            <td><span class="status-badge active">Active</span></td>
            <td>
                <button class="action-btn btn-view">View</button>
                <button class="action-btn btn-edit">Edit</button>
                <button class="action-btn btn-delete">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Render doctors table
function renderDoctors() {
    const tbody = document.getElementById('doctors-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    doctors.forEach((d, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>DR. ${d.lastName}</td>
            <td>${d.specialization}</td>
            <td>${d.contact}</td>
            <td>${d.email}</td>
            <td>${d.gender}</td>
            <td>${d.experience}</td>
            <td>${d.address}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Patient form handler
function addPatient(event) {
    event.preventDefault();
    const form = event.target;
    const patient = {
        name: form.name.value,
        age: form.age.value,
        gender: form.gender.value,
        contact: form.contact.value,
        email: form.email.value,
        bloodGroup: form.bloodGroup.value,
        address: form.address.value,
        medicalHistory: form.medicalHistory.value,
        lastVisit: new Date().toLocaleDateString()
    };
    patients.push(patient);
    renderPatients();
    alert('Patient added successfully!');
    document.getElementById('add-patient-modal').classList.remove('show');
    form.reset();
}
window.addPatient = addPatient;

// Doctor form handler
function addDoctor(event) {
    event.preventDefault();
    const form = event.target;
    const doctor = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        specialization: form.specialization.value,
        contact: form.contact.value,
        email: form.email.value,
        gender: form.gender.value,
        experience: form.experience.value,
        address: form.address.value
    };
    doctors.push(doctor);
    renderDoctors();
    alert('Doctor added successfully!');
    document.getElementById('add-doctor-modal').classList.remove('show');
    form.reset();
}
window.addDoctor = addDoctor;

// Add the missing function
function closeAddPatientModal() {
    document.getElementById('add-patient-modal').classList.remove('show');
}
window.closeAddPatientModal = closeAddPatientModal;

// Add patient search functionality
const patientSearch = document.getElementById('patient-search');
if (patientSearch) {
    patientSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPatients = patients.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.contact.includes(searchTerm)
        );
        renderFilteredPatients(filteredPatients);
    });
}

// Add delete functionality (add event delegation)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const row = e.target.closest('tr');
        const index = Array.from(row.parentElement.children).indexOf(row);
        
        if (row.closest('#patients-tbody')) {
            if (confirm('Are you sure you want to delete this patient?')) {
                patients.splice(index, 1);
                renderPatients();
            }
        } else if (row.closest('#doctors-tbody')) {
            if (confirm('Are you sure you want to delete this doctor?')) {
                doctors.splice(index, 1);
                renderDoctors();
            }
        }
    }
});