import React from 'react'
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, gray 30%, black 90%)',
        border: 0,
        color: 'white',
        height: 30,
        padding: '0 10px',
        whiteSpace: 'nowrap',
        margin: '15px 0 0 20px',
    },
});

const FormClear = ({ clearCompleted }) => {
    const classes = useStyles();
    return (
        <Button
            type="submit"
            alt="ClearSelected"
            className={classes.root}
            onClick={clearCompleted}
        >
            Clear Completed
        </Button>
    )
}

export default FormClear