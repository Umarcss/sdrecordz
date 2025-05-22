// Admin functionality for handling uploads and previews

// File preview functionality
function setupFilePreviews() {
    // Music file preview
    const musicFileInput = document.getElementById('musicFile');
    const audioPreview = document.getElementById('audioPreview');
    if (musicFileInput && audioPreview) {
        musicFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                audioPreview.src = url;
                audioPreview.style.display = 'block';
            }
        });
    }

    // Video file preview
    const videoFileInput = document.getElementById('videoFile');
    const videoPreview = document.getElementById('videoPreview');
    if (videoFileInput && videoPreview) {
        videoFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                videoPreview.src = url;
                videoPreview.style.display = 'block';
            }
        });
    }

    // Image preview for cover art and thumbnails
    const imageInputs = document.querySelectorAll('input[type="file"][accept="image/*"]');
    imageInputs.forEach(input => {
        const previewId = input.id === 'coverArt' ? 'coverPreview' : 'thumbnailPreview';
        const preview = document.getElementById(previewId);
        if (preview) {
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const url = URL.createObjectURL(file);
                    preview.src = url;
                    preview.style.display = 'block';
                }
            });
        }
    });
}

// Form submission handlers
function setupFormHandlers() {
    // Music upload form
    const musicForm = document.getElementById('uploadMusicForm');
    if (musicForm) {
        musicForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData();
            
            // Add all form fields to FormData
            formData.append('title', document.getElementById('songTitle').value);
            formData.append('artist', document.getElementById('artist').value);
            formData.append('album', document.getElementById('album').value);
            formData.append('genre', document.getElementById('genre').value);
            formData.append('description', document.getElementById('description').value);
            formData.append('releaseDate', document.getElementById('releaseDate').value);
            formData.append('tags', document.getElementById('tags').value);
            
            // Add files
            const musicFile = document.getElementById('musicFile').files[0];
            const coverArt = document.getElementById('coverArt').files[0];
            if (musicFile) formData.append('musicFile', musicFile);
            if (coverArt) formData.append('coverArt', coverArt);

            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/music/upload', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    alert('Music uploaded successfully!');
                    musicForm.reset();
                    // Reset previews
                    document.getElementById('audioPreview').style.display = 'none';
                    document.getElementById('coverPreview').style.display = 'none';
                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                alert('Error uploading music: ' + error.message);
            }
        });
    }

    // Video upload form
    const videoForm = document.getElementById('uploadVideoForm');
    if (videoForm) {
        videoForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData();
            
            // Add all form fields to FormData
            formData.append('title', document.getElementById('videoTitle').value);
            formData.append('artist', document.getElementById('artist').value);
            formData.append('category', document.getElementById('category').value);
            formData.append('description', document.getElementById('description').value);
            formData.append('releaseDate', document.getElementById('releaseDate').value);
            formData.append('tags', document.getElementById('tags').value);
            formData.append('featured', document.getElementById('featured').checked);
            
            // Add files
            const videoFile = document.getElementById('videoFile').files[0];
            const thumbnail = document.getElementById('thumbnail').files[0];
            if (videoFile) formData.append('videoFile', videoFile);
            if (thumbnail) formData.append('thumbnail', thumbnail);

            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/video/upload', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    alert('Video uploaded successfully!');
                    videoForm.reset();
                    // Reset previews
                    document.getElementById('videoPreview').style.display = 'none';
                    document.getElementById('thumbnailPreview').style.display = 'none';
                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                alert('Error uploading video: ' + error.message);
            }
        });
    }
}

// Search and filter functionality
function setupSearchAndFilter() {
    // Music search and filter
    const searchMusic = document.getElementById('searchMusic');
    const filterGenre = document.getElementById('filterGenre');
    if (searchMusic && filterGenre) {
        const searchHandler = () => {
            const searchTerm = searchMusic.value.toLowerCase();
            const genreFilter = filterGenre.value;
            const rows = document.querySelectorAll('#musicList tr');
            
            rows.forEach(row => {
                const title = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const genre = row.querySelector('td:nth-child(5)').textContent;
                const matchesSearch = title.includes(searchTerm);
                const matchesGenre = !genreFilter || genre === genreFilter;
                
                row.style.display = matchesSearch && matchesGenre ? '' : 'none';
            });
        };

        searchMusic.addEventListener('input', searchHandler);
        filterGenre.addEventListener('change', searchHandler);
    }

    // Video search and filter
    const searchVideo = document.getElementById('searchVideo');
    const filterCategory = document.getElementById('filterCategory');
    if (searchVideo && filterCategory) {
        const searchHandler = () => {
            const searchTerm = searchVideo.value.toLowerCase();
            const categoryFilter = filterCategory.value;
            const rows = document.querySelectorAll('#videoList tr');
            
            rows.forEach(row => {
                const title = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const category = row.querySelector('td:nth-child(4)').textContent;
                const matchesSearch = title.includes(searchTerm);
                const matchesCategory = !categoryFilter || category === categoryFilter;
                
                row.style.display = matchesSearch && matchesCategory ? '' : 'none';
            });
        };

        searchVideo.addEventListener('input', searchHandler);
        filterCategory.addEventListener('change', searchHandler);
    }
}

// Initialize all functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupFilePreviews();
    setupFormHandlers();
    setupSearchAndFilter();
});
