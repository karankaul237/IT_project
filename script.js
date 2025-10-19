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

// ...existing code...
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
const appointments = [];

let patientIdCounter = 1;
let doctorIdCounter = 1;
let appointmentIdCounter = 1;

// Render patients table
function renderPatients() {
    const tbody = document.getElementById('patients-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    patients.forEach((p, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.gender}</td>
            <td>${p.contact}</td>
            <td>${p.bloodGroup || '-'}</td>
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
    populatePatientOptions();
}

// Render doctors table
function renderDoctors() {
    const tbody = document.getElementById('doctors-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    doctors.forEach((d, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${d.id}</td>
            <td>DR. ${d.lastName}</td>
            <td>${d.specialization}</td>
            <td>${d.contact}</td>
            <td>${d.email || '-'}</td>
            <td>${d.gender}</td>
            <td>${d.experience}</td>
            <td>${d.address || '-'}</td>
        `;
        tbody.appendChild(tr);
    });
    populateDoctorOptions();
}

// Render appointments table
function renderAppointments() {
    const tbody = document.getElementById('appointments-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    appointments.forEach((a) => {
        const patient = patients.find(p => p.id === a.patientId);
        const doctor = doctors.find(d => d.id === a.doctorId);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${a.id}</td>
            <td>${patient ? patient.name + ' (' + patient.id + ')' : '-'} </td>
            <td>${doctor ? 'DR. ' + doctor.lastName + ' (' + doctor.id + ')' : '-'}</td>
            <td>${a.date}</td>
            <td>${a.time}</td>
            <td>${a.reason || '-'}</td>
            <td>
                <button class="action-btn btn-delete" data-appt-id="${a.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Populate patient select in appointment modal
function populatePatientOptions() {
    const sel = document.getElementById('appointment-patient-select');
    if (!sel) return;
    sel.innerHTML = '';
    patients.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.name} (${p.id})`;
        sel.appendChild(opt);
    });
}

// Populate doctor select in appointment modal
function populateDoctorOptions() {
    const sel = document.getElementById('appointment-doctor-select');
    if (!sel) return;
    sel.innerHTML = '';
    doctors.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = `DR. ${d.lastName} (${d.id})`;
        sel.appendChild(opt);
    });
}

// Patient form handler
function addPatient(event) {
    event.preventDefault();
    const form = event.target;
    const patient = {
        id: 'P' + (patientIdCounter++),
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
        id: 'D' + (doctorIdCounter++),
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

// Schedule appointment handler
function scheduleAppointment(event) {
    event.preventDefault();
    const form = event.target;
    const appointment = {
        id: 'A' + (appointmentIdCounter++),
        patientId: form.patientId.value,
        doctorId: form.doctorId.value,
        date: form.date.value,
        time: form.time.value,
        reason: form.reason.value
    };
    appointments.push(appointment);
    renderAppointments();
    alert('Appointment scheduled successfully!');
    document.getElementById('add-appointment-modal').classList.remove('show');
    form.reset();
    // switch to appointments tab
    const apptLink = document.querySelector('[data-page="appointments"]');
    if (apptLink) apptLink.click();
}
window.scheduleAppointment = scheduleAppointment;

// Add the missing function
function closeAddPatientModal() {
    document.getElementById('add-patient-modal').classList.remove('show');
}
window.closeAddPatientModal = closeAddPatientModal;

// Appointment modal controls
const addAppointmentBtn = document.getElementById('add-appointment-btn');
const addAppointmentModal = document.getElementById('add-appointment-modal');
const closeAppointmentModal = document.getElementById('close-appointment-modal');
const appointmentCancelBtn = document.getElementById('appointment-cancel-btn');
const appointmentAddPatientBtn = document.getElementById('appointment-add-patient-btn');

if (addAppointmentBtn && addAppointmentModal && closeAppointmentModal) {
    addAppointmentBtn.addEventListener('click', () => {
        populatePatientOptions();
        populateDoctorOptions();
        addAppointmentModal.classList.add('show');
    });

    closeAppointmentModal.addEventListener('click', () => {
        addAppointmentModal.classList.remove('show');
    });

    addAppointmentModal.addEventListener('click', (e) => {
        if (e.target === addAppointmentModal) {
            addAppointmentModal.classList.remove('show');
        }
    });
}

if (appointmentCancelBtn) {
    appointmentCancelBtn.addEventListener('click', () => {
        addAppointmentModal.classList.remove('show');
    });
}

if (appointmentAddPatientBtn) {
    appointmentAddPatientBtn.addEventListener('click', () => {
        // open add patient modal so user can add new patient
        document.getElementById('add-patient-modal').classList.add('show');
    });
}

// Appointment search
const appointmentSearch = document.getElementById('appointment-search');
if (appointmentSearch) {
    appointmentSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = appointments.filter(a => {
            const patient = patients.find(p => p.id === a.patientId);
            const doctor = doctors.find(d => d.id === a.doctorId);
            return (a.id.toLowerCase().includes(term) ||
                    (patient && patient.name.toLowerCase().includes(term)) ||
                    (doctor && (`dr. ${doctor.lastName}`.toLowerCase().includes(term))) ||
                    a.date.includes(term) || a.time.includes(term) ||
                    (a.reason && a.reason.toLowerCase().includes(term)));
        });
        renderFilteredAppointments(filtered);
    });
}

function renderFilteredAppointments(list) {
    const tbody = document.getElementById('appointments-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    list.forEach((a) => {
        const patient = patients.find(p => p.id === a.patientId);
        const doctor = doctors.find(d => d.id === a.doctorId);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${a.id}</td>
            <td>${patient ? patient.name + ' (' + patient.id + ')' : '-'} </td>
            <td>${doctor ? 'DR. ' + doctor.lastName + ' (' + doctor.id + ')' : '-'}</td>
            <td>${a.date}</td>
            <td>${a.time}</td>
            <td>${a.reason || '-'}</td>
            <td>
                <button class="action-btn btn-delete" data-appt-id="${a.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Delete appointment / reuse existing delete handler
document.addEventListener('click', (e) => {
    // existing delete patient/doctor logic
    if (e.target.classList.contains('btn-delete')) {
        const apptId = e.target.getAttribute('data-appt-id');
        if (apptId) {
            if (confirm('Delete this appointment?')) {
                const idx = appointments.findIndex(a => a.id === apptId);
                if (idx > -1) {
                    appointments.splice(idx, 1);
                    renderAppointments();
                }
            }
            return;
        }
    }
});

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
renderPatients();
renderDoctors();
renderAppointments();
document.addEventListener('click', (e) => {
    const btn = e.target;
    if (!btn.classList.contains('btn-delete')) return;

    // Appointment delete (data-appt-id)
    const apptId = btn.getAttribute('data-appt-id');
    if (apptId) {
        if (confirm('Delete this appointment?')) {
            const idx = appointments.findIndex(a => a.id === apptId);
            if (idx > -1) {
                appointments.splice(idx, 1);
                renderAppointments();
            }
        }
        return;
    }

    // For patients/doctors: get id from first <td> of the row
    const row = btn.closest('tr');
    if (!row) return;
    const firstCell = row.querySelector('td');
    const rowId = firstCell ? firstCell.textContent.trim() : null;
    if (!rowId) return;

    if (row.closest('#patients-tbody')) {
        if (confirm('Are you sure you want to delete this patient?')) {
            const idx = patients.findIndex(p => p.id === rowId);
            if (idx > -1) {
                patients.splice(idx, 1);
                renderPatients();
            }
        }
        return;
    }

    if (row.closest('#doctors-tbody')) {
        if (confirm('Are you sure you want to delete this doctor?')) {
            const idx = doctors.findIndex(d => d.id === rowId);
            if (idx > -1) {
                doctors.splice(idx, 1);
                renderDoctors();
            }
        }
        return;
    }
});