document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('sidebar-active');
        });
    }
    
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Project modal functionality
    const addProjectBtn = document.getElementById('addProjectBtn');
    const projectModal = document.getElementById('projectModal');
    const closeModal = document.getElementById('closeModal');
    const cancelProject = document.getElementById('cancelProject');
    const projectForm = document.getElementById('projectForm');
    
    addProjectBtn.addEventListener('click', function() {
        // Reset form and set title for new project
        projectForm.reset();
        document.getElementById('modalTitle').textContent = 'Add New Project';
        projectModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', function() {
        projectModal.style.display = 'none';
    });
    
    cancelProject.addEventListener('click', function() {
        projectModal.style.display = 'none';
    });
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
        }
        if (event.target === projectDetailsModal) {
            projectDetailsModal.style.display = 'none';
        }
    });
    
    // Project form submission
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Project saved successfully!');
        projectModal.style.display = 'none';
    });
    
    // Project details modal functionality
    const projectDetailsModal = document.getElementById('projectDetailsModal');
    const closeDetailsModal = document.getElementById('closeDetailsModal');
    const closeDetails = document.getElementById('closeDetails');
    const editFromDetails = document.getElementById('editFromDetails');
    
    closeDetailsModal.addEventListener('click', function() {
        projectDetailsModal.style.display = 'none';
    });
    
    closeDetails.addEventListener('click', function() {
        projectDetailsModal.style.display = 'none';
    });
    
    editFromDetails.addEventListener('click', function() {
        // Close details modal and open edit modal
        projectDetailsModal.style.display = 'none';
        
        // In a real app, you would populate the form with the current project data
        document.getElementById('modalTitle').textContent = 'Edit Project';
        projectModal.style.display = 'block';
    });
    
    // Search functionality
    const projectSearch = document.getElementById('projectSearch');
    
    projectSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const projectTitle = card.querySelector('.project-title').textContent.toLowerCase();
            const projectCategory = card.querySelector('.project-category').textContent.toLowerCase();
            
            if (projectTitle.includes(searchTerm) || projectCategory.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Function to edit a project
function editProject(projectId) {
    // In a real app, you would fetch the project data from the server
    console.log(`Editing project with ID: ${projectId}`);
    
    // For demo purposes, we'll just open the modal with a title change
    document.getElementById('modalTitle').textContent = 'Edit Project';
    document.getElementById('projectModal').style.display = 'block';
    
    // In a real app, you would populate the form with the project data
    // This is just a placeholder to simulate form population
    document.getElementById('projectName').value = document.querySelectorAll('.project-title')[projectId - 1].textContent;
    document.getElementById('projectCategory').value = document.querySelectorAll('.project-category')[projectId - 1].textContent;
    
    // Set a progress value based on the visual progress bar
    const progressElement = document.querySelectorAll('.progress-fill')[projectId - 1];
    const progressWidth = progressElement.style.width;
    document.getElementById('projectProgress').value = parseInt(progressWidth);
    
    // Set some placeholder dates
    const today = new Date();
    const futureDate = new Date();
    futureDate.setMonth(today.getMonth() + 18);
    
    document.getElementById('projectStart').value = formatDateForInput(today);
    document.getElementById('projectEnd').value = formatDateForInput(futureDate);
    
    // Set a placeholder budget
    document.getElementById('projectBudget').value = 250000000;
    
    // Set a placeholder description
    document.getElementById('projectDescription').value = 'This is a placeholder description for the project. In a real application, this would be loaded from the database.';
}

// Function to view project details
function viewProjectDetails(projectId) {
    // In a real app, you would fetch the project details from the server
    console.log(`Viewing details for project with ID: ${projectId}`);
    
    try {
        // Get all project cards to ensure we're accessing the right one
        const projectCards = document.querySelectorAll('.project-card');
        
        // Make sure the projectId is valid
        if (projectId <= 0 || projectId > projectCards.length) {
            throw new Error(`Invalid project ID: ${projectId}`);
        }
        
        // Get the specific project card (using zero-based index)
        const projectCard = projectCards[projectId - 1];
        
        // Safely get elements from the card
        const projectTitle = projectCard.querySelector('.project-title').textContent;
        const projectCategory = projectCard.querySelector('.project-category').textContent;
        const progressElement = projectCard.querySelector('.progress-fill');
        const progressWidth = progressElement ? progressElement.style.width : '0%';
        const metaInfo = projectCard.querySelector('.project-meta').textContent.trim();
        
        // Safely get the image source
        const imgElement = projectCard.querySelector('.project-image img');
        const imgSrc = imgElement ? imgElement.src : 'https://via.placeholder.com/400x250?text=No+Image';
        
        // Set the modal title
        document.getElementById('detailsModalTitle').textContent = projectTitle;
        
        // Populate the details content
        document.getElementById('projectDetailsContent').innerHTML = `
            <div class="project-details-view">
                <div class="details-image">
                    <img src="${imgSrc}" alt="${projectTitle}">
                </div>
                
                <div class="details-info">
                    <div class="info-group">
                        <h3>Category</h3>
                        <p>${projectCategory}</p>
                    </div>
                    
                    <div class="info-group">
                        <h3>Progress</h3>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressWidth}"></div>
                        </div>
                        <p>${progressWidth}</p>
                    </div>
                    
                    <div class="info-group">
                        <h3>Timeline</h3>
                        <p>${metaInfo}</p>
                    </div>
                    
                    <div class="info-group">
                        <h3>Description</h3>
                        <p>This project aims to improve infrastructure and provide essential services to the citizens of Kenya. The project is being implemented in phases with careful consideration of environmental impact and community needs.</p>
                    </div>
                    
                    <div class="info-group">
                        <h3>Key Milestones</h3>
                        <ul>
                            <li>Planning and Design: Completed</li>
                            <li>Foundation Work: Completed</li>
                            <li>Structural Framework: In Progress</li>
                            <li>Interior Development: Pending</li>
                            <li>Final Inspection: Pending</li>
                        </ul>
                    </div>
                    
                    <div class="info-group">
                        <h3>Project Team</h3>
                        <p>Project Manager: John Kamau</p>
                        <p>Lead Engineer: Sarah Odhiambo</p>
                        <p>Architect: Michael Njoroge</p>
                        <p>Financial Controller: Elizabeth Wanjiku</p>
                    </div>
                </div>
            </div>
        `;
        
        // Show the modal
        document.getElementById('projectDetailsModal').style.display = 'block';
    } catch (error) {
        console.error("Error displaying project details:", error);
        alert("There was an error displaying the project details. Please try again.");
    }
}
