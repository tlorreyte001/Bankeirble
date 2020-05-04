import React from "react";
import APIP from "../../utils/APIPayment";
import Button from "@material-ui/core/Button";

export class CreateButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled : false
        };
    };

    componentDidMount() {
        this.check();
    };

    check = async () => {
        APIP.check(
            localStorage.getItem("token")
        )
            .then((data) => {
                if (data.data.text === "Succès"){
                    this.setState({disabled: true});
                    localStorage.setItem("mangoId", data.data.mangoId)
                }
        })
            .catch((reason) => {
        })
    }

    create = async () => {
        APIP.create(
            localStorage.getItem("token")
        )
            .then((data) => {
                console.log(data)
                if (data.data.text === "Succès"){
                    this.setState({disabled: true});
                    localStorage.setItem("mangoId", data.data.mangoId);
                    APIP.create_wallet(
                        localStorage.getItem("token")
                    )
                        .catch((reason) => {
                            console.log(reason);
                        })
                }
            })
            .catch((reason) => {
                console.log(reason);
            })
    }

    render() {
        return(
          <div>
              <Button disabled={this.state.disabled} variant="contained" color="primary" className={"m-3"} onClick={this.create}>Se creer un portefeuille   </Button>
          </div>
        );
    }
}