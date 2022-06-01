import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyle = makeStyles({
    root: {
        background: "white",
    },
    myButton: {
        border: "none",
    },
    //  counterText:{
    //     textAlign: "center"
    //  }
});
const Counter = ({ inventory, handleIncrement, handleDecrement }) => {
    const classes = useStyle();
    const [count, setCount] = useState(1);
    const handleIncrease = () => {
        if (count < inventory) {
            setCount(count + 1);
            handleIncrement();
        }
    };
    const handleDecrease = () => {
        if (count > 1) {
            setCount(count - 1);
            handleDecrement();
        }
    };
    return (
        <div>
            <ButtonGroup
                className={classes.root}
                size="small"
                aria-label="small outlined button group"
            >
                <Button className={classes.myButton} onClick={handleIncrease}>
                    <AddIcon />
                </Button>
                <Typography className={classes.counterText} variant="p">
                    {count === inventory ? "حداکثر" + count : count}
                </Typography>

                <Button className={classes.myButton} onClick={handleDecrease}>
                    <RemoveIcon />
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Counter;
