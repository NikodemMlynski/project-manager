import { Outlet } from "react-router-dom";
import classes from './RootLayout.module.css';
import Aside from "../components/Navigation/Aside";

export default function RootLayout() {
    return (
        <div className={classes.container}>
            <Aside/>
            <main className={classes.main}>
                <Outlet/>
            </main>
        </div>
    )
}