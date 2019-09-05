import fetch from 'node-fetch';



export const postUsers = (data) => {
  fetch("http://localhost:9000/users/", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getData = (data, id, setData) => {
  fetch("http://localhost:9000/data/", {
    method: 'POST',
    body: JSON.stringify({ ...data, ...id }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => setData(res))
    .catch(err => console.log(err))
}

export const getHistory = (id, setData) => {
  fetch("http://localhost:9000/history/", {
    method: 'POST',
    body: JSON.stringify({...id}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => setData(res))
    .catch(err => console.log(err))
}