import useMediaQuery from "@material-ui/core/useMediaQuery";
import React from 'react';
import Button from "@material-ui/core/Button";

const router = (event) => {
    if (event.target.id === "/") {
        localStorage.clear();
    }
    window.location = event.currentTarget.id;
};

const MediaQuery = () => {
    const matches = useMediaQuery('(min-width:600px)');
    let content = null;
    let style = {
        fontWeight: "800",
        textTransform: "none",
        fontSize: "1rem"
    };
    if (matches) {
        content = <div>
            <Button id={"/home"} color="secondary" onClick={router} className={"ml-5"} style={style}>
                Emettre une demande
            </Button>
            <Button id={"/loans"} color="secondary" onClick={router} className={"ml-5"} style={style}>
                Marché des prêts
            </Button>
        </div>;
    }
    return content;
};

export default MediaQuery;