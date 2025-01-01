export default interface User {
  login: { uuid: string };
  id: string; // מזהה ייחודי
  name: { title: string; first: string; last: string };
  email: string;
  picture: { medium: string };
  location: {
    country: string;
    city: string;
    street: { name: string; number: number };
  };
}
