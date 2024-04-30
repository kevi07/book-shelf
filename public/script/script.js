const button = document.querySelector('.delete');

document.addEventListener('mouseover', function(event) {
    const parentContainer = event.target.closest('.parent-container');
    if (parentContainer) {
        const pop = parentContainer.querySelector('.container');
        pop.style.display = 'block';
    }
});
document.addEventListener('mouseout', function(event) {
    const parentContainer = event.target.closest('.parent-container');
    const container = event.target.closest('.container');
    if (!parentContainer && !container) {
        const pops = document.querySelectorAll('.container');
        pops.forEach(pop => {
            pop.style.display = 'none';
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const pops = document.querySelectorAll('.container');
    pops.forEach(pop => {
        pop.style.display = 'none';
    });
});












