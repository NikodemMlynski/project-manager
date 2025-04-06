import { Link } from "react-router-dom";
import classes from './Aside.module.css';

export default function Aside() {
    return (
        <aside className={classes.aside}>
            <div className={classes.userSection}>
                <div className={classes.avatar}></div>
                <span className={classes.username}>Użytkownik</span>
                <button className={classes.settingsButton}>X</button>
            </div>

            <button className={classes.addTaskButton}>X Dodaj zadanie</button>

            <div className={classes.searchWrapper}>
                <span className={classes.searchIcon}>X</span>
                <input type="text" placeholder="Wyszukaj" className={classes.searchInput} />
            </div>

            <div className={classes.section}>
                <ul className={classes.menuList}>
                    <li>
                        <Link to="/tasks/today" className={classes.link}>
                            <span className={classes.icon}>X</span> Dzisiaj
                        </Link>
                    </li>
                    <li>
                        <Link to="tasks/upcoming" className={classes.link}>
                            <span className={classes.icon}>X</span> Nadchodzące
                        </Link>
                    </li>
                    <li>
                        <Link to="tasks/archive" className={classes.link}>
                            <span className={classes.icon}>X</span> Archiwum
                        </Link>
                    </li>
                </ul>
            </div>

            <div className={classes.projectsSection}>
                <h2 className={classes.projectsTitle}><Link to="/projects">Moje projekty</Link></h2>
                <ul className={classes.projectsList}>
                    <li className={classes.projectItem}>
                        <Link to={'projects/1'}><span className={classes.icon}>X</span> Projekt 1</Link>
                    </li>
                    <li className={classes.projectItem}>
                    <Link to={'projects/2'}><span className={classes.icon}>X</span> Projekt 2</Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
