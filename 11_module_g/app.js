const slider = document.getElementById('slider');
const bar = document.getElementById('slider-bar');
const handleLeft = document.getElementById('handle-left');
const handleRight = document.getElementById('handle-right');
const displayLeft = document.getElementById('val-left');
const displayRight = document.getElementById('val-right');

const MIN = 0;
const MAX = 1000;
const STEP = 50;


let valL = 400;
let valR = 600;

function updateUI() {
    const percentL = (valL / MAX) * 100;
    const percentR = 100 - (valR / MAX) * 100;

    bar.style.left = percentL + "%";
    bar.style.right = percentR + "%";

    displayLeft.innerText = valL;
    displayRight.innerText = valR;
}

function handleDrag(e, type) {
    const rect = slider.getBoundingClientRect();
    const offsetX = (e.clientX || e.touches[0].clientX) - rect.left;
    let percent = (offsetX / rect.width) * 100;

    percent = Math.max(0, Math.min(100, percent));


    let newValue = Math.round((percent * MAX / 100) / STEP) * STEP;

    if (type === 'left') {
        if (newValue >= valR) newValue = valR - 0;
        valL = newValue;
    } else {
        if (newValue <= valL) newValue = valL + 0;
        valR = newValue;
    }

    updateUI();
}

function setupHandle(handle, type) {
    const onMove = (e) => handleDrag(e, type);
    const onEnd = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
    };

    handle.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
    });

    handle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.addEventListener('touchmove', onMove);
        document.addEventListener('touchend', onEnd);
    });
}

setupHandle(handleLeft, 'left');
setupHandle(handleRight, 'right');


updateUI();
