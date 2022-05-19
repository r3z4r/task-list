import classes from "./spinner.module.css";

const Spinner = () =>{
    return <div className={classes.progressContainer}>
        <div className={classes.progress}>
            <div className={classes.progressBar}>
            </div>
        </div>
    </div>
}

export default Spinner