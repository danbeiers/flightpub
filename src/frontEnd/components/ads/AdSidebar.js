import classes from './AdSidebar.module.css';

function AdSidebar(props){

    return (
        <img className={classes.image} src={props.url} alt="placeholder"></img>
    )
}

export default AdSidebar;