import axios from "axios";
import { useEffect, useState } from "react";
import style from './UserProfile.module.css'

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {

    fetchUser();
  }, []);

   const fetchUser = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api");
        setUser(response.data.results[0]);
        setLoading(false); 
      } catch (error) {
        console.error("Помилка завантаження користувача:", error);
        setLoading(false); 
      }
    };

  if (loading) {
    return <p>Loading...</p>;
  }

  
  return (
    <div className={style.container} style={{backgroundColor: user.gender === "male"? "teal":"bisque", color: user.gender === "male"? "yellow":"blue"}}>
        <img src={user.picture.large} alt="User" className={style.img}/>
      <h2>
        {user.name.first} {user.name.last}
      </h2>
      
      <p>Email: {user.email}</p>
      <p>Cell: {user.phone}</p>
      <button onClick={fetchUser} className={style.load}>Load new User</button>
    </div>
  );
}

export default UserProfile;
