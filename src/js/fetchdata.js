import axios from 'axios';

const API_KEY = '37154712-be28b064c7b4c3a0bb088cbd1';

let count = 1;
let currentFormValue = '';

export default async function fetchData(data) {
  try {
    if (currentFormValue !== data) {
      count = 1;
    }
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${count}`
    );
    currentFormValue = data;
    count += 1;
    return response;
  } catch (error) {
    console.log(error);
  }
}