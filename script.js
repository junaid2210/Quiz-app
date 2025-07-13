document.getElementById('start-btn').addEventListener('click' , () => {
    const amount = document.getElementById('NoQues').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;

    let baseURL = `https://opentdb.com/api.php?amount=${amount}`

    if(category) baseURL += `&category=${category}`;
    if(difficulty) baseURL += `&difficulty=${difficulty}`;
    if(type) baseURL += `&type=${type}`;

    baseURL += `&encode=url3986`;

    fetch(baseURL)
    .then(Response => Response.json())
    .then(data => {
        console.log(data.results);
    })
    .catch(error => {
        console.error('Error fetching the quiz data',error);
    })
})