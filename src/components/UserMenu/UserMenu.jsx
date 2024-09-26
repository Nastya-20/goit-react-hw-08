import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom';
import css from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

 const handleLogout = async () => {
    try {
      await dispatch(logOut()); 
      console.log("User logged out successfully"); 
      navigate('/'); 
    } catch (error) {
      console.error("Logout error:", error); 
    }
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.name}</p>
      <button  className={css.logout} type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}