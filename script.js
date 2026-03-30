document.addEventListener('DOMContentLoaded', () => {
    // Handle Sidebar option card interactions
    const optionCards = document.querySelectorAll('.option-card');
    
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active state from all cards
            optionCards.forEach(c => c.classList.remove('active'));
            // Add active state to the clicked card
            card.classList.add('active');
            
            // Add a subtle click animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 100);
        });
    });

    // Add subtle hover animations to selects
    const selects = document.querySelectorAll('.inline-select');
    selects.forEach(select => {
        select.addEventListener('change', (e) => {
            // Flash color briefly to acknowledge selection
            const originalColor = select.style.color;
            select.style.color = '#0e7490';
            setTimeout(() => {
                select.style.color = '';
            }, 300);
        });
    });
});

function launchPlanner() {
    const roomTypeSelect = document.getElementById('room-type');
    const roomAreaSelect = document.getElementById('room-area');
    const roomShapeSelect = document.getElementById('room-shape');
    
    const roomType = roomTypeSelect.options[roomTypeSelect.selectedIndex].text;
    const roomArea = roomAreaSelect.options[roomAreaSelect.selectedIndex].text;
    const roomShape = roomShapeSelect.options[roomShapeSelect.selectedIndex].text;

    // Simulate launching planner
    const btn = document.querySelector('.btn-primary');
    const originalText = btn.textContent;
    btn.textContent = 'Launching...';
    btn.style.opacity = '0.8';
    btn.disabled = true;

    setTimeout(() => {
        alert(`Initializing Planner Workspace...\n\nConfiguration:\n- Room Type: ${roomType}\n- Area: ${roomArea}\n- Shape: ${roomShape}`);
        
        // Reset button
        btn.textContent = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
    }, 800);
}
