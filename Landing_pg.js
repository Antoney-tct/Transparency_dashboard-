
function showTimeline(timelineId) {
    // Hide all timeline contents
    document.querySelectorAll('.timeline-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.timeline-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected timeline and activate tab
    document.getElementById(timelineId + '-timeline').classList.add('active');
    event.currentTarget.classList.add('active');
}

// Form submission
document.querySelector('.subscription-form').addEventListener('submit', function(e) {
e.preventDefault();

const email = this.querySelector('input[type="email"]').value;

fetch('subscribe.php', {
method: 'POST',
headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
},
body: 'email=' + encodeURIComponent(email)
})
.then(response => response.json())
.then(data => {
alert(data.message || 'Thank you for subscribing to government updates!');
if (data.success) {
    this.reset();
}
})
.catch(error => {
console.error('Error:', error);
alert('An error occurred. Please try again later.');
});
});


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
