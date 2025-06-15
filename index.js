const form = document.getElementById('guestForm');
const guestList = document.getElementById('guestList');
const nameInput = document.getElementById('guestName');
const categoryInput = document.getElementById('guestCategory');
let guests = [];

function renderGuests() {
  guestList.innerHTML = '';
  guests.forEach((guest, idx) => {
    const li = document.createElement('li');
    if (guest.editing) li.classList.add('editing');

    // Category Tag
    const tag = document.createElement('span');
    tag.className = `tag ${guest.category}`;
    tag.textContent = guest.category;
    li.appendChild(tag);

    // Name Field
    if (guest.editing) {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = guest.name;
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') finishEdit(idx, input.value);
      });
      input.addEventListener('blur', () => finishEdit(idx, input.value));
      li.appendChild(input);
      input.focus();
    } else {
      li.appendChild(document.createTextNode(' ' + guest.name));
    }

    // Time Added
    const time = document.createElement('span');
    time.className = 'time';
    time.textContent = ` (${guest.time})`;
    li.appendChild(time);

    // RSVP Toggle
    const rsvpBtn = document.createElement('button');
    rsvpBtn.textContent = guest.attending ? 'Attending' : 'Not Attending';
    rsvpBtn.className = guest.attending ? 'attending' : 'not-attending';
    rsvpBtn.type = 'button';
    rsvpBtn.onclick = () => toggleRSVP(idx);
    li.appendChild(rsvpBtn);

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.type = 'button';
    editBtn.onclick = () => editGuest(idx);
    li.appendChild(editBtn);

    // Remove Button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.type = 'button';
    removeBtn.onclick = () => removeGuest(idx);
    li.appendChild(removeBtn);

    guestList.appendChild(li);
  });
}

function addGuest(name, category) {
  if (guests.length >= 10) {
    alert('Guest list is limited to 10 people.');
    return;
  }
  guests.push({
    name,
    category,
    attending: false,
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    editing: false
  });
  renderGuests();
}

function removeGuest(idx) {
  guests.splice(idx, 1);
  renderGuests();
}

function toggleRSVP(idx) {
  guests[idx].attending = !guests[idx].attending;
  renderGuests();
}

function editGuest(idx) {
  guests[idx].editing = true;
  renderGuests();
}

function finishEdit(idx, newName) {
  guests[idx].name = newName;
  guests[idx].editing = false;
  renderGuests();
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const category = categoryInput.value;
  if (name) addGuest(name, category);
  nameInput.value = '';
});

renderGuests();