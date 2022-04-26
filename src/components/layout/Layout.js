import MainNavigation from './MainNavigation';
import AdSidebar from '../ads/AdSidebar';
import classes from './Layout.module.css';

function Layout(props) {
    return (
        <div>
            <MainNavigation />
            <main className={classes.main}>
                <div className={classes.layout} >
                    <div className={classes.adleft}>
                        <p>Ad 1</p>
                        <AdSidebar url="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </div>
                    <div className={classes.inner}>
                        {props.children}
                    </div>
                    <div className={classes.adright}>
                        <p>Ad 2</p>
                        <AdSidebar url="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Layout;