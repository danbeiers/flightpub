import classes from './AdSidebar.module.css';

function AdSidebar(props){

    return (
        <img className={classes.image} src={props.url} alt="image"></img>
    )
}

export default AdSidebar;