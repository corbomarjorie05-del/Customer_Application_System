import { api } from './api.js';

let currentUser = JSON.parse(localStorage.getItem('user')) || null;
let isLogin = true;

const authSection = document.getElementById('authSection');
const dashboardSection = document.getElementById('dashboardSection');
const authForm = document.getElementById('authForm');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const registerFields = document.getElementById('registerFields');
const submitBtn = document.getElementById('submitBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const appCount = document.getElementById('appCount');
const appList = document.getElementById('appList');
const appForm = document.getElementById('appForm');
const statusGroup = document.getElementById('statusGroup');
const appStatus = document.getElementById('appStatus');
const appAmount = document.getElementById('appAmount');
let editingAppId = null;

// Initialize UI
if (currentUser) {
    showDashboard();
} else {
    showAuth();
}

function showAuth() {
    authSection.style.display = 'block';
    dashboardSection.style.display = 'none';
    logoutBtn.style.display = 'none';
}

// Tab Switching
loginTab.addEventListener('click', () => setAuthMode(true));
registerTab.addEventListener('click', () => setAuthMode(false));

function setAuthMode(login) {
    isLogin = login;
    loginTab.classList.toggle('active', login);
    registerTab.classList.toggle('active', !login);
    registerFields.style.display = login ? 'none' : 'block';
    submitBtn.textContent = login ? 'Login' : 'Register';
    document.getElementById('firstName').required = !login;
    document.getElementById('lastName').required = !login;
}

// Auth Submission
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        if (isLogin) {
            const user = await api.post('/users/login', { email, password_hash: password });
            currentUser = user;
            localStorage.setItem('user', JSON.stringify(user));
            showDashboard();
        } else {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            await api.post('/users/register', { email, password_hash: password, first_name: firstName, last_name: lastName });
            alert('Registration successful! Please login.');
            setAuthMode(true);
        }
    } catch (err) {
        alert(err.message);
    }
});

async function showDashboard() {
    if (!currentUser) {
        showAuth();
        return;
    }
    authSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    logoutBtn.style.display = 'block';

    try {
        const profile = await api.get(`/users/profile/${currentUser.user_id}`);
        userName.textContent = (profile && profile.first_name) ? profile.first_name : 'User';
    } catch (err) {
        console.error('Failed to load profile:', err);
        userName.textContent = 'User';
    }
    loadApplications();
}

async function loadApplications() {
    if (!currentUser) return;
    try {
        const apps = await api.get(`/applications/${currentUser.user_id}`);
        appCount.textContent = apps.length || 0;
        if (apps.length === 0) {
            appList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No applications yet.</p>';
            return;
        }
        appList.innerHTML = apps.map(app => `
            <div class="list-item">
                <div class="app-info">
                    <strong>${app.app_type}</strong> ${app.data_json.amount ? ` - $${app.data_json.amount}` : ''}<br>
                    <small>${new Date(app.submitted_at).toLocaleDateString()}</small>
                </div>
                <div class="app-actions">
                    <span class="status-badge status-${app.status}">${app.status}</span>
                    <button class="btn-icon edit-btn" data-id="${app.app_id}" data-type="${app.app_type}" data-status="${app.status}" data-details='${JSON.stringify(app.data_json)}' title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete-btn" data-id="${app.app_id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to new buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.getAttribute('data-id');
                const type = btn.getAttribute('data-type');
                const status = btn.getAttribute('data-status');
                const details = JSON.parse(btn.getAttribute('data-details'));
                startEdit(id, type, details.details, status, details.amount);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm('Are you sure you want to delete this application?')) {
                    const id = btn.getAttribute('data-id');
                    try {
                        await api.delete(`/applications/${id}`);
                        loadApplications();
                    } catch (err) {
                        alert('Error deleting application: ' + err.message);
                    }
                }
            });
        });
    } catch (err) {
        console.error('Failed to load applications:', err);
    }
}

function startEdit(id, type, details, status, amount) {
    editingAppId = id;
    document.getElementById('appType').value = type;
    document.getElementById('appDetails').value = details;
    appAmount.value = amount || '';
    appStatus.value = status;
    statusGroup.style.display = 'block';
    document.getElementById('appSubmitBtn').textContent = 'Update Application';
    document.getElementById('cancelEditBtn').style.display = 'inline-block';
    document.getElementById('appForm').scrollIntoView({ behavior: 'smooth' });
}

function cancelEdit() {
    editingAppId = null;
    document.getElementById('appForm').reset();
    statusGroup.style.display = 'none';
    document.getElementById('appSubmitBtn').textContent = 'Submit Application';
    document.getElementById('cancelEditBtn').style.display = 'none';
}

document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);

// Application Submission
appForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const appType = document.getElementById('appType').value;
    const appDetails = document.getElementById('appDetails').value;
    const amountValue = appAmount.value;
    const status = appStatus.value;

    try {
        if (editingAppId) {
            await api.put(`/applications/${editingAppId}`, {
                app_type: appType,
                status: status,
                data_json: { details: appDetails, amount: amountValue }
            });
            alert('Application updated successfully!');
            cancelEdit();
        } else {
            await api.post('/applications', {
                user_id: currentUser.user_id,
                app_type: appType,
                data_json: { details: appDetails, amount: amountValue }
            });
            appForm.reset();
        }
        loadApplications();
    } catch (err) {
        alert('Error: ' + err.message);
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    location.reload();
});
