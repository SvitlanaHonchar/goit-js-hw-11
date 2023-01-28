import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com';
  static API_KEY = '33034964-6791c4166c041f83734802d57';

  constructor() {
    (this.page = 1), (this.query = null), (this.totalHits = null);
  }

  async getPhotos() {
    const searchParams = new URLSearchParams({
      q: this.query,
      page: this.page,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      key: PixabayAPI.API_KEY,
    });

    const response = await axios.get(
      `${PixabayAPI.BASE_URL}/api/?${searchParams}`
    );
    console.log(response);
    this.totalHits = response.data.totalHits;
    // // console.log(this.totalHits);
    return response.data.hits;
  }
}
