// Project Management Functions
class ProjectManager {
    constructor() {
        this.projects = this.loadProjects();
    }
    
    // Load projects from localStorage or return default projects
    loadProjects() {
        const savedProjects = localStorage.getItem('projects');
        if (savedProjects) {
            return JSON.parse(savedProjects);
        } else {
            // Default projects if none exist
            return [
                {
                    id: 1,
                    name: 'Talanta Stadium',
                    description: 'The construction of a modern Stadium along ngong road',
                    location: 'Ngong Road, Nairobi',
                    budget: 2500000000,
                    startDate: '2022-03-15',
                    endDate: '2024-12-31',
                    progress: 70,
                    views: 1245,
                    comments: 87,
                    images: ['Photos/talanta.jpeg'],
                    videos: []
                },
                {
                    id: 2,
                    name: 'GTC Towers',
                    description: 'A global establishment for both local events of staycations and official events.',
                    location: 'Nairobi CBD',
                    budget: 3800000000,
                    startDate: '2021-06-10',
                    endDate: '2024-08-30',
                    progress: 80,
                    views: 982,
                    comments: 64,
                    images: ['Photos/gtc1.jpeg'],
                    videos: []
                },
                {
                    id: 3,
                    name: 'Thika Superhighway',
                    description: 'Thika Superhighway is a modern and vital transportation network connecting Nairobi to Thika.',
                    location: 'Nairobi - Thika',
                    budget: 5000000000,
                    startDate: '2009-01-15',
                    endDate: '2012-12-31',
                    progress: 100,
                    views: 2341,
                    comments: 156,
                    images: ['Photos/Thika 3.jpg', 'Photos/Thika 2.jpeg'],
                    videos: []
                },
                {
                    id: 4,
                    name: 'Nairobi-Mombasa Highway',
                    description: 'The is to be one of the greatest roads connecting the port city of Mombassa and the capital Nairobi.',
                    location: 'Nairobi - Mombasa',
                    budget: 8500000000,
                    startDate: '2023-01-10',
                    endDate: '2027-12-31',
                    progress: 10,
                    views: 756,
                    comments: 35,
                    images: ['Photos/road.jpg'],
                    videos: []
                }
            ];
        }
    }
    
    // Save projects to localStorage
    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }
    
    // Add a new project
    addProject(project) {
        // Generate a new ID
        const newId = this.projects.length > 0 ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
        
        // Add default values
        const newProject = {
            id: newId,
            views: 0,
            comments: 0,
            ...project,
            dateAdded: new Date().toISOString().split('T')[0]
        };
        
        this.projects.push(newProject);
        this.saveProjects();
        return newProject;
    }
    
    // Update an existing project
    updateProject(id, updatedData) {
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...updatedData };
            this.saveProjects();
            return this.projects[index];
        }
        return null;
    }
    
    // Delete a project
    deleteProject(id) {
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            this.projects.splice(index, 1);
            this.saveProjects();
            return true;
        }
        return false;
    }
    
    // Get all projects
    getAllProjects() {
        return this.projects;
    }
    
    // Get a specific project by ID
    getProject(id) {
        return this.projects.find(p => p.id === id);
    }
    
    // Search projects by name
    searchProjects(query) {
        const searchTerm = query.toLowerCase();
        return this.projects.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm) ||
            p.location.toLowerCase().includes(searchTerm)
        );
    }
}

// Initialize the project manager when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const projectManager = new ProjectManager();
    
    // Handle project form submission
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const newProject = {
                name: document.getElementById('projectName').value,
                description: document.getElementById('projectDescription').value,
                location: document.getElementById('projectLocation').value,
                budget: parseFloat(document.getElementById('projectBudget').value),
                startDate: document.getElementById('projectStartDate').value,
                endDate: document.getElementById('projectEndDate').value,
                progress: parseInt(document.getElementById('projectProgress').value),
                images: [], // In a real app, you would handle file uploads to server
                videos: []  // In a real app, you would handle file uploads to server
            };
            
            // Add the project
            projectManager.addProject(newProject);
            
            // Show success message
            alert('Project added successfully!');
            
            // Reset the form
            this.reset();
            document.getElementById('imagePreview').innerHTML = '';
            document.getElementById('videoPreview').innerHTML = '';
            
            // Refresh project lists
            refreshProjectLists();
        });
    }
    
    // Handle project search
    const projectSearch = document.getElementById('projectSearch');
    if (projectSearch) {
        projectSearch.addEventListener('input', function() {
            const searchResults = projectManager.searchProjects(this.value);
            displayProjects(searchResults);
        });
    }
    
    // Function to refresh all project lists
    function refreshProjectLists() {
        const projects = projectManager.getAllProjects();
        displayProjects(projects);
        displayRecentProjects(projects);
    }
    
    // Function to display projects in the manage projects table
    function displayProjects(projects) {
        const projectTable = document.querySelector('#manage-projects .project-table tbody');
        if (projectTable) {
            projectTable.innerHTML = '';
            
            projects.forEach(project => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${project.name}</td>
                    <td>${project.dateAdded || 'N/A'}</td>
                    <td>${project.progress}%</td>
                    <td>${project.views}</td>
                    <td class="action-buttons">
                        <button class="btn-edit" data-id="${project.id}">Edit</button>
                        <button class="btn-delete" data-id="${project.id}">Delete</button>
                    </td>
                `;
                projectTable.appendChild(row);
            });
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('.btn-edit').forEach(button => {
                button.addEventListener('click', function() {
                    const projectId = parseInt(this.getAttribute('data-id'));
                    editProject(projectId);
                });
            });
            
            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', function() {
                    const projectId = parseInt(this.getAttribute('data-id'));
                    if (confirm('Are you sure you want to delete this project?')) {
                        projectManager.deleteProject(projectId);
                        refreshProjectLists();
                    }
                });
            });
        }
    }
    
    // Function to display recent projects in the dashboard
    function displayRecentProjects(projects) {
        const recentProjectsTable = document.querySelector('#dashboard .project-table tbody');
        if (recentProjectsTable) {
            recentProjectsTable.innerHTML = '';
            
            // Sort projects by date added (newest first) and take the first 4
            const recentProjects = [...projects]
                .sort((a, b) => new Date(b.dateAdded || '2023-01-01') - new Date(a.dateAdded || '2023-01-01'))
                .slice(0, 4);
            
            recentProjects.forEach(project => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${project.name}</td>
                    <td>${project.dateAdded || 'N/A'}</td>
                    <td>${project.progress}%</td>
                    <td>${project.views}</td>
                    <td>${project.comments}</td>
                `;
                recentProjectsTable.appendChild(row);
            });
        }
    }
    
    // Function to edit a project
    function editProject(projectId) {
        const project = projectManager.getProject(projectId);
        if (project) {
            // Switch to the add project tab
            showTab('add-project');
            
            // Fill the form with project data
            document.getElementById('projectName').value = project.name;
            document.getElementById('projectDescription').value = project.description;
            document.getElementById('projectLocation').value = project.location;
            document.getElementById('projectBudget').value = project.budget;
            document.getElementById('projectStartDate').value = project.startDate;
            document.getElementById('projectEndDate').value = project.endDate;
            document.getElementById('projectProgress').value = project.progress;
            
            // Change form submission behavior for updating
            const projectForm = document.getElementById('projectForm');
            projectForm.dataset.mode = 'edit';
            projectForm.dataset.projectId = projectId;
            
            // Change button text
            document.querySelector('#projectForm .btn-submit').textContent = 'Update Project';
        }
    }
    
    // Initialize the dashboard
    refreshProjectLists();
});
