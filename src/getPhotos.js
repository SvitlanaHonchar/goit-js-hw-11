import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com';
  static API_KEY = '33034964-6791c4166c041f83734802d57';

  constructor() {}

  async getPhotos(query) {
    const searchParams = new URLSearchParams({
      q: query,
      page: 1,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      key: PixabayAPI.API_KEY,
    });

    const response = await axios.get(
      `${PixabayAPI.BASE_URL}/api/?${searchParams}`
    );
    return response.data.hits;
  }
}

// export async function getPhotos(query) {
//   const response = await axios.get(
//     `https://pixabay.com/api/?q=${query}&image_type=photo&orientation=horizontal&safesearch=true&key=33034964-6791c4166c041f83734802d57&page=1&per_page=40`
//   );

//   return response.data.hits;
// }

// export async function getPhotos(query) {
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?q=${query}&image_type=photo&orientation=horizontal&safesearch=true&key=33034964-6791c4166c041f83734802d57&page=1&per_page=40`
//     );
//     // console.log(response.data.hits);
//     return response.data.hits;
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetch(
//   'https://pixabay.com/api/?q=cat&image_type=photo&orientation=horizontal&safesearch=true&key=33034964-6791c4166c041f83734802d57&page=1&per_page=40'
// )
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     return response.json();
//   })
//   .then(data => console.dir(data))
//   .catch(err => {
//     console.log(err);
//   });
