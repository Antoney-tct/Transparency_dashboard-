// Sample project data (will be stored in localStorage)
const sampleProjects = [
    {
        id: 1,
        name: "Talanta Stadium",
        category: "Sports Infrastructure",
        description: "The construction of a modern stadium along Ngong Road to boost sports infrastructure and host international events.",
        startDate: "2023-01-15",
        endDate: "2024-12-30",
        budget: 450000000,
        progress: 65,
        status: "ongoing",
        image: "https://via.placeholder.com/400x250?text=Talanta+Stadium"
    },
    {
        id: 2,
        name: "GTC Towers",
        category: "Commercial Building",
        description: "A global establishment for both local events, staycations and official government functions in the heart of Nairobi.",
        startDate: "2023-03-10",
        endDate: "2025-06-20",
        budget: 780000000,
        progress: 40,
        status: "ongoing",
        image: "https://via.placeholder.com/400x250?text=GTC+Towers"
    },
    {
        id: 3,
        name: "Thika Superhighway",
        category: "Transportation",
        description: "A modern transportation network connecting Nairobi to Thika, fostering economic growth and urban development.",
        startDate: "2022-09-05",
        endDate: "2024-03-15",
        budget: 320000000,
        progress: 85,
        status: "ongoing",
        image: "https://via.placeholder.com/400x250?text=Thika+Superhighway"
    },
    {
        id: 4,
        name: "Konza City",
        category: "Technology Hub",
        description: "Africa's silicon savannah - a smart city between Nairobi and Mombasa to drive technological innovation.",
        startDate: "2022-11-20",
        endDate: "2026-12-31",
        budget: 1200000000,
        progress: 30,
        status: "ongoing",
        image: "https://via.placeholder.com/400x250?text=Konza+City"
    },
    {
        id: 5,
        name: "GTC Phase 1",
        category: "Commercial Building",
        description: "First phase of the Global Trade Center development project in Nairobi's Westlands area.",
        startDate: "2021-02-10",
        endDate: "2022-06-15",
        budget: 450000000,
        progress: 100,
        status: "completed",
        image: "https://via.placeholder.com/400x250?text=GTC+Phase+1"
    },
    {
        id: 6,
        name: "Thika Road Phase 1",
        category: "Transportation",
        description: "First phase of the Thika Road expansion project, connecting Nairobi CBD to Thika town.",
        startDate: "2020-05-20",
        endDate: "2021-12-10",
        budget: 320000000,
        progress: 100,
        status: "completed",
        image: "https://via.placeholder.com/400x250?text=Thika+Road+Phase+1"
    },
    {
        id: 7,
        name: "Nairobi Metro Rail",
        category: "Public Transportation",
        description: "A comprehensive metro rail system for Nairobi to ease traffic congestion and provide efficient public transport.",
        startDate: "2025-01-10",
        endDate: "2030-12-31",
        budget: 1200000000,
        progress: 5,
        status: "planned",
        image: "https://via.placeholder.com/400x250?text=Nairobi+Metro+Rail"
    },
    {
        id: 8,
        name: "Nairobi River Restoration",
        category: "Environmental",
        description: "Project to clean up and restore the Nairobi River ecosystem and create recreational spaces along its banks.",
        startDate: "2024-06-15",
        endDate: "2026-06-15",
        budget: 350000000,
        progress: 10,
        status: "planned",
        image: "https://via.placeholder.com/400x250?text=Nairobi+River+Restoration"
    }
];

// DOM Elements
const projectModal = document.getElementById('projectModal');
const projectDetailsModal = document.getElementById('projectDetailsModal');
const projectForm = document.getElementById('projectForm');
const addProjectBtn = document.getElementById('addProjectBtn');
const closeModal = document.getElementById('closeModal');
const cancelProject = document.getElementById('cancelProject');
const closeDetailsModal = document.getElementById('closeDetailsModal');
const closeDetails = document.getElementById('closeDetails');
const editFromDetails = document.getElementById('editFromDetails');
const deleteFromDetails = document.getElementById('deleteFromDetails');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const projectSearch = document.getElementById('projectSearch');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Initialize projects in localStorage if not exists
function initializeProjects() {
    if (!localStorage.getItem('projects')) {
        localStorage.setItem('projects', JSON.stringify(sampleProjects));
    }
}

// Get projects from localStorage
function getProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}

// Save projects to localStorage
function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Generate a unique ID for new projects
function generateId() {
    const projects = getProjects();
    return projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Format date for input fields (YYYY-MM-DD)
function formatDateForInput(date) {
    return date.toISOString().split('T')[0];
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Show toast notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    const toastIcon = document.querySelector('.toast-icon');
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle toast-icon success';
    } else {
        toastIcon.className = 'fas fa-exclamation-circle toast-icon error';
    }
    
    toast.classList.add('show');
    
    // Hide toast after animation completes
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Render project card
function renderProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image || `https://via.placeholder.com/400x250?text=${encodeURIComponent(project.name)}`}" alt="${project.name}">
        </div>
        <div class="project-details">
            <h3 class="project-title">${project.name}</h3>
            <div class="project-category">${project.category}</div>
            <div class="project-progress">
                <div class="progress-text">
                    <span>Progress: ${project.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${project.progress}%"></div>
                </div>
            </div>
            <div class="project-meta">
                <span><i class="fas fa-calendar"></i> ${project.status === 'completed' ? 'Completed: ' + formatDate(project.endDate) : 'Started: ' + formatDate(project.startDate)}</span>
                <span><i class="fas fa-${project.status === 'completed' ? 'money-bill-wave' : 'clock'}"></i> ${project.status === 'completed' ? 'Budget: ' + formatCurrency(project.budget) : 'Est. completion: ' + formatDate(project.endDate)}</span>
            </div>
            <div class="project-actions">
                <button class="btn btn-primary" onclick="editProject(${project.id})">Edit</button>
                <button class="btn btn-outline" onclick="viewProjectDetails(${project.id})">Details</button>
            </div>
        </div>
    `;
    
    return card;
}

// Load projects by status
function loadProjectsByStatus(status) {
    const projects = getProjects();
    const filteredProjects = status === 'all' ? projects : projects.filter(p => p.status === status);
    const container = document.getElementById(`${status}-projects`);
    
    container.innerHTML = '';
    
    if (filteredProjects.length === 0) {
        container.innerHTML = `<div class="no-projects">No ${status} projects found</div>`;
        return;
    }
    
    filteredProjects.forEach(project => {
        container.appendChild(renderProjectCard(project));
    });
}

// Load all projects
function loadAllProjects() {
    loadProjectsByStatus('ongoing');
    loadProjectsByStatus('completed');
    loadProjectsByStatus('planned');
    updateProjectStats();
}

// Update project statistics
function updateProjectStats() {
    const projects = getProjects();
    
    document.getElementById('totalProjects').textContent = projects.length;
    document.getElementById('ongoingProjects').textContent = projects.filter(p => p.status === 'ongoing').length;
    document.getElementById('completedProjects').textContent = projects.filter(p => p.status === 'completed').length;
    document.getElementById('plannedProjects').textContent = projects.filter(p => p.status === 'planned').length;
}

// View project details
function viewProjectDetails(projectId) {
    const projects = getProjects();
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        showToast('Project not found', 'error');
        return;
    }
    
    document.getElementById('detailsModalTitle').textContent = project.name;
    
    document.getElementById('projectDetailsContent').innerHTML = `
        <div class="project-details-view">
            <div class="details-image">
                <img src="${project.image || `https://via.placeholder.com/400x250?text=${encodeURIComponent(project.name)}`}" alt="${project.name}">
            </div>
            
            <div class="details-info">
                <div class="info-group">
                    <h3>Category</h3>
                    <p>${project.category}</p>
                </div>
                
                <div class="info-group">
                    <h3>Progress</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                    <p>${project.progress}%</p>
                </div>
                
                <div class="info-group">
                    <h3>Timeline</h3>
                    <p>Start Date: ${formatDate(project.startDate)}</p>
                    <p>Estimated Completion: ${formatDate(project.endDate)}</p>
                </div>
                
                <div class="info-group">
                    <h3>Budget</h3>
                    <p>${formatCurrency(project.budget)}</p>
                </div>
                
                <div class="info-group">
                    <h3>Description</h3>
                    <p>${project.description}</p>
                </div>
                
                <div class="info-group">
                    <h3>Status</h3>
                    <p>${project.status.charAt(0).toUpperCase() + project.status.slice(1)}</p>
                </div>
            </div>
        </div>
    `;
    
    // Store current project ID for edit/delete operations
    editFromDetails.setAttribute('data-id', projectId);
    deleteFromDetails.setAttribute('data-id', projectId);
    
    projectDetailsModal.style.display = 'block';
}

// Edit project
function editProject(projectId) {
    const projects = getProjects();
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        showToast('Project not found', 'error');
        return;
    }
    
    // Set form title
    document.getElementById('modalTitle').textContent = 'Edit Project';
    
    // Populate form fields
    document.getElementById('projectId').value = project.id;
    document.getElementById('projectName').value = project.name;
    document.getElementById('projectCategory').value = project.category;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectStart').value = project.startDate;
    document.getElementById('projectEnd').value = project.endDate;
    document.getElementById('projectBudget').value = project.budget;
    document.getElementById('projectProgress').value = project.progress;
    document.getElementById('projectStatus').value = project.status;
    document.getElementById('projectImage').value = project.image || '';
    
    // Show modal
    projectModal.style.display = 'block';
}

// Delete project
function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }
    
    let projects = getProjects();
    projects = projects.filter(p => p.id !== projectId);
    
    saveProjects(projects);
    loadAllProjects();
    
    // Close details modal if open
    projectDetailsModal.style.display = 'none';
    
    showToast('Project deleted successfully');
}

// Filter projects by search term
function filterProjects(searchTerm) {
    const projects = getProjects();
    const term = searchTerm.toLowerCase();
    
    const filteredProjects = projects.filter(project => 
        project.name.toLowerCase().includes(term) || 
        project.category.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term)
    );
    
    // Clear all project containers
    document.getElementById('ongoing-projects').innerHTML = '';
    document.getElementById('completed-projects').innerHTML = '';
    document.getElementById('planned-projects').innerHTML = '';
    
    // Group filtered projects by status
    const ongoing = filteredProjects.filter(p => p.status === 'ongoing');
    const completed = filteredProjects.filter(p => p.status === 'completed');
    const planned = filteredProjects.filter(p => p.status === 'planned');
    
    // Render filtered projects
    ongoing.forEach(project => {
        document.getElementById('ongoing-projects').appendChild(renderProjectCard(project));
    });
    
    completed.forEach(project => {
        document.getElementById('completed-projects').appendChild(renderProjectCard(project));
    });
    
    planned.forEach(project => {
        document.getElementById('planned-projects').appendChild(renderProjectCard(project));
    });
    
    // Show no results message if needed
    if (ongoing.length === 0) {
        document.getElementById('ongoing-projects').innerHTML = '<div class="no-projects">No matching ongoing projects</div>';
    }
    
    if (completed.length === 0) {
        document.getElementById('completed-projects').innerHTML = '<div class="no-projects">No matching completed projects</div>';
    }
    
    if (planned.length === 0) {
        document.getElementById('planned-projects').innerHTML = '<div class="no-projects">No matching planned projects</div>';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize projects
    initializeProjects();
    
    // Load all projects
    loadAllProjects();
    
    // Tab functionality
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
    
    // Toggle sidebar on mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('sidebar-active');
        });
    }
    
    // Add project button
    addProjectBtn.addEventListener('click', function() {
        // Reset form and set title for new project
        projectForm.reset();
        document.getElementById('projectId').value = '';
        document.getElementById('modalTitle').textContent = 'Add New Project';
        
        // Set default dates
        const today = new Date();
        const futureDate = new Date();
        futureDate.setFullYear(today.getFullYear() + 1);
        
        document.getElementById('projectStart').value = formatDateForInput(today);
        document.getElementById('projectEnd').value = formatDateForInput(futureDate);
        
        projectModal.style.display = 'block';
    });
    
    // Close modal buttons
    closeModal.addEventListener('click', function() {
        projectModal.style.display = 'none';
    });
    
    cancelProject.addEventListener('click', function() {
        projectModal.style.display = 'none';
    });
    
    closeDetailsModal.addEventListener('click', function() {
        projectDetailsModal.style.display = 'none';
    });
    
    closeDetails.addEventListener('click', function() {
        projectDetailsModal.style.display = 'none';
    });
    
    // Edit from details button
    editFromDetails.addEventListener('click', function() {
        const projectId = parseInt(this.getAttribute('data-id'));
        projectDetailsModal.style.display = 'none';
        editProject(projectId);
    });
    
    // Delete from details button
    deleteFromDetails.addEventListener('click', function() {
        const projectId = parseInt(this.getAttribute('data-id'));
        deleteProject(projectId);
    });
    
    // Project form submission
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const projectId = document.getElementById('projectId').value;
        const isNewProject = !projectId;
        
        const project = {
            id: isNewProject ? generateId() : parseInt(projectId),
            name: document.getElementById('projectName').value,
            category: document.getElementById('projectCategory').value,
            description: document.getElementById('projectDescription').value,
            startDate: document.getElementById('projectStart').value,
            endDate: document.getElementById('projectEnd').value,
            budget: parseInt(document.getElementById('projectBudget').value),
            progress: parseInt(document.getElementById('projectProgress').value),
            status: document.getElementById('projectStatus').value,
            image: document.getElementById('projectImage').value
        };
        
        let projects = getProjects();
        
        if (isNewProject) {
            projects.push(project);
        } else {
            projects = projects.map(p => p.id === project.id ? project : p);
        }
        
        saveProjects(projects);
        loadAllProjects();
        
        projectModal.style.display = 'none';
        
        showToast(`Project ${isNewProject ? 'added' : 'updated'} successfully`);
    });
    
    // Search functionality
    projectSearch.addEventListener('input', function() {
        filterProjects(this.value);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
        }
        if (event.target === projectDetailsModal) {
            projectDetailsModal.style.display = 'none';
        }
    });
});