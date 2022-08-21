import MainNavigation from './MainNavigation';
import AdSidebar from '../ads/AdSidebar';
import classes from './Layout.module.css';
import Card from "../ui/Card";

function Layout(props) {
    return (
        <div>
            <MainNavigation />
            <main className={classes.main}>
                <div className={classes.layout} >
                    <Card className={classes.adleft} >

                        <AdSidebar url="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </Card >
                    <div className={classes.inner}>
                        {props.children}
                    </div>
                    <Card className={classes.adright}>

                        <AdSidebar url="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </Card>
                </div>
            </main>
        </div>
    );
}

export default Layout;