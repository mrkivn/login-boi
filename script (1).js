// hardcoded user credentials for demo
const validUsers = {
    'admin': 'password',
    'user': '123456'
};

// check if user is already logged in when page loads
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.includes('index.html')) {
        // if user is logged in and on login page, redirect to dashboard
        window.location.href = 'dashboard.html';
    }
});

// handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent form from submitting normally
    
    // get form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    
    // clear previous messages
    messageDiv.className = 'message';
    messageDiv.style.display = 'none';
    
    // basic validation
    if (!username || !password) {
        showMessage('Please fill in both username and password.', 'error');
        return;
    }
    
    // check credentials
    if (validUsers[username] && validUsers[username] === password) {
        // successful login
        showMessage('Login successful! Redirecting...', 'success');
        
        // store user session data
        localStorage.setItem('currentUser', username);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        // redirect to dashboard after a short delay
        setTimeout(function() {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } else {
        // failed login
        showMessage('Invalid username or password. Please try again.', 'error');
        
        // clear password field for security
        document.getElementById('password').value = '';
    }
});

// function to show messages
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}

// add some basic input validation
document.getElementById('username').addEventListener('input', function() {
    // remove any leading/trailing spaces and convert to lowercase
    this.value = this.value.trim().toLowerCase();
});

// clear error messages when user starts typing
document.getElementById('username').addEventListener('focus', clearMessages);
document.getElementById('password').addEventListener('focus', clearMessages);

function clearMessages() {
    const messageDiv = document.getElementById('message');
    if (messageDiv.classList.contains('error')) {
        messageDiv.style.display = 'none';
    }
}

// add Enter key support for better UX
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});
