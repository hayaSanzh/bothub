let loggedUser = null;
let dataGlobal = null;

const getLoggedUser = () => {
    fetch('/api/loggedUser')
        .then((res) => res.json())
        .then((data) => {
            loggedUser = data;
            if (loggedUser === null) {
                window.location.href = '/auth';
            }
        })
}


const readFeedbacks = (data) => {

    let feedbackList = document.getElementById('feedback-list');
    feedbackList.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        let listItem = document.createElement('li');
        listItem.className = 'feedback-item';
        listItem.innerHTML = `
        <div>
            <h3>${i + 1}) ${data[i].title}</h3>
            <p>${data[i].description}</p>
            <p>${data[i].category}</p>
        </div>
        <div class="votes">
    <button id="like-button-${data[i].id}" onclick="vote('${data[i].id}')">
        👍
    </button>
    <span id="votes-${data[i].id}">${data[i].votes || 0}</span>
</div>

        `;
        if (data[i].author_id === loggedUser.id) {
            listItem.innerHTML += `
                <div class="author">
                    <button class="update" onclick="openModal(${i})">Update</button>
                    <button class="delete" onclick="deleteMethod(${data[i].id})">Delete</button>
                </div>
            `
        }

        feedbackList.appendChild(listItem);
    }

    // Clear inputs
    document.getElementById('feedback-title').value = '';
    document.getElementById('feedback-body').value = '';
}


const vote = (feedbackId) => {
    fetch(`/api/feedbacks/${feedbackId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            document.getElementById(`votes-${feedbackId}`).textContent = data.votes;
        })
        .catch((error) => console.error('Error voting:', error));
};


const deleteMethod = (id) => {
    fetch(`/api/feedbacks/${id}`, {
        method: 'DELETE',
    }).then((res) => {
        window.location.reload();
    }).catch((error) => console.error('Error: ', error));
}


/*const updateMethod = (id) => {
    fetch(`/api/feedback/${id}`, {
        method: 'PUT',
    }).then((res) => {
        window.location.reload();
    }).catch((error) => console.log('Error: ', error));
}*/

const openModal = (id) => {
    document.getElementById('modal-feedback-id').value = dataGlobal[id].id;
    document.getElementById('modal-feedback-title').value = dataGlobal[id].title;
    document.getElementById('modal-feedback-description').value = dataGlobal[id].description;
    document.getElementById('modal-feedback-category').value = dataGlobal[id].category;
    document.getElementById('modal').style.display = 'flex';
};

const closeModal = () => {
    document.getElementById('modal').style.display = 'none';
};

document.getElementById('modal-feedback-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('modal-feedback-id').value;
    const title = document.getElementById('modal-feedback-title').value;
    const description = document.getElementById('modal-feedback-description').value;
    const category = document.getElementById('modal-feedback-category').value;

    fetch(`/api/feedbacks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category }),
    })
        .then((response) => {
            closeModal();
            window.location.reload();
        })
        .catch((error) => console.error('Error updating feedback:', error));
});



const allData = () => {
    const category = document.getElementById('category-filter').value;
    const status = document.getElementById('status-filter').value;
    const sortBy = document.getElementById('sort-by').value;
    const sortOrder = document.getElementById('sort-order').value;

    let url = `/api/feedbacks?category=${category}&status=${status}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            dataGlobal = data;
            console.log(data);
            readFeedbacks(data);
        });
}


document.getElementById('filter-form').addEventListener('submit', (event) => {
    event.preventDefault();
    allData(); // Запрашиваем данные с новыми фильтрами
});

document.getElementById('sort-form').addEventListener('submit', (event) => {
    event.preventDefault();
    allData(); // Запрашиваем данные с новой сортировкой
});


getLoggedUser();
allData()