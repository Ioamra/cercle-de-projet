export const checkExpiration = () => {
  const dateOfConnection = localStorage.getItem('date_of_connection');
  if (dateOfConnection) {
    const connectionTime = new Date(dateOfConnection).getTime();
    const currentTime = new Date().getTime();
    const ExpirationTIme = 3 * 60 * 60 * 1000;

    if (currentTime - connectionTime > ExpirationTIme) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('date_of_connection');
    }
  }
};

checkExpiration();
